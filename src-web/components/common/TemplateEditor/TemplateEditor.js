/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import SplitPane from 'react-split-pane'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Alert, AlertActionCloseButton, Checkbox, ButtonVariant, Spinner, Select,
  SelectVariant, SelectOption, TextInput, ValidatedOptions, Radio } from '@patternfly/react-core'
import { AcmModal, AcmButton, AcmAlert } from '@stolostron/ui-components'
import { initializeControlData, cacheUserData, updateControls, parseYAML,
  dumpYAMLFromPolicyDiscovered, dumpYAMLFromTemplateObject } from './utils/update-controls'
import { GrayOutlinedQuestionCircleIcon } from '../Icons'
import { generateYAML, highlightChanges } from './utils/update-editor'
import { validateYAML } from './utils/validate-yaml'
import YamlEditor from './components/YamlEditor'
import './scss/template-editor.scss'
import msgs from '../../../nls/platform.properties'
import '../../../graphics/diagramIcons.svg'
import { LocaleContext } from '../../../components/common/LocaleContext'
import _ from 'lodash'
import { generalDocLink } from '../CreateDocLink'

const tempCookie = 'template-editor-open-cookie'
// const diagramIconsInfoStr = '#diagramIcons_info'
// Regex to test valid policy name format
// (it's 63 characters for `${policyNS}.${policyName}`)
const policyNameRegex = RegExp(/^[a-z0-9][a-z0-9-.]{0,61}[a-z0-9]$/)
export default class TemplateEditor extends React.Component {

  static propTypes = {
    buildControl: PropTypes.shape({
      buildResourceLists: PropTypes.func,
    }),
    controlData: PropTypes.array.isRequired,
    createAndUpdateControl: PropTypes.shape({
      createAndUpdateResource: PropTypes.func,
      cancelCreateAndUpdate: PropTypes.func,
      createAndUpdateStatus: PropTypes.string,
      createAndUpdateMsg: PropTypes.string
    }),
    createControl: PropTypes.shape({
      createResource: PropTypes.func,
      cancelCreate: PropTypes.func,
      creationStatus: PropTypes.string,
      creationMsg: PropTypes.string
    }).isRequired,
    fetchControl: PropTypes.shape({
      isLoaded: PropTypes.bool,
      isFailed: PropTypes.bool,
      error: PropTypes.object
    }),
    hasExternalAlert: PropTypes.bool,
    isEdit: PropTypes.bool,
    locale: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
    policyDiscovered: PropTypes.object,
    template: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  static contextType = LocaleContext

  static getDerivedStateFromProps(props, state) {
    const {fetchControl, createControl={}, createAndUpdateControl={}, policyDiscovered, locale} = props
    const {isLoaded} = fetchControl || {isLoaded:true}
    const {creationStatus, creationMsg} = createControl
    const {createAndUpdateMsg} = createAndUpdateControl
    if (creationStatus === 'ERROR') {
      return {updateMsgKind: 'danger', updateMessage: creationMsg}
    } else if (createAndUpdateMsg) {
      return {updateMsgKind: 'danger', updateMessage: createAndUpdateMsg}
    } else if (isLoaded) {
      const { template, controlData: initialControlData } = props
      let { controlData, templateYAML, templateObject } = state
      // initialize controlData, templateYAML, templateObject
      if (!controlData) {
        controlData = initializeControlData(template, initialControlData)
        templateYAML = generateYAML(template, controlData)
        templateObject = parseYAML(templateYAML).parsed
        let isCustomName = false
        if (policyDiscovered) {
          templateYAML = dumpYAMLFromPolicyDiscovered(policyDiscovered)
          templateObject = parseYAML(templateYAML).parsed
          isCustomName = true
          if (Object.keys(templateObject).some(item => templateObject[item].length>0)) {
            controlData = _.cloneDeep(controlData)
            updateControls(controlData, [], templateObject, locale)
          }
        }
        return { controlData, templateYAML, templateObject, isCustomName }
      }
    }
    return null
  }

  constructor (props) {
    super(props)
    let showEditor = localStorage.getItem(tempCookie)
    showEditor = showEditor===null || showEditor==='true' ? true : false
    this.state = {
      isCustomName: false,
      validPolicyName: true,
      duplicateName: false,
      showEditor,
      updateMessage: '',
      resetInx: 0,
      controlState: {},
    }
    this.multiSelectCmpMap = {}
    this.parseDebounced = _.debounce(()=>{
      this.handleParse()
    }, 500)
    this.handleEditorCommand = this.handleEditorCommand.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleUpdateResource = this.handleUpdateResource.bind(this)
    const { type='unknown' } = this.props
    this.splitterSizeCookie = `TEMPLATE-EDITOR-SPLITTER-SIZE-${type.toUpperCase()}`
  }

  componentDidMount() {
    this.props.onCreate(this.handleCreateResource.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { isLoaded, isFailed } = this.props.fetchControl || { isLoaded:true }
    if (!prevProps.fetchControl?.isLoaded && isLoaded && !isFailed) {
      // if the content was just now loaded, and did not fail.
      if (window.ResizeObserver) {
        new ResizeObserver(this.layoutEditors.bind(this))
          .observe(document.querySelector('.creation-view'))
      } else {
        // The ResizeObserver API might not be available on all browsers, but this
        // is a good fallback covering many cases where the editor should resize
        window.addEventListener('resize', this.layoutEditors.bind(this))
      }
    }
  }

  setSplitPaneRef = splitPane => (this.splitPane = splitPane);

  handleSplitterDefault = () => {
    const cookie = localStorage.getItem(this.splitterSizeCookie)
    let size = cookie ? parseInt(cookie, 10) : 1000
    const page = document.getElementById('page')
    if (page) {
      const width = page.getBoundingClientRect().width
      if (!cookie) {
        size = width*.4
      } else if (size > (width*7/10)) {
        size = width * 7 / 10
      }
    }
    return size
  }

  handleSplitterChange = size => {
    localStorage.setItem(this.splitterSizeCookie, size)
    this.layoutEditors()
  };

  setContainerRef = container => {
    this.containerRef = container
    this.layoutEditors()
  };

  conditionalRenderUpdate = (locale) => {
    const { canOpenModal } = this.state
    if (canOpenModal) {
      return this.renderUpdatePrompt(locale)
    }
    return null
  }

  render() {
    const {fetchControl, locale} = this.props
    const {isLoaded, isFailed, error} = fetchControl || {isLoaded:true}
    const { showEditor, resetInx } = this.state

    if (!isLoaded) {
      return <Spinner className='patternfly-spinner' />
    }

    if (isFailed) {
      if (error.name === 'PermissionError') {
        return <AcmAlert isInline={true} variant='danger'
          subtitle={msgs.get('error.permission.denied.create', locale)} />
      }
      return <AcmAlert isInline={true} variant='danger'
        subtitle={msgs.get('overview.error.default', locale)} />
    }

    const viewClasses = classNames({
      'creation-view': true,
      showEditor
    })
    return (
      <div key={`key${resetInx}`} className={viewClasses} ref={this.setContainerRef}>
        {this.conditionalRenderUpdate(locale)}
        {this.renderSplitEditor()}
      </div>
    )
  }

  renderSplitEditor() {
    const { hasExternalAlert } = this.props
    const { showEditor } = this.state
    const editorClasses = classNames({
      'creation-view-split-container': true,
      showEditor,
      hasExternalAlert
    })
    return (
      <div className={editorClasses}>
        {showEditor ? (
          <SplitPane
            split="vertical"
            minSize={300}
            maxSize={-500}
            style={{position:'unset'}}
            ref={this.setSplitPaneRef}
            defaultSize={this.handleSplitterDefault()}
            onChange={this.handleSplitterChange}
          >
            {this.renderControls()}
            {this.renderEditor()}
          </SplitPane>
        ) : (
          <div className='creation-view-split-controls-help-container'>
            {this.renderControls()}
          </div>
        )}
      </div>
    )
  }

  renderControls() {
    const { hasExternalAlert, locale } = this.props
    const {controlData} = this.state
    const editorClasses = classNames({
      'creation-view-controls-container': true,
      hasExternalAlert
    })
    return (
      <div className={editorClasses} >
        {this.renderNotifications()}
        <div className='creation-view-controls-note'>{msgs.get('creation.view.required.mark', locale)}</div>
        <div className='creation-view-controls' >
          {controlData.map(control => {
            const {id, type} = control
            switch (type) {
            case 'text':
              return (<React.Fragment key={id}>
                {this.renderTextInput(control)}
              </React.Fragment>)
            case 'singleselect':
              return (<React.Fragment key={id}>
                {this.renderSingleSelect(control)}
              </React.Fragment>)
            case 'multiselect':
              return (<React.Fragment key={id}>
                {this.renderMultiSelect(control)}
              </React.Fragment>)
            case 'checkbox':
              return (<React.Fragment key={id}>
                {this.renderCheckbox(control)}
              </React.Fragment>)
            }
            return null
          })}
        </div>
      </div>
    )
  }

  renderNotifications() {
    const { locale } = this.props
    let { updateMessage, updateMsgKind } = this.state
    const { validPolicyName, duplicateName, notificationOpen } = this.state
    // If the name is duplicate and there are no other errors, display an alert
    if ((!updateMessage || updateMsgKind === 'success') && duplicateName) {
      updateMsgKind = 'warning'
      updateMessage = msgs.get('warning.policy.duplicateName', locale)
    }
    if (updateMessage && notificationOpen || duplicateName) {
      return (
        <Alert variant={updateMsgKind} isInline={true} title={msgs.get(`${updateMsgKind}.create.policy`, locale)}
          actionClose={<AlertActionCloseButton onClose={() => this.setState({ notificationOpen: false, duplicateName: false})} />}>
          {validPolicyName
            ? updateMessage
            : <span>
                <br />{msgs.get('error.policy.nameFormat.hint', locale)}
                <br />{msgs.get('error.policy.nameFormat', locale)}
                <br />{msgs.get('error.policy.nameFormat.Rule1', locale)}
                <br />{msgs.get('error.policy.nameFormat.Rule2', locale)}
                <br />{msgs.get('error.policy.nameFormat.Rule3', locale)}
                <br />{msgs.get('error.policy.nameFormat.Rule4', locale)}
              </span>
          }
        </Alert>
      )
    }
    return null
  }

  handlePolicyNameValidation = (policyName, policyNS) => {
    const { controlData } = this.state
    const { existing, existingByNamespace } = controlData.find(control => control.id === 'name')
    let isDuplicateName = false
    let validPolicyNameFormat = true
    // If both a policy name and namespace are provided, check for duplication and formatting
    if (policyName && policyNS) {
      // Check to see whether the policy name exists already
      if (existing && existingByNamespace) {
        isDuplicateName = existing.includes(policyName) && existingByNamespace[policyName] === policyNS
      }
      // Validate name with RegEx
      validPolicyNameFormat = policyNameRegex.test(`${policyNS}.${policyName}`)
    }
    // Set state appropriately
    this.setState({
        validPolicyName: validPolicyNameFormat,
        duplicateName: this.props.isEdit ? false: isDuplicateName
    })
  }

  renderTextInput(control) {
    const {id, name, active:value, mustExist} = control
    const { validPolicyName, duplicateName } = this.state

    return (
      <React.Fragment>
        <div className='creation-view-controls-textbox'>
          <div className="creation-view-controls-textbox-title">
            {name}
            {mustExist ? <div className='creation-view-controls-must-exist'>*</div> : null}
          </div>
          <TextInput
            aria-label={id}
            id={id}
            value={value}
            onChange={this.onChange.bind(this, id)}
            isRequired={mustExist}
            validated={!validPolicyName?ValidatedOptions.error:duplicateName?ValidatedOptions.warning:ValidatedOptions.default}
            type="text"
            isDisabled={this.props.isEdit}
          />
        </div>
      </React.Fragment>
    )
  }

  renderCheckbox(control) {
    const {locale} = this.props
    const {id, name, description, checked, available, active} = control
    if (id === 'remediation') {
      const radioButtons=[]
      available.forEach((item) => {
        radioButtons.push(<Radio
            isChecked={item===active}
            name={`${id}-${item}`}
            onChange={this.handleChange.bind(this, id)}
            label={<React.Fragment>
              {msgs.get(`creation.view.policy.${item}`)}
              {item === 'enforce' && generalDocLink(
                locale,
                ` ${msgs.get('creation.view.policy.doc', locale)}`,
                'html/governance/governance#kubernetes-configuration-policy-controller')}
            </React.Fragment>}
            aria-label={`${id}-${item}`}
            id={`${id}-${item}`}
            key={`${id}-${item}`}
            value={item} /> )
        })
      return (
        <React.Fragment>
          <div className='creation-view-controls-radiobutton'>
            <div className="creation-view-controls-textbox-title">
              {name}
              <div className='creation-view-controls-must-exist'>*</div>
              <GrayOutlinedQuestionCircleIcon tooltip={description} />
            </div>
            {radioButtons}
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <div className="creation-view-controls-textbox-title">
          {name}
          <GrayOutlinedQuestionCircleIcon tooltip={description} />
        </div>
        <div className='creation-view-controls-checkbox'>
          <Checkbox aria-label={id} id={id} isChecked={checked} label={msgs.get(`description.title.${id}`)} onChange={this.onChange.bind(this, id)} />
        </div>
      </React.Fragment>
    )
  }
  onToggle = (id, isOpen) => {
    this.setState((state) => {
      state.controlState[id] = { isOpen }
      return state
    })
  }
  renderSingleSelect(control) {
    const {locale, isEdit} = this.props
    const {id, name, available, description, isOneSelection, mustExist, active} = control
    const {controlState} = this.state
    return (
      <React.Fragment>
        <div className='creation-view-controls-singleselect'
          ref={isOneSelection ? ()=>{/*This is intentional*/} : this.setMultiSelectCmp.bind(this, id)} >
          <div className="creation-view-controls-multiselect-title">
            {name}
            {mustExist ? <div className='creation-view-controls-must-exist'>*</div> : null}
            <GrayOutlinedQuestionCircleIcon tooltip={description} />
          </div>
          <Select
            variant={SelectVariant.typeahead}
            onToggle={this.onToggle.bind(this, id)}
            onSelect={(event, selection)=>{
              controlState[id] = {
                selected: selection,
                isOpen: false,
              }
              this.setState({controlState})
              this.handleChange.bind(this, id)(selection, event)
            }}
            selections={active}
            aria-label={msgs.get('policy.create.namespace.tooltip', locale)}
            toggleAriaLabel={id}
            placeholderText={msgs.get('policy.create.namespace.tooltip', locale)}
            isOpen={controlState[id]&&controlState[id].isOpen}
            isDisabled={isEdit}
          >
            {available.map((option) => (
              <SelectOption isDisabled={false} key={option} value={option} />
            ))}
          </Select>
        </div>
      </React.Fragment>
    )
  }

  renderMultiSelect(control) {
    const {id, name, placeholder:ph, description, isOneSelection, mustExist, active=[]} = control
    const {controlState} = this.state

    // see if we need to add user additions to available (from editing the yaml file)
    const {userData, userMap, hasCapturedUserSource} = control
    let {available, availableMap} = control
    if (userData) {
      if (!hasCapturedUserSource) {
        available = [...userData, ...available]
        availableMap = {...userMap, ...availableMap}
      } else {
        // if user edited the source, we can't automatically update it
        available = active
        availableMap = null
      }
    }

    // place holder
    let placeholder = ph
    if (active.length>0) {
      const activeKeys = []
      active.forEach(actKey=>{
        if (availableMap && typeof availableMap === 'object' && availableMap[actKey]) {
          const {name:actName} = availableMap[actKey]
          activeKeys.push(actName||actKey)
        } else {
          activeKeys.push(actKey)
        }
      })
      placeholder = activeKeys.join(', ')
    }

    // change key if active changes so that carbon component is re-created with new initial values
    // const key = `${id}-${active.join('-')}`
    return (
      <React.Fragment>
        <div className='creation-view-controls-multiselect'
          ref={isOneSelection ? ()=>{/*This is intentional*/} : this.setMultiSelectCmp.bind(this, id)} >
          <div className="creation-view-controls-multiselect-title">
            {name}
            {mustExist ? <div className='creation-view-controls-must-exist'>*</div> : null}
            <GrayOutlinedQuestionCircleIcon tooltip={description} />
          </div>
          <Select
            variant={SelectVariant.typeaheadMulti}
            onToggle={this.onToggle.bind(this, id)}
            onSelect={(event, selection)=>{
              if (!active.includes(selection)) {
                active.push(selection)
              } else {
                _.remove(active, (item) => item === selection)
              }
              controlState[id] = {
                selected: active,
                isOpen: false,
              }
              this.setState({controlState})
              this.handleChange.bind(this, id)(active, event)
            }}
            onClear={() => {
              controlState[id] = {
                selected: [],
                isOpen: false,
              }
              this.setState({controlState})
              this.handleChange.bind(this, id)([], event)
            }}
            selections={active}
            isOpen={controlState[id]&&controlState[id].isOpen}
            aria-label={placeholder}
            toggleAriaLabel={id}
            placeholderText={placeholder}
          >
            {available.map((option) => (
              <SelectOption isDisabled={false} key={option} value={option} />
            ))}
          </Select>
        </div>
      </React.Fragment>
    )
  }

  renderEditor() {
    const { templateYAML } = this.state
    return (
      <div className='creation-view-yaml' >
        <YamlEditor
          width={'100%'}
          height={'100%'}
          wrapEnabled={true}
          setEditor={this.setEditor}
          onYamlChange={this.handleEditorChange}
          yaml={templateYAML} />
      </div>
    )
  }

  handleChange(field, evt, other) {
    this.onChange(field, evt, other)
  }

  onChange(field, evt, other) {
    const { locale } = this.props
    let updateName = false
    let { isCustomName } = this.state
    const { controlData, templateYAML, updateMessage, templateObject } = this.state
    const control = controlData.find(({id})=>id===field)
    switch (control.type) {
    case 'text':
      control.active = evt.trim()
      isCustomName = field==='name'
      break
    case 'singleselect':
      control.active = evt
      break
    case 'multiselect':
      control.active = evt
      // if user was able to select something that automatically
      // generates the name, blow away the user name
      updateName = !isCustomName && control.updateNamePrefix
      break
    case 'checkbox':
      if (control.name === 'Remediation') {
        control.active = other.currentTarget.value
        break
      }
      control.active = evt
      control.checked = evt
      break
    }

    // update name if spec changed
    if (updateName) {
      let cname
      const nname = controlData.find(({id})=>id==='name')
      if (nname) {
        if (control.active.length>0) {
          cname = control.updateNamePrefix +
            control.availableMap[control.active[0]].name.replace(/\W/g, '-')
        } else {
          cname = this.props.controlData.find(({id})=>id==='name').active
        }
        nname.active = cname.toLowerCase()
      }
    }
    const {template} = this.props
    const newTemplateYAML = generateYAML(template, controlData)
    const { parsed: newTemplateObject, exceptions }= parseYAML(newTemplateYAML)
    const finalTemplateObject = _.mergeWith(templateObject, newTemplateObject, (objValue, srcValue, key) => {
      if (key === 'policy-templates' || key === 'matchExpressions') {
        return srcValue
      }
      return undefined
    })
    const finalYaml = dumpYAMLFromTemplateObject(finalTemplateObject)
    // Get highlight decorations
    const highlights = highlightChanges(this.editor, templateYAML, finalYaml)
    // Validate YAML and attach highlights and exception decorations
    validateYAML(finalTemplateObject, controlData, exceptions, locale)
    this.handleExceptions(exceptions, highlights)
    this.setState({controlData, isCustomName, templateYAML: finalYaml, templateObject: finalTemplateObject})
    // If updateMessage is not empty, then there might be a notification message that we'll need to update
    if (updateMessage) {
      this.handleExceptionNotification(exceptions, 'success.edit.policy.check', locale)
    }
    // Run validation on the name
    this.handlePolicyNameValidation(controlData.find(data => data.id === 'name').active, controlData.find(data => data.id === 'namespace').active)
    return field
  }

  setMultiSelectCmp(field, ref) {
    this.multiSelectCmpMap[field] = ref
  }

  setEditor = (editor) => {
    this.editor = editor
    this.layoutEditors()
  }

  layoutEditors() {
    if (this.containerRef && this.editor) {
      const controlsSize = this.handleSplitterDefault()
      const rect = this.containerRef.getBoundingClientRect()
      const width = rect.width - controlsSize - 75
      const height = rect.height
      this.editor.layout({width, height})
    }
  }

  // text editor commands
  handleEditorCommand(command) {
    switch (command) {
    case 'next':
    case 'previous':
      if (this.selectionIndex !== -1 && this.selections && this.selections.length > 1) {
        switch (command) {
        case 'next':
          this.selectionIndex++
          if (this.selectionIndex>=this.selections.length) {
            this.selectionIndex = 0
          }
          break
        case 'previous':
          this.selectionIndex--
          if (this.selectionIndex<0) {
            this.selectionIndex = this.selections.length-1
          }
          break
        }
        this.editor.revealLineInCenter(this.selections[this.selectionIndex].selectionStartLineNumber, 0)
      }
      break
    case 'undo':
      if (this.editor) {
        this.editor.trigger('api', 'undo')
      }
      break
    case 'redo':
      if (this.editor) {
        this.editor.trigger('api', 'redo')
      }
      break
    case 'restore':
      this.resetEditor()
      break
    case 'close':
      this.closeEdit()
      break
    }
    return command
  }

  closeEdit()  {
    localStorage.setItem(tempCookie, false)
    document.getElementById('edit-yaml').checked = false
    this.setState({showEditor: false})
  }

  handleSearchChange(searchName) {
    if (searchName.length>1 || this.nameSearchMode) {
      if (searchName) {
        const found = this.editor.getModel().findMatches(searchName)
        if (found.length>0) {
          this.selections = found.map(({range})=>{
            const {endColumn, endLineNumber, startColumn, startLineNumber} = range
            return  {
              positionColumn:endColumn,
              positionLineNumber:endLineNumber,
              selectionStartColumn:startColumn,
              selectionStartLineNumber:startLineNumber
            }
          })
          this.editor.setSelections(this.selections)
          this.editor.revealLineInCenter(this.selections[0].selectionStartLineNumber, 0)
          this.selectionIndex = 1
        } else {
          this.selections = null
          this.selectionIndex = -1
        }
      } else {
        this.selections = null
        this.selectionIndex = -1
      }
      this.nameSearch = searchName
      this.nameSearchMode = searchName.length>0
    }
  }

  handleEditorChange = (templateYAML) => {
    const { isEdit } = this.props
    const { templateObject } = this.state
    const { parsed: newParsed, exceptions } = parseYAML(templateYAML)
    let undo = false
    if (isEdit && exceptions.length === 0) {
      // in edit mode, revert any change to policy/pb/plr name and namespace
      const yamls = ['Policy', 'PlacementRule', 'PlacementBinding']
      yamls.forEach(e => {
        if (_.get(newParsed,`${e}[0].$raw.metadata.name`) !== _.get(templateObject,`${e}[0].$raw.metadata.name`) ||
          _.get(newParsed,`${e}[0].$raw.metadata.namespace`) !== _.get(templateObject,`${e}[0].$raw.metadata.namespace`)) {
            undo = true
        }
        if (!templateObject[e]) {
          undo = false
        }
      })
    }
    if (undo) {
      this.editor.trigger('api', 'undo')
    } else {
      this.setState({templateYAML})
      this.parseDebounced()
    }
  }

  handleExceptions = (exceptions, decorationList=[]) => {
    // update editor annotations
    if (this.editor) {
      // Decorate with error icon and tooltip message in the margin
      exceptions.forEach(({row, text})=>{
        decorationList.push({
          range: new this.editor.monaco.Range(row, 0, row, 132),
          options: {
            glyphMarginClassName: 'errorDecoration',
            glyphMarginHoverMessage: {value: text},
            minimap: {color: 'red' , position: 1}
          }
        })
      })
      // Decorate text with squiggly underline under the error
      exceptions.forEach(({row, column})=>{
        decorationList.push({
          range: new this.editor.monaco.Range(row, column-6, row, column+6),
          options: {
            className: 'squiggly-error',
          }
        })
      })
      // Let editor update before adding decorations
      setTimeout(() => {
        this.editor.decorations = this.editor.deltaDecorations(this.editor.decorations, decorationList)
      }, 500)
    }
  }

  handleParse = () => {
    const { locale }= this.props
    let { isCustomName } = this.state
    const { templateYAML, templateObject, updateMessage } = this.state
    let { controlData } = this.state

    // Parse, validate, and add exception decorations
    const { parsed: newParsed, exceptions } = parseYAML(templateYAML)
    validateYAML(newParsed, controlData, exceptions, locale)
    this.handleExceptions(exceptions)
    // If updateMessage is not empty, then there might be a notification message that we'll need to update
    if (updateMessage) {
      this.handleExceptionNotification(exceptions, 'success.edit.policy.check', locale)
    }

    // if no exceptions, update controlData based on custom editing
    if (Object.keys(newParsed).some(item => newParsed[item].length>0)) {
      controlData = _.cloneDeep(controlData)
      if (updateControls(controlData, templateObject, newParsed, locale)) {
        isCustomName = true
      }
    }
    this.setState({controlData, isCustomName, templateObject: newParsed})
    // Validate policy name
    this.handlePolicyNameValidation(controlData.find(control => control.id === 'name').active, controlData.find(data => data.id === 'namespace').active)
    return templateYAML // for jest test
  }

  handleUpdateMessageClosed = () => this.setState({ updateMessage: '' })

  handleExceptionNotification = (exceptions, message, locale) => {
    const errorMsg = exceptions.length>0 ? exceptions[0].text : null
    const { validPolicyName } = this.state
    this.setState({
      updateMsgKind: (errorMsg || !validPolicyName)?'danger':'success',
      updateMessage: errorMsg||msgs.get(message, locale),
      notificationOpen: true
    })
    // We're heading to 'Create', so we no longer need the duplicate name alert
    if (!errorMsg && message === 'success.create.policy.check') {
      this.setState({duplicateName: false})
    }
    return errorMsg
  }

  getResourceJSON() {
    const { locale } = this.context
    const { controlData, templateYAML } = this.state
    const { parsed, exceptions } = parseYAML(templateYAML)
    if (exceptions.length===0) {
      validateYAML(parsed, controlData, exceptions, locale)
    }
    const errorMsg = this.handleExceptionNotification(exceptions, 'success.create.policy.check', locale)
    if (!errorMsg) {
      // cache user data
      cacheUserData(controlData)

      // create payload
      const payload = []
      Object.entries(parsed).forEach(([, values])=>{
        values.forEach(({$raw})=>{
          if ($raw) {
            payload.push($raw)
          }
        })
      })
      return payload
    }
    return null
  }

  renderUpdatePrompt(locale) {
    let msg = ''
    if (this.state.toCreate && this.state.toUpdate) {
      if (this.state.toCreate.length > 0) {
        msg += `${(this.state.toCreate.map((rsc) => rsc.metadata.name)).join(', ')} ${msgs.get('update.list.create', locale)}`
      }
      if (this.state.toCreate.length > 0 && this.state.toUpdate.length > 0) {
        msg += '; '
      }
      if (this.state.toUpdate.length > 0) {
        msg += `${(this.state.toUpdate.map((rsc) => rsc.metadata.name)).join(', ')} ${msgs.get('update.list.update', locale)}`
      }
    }
    return (
      <AcmModal
        titleIconVariant='warning'
        variant='medium'
        id='policy-update-modal'
        isOpen={this.state.canOpenModal}
        showClose={true}
        onClose={() => {
          this.setState({ canOpenModal: false })
        }}
        title={msgs.get('update.existing', locale)}
        actions={[
          <AcmButton key="confirm" variant={ButtonVariant.primary} onClick={() => {
            this.handleUpdateResource(this.state.toCreate, this.state.toUpdate)
            this.setState({ canOpenModal: false })
          }}>
            {msgs.get('update.apply', locale)}
          </AcmButton>,
          <AcmButton key="cancel" variant={ButtonVariant.link} onClick={() => {
            this.setState({ canOpenModal: false })
          }}>
            {msgs.get('update.cancel', locale)}
          </AcmButton>,
        ]}>
        <p>{`${msgs.get('update.question', locale)} ${msg}`}</p>
      </AcmModal>
    )
  }

  async handleCreateResource() {
    const { buildControl, createControl, isEdit } = this.props
    const { validPolicyName } = this.state
    const {createResource} = createControl
    const {buildResourceLists} = buildControl
    const resourceJSON = this.getResourceJSON()
    if (resourceJSON && validPolicyName) {
      if (isEdit) {
        this.handleUpdateResource([], resourceJSON)
      } else {
        const res = await buildResourceLists(resourceJSON)
        const create = res.create
        const update = res.update
        if (update.length === 0) {
          createResource(create)
        } else {
          this.setState({
            canOpenModal: true,
            toCreate: create,
            toUpdate: update
          })
        }
      }
    }
  }

  handleUpdateResource(create, update) {
    const { createAndUpdateControl } = this.props
    const {createAndUpdateResource} = createAndUpdateControl
    createAndUpdateResource(create, update)
  }

  resetEditor() {
    const {resetInx} = this.state
    const { template, controlData: initialControlData } = this.props
    const controlData = initializeControlData(template, initialControlData)
    const templateYAML = generateYAML(template, controlData)
    const templateObject = parseYAML(templateYAML).parsed
    this.setState({controlData, templateYAML, templateObject,
      resetInx:resetInx+1, updateMessage:'',
      duplicateName: false, validPolicyName: true, isCustomName: false
    })
  }
}
