/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
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
      cookieUtil = require('../../lib/server/cookie-util'),
      appUtil = require('../../lib/server/app-util'),
      Provider = require('react-redux').Provider,
      router = express.Router({ mergeParams: true }),
      lodash = require('lodash'),
      request = require('../../lib/server/request')

var log4js = require('log4js'),
    logger = log4js.getLogger('app')

let App, Login, reducers, role, uiConfig  //laziy initialize to reduce startup time seen on k8s
router.get('/logout', (req, res) => {
  var LOGOUT_API = '/v1/auth/logout'
  var callbackUrl = req.headers['host']
  cookieUtil.deleteAuthCookies(res)
  logger.debug('headers host:'+callbackUrl)
  var redirectUrl = process.env.NODE_ENV !== 'development' && callbackUrl ? `https://${callbackUrl}${LOGOUT_API}` : `${config.get('cfcRouterUrl')}${LOGOUT_API}`
  logger.debug('Final logout url:'+ redirectUrl)
  return res.send({ redirectUrl })
})

router.get('*', (req, res) => {
  reducers = reducers === undefined ? require('../../src-web/reducers') : reducers

  const store = redux.createStore(redux.combineReducers(reducers), redux.applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ))

  Login = Login === undefined ? require('../../src-web/actions/login') : Login
  store.dispatch(Login.receiveLoginSuccess(req.user))

  App = App === undefined ? require('../../src-web/containers/App').default : App
  const context = getContext(req)
  fetchHeader(req, res, store, context)
})

function fetchHeader(req, res, store, context) {
  const options = {
    method: 'GET',
    url: `${config.get('cfcRouterUrl')}${config.get('platformHeaderContextPath')}/api/v1/header?serviceId=grc-ui&dev=${process.env.NODE_ENV === 'development'}`,
    json: true,
    headers: {
      Cookie: createCookie(req)
    }
  }
  request(options, null, [200], (err, headerRes) => {
    if (err) {
      return res.status(500).send(err)
    }

    const { headerHtml: header, props: propsH, state: stateH, files: filesH } = headerRes.body

    uiConfig = uiConfig === undefined ? require('../../src-web/actions/uiconfig') : uiConfig
    store.dispatch(uiConfig.uiConfigReceiveSucess(stateH.uiconfig.uiConfiguration))
    role = role === undefined ? require('../../src-web/actions/role') : role
    store.dispatch(role.roleReceiveSuccess(stateH.role.role))

    if(process.env.NODE_ENV === 'development') {
      lodash.forOwn(filesH, value => {
        value.path = `${config.get('contextPath')}/common/api/proxy${value.path}` //preprend with proxy route
      })
    }
    try {
      res.render('main', Object.assign({
        manifest: appUtil.app().locals.manifest,
        content: ReactDOMServer.renderToString(
          <Provider store={store}>
            <StaticRouter
              location={req.originalUrl}
              context={context}>
              <App />
            </StaticRouter>
          </Provider>
        ),
        contextPath: config.get('contextPath'),
        state: store.getState(),
        props: context,
        header: header,
        propsH: propsH,
        stateH: stateH,
        filesH: filesH
      }, context))
    } catch(e) {
      //eslint-disable-next-line
      console.error(e)
    }
  })
}

function createCookie(req) {
  var cookieNames = cookieUtil.getCookieNames()
  return cookieNames.map(cookieName => {
    return `${cookieName}=${req.cookies[cookieName]}`
  }).join('; ')
}

function getContext(req) {
  const req_context = context(req)
  return {
    title: msgs.get('common.app.name', req_context.locale),
    context: req_context,
    xsrfToken: req.csrfToken()
  }
}

module.exports = router
