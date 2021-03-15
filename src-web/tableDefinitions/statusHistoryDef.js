/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import {
  buildTimestamp,
  buildCompliantCellFromMessage,
  statusHistoryMessageTooltip,
} from './utils'
import {
  breakWord,
  wrappable,
  cellWidth,
  sortable
} from '@patternfly/react-table'

export default {
  tableKeys: [
    {
      msgKey: 'table.header.status',
      resourceKey: 'status',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: buildCompliantCellFromMessage
    },
    {
      msgKey: 'table.header.message',
      resourceKey: 'message',
      transforms: [cellWidth(70), wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: statusHistoryMessageTooltip
    },
    {
      msgKey: 'table.header.lastReport',
      resourceKey: 'timestamp',
      transforms: [wrappable, sortable],
      transformFunction: buildTimestamp
    },
  ],
  sortBy: {
    index: 2,
    direction: 'desc',
  }
}
