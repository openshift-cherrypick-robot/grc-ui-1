/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import _ from 'lodash'
import {
  breakWord,
  wrappable,
} from '@patternfly/react-table'
import { buildCompliantCell } from './utils'
import msgs from '../nls/platform.properties'

export default {
  tableKeys: [
    {
      msgKey: 'table.header.name',
      label: 'name',
      searchable: true,
      sortable: true,
      resourceKey: 'object.metadata.name',
      transforms: [wrappable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.namespace',
      label: 'namespace',
      searchable: true,
      sortable: true,
      resourceKey: 'object.metadata.namespace',
      transforms: [wrappable],
    },
    {
      msgKey: 'table.header.kind',
      label: 'kind',
      searchable: true,
      sortable: true,
      resourceKey: 'object.kind',
      transforms: [wrappable],
    },
    {
      msgKey: 'table.header.apiGroups',
      label: 'apiGroups',
      sortable: true,
      resourceKey: 'object.apiVersion',
      transforms: [wrappable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.compliant',
      label: 'compliant',
      sortable: true,
      sortLabel: 'compliant.rawData',
      resourceKey: 'compliant',
      transforms: [wrappable],
      transformFunction: buildCompliantCell,
    },
    {
      msgKey: 'table.header.reason',
      label: 'reason',
      searchable: true,
      sortable: true,
      resourceKey: 'reason',
      transforms: [wrappable],
    },
    {
      label: 'link',
      transformFunction: buildViewYamlLink
    },
  ],
  sortBy: {
    index: 0,
    direction: 'asc',
  }
}

export function buildViewYamlLink(item, locale) {
  const cluster = _.get(item, 'cluster')
  const name = _.get(item, 'object.metadata.name')
  const namespace = _.get(item, 'object.metadata.namespace', '')
  const apiVersion = _.get(item, 'object.apiVersion')
  const kind = _.get(item, 'object.kind')
  const reason = _.get(item, 'reason')
  if (reason === 'Resource not found but should exist' || reason === 'Resource not found as expected') {
    return ''
  }
  if (cluster && kind && apiVersion && name) {
    if (namespace !== '') {
      return <a target='_blank' rel='noopener noreferrer'
        href={`/resources?cluster=${cluster}&kind=${kind}&apiversion=${apiVersion}&namespace=${namespace}&name=${name}`}>{msgs.get('table.actions.view.yaml', locale)}</a>
    } else {
      return <a target='_blank' rel='noopener noreferrer'
        href={`/resources?cluster=${cluster}&kind=${kind}&apiversion=${apiVersion}&name=${name}`}>{msgs.get('table.actions.view.yaml', locale)}</a>
    }
  }
  return ''
}
