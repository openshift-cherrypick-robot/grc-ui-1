/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

const formatUserAccess = (userAccess) => {
  const userAccessHash = {}
  if(Array.isArray(userAccess) && userAccess.length > 0) {
    userAccess.forEach((singleNSAccess) => {
      if (typeof singleNSAccess.rules === 'object') {
        Object.keys(singleNSAccess.rules).forEach((key) => {
          // use 'NS+API+Resource' as unique key for looking permission for each record on different NS
          userAccessHash[`${singleNSAccess.namespace}/${key}`] = singleNSAccess.rules[key]
        })
      }
    })
  }
  return userAccessHash
}

export default formatUserAccess
