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
import resources from '../lib/shared/resources'

const ReactDOMServer = require('react-dom/server'),
      thunkMiddleware = require('redux-thunk').default,
      redux = require('redux'),
      React = require('react'),
      express = require('express'),
      StaticRouter = require('react-router-dom').StaticRouter,
      context = require('../lib/shared/context'),
      msgs = require('../nls/platform.properties'),
      config = require('../config'),
      appUtil = require('../lib/server/app-util'),
      Provider = require('react-redux').Provider,
      router = express.Router({ mergeParams: true })

resources(() => {
  require('../scss/welcome.scss')
})

let reducers, WelcomeStatic  //laziy initialize to reduce startup time seen on k8s

router.get('*', (req, res) => {
  reducers = reducers === undefined ? require('../src-web/reducers') : reducers

  const store = redux.createStore(redux.combineReducers(reducers), redux.applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ))

  WelcomeStatic = WelcomeStatic === undefined ? require('../src-web/containers/Welcome').default : WelcomeStatic

  const fetchHeaderContext = getContext(req)
  fetchHeader(req, res, store, fetchHeaderContext)
})

function fetchHeader(req, res, store, ctx) {

  const manifest = appUtil.app().locals.manifest

  res.render('welcome', Object.assign({
    manifest: manifest,
    content: ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.originalUrl}
          context={ctx}>
          <WelcomeStatic url={req.originalUrl} />
        </StaticRouter>
      </Provider>
    ),
    contextPath: config.get('contextPath'),
    headerContextPath: config.get('contextPath'),
    state: store.getState(),
    props: ctx,
  }, ctx))
}

function getContext(req) {
  const reqContext = context(req)
  return {
    title: msgs.get('common.app.name', reqContext.locale),
    context: reqContext,
    xsrfToken: req.csrfToken(),
  }
}

module.exports = router
