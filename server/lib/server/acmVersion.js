/* Copyright (c) 2021 Red Hat, Inc. */
'use strict'

const request = require('./request'),
      config = require('../../config'),
      // httpUtil = require('../server/http-util'),
      log4js = require('log4js'),
      fs = require('fs'),
      logger = log4js.getLogger('namespace-client'),
      serviceAccountPath = '/var/run/secrets/kubernetes.io/serviceaccount'

exports.getACMVersion = (req, cb) => {
  const acmAPI = '/apis/operator.open-cluster-management.io/v1'
  let namespace = 'open-cluster-management'
  let serviceaccountToken = null
  try {
    if(process.env.NODE_ENV === 'production'){
      serviceaccountToken = fs.readFileSync(`${serviceAccountPath}/token`, 'utf8')
      namespace = fs.readFileSync(`${serviceAccountPath}/namespace`, 'utf8')
    } else {
      serviceaccountToken = process.env.SERVICEACCT_TOKEN || ''
    }
  } catch (err) {
    logger.error('Error reading service account namespace', err && err.message)
  }
  // Look up the mch by the array of mch instances (not by specific name) and then return the first one
  const mchPath = `/namespaces/${namespace}/multiclusterhubs`
  const options = {
    method: 'GET',
    url: `${config.get('API_SERVER_URL')}${acmAPI}${mchPath}`,
    json: true,
    headers: {
      // Cookie: httpUtil.getAuth(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${serviceaccountToken}`
    },
  }

  request(options, null, [200], (err, res) => {
    if (err) {
      return cb(err, null)
    }
    return cb(null, res.body.items && res.body.items[0] ? res.body.items[0] : res.body)
  }, logger)

}
