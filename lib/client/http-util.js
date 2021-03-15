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

const client = require('../shared/client')
const config = require('../shared/config')

const DEFAULT_OPTIONS = {
  credentials: 'same-origin',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}

module.exports.getHostUrl = function () {
  const port = window.location.port ? `:${window.location.port}` : ''
  return `${window.location.protocol}//${window.location.hostname}${port}`
}

module.exports.getContextRoot = function() {
  if (client) {
    // eslint-disable-next-line no-undef
    return CONSOLE_CONTEXT_URL
  }
  return config.contextPath
}

module.exports.fetch = function (url, successCb, errorCb, options) {

  options = options || DEFAULT_OPTIONS
  fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => successCb && successCb(json))
    .catch(ex => errorCb && errorCb({ error: ex }))
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  // '' and 'OK' is not a valid json response, need to check
  return response.text().then(text => (text && text.trim() !== 'OK') ? JSON.parse(text) : {})
}
