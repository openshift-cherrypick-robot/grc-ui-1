/* Copyright (c) 2020 Red Hat, Inc. */
const fs = require('fs')
const jsYaml = require('js-yaml')

// function does various substitions in the provided text using the provided rules
// specifying the substitutions variable as an array of touples where first iteam
// in a touple is a regular expression and the second item is the new value
// e.g. rules = [ [/\[LABEL\]/g, "mylabel"] ]
exports.doSubstitutionsInText = (text, rules=[]) => {
  let newText = text
  for (const [regExp, newValue] of rules) {
    newText = newText.replace(regExp, newValue)
  }
  return newText
}

exports.getConfig = (filepath) => {
  try {
    return fs.readFileSync(filepath).toString()
  } catch (e) {
    throw new Error(e)
  }
}

// returns the respective configuration file either in a raw form or as an object
// prior the actual parsing you can do various substitions in the configuration by
// specifying the substitutions variable as an array of touples where first iteam
// in a touple is a regular expression and the second item is the new value
// e.g. substitutions = [ [/\[LABEL\]/g, "mylabel"] ]
exports.getConfigObject = (relativePath, configFormat='', substitutions=[]) => {
  const postfix = relativePath.replace(/\//g, '__').replace(/-/g,'_').replace(/\./g,'_').toUpperCase()
  // if configFormat not provided, try to detect the file format from a relativePath file suffix
  if (!configFormat) {
    const arr = relativePath.split('.')
    configFormat = arr[arr.length-1]
  }
  // first read the environment variable
  let rawContent = Cypress.env(`TEST_CONFIG_${postfix}`)
  // now do substitutions if required
  if (substitutions) {
    rawContent = exports.doSubstitutionsInText(rawContent, substitutions)
  }
  // finally convert to the object by parsing the respective format
  try {
    switch(configFormat.toLowerCase()) {
      case 'yaml':
        return jsYaml.load(rawContent)
      case 'json':
        return JSON.parse(rawContent)
      case 'raw':
      case 'txt':
      default:
        return rawContent
    }
  } catch (e) {
    throw new Error(e)
  }
}

exports.getClusterListByVendor = (vendor, confFile='clusters.yaml') => {
  const confClusters = exports.getConfigObject(confFile)
  const clusterList = Object.keys(confClusters)
  const newList = clusterList.filter((v) => {return confClusters[v]['vendor'] == vendor})
  return newList
}
