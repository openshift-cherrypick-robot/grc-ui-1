/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import {
  AcmPageContent, AcmPageHeader, AcmAutoRefreshSelect,
  AcmRefreshTime, AcmSecondaryNav, AcmAlert, AcmPage
} from '@open-cluster-management/ui-components'
import { Spinner, PageSection } from '@patternfly/react-core'
import { useHistory, useParams } from 'react-router-dom'

import {
  INITIAL_POLL_INTERVAL,
  REFRESH_INTERVALS,
  REFRESH_INTERVAL_COOKIE
} from '../utils/constants'
import { getPageDefinition } from './definitions/PageDefinitions'
import _ from 'lodash'
import { getSource } from '../tableDefinitions/utils'
import msgs from '../nls/platform.properties'

let timestamp = new Date().toString()

// merge policyAutomations info into policies info
// by matching policyName + policyNS
function addAutomationToPolicy(policies, policyAutomations) {
  const policiesCopy = _.cloneDeep(policies)
  const policyAutomationsMap = new Map()
  if (Array.isArray(policyAutomations) && policyAutomations.length > 0) {
    policyAutomations.forEach((policyAutomation) => {
      const policyAutomationNS = _.get(policyAutomation, 'metadata.namespace')
      const policyName = _.get(policyAutomation, 'spec.policyRef')
      if (policyAutomationNS && policyName) {
        const policyAutomationsMapKey = `${policyAutomationNS}/${policyName}`
        policyAutomationsMap.set(policyAutomationsMapKey, policyAutomation)
      }
    })
  }

  if (policyAutomationsMap.size > 0){
    policiesCopy.forEach((policy) => {
      const policyNS = _.get(policy, 'metadata.namespace')
      const policyName = _.get(policy, 'metadata.name')
      if (policyName && policyNS) {
        const policyMapKey = `${policyNS}/${policyName}`
        policy.policyAutomation = policyAutomationsMap.get(policyMapKey)
      }
    })
  }
  return policiesCopy
}

function getPolicyDetailSourceLabel(policyData, locale) {
  const item = _.get(policyData, 'compliances[0]') ||  _.get(policyData, 'items[0]')
  if (item?.external) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { item.source ? (
          <>
            <p style={{ paddingRight: '.25rem' }}>{msgs.get('policy.source.managed.by', locale)}</p>
            {getSource(item, locale)}
          </>
        ) :
        <p>{msgs.get('policy.source.managed.externally', locale)}</p>
        }
      </div>
    )
  }
}

function AcmGrcPage(props) {
  const { locale } = props
  const allProps = {...props, ...useParams(), history: useHistory() }
  const page = getPageDefinition(allProps)
  const { loading, data={}, refetch, error, previousData } = useQuery(
    page.query,
    { variables: page.query_variables, notifyOnNetworkStatusChange: true })
  let { items } = data
  if (page.id === 'policies' || page.id === 'policy-details') {
    const { policyAutomations } = data
    items = addAutomationToPolicy(items, policyAutomations)
    if (items && refetch) {
      items.refetch = refetch
    }
  }
  // Disable edit button if policy not found
  let resourceNotFound = !items || items.length === 0
  if (page.id === 'policy-clusters' || page.id === 'policy-templates') {
    const { compliances } = data
    resourceNotFound = !compliances || compliances.length === 0
  }
  if (!loading) {
    timestamp = new Date().toString()
  }
  return (
    <React.Fragment>
      <AcmPage
        header={
          <AcmPageHeader title={page.title}
            breadcrumb={page.breadcrumb}
            navigation={page.navigation && (
              <AcmSecondaryNav>
                {page.navigation.map(nav => nav(allProps))}
              </AcmSecondaryNav>
            )}
            controls={
              <React.Fragment>
                {page.refreshControls && (
                  <React.Fragment>
                    <AcmAutoRefreshSelect refetch={refetch}
                      refreshIntervals={REFRESH_INTERVALS}
                      refreshIntervalCookie={REFRESH_INTERVAL_COOKIE}
                      initPollInterval={INITIAL_POLL_INTERVAL} />
                    <AcmRefreshTime timestamp={timestamp} reloading={loading} />
                  </React.Fragment>
                )}
                <div className='page-header-button-group'>
                {page.buttons && (
                  page.buttons.map(btn => btn({resourceNotFound, ...allProps}))
                )}
                </div>
              </React.Fragment>
            }
            description={
							(page.id === 'policy-details' ||
								page.id === 'policy-clusters' ||
								page.id === 'policy-templates') &&
							getPolicyDetailSourceLabel(data, locale)
						}
            >
          </AcmPageHeader>
        }
      >
        <AcmPageContent id={page.id}>
          <PageSection>
            {(() => {
              if (error) {
                // Handle Apollo networkError type
                let eHeader
                const eMsg = []
                if (error.networkError) {
                  const { statusCode='', result='' } = error.networkError
                  let {bodyText='', message=''} = error.networkError
                  if (statusCode === 403) {
                    bodyText = error.networkError.response.statusText
                    message = ''
                  }
                  eHeader = <p key='eHeader'>Network Error {statusCode}</p>
                  eMsg.push(<p key='eBodyText'>{bodyText}</p>)
                  eMsg.push(<p key='eMessage'>{message}</p>)
                  if (result.errors) {
                    eMsg.push(
                      <p key='eMsgDetails'>
                        {result.errors.map((e) => e.message).join(';')}
                      </p>
                    )
                  }
                // Handle Apollo graphQLErrors type
                } else {
                  let errorMessages = []
                  if (error.graphQLErrors.length > 0) {
                    errorMessages = error.graphQLErrors
                  } else if (error.errors) {
                    errorMessages = error.errors
                  }
                  eHeader = <p key='eHeader'>GraphQL Error</p>
                  eMsg.push(
                    <p key='eMessage'>{
                      errorMessages.map((e) => e.message).join(';')}
                    </p>
                  )
                }
                return <AcmAlert isInline={true} noClose={true} variant='danger'
                  title={eHeader} subtitle={eMsg} />
              }
              if (loading && !previousData || items === undefined ) {
                return <Spinner className='patternfly-spinner' />
              } else {
                return page.children({ items, resourceNotFound })
              }
            })()}
          </PageSection>
        </AcmPageContent>
      </AcmPage>
    </React.Fragment>
  )
}

AcmGrcPage.propTypes = {
  locale: PropTypes.string,
}

export default AcmGrcPage
