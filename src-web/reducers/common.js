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

/*
Since these selectors are common (i.e used across different components and different parts of the store)
we have to create unique selectors each invocation and the selectors need additional metata data sent
though props that indicate which part of the store it should select from.

//See https://github.com/reactjs/reselect#sharing-selectors-with-props-across-multiple-components
//See https://github.com/reactjs/reselect#q-can-i-share-a-selector-across-multiple-components

The selector pattern is an abstraction that standardizes an application’s store querying logic.
It is simple: for any part of the store that an application needs access to, define a function that
when given the full store, returns the desired part (or derivation) of the store.
*/

import { createSelector } from 'reselect'
import _ from 'lodash'
import { normalize } from 'normalizr'
import ReactDOMServer from 'react-dom/server'
import { createResourcesSchema } from '../../lib/client/resource-schema'
import { transform } from '../../lib/client/resource-helper'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import msgs from '../../nls/platform.properties'
import {
  getTableKeys, getDefaultSortField, getPrimaryKey,
  getSecondaryKey, getURIKey, getResourceData
} from '../tableDefinitions'
import {
  PAGE_SIZES, CLEAR_REQUEST_STATUS, POST_REQUEST, PUT_REQUEST,
  PATCH_REQUEST, ACTIVE_FILTER_UPDATE, AVAILABLE_FILTER_UPDATE, REQUEST_STATUS, POST_RECEIVE_SUCCESS,
  PUT_RECEIVE_SUCCESS, PATCH_RECEIVE_SUCCESS, DEL_RECEIVE_SUCCESS,
  POST_RECEIVE_FAILURE, PUT_RECEIVE_FAILURE, PATCH_RECEIVE_FAILURE,
  SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING,
  SECONDARY_HEADER_UPDATE, RESOURCE_REQUEST, RESOURCE_RECEIVE_SUCCESS,
  RESOURCE_RECEIVE_FAILURE, TABLE_SEARCH, TABLE_SORT, TABLE_PAGE_CHANGE,
  RESOURCE_ADD, RESOURCE_MODIFY, RESOURCE_MUTATE, RESOURCE_MUTATE_FAILURE,
  RESOURCE_MUTATE_SUCCESS, RESOURCE_DELETE
} from '../actions'

function getFromState(state, root, attribute) {
  if(root && state) {
    const storeRoot = state[root]
    if (attribute && storeRoot && storeRoot[attribute]) {
      return storeRoot[attribute]
    }
  }
  return []
}

export const getItems = (state, props) => getFromState(state,props.storeRoot, 'items')
export const getItemsPerPage = (state, props) => getFromState(state,props.storeRoot, 'itemsPerPage')
export const getPage = (state, props) => getFromState(state,props.storeRoot, 'page')
export const getSearch = (state, props) => getFromState(state,props.storeRoot, 'search')
export const getSortColumn = (state, props) => getFromState(state,props.storeRoot, 'sortColumn')
export const getSortDirection = (state, props) => getFromState(state,props.storeRoot, 'sortDirection')

export const INITIAL_STATE = {
  items: [],
  itemsPerPage: PAGE_SIZES.DEFAULT,
  page: 1,
  search: '',
  sortColumn: undefined,
  sortDirection: SORT_DIRECTION_ASCENDING,
  status: REQUEST_STATUS.INCEPTION,
  patchStatus: undefined,
  patchErrorMsg: '',
  putStatus: undefined,
  putErrorMsg: '',
  postStatus: undefined,
  postStatusCode: undefined,
  postErrorMsg: '',
  pendingActions: [],
}

function searchTableCell(item, tableKey, context, searchText){
  const renderedElement = transform(item, tableKey, context.locale, true)
  if (typeof renderedElement === 'string') {
    return renderedElement.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  } else {
    return ReactDOMServer.renderToString(transform(item, tableKey, context.locale, true))
      .toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  }
}

function searchTableCellHelper(search, tableKeys, item, context) {
  const searchKey = search.substring(0, search.indexOf('='))
  const searchField = search.substring(search.indexOf('=')+1)

  if (searchKey === 'textsearch') {
    return tableKeys.find(
      localTableKey =>
        searchTableCell(item, localTableKey, context, searchField.replace(/[{}]/g, ''))
    )
  }
  const tableKey = tableKeys.find(
    localTableKey =>
      msgs.get(localTableKey.msgKey, context.locale).toLowerCase() === searchKey.toLowerCase()
  )
  if (!_.isEmpty(searchField)) {
    if (!searchField.includes('{')) {
      if (tableKey) {
        return searchTableCell(item, tableKey, context, searchField)
      }
    } else {
      let found = false
      const searchKeys = searchField.replace(/[{}]/g, '').split(',')
      if (searchKeys && tableKey) {
        searchKeys.forEach(localSearchKey => {
          if (searchTableCell(item, tableKey, context, localSearchKey)) {
            found = true
          }
        })
      }
      return found
    }
  }
  // return all results when user types cluster=
  if (searchField === '') {
    return true
  }

  // by default, search all fields
  return tableKeys.find(localTableKey => searchTableCell(item, localTableKey, context, search))
}

const makeGetFilteredItemsSelector = (resourceType) => {
  return createSelector(
    [getItems, getSearch],
    (items, search) => items.filter((item) => {
      if (_.isEmpty(search)) {
        return true
      }

      const tableKeys = getTableKeys(resourceType)
      if(document.getElementById('context')) {
        const context = JSON.parse(document.getElementById('context').textContent)

        if (search.includes('},')) {
        // special case like status={healthy}, labels={cloud=IBM}
          let found = false
          const searchFields = search.replace('},', '}},').toLowerCase().split('},')
          searchFields.forEach(searchField => {
            if (searchTableCellHelper(searchField, tableKeys, item, context)) {
              found = true
            }
          })
          return found
        } else {
          return searchTableCellHelper(search, tableKeys, item, context)
        }
      }
      return undefined
    })
  )
}

const makeGetTransformedItemsSelector = (resourceType) => {
  return createSelector(
    [makeGetFilteredItemsSelector(resourceType)],
    (items) => {
      const resourceData = getResourceData(resourceType)
      return items.map(item => {
        if(document) {
          const customData = {}
          if(document.getElementById('context')) {
            const context = JSON.parse(document.getElementById('context').textContent)
            resourceData.tableKeys.forEach(key => {
              if (key.transformFunction && typeof key.transformFunction === 'function') {
                customData[key.resourceKey.replace('custom.', '')] = key.transformFunction(item, context.locale)
              }
            })
          }
          item.custom = customData
        }
        return item
      })
    }
  )
}

//TODO could we do better? - we have one selector thus one cache for sorting.
//Thus if the sort direction change is toggled back we re-calculate.
const makeGetSortedItemsSelector = (resourceType) => {
  return createSelector(
    [makeGetTransformedItemsSelector(resourceType), getSortColumn, getSortDirection],
    (items, sortColumn, sortDirection) => {
      const initialSortField = sortColumn ? sortColumn : getDefaultSortField(resourceType)
      const sortField = initialSortField === 'custom.age' ? 'metadata.creationTimestamp' : initialSortField // sort by the actual date, not formatted value
      const sortDir = sortField === 'metadata.creationTimestamp'
        ? (sortDirection === SORT_DIRECTION_ASCENDING
          ? SORT_DIRECTION_DESCENDING
          : SORT_DIRECTION_ASCENDING)
        : sortDirection // date fields should initially sort from latest to oldest
      return _.orderBy(items, item => _.get(item, sortField), [sortDir])
    }
  )
}

const makeGetPagedItemsSelector = (resourceType) => {
  return createSelector(
    [makeGetSortedItemsSelector(resourceType), getPage, getItemsPerPage],
    (items, page, itemsPerPage) => {
      const offset = (page - 1) * itemsPerPage
      let lastIndex = offset + itemsPerPage
      lastIndex = lastIndex <= items.length ? lastIndex : items.length
      return {
        items: items.slice(offset, lastIndex),
        totalResults: items.length,
        totalPages: Math.ceil(items.length / itemsPerPage)
      }
    }
  )
}

export const makeGetVisibleTableItemsSelector = (resourceType) => {
  const pk = getPrimaryKey(resourceType)
  const sk = getSecondaryKey(resourceType)
  return createSelector(
    [makeGetPagedItemsSelector(resourceType)],
    result => {
      const normalizedItems = normalize(result.items, [createResourcesSchema(pk, sk)]).entities.items
      return Object.assign(result, {
        normalizedItems: normalizedItems,
        // to support multi cluster, use ${name}-${cluster} as unique id
        items: result.items.map(item => sk ? `${_.get(item, pk)}-${_.get(item, sk)}`:`${_.get(item, pk)}`)
      })
    }
  )
}

const getItemProps= (state, props) => props

export const getSingleResourceItem = createSelector(
  [getItems, getItemProps],
  (items, props) => items && items.length > 0 && props.predicate(items, props)
)

export const resourceItemByName = (items, props) => {
  const key = getURIKey(props.resourceType)
  return _.find(items, item =>
    _.get(item, key) === props.name
  )
}

export const resourceToolbar = (state = {}, action) => {
  switch (action.type) {
  case ACTIVE_FILTER_UPDATE:
    return Object.assign({}, state, {
      activeFilters: action.activeFilters,
    })
  case AVAILABLE_FILTER_UPDATE:
    return Object.assign({}, state, {
      availableFilters: action.availableFilters,
    })
  default:
    return state
  }
}

export const secondaryHeader = (state = {title: '', tabs: [], breadcrumbItems: [], links: [], description: {}, information:{}}, action) => {
  switch (action.type) {
  case SECONDARY_HEADER_UPDATE:
    return Object.assign({}, state, {
      title: action.title,
      tabs: action.tabs,
      breadcrumbItems: action.breadcrumbItems,
      links: action.links,
      description: action.description,
      information: action.information
    })
  default:
    return state
  }
}

export const resourceReducerFunction = (state = INITIAL_STATE, action) => {
  let items,index
  switch (action.type) {
  case RESOURCE_REQUEST:
    return Object.assign({}, state, {
      status: REQUEST_STATUS.IN_PROGRESS
    })
  case RESOURCE_RECEIVE_SUCCESS:
    return Object.assign({}, state, {
      status: REQUEST_STATUS.DONE,
      items: action.items,
      page: action.items.length === 0 ? 1 : action.items.length > state.itemsPerPage * (state.page - 1) ? state.page : state.page - 1,
      resourceVersion: action.resourceVersion
    })
  case RESOURCE_RECEIVE_FAILURE:
    return Object.assign({}, state, {
      status: REQUEST_STATUS.ERROR,
      err: action.err
    })
  case POST_REQUEST:
    return Object.assign({}, state, {
      postStatus: REQUEST_STATUS.IN_PROGRESS
    })
  case POST_RECEIVE_SUCCESS:
    items = state.items.slice(0)
    if (action.item.length > 0) { // if returned as an array due to making async calls, push action.item elements to the items array
      action.item.forEach(el => {
        items.push(el)
      })
    } else {
      items.push(action.item)
    }
    return Object.assign({}, state, {
      items: items,
      postStatus: REQUEST_STATUS.DONE
    })
  case POST_RECEIVE_FAILURE:
    return Object.assign({}, state, {
      postStatus: REQUEST_STATUS.ERROR,
      postStatusCode: action.err.error && action.err.error.response && action.err.error.response.status,
      postErrorMsg: action.err.error && action.err.error.message
    })
  case PUT_REQUEST:
    return Object.assign({}, state, {
      putStatus: REQUEST_STATUS.IN_PROGRESS
    })
  case PUT_RECEIVE_SUCCESS:
    return Object.assign({}, state, {
      putStatus: REQUEST_STATUS.DONE,
    })
  case PUT_RECEIVE_FAILURE:
    return Object.assign({}, state, {
      putStatus: REQUEST_STATUS.ERROR,
      putErrorMsg: action.err.error ? action.err.error.message : action.err.message
    })
  case PATCH_REQUEST:
    return Object.assign({}, state, {
      patchStatus: REQUEST_STATUS.IN_PROGRESS
    })
  case PATCH_RECEIVE_SUCCESS:
    return Object.assign({}, state, {
      patchStatus: REQUEST_STATUS.DONE,
    })
  case PATCH_RECEIVE_FAILURE:
    return Object.assign({}, state, {
      patchStatus: REQUEST_STATUS.ERROR,
      patchErrorMsg: action.err.error ? action.err.error.message : action.err.message
    })
  case CLEAR_REQUEST_STATUS:
    return Object.assign({}, state, {
      mutateStatus: undefined,
      mutateErrorMsg: undefined,
      postStatus: undefined,
      postStatusCode: undefined,
      postErrorMsg: undefined,
      putStatus: undefined,
      putErrorMsg: undefined,
      patchStatus: undefined,
      patchErrorMsg: undefined
    })
  case TABLE_SEARCH:
    return Object.assign({}, state, {
      search: action.search,
      page: 1
    })
  case TABLE_SORT:
    return Object.assign({}, state, {
      sortDirection: action.sortDirection,
      sortColumn: action.sortColumn
    })
  case TABLE_PAGE_CHANGE:
    return Object.assign({}, state, {
      page: action.page,
      itemsPerPage: action.pageSize
    })
  case RESOURCE_ADD: /* eslint-disable no-case-declarations */
  case RESOURCE_MODIFY:
    const resourceTypeObj = !_.isObject(action.resourceType) ? RESOURCE_TYPES[_.findKey(RESOURCE_TYPES, { name: action.resourceType })] : action.resourceType
    const primaryKey = getPrimaryKey(resourceTypeObj)
    items = state.items.slice(0)
    index = _.findIndex(items, o => (_.get(o, primaryKey) === _.get(action.item, primaryKey)))
    index > -1 ? items.splice(index, 1, action.item) : items.push(action.item)
    return Object.assign({}, state, {
      items: items
    })
  case RESOURCE_MUTATE:
    return Object.assign({}, state, {
      mutateStatus: REQUEST_STATUS.IN_PROGRESS,
      mutateErrorMsg: null,
      pendingActions: [...state.pendingActions, { name: action.resourceName, action: RESOURCE_MUTATE }]
    })
  case RESOURCE_MUTATE_FAILURE:
    return Object.assign({}, state, {
      mutateStatus: REQUEST_STATUS.ERROR,
      mutateErrorMsg: action.err.message || action.err.error && (action.err.error.message ||
        (action.err.error.data && action.err.error.data.Message)),
      pendingActions: state.pendingActions.filter(r => r && r.name !== action.resourceName),
    })
  case RESOURCE_MUTATE_SUCCESS:
    return Object.assign({}, state, {
      mutateStatus: REQUEST_STATUS.DONE,
      pendingActions: state.pendingActions.filter(r => r && r.name !== action.resourceName),
    })
  case RESOURCE_DELETE:
    items = [...state.items]
    index = _.findIndex(items, o => _.get(o, 'metadata.uid') === _.get(action, 'item.metadata.uid'))
    if(index > -1) {
      items.splice(index, 1)
      return Object.assign({}, state, {
        items: items
      })
    }
    return state
  case DEL_RECEIVE_SUCCESS:
    items = [...state.items]
    switch (action.resourceType) {
    case RESOURCE_TYPES.POLICIES_BY_POLICY:
    case RESOURCE_TYPES.POLICY:
      const policy = _.get(action, 'resource')
      index = _.findIndex(items, { 'name':policy.name, 'namespace':policy.namespace })
      break
    default:
      index = _.findIndex(items, o => _.get(o, 'Name') === _.get(action, 'resourceName'))
      break
    }
    if(index > -1) {
      items.splice(index, 1)
      return Object.assign({}, state, {
        items: items
      })
    }
    return state
  default:
    return state
  }
}

/**
 * A common higher order reducer for resources
 * Follows the Redux pattern described here: http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html#customizing-behavior-with-higher-order-reducers
 * **/
export const createResourceReducer = (reducerFunction, reducerPredicate) => {
  return (state, action) => {
    const isInitializationCall = state === undefined
    const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall
    return shouldRunWrappedReducer ? reducerFunction(state, action) : state
  }
}
