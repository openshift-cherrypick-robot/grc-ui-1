/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import resources from '../../lib/shared/resources'
import { Spinner } from '@patternfly/react-core'
import { connect } from 'react-redux'
import { updateSecondaryHeader } from '../actions/common'
import {getPollInterval} from '../components/common/RefreshTimeSelect'
import { GRC_REFRESH_INTERVAL_COOKIE } from '../../lib/shared/constants'
import { Query } from 'react-apollo'
import { POLICY_STATUS } from '../../lib/client/queries'
import { DangerNotification } from '../components/common/DangerNotification'
import PolicyStatusView from '../components/modules/PolicyStatusView'
import { setRefreshControl } from '../../lib/client/reactiveVars'
import NoResource from '../components/common/NoResource'
import { getTabs } from '../../lib/client/resource-helper'
import { LocaleContext } from '../components/common/LocaleContext'
import msgs from '../../nls/platform.properties'

resources(() => {
  require('../../scss/policy-status-tab.scss')
})

class PolicyStatusTab extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    policyName: PropTypes.string,
    policyNamespace: PropTypes.string,
    tabs: PropTypes.array,
    updateSecondaryHeader: PropTypes.func,
    url: PropTypes.string,
  }

  constructor (props) {
    super(props)
  }

  static contextType = LocaleContext

  getBreadcrumb() {
    const breadcrumbItems = []
    const { location } = this.props,
          { locale } = this.context,
          urlSegments = location.pathname.split('/')
    const hubNamespace = urlSegments.length > 4 ? urlSegments.slice(4, 5) : ''
    const policyName = urlSegments.length > 5 ? urlSegments.slice(5, 6) : ''
    breadcrumbItems.push({
      label: msgs.get('tabs.hcmcompliance', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all`
    },
    {
      label: policyName,
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${hubNamespace}/${policyName}`
    },
    {
      label: msgs.get('table.header.status', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${hubNamespace}/${policyName}/status`
    })
    return breadcrumbItems
  }

  componentDidMount() {
    const { policyName } = this.props
    const { tabs, url, updateSecondaryHeader: localUpdateSecondaryHeader } = this.props
    localUpdateSecondaryHeader(
      policyName,
      getTabs(tabs, (tab, index) => index === 0 ? url : `${url}/${tab}`),
      this.getBreadcrumb()
    )
  }

  render() {
    const {
      policyName,
      policyNamespace:hubNamespace,
    } = this.props
    const { locale } = this.context
    const pollInterval = getPollInterval(GRC_REFRESH_INTERVAL_COOKIE)
    return (
      <Query
        query={POLICY_STATUS}
        variables={{policyName, hubNamespace}}
        pollInterval={pollInterval}
        notifyOnNetworkStatusChange
      >
        {(result) => {
          const {data={}, loading, startPolling, stopPolling, refetch} = result
          const { status } = data
          if (!loading) {
            this.timestamp = new Date().toString()
          }
          setRefreshControl(loading, this.timestamp, startPolling, stopPolling, refetch)
          const error = status ? null : result.error
          if (error) {
            return (
              <DangerNotification error={error} />
            )
          } else if (loading && status === undefined) {
            return <Spinner className='patternfly-spinner' />
          } else if (Array.isArray(status) && status.length === 0) {
            return <NoResource
              title={msgs.get('no-status.title', [msgs.get('routes.grc', locale)], locale)}
              svgName='EmptyPagePlanet-illus.png'>
            </NoResource>
          } else {
            return (
              <PolicyStatusView
                status={status}
              />
            )
          }
        }}
      </Query>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, breadcrumbItems, links) => dispatch(updateSecondaryHeader(title, tabs, breadcrumbItems, links))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PolicyStatusTab))
