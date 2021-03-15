/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import resources from '../../lib/shared/resources'
import { getResourceData } from '../tableDefinitions'
import { connect } from 'react-redux'
import { updateSecondaryHeader } from '../actions/common'
import { SINGLE_POLICY } from '../../lib/client/queries'
import { getPollInterval } from '../components/common/RefreshTimeSelect'
import { GRC_REFRESH_INTERVAL_COOKIE } from '../../lib/shared/constants'
import { Spinner } from '@patternfly/react-core'
import { DangerNotification } from '../components/common/DangerNotification'
// eslint-disable-next-line import/no-named-as-default
import PolicyDetailsOverview from '../components/modules/PolicyDetailsOverview'
import { setRefreshControl } from '../../lib/client/reactiveVars'
import { getTabs } from '../../lib/client/resource-helper'
import msgs from '../../nls/platform.properties'
import { LocaleContext } from '../components/common/LocaleContext'
import NoResource from '../components/common/NoResource'

resources(() => {
  require('../../scss/policy-yaml-tab.scss')
})

class PolicyDetailsTab extends React.Component{
  constructor(props) {
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
      policyNamespace,
      resourceType
    } = this.props
    const pollInterval = getPollInterval(GRC_REFRESH_INTERVAL_COOKIE)
    return <Query
      query={SINGLE_POLICY}
      variables={{name: policyName, namespace: policyNamespace}}
      pollInterval={pollInterval}
      notifyOnNetworkStatusChange
    >
      {( result ) => {
        const {data={}, loading, startPolling, stopPolling, refetch} = result
        const { items } = data
        const error = items ? null : result.error
        const staticResourceData = getResourceData(resourceType)
        if (!loading) {
          this.timestamp = new Date().toString()
        }
        setRefreshControl(loading, this.timestamp, startPolling, stopPolling, refetch)

        if (error) {
          return <DangerNotification error={error} />
        } else if (loading && items === undefined) {
          return <Spinner className='patternfly-spinner' />
        } else if (items.length === 0){
          return <NoResource
            title={msgs.get('error.not.found', this.context.locale)}
            svgName='EmptyPagePlanet-illus.png'>
          </NoResource>
        } else {
          const item = items[0]
          return <PolicyDetailsOverview
            loading={!items && loading}
            error={error}
            item={item}
            resourceType={resourceType}
            staticResourceData={staticResourceData}
          />
        }
      }}
    </Query>
  }

}

PolicyDetailsTab.propTypes = {
  location: PropTypes.object,
  policyName: PropTypes.string,
  policyNamespace: PropTypes.string,
  resourceType: PropTypes.object,
  tabs: PropTypes.array,
  updateSecondaryHeader: PropTypes.func,
  url: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, breadcrumbItems, links) => dispatch(updateSecondaryHeader(title, tabs, breadcrumbItems, links))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PolicyDetailsTab))
