/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


export const staticResourceData = {
  'defaultSortField': 'metadata.name',
  'primaryKey': 'metadata.name',
  'secondaryKey': 'metadata.namespace',
  'compliancePolicies': {
    'resourceKey': 'compliancePolicies',
    'title': 'table.header.compliance.policies',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'tableKeys': [
      {
        'msgKey': 'table.header.compliant',
        'resourceKey': 'policyCompliantStatus',
        'key': 'policyCompliantStatus'
      },
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.cluster.compliant',
        'resourceKey': 'clusterCompliant',
        'key': 'clusterCompliant'
      },
      {
        'msgKey': 'table.header.cluster.not.compliant',
        'resourceKey': 'clusterNotCompliant',
        'key': 'clusterNotCompliant'
      }
    ]
  },
  'placementBindingKeys': {
    'title': 'application.placement.bindings',
    'defaultSortField': 'name',
    'resourceKey': 'placementBindings',
    'tableKeys': [
      {
        'key': 'name',
        'resourceKey': 'metadata.name',
        'msgKey': 'table.header.name'
      },
      {
        'key': 'namespace',
        'resourceKey': 'metadata.namespace',
        'msgKey': 'table.header.namespace'
      },
      {
        'key': 'placementpolicy',
        'resourceKey': 'placementRef.name',
        'msgKey': 'table.header.placementpolicy'
      },
      {
        'key': 'subjects',
        'resourceKey': 'subjects',
        'msgKey': 'table.header.subjects'
      },
      {
        'key': 'timestamp',
        'resourceKey': 'metadata.creationTimestamp',
        'msgKey': 'table.header.created'
      }
    ],
    'detailKeys': {
      'title': 'policy.pb.details.title',
      'headerRows': [
        'type',
        'detail'
      ],
      'rows': [
        {
          'cells': [
            {
              'resourceKey': 'policy.pb.details.name',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.name'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pb.details.namespace',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.namespace'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pb.details.pp',
              'type': 'i18n'
            },
            {
              'resourceKey': 'placementRef.name'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pb.details.subjects',
              'type': 'i18n'
            },
            {
              'resourceKey': 'subjects[0]'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pb.details.timestamp',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.creationTimestamp'
            }
          ]
        }
      ]
    },
    'tableActions': [
      'table.actions.edit'
    ]
  },
  'placementPolicyKeys': {
    'title': 'application.placement.policies',
    'defaultSortField': 'name',
    'resourceKey': 'placementPolicies',
    'tableKeys': [
      {
        'key': 'name',
        'resourceKey': 'metadata.name',
        'msgKey': 'table.header.name'
      },
      {
        'key': 'namespace',
        'resourceKey': 'metadata.namespace',
        'msgKey': 'table.header.namespace'
      },
      {
        'key': 'clusterSelector',
        'resourceKey': 'clusterLabels',
        'msgKey': 'table.header.cluster.selector'
      },
      {
        'key': 'decisions',
        'resourceKey': 'status',
        'msgKey': 'table.header.decisions'
      },
      {
        'key': 'timestamp',
        'resourceKey': 'metadata.creationTimestamp',
        'msgKey': 'table.header.created'
      }
    ],
    'detailKeys': {
      'title': 'policy.pp.details.title',
      'headerRows': [
        'type',
        'detail'
      ],
      'rows': [
        {
          'cells': [
            {
              'resourceKey': 'policy.pp.details.name',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.name'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pp.details.namespace',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.namespace'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pp.details.clusterSelector',
              'type': 'i18n'
            },
            {
              'resourceKey': 'clusterLabels'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pp.details.decisions',
              'type': 'i18n'
            },
            {
              'resourceKey': 'status'
            }
          ]
        },
        {
          'cells': [
            {
              'resourceKey': 'policy.pp.details.timestamp',
              'type': 'i18n'
            },
            {
              'resourceKey': 'metadata.creationTimestamp'
            }
          ]
        }
      ]
    },
    'tableActions': [
      'table.actions.edit'
    ]
  },
  'roleTemplates': {
    'resourceKey': 'role-templates',
    'title': 'table.header.role.template',
    'defaultSortField': 'metadata.name',
    'normalizedKey': 'metadata.name',
    'tableKeys': [
      {
        'msgKey': 'table.header.role.template.name',
        'resourceKey': 'metadata.name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.role.template.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'table.header.role.template.apiVersion',
        'resourceKey': 'apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'table.header.role.template.lastTransition',
        'resourceKey': 'status.conditions[0].lastTransitionTime',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.role.template.status',
        'resourceKey': 'status.Compliant',
        'key': 'status'
      }
    ],
    'rows': [
      {
        'cells': [
          {
            'resourceKey': 'metadata.name'
          },
          {
            'resourceKey': 'complianceType'
          },
          {
            'resourceKey': 'apiVersion'
          },
          {
            'resourceKey': 'status.conditions[0].lastTransitionTime'
          },
          {
            'resourceKey': 'status.Compliant'
          }
        ]
      }
    ],
    'subHeaders': [
      'table.header.role.template.complianceType',
      'table.header.apiGroups',
      'table.header.resources',
      'table.header.ruleVerbs'
    ]
  },
  'objectTemplates': {
    'resourceKey': 'object-templates',
    'title': 'table.header.object.template',
    'defaultSortField': 'objectDefinition.metadata.name',
    'normalizedKey': 'objectDefinition.metadata.name',
    'tableKeys': [
      {
        'msgKey': 'table.header.object.template.name',
        'resourceKey': 'objectDefinition.metadata.name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.object.template.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'table.header.object.template.apiVersion',
        'resourceKey': 'objectDefinition.apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'table.header.object.template.kind',
        'resourceKey': 'objectDefinition.kind',
        'key': 'kind'
      },
      {
        'msgKey': 'table.header.object.template.lastTransition',
        'resourceKey': 'status.conditions[0].lastTransitionTime',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.object.template.status',
        'resourceKey': 'status.Compliant',
        'key': 'status'
      }
    ]
  },
  'policyTemplates': {
    'resourceKey': 'policy-templates',
    'title': 'table.header.policy.template',
    'defaultSortField': 'objectDefinition.metadata.name',
    'normalizedKey': 'metadata.name',
    'tableKeys': [
      {
        'msgKey': 'table.header.object.template.name',
        'resourceKey': 'objectDefinition.metadata.name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.object.template.apiVersion',
        'resourceKey': 'objectDefinition.apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'table.header.object.template.kind',
        'resourceKey': 'objectDefinition.kind',
        'key': 'kind'
      },
      {
        'msgKey': 'table.header.object.template.lastTransition',
        'resourceKey': 'status.conditions[0].lastTransitionTime',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.object.template.status',
        'resourceKey': 'status.Compliant',
        'key': 'status'
      }
    ]
  },
  'complianceStatus': {
    'resourceKey': 'complianceStatus',
    'title': 'table.header.compliance.compliant',
    'defaultSortField': 'clusterNamespace',
    'normalizedKey': 'clusterNamespace',
    'tableKeys': [
      {
        'msgKey': 'table.header.cluster.namespace',
        'resourceKey': 'clusterNamespace',
        'key': 'clusterNamespace'
      },
      {
        'msgKey': 'table.header.compliance.policy.status',
        'resourceKey': 'localCompliantStatus',
        'key': 'localCompliantStatus'
      },
      {
        'msgKey': 'table.header.compliance.policy.valid',
        'resourceKey': 'localValidStatus',
        'key': 'localValidStatus'
      }
    ]
  },
  'tableKeys': [
    {
      'msgKey': 'table.header.policy.name',
      'resourceKey': 'metadata.name'
    },
    {
      'msgKey': 'table.header.namespace',
      'resourceKey': 'metadata.namespace'
    },
    {
      'msgKey': 'table.header.remediation',
      'resourceKey': 'remediation'
    },
    {
      'msgKey': 'table.header.cluster.violation',
      'resourceKey': 'clusterCompliant'
    },
    {
      'msgKey': 'table.header.controls',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/controls"]'
    },
    {
      'msgKey': 'table.header.standards',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/standards"]'
    },
    {
      'msgKey': 'table.header.categories',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/categories"]'
    }
  ],
  'tableActions': [
    'table.actions.edit',
    'table.actions.remove'
  ],
  'detailKeys': {
    'title': 'compliance.details',
    'headerRows': [
      'type',
      'detail'
    ],
    'rows': [
      {
        'cells': [
          {
            'resourceKey': 'description.title.name',
            'type': 'i18n'
          },
          {
            'resourceKey': 'metadata.name'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'metadata.namespace'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'type': 'i18n'
          },
          {
            'resourceKey': 'raw.spec.remediationAction'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.exclude_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'raw.spec.namespaces.exclude'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.include_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'raw.spec.namespaces.include'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'table.header.cluster.violation',
            'type': 'i18n'
          },
          {
            'resourceKey': 'clusterCompliant'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.categories',
            'type': 'i18n'
          },
          {
            'resourceKey': 'annotations.categories'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.controls',
            'type': 'i18n'
          },
          {
            'resourceKey': 'annotations.controls'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.standards',
            'type': 'i18n'
          },
          {
            'resourceKey': 'annotations.standards'
          }
        ]
      }
    ]
  },
  'policyTemplatesKeys': {
    'title': 'policy.template.details',
    'headerRows': [
      'description.title.name',
      'description.title.last.transition',
      'description.title.templateType'
    ],
    'rows': [
      {
        'cells': [
          {
            'resourceKey': 'name'
          },
          {
            'resourceKey': 'lastTransition'
          },
          {
            'resourceKey': 'templateType'
          }
        ]
      }
    ]
  },
  'policyRules': {
    'title': 'table.header.rules',
    'resourceKey': 'rules',
    'defaultSortField': 'ruleUID',
    'normalizedKey': 'ruleUID',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'ruleUID',
        'key': 'ruleUID'
      },
      {
        'msgKey': 'table.header.templateType',
        'resourceKey': 'templateType',
        'key': 'templateType'
      },
      {
        'msgKey': 'table.header.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'table.header.apiGroups',
        'resourceKey': 'apiGroups',
        'key': 'apiGroups'
      },
      {
        'msgKey': 'table.header.ruleVerbs',
        'resourceKey': 'verbs',
        'key': 'verbs'
      },
      {
        'msgKey': 'table.header.resources',
        'resourceKey': 'resources',
        'key': 'resources'
      }
    ]
  },
  'policyViolations': {
    'resourceKey': 'violations',
    'title': 'table.header.violation',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.selector',
        'resourceKey': 'selector',
        'key': 'selector'
      },
      {
        'msgKey': 'table.header.cluster',
        'resourceKey': 'cluster',
        'key': 'cluster'
      },
      {
        'msgKey': 'table.header.message',
        'resourceKey': 'message',
        'key': 'message'
      },
      {
        'msgKey': 'table.header.reason',
        'resourceKey': 'reason',
        'key': 'reason'
      },
      {
        'msgKey': 'table.header.status',
        'resourceKey': 'status',
        'key': 'status'
      }
    ]
  },
  'policyInfoKeys': {
    'title': 'policy.details',
    'headerRows': [
      'type',
      'detail'
    ],
    'rows': [
      {
        'cells': [
          {
            'resourceKey': 'description.title.name',
            'type': 'i18n'
          },
          {
            'resourceKey': 'name'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'table.header.message',
            'type': 'i18n'
          },
          {
            'resourceKey': 'message'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.status',
            'type': 'i18n'
          },
          {
            'resourceKey': 'status'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'type': 'i18n'
          },
          {
            'resourceKey': 'enforcement'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.exclude_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'detail.exclude_namespace'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.include_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'detail.include_namespace'
          }
        ]
      }
    ]
  },
  'policyDetailKeys': {
    'title': 'policy.details',
    'headerRows': [
      'type',
      'detail'
    ],
    'rows': [
      {
        'cells': [
          {
            'resourceKey': 'description.title.name',
            'type': 'i18n'
          },
          {
            'resourceKey': 'metadata.name'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'table.header.cluster',
            'type': 'i18n'
          },
          {
            'resourceKey': 'cluster'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'table.header.message',
            'type': 'i18n'
          },
          {
            'resourceKey': 'message'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.status',
            'type': 'i18n'
          },
          {
            'resourceKey': 'status'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'type': 'i18n'
          },
          {
            'resourceKey': 'enforcement'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.exclude_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'detail.exclude_namespace'
          }
        ]
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.include_namespace',
            'type': 'i18n'
          },
          {
            'resourceKey': 'detail.include_namespace'
          }
        ]
      }
    ]
  },
  'policyRoleTemplates': {
    'title': 'table.header.roleTemplates',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'resourceKey': 'roleTemplates',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'description.title.api.version',
        'resourceKey': 'apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'description.title.last.transition',
        'resourceKey': 'lastTransition',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.compliant',
        'resourceKey': 'compliant',
        'key': 'compliant'
      }
    ]
  },
  'policyRoleBindingTemplates': {
    'title': 'table.header.roleBindingTemplates',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'resourceKey': 'roleBindingTemplates',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'description.title.api.version',
        'resourceKey': 'apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'description.title.last.transition',
        'resourceKey': 'lastTransition',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.compliant',
        'resourceKey': 'compliant',
        'key': 'compliant'
      }
    ]
  },
  'policyObjectTemplates': {
    'title': 'table.header.objectTemplates',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'resourceKey': 'objectTemplates',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'table.header.complianceType',
        'resourceKey': 'complianceType',
        'key': 'complianceType'
      },
      {
        'msgKey': 'description.title.api.version',
        'resourceKey': 'apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'table.header.kind',
        'resourceKey': 'kind',
        'key': 'kind'
      },
      {
        'msgKey': 'description.title.last.transition',
        'resourceKey': 'lastTransition',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.compliant',
        'resourceKey': 'compliant',
        'key': 'compliant'
      }
    ]
  },
  'policyPolicyTemplates': {
    'title': 'table.header.policyTemplates',
    'defaultSortField': 'name',
    'normalizedKey': 'name',
    'resourceKey': 'policyTemplates',
    'tableKeys': [
      {
        'msgKey': 'table.header.name',
        'resourceKey': 'name',
        'key': 'name'
      },
      {
        'msgKey': 'description.title.api.version',
        'resourceKey': 'apiVersion',
        'key': 'apiVersion'
      },
      {
        'msgKey': 'table.header.kind',
        'resourceKey': 'kind',
        'key': 'kind'
      },
      {
        'msgKey': 'description.title.last.transition',
        'resourceKey': 'lastTransition',
        'key': 'lastTransition'
      },
      {
        'msgKey': 'table.header.compliant',
        'resourceKey': 'compliant',
        'key': 'compliant'
      }
    ]
  }
}

export const items = [
  {
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'IAM',
          'policy.open-cluster-management.io/standards': 'FISMA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-10-02T20:49:21Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation': 7,
        'name': '1570049336008-policy-test',
        'namespace': 'mcm',
        'resourceVersion': '6305204',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
        'uid': '1c260624-e556-11e9-8895-005056a061f1'
      },
      'spec': {
        'complianceType': 'musthave',
        'namespaces': {
          'exclude': [
            'kube-*'
          ],
          'include': [
            'default'
          ]
        },
        'object-templates': [
          {
            'complianceType': 'musthave',
            'objectDefinition': {
              'apiVersion': 'v1',
              'kind': 'Namespace',
              'metadata': {
                'name': 'prod'
              }
            },
            'status': {
              'Validity': {}
            }
          }
        ],
        'remediationAction': 'inform'
      },
      'status': {
        'placementBindings': [
          'binding-1570049336008-policy-test'
        ],
        'placementPolicies': [
          'placement-1570049336008-policy-test'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              '1570049336008-policy-test': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'Compliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              '1570049336008-policy-test': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'clusterhub',
            'compliant': 'Compliant'
          }
        }
      }
    },
    'metadata': {
      'creationTimestamp': '2019-10-02T20:49:21Z',
      'name': '1570049336008-policy-test',
      'namespace': 'mcm',
      'resourceVersion': '6305204',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
      'uid': '1c260624-e556-11e9-8895-005056a061f1',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'IAM',
        'policy.open-cluster-management.io/standards': 'FISMA',
        'seed-generation': '1'
      },
      '__typename': 'Metadata'
    },
    'annotations': {
      'categories': 'SystemAndCommunicationsProtections',
      'controls': 'IAM',
      'standards': 'FISMA'
    },
    'placementPolicies': [
      {
        'metadata': {
          'annotations': {
            'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ='
          },
          'name': 'placement-1570049336008-policy-test',
          'namespace': 'mcm',
          'creationTimestamp': '2019-10-02T20:49:21Z',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-1570049336008-policy-test',
          '__typename': 'Metadata'
        },
        'clusterLabels': {
          'matchExpressions': [
            {
              'key': 'environment',
              'operator': 'In',
              'values': [
                'Dev'
              ]
            }
          ]
        },
        'status': {
          'decisions': [
            {
              'clusterName': 'clusterhub',
              'clusterNamespace': 'clusterhub'
            },
            {
              'clusterName': 'cluster1',
              'clusterNamespace': 'cluster1'
            }
          ]
        },
        'raw': {
          'apiVersion': 'mcm.ibm.com/v1alpha1',
          'kind': 'PlacementPolicy',
          'metadata': {
            'name': 'placement-1570049336008-policy-test',
            'namespace': 'mcm',
            'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-1570049336008-policy-test',
            'uid': '1c265de1-e556-11e9-a436-4a723cab1df3',
            'resourceVersion': '76788',
            'creationTimestamp': '2019-10-02T20:49:21Z',
            'annotations': {
              'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
              'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ='
            }
          },
          'spec': {
            'resourceSelector': {},
            'clusterLabels': {
              'matchExpressions': [
                {
                  'key': 'environment',
                  'operator': 'In',
                  'values': [
                    'Dev'
                  ]
                }
              ]
            },
            'resourceHint': {}
          },
          'status': {
            'decisions': [
              {
                'clusterName': 'clusterhub',
                'clusterNamespace': 'clusterhub'
              },
              {
                'clusterName': 'cluster1',
                'clusterNamespace': 'cluster1'
              }
            ]
          }
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-1570049336008-policy-test',
          'namespace': 'mcm',
          'creationTimestamp': '2019-10-02T20:49:21Z',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-1570049336008-policy-test',
          '__typename': 'Metadata'
        },
        'placementRef': {
          'name': 'placement-1570049336008-policy-test',
          'kind': 'PlacementPolicy',
          '__typename': 'Subject'
        },
        'subjects': [
          {
            'name': '1570049336008-policy-test',
            'apiGroup': 'policy.open-cluster-management.io',
            'kind': 'Policy',
            '__typename': 'Subject'
          }
        ],
        'raw': {
          'apiVersion': 'mcm.ibm.com/v1alpha1',
          'kind': 'PlacementBinding',
          'metadata': {
            'name': 'binding-1570049336008-policy-test',
            'namespace': 'mcm',
            'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-1570049336008-policy-test',
            'uid': '1c2670fc-e556-11e9-a436-4a723cab1df3',
            'resourceVersion': '76790',
            'creationTimestamp': '2019-10-02T20:49:21Z',
            'labels': {
              'name': 'binding-1570049336008-policy-test',
              'placementPolicy': 'placement-1570049336008-policy-test'
            },
            'annotations': {
              'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
              'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
              'seed-generation': '1'
            },
            'finalizers': [
              'propagator.finalizer.mcm.ibm.com'
            ]
          },
          'subjects': [
            {
              'kind': 'Policy',
              'apiGroup': 'policy.open-cluster-management.io',
              'name': '1570049336008-policy-test'
            }
          ],
          'placementRef': {
            'name': 'placement-1570049336008-policy-test',
            'kind': 'PlacementPolicy',
            'apiGroup': 'mcm.ibm.com'
          }
        },
        '__typename': 'PlacementBinding'
      }
    ],
    'complianceStatus': [
      {
        'clusterNamespace': 'cluster1',
        'localCompliantStatus': '1/1',
        'localValidStatus': '1/1',
        'compliant': 'Compliant',
        '__typename': 'CompliantStatus'
      },
      {
        'clusterNamespace': 'clusterhub',
        'localCompliantStatus': '1/1',
        'localValidStatus': '1/1',
        'compliant': 'Compliant',
        '__typename': 'CompliantStatus'
      }
    ],
    'compliancePolicy': [
      {
        'name': '1570049336008-policy-test',
        'status': 'Compliant',
        'complianceName': '1570049336008-policy-test',
        'complianceNamespace': 'mcm',
        'complianceSelfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
        'roleTemplates': [],
        'roleBindingTemplates': [],
        'objectTemplates': [
          {
            'apiVersion': 'v1',
            'complianceType': 'musthave',
            'compliant': '',
            'lastTransition': '',
            'name': 'prod',
            'kind': 'Namespace',
            'validity': '[object Object]',
            'raw': {
              'complianceType': 'musthave',
              'objectDefinition': {
                'apiVersion': 'v1',
                'kind': 'Namespace',
                'metadata': {
                  'name': 'prod'
                }
              },
              'status': {
                'Validity': {}
              },
              'templateType': 'object-templates'
            },
            '__typename': 'PolicyTemplate'
          }
        ],
        'policyTemplates': [],
        'detail': {
          'exclude_namespace': [
            'kube-*'
          ],
          'include_namespace': [
            'default'
          ]
        },
        'raw': {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'kind': 'Policy',
          'metadata': {
            'annotations': {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
              'policy.open-cluster-management.io/controls': 'IAM',
              'policy.open-cluster-management.io/standards': 'FISMA',
              'seed-generation': '1'
            },
            'creationTimestamp': '2019-10-02T20:49:21Z',
            'finalizers': [
              'finalizer.policies.ibm.com',
              'propagator.finalizer.mcm.ibm.com'
            ],
            'generation': 7,
            'name': '1570049336008-policy-test',
            'namespace': 'mcm',
            'resourceVersion': '6305204',
            'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
            'uid': '1c260624-e556-11e9-8895-005056a061f1'
          },
          'spec': {
            'complianceType': 'musthave',
            'namespaces': {
              'exclude': [
                'kube-*'
              ],
              'include': [
                'default'
              ]
            },
            'object-templates': [
              {
                'complianceType': 'musthave',
                'objectDefinition': {
                  'apiVersion': 'v1',
                  'kind': 'Namespace',
                  'metadata': {
                    'name': 'prod'
                  }
                },
                'status': {
                  'Validity': {}
                }
              }
            ],
            'remediationAction': 'inform'
          },
          'status': {
            'placementBindings': [
              'binding-1570049336008-policy-test'
            ],
            'placementPolicies': [
              'placement-1570049336008-policy-test'
            ],
            'status': {
              'cluster1': {
                'aggregatePoliciesStatus': {
                  '1570049336008-policy-test': {
                    'compliant': 'Compliant'
                  }
                },
                'clustername': 'cluster1',
                'compliant': 'Compliant'
              },
              'clusterhub': {
                'aggregatePoliciesStatus': {
                  '1570049336008-policy-test': {
                    'compliant': 'Compliant'
                  }
                },
                'clustername': 'clusterhub',
                'compliant': 'Compliant'
              }
            }
          },
          'raw': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'Policy',
            'metadata': {
              'annotations': {
                'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
                'policy.open-cluster-management.io/controls': 'IAM',
                'policy.open-cluster-management.io/standards': 'FISMA',
                'seed-generation': '1'
              },
              'creationTimestamp': '2019-10-02T20:49:21Z',
              'finalizers': [
                'finalizer.policies.ibm.com',
                'propagator.finalizer.mcm.ibm.com'
              ],
              'generation': 7,
              'name': '1570049336008-policy-test',
              'namespace': 'mcm',
              'resourceVersion': '6305204',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
              'uid': '1c260624-e556-11e9-8895-005056a061f1'
            },
            'spec': {
              'complianceType': 'musthave',
              'namespaces': {
                'exclude': [
                  'kube-*'
                ],
                'include': [
                  'default'
                ]
              },
              'object-templates': [
                {
                  'complianceType': 'musthave',
                  'objectDefinition': {
                    'apiVersion': 'v1',
                    'kind': 'Namespace',
                    'metadata': {
                      'name': 'prod'
                    }
                  },
                  'status': {
                    'Validity': {}
                  }
                }
              ],
              'remediationAction': 'inform'
            },
            'status': {
              'placementBindings': [
                'binding-1570049336008-policy-test'
              ],
              'placementPolicies': [
                'placement-1570049336008-policy-test'
              ],
              'status': {
                'cluster1': {
                  'aggregatePoliciesStatus': {
                    '1570049336008-policy-test': {
                      'compliant': 'Compliant'
                    }
                  },
                  'clustername': 'cluster1',
                  'compliant': 'Compliant'
                },
                'clusterhub': {
                  'aggregatePoliciesStatus': {
                    '1570049336008-policy-test': {
                      'compliant': 'Compliant'
                    }
                  },
                  'clustername': 'clusterhub',
                  'compliant': 'Compliant'
                }
              }
            }
          },
          'name': '1570049336008-policy-test',
          'namespace': 'mcm',
          'remediation': 'inform',
          'clusters': [
            'cluster1',
            'clusterhub'
          ]
        },
        '__typename': 'CompliancePolicyDetail'
      }
    ],
    'compliancePolicies': [
      {
        'name': '1570049336008-policy-test',
        'clusterCompliant': [
          'cluster1',
          'clusterhub'
        ],
        'clusterNotCompliant': [],
        'complianceName': '1570049336008-policy-test',
        'complianceNamespace': 'mcm',
        'policies': [
          {
            'name': '1570049336008-policy-test',
            'cluster': 'cluster1',
            'compliant': 'Compliant',
            'complianceName': '1570049336008-policy-test',
            'complianceNamespace': 'mcm',
            'valid': 'unknown',
            'enforcement': 'unknown',
            'status': 'Compliant',
            'raw': null,
            'metadata': {
              'annotations': {
                'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
                'policy.open-cluster-management.io/controls': 'IAM',
                'policy.open-cluster-management.io/standards': 'FISMA',
                'seed-generation': '1'
              },
              'creationTimestamp': '2019-10-02T20:49:21Z',
              'name': '1570049336008-policy-test',
              'resourceVersion': '6305204',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
              'uid': '1c260624-e556-11e9-8895-005056a061f1',
              '__typename': 'Metadata'
            },
            'roleTemplates': [],
            'roleBindingTemplates': [],
            'objectTemplates': [],
            'rules': [],
            'violations': [],
            '__typename': 'CompliancePolicy'
          },
          {
            'name': '1570049336008-policy-test',
            'cluster': 'clusterhub',
            'compliant': 'Compliant',
            'complianceName': '1570049336008-policy-test',
            'complianceNamespace': 'mcm',
            'valid': 'unknown',
            'enforcement': 'unknown',
            'status': 'Compliant',
            'raw': null,
            'metadata': {
              'annotations': {
                'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
                'policy.open-cluster-management.io/controls': 'IAM',
                'policy.open-cluster-management.io/standards': 'FISMA',
                'seed-generation': '1'
              },
              'creationTimestamp': '2019-10-02T20:49:21Z',
              'name': '1570049336008-policy-test',
              'resourceVersion': '6305204',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1570049336008-policy-test',
              'uid': '1c260624-e556-11e9-8895-005056a061f1',
              '__typename': 'Metadata'
            },
            'roleTemplates': [],
            'roleBindingTemplates': [],
            'objectTemplates': [],
            'rules': [],
            'violations': [],
            '__typename': 'CompliancePolicy'
          }
        ],
        '__typename': 'CompliancePolicies'
      }
    ],
    'policyCompliant': '0/2',
    'clusterCompliant': '0/2',
    'clusters': [
      'cluster1',
      'clusterhub'
    ],
    '__typename': 'Compliance'
  }
]

export const resourceType = {
  'name': 'HCMCompliance',
  'query': 'ALL_POLICIES'
}

export const findingsData = [
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-b35230ab-fa76-11e9-bf6c-005056a0b88e',
    'shortDescription': 'Policy violation finding',
    'longDescription': 'The Multicloud Manager Policy violation caused a security finding to be created',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'NonCompliant; 2 clusterrole admin users violations detected in namespace `cluster-wide` ; 0 rolebindings violations detected in namespace `default`, violated rolebinding : []; 0 rolebindings violations detected in namespace `kube-public`, violated rolebinding : []',
    'updateTime': '2019-10-30T17:19:02.276706Z',
    'finding': {
      'severity': 'MEDIUM',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the policy violation using the Security findings dashboard.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'mcm-policy-adapter',
      'title': 'Security Advisor Multicloud Manager Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-iampolicy',
      'resourceId': 'b35230ab-fa76-11e9-bf6c-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-b35230ab-fa76-11e9-bf6c-005056a0b88e',
    'shortDescription': 'Policy violation finding',
    'longDescription': 'The Multicloud Manager Policy violation caused a security finding to be created',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'NonCompliant; 1 clusterrole admin users violations detected in namespace `cluster-wide` ; 0 rolebindings violations detected in namespace `default`, violated rolebinding : []; 0 rolebindings violations detected in namespace `kube-public`, violated rolebinding : []',
    'updateTime': '2019-10-30T17:18:57.777080Z',
    'finding': {
      'severity': 'MEDIUM',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the policy violation using the Security findings dashboard.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'mcm-policy-adapter',
      'title': 'Security Advisor Multicloud Manager Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-iampolicy',
      'resourceId': 'b35230ab-fa76-11e9-bf6c-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST-CSF'
      ],
      'securityCategories': [
        'IdentityManagementAndAccessControl'
      ],
      'securityControl': 'Iam'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-0efa8d02-f9ee-11e9-bf6c-005056a0b88e',
    'shortDescription': 'Policy violation finding',
    'longDescription': 'The Multicloud Manager Policy violation caused a security finding to be created',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'pods `nginx-pod` is missing',
    'updateTime': '2019-10-30T17:18:54.164334Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the policy violation using the Security findings dashboard.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'mcm-policy-adapter',
      'title': 'Security Advisor Multicloud Manager Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-pod',
      'resourceId': '0efa8d02-f9ee-11e9-bf6c-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST-CSF'
      ],
      'securityCategories': [
        'SecurityContinuousMonitoring'
      ],
      'securityControl': 'Other'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-0efa8d02-f9ee-11e9-bf6c-005056a0b88e',
    'shortDescription': 'Policy violation finding',
    'longDescription': 'The Multicloud Manager Policy violation caused a security finding to be created',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'pods `nginx-pod` is missing',
    'updateTime': '2019-10-30T17:18:50.849184Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the policy violation using the Security findings dashboard.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'mcm-policy-adapter',
      'title': 'Security Advisor Multicloud Manager Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-pod',
      'resourceId': '0efa8d02-f9ee-11e9-bf6c-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': null,
    '__typename': 'Occurrence'
  },
]
