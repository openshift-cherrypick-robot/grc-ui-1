/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


var fs = require('fs')
const path = require('path')

let page

module.exports = {
  '@disabled': false,

  before: (browser) => {
    const loginPage = browser.page.LoginPage()
    loginPage.navigate()
    loginPage.authenticate()

    page = browser.page.CommonPage()
  },

  'GRC UI: [P1][Sev1][policy-grc] Disable policy: test policy disable + enable': (browser) => {
    const time = browser.globals.time

    const enforce = fs.readFileSync(path.join(__dirname, 'yaml/disable_test/ed_pod_mustnothave.yaml'))
    var yaml = enforce.toString()
    page.createPolicy(browser, 'policy-pod-'+ time, yaml, time)
    const inform = fs.readFileSync(path.join(__dirname, 'yaml/disable_test/ed_pod_mustnothave_inform.yaml'))
    yaml = inform.toString()
    page.createPolicy(browser, 'policy-pod-inform-'+ time, yaml, time)
    page.checkStatus('policy-pod-inform-' + time, false)

    page.tryDisable('policy-pod-' + time)
    browser.pause(5000)
    const createPod = fs.readFileSync(path.join(__dirname, 'yaml/disable_test/ed_pod_create.yaml'))
    yaml = createPod.toString()
    page.createPolicy(browser, 'policy-pod-create-'+ time, yaml, time)
    page.checkStatus('policy-pod-create-' + time, false)
    page.checkStatus('policy-pod-inform-' + time, true)

    page.deletePolicy('policy-pod-create-' + time)
    page.tryEnable('policy-pod-' + time)
    page.checkStatus('policy-pod-' + time, false)
    page.checkStatus('policy-pod-inform-' + time, false)

    page.deletePolicy('policy-pod-inform-' + time)
    page.deletePolicy('policy-pod-' + time)
  },
}
