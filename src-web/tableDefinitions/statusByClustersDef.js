/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import {
  breakWord,
  cellWidth,
  wrappable,
} from '@patternfly/react-table'
import {
  buildCompliantCellFromMessage,
  buildClusterLink,
  buildStatusHistoryLink,
  buildTemplateDetailLink
} from './utils'

export default {
  tableKeys: [
    {
      msgKey: 'table.header.cluster',
      label: 'cluster',
      searchable: true,
      sortable: true,
      sortLabel: 'cluster.rawData',
      resourceKey: 'cluster',
      transforms: [wrappable],
      transformFunction: buildClusterLink
    },
    {
      msgKey: 'table.header.compliance',
      label: 'compliance',
      searchable: true,
      sortable: true,
      sortLabel: 'compliance.rawData',
      resourceKey: 'status',
      transforms: [cellWidth(15)],
      transformFunction: buildCompliantCellFromMessage
    },
    {
      msgKey: 'table.header.template',
      label: 'templateName',
      searchable: true,
      sortable: true,
      resourceKey: 'templateName',
      transforms: [wrappable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.message',
      label: 'message',
      searchable: true,
      sortable: true,
      sortLabel: 'message.rawData',
      resourceKey: 'message',
      transforms: [cellWidth(70), wrappable],
      cellTransforms: [breakWord],
      transformFunction: buildTemplateDetailLink
    },
    {
      msgKey: 'table.header.timestamp',
      label: 'timestamp',
      sortable: true,
      sortLabel: 'timestamp.rawData',
      resourceKey: 'timestamp',
      transforms: [wrappable],
      type: 'timestamp'
    },
    {
      msgKey: 'table.header.history',
      label: 'history',
      transforms: [wrappable],
      transformFunction: buildStatusHistoryLink
    },
  ],
  sortBy: {
    index: 1,
    direction: 'desc',
  }
}
