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

const express = require('express'),
      router = express.Router(),
      log4js = require('log4js'),
      logger = log4js.getLogger('status')

const readinessProbeStr = '/readinessProbe'
router.get('/', (req, res) => {
  logger.debug('/')
  res.sendStatus(200)
})

router.get('/status', (req, res) => res.sendStatus(200) )

router.get('/livenessProbe', (req, res) => {
  logger.debug(readinessProbeStr)
  res.send(`Testing livenessProbe --> ${new Date().toLocaleString()}`)
})

router.get(readinessProbeStr, (req, res) => {
  logger.debug(readinessProbeStr)
  res.send(`Testing readinessProbe --> ${new Date().toLocaleString()}`)
})

module.exports = router
