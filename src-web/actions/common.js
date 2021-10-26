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

import _ from 'lodash'

import GrcApolloClient from '../utils/client/apollo-client'
import { formatExpandablePolicies } from '../utils/FormatTableData'
import { buildSelfLinK } from '../utils/BuildSelfLink'
import {
  RESOURCE_RECEIVE_SUCCESS,
  REQUEST_STATUS, RESOURCE_RECEIVE_FAILURE, RESOURCE_REQUEST,
  RESOURCE_MUTATE, RESOURCE_MUTATE_SUCCESS,
  RESOURCE_MUTATE_FAILURE, AVAILABLE_FILTER_UPDATE, ACTIVE_FILTER_UPDATE,
  SECONDARY_HEADER_UPDATE, MODAL_UPDATE, POST_REQUEST, POST_RECEIVE_SUCCESS,
  POST_RECEIVE_FAILURE, PUT_REQUEST, PUT_RECEIVE_SUCCESS, PUT_RECEIVE_FAILURE,
  PATCH_REQUEST, PATCH_RECEIVE_SUCCESS, PATCH_RECEIVE_FAILURE, DEL_REQUEST,
  DEL_RECEIVE_SUCCESS, DEL_RECEIVE_FAILURE, CLEAR_REQUEST_STATUS
} from './index'

export const receiveResourceSuccess = (response, resourceType) => ({
  type: RESOURCE_RECEIVE_SUCCESS,
  status: REQUEST_STATUS.DONE,
  items: response.items,
  resourceVersion: _.get(response, 'metadata.resourceVersion'), //only supported on k8s resoruces
  resourceType
})

export const receiveResourceError = (err, resourceType) => ({
  type: RESOURCE_RECEIVE_FAILURE,
  status: REQUEST_STATUS.ERROR,
  err,
  resourceType
})

export const requestResource = (resourceType) => ({
  type: RESOURCE_REQUEST,
  status: REQUEST_STATUS.IN_PROGRESS,
  resourceType
})

export const mutateResource = (resourceType, resourceName) => ({
  type: RESOURCE_MUTATE,
  resourceName,
  resourceType,
})

export const mutateResourceSuccess = (resourceType, resourceName) => ({
  type: RESOURCE_MUTATE_SUCCESS,
  resourceName,
  resourceType,
})

export const mutateResourceFailure = (resourceType, error) => ({
  type: RESOURCE_MUTATE_FAILURE,
  postStatus: REQUEST_STATUS.ERROR,
  err: { error },
  resourceType,
})

export const fetchResources = (resourceType, vars) => {
  return (dispatch) => {
    dispatch(requestResource(resourceType))
    return GrcApolloClient.get(resourceType, vars)
      .then(response => {
        if (response.errors) {
          return dispatch(receiveResourceError(response.errors[0], resourceType))
        }
        return dispatch(receiveResourceSuccess({items: _.cloneDeep(formatExpandablePolicies(response.data.items))}, resourceType))
      })
      .catch(err => dispatch(receiveResourceError(err, resourceType)))
  }
}

export const fetchSingleResource = (resourceType, args) => {
  return (dispatch) => {
    dispatch(requestResource(resourceType))
    return GrcApolloClient.getResource(resourceType, args)
      .then(response => {
        if (response.errors) {
          return dispatch(receiveResourceError(response.errors[0], resourceType))
        }
        return dispatch(receiveResourceSuccess({items: _.cloneDeep(response.data)}, resourceType))
      })
      .catch(err => dispatch(receiveResourceError(err, resourceType)))
  }
}

export const bulkPolicyActions =
  (policies, newData, resourcePath, modalType) => async dispatch => {
    dispatch(patchResource('HCMCompliance'))
    try {
      const result = await Promise.all(
        policies.map(policy => {
          return GrcApolloClient.updateResource(
            policy.namespace,
            policy.name.rawData,
            newData,
            `/apis/policy.open-cluster-management.io/v1/namespaces/${policy.namespace}/policies/${policy.name.rawData}`,
            resourcePath
          ).then(response => {
            if (response.errors) {
              dispatch(receivePatchError(response.errors[0], 'HCMCompliance'))
            }
            return response
          })
        })
      )
      if (!result.some(result => result.errors)) {
        dispatch(receivePatchResource(result[0], 'HCMCompliance'))
        dispatch(updateModal({ open: false, type: modalType }))
      }
    } catch (err) {
      dispatch(receivePatchError(err, 'HCMCompliance'))
    }
  }

export const disableResource = (resourceType, namespace, name, body, resourceData, resourcePath) => (dispatch => {
  dispatch(patchResource(resourceType))
  const selfLink = buildSelfLinK(resourceData)
  return GrcApolloClient.updateResource(namespace, name, body, selfLink, resourcePath)
    .then(response => {
      if (response.errors) {
        return dispatch(receivePatchError(response.errors[0], resourceType))
      } else {
        dispatch(updateModal({open: false, type: 'resource-disable'}))
      }
      dispatch(fetchResources(resourceType))
      return dispatch(receivePatchResource(response, resourceType))
    })
})

export const enforcResource = (resourceType, namespace, name, body, resourceData, resourcePath) => (dispatch => {
  dispatch(patchResource(resourceType))
  const selfLink = buildSelfLinK(resourceData)
  return GrcApolloClient.updateResource(namespace, name, body, selfLink, resourcePath)
    .then(response => {
      if (response.errors) {
        return dispatch(receivePatchError(response.errors[0], resourceType))
      } else {
        dispatch(updateModal({open: false, type: 'resource-enforce'}))
      }
      dispatch(fetchResources(resourceType))
      return dispatch(receivePatchResource(response, resourceType))
    })
})

export const bulkRemovePolicies = (policies, modalType) => (async dispatch => {
  dispatch(delResource('HCMCompliance'))
  try {
    const result = await Promise.all(
      policies.map((policy) => {
        return GrcApolloClient.remove(
          {
            kind: 'policies',
            selected: [],
          },
          `/apis/policy.open-cluster-management.io/v1/namespaces/${policy.namespace}/policies/${policy.name.rawData}`,
        ).then(response => {
          if (response.errors) {
            return dispatch(receiveDelError(response.errors, 'HCMCompliance'))
          } else {
            return response
          }
        })
      })
    )
    dispatch(updateModal({open: false, type: modalType}))
    dispatch(receiveDelResource(result, 'HCMCompliance', policies))
  } catch (err) {
    dispatch(receivePatchError(err, 'HCMCompliance'))
  }
})

export const removeResource = (resourceType, resourceData) => async dispatch => {
  dispatch(delResource(resourceType))
  const selfLink = buildSelfLinK(resourceData)
  try {
    const response = await GrcApolloClient.remove(resourceData, selfLink)
    if (response.errors) {
      return dispatch(receiveDelError(response.errors, resourceType))
    } else {
      dispatch(receiveDelResource(response, resourceType, resourceData))
    }
    dispatch(fetchResources(resourceType))
  } catch (err) {
    return dispatch(receiveDelError(err, resourceType))
  }
}

export const updateActiveFilters = (activeFilters) => ({
  type: ACTIVE_FILTER_UPDATE,
  activeFilters,
})

export const updateAvailableFilters = (availableFilters) => ({
  type: AVAILABLE_FILTER_UPDATE,
  availableFilters
})

export const updateSecondaryHeader = (title, tabs, breadcrumbItems, links, description, information) => ({
  type: SECONDARY_HEADER_UPDATE,
  title,
  tabs,
  breadcrumbItems,
  links,
  description,
  information
})

export const updateModal = (data) => ({
  type: MODAL_UPDATE,
  data
})

export const postResource = (resourceType) => ({ // TODO: Consider renaming
  type: POST_REQUEST,
  postStatus: REQUEST_STATUS.IN_PROGRESS,
  resourceType
})

export const receivePostResource = (item, resourceType) => ({
  type: POST_RECEIVE_SUCCESS,
  postStatus: REQUEST_STATUS.DONE,
  resourceType: item.kind || resourceType,
  item
})

export const receivePostError = (err, resourceType) => ({
  type: POST_RECEIVE_FAILURE,
  postStatus: REQUEST_STATUS.ERROR,
  err,
  resourceType
})

export const putResource = (resourceType) => ({ // TODO: Consider renaming
  type: PUT_REQUEST,
  putStatus: REQUEST_STATUS.IN_PROGRESS,
  resourceType
})

export const receivePutResource = (item, resourceType) => {
  return ({
    type: PUT_RECEIVE_SUCCESS,
    putStatus: REQUEST_STATUS.DONE,
    resourceType: item.kind || resourceType,
    item
  })
}

export const receivePutError = (err, resourceType) => ({
  type: PUT_RECEIVE_FAILURE,
  putStatus: REQUEST_STATUS.ERROR,
  err,
  resourceType
})

export const patchResource = (resourceType) => ({ // TODO: Consider renaming
  type: PATCH_REQUEST,
  patchStatus: REQUEST_STATUS.IN_PROGRESS,
  resourceType
})

export const receivePatchResource = (item, resourceType) => {
  return ({
    type: PATCH_RECEIVE_SUCCESS,
    patchStatus: REQUEST_STATUS.DONE,
    resourceType: item.kind || resourceType,
    item
  })
}

export const receivePatchError = (err, resourceType) => ({
  type: PATCH_RECEIVE_FAILURE,
  patchStatus: REQUEST_STATUS.ERROR,
  err,
  resourceType
})

export const delResource = (resourceType) => ({ // TODO: Consider renaming
  type: DEL_REQUEST,
  delStatus: REQUEST_STATUS.IN_PROGRESS,
  resourceType
})

export const receiveDelResource = (item, resourceType, resource) => ({
  type: DEL_RECEIVE_SUCCESS,
  delStatus: REQUEST_STATUS.DONE,
  resourceType: item.kind || resourceType,
  item,
  resource
})

export const receiveDelError = (err, resourceType) => ({
  type: DEL_RECEIVE_FAILURE,
  delStatus: REQUEST_STATUS.ERROR,
  err,
  resourceType
})

export const clearRequestStatus = (resourceType) => ({
  type: CLEAR_REQUEST_STATUS,
  resourceType: resourceType
})

export const createResources = (resourceType, resourceJson) => {
  return (dispatch) => {
    dispatch(mutateResource(resourceType))
    return GrcApolloClient.createResources(resourceJson)
      .then(result => {
        if (result.data.createResources.errors && result.data.createResources.errors.length > 0){
          dispatch(mutateResourceFailure(resourceType, result.data.createResources.errors[0]))
        } else {
          dispatch(mutateResourceSuccess(resourceType))
        }
        return result
      })
  }
}

export const createAndUpdateResources = (resourceTypes, createList, updateList) => {
  return (dispatch) => {
    resourceTypes.forEach((resourceType) => {
      dispatch(mutateResource(resourceType))
    })
    return GrcApolloClient.createAndUpdateResources(createList, updateList)
      .then(result => {
        const errors = {
          Policy: {
            resourceType: 'Policy',
            error: '',
          },
          PlacementRule: {
            resourceType: 'PlacementRule',
            error: '',
          },
          PlacementBinding: {
            resourceType: 'PlacementBinding',
            error: '',
          }
        }
        if (_.get(result, 'data.createAndUpdateResources.create.errors') &&
          _.get(result, 'data.createAndUpdateResources.create.errors.length') > 0){
          _.get(result, 'data.createAndUpdateResources.create.errors', []).forEach((error) => {
            errors[error.kind].error = error.message
          })
        }
        if (_.get(result, 'data.createAndUpdateResources.update.errors') &&
          _.get(result, 'data.createAndUpdateResources.update.errors.length') > 0){
          _.get(result, 'data.createAndUpdateResources.update.errors', []).forEach((error) => {
            errors[error.kind].error = error.message
          })
        }
        let errored = false
        Object.keys(errors).forEach((key) => {
          const resp = errors[key]
          if (resp.error !== '') {
            errored = true
            dispatch(mutateResourceFailure(resp.resourceType, { message: resp.error }))
          }
        })
        if (!errored) {
          resourceTypes.forEach((resourceType) => {
            dispatch(mutateResourceSuccess(resourceType))
          })
        }
        return result
      })
  }
}

export const createResource = (resourceType, variables) => {
  return (dispatch) => {
    dispatch(postResource(resourceType))
    return GrcApolloClient.createResource(resourceType, variables)
      .then(response => {
        if (response.errors) {
          return dispatch(receivePostError(response.errors[0], resourceType))
        }

        return dispatch(receivePostResource(_.cloneDeep(response.data.setHelmRepo), resourceType))
      })
      .catch(err => dispatch(receivePostError(err, resourceType)))
  }
}

export const copyAnsibleSecret = (name, namespace, targetNamespace) => {
  return (dispatch) => {
    return GrcApolloClient.copyAnsibleSecret(name, namespace, targetNamespace)
      .then(response => {
        return response
      })
      .catch(err => dispatch(receivePostError(err)))
  }
}

export const getPolicyAutomation = (namespace) => {
  return (dispatch) => {
    return GrcApolloClient.getPolicyAutomation(namespace)
      .then(response => {
        return response
      })
      .catch(err => dispatch(receivePostError(err)))
  }
}

export const modifyPolicyAutomation = (poliyAutomationJSON, action) => {
  return (dispatch) => {
    return GrcApolloClient.modifyPolicyAutomation(poliyAutomationJSON, action)
      .then(response => {
        return response
      })
      .catch(err => dispatch(receivePostError(err)))
  }
}
