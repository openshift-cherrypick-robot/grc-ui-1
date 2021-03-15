/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import {
  buildTimestamp,
  createComplianceLink,
  getPolicyCompliantStatus,
} from './utils'
import {
  breakWord,
  wrappable,
  sortable
} from '@patternfly/react-table'
import {
  getCategories,
  getControls,
  getStandards
} from './hcm-compliances'

export default {
  tableActions: [
    'table.actions.edit',
    'table.actions.disable',
    'table.actions.enforce',
    'table.actions.remove',
  ],
  tableKeys: [
    {
      msgKey: 'table.header.policy.name',
      resourceKey: 'metadata.name',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: createComplianceLink
    },
    {
      msgKey: 'table.header.namespace',
      resourceKey: 'namespace',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.remediation',
      information: 'grc.remediation.tooltip',
      resourceKey: 'remediation',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
    },
    {
      msgKey: 'table.header.cluster.violation',
      resourceKey: 'clusterCompliant',
      transforms: [wrappable, sortable],
      cellTransforms: [breakWord],
      transformFunction: getPolicyCompliantStatus
    },
    {
      msgKey: 'table.header.standards',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/standards"]',
      transforms: [wrappable, sortable],
      transformFunction: getStandards,
    },
    {
      msgKey: 'table.header.categories',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/categories"]',
      transforms: [wrappable, sortable],
      transformFunction: getCategories
    },
    {
      msgKey: 'table.header.controls',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/controls"]',
      transforms: [wrappable, sortable],
      transformFunction: getControls,
    },
    {
      msgKey: 'table.header.created',
      resourceKey: 'raw.metadata.creationTimestamp',
      transforms: [sortable, wrappable],
      transformFunction: buildTimestamp,
    },
  ],
  sortBy: {
    index: 7,
    direction: 'desc',
  }
}
