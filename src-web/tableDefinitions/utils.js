/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'
import config from '../../lib/shared/config'
import { Tooltip, Label } from '@patternfly/react-core'
import {
  GreenCheckCircleIcon,
  RedExclamationCircleIcon,
  YellowExclamationTriangleIcon,
} from '../components/common/Icons'
import TableTimestamp from '../components/common/TableTimestamp'
import msgs from '../../nls/platform.properties'
import TruncateText from '../components/common/TruncateText'
import { LocaleContext } from '../components/common/LocaleContext'

// use console.log(JSON.stringify(result, circular())) to test return result from transform
export const transform = (items, def, locale) => {
  const rows = items.map(item => {
    return def.tableKeys.map(key => {
      let value = _.get(item, key.resourceKey)
      if (key.type === 'timestamp') {
        return moment.unix(value).format('MMM Do YYYY \\at h:mm A')
      } else if (key.type === 'i18n') {
        return msgs.get(key.resourceKey, locale)
      } else if (key.type === 'boolean') {
        value = (Boolean(value)).toString()
        return msgs.get(value, locale)
      } else if (key.transformFunction && typeof key.transformFunction === 'function') {
        return { title: key.transformFunction(item, locale) }
      } else {
        return (value || value === 0) ? value : '-'
      }
    })
  })

  const columns = def.tableKeys.map(key => {
    return {
      title: key.msgKey ? msgs.get(key.msgKey, locale): '',
      ...key
    }
  })

  const sortBy = def.sortBy ? def.sortBy : { index: 0, direction: 'asc' } // default if doesn't exist

  return { columns, rows, sortBy }
}

export const buildCompliantCell = (item, locale) => {
  const compliant = _.get(item, 'compliant', '-')
  if (compliant.toLowerCase() === 'compliant') {
    return <div><GreenCheckCircleIcon /> {msgs.get('table.cell.compliant', locale)}</div>
  } else if (compliant.toLowerCase() === 'noncompliant') {
    return <div><RedExclamationCircleIcon /> {msgs.get('table.cell.noncompliant', locale)}</div>
  } else {
    return <div><YellowExclamationTriangleIcon /> {msgs.get('table.cell.nostatus', locale)}</div>
  }
}

export const buildCompliantCellFromMessage = (item, locale) => {
  const message = _.get(item, 'message', '-')
  const compliant = message.split(';')[0]
  if (compliant.toLowerCase() === 'compliant') {
    return <div><GreenCheckCircleIcon /> {msgs.get('table.cell.compliant', locale)}</div>
  } else if (compliant.toLowerCase() === 'noncompliant') {
    return <div><RedExclamationCircleIcon /> {msgs.get('table.cell.noncompliant', locale)}</div>
  } else {
    return <div><YellowExclamationTriangleIcon /> {msgs.get('table.cell.nostatus', locale)}</div>
  }
}

export const buildTimestamp = (item) => {
  const createdTime = _.get(item, 'timestamp') ? _.get(item, 'timestamp') : _.get(item, 'raw.metadata.creationTimestamp')
  return <TableTimestamp timestamp={createdTime} />
}

export function buildClusterLink(item) {
  const cluster = _.get(item, 'cluster')
  if (cluster) {
    const clusterURL = `${config.clusterContextPath}/${cluster}/overview`
    return <a
      rel='noopener noreferrer'
      href={clusterURL}>
      {cluster}
    </a>
  }
  return '-'
}

export function buildStatusHistoryLink(item, locale) {
  const policyName = _.get(item, 'policyName')
  const policyNamespace = _.get(item, 'policyNamespace')
  const cluster = _.get(item, 'cluster')
  const templateName = _.get(item, 'templateName')
  if (policyName && policyNamespace && cluster && templateName) {
    const statusHistoryURL = `/multicloud/policies/all/${policyNamespace}/${policyName}/status/${cluster}/templates/${templateName}/history`
    return <Link to={statusHistoryURL}>
      {msgs.get('table.actions.view.history', locale)}
    </Link>
  }
  return '-'
}

export function buildTemplateDetailLink(item, locale) {
  const message = _.get(item, 'message')
  const policyName = _.get(item, 'policyName')
  const policyNamespace = _.get(item, 'policyNamespace')
  const cluster = _.get(item, 'cluster')
  const templateName = _.get(item, 'templateName')
  const apiVersion = _.get(item, 'apiVersion')
  const kind = _.get(item, 'kind')
  const showDetailsLink = _.get(item, 'showDetailsLink', true)
  if (message && policyName && policyNamespace && cluster && templateName && apiVersion && kind) {
    const templateDetailURL = `/multicloud/policies/all/${policyNamespace}/${policyName}/template/${cluster}/${apiVersion}/${kind}/${templateName}`
    return <div className='policy-details-message'>
      <TruncateText text={message} maxCharacters={300} textEnd={' '} />
      {showDetailsLink ?
        <Link to={templateDetailURL}>
          {msgs.get('table.actions.view.details', locale)}
        </Link>
        :
        <Tooltip content={msgs.get('error.permission.disabled', locale)}>
          <span className='link-disabled'>
            {msgs.get('table.actions.view.details', locale)}
          </span>
        </Tooltip>
      }
    </div>
  }
  return ''
}

export function statusHistoryMessageTooltip(item) {
  const message = _.get(item, 'message')
  return  <TruncateText text={message} maxCharacters={300} />
}

export function createComplianceLink(item = {}, ...param){
  let policyName = '-'
  if (param[2]) {
    policyName = item.metadata.name
  } else if (item && item.metadata)
  {
    if (_.get(item, 'raw.kind') === 'Compliance') {
      policyName = <Link to={`${config.contextPath}/all/${encodeURIComponent(item.metadata.name)}`}>{item.metadata.name} (Deprecated)</Link>
    }
    else {
      policyName = <Link to={`${config.contextPath}/all/${encodeURIComponent(item.metadata.namespace)}/${encodeURIComponent(item.metadata.name)}`}>{item.metadata.name}</Link>
    }
  }
  if (_.get(item, 'raw.spec.disabled')) {
    policyName = <div className='policy-table-name-ctr'>
      {policyName}{' '} {' '}
      <Label className='disabled-label'>
        {msgs.get('policy.disabled.label', LocaleContext.locale)}
      </Label>
    </div>
  }
  return policyName
}

export function getPolicyCompliantStatus(item, locale) {
  const clusterCompliant =  _.get(item, 'clusterCompliant', '-')
  const tooltip = msgs.get('table.tooltip.nostatus', locale)
  if (clusterCompliant === '-') {
    return (
      <div className='violationCell'>
        <YellowExclamationTriangleIcon tooltip={tooltip} />{clusterCompliant}
      </div>
    )
  }
  const statusArray = _.get(item, 'clusterCompliant').split('/')
  const violationCount = parseInt(statusArray[0], 10)
  const totalCount = parseInt(statusArray[1], 10)
  const unknownCount = statusArray.length === 3 ? parseInt(statusArray[2], 10) : 0
  return (
    <div className='violationCell'>
      { violationCount > 0 ?
        <RedExclamationCircleIcon tooltip={msgs.get('table.tooltip.noncompliant', locale)} /> :
        totalCount > unknownCount && <GreenCheckCircleIcon tooltip={msgs.get('table.tooltip.compliant', locale)} />}
      { unknownCount > 0 && <YellowExclamationTriangleIcon tooltip={tooltip} /> }
      {`${violationCount}/${totalCount}`}
    </div>
  )
}

export function getClusterCompliantStatus(item, locale) {
  const statusArray = _.get(item, 'violation').split('/')
  return (
    <div className='violationCell'>
      { parseInt(statusArray[0], 10) > 0 ?
        <RedExclamationCircleIcon tooltip={msgs.get('table.tooltip.noncompliant', locale)} /> :
        <GreenCheckCircleIcon tooltip={msgs.get('table.tooltip.compliant', locale)} /> }
      { parseInt(statusArray[2], 10) > 0 &&
        <YellowExclamationTriangleIcon tooltip={msgs.get('table.tooltip.nostatus', locale)} /> }
      {`${statusArray[0]}/${statusArray[1]}`}
    </div>
  )
}

export function getClusterViolationLabels(item) {
  return <TruncateText text={item.nonCompliant.join(', ')} />
}
