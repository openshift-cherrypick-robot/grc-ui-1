/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import { updateModal } from '../../actions/common'
import _ from 'lodash'

export const resourceActions = (action, dispatch, resourceType, data) => {
  switch (action) {
  case 'table.actions.edit': {
    return dispatch(updateModal(
      { open: true, type: 'resource-edit', action: 'put', resourceType, editorMode: 'json',
        label: {
          primaryBtn: 'modal.button.submit',
          label: `modal.edit-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.edit-${resourceType.name.toLowerCase()}.heading`
        },
        data: { kind: resourceType.name, ...data }}))
  }
  case 'table.actions.launch.cluster':{
    const consoleURL = _.get(data, 'consoleURL')
    if (consoleURL) {
      window.open(`${consoleURL}`, '_blank')
    }
    return
  }
  case 'table.actions.compliance.remove':
  case 'table.actions.policy.remove':
  case 'table.actions.remove': {
    return dispatch(updateModal(
      { open: true, type: 'resource-remove', resourceType,
        label: {
          primaryBtn: `modal.remove-${resourceType.name.toLowerCase()}.heading`,
          label: `modal.remove-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.remove-${resourceType.name.toLowerCase()}.heading`
        },
        data: { apiVersion: resourceType.api_version, kind: resourceType.name, ...data }}))
  }
  case 'table.actions.disable': {
    return dispatch(updateModal(
      { open: true, type: 'resource-disable', resourceType,
        label: {
          primaryBtn: `modal.disable-${resourceType.name.toLowerCase()}.heading`,
          label: `modal.disable-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.disable-${resourceType.name.toLowerCase()}.heading`
        },
        data: { apiVersion: resourceType.api_version, kind: resourceType.name, ...data }}))
  }
  case 'table.actions.enable': {
    return dispatch(updateModal(
      { open: true, type: 'resource-enable', resourceType,
        label: {
          primaryBtn: `modal.enable-${resourceType.name.toLowerCase()}.heading`,
          label: `modal.enable-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.enable-${resourceType.name.toLowerCase()}.heading`
        },
        data: { apiVersion: resourceType.api_version, kind: resourceType.name, ...data }}))
  }
  case 'table.actions.enforce': {
    return dispatch(updateModal(
      { open: true, type: 'resource-enforce', resourceType,
        label: {
          primaryBtn: `modal.enforce-${resourceType.name.toLowerCase()}.heading`,
          label: `modal.enforce-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.enforce-${resourceType.name.toLowerCase()}.heading`
        },
        data: { apiVersion: resourceType.api_version, kind: resourceType.name, ...data }}))
  }
  case 'table.actions.inform': {
    return dispatch(updateModal(
      { open: true, type: 'resource-inform', resourceType,
        label: {
          primaryBtn: `modal.inform-${resourceType.name.toLowerCase()}.heading`,
          label: `modal.inform-${resourceType.name.toLowerCase()}.label`,
          heading: `modal.inform-${resourceType.name.toLowerCase()}.heading`
        },
        data: { apiVersion: resourceType.api_version, kind: resourceType.name, ...data }}))
  }
  default:
    return undefined
  }
}
