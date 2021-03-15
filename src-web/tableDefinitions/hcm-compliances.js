/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import React from 'react'
import _ from 'lodash'
import msgs from '../../nls/platform.properties'
import { getAge, getLabelsToList } from '../../lib/client/resource-helper'
import { Link } from 'react-router-dom'
import StatusField from '../components/common/StatusField'
import config from '../../lib/shared/config'

export default {
  defaultSortField: 'metadata.name',
  primaryKey: 'metadata.name',
  secondaryKey: 'metadata.namespace',
  compliancePolicies: {
    resourceKey: 'compliancePolicies',
    title: 'table.header.compliance.policies',
    defaultSortField: 'name',
    normalizedKey: 'name',
    tableKeys: [
      {
        msgKey: 'table.header.compliant',
        resourceKey: 'policyCompliantStatus',
        key: 'policyCompliantStatus',
        transformFunction: getCompliancePolicyStatus,
      },
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
        transformFunction: createPolicyLink,
      },
      {
        msgKey: 'table.header.cluster.compliant',
        resourceKey: 'clusterCompliant',
        key: 'clusterCompliant',
        transformFunction: createCompliancePolicyLink,
      },
      {
        msgKey: 'table.header.cluster.not.compliant',
        resourceKey: 'clusterNotCompliant',
        key: 'clusterNotCompliant',
        transformFunction: createCompliancePolicyLink,
      },
    ],
  },
  placementBindingKeys: {
    title: 'application.placement.bindings',
    defaultSortField: 'name',
    resourceKey: 'placementBindings',
    tableKeys: [
      {
        key: 'name',
        resourceKey: 'metadata.name',
        msgKey: 'table.header.name'
      },
      {
        key: 'namespace',
        resourceKey: 'metadata.namespace',
        msgKey: 'table.header.namespace'
      },
      {
        key: 'placementpolicy',
        resourceKey: 'placementRef.name',
        msgKey: 'table.header.placementpolicy'
      },
      {
        key: 'subjects',
        resourceKey: 'subjects',
        msgKey: 'table.header.subjects',
        transformFunction: getSubjects
      },
      {
        key: 'timestamp',
        resourceKey: 'metadata.creationTimestamp',
        msgKey: 'table.header.created',
        transformFunction: getAge
      },
    ],
    detailKeys: {
      title: 'policy.pb.details.title',
      headerRows: ['type', 'detail'],
      rows: [
        {
          cells: [
            {
              resourceKey: 'policy.pb.details.name',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.name'
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pb.details.namespace',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.namespace'
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pb.details.pp',
              type: 'i18n'
            },
            {
              resourceKey: 'placementRef.name'
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pb.details.subjects',
              type: 'i18n'
            },
            {
              resourceKey: 'subjects[0]',
              transformFunction: getSubjects
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pb.details.timestamp',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.creationTimestamp',
              transformFunction: getAge,
            }
          ]
        },
      ]
    },
    tableActions: [
      'table.actions.edit',
    ],
  },
  placementPolicyKeys: {
    title: 'application.placement.policies',
    defaultSortField: 'name',
    resourceKey: 'placementPolicies',
    tableKeys: [
      {
        key: 'name',
        resourceKey: 'metadata.name',
        msgKey: 'table.header.name'
      },
      {
        key: 'namespace',
        resourceKey: 'metadata.namespace',
        msgKey: 'table.header.namespace'
      },
      {
        key: 'clusterSelector',
        resourceKey: 'clusterLabels',
        msgKey: 'table.header.cluster.selector',
        transformFunction: getLabelsToList,
      },
      {
        key: 'decisions',
        resourceKey: 'status',
        msgKey: 'table.header.decisions',
        transformFunction: getDecisions,
      },
      {
        key: 'timestamp',
        resourceKey: 'metadata.creationTimestamp',
        msgKey: 'table.header.created',
        transformFunction: getAge
      },
    ],
    detailKeys: {
      title: 'policy.pp.details.title',
      headerRows: ['type', 'detail'],
      rows: [
        {
          cells: [
            {
              resourceKey: 'policy.pp.details.name',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.name'
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pp.details.namespace',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.namespace'
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pp.details.clusterSelector',
              type: 'i18n'
            },
            {
              resourceKey: 'clusterLabels',
              transformFunction: getLabelsToList
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pp.details.decisions',
              type: 'i18n'
            },
            {
              resourceKey: 'status',
              transformFunction: getDecisions,
            }
          ]
        },
        {
          cells: [
            {
              resourceKey: 'policy.pp.details.timestamp',
              type: 'i18n'
            },
            {
              resourceKey: 'metadata.creationTimestamp',
              transformFunction: getAge,
            }
          ]
        },
      ]
    },
    tableActions: [
      'table.actions.edit',
    ],
  },
  roleTemplates:{
    resourceKey: 'role-templates',
    title: 'table.header.role.template',
    defaultSortField: 'metadata.name',
    normalizedKey: 'metadata.name',
    tableKeys: [
      {
        msgKey: 'table.header.role.template.name',
        resourceKey: 'metadata.name',
        key: 'name',
      },
      {
        msgKey: 'table.header.role.template.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'table.header.role.template.apiVersion',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      }
    ],
    rows: [{
      cells: [
        {
          resourceKey: 'metadata.name',
        },
        {
          resourceKey: 'complianceType',
        },
        {
          resourceKey: 'apiVersion',
        }
      ]
    }],
    subHeaders :[
      'table.header.role.template.complianceType',
      'table.header.apiGroups',
      'table.header.resources',
      'table.header.ruleVerbs',
    ]
  },
  objectTemplates:{
    resourceKey: 'object-templates',
    title: 'table.header.object.template',
    defaultSortField: 'metadata.name',
    normalizedKey: 'metadata.name',
    tableKeys: [
      {
        msgKey: 'table.header.object.template.name',
        resourceKey: 'metadata.name',
        key: 'name',
      },
      {
        msgKey: 'table.header.object.template.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'table.header.object.template.apiVersion',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.object.template.kind',
        resourceKey: 'kind',
        key: 'kind',
      }
    ],
  },
  policyTemplates:{
    resourceKey: 'policy-templates',
    title: 'table.header.policy.template',
    defaultSortField: 'metadata.name',
    normalizedKey: 'metadata.name',
    tableKeys: [
      {
        msgKey: 'table.header.object.template.name',
        resourceKey: 'metadata.name',
        key: 'name',
      },
      {
        msgKey: 'table.header.object.template.apiVersion',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.object.template.kind',
        resourceKey: 'kind',
        key: 'kind',
      }
    ],
  },
  complianceStatus: {
    resourceKey: 'complianceStatus',
    title: 'table.header.compliance.compliant',
    defaultSortField: 'clusterNamespace',
    normalizedKey: 'clusterNamespace',
    tableKeys: [
      {
        msgKey: 'table.header.cluster.namespace',
        resourceKey: 'clusterNamespace',
        key: 'clusterNamespace',
      },
      {
        msgKey: 'table.header.compliance.policy.status',
        resourceKey: 'localCompliantStatus',
        key: 'localCompliantStatus',
      },
      {
        msgKey: 'table.header.compliance.policy.valid',
        resourceKey: 'localValidStatus',
        key: 'localValidStatus',
      },
    ],
  },
  tableKeys: [
    {
      msgKey: 'table.header.policy.name',
      resourceKey: 'metadata.name',
      transformFunction: createComplianceLink,
    },
    {
      msgKey: 'table.header.namespace',
      resourceKey: 'metadata.namespace',
    },
    {
      msgKey: 'table.header.remediation',
      resourceKey: 'remediation',
    },
    {
      msgKey: 'table.header.cluster.violation',
      resourceKey: 'clusterCompliant',
    },
    {
      msgKey: 'table.header.controls',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/controls"]',
      transformFunction: getControls,
    },
    {
      msgKey: 'table.header.standards',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/standards"]',
      transformFunction: getStandards,
    },
    {
      msgKey: 'table.header.categories',
      resourceKey: 'metadata.annotations["policy.open-cluster-management.io/categories"]',
      transformFunction: getCategories
    },
  ],
  tableActions: [
    'table.actions.edit',
    'table.actions.remove',
  ],
  detailKeys: {
    title: 'compliance.details',
    headerRows: ['type', 'detail'],
    rows: [
      {
        cells: [
          {
            resourceKey: 'description.title.name',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.name'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.namespace',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.namespace'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.remediation',
            information: 'grc.remediation.tooltip',
            type: 'i18n'
          },
          {
            resourceKey: 'raw.spec.remediationAction'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.disabled',
            type: 'i18n'
          },
          {
            resourceKey: 'raw.spec.disabled'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'table.header.cluster.violation',
            type: 'i18n'
          },
          {
            resourceKey: 'clusterCompliant'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.categories',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.annotations["policy.open-cluster-management.io/categories"]',
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.controls',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.annotations["policy.open-cluster-management.io/controls"]',
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.standards',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.annotations["policy.open-cluster-management.io/standards"]',
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.created',
            type: 'timestamp'
          },
          {
            resourceKey: 'metadata.creationTimestamp'
          }
        ]
      },
    ]
  },
  policyTemplatesKeys: {
    title: 'policy.template.details',
    headerRows: ['description.title.name', 'description.title.last.transition', 'description.title.templateType'],
    rows: [
      {
        cells: [
          {
            resourceKey: 'name',
          },
          {
            resourceKey: 'lastTransition',
            transformFunction: getAge
          },
          {
            resourceKey: 'templateType',
          }
        ]
      }
    ]
  },
  policyRules: {
    title: 'table.header.rules',
    resourceKey: 'rules',
    defaultSortField: 'ruleUID',
    normalizedKey: 'ruleUID',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'ruleUID',
        key: 'ruleUID',
      },
      {
        msgKey: 'table.header.templateType',
        resourceKey: 'templateType',
        key: 'templateType',
      },
      {
        msgKey: 'table.header.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'table.header.apiGroups',
        resourceKey: 'apiGroups',
        key: 'apiGroups',
        transformFunction: getAPIGroups
      },
      {
        msgKey: 'table.header.ruleVerbs',
        resourceKey: 'verbs',
        key: 'verbs',
        transformFunction: getRuleVerbs
      },
      {
        msgKey: 'table.header.resources',
        resourceKey: 'resources',
        key: 'resources',
      },
    ],
  },
  policyViolations: {
    resourceKey: 'violations',
    title: 'table.header.violation.detail',
    defaultSortField: 'name',
    normalizedKey: 'name',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
      },
      {
        msgKey: 'table.header.cluster',
        resourceKey: 'cluster',
        key: 'cluster',
        transformFunction: formLinkToCluster,
      },
      {
        msgKey: 'table.header.message',
        resourceKey: 'message',
        key: 'message',
        transformFunction: formMessageLink,
      },
      {
        msgKey: 'table.header.timestamp',
        resourceKey: 'timestamp',
        key: 'timestamp',
        transformFunction: getAge,
      },
    ],
  },
  policyInfoKeys: {
    title: 'policy.details',
    headerRows: ['type', 'detail'],
    rows: [
      {
        cells: [
          {
            resourceKey: 'description.title.name',
            type: 'i18n'
          },
          {
            resourceKey: 'name'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'table.header.message',
            type: 'i18n'
          },
          {
            resourceKey: 'message'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.status',
            type: 'i18n'
          },
          {
            resourceKey: 'status'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.remediation',
            type: 'i18n'
          },
          {
            resourceKey: 'remediation'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.exclude_namespace',
            type: 'i18n'
          },
          {
            resourceKey: 'detail.exclude_namespace',
            transformFunction: getExcludeNamespace
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.include_namespace',
            type: 'i18n'
          },
          {
            resourceKey: 'detail.include_namespace',
            transformFunction: getIncludeNamespace
          }
        ]
      },
    ]
  },
  policyDetailKeys: {
    title: 'policy.details',
    headerRows: ['type', 'detail'],
    rows: [
      {
        cells: [
          {
            resourceKey: 'description.title.name',
            type: 'i18n'
          },
          {
            resourceKey: 'metadata.name'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'table.header.cluster',
            type: 'i18n'
          },
          {
            resourceKey: 'cluster'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'table.header.message',
            type: 'i18n'
          },
          {
            resourceKey: 'status.details',
            transformFunction: getAggregatedMessage,
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.status',
            type: 'i18n'
          },
          {
            resourceKey: 'status.compliant'
          }
        ]
      },
      {
        cells: [
          {
            resourceKey: 'description.title.remediation',
            type: 'i18n'
          },
          {
            resourceKey: 'remediation'
          }
        ]
      },
    ]
  },
  policyRoleTemplates: {
    title: 'table.header.roleTemplates',
    defaultSortField: 'name',
    normalizedKey: 'name',
    resourceKey: 'roleTemplates',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
      },
      {
        msgKey: 'table.header.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'description.title.api.version',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.compliant',
        resourceKey: 'compliant',
        key: 'compliant',
        transformFunction: getStatus
      },
    ],
  },
  policyRoleBindingTemplates: {
    title: 'table.header.roleBindingTemplates',
    defaultSortField: 'name',
    normalizedKey: 'name',
    resourceKey: 'roleBindingTemplates',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
      },
      {
        msgKey: 'table.header.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'description.title.api.version',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.compliant',
        resourceKey: 'compliant',
        key: 'compliant',
        transformFunction: getStatus
      },
    ],
  },
  policyObjectTemplates: {
    title: 'table.header.objectTemplates',
    defaultSortField: 'name',
    normalizedKey: 'name',
    resourceKey: 'objectTemplates',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
      },
      {
        msgKey: 'table.header.complianceType',
        resourceKey: 'complianceType',
        key: 'complianceType',
      },
      {
        msgKey: 'description.title.api.version',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.kind',
        resourceKey: 'kind',
        key: 'kind',
      },
      {
        msgKey: 'table.header.compliant',
        resourceKey: 'compliant',
        key: 'compliant',
        transformFunction: getStatus
      },
    ],
  },
  policyPolicyTemplates: {
    title: 'table.header.policyTemplates',
    defaultSortField: 'name',
    normalizedKey: 'name',
    resourceKey: 'policyTemplates',
    tableKeys: [
      {
        msgKey: 'table.header.name',
        resourceKey: 'name',
        key: 'name',
      },
      {
        msgKey: 'description.title.api.version',
        resourceKey: 'apiVersion',
        key: 'apiVersion',
      },
      {
        msgKey: 'table.header.kind',
        resourceKey: 'kind',
        key: 'kind',
      },
      {
        msgKey: 'table.header.compliant',
        resourceKey: 'compliant',
        key: 'compliant',
        transformFunction: getStatus
      },
    ],
  },
}

export function createComplianceLink(item = {}, ...param){
  if (param[2]) {
    return item.metadata.name
  } else {
    if (item.raw.kind === 'Compliance') {
      return <Link to={`${config.contextPath}/all/${encodeURIComponent(item.metadata.name)}`}>{item.metadata.name} (Deprecated)</Link>
    }
    else {
      return <Link to={`${config.contextPath}/all/${encodeURIComponent(item.metadata.name)}`}>{item.metadata.name}</Link>
    }
  }
}

export function getStatus(item, locale) {
  const status = _.get(item, 'status', '-')
  if (status.compliant){
    return <StatusField status={status.compliant.toLowerCase()} text={msgs.get(`policy.status.${status.compliant.toLowerCase()}`, locale)} />
  } else if (status && typeof(status)==='string' && status !== '-'){
    return <StatusField status={status.toLowerCase()} text={msgs.get(`policy.status.${status.toLowerCase()}`, locale)} />
  }
  return '-'
}

export function getCompliancePolicyStatus(item, locale) {
  if (item.clusterNotCompliant && item.clusterNotCompliant.length > 0){
    return <StatusField status='noncompliant' text={msgs.get('policy.status.noncompliant', locale)} />
  }
  return <StatusField status='compliant' text={msgs.get('policy.status.compliant', locale)} />
}

export function createCompliancePolicyLink(item = {}, ...param){
  const policyKeys = item[param[1]]
  const policyArray = []
  policyKeys && policyKeys.forEach(policyKey => {
    const targetPolicy = item.policies.find(policy => item.name === policy.name && policyKey === policy.cluster)
    policyArray.push(targetPolicy)
  })

  return policyArray.length > 0 ?
    <ul>{policyArray.map(policy => (<li key={`${policy.cluster}-${policy.name}`}>
      <Link
        to={`${config.contextPath}/all/${encodeURIComponent(policy.complianceNamespace)}/${encodeURIComponent(policy.complianceName)}/compliancePolicy/${encodeURIComponent(policy.name)}/${policy.cluster}`}>
        {policy.cluster}
      </Link>
    </li>))}</ul>
    :
    '-'
}

export function createPolicyLink(item = {}){
  return  <Link
    to={`${config.contextPath}/all/${encodeURIComponent(item.complianceNamespace)}/${encodeURIComponent(item.complianceName)}/compliancePolicy/${encodeURIComponent(item.name)}`}>
    {item.name}
  </Link>
}

export function getStatusCount(item) {
  return `${item.policyCompliant}/${item.policyTotal}`
}

export function getClusterCount(item) {
  return `${item.clusterCompliant}/${item.clusterTotal}`
}

export function getSubjects(item) {
  if(item && item.subjects){
    return item.subjects.map(subject => `${subject.name}(${subject.apiGroup})`).join(', ')
  }
  else{
    return '-'
  }
}

export function getControls(item) {
  const annotations = _.get(item, 'metadata.annotations') || {}
  return formatAnnotationString(annotations['policy.open-cluster-management.io/controls'])
}

export function getStandards(item) {
  const annotations = _.get(item, 'metadata.annotations') || {}
  return formatAnnotationString(annotations['policy.open-cluster-management.io/standards'])
}

export function getCategories(item) {
  const annotations = _.get(item, 'metadata.annotations') || {}
  return formatAnnotationString(annotations['policy.open-cluster-management.io/categories'])
}

export function formatAnnotationString(items){
  if (items) {
    return items.split(',').map(item => item.trim()).join(', ')
  }
  return '-'
}

export function getDecisions(item = {}){
  const decisions = _.get(item, 'placementPolicies[0].status.decisions') || _.get(item, 'status.decisions')
  if (decisions) {
    return decisions.map(decision => decision.clusterName).join(', ')
  }
  return '-'
}

export function formLinkToCluster(item){
  if(item && item.cluster && item.consoleURL){
    return <a target='_blank' rel='noopener noreferrer' href={`${item.consoleURL}`}>{item.cluster}</a>
  }
  else if (item && item.cluster) {
    return item.cluster
  }
  return '-'
}

export function formMessageLink(item, locale){
  if(item && item.message){
    if (item.policyNamespace) {
      return <div>
        {`${item.message} `}
        <Link to={`${config.contextPath}/all/${item.policyNamespace}/${item.policyName}/template/${item.cluster}/${item.apiVersion}/${item.kind}/${item.name}`}>
          {msgs.get('table.actions.view.details', locale)}
        </Link>
      </div>
    }
    return <div>
      {item.message}
    </div>

  }
  return '-'
}

export function getAggregatedMessage(item) {
  const details = _.get(item, 'status.details', [])
  let message = ''
  details.forEach((detail) => {
    const policyName = _.get(detail, 'templateMeta.name','-')
    if(_.get(detail, 'compliant') === 'Compliant') {
      message += `${policyName}: Compliant, `
    } else {
      const policyMessage = _.get(detail, 'history[0].message','-')
      message += `${policyName}: ${policyMessage} `
    }
  })
  return message
}

export function getAPIGroups(item) {
  const apiGroups = _.get(item, 'apiGroups')
  if (apiGroups) {
    return apiGroups.join(', ')
  }
  return '-'
}

export function getRuleVerbs(item) {
  const verbs = _.get(item, 'verbs')
  if (verbs) {
    return verbs.join(', ')
  }
  return '-'
}

export function getExcludeNamespace(item) {
  const namespace = _.get(item, 'detail.exclude_namespace')
  if (namespace) {
    return namespace.join(', ')
  }
  return '-'
}

export function getIncludeNamespace(item) {
  const namespace = _.get(item, 'detail.include_namespace')
  if (namespace) {
    return namespace.join(', ')
  }
  return '-'
}
