/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
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
import { StructuredListWrapper, StructuredListRow, StructuredListCell, StructuredListBody,
  OverflowMenu, OverflowMenuItem, StructuredListSkeleton, Button } from 'carbon-components-react'
import { Module, ModuleBody } from 'carbon-addons-cloud-react'
import { createDisableTooltip } from './DisableTooltip'
import _ from 'lodash'
import msgs from '../../../nls/platform.properties'
import resources from '../../../lib/shared/resources'
import { transform } from '../../../lib/client/resource-helper'
import { Link } from 'react-router-dom'
import { resourceActions } from './ResourceTableRowMenuItemActions'
import { connect } from 'react-redux'
import StatusField from '../../components/common/StatusField'
import _uniqueId from 'lodash/uniqueId'
import formatUserAccess from './FormatUserAccess'
import filterUserAction from './FilterUserAction'

resources(() => {
  require('../../../scss/structured-list-with-actions.scss')
})

const StructuredListModule = ({
  title,
  rows,
  data,
  id,
  actions,
  location,
  textEditButton,
  getResourceAction,
  clusterStatus,
  userAccess
}, context) =>{
  const resourceType = {name: title}
  const userAccessHash = formatUserAccess(userAccess)
  const filteredActions = (Array.isArray(actions) && actions.length > 0)
    ? filterUserAction(data, actions, userAccessHash, resourceType)
    : []
  if(!data){
    return <Module className='structured-list-module'>
      <StructuredListSkeleton className='content-spinner' />
    </Module>
  }
  else{
    const editAction = 'table.actions.edit'
    return <Module className='structured-list-module' id={id}>
      <div className='bx--module__header' style={{justifyContent: 'space-between'}} >
        <h1 className='bx--module__title'>{msgs.get(title, context.locale)}</h1>
        {
          Array.isArray(filteredActions) && filteredActions.length > 0 && (filteredActions.length === 1
            && filteredActions[0].includes(editAction) && textEditButton)
            ?
            (createDisableTooltip(filteredActions[0].includes('disabled.'), editAction, context.locale,
              (<Button small
                disabled={filteredActions[0].includes('disabled.')}
                className='text-edit-button'
                onClick={() => getResourceAction(
                  filteredActions[0].replace('disabled.', ''), data, null, history, context.locale
                )}>
                {msgs.get(editAction, context.locale)}
              </Button>)))
            :
            (<OverflowMenu
              floatingMenu
              flipped
              iconDescription={msgs.get('svg.description.overflowMenu', context.locale)}
            >
              {Array.isArray(filteredActions) && filteredActions.map((action) => {
                const disableFlag = action.includes('disabled.')
                if (disableFlag) {
                  action = action.replace('disabled.', '')
                }
                return <OverflowMenuItem
                  disabled={disableFlag}
                  data-table-action={action}
                  isDelete={
                    action ==='table.actions.remove' ||
                  action ==='table.actions.policy.remove' ||
                  action ==='table.actions.compliance.remove'
                  }
                  onClick={() => getResourceAction(action, data, null, history, context.locale)}
                  key={action}
                  itemText={createDisableTooltip(disableFlag, action, msgs.get(action, context.locale), context.locale)}
                />
              })}
            </OverflowMenu>)
        }
      </div>
      <ModuleBody>
        <StructuredListWrapper
          className='bx--structured-list--condensed'
          ariaLabel={msgs.get(title, context.locale)}
        >
          <StructuredListBody>
            {rows.map(row =>{
              if(row.cells[0].resourceKey === 'policy.pp.details.decisions'){
                const formatDecisions = StructuredListModule.formatDecisionsWithLinkAndIcon(
                  row.cells[1].resourceKey, data, clusterStatus, location, context)
                return (<StructuredListRow key={_uniqueId('SLRow')}>
                  <StructuredListCell key={_uniqueId('key')}>
                    <p>{msgs.get('policy.pp.details.decisions', context.locale)}</p>
                  </StructuredListCell>
                  <StructuredListCell key={_uniqueId('key')}>
                    {formatDecisions}
                  </StructuredListCell>
                </StructuredListRow>)
              }
              else{
                return (<StructuredListRow key={_uniqueId('SLRow')}>
                  {row.cells.map((cell, index) =>
                    <StructuredListCell key={_uniqueId('key')}>
                      { index === 0
                        ? <p>{transform(data, cell, context.locale)}</p>
                        : transform(data, cell, context.locale)
                      }
                    </StructuredListCell>
                  )}
                </StructuredListRow>)
              }
            })}
          </StructuredListBody>
        </StructuredListWrapper>
      </ModuleBody>
    </Module>
  }
}

StructuredListModule.contextTypes = {
  locale: PropTypes.string,
  userAccess: PropTypes.array
}

// eslint-disable-next-line react/display-name
StructuredListModule.formatDecisionsWithLinkAndIcon = (
  resourceKey, data, clusterStatus, location, context
) => {
  const decisions = _.get(data[resourceKey], 'decisions')
  const hubNamespace = _.get(data,'metadata.namespace')
  const urlSegments = location.pathname.replace(/\/$/, '').split('/')
  const baseUrl = urlSegments.slice(0, urlSegments.length- 3 ).join('/')
  const policyName = urlSegments[urlSegments.length-1]
  const links = []
  _.forEach(decisions, (item) => {
    const cluster = _.get(item, 'clusterName')
    const status = clusterStatus[cluster] ? clusterStatus[cluster].toLowerCase() : 'undefined'
    let statusIcon
    if (status === 'compliant' || status === 'noncompliant') {
      statusIcon = <StatusField status={status} text={msgs.get(`policy.status.${status}`,context.locale)} />
    } else {
      statusIcon = <StatusField status='unknown' text={msgs.get('policy.status.unknown',context.locale)} />
    }
    links.push(<div className='one-cluster-status' key={`${cluster}-container`}>
      <Link to= {`${baseUrl}/policy/${cluster}/${hubNamespace}.${policyName}`} >{cluster}</Link>
      {statusIcon}
    </div>)
  })
  return <div className='cluster-status-container'>{links}</div>
}
const mapStateToProps = (state) => {
  const userAccess = state.userAccess ? state.userAccess.access : []
  return { userAccess }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getResourceAction: (action, resource, hasService) =>
    resourceActions(action, dispatch, ownProps.resourceType, resource, hasService)
})

export default connect(mapStateToProps, mapDispatchToProps)(StructuredListModule)
