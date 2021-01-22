/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

const request = require('request').defaults({ rejectUnauthorized: false }),
      config = require('../config'),
      log4js = require('log4js'),
      logger = log4js.getLogger('namespace-client'),
      async = require('async')

import _ from 'lodash'

function nsFormatter(multiNS) {
  let formattedNS = []
  if (Array.isArray(multiNS) && multiNS.length > 0) {
    formattedNS = multiNS.map((ns) => {
      if (ns.Name) {
        return ns.Name
      } else {
        return ns.name
      }})
  }
  // logger.info(`formattedNS is : ${JSON.stringify(formattedNS)}`)
  return formattedNS
}

// get user access info on single namespace
const getUserAccess = (req, cb) => {
  logger.info('---- IN GET USER ACCESS ------')
  console.log('user access')
  const k8sAPI = '/apis/authorization.k8s.io/v1'
  const options = {
    method: 'POST',
    url: `${config.get('API_SERVER_URL')}${k8sAPI}/selfsubjectrulesreviews`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: req.authorizationToken
    },
    body: {
      apiVersion: 'authorization.k8s.io/v1',
      kind: 'SelfSubjectRulesReview',
      spec: {
        namespace: req.singleNS
      },
    }
  }

  request(options, null, [200,201], (err, res) => {
    if (err) {
      return cb(err, null)
    }
    logger.info('---- IN CB ------')
    console.log('user access cb')
    cb(null, userAccessFormatter(req, res))
  }, logger)
}

// parallelly calling to get user access info on each NS
// by using user namespaces passed from getHeader/getHeaderData
exports.getUserAccessInfo = (req, res) => {
  return function(results, cb) {
    const query = (req && req.query) ? req.query : {}
    const headers = (req && req.headers) ? req.headers : {}
    let authorizationToken = ''
    if (headers.authorization) {
      authorizationToken = headers.authorization
    }
    else if (headers.Authorization) {
      authorizationToken = headers.Authorization
    }
    // user parameter that defines the returning api groups
    let targetAPIGroups = []
    let rawDataFlag = false
    if (query.targetAPIGroups && Array.isArray(JSON.parse(query.targetAPIGroups))) {
      targetAPIGroups = _.uniqWith(JSON.parse(query.targetAPIGroups), _.isEqual)
      if (query.raw) {
        rawDataFlag = query.raw // user parameter if returning the raw access data
      }
    }

    const userAllNS = nsFormatter(results.namespaceReq)
    // logger.info(`user all NS got from getHeader/getHeaderData are : ${JSON.stringify(userAllNS)}`)
    const userAccessReq = []
    userAllNS.map((singleNS) => {// each element binds with one NS then parallelly call whole array
      userAccessReq.push(
        getUserAccess({
          authorizationToken,
          singleNS,
          targetAPIGroups,
          rawDataFlag
        }))
    })
    async.parallel(userAccessReq, (err, userAccessResult) => {
      if (err) {
        return res.status(err.statusCode || 500).send(err.details)
      }
      // logger.info(`user access data got from step 2 is : ${JSON.stringify(userAccessResult)}`)
      results.userAccess = userAccessResult
      return cb(null, results)
    })
  }
}

// format/combine/simplify/deal with * for user access raw data on single NS
function userAccessFormatter(req, accessInfo) {
  const targetAPIGroups = new Set(req.targetAPIGroups)
  const singleNSAccess ={
    namespace: req.singleNS,
    rules: {},
  }
  // if user query raw = true, also return original raw access data on each namespace
  if (req.rawDataFlag) {
    singleNSAccess.rawData = accessInfo
  }
  const resourceRules = _.get(accessInfo,'body.status.resourceRules','')
  if (Array.isArray(resourceRules) && resourceRules.length > 0) {
    resourceRules.forEach((resourceRule) => {
      if (Array.isArray(resourceRule.apiGroups)) {
        const apiGroups = _.compact(resourceRule.apiGroups)
        resourceRule.apiGroups.length > 0 && apiGroups.forEach((api) => {
          // no matter if user want *, always return these special cases
          if (Array.isArray(resourceRule.resources) && (targetAPIGroups.has(api) || api === '*')) {
            const resources = _.compact(resourceRule.resources)
            const verbs = _.compact(resourceRule.verbs)
            resourceRule.resources.length > 0 && resources.forEach((resource) => {
              // use the combined api + resource as the unique key
              const mapKey = `${api}/${resource}`
              if (Object.prototype.hasOwnProperty.call(singleNSAccess.rules, mapKey)) {
                singleNSAccess.rules[mapKey] = _.union(singleNSAccess.rules[mapKey], verbs)
              }
              else {
                singleNSAccess.rules[mapKey] = verbs
              }
            })
          }
        })
      }
    })
  }
  return singleNSAccess
}
