/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

const i18n = require('node-i18n-util'),
      path = require('path')

module.exports = function (href, locale) {
  if (href && locale) {
    const relativePath = `../../${href}` // load the properties
    require(relativePath)
    // resolve the bundle locale being used
    const bundlePath = path.join(__dirname, relativePath),
          localeTemp = i18n._resolveBundle(bundlePath, locale).locale,
          basePath = href.substring(0, href.indexOf('.properties'))
    href = basePath + (localeTemp ? '_' + localeTemp.replace('-', '_') : '') + '.js'
    return href
  }
  return ''
}
