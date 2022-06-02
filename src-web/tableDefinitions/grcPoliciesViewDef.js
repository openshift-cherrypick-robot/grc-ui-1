/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import {
  createComplianceLink,
  getPolicyCompliantStatus,
  getCategories,
  getControls,
  getStandards,
  getAutomationLink,
  getRemediationText,
  getSource,
  getSourceText,
  getStatus,
  getStatusText,
} from './utils'
import {
  breakWord,
  wrappable
} from '@patternfly/react-table'
export default {
  tableActions: [
    'table.actions.edit',
    'table.actions.disable',
    'table.actions.enforce',
    'table.actions.remove',
  ],
  tableKeys: [
    // Primary rows of expandable table
    {
      label: 'name',
      msgKey: 'table.header.policy.name',
      resourceKey: 'metadata.name',
      searchable: true,
      sortable: true,
      sortLabel: 'name.rawData',
      transforms: [wrappable],
      cellTransforms: [breakWord],
      transformFunction: createComplianceLink,
    },
    {
      label: 'namespace',
      msgKey: 'table.header.namespace',
      resourceKey: 'namespace',
      searchable: true,
      sortable: true,
      transforms: [wrappable],
      cellTransforms: [breakWord],
    },
    {
      label: 'status',
      msgKey: 'table.header.status',
      resourceKey: 'raw.spec.disabled',
      searchable: true,
      sortable: true,
      sortLabel: 'status.text',
      transforms: [wrappable],
      cellTransforms: [breakWord],
      transformFunction: getStatus,
      textFunction: getStatusText,
    },
    {
      label: 'remediation',
      msgKey: 'table.header.remediation',
      information: 'grc.remediation.tooltip',
      resourceKey: 'remediation',
      sortLabel: 'remediation.rawData',
      searchable: true,
      sortable: true,
      transforms: [wrappable],
      cellTransforms: [breakWord],
      transformFunction: getRemediationText,
    },
    {
      label: 'violations',
      msgKey: 'table.header.cluster.violation',
      resourceKey: 'clusterCompliant',
      transforms: [wrappable],
      searchable: true,
      sortable: true,
      sortLabel: 'violations.rawData',
      cellTransforms: [breakWord],
      transformFunction: getPolicyCompliantStatus,
    },
    {
      label: 'source',
      msgKey: 'table.header.source',
      resourceKey: 'source',
      searchable: true,
      sortable: true,
      sortLabel: 'source.text',
      transforms: [wrappable],
      cellTransforms: [breakWord],
      transformFunction: getSource,
      textFunction: getSourceText,
    },
    {
      label: 'controls',
      msgKey: 'table.header.controls',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/controls"]',
      searchable: true,
      sortable: true,
      sortLabel: 'controls.rawData',
      transforms: [wrappable],
      transformFunction: getControls,
    },
    // Expandable table subrows
    {
      label: 'categories',
      msgKey: 'table.header.categories',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/categories"]',
      searchable: true,
      subRow: true,
      transforms: [wrappable],
      transformFunction: getCategories,
    },
    {
      label: 'standards',
      msgKey: 'table.header.standards',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/standards"]',
      searchable: true,
      subRow: true,
      transforms: [wrappable],
      transformFunction: getStandards,
    },
    {
      label: 'automation',
      msgKey: 'table.header.automation',
      resourceKey: 'policyAutomation.metadata.name',
      sortable: true,
      sortLabel: 'automation.rawData',
      transforms: [wrappable],
      transformFunction: getAutomationLink,
    },
    {
      label: 'creation',
      msgKey: 'table.header.created',
      resourceKey: 'raw.metadata.creationTimestamp',
      sortable: true,
      sortLabel: 'creation.rawData',
      transforms: [wrappable],
      type: 'timestamp'
    },
    // Row metadata
    {
      hidden: true,
      label: 'disabled',
      resourceKey: 'raw.spec.disabled',
      type: 'boolean'
    },
  ],
  sortBy: {
    index: 8,
    direction: 'desc',
  }
}
