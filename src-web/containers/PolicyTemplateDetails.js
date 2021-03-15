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
import { POLICY_TEMPLATE_DETAILS } from '../../lib/client/queries'
import PolicyTemplateDetailsView from '../components/modules/PolicyTemplateDetailsView'
import Page from '../components/common/Page'
import resources from '../../lib/shared/resources'
import { LocaleContext } from '../components/common/LocaleContext'
import { DangerNotification } from '../components/common/DangerNotification'
import { setRefreshControl } from '../../lib/client/reactiveVars'

resources(() => {
  require('../../scss/policy-template-details.scss')
})

class PolicyTemplateDetails extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    // resourceType: PropTypes.object,
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
    const {
      match: {
        params: {
          policyName,
          policyNamespace,
          clusterName,
          apiGroup,
          version,
          kind,
          name,
        }
      }
    } = this.props
    breadcrumbItems.push({
      label: msgs.get('tabs.hcmcompliance', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all`
    },
    {
      label: policyName,
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${policyNamespace}/${policyName}`
    },
    {
      label: msgs.get('table.header.status', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${policyNamespace}/${policyName}/status`
    },
    {
      label: msgs.get('table.header.template', locale),
      noLocale: true,
      url: `${urlSegments.slice(0, 3).join('/')}/all/${policyNamespace}/${policyName}/template/${clusterName}/${apiGroup}/${version}/${kind}/${name}`
    })
    return breadcrumbItems
  }

  componentDidMount() {
    const { updateSecondaryHeader: localUpdateSecondaryHeader, match: { params: { name }} } = this.props
    localUpdateSecondaryHeader(name, null, this.getBreadcrumb())
  }

  render() {
    const pollInterval = getPollInterval(GRC_REFRESH_INTERVAL_COOKIE)
    const { match: { params: { clusterName: cluster, apiGroup, version, kind, name }}} = this.props
    const selfLink = `/apis/${apiGroup}/${version}/namespaces/${cluster}/${kind}/${name}`
    return (
      <Query query={POLICY_TEMPLATE_DETAILS} variables={{name, cluster, kind, selfLink}} pollInterval={pollInterval} notifyOnNetworkStatusChange >
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
                <PolicyTemplateDetailsView template={items} selfLink={selfLink} />
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

export default withRouter(connect(null, mapDispatchToProps)(PolicyTemplateDetails))
