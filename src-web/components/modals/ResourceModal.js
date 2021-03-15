/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import _ from 'lodash'
import { Modal, InlineNotification } from 'carbon-components-react'
import { Spinner } from '@patternfly/react-core'
import resources from '../../../lib/shared/resources'
import { clearRequestStatus, editResource, updateModal } from '../../actions/common'
import { connect } from 'react-redux'
import { REQUEST_STATUS } from '../../actions/index'
import msgs from '../../../nls/platform.properties'
import { dumpAndParse, saveLoad } from '../../../lib/client/design-helper'
import YamlEditor from '../common/YamlEditor'
import PropTypes from 'prop-types'

resources(() => {
  require('../../../scss/modal.scss')
})

export class ResourceModal extends React.PureComponent {

  state = {
    reqErrorMsg: []
  }

  constructor(props) {
    super(props)
    this.state = {
      data: dumpAndParse(props.data).yaml,
    }
  }

  handleSubmit = () => {
    this.props.clearRequestStatus()
    this.setState({ reqErrorMsg: [] }, () => {
      const resourceType = this.props.resourceType
      let namespace = this.props.namespace
      let name = this.props.name
      let localResources
      try {
        localResources = _.compact(saveLoad(this.state.data))
        localResources.forEach(resource => {
          if (resource.metadata && resource.metadata.namespace) {
            namespace = resource.metadata.namespace
          }
          if (resource.metadata && resource.metadata.name) {
            name = resource.metadata.name
          }
          this.props.putResource(resourceType, namespace, name, resource, this.props.data)
        })
      } catch(e) {
        this.setState(preState => {
          return {reqErrorMsg: [...preState.reqErrorMsg, e.message]}
        })
      }
    })
  }

  handleClose = () => {
    this.setState({reqErrorMsg: []})
    this.props.handleClose()
  }

  escapeEditor = e => {
    e.persist()
    const button = document.querySelector('.bx--btn--secondary')
    e.shiftKey && e.ctrlKey && e.which === 81 && (button && button.focus())
  }

  onChange = value => {
    this.setState({data: value})
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data !== nextProps.data) {
      // this.setState({data: JSON.stringify(this.props.data, null, 2)})
      this.setState({data: dumpAndParse(this.props.data).yaml})
    }
    if (nextProps.reqStatus && nextProps.reqStatus === REQUEST_STATUS.ERROR) {
      this.setState(preState => {
        return {reqErrorMsg: [...preState.reqErrorMsg, nextProps.reqErrorMsg]}
      })
    }
    if (nextProps.reqCount === 0 && !nextProps.reqErrCount) {
      this.handleClose()
    }
  }

  componentDidMount() {
    this.resourceModal && this.resourceModal.focus()
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

  render() {
    const { reqCount, open, label, locale, resourceType } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        id='resource-modal-container'
        ref={div => this.resourceModal = div}
        tabIndex={-1}
        role='region'
        onKeyDown={this.escapeEditor}
        aria-label={msgs.get('a11y.editor.escape', locale)}
      >
        {reqCount && reqCount > 0 && <Spinner className='patternfly-spinner' />}
        <Modal
          id={`resource-modal-${resourceType.name}`}
          className='resource-modal'
          open={open}
          primaryButtonText={msgs.get(label.primaryBtn, locale)}
          secondaryButtonText={msgs.get('modal.button.cancel', locale)}
          modalLabel={msgs.get(label.label, locale)}
          modalHeading={msgs.get(label.heading, locale)}
          onRequestClose={this.handleClose}
          onRequestSubmit={this.handleSubmit}
          role='region'
          aria-label={msgs.get(label.heading, locale)}>
          <div>
            {this.state.reqErrorMsg && this.state.reqErrorMsg.length > 0 &&
              this.state.reqErrorMsg.map((err) =>
                <InlineNotification
                  key={`inline-notification-${err}`}
                  kind='error'
                  title=''
                  subtitle={err}
                  iconDescription={msgs.get('svg.description.error', locale)}
                />)
            }
            {/*{reqErrorMsg && reqErrorMsg.length > 0 &&
              <InlineNotification
              key={`inline-notification-${reqErrorMsg}`}
              kind='error' title=''
              subtitle={reqErrorMsg}
              iconDescription={msgs.get('svg.description.error', locale)} />}*/}
            <div className='yamlEditorContainerContainer' ref={this.setContainerRef} >
              <YamlEditor
                width={'50vw'}
                height={'40vh'}
                readOnly={false}
                setEditor={this.setEditor}
                onYamlChange={this.onChange}
                yaml={this.state && this.state.data}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

ResourceModal.propTypes = {
  clearRequestStatus: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handleClose: PropTypes.func,
  label: PropTypes.shape({
    heading: PropTypes.string,
    label: PropTypes.string,
    primaryBtn: PropTypes.string,
  }),
  locale: PropTypes.string,
  name: PropTypes.string,
  namespace: PropTypes.string,
  open: PropTypes.bool,
  putResource: PropTypes.func,
  reqCount: PropTypes.number,
  reqErrCount: PropTypes.number,
  reqErrorMsg: PropTypes.string,
  reqStatus: PropTypes.string,
  resourceType: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    ...state.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putResource: (resourceType, namespace, name, data, resourceData) => {
      dispatch(editResource(resourceType, namespace, name, data, resourceData))
    },
    handleClose: () => {
      dispatch(clearRequestStatus())
      dispatch(updateModal({open: false, type: 'resource'}))
    },
    clearRequestStatus: () => dispatch(clearRequestStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceModal)
