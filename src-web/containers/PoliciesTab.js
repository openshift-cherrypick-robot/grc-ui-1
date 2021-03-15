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
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { GRC_REFRESH_INTERVAL_COOKIE } from '../../lib/shared/constants'
import { getPollInterval } from '../components/common/RefreshTimeSelect'
import Page from '../components/common/Page'
// without curly braces means component with redux
// eslint-disable-next-line import/no-named-as-default
import GrcView from '../components/modules/GrcView'
import { updateSecondaryHeader } from '../actions/common'
import { ALL_POLICIES } from '../../lib/client/queries'
import msgs from '../../nls/platform.properties'
import { LocaleContext } from '../components/common/LocaleContext'
import { setRefreshControl } from '../../lib/client/reactiveVars'
class PoliciesTab extends React.Component {
  static propTypes = {
    secondaryHeaderProps: PropTypes.object,
    updateSecondaryHeader: PropTypes.func,
  }

  static contextType = LocaleContext

  constructor (props) {
    super(props)
    this.firstLoad = true
  }

  UNSAFE_componentWillMount() {
    const { updateSecondaryHeader:localUpdateSecondaryHeader, secondaryHeaderProps } = this.props
    const { title, tabs, links, information } = secondaryHeaderProps
    localUpdateSecondaryHeader(msgs.get(title, this.context.locale), tabs, links, msgs.get(information, this.context.locale))
  }

  render () {
    const { secondaryHeaderProps } = this.props
    const pollInterval = getPollInterval(GRC_REFRESH_INTERVAL_COOKIE)
    return (
      <Page>
        <Query query={ALL_POLICIES} pollInterval={pollInterval} notifyOnNetworkStatusChange >
          {( complianceResult ) => {
            const {data={}, loading, startPolling, stopPolling, refetch} = complianceResult
            const { items } = data
            const error = items ? null : complianceResult.error
            if (error) {
              const errorName = complianceResult.error.graphQLErrors[0].name ? complianceResult.error.graphQLErrors[0].name : error.name
              error.name = errorName
            }
            if (!loading) {
              this.timestamp = new Date().toString()
            }
            setRefreshControl(loading, this.timestamp, startPolling, stopPolling, refetch)
            return <GrcView
              loading={!items && loading}
              error={error}
              grcItems={items}
              secondaryHeaderProps={secondaryHeaderProps}
            />

          }
          }
        </Query>
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, links, information) => dispatch(updateSecondaryHeader(title, tabs, undefined, links, '', information)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PoliciesTab))
