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


const requireServer = require('./require-server'),
      nconf = requireServer('nconf')

const WHITELIST = [
  'ACM_VERSION',
  'contextPath',
  'complianceNamespace',
  'clusterContextPath',
  'docUrl',
  'feature_search-api',
  'grcUiApiUrl',
  'headerContextPath',
  'ocmPoliciesPrefix',
]

let config = {}

if (nconf) {
  WHITELIST.forEach(i => config[i] = nconf.get(i))
  config.env = process.env.NODE_ENV
} else {
  const configElement = document.getElementById('config')
  config = (configElement && JSON.parse(configElement.textContent)) || {}
}

module.exports = config
