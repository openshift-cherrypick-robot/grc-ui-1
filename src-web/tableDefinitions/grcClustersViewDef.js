/* Copyright (c) 2020 Red Hat, Inc. */

'use strict'

import {
  buildClusterLink,
  getClusterCompliantStatus,
  getClusterViolationLabels,
} from './utils'
import {
  breakWord,
  wrappable,
  sortable
} from '@patternfly/react-table'

export default {
  tableActions: [
    'table.actions.launch.cluster'
  ],
  tableKeys: [
    {
      msgKey: 'table.header.cluster.name',
      resourceKey: 'cluster',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: buildClusterLink,
    },
    {
      msgKey: 'table.header.cluster.namespace',
      resourceKey: 'namespace',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.cluster.violation',
      resourceKey: 'clusterCompliant',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: getClusterCompliantStatus
    },
    {
      msgKey: 'table.header.violated',
      resourceKey: 'nonCompliant',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: getClusterViolationLabels,
    },
  ],
  sortBy: {
    index: 2,
    direction: 'desc',
  }
}
