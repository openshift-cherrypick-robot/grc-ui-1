/**
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

const requireServer = require('./require-server'),
      i18n = requireServer('node-i18n-util')
/*
 * A function that provides context information for a given page or request. e.g. who the logged in user is.
 * Uses the session on the server, and the context payload script on the client.
 */

module.exports = function (req) {
  if (req) {
    return {
      locale: i18n.locale(req)
    }
  }
  return JSON.parse(document.getElementById('context').textContent)
}
