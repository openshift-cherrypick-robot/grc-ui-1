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
      router = express.Router({ mergeParams: true })

let App, Login, reducers  //laziy initialize to reduce startup time seen on k8s

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
