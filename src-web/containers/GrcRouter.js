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
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import config from '../../lib/shared/config'

export const PoliciesTab = loadable(() => import(/* webpackChunkName: "policies" */ './PoliciesTab'))
export const CreationTab = loadable(() => import(/* webpackChunkName: "creation" */ './CreationTab'))
export const PolicyDetailSubRouter = loadable(() => import(/* webpackChunkName: "policyDetail" */ './PolicyDetailSubRouter'))
export const PolicyDetailsByCluster = loadable(() => import(/* webpackChunkName: "policyCluster" */ './PolicyDetailsByCluster'))
export const PolicyTemplateDetails = loadable(() => import(/* webpackChunkName: "policyTemplateDetails" */ './PolicyTemplateDetails'))
export const PolicyStatusHistoryTab = loadable(() => import(/* webpackChunkName: "PolicyStatusHistoryTab" */ './PolicyStatusHistoryTab'))

const BASE_PAGE_PATH = `${config.contextPath}`

const SECONDARY_HEADER_PROPS = {
  title: 'routes.grc',
  information: 'grc.header.tooltip',
  links: [
    {
      id: 'create-policy',
      label: 'button.create.policy',
      url: `${BASE_PAGE_PATH}/create`
    }
  ]
}

const CREATION_HEADER_PROPS = {
  title: 'routes.create.policy',
  information: 'policy.create.tooltip',
  breadcrumbItems: [
    {
      id: 'policy-overview',
      label: 'routes.grc',
      url: `${BASE_PAGE_PATH}`
    },
    {
      id: 'policy-overview-all',
      label: 'routes.policies',
      url: `${BASE_PAGE_PATH}/all`
    },
  ],
}

const GrcRouter = ({ match }) =>
  <Switch>
    {/* Removes trailing slashes */}
    <Route path="/:url*(/+)" exact strict render={({ location }) => <Redirect to={location.pathname.replace(/\/+$/, '')} />} />
    {/* Removes duplicate slashes in the middle of the URL */}
    <Route path="/:url(.*//+.*)" exact strict render={({ match: { params }})=> <Redirect to={`/${params.url.replace(/\/\/+/, '/')}`} />} />
    <Route path={`${match.url}/all/:hubNamespace/:policyName/status/:cluster/templates/:template/history`}
      render={() => <PolicyStatusHistoryTab secondaryHeaderProps={SECONDARY_HEADER_PROPS} />} />
    <Route path={`${match.url}/policy/:clusterName/:name`} render={() => <PolicyDetailsByCluster secondaryHeaderProps={SECONDARY_HEADER_PROPS} />} />
    <Route path={`${match.url}/all/:policyNamespace/:policyName/template/:clusterName/:apiGroup/:version/:kind/:name`}
      render={() => <PolicyTemplateDetails secondaryHeaderProps={SECONDARY_HEADER_PROPS} />} />
    <Route path={`${match.url}/all/:namespace/:name/:tab?`} render={() => <PolicyDetailSubRouter secondaryHeaderProps={SECONDARY_HEADER_PROPS} />} />
    <Route path={`${match.url}/all`} exact render={() => <PoliciesTab secondaryHeaderProps={SECONDARY_HEADER_PROPS} />} />
    <Route path={`${match.url}/create`} render={() => <CreationTab secondaryHeaderProps={CREATION_HEADER_PROPS} />} />
    <Redirect to={`${match.url}/all`} />
  </Switch>

GrcRouter.propTypes = {
  match: PropTypes.object,
}

export default withRouter(GrcRouter)
