/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import {
  REQUEST_STATUS, RESOURCE_FILTERS_RECEIVE_SUCCESS, RESOURCE_FILTERS_UPDATE
} from '../actions'

export const resourceFilters = (state = {}, action) => {
  if (action) {
    switch (action.type) {
    case RESOURCE_FILTERS_RECEIVE_SUCCESS:
      return Object.assign({}, state, {
        status: REQUEST_STATUS.DONE,
        filters: {
          // disable cluster name filtering until server side fixes the issue
          // https://github.ibm.com/IBMPrivateCloud/roadmap/issues/10981
          // clusterNames: action.filters.clusterNames,
          clusterLabels: action.filters.clusterLabels,
        },
      })
    case RESOURCE_FILTERS_UPDATE: {
      const selectedFilters = state.selectedFilters ? {...state.selectedFilters} : {}
      selectedFilters[action.resourceName] = action.selectedFilters
      return {...state, selectedFilters}
    }
    default:
      return state
    }
  }
  return undefined
}
