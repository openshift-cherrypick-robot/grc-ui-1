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

import msgs from '../../nls/platform.properties'
import _ from 'lodash'

/*
* UI helpers to help with data transformations
* */

const overviewOtherStr = 'overview.grc.overview.other'

export const GrcFilterTypes = Object.freeze({
  standards: 'standards',
  categories: 'categories',
  controls: 'controls',
  type: 'type',
  severity: 'severity',
})

export function fieldTypeToArray(items) {
  switch (typeof items) {
  case 'string':
    items = items.split(',')
    break
  case 'object':
    items = Array.isArray(items) ? items : JSON.stringify(items).split(',')
    break
  default:
    items = []
    break
  }
  return items
}

function initializeFilter(filters, locale) {
  Object.keys(GrcFilterTypes).forEach(type=>{
    let name
    let availableSet=new Set()
    switch (type) {
    case GrcFilterTypes.standards:
      name = msgs.get('policy.filter.category.standards', locale)
      break
    case GrcFilterTypes.categories:
      name = msgs.get('policy.filter.category.categories', locale)
      break
    case GrcFilterTypes.controls:
      name = msgs.get('policy.filter.category.controls', locale)
      break
    case GrcFilterTypes.type:
        name = msgs.get('policy.filter.category.type', locale)
        availableSet=new Set([
          msgs.get('policy.filter.category.type.enforce', locale),
          msgs.get('policy.filter.category.type.inform', locale)
        ])
      break
    }
    filters[type] ={
      name, availableSet
    }
  })

  return filters
}

function addPolicyFilter(policies, filters, locale) {
  if (policies) {
    policies.map(policy=>{
      Object.keys(GrcFilterTypes).forEach(filterType=>{
        let types=''
        const filter = filters[filterType]
        const annotations = _.get(policy, 'metadata.annotations', {}) || {}
        switch (filterType) {
        case GrcFilterTypes.standards:
          types = annotations['policy.open-cluster-management.io/standards'] || ''
          break
        case GrcFilterTypes.categories:
          types = annotations['policy.open-cluster-management.io/categories'] || ''
          break
        case GrcFilterTypes.controls:
          types = annotations['policy.open-cluster-management.io/controls'] || ''
          break
        }
        if (filterType!==GrcFilterTypes.severity && filterType!==GrcFilterTypes.type && types.length===0) {
          types=msgs.get(overviewOtherStr, locale)
        }
        types.split(',').forEach(type=>{
          type=type.trim()
          if (type) {
            filter.availableSet.add(type)
          }
        })
      })
    })
  }

  return filters
}

export const getAvailableGrcFilters = (policies, locale) => {
  let filters = {}
  // initialize filter
  filters = initializeFilter(filters, locale)

  // loop thru policies adding available filters
  filters = addPolicyFilter(policies, filters, locale)

  return filters
}

export const filterPolicies = (policies, activeFilters, locale, annotationsPath) => {
  if (Array.isArray(policies)) {
    return policies.filter(policy => {
      return Object.keys(GrcFilterTypes).every(filterType=>{
        const activeSet = activeFilters[filterType]
        if (activeSet && activeSet.size>0) {
          let types=''
          const annotations = _.get(policy, annotationsPath) || {}
          switch (filterType) {
          case GrcFilterTypes.standards:
            types = annotations['policy.open-cluster-management.io/standards'] || ''
            break
          case GrcFilterTypes.categories:
            types = annotations['policy.open-cluster-management.io/categories'] || ''
            break
          case GrcFilterTypes.controls:
            types = annotations['policy.open-cluster-management.io/controls'] || ''
            break
          case GrcFilterTypes.type:
            types = policy.remediation.toLowerCase() === 'enforce' ?
              msgs.get('policy.filter.category.type.enforce', locale) :
              msgs.get('policy.filter.category.type.inform', locale)
            break
          }
          if (filterType!==GrcFilterTypes.type && types.length===0) {
            types=msgs.get(overviewOtherStr, locale)
          }
          return types.split(',').some(type=>{
            type=type.trim()
            if (type) {
              return activeSet.has(type)
            }
            return undefined
          })
        }
        return true
      })
    })
  }
  else {
    return []
  }
}

export const combineResourceFilters = (activeFilters, storedFilters, availableGrcFilters) => {
  //step 1 : if storedFilters, get activeFilters = (activeFilters ∪ storedFilters)
  if (activeFilters && storedFilters) {
    Object.keys(storedFilters).forEach(key=>{
      if (Array.isArray(storedFilters[key])) { //storedFilters[key] is Array
        // remove null/undefined/empty value from storedFilters
        storedFilters[key] = _.without(storedFilters[key], undefined, null, '')
        if (storedFilters[key].length > 0) {
          // check null value from activeFilters
          if (activeFilters[key]) {
            activeFilters[key] = new Set(_.without(activeFilters[key], undefined, null, ''))
          } else {
            activeFilters[key] = new Set()
          }
          const activeSet = activeFilters[key]
          storedFilters[key].forEach(member=>{
            activeSet.add(member)
          })
        }
        else if (activeFilters[key]) {//this is an empty set in storedFilters
          activeFilters[key] = new Set(_.without(activeFilters[key], undefined, null, ''))
          if (activeFilters[key].size === 0) {
            delete activeFilters[key] // if existing, remove same empty set from activeFilters
          }
        }
      }
    })
  }

  //step 2 : if availableGrcFilters, get activeFilters = (activeFilters ∩ availableGrcFilters)
  if (activeFilters && availableGrcFilters) {
    Object.keys(activeFilters).forEach(key=>{
      activeFilters[key].forEach(member=>{
        if (!(availableGrcFilters[key] && availableGrcFilters[key].availableSet && availableGrcFilters[key].availableSet.has(member))) {
          activeFilters[key].delete(member) //remove filters which isn't in availableGrcFilters
        }
      })
    })
  }

  //if step 1 && step 2 are true, final activeFilters = ((activeFilters ∪ storedFilters) ∩ availableGrcFilters)
  //if step 1 = true but step 2 = false, final activeFilters = (activeFilters ∪ storedFilters)
  //if step 1 = false but step 2 = true, final activeFilters = (activeFilters ∩ availableGrcFilters)
  return activeFilters
}

