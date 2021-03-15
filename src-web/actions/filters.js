/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import _ from 'lodash'

import GrcApolloClient from '../../lib/client/apollo-client'
import { receiveResourceError, requestResource}  from './common'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import {
  REQUEST_STATUS, RESOURCE_FILTERS_RECEIVE_SUCCESS, RESOURCE_FILTERS_UPDATE,
} from './index'

export const STRING_SPLITTER = '='

export  const combineFilters = (selectedFilters) => {
  const tempObject = []
  if (selectedFilters && selectedFilters.length > 0) {
    selectedFilters.forEach(item => {
      if (item && item.type) {
        const { key, value, type } = item
        tempObject.push({key, value, type})
      } else {
        //TODO support customize tags
      }
    })
  }
  return {filter: {resourceFilter: tempObject}}
}

export const fetchFilters = (inputType) => {
  const resourceType = RESOURCE_TYPES.HCM_FILTER_LIST
  return (dispatch) => {
    if (inputType && inputType.filter) {
      dispatch(requestResource(resourceType))
      return GrcApolloClient.get(resourceType)
        .then(response => {
          if (response.errors) {
            return dispatch(receiveResourceError(response.errors[0], resourceType))
          }
          return dispatch(receiveFiltersSuccess({
            clusterLabels: _.get(response, 'data.filters.clusterLabels'),
            clusterNames: _.get(response, 'data.filters.clusterNames'),
          }, resourceType))
        })
        .catch(err => dispatch(receiveResourceError(err, resourceType)))
    }
    return undefined
  }
}

export const receiveFiltersSuccess = (response, resourceType) => ({
  type: RESOURCE_FILTERS_RECEIVE_SUCCESS,
  status: REQUEST_STATUS.DONE,
  filters: {
    clusterLabels: response.clusterLabels || [],
    clusterNames: response.clusterNames || [],
  },
  resourceType
})

export const updateResourceFilters = (resourceType, selectedFilters) => ({
  type: RESOURCE_FILTERS_UPDATE,
  resourceName: resourceType.name,
  selectedFilters,
})
