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
  const mchPath = `/namespaces/${namespace}/multiclusterhubs/multiclusterhub`
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
    cb(null, res.body)
  }, logger)

}
