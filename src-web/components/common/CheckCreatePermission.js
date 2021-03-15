/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

const checkCreatePermission = (userAccess) => {
  // if create policy permission on any ns, set flag to 1
  let createFlag = 0
  if (userAccess && typeof userAccess === 'object') {
    const policyKey = 'policy.open-cluster-management.io/policies'
    for (const singleNSAccess of userAccess) {
      const rules = singleNSAccess.rules
      if (Array.isArray(rules['*/*']) &&
              (rules['*/*'].includes('*') || rules['*/*'].includes('create'))) {
        createFlag = 1
        break
      }
      if (Array.isArray(rules[policyKey]) &&
              (rules[policyKey].includes('*') || rules[policyKey].includes('create'))) {
        createFlag = 1
        break
      }
    }
  }
  return createFlag
}

export default checkCreatePermission
