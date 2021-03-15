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

import React from 'react'
import resources from '../../lib/shared/resources'
resources(() => {
  require('../../scss/common.scss')
})
import PropTypes from 'prop-types'
// without curly braces means component with redux
// eslint-disable-next-line import/no-named-as-default
import SecondaryHeader from '../components/modules/SecondaryHeader'
import { Route, Switch, Redirect } from 'react-router-dom'
import client from '../../lib/shared/client'
import config from '../../lib/shared/config'
import Modal from '../components/common/Modal'
import GrcRouter from './GrcRouter'
import loadable from '@loadable/component'
import { LocaleContext } from '../components/common/LocaleContext'

export const ResourceToolbar = loadable(() => import(/* webpackChunkName: "ResourceToolbar" */ '../components/common/ResourceToolbar'))

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object,
    staticContext: PropTypes.object,
  }

  constructor(props) {
    super(props)
    if (client && document.getElementById('propshcm')) {
      this.serverProps = JSON.parse(document.getElementById('propshcm').textContent)
    }
  }

  getServerProps() {
    if (client) {
      return this.serverProps
    }
    return this.props.staticContext
  }

  render() {
    const serverProps = this.getServerProps()
    const { match } = this.props
    return (
      <LocaleContext.Provider value={serverProps.context}>
        <div className='expand-vertically'>
          <SecondaryHeader />
          <ResourceToolbar />
          <Switch>
            <Route path={`${match.url}`} render={() => <GrcRouter />} />
            <Redirect to={`${config.contextPath}`} />
          </Switch>
          <Modal locale={serverProps.context.locale} />
          <input type='hidden' id='app-access' value={serverProps.xsrfToken.toString('base64')} locale={serverProps.context.locale} />
        </div>
      </LocaleContext.Provider>
    )
  }
}

// eslint-disable-next-line react/display-name
export default props => (
  <div className='expand-vertically'>
    <Route path={config.contextPath} serverProps={props} component={App} />
  </div>
)
