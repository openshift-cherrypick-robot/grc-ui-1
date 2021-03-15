/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '@patternfly/react-core'
import { updateSecondaryHeader } from '../actions/common'
import {getPollInterval} from '../components/common/RefreshTimeSelect'
import { GRC_REFRESH_INTERVAL_COOKIE } from '../../lib/shared/constants'
import msgs from '../../nls/platform.properties'
import { Query } from 'react-apollo'
import { POLICY_STATUS_HISTORY } from '../../lib/client/queries'
import Page from '../components/common/Page'
import resources from '../../lib/shared/resources'
import { LocaleContext } from '../components/common/LocaleContext'
import PolicyStatusHistoryView from '../components/modules/PolicyStatusHistoryView'
import { DangerNotification } from '../components/common/DangerNotification'
import { setRefreshControl } from '../../lib/client/reactiveVars'

resources(() => {
  require('../../scss/policy-status-history.scss')
})

class PolicyStatusHistoryTab extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    updateSecondaryHeader: PropTypes.func,
  }

  static contextType = LocaleContext

  constructor (props) {
    super(props)
  }

  getBreadcrumb() {
    const breadcrumbItems = []
    const { location } = this.props,
          { locale } = this.context,
          urlSegments = location.pathname.split('/')
    const { match: { params: { policyName, hubNamespace, cluster, template }} } = this.props
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
    },
    {
      label: msgs.get('table.header.history', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${hubNamespace}/${policyName}/status/${cluster}/templates/${template}/history`
    })
    return breadcrumbItems
  }

  componentDidMount() {
    const { locale } = this.context
    const { updateSecondaryHeader: localUpdateSecondaryHeader } = this.props
    localUpdateSecondaryHeader(msgs.get('panel.header.violation.history', locale), null, this.getBreadcrumb())
  }

  render() {
    const pollInterval = getPollInterval(GRC_REFRESH_INTERVAL_COOKIE)
    const { match: { params: { policyName, hubNamespace, cluster, template }}} = this.props
    return (
      <Query
        query={POLICY_STATUS_HISTORY}
        variables={{policyName, hubNamespace, cluster, template}}
        pollInterval={pollInterval}
        notifyOnNetworkStatusChange
      >
        {(result) => {
          const { data={}, loading, startPolling, stopPolling, refetch, error } = result
          if (!loading) {
            this.timestamp = new Date().toString()
          }
          setRefreshControl(loading, this.timestamp, startPolling, stopPolling, refetch)
          if (error) {
            return (
              <Page>
                <DangerNotification error={error} />
              </Page>
            )
          }
          const { items } = data
          if (items) {
            return (
              <Page>
                <PolicyStatusHistoryView
                  history={items}
                  template={template}
                  cluster={cluster}
                />
              </Page>
            )
          } else {
            return (
              <Spinner className='patternfly-spinner' />
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

export default withRouter(connect(null, mapDispatchToProps)(PolicyStatusHistoryTab))
