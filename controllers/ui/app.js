/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

const ReactDOMServer = require('react-dom/server'),
      thunkMiddleware = require('redux-thunk').default,
      redux = require('redux'),
      React = require('react'),
      express = require('express'),
      StaticRouter = require('react-router-dom').StaticRouter,
      context = require('../../lib/shared/context'),
      msgs = require('../../nls/platform.properties'),
      config = require('../../config'),
      appUtil = require('../../lib/server/app-util'),
      Provider = require('react-redux').Provider,
      router = express.Router({ mergeParams: true }),
      // accessCtrl = require('../useraccess'),
      request = require('../../lib/server/request'),
      async = require('async'),
      log4js = require('log4js'),
      logger = log4js.getLogger('namespace-client')

import _ from 'lodash'

let App, Login, reducers, access  //laziy initialize to reduce startup time seen on k8s

const targetAPIGroups = [
  'policy.open-cluster-management.io',
  'apps.open-cluster-management.io',
]

// auth = req.headers.Authorization || req.headers.authorization || `Bearer ${cookieUtil.getAccessToken(req)
const getUserNamespaces = (auth, cb) => {
  console.log('getUserNS')
  const options = {
    url: `${config.get('API_SERVER_URL')}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': auth
    },
    json: true
  }

  request(options, null, [200, 201, 204], (err, response) => {
    if (err) {
      return cb(err, null)
    }

    let userNamespaces = _.get(response, 'body.items', null)
    userNamespaces = userNamespaces
      ? userNamespaces.map(item => ({ Name: item.metadata.name }))
      : []
    cb(err, userNamespaces)
  }, logger)
}

function nsFormatter(multiNS) {
  console.log('ns formatter')
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
    console.log('user access cb')
    cb(null, userAccessFormatter(req, res))
  }, logger)
}

// parallelly calling to get user access info on each NS
// by using user namespaces passed from getHeader/getHeaderData
 const getUserAccessInfo = (authorizationToken, targetAPIGroups, rawDataFlag, namespaces, cb) => {
  console.log('GET UA INFO')
  const userAllNS = nsFormatter(namespaces)
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
      return cb(err, null)
    }
    // logger.info(`user access data got from step 2 is : ${JSON.stringify(userAccessResult)}`)
    return cb(null, { userAccess: userAccessResult })
  })
}

// format/combine/simplify/deal with * for user access raw data on single NS
function userAccessFormatter(req, accessInfo) {
  console.log('userAccessFormatter')
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

router.get('*', (req, res) => {
  reducers = reducers === undefined ? require('../../src-web/reducers') : reducers

  const store = redux.createStore(redux.combineReducers(reducers), redux.applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ))
  // const optionsUrlQuery = `serviceId=grc-ui&dev=${process.env.NODE_ENV === 'development'}&targetAPIGroups=${JSON.stringify(targetAPIGroups)}`
  // const options = {
  //   method: 'GET',
  //   url: `https://${req.headers.host}/multicloud/access?${optionsUrlQuery}`,
  //   json: true,
  //   headers: {
  //     Cookie: req.headers.cookie,
  //     Authorization: req.headers.Authorization || req.headers.authorization || `Bearer ${req.cookies['acm-access-token-cookie']}`,
  //     'Accept-Language': i18n.locale(req)
  //   }
  // }

  let userAccess
  const auth = req.headers.Authorization || req.headers.authorization || `Bearer ${req.cookies['acm-access-token-cookie']}`
  getUserNamespaces(auth, (err, userNS) => {
    if (err) {
      return res.status(err.statusCode || 500).send(err.details)
    }
    getUserAccessInfo(auth, targetAPIGroups, null, userNS, (err, ua) => {
      if (err) {
        return res.status(err.statusCode || 500).send(err.details)
      }
      console.log('---- post uA request')
      console.log(ua)
      userAccess = ua
      access = access === undefined ? require('../../src-web/actions/access') : access
      if (userAccess) {
        // logger.info(`userAccess is : ${JSON.stringify(userAccess)}`)
        store.dispatch(access.userAccessSuccess(userAccess))
      }

      Login = Login === undefined ? require('../../src-web/actions/login') : Login
      store.dispatch(Login.receiveLoginSuccess(req.user))

      App = App === undefined ? require('../../src-web/containers/App').default : App

      const fetchHeaderContext = getContext(req)
      fetchHeader(req, res, store, fetchHeaderContext)
    })
  })

  // request(options, null, [200], (err, results) => {
  //     if (err) {
  //       return res.status(err.statusCode || 500).send(err.details)
  //     }
  //     console.log('---- post uA request')
  //     console.log(results)
  //     userAccess = results.userAccess
  //     access = access === undefined ? require('../../src-web/actions/access') : access
  //     if (userAccess) {
  //       // logger.info(`userAccess is : ${JSON.stringify(userAccess)}`)
  //       store.dispatch(access.userAccessSuccess(userAccess))
  //     }

  //     Login = Login === undefined ? require('../../src-web/actions/login') : Login
  //     store.dispatch(Login.receiveLoginSuccess(req.user))

  //     App = App === undefined ? require('../../src-web/containers/App').default : App

  //     const fetchHeaderContext = getContext(req)
  //     fetchHeader(req, res, store, fetchHeaderContext)
  //   }
  // )
})

function fetchHeader(req, res, store, ctx) {

  res.render('home', Object.assign({
    manifest: appUtil.app().locals.manifest,
    content: ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.originalUrl}
          context={ctx}>
          <App />
        </StaticRouter>
      </Provider>
    ),
    contextPath: config.get('contextPath'),
    headerContextPath: config.get('headerContextPath'),
    state: store.getState(),
    props: ctx,
  }, ctx))
}

function getContext(req) {
  const reqContext = context(req)
  return {
    title: msgs.get('common.app.name', reqContext.locale),
    context: reqContext,
    xsrfToken: req.csrfToken()
  }
}

module.exports = router
