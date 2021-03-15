/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

const errorFetchingService = 'Error fetching service availabily'

const serviceAccount = require('./service-account'),
      log4js = require('log4js'),
      logger = log4js.getLogger('service-discovery'),
      async = require('async'),
      request = require('./request'),
      config = require('../../config')

const SVCS = [
  { name: 'cem' },
  { name: 'metering-ui' },
  { name: 'cem' },
  { name: 'image-manager'},
  { name: 'kibana'},
  { name: 'service-catalog' }
]

exports.serviceEnabled = serviceName => {
  const svc = SVCS.find(eachSVC => eachSVC.name === serviceName)
  return svc.enabled || false
}

function hasServiceErrorLogger(err, serviceName) {
  if (err) {
    if (err.statusCode === 404) {
      logger.debug(`Service '${serviceName}' not found in namespace ${serviceAccount.getServiceAccountNamespace()}`)
    }
    else {
      logger.debug(errorFetchingService, err.details)
    }
  } else {
    logger.debug(`Service '${serviceName}' found in namespace ${serviceAccount.getServiceAccountNamespace()}`)
  }
}

const hasService = (serviceName, cb) => {
  if (process.env.NODE_ENV === 'production') {
    if (serviceName === 'cem') {
      const url = `/api/v1/namespaces/${serviceAccount.getServiceAccountNamespace()}/services?labelSelector=component=cem-event-analytics-ui`
      getWithServiceCredentials(url, (err, res) => {
        if (err) {
          logger.debug(errorFetchingService, err.details)
          return cb(null, false)
        }
        if (res.items && res.items.length > 0) {
          return cb(null, true)
        }
        cb(null, false)
        return undefined
      })
    } else if (serviceName === 'service-catalog') {
      const url = '/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses'
      getWithServiceCredentials(url, err => {
        hasServiceErrorLogger(err, serviceName)
        cb(null, err === null)
      })
    } else {
      const url = `/api/v1/namespaces/${serviceAccount.getServiceAccountNamespace()}/services/${serviceName}`
      getWithServiceCredentials(url, err => {
        hasServiceErrorLogger(err, serviceName)
        cb(null, err === null)
      })
    }
  } else {
    //thus temporarily return true for dev
    switch(serviceName){
    case 'kibana':
      cb(null, false)
      break
    default:
      cb(null, true)
    }
  }
}

const updateServiceAvailibility = () => {

  async.parallel(
    SVCS.map(
      svc => hasService.bind(null, svc.name)
    ),
    (err, results) => {
      results.forEach(
        (result, i) => SVCS[i].enabled = result
      )
      logger.debug(JSON.stringify(SVCS))
    }
  )

  if (process.env.NODE_ENV === 'production') {
    setTimeout(updateServiceAvailibility, 1000 * 60 * 2)
  }
}

const getWithServiceCredentials = (path, cb) => {
  const options = {
    url: `${config.get('cfcRouterUrl')}/kubernetes${path}`,
    headers: {
      Authorization: `Bearer ${serviceAccount.getServiceCredentials()}`
    },
    json: true,
    agentOptions: {
      ca: serviceAccount.getCACert()
    }
  }
  request(options, null, [200, 201, 202], (err, res) => {
    if (err) {
      return cb(err, null)
    }
    cb(err, res.body)
    return undefined
  })
}

setTimeout(updateServiceAvailibility, 2000)
