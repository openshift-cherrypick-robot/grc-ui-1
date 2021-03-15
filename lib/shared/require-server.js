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

/*
 * A wrapper function around common js require that only has an effect when running on the server.
 * This is for shared client/server code (i.e. /lib/shared) where the code is only needed on the server,
 * and you don't want to package it all in the client bundle.
 */

module.exports = function (m) {
  // obfuscate so that webpack does not see the require and traverse it
  return module['require'](m)
}
