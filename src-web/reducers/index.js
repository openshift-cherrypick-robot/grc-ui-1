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
 *
 * Things you should never do inside a reducer:
 *
 * - Mutate its arguments
 * - Perform side effects like API calls and routing transitions
 * - Call non-pure functions, e.g. Date.now() or Math.random()
 *
 * Reducers must be deterministic pure functions.  Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 *
 * Selectors should sit along side reducers.
 */

import { createResourceReducer, resourceReducerFunction } from './common'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import _ from 'lodash'

export { user, loggedIn } from './user'
export { userAccess } from './access'
export { resourceToolbar } from './common'
export { secondaryHeader } from './common'

export { modal } from './modal'

export const ALL_POLICIES = createResourceReducer(resourceReducerFunction, predicate.bind(null, RESOURCE_TYPES.POLICIES_BY_POLICY))
export const PoliciesList = createResourceReducer(resourceReducerFunction, predicate.bind(null, RESOURCE_TYPES.POLICY))
export const PlacementBindingsList = createResourceReducer(resourceReducerFunction, predicate.bind(null, RESOURCE_TYPES.PLACEMENT_BINDING))
export const PlacementRulesList = createResourceReducer(resourceReducerFunction, predicate.bind(null, RESOURCE_TYPES.PLACEMENT_RULE))

export { resourceFilters } from './filter'

export function predicate(resourceType, action) {
  if (_.isEqual(resourceType, action.resourceType)) {
    return true
  }
  const result = _.find(_.values(resourceType), type => {
    if (typeof type === 'string') {
      return type.indexOf(action.resourceType) > -1
    }
    return false
  })

  return result ? result : null
}
