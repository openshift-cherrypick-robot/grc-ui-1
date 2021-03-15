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


export const hcmPoliciesPolicyItem = {
  'metadata': {
    'name': 'policy1',
    'namespace': 'mcm',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy1',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity, RBAC',
      'policy.open-cluster-management.io/controls': 'MutationAdvisor',
      'policy.open-cluster-management.io/standards': 'NIST',
      'seed-generation': '2'
    },
    'resourceVersion': '5456660',
    '__typename': 'Metadata'
  },
  'name': 'policy1',
  'namespace': 'mcm',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity, RBAC',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'NIST',
        'seed-generation': '2'
      },
      'creationTimestamp': '2019-07-18T13:27:59Z',
      'finalizers': [
        'propagator.finalizer.mcm.ibm.com'
      ],
      'generation': 68,
      'name': 'policy1',
      'namespace': 'mcm',
      'resourceVersion': '5456660',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy1',
      'uid': 'dc761733-a95f-11e9-8e7d-005056a0b88e'
    },
    'spec': {
      'complianceType': 'musthave',
      'namespaces': {
        'exclude': [
          'kube*'
        ],
        'include': [
          'default'
        ]
      },
      'object-templates': [
        {
          'complianceType': 'musthave',
          'objectDefinition': {
            'apiVersion': 'rbac.authorization.k8s.io/v1',
            'kind': 'RoleBinding',
            'metadata': {
              'name': 'operate-pods-rolebinding',
              'namespace': 'default'
            },
            'roleRef': {
              'apiGroup': 'rbac.authorization.k8s.io',
              'kind': 'Role',
              'name': 'operator'
            },
            'subjects': [
              {
                'apiGroup': 'rbac.authorization.k8s.io',
                'kind': 'User',
                'name': 'admin'
              }
            ]
          },
          'status': {
            'Validity': {}
          }
        },
        {
          'complianceType': 'musthave',
          'objectDefinition': {
            'apiVersion': 'policy/v1beta1',
            'kind': 'PodSecurityPolicy',
            'metadata': {
              'annotations': {
                'seccomp.security.alpha.kubernetes.io/allowedProfileNames': '*'
              },
              'name': 'restricted-mcm'
            },
            'spec': {
              'allowPrivilegeEscalation': false,
              'allowedCapabilities': [
                '*'
              ],
              'fsGroup': {
                'rule': 'RunAsAny'
              },
              'hostIPC': false,
              'hostNetwork': true,
              'hostPID': false,
              'hostPorts': [
                {
                  'max': 65535,
                  'min': 1000
                }
              ],
              'privileged': false,
              'runAsUser': {
                'rule': 'RunAsAny'
              },
              'seLinux': {
                'rule': 'RunAsAny'
              },
              'supplementalGroups': {
                'rule': 'RunAsAny'
              },
              'volumes': [
                '*'
              ]
            }
          },
          'status': {
            'Validity': {}
          }
        },
        {
          'complianceType': 'musthave',
          'objectDefinition': {
            'apiVersion': 'networking.k8s.io/v1',
            'kind': 'NetworkPolicy',
            'metadata': {
              'name': 'deny-from-other-namespaces',
              'namespace': 'default'
            },
            'spec': {
              'ingress': [
                {
                  'from': [
                    {
                      'podSelector': {}
                    }
                  ]
                }
              ],
              'podSelector': {
                'matchLabels': null
              }
            }
          },
          'status': {
            'Validity': {}
          }
        },
        {
          'complianceType': 'musthave',
          'objectDefinition': {
            'apiVersion': 'v1',
            'kind': 'LimitRange',
            'metadata': {
              'name': 'mem-limit-range'
            },
            'spec': {
              'limits': [
                {
                  'default': {
                    'memory': '512Mi'
                  },
                  'defaultRequest': {
                    'memory': '256Mi'
                  },
                  'type': 'Container'
                }
              ]
            }
          },
          'status': {
            'Validity': {}
          }
        }
      ],
      'remediationAction': 'inform',
      'role-templates': [
        {
          'apiVersion': 'roletemplate.mcm.ibm.com/v1alpha1',
          'complianceType': 'musthave',
          'metadata': {
            'creationTimestamp': null,
            'name': 'operator-role'
          },
          'rules': [
            {
              'complianceType': 'mustnothave',
              'policyRule': {
                'apiGroups': [
                  'core'
                ],
                'resources': [
                  'secrets'
                ],
                'verbs': [
                  'get',
                  'list',
                  'watch',
                  'delete',
                  'create',
                  'update',
                  'patch'
                ]
              }
            },
            {
              'complianceType': 'musthave',
              'policyRule': {
                'apiGroups': [
                  'core'
                ],
                'resources': [
                  'pods'
                ],
                'verbs': [
                  'get',
                  'list',
                  'watch'
                ]
              }
            }
          ],
          'selector': {
            'matchLabels': {
              'dev': 'true'
            }
          },
          'status': {
            'Validity': {}
          }
        }
      ]
    },
    'status': {
      'placementBindings': [
        'binding-policy1'
      ],
      'placementPolicies': [
        'placement-policy1'
      ],
      'status': {
        'cluster1': {
          'aggregatePoliciesStatus': {
            'policy1': {
              'compliant': 'Compliant'
            }
          },
          'clustername': 'cluster1',
          'compliant': 'Compliant'
        },
        'clusterhub': {
          'aggregatePoliciesStatus': {
            'policy1': {
              'compliant': 'NonCompliant'
            }
          },
          'clustername': 'clusterhub',
          'compliant': 'NonCompliant'
        }
      }
    }
  },
  'remediation': 'inform',
  'policyCompliant': '1/2',
  'clusterCompliant': '1/2',
  'placementPolicies': [
    {
      'metadata': {
        'name': 'placement-policy1',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-policy1',
        '__typename': 'Metadata'
      },
      '__typename': 'PlacementPolicy'
    }
  ],
  'placementBindings': [
    {
      'metadata': {
        'name': 'binding-policy1',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-policy1',
        '__typename': 'Metadata'
      },
      '__typename': 'PlacementBinding'
    }
  ],
  '__typename': 'Compliance',
  'subItems': [
    {
      'name': 'policy.pb',
      'items': [
        'binding-policy1'
      ]
    },
    {
      'name': 'policy.pp',
      'items': [
        'placement-policy1'
      ]
    }
  ]
}

export const hcmPoliciesPolicyCluster = {
  'param': 'status.consoleURL',
  'valid': {'status': {'consoleURL': 'https://console'}},
  'empty': {'status': {'consoleURL': ''}},
  'null': {'status': null}
}
