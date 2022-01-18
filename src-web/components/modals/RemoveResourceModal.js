/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AcmModal, AcmButton, AcmAlert } from '@stolostron/ui-components'
import { Spinner, ButtonVariant, Checkbox } from '@patternfly/react-core'
import msgs from '../../nls/platform.properties'
import { withRouter } from 'react-router-dom'
import { REQUEST_STATUS } from '../../actions/index'
import { removeResource, clearRequestStatus, receiveDelError, updateModal } from '../../actions/common'

class RemoveResourceModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.state = {
      selected: [],
    }
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props
    const placements = _.get(data, 'raw.status.placement', [])
    const placementBindings = placements.map(placement => {
      return {
        name: placement.placementBinding,
        selfLink: `/apis/policy.open-cluster-management.io/v1/namespaces/${data.namespace}/placementbindings/${placement.placementBinding}`,
      }
    })
    const placementRules = placements.map(placement => {
      return {
        name: placement.placementRule,
        selfLink: `/apis/apps.open-cluster-management.io/v1/namespaces/${data.namespace}/placementrules/${placement.placementRule}`,
      }
    })
    const children = []
    // Create object specifying Application resources that can be deleted
    _.map(placementBindings, (curr, idx) => {
      if (curr.name) {
        children.push({
          id: idx + '-placementBinding-' + curr.name,
          selfLink: curr.selfLink,
          label: curr.name + ' [PlacementBinding]',
          selected: true
        })
      }
    })
    _.map(placementRules, (curr, idx) => {
      if (curr.name) {
        children.push({
          id: idx + '-placementRule-' + curr.name,
          selfLink: curr.selfLink,
          label: curr.name + ' [PlacementRule]',
          selected: true
        })
      }
    })
    if (children.length > 0 && this.state.selected.length < 1) {
      this.setState({selected: children})
    }
  }

  toggleSelectedSetState = (target) => {
    this.setState((prevState) => {
      const currState = prevState.selected
      const index = currState.findIndex(item => item.id === target)
      currState[index].selected = !currState[index].selected
      return currState
    })
  }

  toggleSelected = (checked, event) => {
    this.toggleSelectedSetState(event.target.id)
  }

  toggleSelectedKeyboard = (target) => {
    this.toggleSelectedSetState(target)
  }

  handleSubmitClick() {
    const { handleSubmit, data } = this.props
    data.selected = this.state.selected
    handleSubmit()
  }

  modalBody = (data, label, locale) => {
    switch (label.label) {
    case 'modal.remove-hcmcompliance.label':
      return this.state.selected.length > 0
        ? <div className='remove-app-modal-content' >
          <div className='remove-app-modal-content-text' >
            {msgs.get('modal.remove.policy.confirm', [data.name || data.Name || data.metadata.name], locale)}
          </div>
          <div>
            {this.state.selected.map((child) => {
              return (
                <div className='remove-app-modal-content-data' key={child.id} >
                  <Checkbox
                    id={child.id}
                    isChecked={this.state.selected.some((i) => {return (i.id === child.id && child.selected === true)})}
                    onChange={this.toggleSelected}
                    onKeyPress={this.toggleSelectedKeyboard.bind(this, child.id)}
                    label={child.label}
                    aria-label={child.id} />
                </div>
              )}
            )}
          </div>
        </div>
        : <p>
          {msgs.get('modal.remove.confirm', [data.name || data.Name || data.metadata.name], locale)}
        </p>
    default:
      return (
        <p>
          {msgs.get('modal.remove.confirm', [data.name || data.Name || data.metadata.name], locale)}
        </p>
      )}
  }

  render() {
    const { data, handleClose, label, locale, open, reqErrorMsg, reqStatus } = this.props
    return (
      <div>
        {reqStatus === REQUEST_STATUS.IN_PROGRESS && <Spinner className='patternfly-spinner' />}
        <AcmModal
          titleIconVariant={'warning'}
          variant='medium'
          id='remove-resource-modal'
          isOpen={open}
          showClose={true}
          onClose={handleClose}
          title={msgs.get(label.heading, locale)}
          actions={[
            <AcmButton key="confirm" variant={ButtonVariant.danger} onClick={this.handleSubmitClick}>
            {msgs.get(label.primaryBtn, locale)}
            </AcmButton>,
            <AcmButton key="cancel" variant={ButtonVariant.link} onClick={handleClose}>
            {msgs.get('modal.button.cancel', locale)}
            </AcmButton>
          ]}
          >
          <div>
            {reqStatus === REQUEST_STATUS.ERROR &&
              <AcmAlert
                variant='danger'
                isInline={true}
                noClose={true}
                title={reqErrorMsg || msgs.get('error.default.description', locale)} />}
          </div>
          {this.modalBody(data, label, locale)}
        </AcmModal>
      </div>
    )
  }
}

RemoveResourceModal.propTypes = {
  data: PropTypes.shape({
    deployables: PropTypes.object,
    name: PropTypes.string,
    namespace: PropTypes.string,
    selected: PropTypes.array,
  }),
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  label: PropTypes.shape({
    heading: PropTypes.string,
    label: PropTypes.string,
    primaryBtn: PropTypes.string,
  }),
  locale: PropTypes.string,
  open:  PropTypes.bool,
  reqErrorMsg:  PropTypes.string,
  reqStatus:  PropTypes.string,
}

const mapStateToProps = state =>  {
  return state.modal
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: () => {
      dispatch(removeResource(ownProps.resourceType, ownProps.data))
    },
    handleClose: () => {
      dispatch(clearRequestStatus())
      dispatch(updateModal({open: false, type: 'resource-remove'}))
    },
    receiveDelError: (resourceType, err) => {
      dispatch(receiveDelError(err, resourceType))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemoveResourceModal))
