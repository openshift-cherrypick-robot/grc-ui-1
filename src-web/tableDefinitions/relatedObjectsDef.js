/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import _ from 'lodash'
import {
  breakWord,
  sortable,
  wrappable,
} from '@patternfly/react-table'
import { buildCompliantCell } from './utils'
import msgs from '../../nls/platform.properties'

export default {
  tableKeys: [
    {
      msgKey: 'table.header.name',
      resourceKey: 'object.metadata.name',
      transforms: [sortable, wrappable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.namespace',
      resourceKey: 'object.metadata.namespace',
      transforms: [sortable, wrappable],
    },
    {
      msgKey: 'table.header.kind',
      resourceKey: 'object.kind',
      transforms: [sortable, wrappable],
    },
    {
      msgKey: 'table.header.apiGroups',
      resourceKey: 'object.apiVersion',
      transforms: [sortable, wrappable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.compliant',
      resourceKey: 'compliant',
      transforms: [sortable, wrappable],
      transformFunction: buildCompliantCell,
    },
    {
      msgKey: 'table.header.reason',
      resourceKey: 'reason',
      transforms: [sortable, wrappable],
    },
    {
      transformFunction: buildViewYamlLink
    },
  ],
  sortBy: {
    index: 0,
    direction: 'asc',
  }
}

function buildViewYamlLink(item, locale) {
  const cluster = _.get(item, 'cluster')
  const name = _.get(item, 'object.metadata.name')
  const namespace = _.get(item, 'object.metadata.namespace', '')
  const apiVersion = _.get(item, 'object.apiVersion')
  const kind = _.get(item, 'object.kind')
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
