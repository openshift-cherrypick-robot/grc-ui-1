/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const glob = require('glob')
const path = require('path')
const del = require('del')
const getConfig = require('../config').getConfig
const configFiles = glob.sync(path.join(__dirname, '../config/**/*'), {nodir:true, ignore:[path.join(__dirname, '../config/index.js')]})

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  for (const singleConfig of configFiles) {
    // get base name, replace . and - with _ and convert to uppercase
    try {
      const normalizedFileName = singleConfig.replace(/^.*\/config\//, '').replace(/\//g, '__').replace(/\./g, '_').replace(/-/g,'_').toUpperCase()
      config.env[`TEST_CONFIG_${normalizedFileName}`] = getConfig(singleConfig)
    } catch (e) {
      throw new Error(e)
    }
  }
  require('cypress-terminal-report/src/installLogsPrinter')(on)
  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      // `del()` returns a promise, so it's important to return it to ensure
      // deleting the video is finished before moving on
      return del(results.video)
    }
  })

  require('cypress-fail-fast/plugin')(on, config)

  return config
}
