/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import SplitPane from 'react-split-pane'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  Button,
  Notification,
  TextInput,
  Checkbox,
  DropdownV2,
  MultiSelect,
  ToggleSmall,
  Modal} from 'carbon-components-react'
import { Spinner, Tooltip } from '@patternfly/react-core'
import { initializeControlData, cacheUserData, updateControls, parseYAML } from './utils/update-controls'
import { generateYAML, highlightChanges } from './utils/update-editor'
import { validateYAML } from './utils/validate-yaml'
import EditorHeader from './components/EditorHeader'
import EditorBar from './components/EditorBar'
import YamlEditor from './components/YamlEditor'
import './scss/template-editor.scss'
import msgs from '../../../../nls/platform.properties'
import '../../../../graphics/diagramIcons.svg'
import { LocaleContext } from '../../../components/common/LocaleContext'
import _ from 'lodash'

const tempCookie = 'template-editor-open-cookie'
const diagramIconsInfoStr = '#diagramIcons_info'
// Regex to test valid policy name format
// (253 allowable characters, but we have a 'placement-' prefix for PlacementRule,
// so we're limiting the name input to 243 characters)
const policyNameRegex = RegExp(/^[a-z0-9][a-z0-9-.]{0,241}[a-z0-9]$/)
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
    locale: PropTypes.string,
    portals: PropTypes.object.isRequired,
    template: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }

  static contextType = LocaleContext

  static getDerivedStateFromProps(props, state) {
    const {fetchControl, createControl={}, createAndUpdateControl={}} = props
    const {isLoaded} = fetchControl || {isLoaded:true}
    const {creationStatus, creationMsg} = createControl
    const {createAndUpdateMsg} = createAndUpdateControl
    if (creationStatus === 'ERROR') {
      return {updateMsgKind: 'error', updateMessage: creationMsg}
    } else if (createAndUpdateMsg) {
      return {updateMsgKind: 'error', updateMessage: createAndUpdateMsg}
    } else if (isLoaded) {
      const { template, controlData: initialControlData } = props
      let { controlData, templateYAML, templateObject } = state

      // initialize controlData, templateYAML, templateObject
      if (!controlData) {
        controlData = initializeControlData(template, initialControlData)
        templateYAML = generateYAML(template, controlData)
        templateObject = parseYAML(templateYAML).parsed
        return { controlData, templateYAML, templateObject }
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
      exceptions: [],
      updateMessage: '',
      hasUndo: false,
      hasRedo: false,
      resetInx: 0,
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
    window.addEventListener('resize',  this.layoutEditors.bind(this))
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
        return <Notification title='' className='overview-notification' kind='error'
          subtitle={msgs.get('error.permission.denied.create', locale)} />
      }
      return <Notification title='' className='overview-notification' kind='error'
        subtitle={msgs.get('overview.error.default', locale)} />
    }

    const viewClasses = classNames({
      'creation-view': true,
      showEditor
    })
    return (
      <div key={`key${resetInx}`} className={viewClasses} ref={this.setContainerRef}>
        {this.conditionalRenderUpdate(locale)}
        {this.renderEditButton()}
        {this.renderCreateButton()}
        {this.renderCancelButton()}
        {this.renderSplitEditor()}
      </div>
    )
  }

  renderSplitEditor() {
    const { showEditor } = this.state
    const editorClasses = classNames({
      'creation-view-split-container': true,
      showEditor
    })
    return (
      <div className={editorClasses}>
        {showEditor ? (
          <SplitPane
            split="vertical"
            minSize={300}
            maxSize={-500}
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
    const { locale } = this.props
    const {controlData} = this.state
    return (
      <div className='creation-view-controls-container' >
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
    const { validPolicyName, duplicateName } = this.state
    // If the name is duplicate and there are no other errors, display an alert
    if ((!updateMessage || updateMsgKind === 'success') && duplicateName) {
      updateMsgKind = 'warning'
      updateMessage = msgs.get('warning.policy.duplicateName', locale)
    }
    if (updateMessage) {
      const handleClick = () => {
        //This is intentional
      }
      const handleKeyPress = (e) => {
        if ( e.key === 'Enter') {
          handleClick()
        }
      }

      return <div role='button' onClick={handleClick}
        tabIndex="0" aria-label={updateMessage} onKeyDown={handleKeyPress}>
        <div  >
          <Notification
            key={updateMessage}
            kind={updateMsgKind}
            title={msgs.get(`${updateMsgKind}.create.policy`, locale)}
            iconDescription=''
            subtitle={validPolicyName
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
            className='persistent notification'
            onCloseButtonClick={this.handleUpdateMessageClosed}
          />
        </div>
      </div>
    }
    return null
  }

  handlePolicyNameValidation = (policyName, policyNS) => {
    const { controlData } = this.state
    const { existing, existingByNamespace } = controlData.find(control => control.id === 'name')
    let isDuplicateName = false
    let validPolicyNameFormat = true
    if (policyName) {
      // Check to see whether the policy name exists already
      if (existing && existingByNamespace) {
        isDuplicateName = existing.includes(policyName) && existingByNamespace[policyName] === policyNS
      }
      // Validate name with RegEx
      validPolicyNameFormat = policyNameRegex.test(policyName)
    }
    // Set state appropriately
    this.setState({
        validPolicyName: validPolicyNameFormat,
        duplicateName: isDuplicateName
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
            invalid={!validPolicyName || duplicateName}
            hideLabel
            labelText=''
            spellCheck={false}
            value={value}
            onChange={this.onChange.bind(this, id)} />
        </div>
      </React.Fragment>
    )
  }

  renderCheckbox(control) {
    const {id, name, description, checked} = control
    return (
      <React.Fragment>
        <div className='creation-view-controls-checkbox'>
          <Checkbox
            aria-label={id}
            id={id}
            className='checkbox'
            hideLabel
            labelText=''
            checked={checked}
            onChange={this.onChange.bind(this, id)} />
          <div>{name}</div>
          <Tooltip content={description}>
            <svg className='info-icon'>
              <use href={diagramIconsInfoStr} ></use>
            </svg>
          </Tooltip>
        </div>
      </React.Fragment>
    )
  }

  renderSingleSelect(control) {
    const {locale} = this.props
    const {id, name, available, description, isOneSelection, mustExist} = control
    let { active } = control
    // for DropdownV2, empty initialSelectedItem means no pre-selected
    active = (active && typeof active === 'string') ? active : ''
    const key = `${id}-${active}`
    return (
      <React.Fragment>
        <div className='creation-view-controls-singleselect'
          ref={isOneSelection ? ()=>{/*This is intentional*/} : this.setMultiSelectCmp.bind(this, id)} >
          <div className="creation-view-controls-multiselect-title">
            {name}
            {mustExist ? <div className='creation-view-controls-must-exist'>*</div> : null}
            <Tooltip content={description}>
              <svg className='info-icon'>
                <use href={diagramIconsInfoStr} ></use>
              </svg>
            </Tooltip>
          </div>
          <DropdownV2
            aria-label={id}
            key={key}
            label={msgs.get('policy.create.namespace.tooltip', locale)}
            items={available}
            onChange={this.handleChange.bind(this, id)}
            initialSelectedItem={active} />
        </div>
      </React.Fragment>
    )
  }

  renderMultiSelect(control) {
    const {id, name, placeholder:ph, description, isOneSelection, mustExist} = control

    // see if we need to add user additions to available (from editing the yaml file)
    const {active=[], userData, userMap, hasCapturedUserSource} = control
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
    const key = `${id}-${active.join('-')}`
    return (
      <React.Fragment>
        <div className='creation-view-controls-multiselect'
          ref={isOneSelection ? ()=>{/*This is intentional*/} : this.setMultiSelectCmp.bind(this, id)} >
          <div className="creation-view-controls-multiselect-title">
            {name}
            {mustExist ? <div className='creation-view-controls-must-exist'>*</div> : null}
            <Tooltip content={description}>
              <svg className='info-icon'>
                <use href={diagramIconsInfoStr} ></use>
              </svg>
            </Tooltip>
          </div>
          <MultiSelect.Filterable
            aria-label={id}
            key={key}
            items={available}
            initialSelectedItems={active}
            placeholder={placeholder}
            itemToString={item=>item}
            onChange={this.handleChange.bind(this, id)} />
        </div>
      </React.Fragment>
    )
  }

  renderEditor() {
    const { locale } = this.context
    const { templateYAML, hasUndo, hasRedo, exceptions } = this.state
    return (
      <div className='creation-view-yaml' >
        <EditorHeader
          locale={locale}
        >
          <EditorBar
            hasUndo={hasUndo}
            hasRedo={hasRedo}
            exceptions={exceptions}
            gotoEditorLine={this.gotoEditorLine}
            handleEditorCommand={this.handleEditorCommand}
            handleSearchChange={this.handleSearchChange}
          />
        </EditorHeader>
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

  handleChange(field, evt) {
    const multiSelect = this.multiSelectCmpMap[field]

    // if this multiselect has an isOneSelection option, close on any selection
    if (multiSelect) {
      // if menu is still open don't update until its gone
      // unfortunately MultiSelect.Filterable doesn't have an onClose
      const menu = multiSelect.getElementsByClassName('bx--list-box__menu')
      if (menu && menu.length>0) {
        multiSelect.selectedItems = evt.selectedItems
        if (!multiSelect.observer) {
          multiSelect.observer = new MutationObserver(() => {
            this.onChange(field, {selectedItems: multiSelect.selectedItems})
            multiSelect.observer.disconnect()
            delete multiSelect.observer
          })
          multiSelect.observer.observe(menu[0].parentNode, {
            childList: true
          })
        }
        return
      }
    }
    this.onChange(field, evt)
  }

  onChange(field, evt) {
    const { locale } = this.props
    let updateName = false
    let { isCustomName } = this.state
    const { controlData, templateYAML, updateMessage } = this.state
    const control = controlData.find(({id})=>id===field)
    switch (control.type) {
    case 'text':
      control.active = evt.target.value
      isCustomName = field==='name'
      break
    case 'singleselect':
      control.active = evt.selectedItem
      break
    case 'multiselect':
      control.active = evt.selectedItems
      // if user was able to select something that automatically
      // generates the name, blow away the user name
      updateName = !isCustomName && control.updateNamePrefix
      break
    case 'checkbox':
      control.active = evt ? control.available[1] : control.available[0]
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
    const newYAML = generateYAML(template, controlData)
    const { parsed: templateObject, exceptions }= parseYAML(newYAML)
    // Get highlight decorations
    const highlights = highlightChanges(this.editor, templateYAML, newYAML)
    // Validate YAML and attach highlights and exception decorations
    validateYAML(templateObject, controlData, exceptions, locale)
    this.handleExceptions(exceptions, highlights)
    this.setState({controlData, isCustomName, templateYAML: newYAML, templateObject, exceptions})
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
    editor.onDidChangeModelContent(() => {
      const model = editor.getModel()
      const hasUndo = model.canUndo()
      const hasRedo = model.canRedo()
      this.setState({hasUndo, hasRedo})
    })
  }

  layoutEditors() {
    if (this.containerRef && this.editor) {
      const controlsSize = this.handleSplitterDefault()
      const rect = this.containerRef.getBoundingClientRect()
      const width = rect.width - controlsSize - 15
      const height = rect.height - 80
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
    this.setState({templateYAML})
    this.parseDebounced()
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
    const {locale}= this.props
    let { isCustomName } = this.state
    const { templateYAML, templateObject, updateMessage } = this.state
    let { controlData } = this.state

    // Parse, validate, and add exception decorations
    const { parsed: newParsed, exceptions} = parseYAML(templateYAML)
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
    this.setState({controlData, isCustomName, templateObject: newParsed, exceptions})
    // Validate policy name
    this.handlePolicyNameValidation(controlData.find(control => control.id === 'name').active, controlData.find(data => data.id === 'namespace').active)
    return templateYAML // for jest test
  }

  handleUpdateMessageClosed = () => this.setState({ updateMessage: '' })

  handleExceptionNotification = (exceptions, message, locale) => {
    const errorMsg = exceptions.length>0 ? exceptions[0].text : null
    this.setState({
      updateMsgKind: errorMsg?'error':'success',
      updateMessage: errorMsg||msgs.get(message, locale)
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

  renderEditButton() {
    const { portals={}, locale } = this.props
    const { editBtn } = portals
    if (editBtn) {
      const portal = document.getElementById(editBtn)
      if (portal) {
        const { showEditor } = this.state
        const handleToggle = () => {
          if (showEditor) {
            localStorage.setItem(tempCookie, 'false')
          } else {
            localStorage.setItem(tempCookie, 'true')
          }
          this.setState({showEditor: !showEditor})
        }
        this.renderedPortals = true
        return ReactDOM.createPortal(
          <div className='edit-template-switch'>
            <ToggleSmall
              id='edit-yaml'
              ariaLabel={showEditor ? msgs.get('edit.yaml.on', locale) : msgs.get('edit.yaml.off', locale)}
              defaultToggled={showEditor}
              onChange={()=>{/*This is intentional*/}}
              onToggle={handleToggle}
            />
            <div className='switch-label'>
              {showEditor ? msgs.get('edit.yaml.on', locale) : msgs.get('edit.yaml.off', locale)}
            </div>
          </div>, portal
        )
      }
    }
    return null
  }

  renderCreateButton() {
    const { portals={}, createControl, locale } = this.props
    const { createBtn } = portals
    if (createControl && createBtn) {
      const portal = document.getElementById(createBtn)
      if (portal) {
        return ReactDOM.createPortal(
          <Button id={`${createBtn}-btn`}
            onClick={this.handleCreateResource.bind(this)}
            kind={'primary'} >
            {msgs.get('button.create', locale)}
          </Button>,
          portal
        )
      }
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
      <Modal
        danger
        id='policy-update-modal'
        open={this.state.canOpenModal}
        primaryButtonText={msgs.get('update.apply', locale)}
        secondaryButtonText={msgs.get('update.cancel', locale)}
        modalLabel={msgs.get('update.existing', locale)}
        modalHeading={msgs.get('update.existing', locale)}
        onRequestClose={() => {
          this.setState({ canOpenModal: false })
        }}
        onSecondarySubmit={() => {
          this.setState({ canOpenModal: false })
        }}
        onRequestSubmit={() => {
          this.handleUpdateResource(this.state.toCreate, this.state.toUpdate)
          this.setState({ canOpenModal: false })
        }}
        role='region'
        aria-label={'policy-update'}>
        <p>{`${msgs.get('update.question', locale)} ${msg}`}</p>
      </Modal>
    )
  }

  async handleCreateResource() {
    const { buildControl, createControl } = this.props
    const {createResource} = createControl
    const {buildResourceLists} = buildControl
    const resourceJSON = this.getResourceJSON()
    if (resourceJSON) {
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

  handleUpdateResource(create, update) {
    const { createAndUpdateControl } = this.props
    const {createAndUpdateResource} = createAndUpdateControl
    createAndUpdateResource(create, update)
  }

  renderCancelButton() {
    const { portals={}, createControl, locale } = this.props
    const { cancelBtn } = portals
    if (createControl && cancelBtn) {
      const portal = document.getElementById(cancelBtn)
      if (portal) {
        const {cancelCreate} = createControl
        return ReactDOM.createPortal(
          <Button id={`${cancelBtn}-btn`}
            onClick={cancelCreate}
            kind={'secondary'} >
            {msgs.get('button.cancel', locale)}
          </Button>,
          portal
        )
      }
    }
    return null
  }

  resetEditor() {
    const {resetInx} = this.state
    const { template, controlData: initialControlData } = this.props
    const controlData = initializeControlData(template, initialControlData)
    const templateYAML = generateYAML(template, controlData)
    const templateObject = parseYAML(templateYAML).parsed
    this.setState({controlData, templateYAML, templateObject, exceptions:[],
      hasUndo: false, hasRedo: false, resetInx:resetInx+1, updateMessage:'',
      duplicateName: false, validPolicyName: true, isCustomName: false
    })
  }
}
