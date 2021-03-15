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
      lodash = require('lodash'),
      request = require('../../lib/server/request'),
      i18n = require('node-i18n-util')

const log4js = require('log4js'),
      logger = log4js.getLogger('app')

const targetAPIGroups = [
  'policy.open-cluster-management.io',
  'apps.open-cluster-management.io',
]

let App, Login, reducers, access  //laziy initialize to reduce startup time seen on k8s

router.get('*', (req, res) => {
  reducers = reducers === undefined ? require('../../src-web/reducers') : reducers

  const store = redux.createStore(redux.combineReducers(reducers), redux.applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ))

  Login = Login === undefined ? require('../../src-web/actions/login') : Login
  store.dispatch(Login.receiveLoginSuccess(req.user))

  App = App === undefined ? require('../../src-web/containers/App').default : App

  const fetchHeaderContext = getContext(req)
  fetchHeader(req, res, store, fetchHeaderContext)
})

function fetchHeader(req, res, store, fetchHeaderContext) {
  const optionsUrlPrefix = `${config.get('headerUrl')}${config.get('headerContextPath')}/api/v1/header`
  const optionsUrlQuery = `serviceId=grc-ui&dev=${process.env.NODE_ENV === 'development'}&targetAPIGroups=${JSON.stringify(targetAPIGroups)}`
  const options = {
    method: 'GET',
    url: `${optionsUrlPrefix}?${optionsUrlQuery}`,
    json: true,
    headers: {
      Cookie: req.headers.cookie,
      Authorization: req.headers.Authorization || req.headers.authorization || `Bearer ${req.cookies['acm-access-token-cookie']}`,
      'Accept-Language': i18n.locale(req)
    }
  }
  request(options, null, [200], (err, headerRes) => {
    if (err) {
      return res.status(500).send(err)
    }

    const { headerHtml: header, props: propsH, state: stateH, files: filesH, userAccess } = headerRes.body
    if (!header || !propsH || !stateH || !filesH) {
      logger.err(headerRes.body)
      return res.status(500).send(headerRes.body)
    }

    access = access === undefined ? require('../../src-web/actions/access') : access
    if (userAccess) {
      // logger.info(`userAccess is : ${JSON.stringify(userAccess)}`)
      store.dispatch(access.userAccessSuccess(userAccess))
    }

    if(process.env.NODE_ENV === 'development') {
      lodash.forOwn(filesH, value => {
        value.path = `${config.get('contextPath')}/api/proxy${value.path}` //preprend with proxy route
      })
    }
    try {
      res.render('home', Object.assign({
        manifest: appUtil.app().locals.manifest,
        content: ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter
              location={req.originalUrl}
              context={fetchHeaderContext}>
              <App />
            </StaticRouter>
          </Provider>
        ),
        contextPath: config.get('contextPath'),
        headerContextPath: config.get('headerContextPath'),
        state: store.getState(),
        props: fetchHeaderContext,
        header: header,
        propsH: propsH,
        stateH: stateH,
        filesH: filesH
      }, fetchHeaderContext))
    } catch(e) {
      //eslint-disable-next-line no-console
      console.error(e)
    }
    return undefined
  })
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
