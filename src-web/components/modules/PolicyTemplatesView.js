/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import msgs from '../../../nls/platform.properties'
import jsYaml from 'js-yaml'
import YamlEditor from '../common/YamlEditor'
import _ from 'lodash'
import { dumpAndParse } from '../../../lib/client/design-helper'
import { Button, InlineNotification } from 'carbon-components-react'
import { Spinner } from '@patternfly/react-core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Module, ModuleHeader } from 'carbon-addons-cloud-react'
import { editResource } from '../../actions/common'
import { createDisableTooltip } from '../common/DisableTooltip'
import { REQUEST_STATUS } from '../../actions'
import formatUserAccess from '../common/FormatUserAccess'
import filterUserAction from '../common/FilterUserAction'
import { RESOURCE_TYPES } from '../../../lib/shared/constants'

class PolicyTemplatesView extends React.Component {

  constructor(props) {
    super(props)
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.state = {
      readOnly: true,
      yamlParsingError: null,
    }
  }
  static defaultProps = {
    viewOnly: false,
    resourceType: RESOURCE_TYPES.POLICIES_BY_POLICY,
  }

  UNSAFE_componentWillMount() {
    const { resourceData } = this.props
    const { yaml } = dumpAndParse(resourceData)
    if (yaml && !this.state.yaml) {
      this.setState({ yaml })
    }
  }

  componentDidMount() {
    window.addEventListener('resize',  this.layoutEditors.bind(this))
  }

  setContainerRef = container => {
    this.containerRef = container
    this.layoutEditors()
  }

  setEditor = (editor) => {
    this.editor=editor
    this.layoutEditors()
  }

  layoutEditors() {
    if (this.containerRef && this.editor) {
      const rect = this.containerRef.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      this.editor.layout({width, height})
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.reqStatus &&
      nextProps.reqStatus === REQUEST_STATUS.ERROR &&
      (this.state.reqStatus !== nextProps.reqStatus)
    ) {
      this.setState({
        reqStatus: nextProps.reqStatus,
        reqErrorMsg: nextProps.reqErrorMsg
      })
    }
    if (
      nextProps.reqStatus &&
      nextProps.reqStatus === REQUEST_STATUS.DONE &&
      this.state.updated
    ) {
      this.setState({
        readOnly: true
      })
    }
  }

  handleEditBtnClick() {
    this.setState(preState => {
      return {
        readOnly: !preState.readOnly,
        updated: false
      }
    })
  }

  handleSubmitClick() {
    const {
      editResource:localEditResource,
      resourceType,
      resourceData,
    } = this.props
    const { yaml }  = this.state
    let resource
    try {
      resource = jsYaml.safeLoad(yaml)
    } catch (e) {
      this.setState({ yamlParsingError: e })
      return
    }
    const namespace = _.get(resourceData, 'metadata.namespace')
    const name = _.get(resourceData, 'metadata.name')
    localEditResource(resourceType, namespace, name, resource, resourceData)
    this.setState({
      updated: true
    })
  }

  handleNotificationClosed = () => this.setState({ yamlParsingError: null })

  handleRequestNotificationClosed = () => this.setState({ reqErrorMsg: null })

  handleEditorChange = (yaml) => this.setState({ yaml })

  render() {
    const { headerKey, reqStatus, className, userAccess, resourceData, viewOnly, resourceType } = this.props
    const userAccessHash = formatUserAccess(userAccess)
    const actions = ['table.actions.edit']
    const filteredActions = filterUserAction(resourceData, actions, userAccessHash, resourceType)
    const disableFlag = (Array.isArray(filteredActions) && filteredActions[0])
      ? filteredActions[0].includes('disabled.')
      : true
    return (
      <Module
        className={
          className
            ? className
            :'structured-list-module'
        }
        id='yaml-template'
      >
        <div>
          <ModuleHeader>
            {`${
              msgs.get(headerKey, this.context.locale)}${this.state.updated
              ? ' -  updated'
              : ''
            }`}
          </ModuleHeader>
          {!viewOnly &&
          <div className='yaml-editor-button'>
            {createDisableTooltip(disableFlag, 'edit-resource', this.context.locale,
              (<Button
                disabled={disableFlag}
                icon="add--glyph"
                className={this.state.readOnly ? 'read-only-button' : 'editing-button'}
                small id={'edit-button'}
                key='edit-resource'
                onClick={this.handleEditBtnClick}>
                {msgs.get('table.actions.edit', this.context.locale)}
              </Button>))}
            {createDisableTooltip(disableFlag, 'submit-button', this.context.locale,
              (<Button
                disabled={disableFlag}
                icon="add--glyph" small
                id={'submit-button'}
                key='submit-resource-change'
                onClick={this.handleSubmitClick}>
                {msgs.get('modal.button.submit', this.context.locale)}
              </Button>))}
          </div>}
        </div>
        {this.state.yamlParsingError &&
        <InlineNotification
          kind='error'
          title={msgs.get('error.parse', this.context.locale)}
          iconDescription=''
          subtitle={this.state.yamlParsingError.reason}
          onCloseButtonClick={this.handleNotificationClosed}
        />
        }
        {this.state.reqErrorMsg &&
        <InlineNotification
          kind='error'
          title={msgs.get('error.parse', this.context.locale)}
          iconDescription=''
          subtitle={this.state.reqErrorMsg}
          onCloseButtonClick={this.handleRequestNotificationClosed}
        />
        }
        <div className='yamlEditorContainerContainer' ref={this.setContainerRef} >
          <YamlEditor
            width={'100%'}
            height={'100%'}
            setEditor={this.setEditor}
            readOnly={this.state.readOnly}
            onYamlChange={viewOnly ? undefined : this.handleEditorChange}
            yaml={this.state.yaml} />
        </div>
        {reqStatus === REQUEST_STATUS.IN_PROGRESS && <Spinner className='patternfly-spinner' />}
      </Module>
    )
  }
}

PolicyTemplatesView.contextTypes = {
  locale: PropTypes.string
}

PolicyTemplatesView.propTypes = {
  className: PropTypes.string,
  editResource: PropTypes.func,
  headerKey: PropTypes.string,
  reqErrorMsg: PropTypes.string,
  reqStatus: PropTypes.string,
  resourceData: PropTypes.any,
  resourceType: PropTypes.object,
  userAccess: PropTypes.array,
  viewOnly: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const { query: typeListName } = ownProps.resourceType
  const userAccess = state.userAccess ? state.userAccess.access : []
  return {
    reqStatus: state[typeListName].putStatus,
    reqErrorMsg: state[typeListName].putErrorMsg,
    userAccess: userAccess,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editResource: (resourceType, namespace, name, data, resourceData) => {
      dispatch(editResource(resourceType, namespace, name, data, resourceData))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PolicyTemplatesView))
