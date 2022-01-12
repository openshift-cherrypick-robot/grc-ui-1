/* Copyright (c) 2020 Red Hat, Inc. */
const request = require('request').defaults({ rejectUnauthorized: false }),
      config = require('../../config'),
      fs = require('fs'),
      log4js = require('log4js'),
      logger = log4js.getLogger('service-account'),
      serviceAccountPath = '/var/run/secrets/kubernetes.io/serviceaccount',
      _ = require('lodash')

module.exports.getConsoleLinks = (cb) => {
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

  // for both running local and inside cluster, the below endpoint can be used to
  // get the oauth2 server and authorizepath  and tokenpath endpoints.
  const options = {
    url: `${config.get('API_SERVER_URL')}/apis/console.openshift.io/v1/consolelinks`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${serviceaccountToken}`,
    },
    json: true,
  }

  request.get(options, (err, response, body) => {
    if (err) {
      return cb(err)
    }

    const consoleLinks = _.get(body, 'items', null)

    const formattedLinks = {}
    for (let i = 0; i < consoleLinks.length; i++) {
      const link = consoleLinks[i]
      if (link.spec.location === 'ApplicationMenu' && link.spec.text !== 'Red Hat Advanced Cluster Management for Kubernetes') {
        // applicationMenu may be missing entirely; default to section with empty string title
        const section = _.get(link, 'spec.applicationMenu.section', '')
        if (formattedLinks[section]) {
          formattedLinks[section].push({
            url: link.spec.href,
            name: link.spec.text,
            icon: _.get(link, 'spec.applicationMenu.imageURL')
          })
        } else {
          formattedLinks[section] = [
            {
              url: link.spec.href,
              name: link.spec.text,
              icon: _.get(link, 'spec.applicationMenu.imageURL')
            }
          ]
        }
      }
    }
    return cb(err, formattedLinks)
  })
}
