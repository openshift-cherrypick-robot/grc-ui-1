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

const fs = require('fs'),
      log4js = require('log4js'),
      logger = log4js.getLogger('service-account'),
      serviceAccountPath = '/var/run/secrets/kubernetes.io/serviceaccount'

let KUBE_TOKEN, KUBE_NS, CA_CERT

exports.getServiceCredentials = () => {
  if (KUBE_TOKEN) {
    return KUBE_TOKEN
  }

  try {
    KUBE_TOKEN = fs.readFileSync(`${serviceAccountPath}/token`, 'utf8')
  } catch (err) {
    logger.error('Error reading service account token', err && err.message)
  }

  logger.debug(`KUBE_TOKEN=${KUBE_TOKEN}`)

  return KUBE_TOKEN
}

exports.getServiceAccountNamespace = () => {
  if (KUBE_NS) {
    return KUBE_NS
  }

  try {
    KUBE_NS = fs.readFileSync(`${serviceAccountPath}/namespace`, 'utf8')
  } catch (err) {
    logger.error('Error reading service account namespace', err && err.message)
  }

  logger.debug(`KUBE_NS=${KUBE_NS}`)

  return KUBE_NS
}

exports.getCACert = () => {
  if (CA_CERT) {
    return CA_CERT
  }

  try {
    CA_CERT = fs.readFileSync(`${serviceAccountPath}/ca.crt`, 'utf8')
  } catch (err) {
    logger.error('Error reading service account ca.crt', err && err.message)
  }

  logger.debug(`CA_CERT=${CA_CERT}`)

  return CA_CERT
}
