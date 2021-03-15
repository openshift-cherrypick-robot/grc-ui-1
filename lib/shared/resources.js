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

/*
 * A function wrapper in which to require non-js files, e.g. scss and properties files and any
 * other static resource.
 *
 * This has no effect on the server, where you can't require static files like this, but it does add to
 * the webpack dependency graph which affects the files that are output. It also injects modules
 * on the client when needed to load the resources.
 */

module.exports = function (func) {
  if (client) {
    // these modules only resolve on the client due to the fact that they're webpack-ed into
    // actual js modules. The require call is needed to have the modules evaluated.
    func()
  }
}
