/* Copyright (c) 2021 Red Hat, Inc. */

const request = require('request').defaults({ rejectUnauthorized: false }),
      config = require('../../config'),
      fs = require('fs'),
      log4js = require('log4js'),
      logger = log4js.getLogger('service-account'),
      serviceAccountPath = '/var/run/secrets/kubernetes.io/serviceaccount'


module.exports.getUserInfo = (req, token, cb) => {
  // token review api to validate Bearer token/ retrieve user info
  // const serviceaccounttoken = fs.readFileSync(config.ocp.serviceaccount_tokenpath).toString();
  let serviceaccountToken = null
  try {
    if(process.env.NODE_ENV === 'production'){
      serviceaccountToken = fs.readFileSync(`${serviceAccountPath}/token`, 'utf8')
    } else {
      serviceaccountToken = process.env.SERVICEACCT_TOKEN || ''
    }
  } catch (err) {
    logger.error('Error reading service account token', err && err.message)
  }

  const options = {
    url: `${config.get('API_SERVER_URL')}/apis/authentication.k8s.io/v1/tokenreviews`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${serviceaccountToken}`,
    },
    json: true,
    body: {
      apiVersion: 'authentication.k8s.io/v1',
      kind: 'TokenReview',
      spec: {
        token,
      },
    },
  }
  // retrieving user info through token review api
  request.post(options, (err, resp, reviewbody) => cb(err, resp, reviewbody))
}
