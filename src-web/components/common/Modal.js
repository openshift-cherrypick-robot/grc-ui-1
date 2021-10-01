/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { connect } from 'react-redux'
import loadable from '@loadable/component'

let BulkPolicyActionModal, RemoveResourceModal, PolicyActionModal, AnsibleAutomationModal

const Modal = ({ type, open, ...rest }) => {
  switch (type) {
  case 'resource-automation':
    return open && getAnsibleAutomationModal({ type, open, ...rest })
  case 'resource-remove':
    return open && getRemoveResourceModal({ type, open, ...rest })
  case 'resource-disable':
  case 'resource-enable':
  case 'resource-enforce':
  case 'resource-inform':
    return open && getPolicyActionModal({ type, open, ...rest })
  case 'bulk-policy-action-enable':
    case 'bulk-policy-action-disable':
    case 'bulk-policy-action-inform':
    case 'bulk-policy-action-enforce':
      return open && getBulkPolicyActionModal({ type, open, ...rest })
  default:
    return null
  }
}

const getAnsibleAutomationModal = props => {
  AnsibleAutomationModal = AnsibleAutomationModal === undefined
    ? loadable(() => import(/* webpackChunkName: "ansible-job-modal" */ '../modals/AnsibleAutomationModal/AnsibleAutomationModal'))
    : AnsibleAutomationModal
  return getModal(AnsibleAutomationModal, props)
}

const getPolicyActionModal = props => {
  PolicyActionModal = PolicyActionModal === undefined
    ? loadable(() => import(/* webpackChunkName: "policy-action-modal" */ '../modals/PolicyActionModal'))
    : PolicyActionModal
  return getModal(PolicyActionModal, props)
}

const getBulkPolicyActionModal = props => {
  BulkPolicyActionModal = BulkPolicyActionModal === undefined
    ? loadable(() => import(/* webpackChunkName: "bulk-policy-action-modal" */ '../modals/BulkPolicyActionModal'))
    : BulkPolicyActionModal
  return getModal(BulkPolicyActionModal, props)
}

const getRemoveResourceModal = props => {
  RemoveResourceModal = RemoveResourceModal === undefined
    ? loadable(() => import(/* webpackChunkName: "remove-resource-modal" */ '../modals/RemoveResourceModal'))
    : RemoveResourceModal
  return getModal(RemoveResourceModal, props)
}

const getModal = (Component, props) => <Component {...props} />

const mapStateToProps = state => state.modal

export default connect(mapStateToProps)(Modal)
