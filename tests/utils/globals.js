/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */

const BASE_DIR = `${__dirname}/../..`
const reportFolder = `${BASE_DIR}/test-output/e2e`
const time = new Date().getTime()
const { createCoverageReporter } = require('nightwatch-coverage')

const coverageReporter = createCoverageReporter({
  coverageDirectory: `${reportFolder}/coverage`,
  coverageReporters: ['html', 'json', 'lcov'],
})


module.exports = {

  coverageReporter: coverageReporter,

  time: time,

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after: function(done) {
    if (!process.env.SELENIUM_CLUSTER) {
      coverageReporter.save()
    }
    done()
  },

  // This will be run before each test suite is started
  beforeEach: function(browser, done) {
    done()
  },

  // This will be run after each test suite is finished
  afterEach: function(browser, done) {
    if (process.env.SELENIUM_CLUSTER) {
      done()
    } else {
      browser.collectCoverage(() => {
        browser.end(done)
      })
    }
  }
}
