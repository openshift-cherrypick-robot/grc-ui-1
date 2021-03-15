/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const glob = require('glob')
const path = require('path')
const getConfig = require('../config').getConfig
const configFiles = glob.sync(path.join(__dirname, '../config/**/*'), {nodir:true, ignore:[path.join(__dirname, '../config/index.js')]})
const tagify = require('cypress-tags')

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', tagify(config))

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

  require('cypress-fail-fast/plugin')(on, config)

  return config
}
