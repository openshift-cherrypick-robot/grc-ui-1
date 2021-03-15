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


export const user1Access = [
  {
    'namespace': 'calamari',
    'rules': {
      '*/*': [
        '*'
      ],
      'apps.open-cluster-management.io/channels': [
        '*',
        'create',
        'update',
        'patch',
        'delete',
        'get',
        'list',
        'watch',
        'deletecollection'
      ],
      'apps.open-cluster-management.io/deployables': [
        '*',
        'create',
        'update',
        'patch',
        'delete',
        'get',
        'list',
        'watch',
        'deletecollection'
      ],
      'apps.open-cluster-management.io/helmreleases': [
        'create',
        'update',
        'patch',
        'delete',
        'get',
        'list',
        'watch',
        '*'
      ],
      'apps.open-cluster-management.io/deployables/status': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection'
      ],
      'apps.open-cluster-management.io/placementrules': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection',
        '*'
      ],
      'apps.open-cluster-management.io/placementrules/status': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection'
      ],
      'apps.open-cluster-management.io/channels/status': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection'
      ],
      'apps.open-cluster-management.io/subscriptions': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection',
        '*'
      ],
      'apps.open-cluster-management.io/subscriptions/status': [
        'get',
        'list',
        'watch',
        'update',
        'patch',
        'create',
        'delete',
        'deletecollection'
      ],
      'policy.open-cluster-management.io/policies': [
        'get',
        'list',
        'watch',
        'create',
        'update',
        'delete',
        'deletecollection',
        'patch'
      ],
      'policy.open-cluster-management.io/policies/status': [
        'get',
        'list',
        'watch',
        'create',
        'update',
        'delete',
        'deletecollection',
        'patch'
      ],
      'policy.open-cluster-management.io/placementbindings': [
        'get',
        'list',
        'watch',
        'create',
        'update',
        'delete',
        'deletecollection',
        'patch'
      ]
    },
  },
  {
    'namespace': 'default',
    'rules': {
      'policy.open-cluster-management.io/policies': [
        'get',
        'list',
        'watch',
        'update',
        'patch'
      ],
      'policy.open-cluster-management.io/policies/status': [
        'get',
        'list',
        'watch',
        'update',
        'patch'
      ],
      'policy.open-cluster-management.io/placementbindings': [
        'get',
        'list',
        'watch',
        'update',
        'patch'
      ]
    },
  },
  {
    'namespace': 'openshift-operators',
    'rules': {
      'policy.open-cluster-management.io/policies': [
        'get',
        'list',
        'watch',
      ],
      'policy.open-cluster-management.io/policies/status': [
        'get',
        'list',
        'watch',
      ],
      'policy.open-cluster-management.io/placementbindings': [
        'get',
        'list',
        'watch',
      ]
    },
  }
]

export const policies = [{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-policy-test',
    'namespace': 'e2e-rbac-test-1',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-policy-test',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology, PR.IP Information Protection Processes and Procedures, PR.DS Data Security',
      'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality, PR.IP-1 Baseline Configuration, PR.DS-2 Data-in-transit',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13096493'
  },
  'name': 'my-policy-test',
  'namespace': 'e2e-rbac-test-1',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology, PR.IP Information Protection Processes and Procedures, PR.DS Data Security',
        'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality, PR.IP-1 Baseline Configuration, PR.DS-2 Data-in-transit',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-20T21:38:16Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-20T21:38:16Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-20T21:38:50Z'
        }
      ],
      'name': 'my-policy-test',
      'namespace': 'e2e-rbac-test-1',
      'resourceVersion': '13096493',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-policy-test',
      'uid': '2ef56c99-355a-4162-bc7c-9ce07677b400'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'my-policy-test-sample-nginx-pod'
            },
            'spec': {
              'namespaceSelector': {
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
                    'kind': 'Pod',
                    'metadata': {
                      'name': 'sample-nginx-pod'
                    },
                    'spec': {
                      'containers': [
                        {
                          'image': 'nginx:1.7.9',
                          'name': 'nginx',
                          'ports': [
                            {
                              'containerPort': 80
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'low'
            }
          }
        },
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'CertificatePolicy',
            'metadata': {
              'name': 'my-policy-test-example'
            },
            'spec': {
              'minimumDuration': '300h',
              'namespaceSelector': {
                'exclude': [
                  'kube-*'
                ],
                'include': [
                  'default'
                ]
              },
              'remediationAction': 'inform',
              'severity': 'low'
            }
          }
        }
      ],
      'remediationAction': 'enforce'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-policy-test',
          'placementRule': 'placement-my-policy-test'
        }
      ],
      'status': [
        {
          'clustername': 'local-cluster',
          'clusternamespace': 'local-cluster',
          'compliant': 'Compliant'
        },
        {
          'clustername': 'managed01',
          'clusternamespace': 'managed01',
          'compliant': 'Compliant'
        }
      ]
    }
  },
  'remediation': 'enforce',
  'policyCompliant': '0/0',
  'clusterCompliant': '0/2/0',
  'clusterNS': {
    'managed01': 'managed01',
    'local-cluster': 'local-cluster'
  },
  'clusterConsoleURL': {
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com',
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-policy-test',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementrules/placement-my-policy-test'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-policy-test',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementbindings/binding-my-policy-test'
      }
    }
  ]
},
{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-pod',
    'namespace': 'e2e-rbac-test-1',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-pod',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology',
      'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13096967'
  },
  'name': 'my-test-policy-pod',
  'namespace': 'e2e-rbac-test-1',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology',
        'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-20T21:39:11Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-20T21:39:11Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-20T21:39:28Z'
        }
      ],
      'name': 'my-test-policy-pod',
      'namespace': 'e2e-rbac-test-1',
      'resourceVersion': '13096967',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-pod',
      'uid': 'd2e23078-5701-4df1-9d58-56a8f6b40777'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'my-test-policy-pod-sample-nginx-pod'
            },
            'spec': {
              'namespaceSelector': {
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
                    'kind': 'Pod',
                    'metadata': {
                      'name': 'sample-nginx-pod'
                    },
                    'spec': {
                      'containers': [
                        {
                          'image': 'nginx:1.7.9',
                          'name': 'nginx',
                          'ports': [
                            {
                              'containerPort': 80
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'low'
            }
          }
        }
      ],
      'remediationAction': 'inform'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-pod',
          'placementRule': 'placement-my-test-policy-pod'
        }
      ],
      'status': [
        {
          'clustername': 'managed01',
          'clusternamespace': 'managed01',
          'compliant': 'Compliant'
        }
      ]
    }
  },
  'remediation': 'inform',
  'policyCompliant': '0/0',
  'clusterCompliant': '0/1/0',
  'clusterNS': {
    'managed01': 'managed01',
    'local-cluster': 'local-cluster'
  },
  'clusterConsoleURL': {
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com',
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-test-policy-pod',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementrules/placement-my-test-policy-pod'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-pod',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementbindings/binding-my-test-policy-pod'
      }
    }
  ]
},
{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-cert',
    'namespace': 'e2e-rbac-test-1',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-cert',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
      'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13097316'
  },
  'name': 'my-test-policy-cert',
  'namespace': 'e2e-rbac-test-1',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
        'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-20T21:39:41Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-20T21:39:41Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-20T21:39:50Z'
        }
      ],
      'name': 'my-test-policy-cert',
      'namespace': 'e2e-rbac-test-1',
      'resourceVersion': '13097316',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-cert',
      'uid': '300dfae4-0977-4339-857d-91e48452a5e6'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'CertificatePolicy',
            'metadata': {
              'name': 'my-test-policy-cert-example'
            },
            'spec': {
              'minimumDuration': '300h',
              'namespaceSelector': {
                'exclude': [
                  'kube-*'
                ],
                'include': [
                  'default'
                ]
              },
              'remediationAction': 'inform',
              'severity': 'low'
            }
          }
        }
      ],
      'remediationAction': 'enforce'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-cert',
          'placementRule': 'placement-my-test-policy-cert'
        }
      ],
      'status': [
        {
          'clustername': 'local-cluster',
          'clusternamespace': 'local-cluster',
          'compliant': 'Compliant'
        },
        {
          'clustername': 'managed01',
          'clusternamespace': 'managed01',
          'compliant': 'Compliant'
        }
      ]
    }
  },
  'remediation': 'enforce',
  'policyCompliant': '0/0',
  'clusterCompliant': '0/2/0',
  'clusterNS': {
    'managed01': 'managed01',
    'local-cluster': 'local-cluster'
  },
  'clusterConsoleURL': {
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com',
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-test-policy-cert',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementrules/placement-my-test-policy-cert'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-cert',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementbindings/binding-my-test-policy-cert'
      }
    }
  ]
}]

export const policies2 = [{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-cert',
    'namespace': 'e2e-rbac-test-1',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-cert',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
      'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13097316'
  },
  'name': 'my-test-policy-cert',
  'namespace': 'e2e-rbac-test-1',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
        'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-20T21:39:41Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-20T21:39:41Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-20T21:39:50Z'
        }
      ],
      'name': 'my-test-policy-cert',
      'namespace': 'e2e-rbac-test-1',
      'resourceVersion': '13097316',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/policies/my-test-policy-cert',
      'uid': '300dfae4-0977-4339-857d-91e48452a5e6'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'CertificatePolicy',
            'metadata': {
              'name': 'my-test-policy-cert-example'
            },
            'spec': {
              'minimumDuration': '300h',
              'namespaceSelector': {
                'exclude': [
                  'kube-*'
                ],
                'include': [
                  'default'
                ]
              },
              'remediationAction': 'inform',
              'severity': 'low'
            }
          }
        }
      ],
      'remediationAction': 'enforce'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-cert',
          'placementRule': 'placement-my-test-policy-cert'
        }
      ],
      'status': [
        {
          'clustername': 'local-cluster',
          'clusternamespace': 'local-cluster',
          'compliant': 'Compliant'
        },
        {
          'clustername': 'managed01',
          'clusternamespace': 'managed01',
          'compliant': 'Compliant'
        }
      ]
    }
  },
  'remediation': 'enforce',
  'policyCompliant': '0/0',
  'clusterCompliant': '0/2/0',
  'clusterNS': {
    'managed01': 'managed01',
    'local-cluster': 'local-cluster'
  },
  'clusterConsoleURL': {
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com',
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-test-policy-cert',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementrules/placement-my-test-policy-cert'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-cert',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/e2e-rbac-test-1/placementbindings/binding-my-test-policy-cert'
      }
    }
  ]
}]

export const policies3 = [{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-etcdencryption',
    'namespace': 'default',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-etcdencryption',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
      'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-at-rest',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13955717'
  },
  'name': 'my-test-policy-etcdencryption',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.DS Data Security',
        'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-at-rest',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-21T16:28:54Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {}
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-21T16:28:54Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-21T16:28:54Z'
        }
      ],
      'name': 'my-test-policy-etcdencryption',
      'namespace': 'default',
      'resourceVersion': '13955717',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-etcdencryption',
      'uid': '1e463461-d1ab-45dd-94ed-0d1524874443'
    },
    'spec': {
      'disabled': true,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'my-test-policy-etcdencryption-example'
            },
            'spec': {
              'namespaceSelector': {
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
                    'apiVersion': 'config.openshift.io/v1',
                    'kind': 'APIServer',
                    'metadata': {
                      'name': 'cluster'
                    },
                    'spec': {
                      'encryption': {
                        'type': 'aescbc'
                      }
                    }
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'med'
            }
          }
        }
      ],
      'remediationAction': 'enforce'
    },
    'status': {}
  },
  'remediation': 'enforce',
  'policyCompliant': '0/0',
  'clusterCompliant': '-',
  'clusterNS': {
    'local-cluster': 'local-cluster',
    'managed01': 'managed01'
  },
  'clusterConsoleURL': {
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com',
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com'
  },
  'placementPolicies': [],
  'placementBindings': []
},
{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-imagemanifestvulnpolicy',
    'namespace': 'default',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-imagemanifestvulnpolicy',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'DE.CM Security Continuous Monitoring',
      'policy.open-cluster-management.io/controls': 'DE.CM-8 Vulnerability scans',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13954653'
  },
  'name': 'my-test-policy-imagemanifestvulnpolicy',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'DE.CM Security Continuous Monitoring',
        'policy.open-cluster-management.io/controls': 'DE.CM-8 Vulnerability scans',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-21T16:27:19Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-21T16:27:19Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-21T16:27:33Z'
        }
      ],
      'name': 'my-test-policy-imagemanifestvulnpolicy',
      'namespace': 'default',
      'resourceVersion': '13954653',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-imagemanifestvulnpolicy',
      'uid': '2575fc89-12da-43b2-a692-5a0d5ceae343'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'my-test-policy-imagemanifestvulnpolicy-example-sub'
            },
            'spec': {
              'object-templates': [
                {
                  'complianceType': 'musthave',
                  'objectDefinition': {
                    'apiVersion': 'operators.coreos.com/v1alpha1',
                    'kind': 'Subscription',
                    'metadata': {
                      'name': 'container-security-operator',
                      'namespace': 'openshift-operators'
                    },
                    'spec': {
                      'channel': 'quay-v3.3',
                      'installPlanApproval': 'Automatic',
                      'name': 'container-security-operator',
                      'source': 'redhat-operators',
                      'sourceNamespace': 'openshift-marketplace'
                    }
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'high'
            }
          }
        },
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'my-test-policy-imagemanifestvulnpolicy-example-imv'
            },
            'spec': {
              'namespaceSelector': {
                'exclude': [
                  'kube-*'
                ],
                'include': [
                  '*'
                ]
              },
              'object-templates': [
                {
                  'complianceType': 'mustnothave',
                  'objectDefinition': {
                    'apiVersion': 'secscan.quay.redhat.com/v1alpha1',
                    'kind': 'ImageManifestVuln'
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'high'
            }
          }
        }
      ],
      'remediationAction': 'inform'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-imagemanifestvulnpolicy',
          'placementRule': 'placement-my-test-policy-imagemanifestvulnpolicy'
        }
      ],
      'status': [
        {
          'clustername': 'local-cluster',
          'clusternamespace': 'local-cluster',
          'compliant': 'NonCompliant'
        },
        {
          'clustername': 'managed01',
          'clusternamespace': 'managed01',
          'compliant': 'NonCompliant'
        }
      ]
    }
  },
  'remediation': 'inform',
  'policyCompliant': '0/0',
  'clusterCompliant': '2/2/0',
  'clusterNS': {
    'local-cluster': 'local-cluster',
    'managed01': 'managed01'
  },
  'clusterConsoleURL': {
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com',
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-test-policy-imagemanifestvulnpolicy',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/placement-my-test-policy-imagemanifestvulnpolicy'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-imagemanifestvulnpolicy',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/binding-my-test-policy-imagemanifestvulnpolicy'
      }
    }
  ]
},
{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-securitycontextconstraints',
    'namespace': 'default',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-securitycontextconstraints',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'SI System and Information Integrity',
      'policy.open-cluster-management.io/controls': 'SI-3 Malicious Code Protection',
      'policy.open-cluster-management.io/standards': 'NIST SP 800-53'
    },
    'resourceVersion': '13957135'
  },
  'name': 'my-test-policy-securitycontextconstraints',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SI System and Information Integrity',
        'policy.open-cluster-management.io/controls': 'SI-3 Malicious Code Protection',
        'policy.open-cluster-management.io/standards': 'NIST SP 800-53'
      },
      'creationTimestamp': '2020-10-21T16:30:42Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-21T16:30:42Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-21T16:30:42Z'
        }
      ],
      'name': 'my-test-policy-securitycontextconstraints',
      'namespace': 'default',
      'resourceVersion': '13957135',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-securitycontextconstraints',
      'uid': '8a78588e-de6b-4582-b2f5-73ea8e498cf8'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'ConfigurationPolicy',
            'metadata': {
              'name': 'policy-securitycontextconstraints-example'
            },
            'spec': {
              'namespaceSelector': {
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
                    'allowHostDirVolumePlugin': false,
                    'allowHostIPC': false,
                    'allowHostNetwork': false,
                    'allowHostPID': false,
                    'allowHostPorts': false,
                    'allowPrivilegeEscalation': true,
                    'allowPrivilegedContainer': false,
                    'allowedCapabilities': [],
                    'apiVersion': 'security.openshift.io/v1',
                    'defaultAddCapabilities': [],
                    'fsGroup': {
                      'type': 'MustRunAs'
                    },
                    'groups': [
                      'system:authenticated'
                    ],
                    'kind': 'SecurityContextConstraints',
                    'metadata': {
                      'annotations': {
                        'kubernetes.io/description': 'restricted denies access to all host features and requires pods to be run with a UID, and SELinux context that are allocated to the namespace.  This is the most restrictive SCC and it is used by default for authenticated users.'
                      },
                      'name': 'sample-restricted-scc'
                    },
                    'priority': 10,
                    'readOnlyRootFilesystem': false,
                    'requiredDropCapabilities': [
                      'KILL',
                      'MKNOD',
                      'SETUID',
                      'SETGID'
                    ],
                    'runAsUser': {
                      'type': 'MustRunAsRange'
                    },
                    'seLinuxContext': {
                      'type': 'MustRunAs'
                    },
                    'supplementalGroups': {
                      'type': 'RunAsAny'
                    },
                    'users': [],
                    'volumes': [
                      'configMap',
                      'downwardAPI',
                      'emptyDir',
                      'persistentVolumeClaim',
                      'projected',
                      'secret'
                    ]
                  }
                }
              ],
              'remediationAction': 'inform',
              'severity': 'high'
            }
          }
        }
      ],
      'remediationAction': 'inform'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-securitycontextconstraints'
        }
      ]
    }
  },
  'remediation': 'inform',
  'policyCompliant': '0/0',
  'clusterCompliant': '-',
  'clusterNS': {
    'local-cluster': 'local-cluster',
    'managed01': 'managed01'
  },
  'clusterConsoleURL': {
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com',
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com'
  },
  'placementPolicies': [],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-securitycontextconstraints',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/binding-my-test-policy-securitycontextconstraints'
      }
    }
  ]
},
{
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'my-test-policy-iampolicy',
    'namespace': 'default',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-iampolicy',
    'annotations': {
      'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
      'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
      'policy.open-cluster-management.io/standards': 'NIST-CSF'
    },
    'resourceVersion': '13972498'
  },
  'name': 'my-test-policy-iampolicy',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
    'metadata': {
      'annotations': {
        'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
        'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
        'policy.open-cluster-management.io/standards': 'NIST-CSF'
      },
      'creationTimestamp': '2020-10-21T16:50:52Z',
      'generation': 1,
      'managedFields': [
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:status': {
              '.': {},
              'f:placement': {},
              'f:status': {}
            }
          },
          'manager': 'governance-policy-propagator',
          'operation': 'Update',
          'time': '2020-10-21T16:50:52Z'
        },
        {
          'apiVersion': 'policy.open-cluster-management.io/v1',
          'fieldsType': 'FieldsV1',
          'fieldsV1': {
            'f:metadata': {
              'f:annotations': {
                '.': {},
                'f:policy.open-cluster-management.io/categories': {},
                'f:policy.open-cluster-management.io/controls': {},
                'f:policy.open-cluster-management.io/standards': {}
              }
            },
            'f:spec': {
              '.': {},
              'f:disabled': {},
              'f:policy-templates': {},
              'f:remediationAction': {}
            }
          },
          'manager': 'unknown',
          'operation': 'Update',
          'time': '2020-10-21T16:50:52Z'
        }
      ],
      'name': 'my-test-policy-iampolicy',
      'namespace': 'default',
      'resourceVersion': '13972498',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/my-test-policy-iampolicy',
      'uid': 'ed06b1fd-48fb-417f-ad9e-642ca88159a2'
    },
    'spec': {
      'disabled': false,
      'policy-templates': [
        {
          'objectDefinition': {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'kind': 'IamPolicy',
            'metadata': {
              'name': 'my-test-policy-iampolicy-example'
            },
            'spec': {
              'maxClusterRoleBindingUsers': 5,
              'namespaceSelector': {
                'exclude': [
                  'kube-*',
                  'openshift-*'
                ],
                'include': [
                  '*'
                ]
              },
              'remediationAction': 'inform',
              'severity': 'medium'
            }
          }
        }
      ],
      'remediationAction': 'inform'
    },
    'status': {
      'placement': [
        {
          'placementBinding': 'binding-my-test-policy-iampolicy',
          'placementRule': 'placement-my-test-policy-iampolicy'
        }
      ],
      'status': [
        {
          'clustername': 'local-cluster',
          'clusternamespace': 'local-cluster'
        }
      ]
    }
  },
  'remediation': 'inform',
  'policyCompliant': '0/0',
  'clusterCompliant': '0/1/1',
  'clusterNS': {
    'managed01': 'managed01',
    'local-cluster': 'local-cluster'
  },
  'clusterConsoleURL': {
    'managed01': 'https://console-openshift-console.apps.mycluster-managed01.dev08.red-chesterfield.com',
    'local-cluster': 'https://console-openshift-console.apps.mycluster-hub.dev08.red-chesterfield.com'
  },
  'placementPolicies': [
    {
      '__typename': 'PlacementPolicy',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'placement-my-test-policy-iampolicy',
        'selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/placement-my-test-policy-iampolicy'
      }
    }
  ],
  'placementBindings': [
    {
      '__typename': 'PlacementBinding',
      'metadata': {
        '__typename': 'Metadata',
        'name': 'binding-my-test-policy-iampolicy',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/binding-my-test-policy-iampolicy'
      }
    }
  ]
}]

export const staticResourceData = {
  'defaultSortField': 'metadata.name',
  'primaryKey': 'metadata.name',
  'secondaryKey': 'metadata.namespace',
  'tableActions': [
    'table.actions.edit',
    'table.actions.remove'
  ],
  'tableKeys': [
    {
      'msgKey': 'table.header.policy.name',
      'resourceKey': 'metadata.name'
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
      'msgKey': 'table.header.standards',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/standards"]'
    },
    {
      'msgKey': 'table.header.controls',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/controls"]'
    },
    {
      'msgKey': 'table.header.categories',
      'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/categories"]'
    }
  ]
}

export const staticResourceData2 = {
  'defaultSortField': 'cluster',
  'primaryKey': 'cluster',
  'secondaryKey': 'metadata.namespace',
  'tableActions': [
    'table.actions.launch.cluster'
  ],
  'tableKeys': [
    {
      'msgKey': 'table.header.cluster.name',
      'resourceKey': 'cluster'
    },
    {
      'msgKey': 'table.header.cluster.namespace',
      'resourceKey': 'namespace'
    },
    {
      'msgKey': 'table.header.violation',
      'resourceKey': 'violation'
    },
    {
      'msgKey': 'table.header.violated',
      'resourceKey': 'nonCompliant'
    }
  ]
}

export const items = {
  '1569249226915-policy-test-calamari': {
    'metadata': {
      'name': '1569249226915-policy-test',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/1569249226915-policy-test',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'VA',
        'policy.open-cluster-management.io/standards': 'NIST',
        'seed-generation': '1'
      },
      'resourceVersion': '8073768',
      '__typename': 'Metadata'
    },
    'name': '1569249226915-policy-test',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-23T14:34:25Z',
        'finalizers': [
          'propagator.finalizer.calamari.ibm.com',
          'finalizer.policies.ibm.com'
        ],
        'generation': 14,
        'name': '1569249226915-policy-test',
        'namespace': 'calamari',
        'resourceVersion': '8073768',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/1569249226915-policy-test',
        'uid': '3dc879b5-de0f-11e9-a1ed-005056a0b88e'
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
          'binding-1569249226915-policy-test'
        ],
        'placementPolicies': [
          'placement-1569249226915-policy-test'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              '1569249226915-policy-test': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              '1569249226915-policy-test': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-1569249226915-policy-test',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-1569249226915-policy-test',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-1569249226915-policy-test',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-1569249226915-policy-test',
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
          'binding-1569249226915-policy-test'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-1569249226915-policy-test'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/1569249226915-policy-test',
          'children': '1569249226915-policy-test',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'NIST',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'VA',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Information Integrity'
    }
  },
  'policy-auditpolicy-calamari': {
    'metadata': {
      'name': 'policy-auditpolicy',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-auditpolicy',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'secretEncryption',
        'policy.open-cluster-management.io/standards': 'FISMA',
        'seed-generation': '1'
      },
      'resourceVersion': '7485482',
      '__typename': 'Metadata'
    },
    'name': 'policy-auditpolicy',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'secretEncryption',
          'policy.open-cluster-management.io/standards': 'FISMA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-09T13:41:04Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 24,
        'name': 'policy-auditpolicy',
        'namespace': 'calamari',
        'resourceVersion': '7485482',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-auditpolicy',
        'uid': '786625e5-d307-11e9-a1ed-005056a0b88e'
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
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'audit.policies.ibm.com/v1alpha1',
              'kind': 'AuditPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'policy-auditpolicy-example'
              },
              'spec': {
                'clusterAuditPolicy': {
                  'auditPolicyRules': {
                    'auth-idp': 'validate',
                    'helmapi': 'validate',
                    'kubernetes': 'ignore',
                    'platform-api': 'validate',
                    'platform-identity-manager': 'validate',
                    'platform-identity-provider': 'validate',
                    'vulnerability-advisor': 'validate'
                  }
                },
                'namespaceSelector': {
                  'exclude': [
                    'kube-system'
                  ],
                  'include': [
                    'default',
                    'kube-*'
                  ]
                },
                'remediationAction': 'inform',
                'severity': 'low'
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
          'binding-policy-auditpolicy'
        ],
        'placementPolicies': [
          'placement-policy-auditpolicy'
        ],
        'status': {
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-auditpolicy': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'clusterhub',
            'compliant': 'Compliant'
          }
        }
      }
    },
    'remediation': 'inform',
    'policyCompliant': '0/1',
    'clusterCompliant': '0/1',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-auditpolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-auditpolicy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-auditpolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-auditpolicy',
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
          'binding-policy-auditpolicy'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-auditpolicy'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-auditpolicy',
          'children': 'policy-auditpolicy',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'FISMA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Secret Encryption',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-certificatepolicy-calamari': {
    'metadata': {
      'name': 'policy-certificatepolicy',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-certificatepolicy',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'CertManager',
        'policy.open-cluster-management.io/standards': 'FISMA, PCI',
        'seed-generation': '1'
      },
      'resourceVersion': '8280979',
      '__typename': 'Metadata'
    },
    'name': 'policy-certificatepolicy',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'CertManager',
          'policy.open-cluster-management.io/standards': 'FISMA, PCI',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-03T18:34:05Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 81,
        'name': 'policy-certificatepolicy',
        'namespace': 'calamari',
        'resourceVersion': '8280979',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-certificatepolicy',
        'uid': '68d772b1-ce79-11e9-a1ed-005056a0b88e'
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
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'policies.ibm.com/v1alpha1',
              'kind': 'CertificatePolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'certificate-policy-example'
              },
              'spec': {
                'minimumDuration': '300h',
                'namespaceSelector': {
                  'exclude': [],
                  'include': [
                    'default'
                  ]
                },
                'remediationAction': 'inform',
                'severity': 'low'
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
          'binding-policy-certificatepolicy'
        ],
        'placementPolicies': [
          'placement-policy-certificatepolicy'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-certificatepolicy': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'Compliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-certificatepolicy': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'clusterhub',
            'compliant': 'Compliant'
          }
        }
      }
    },
    'remediation': 'inform',
    'policyCompliant': '0/2',
    'clusterCompliant': '0/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-certificatepolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-certificatepolicy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-certificatepolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-certificatepolicy',
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
          'binding-policy-certificatepolicy'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-certificatepolicy'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-certificatepolicy',
          'children': 'policy-certificatepolicy',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'FISMA, PCI',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Cert Manager',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Information Integrity'
    }
  },
  'policy-iampolicy-calamari': {
    'metadata': {
      'name': 'policy-iampolicy',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-iampolicy',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'FISMA',
        'seed-generation': '1'
      },
      'resourceVersion': '8280904',
      '__typename': 'Metadata'
    },
    'name': 'policy-iampolicy',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'FISMA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-08-30T14:58:31Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 47,
        'name': 'policy-iampolicy',
        'namespace': 'calamari',
        'resourceVersion': '8280904',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-iampolicy',
        'uid': 'a18d825a-cb36-11e9-a1eb-005056a0b88e'
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
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'iam.policies.ibm.com/v1alpha1',
              'kind': 'IamPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'iam-policy-example'
              },
              'spec': {
                'maxClusterRoleBindingUsers': 5,
                'maxRoleBindingViolationsPerNamespace': 2,
                'namespaceSelector': {
                  'exclude': [
                    'kube-system'
                  ],
                  'include': [
                    'default',
                    'kube-*'
                  ]
                },
                'remediationAction': 'inform',
                'severity': 'medium'
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
          'binding-policy-iampolicy'
        ],
        'placementPolicies': [
          'placement-policy-iampolicy'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-iampolicy': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-iampolicy': {}
            },
            'clustername': 'clusterhub'
          }
        }
      }
    },
    'remediation': 'inform',
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-iampolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-iampolicy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-iampolicy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-iampolicy',
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
          'binding-policy-iampolicy'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-iampolicy'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-iampolicy',
          'children': 'policy-iampolicy',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'FISMA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Mutation Advisor',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-image-calamari': {
    'metadata': {
      'name': 'policy-image',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-image',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'VA',
        'policy.open-cluster-management.io/standards': 'FISMA',
        'seed-generation': '4'
      },
      'resourceVersion': '8073784',
      '__typename': 'Metadata'
    },
    'name': 'policy-image',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'FISMA',
          'seed-generation': '4'
        },
        'creationTimestamp': '2019-08-30T13:46:19Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 70,
        'name': 'policy-image',
        'namespace': 'calamari',
        'resourceVersion': '8073784',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-image',
        'uid': '8be1a627-cb2c-11e9-a1eb-005056a0b88e'
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
              'apiVersion': 'securityenforcement.admission.cloud.ibm.com/v1beta1',
              'kind': 'ClusterImagePolicy',
              'metadata': {
                'name': 'mongo'
              },
              'spec': {
                'repositories': [
                  {
                    'name': 'docker.io/mongo'
                  }
                ]
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
          'binding-policy-image'
        ],
        'placementPolicies': [
          'placement-policy-image'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-image': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-image': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-image',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-image',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-image',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-image',
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
          'binding-policy-image'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-image'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-image',
          'children': 'policy-image',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'FISMA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'VA',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-limitrange-calamari': {
    'metadata': {
      'name': 'policy-limitrange',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-limitrange',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'CertManager',
        'policy.open-cluster-management.io/standards': 'HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '8073778',
      '__typename': 'Metadata'
    },
    'name': 'policy-limitrange',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'CertManager',
          'policy.open-cluster-management.io/standards': 'HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-04T16:27:02Z',
        'finalizers': [
          'propagator.finalizer.calamari.ibm.com',
          'finalizer.policies.ibm.com'
        ],
        'generation': 48,
        'name': 'policy-limitrange',
        'namespace': 'calamari',
        'resourceVersion': '8073778',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-limitrange',
        'uid': 'd358638d-cf30-11e9-a1ed-005056a0b88e'
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
        'remediationAction': 'inform'
      },
      'status': {
        'placementBindings': [
          'binding-policy-limitrange'
        ],
        'placementPolicies': [
          'placement-policy-limitrange'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-limitrange': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-limitrange': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-limitrange',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-limitrange',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-limitrange',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-limitrange',
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
          'binding-policy-limitrange'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-limitrange'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-limitrange',
          'children': 'policy-limitrange',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'HIPAA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Cert Manager',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-namespace-calamari': {
    'metadata': {
      'name': 'policy-namespace',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-namespace',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '8280831',
      '__typename': 'Metadata'
    },
    'name': 'policy-namespace',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-10T17:55:15Z',
        'finalizers': [
          'propagator.finalizer.calamari.ibm.com',
          'finalizer.policies.ibm.com'
        ],
        'generation': 25,
        'name': 'policy-namespace',
        'namespace': 'calamari',
        'resourceVersion': '8280831',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-namespace',
        'uid': '2516c2c7-d3f4-11e9-a1ed-005056a0b88e'
      },
      'spec': {
        'complianceType': 'musthave',
        'namespaces': {},
        'object-templates': [
          {
            'complianceType': 'musthave',
            'objectDefinition': {
              'apiVersion': 'v1',
              'kind': 'Namespace',
              'metadata': {
                'name': 'dev-will-test'
              }
            },
            'status': {
              'Validity': {}
            }
          }
        ],
        'remediationAction': 'enforce'
      },
      'status': {
        'placementBindings': [
          'binding-namespace'
        ],
        'placementPolicies': [
          'placement-namespace'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-namespace': {}
            },
            'clustername': 'cluster1'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-namespace': {}
            },
            'clustername': 'clusterhub'
          }
        }
      }
    },
    'remediation': 'enforce',
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-namespace',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-namespace',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-namespace',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-namespace',
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
          'binding-namespace'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-namespace'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-namespace',
          'children': 'policy-namespace',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'NIST, HIPAA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Mutation Advisor',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections, System And Information Integrity'
    }
  },
  'policy-pod-calamari': {
    'metadata': {
      'name': 'policy-pod',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'FISMA',
        'seed-generation': '1'
      },
      'resourceVersion': '8280895',
      '__typename': 'Metadata'
    },
    'name': 'policy-pod',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'FISMA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-05T18:16:29Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 59,
        'name': 'policy-pod',
        'namespace': 'calamari',
        'resourceVersion': '8280895',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod',
        'uid': '48316272-d009-11e9-a1ed-005056a0b88e'
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
              'kind': 'Pod',
              'metadata': {
                'name': 'nginx-pod'
              },
              'spec': {
                'containers': [
                  {
                    'image': 'nginx:1.7.9',
                    'name': 'nginx',
                    'ports': [
                      {
                        'containerPort': 80
                      }
                    ]
                  }
                ]
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
          'binding-policy-pod'
        ],
        'placementPolicies': [
          'placement-policy-pod'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-pod': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-pod': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-pod',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-pod',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-pod',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-pod',
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
          'binding-policy-pod'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-pod'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-pod',
          'children': 'policy-pod',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'FISMA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Mutation Advisor',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-pod-2-calamari': {
    'metadata': {
      'name': 'policy-pod-2',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod-2',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'VA',
        'policy.open-cluster-management.io/standards': 'HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '8280872',
      '__typename': 'Metadata'
    },
    'name': 'policy-pod-2',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-18T17:27:24Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 26,
        'name': 'policy-pod-2',
        'namespace': 'calamari',
        'resourceVersion': '8280872',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod-2',
        'uid': '9412ab84-da39-11e9-a1ed-005056a0b88e'
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
              'kind': 'Pod',
              'metadata': {
                'name': 'nginx-pod'
              },
              'spec': {
                'containers': [
                  {
                    'image': 'nginx:1.7.9',
                    'name': 'nginx',
                    'ports': [
                      {
                        'containerPort': 80
                      }
                    ]
                  }
                ]
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
          'binding-policy-pod-2'
        ],
        'placementPolicies': [
          'placement-policy-pod-2'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-pod-2': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-pod-2': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-pod-2',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-pod-2',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-pod-2',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-pod-2',
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
          'binding-policy-pod-2'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-pod-2'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-pod-2',
          'children': 'policy-pod-2',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'HIPAA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'VA',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  },
  'policy-pod-edge-calamari': {
    'metadata': {
      'name': 'policy-pod-edge',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod-edge',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
        'policy.open-cluster-management.io/controls': 'VA',
        'policy.open-cluster-management.io/standards': 'HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '8280876',
      '__typename': 'Metadata'
    },
    'name': 'policy-pod-edge',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-09-17T15:25:30Z',
        'finalizers': [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 27,
        'name': 'policy-pod-edge',
        'namespace': 'calamari',
        'resourceVersion': '8280876',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod-edge',
        'uid': '6279d239-d95f-11e9-a1ed-005056a0b88e'
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
              'kind': 'Pod',
              'metadata': {
                'name': 'nginx-pod'
              },
              'spec': {
                'containers': [
                  {
                    'image': 'nginx:1.7.9',
                    'name': 'nginx',
                    'ports': [
                      {
                        'containerPort': 80
                      }
                    ]
                  }
                ]
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
          'binding-policy-pod-edge'
        ],
        'placementPolicies': [
          'placement-policy-pod-edge'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-pod-edge': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-pod-edge': {
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
    'policyCompliant': '2/2',
    'clusterCompliant': '2/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-policy-pod-edge',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-pod-edge',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-policy-pod-edge',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-pod-edge',
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
          'binding-policy-pod-edge'
        ]
      },
      {
        'name': 'policy.pp',
        'items': [
          'placement-policy-pod-edge'
        ]
      }
    ],
    'custom': {
      'metadata.name': {
        'key': null,
        'ref': null,
        'props': {
          'to': '/multicloud/policies/all/policy-pod-edge',
          'children': 'policy-pod-edge',
          'replace': false
        },
        '_owner': null,
        '_store': {}
      },
      'metadata.annotations["policy.open-cluster-management.io/standards"]': 'HIPAA',
      'metadata.annotations["policy.open-cluster-management.io/controls"]': 'VA',
      'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
    }
  }
}

export const items2 = {
  'calamari-undefined': {
    'cluster': 'calamari',
    'namespace': 'calamari',
    'violation': '1/5',
    'nonCompliant': [
      'policy-imagemanifestvulnpolicy'
    ],
    'consoleURL': 'https://console-openshift-console.apps.calamari.dev08.red-chesterfield.com',
    'custom': {
      'cluster': {
        'type': 'a',
        'key': null,
        'ref': null,
        'props': {
          'href': '/multicloud/clusters/calamari/calamari',
          'children': 'calamari'
        },
        '_owner': null,
        '_store': {}
      },
      'nonCompliant': {
        'key': null,
        'ref': null,
        'props': {
          'text': 'policy-imagemanifestvulnpolicy',
          'maxCharacters': 35
        },
        '_owner': null,
        '_store': {}
      }
    }
  }
}

export const items3 = {
  'calamari-undefined': {
    'cluster': 'calamari',
    'namespace': 'calamari',
    'violation': '1/5',
    'nonCompliant': [
      'policy-imagemanifestvulnpolicy'
    ],
    'consoleURL': '-',
    'custom': {
      'cluster': {
        'type': 'a',
        'key': null,
        'ref': null,
        'props': {
          'href': '/multicloud/clusters/calamari/calamari',
          'children': 'calamari'
        },
        '_owner': null,
        '_store': {}
      },
      'nonCompliant': {
        'key': null,
        'ref': null,
        'props': {
          'text': 'policy-imagemanifestvulnpolicy',
          'maxCharacters': 35
        },
        '_owner': null,
        '_store': {}
      }
    }
  }
}

export const itemIds = [
  '1569249226915-policy-test-calamari',
  'policy-auditpolicy-calamari',
  'policy-certificatepolicy-calamari',
  'policy-iampolicy-calamari',
  'policy-image-calamari',
  'policy-limitrange-calamari',
  'policy-namespace-calamari',
  'policy-pod-calamari',
  'policy-pod-2-calamari',
  'policy-pod-edge-calamari'
]

export const itemIds2 = ['calamari-undefined']

export const resourceType = {
  'name': 'HCMCompliance',
  'query': 'ALL_POLICIES'
}

export const resourceType2 = {
  'name': 'PoliciesByCluster',
  'query': 'ALL_POLICIES'
}

export const staticResourceDataPolicyOverview = {
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
        'cells': null
      },
      {
        'cells': [null]
      },
      {
        'cells': 'testing'
      },
      {
        'cells': ['testing']
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'information': 'grc.remediation.tooltip',
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
        'cells': null
      },
      {
        'cells': [null]
      },
      {
        'cells': 'testing'
      },
      {
        'cells': ['testing']
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'information': 'grc.remediation.tooltip',
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
        'cells': null
      },
      {
        'cells': [null]
      },
      {
        'cells': 'testing'
      },
      {
        'cells': ['testing']
      },
      {
        'cells': [
          {
            'resourceKey': 'description.title.enforcement',
            'information': 'grc.remediation.tooltip',
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

export const itemPolicyOverview = {
  'raw':{
    'apiVersion':'policies.open-cluster-management.io/v1',
    'kind':'Policy',
    'metadata':{
      'annotations':{
        'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
        'policies.open-cluster-management.io/categories':'PR.DS Data Security',
        'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
        'policies.open-cluster-management.io/standards':'NIST-CSF'
      },
      'creationTimestamp':'2020-06-02T10:43:48Z',
      'generation':1,
      'name':'case6-test-policy',
      'namespace':'default',
      'resourceVersion':'42637093',
      'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
      'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
    },
    'spec':{
      'disabled':false,
      'policy-templates':[
        {
          'objectDefinition':{
            'apiVersion':'policies.ibm.com/v1alpha1',
            'kind':'TrustedContainerPolicy',
            'metadata':{
              'name':'case6-test-policy-trustedcontainerpolicy'
            },
            'spec':{
              'imageRegistry':'quay.io',
              'namespaceSelector':{
                'exclude':[
                  'kube-system',
                  'default'
                ],
                'include':[
                  'e2e-test'
                ]
              },
              'remediationAction':'inform',
              'severity':'low'
            }
          }
        },
        {
          'objectDefinition':{
            'apiVersion':'policies.open-cluster-management.io/v1',
            'kind':'ConfigurationPolicy',
            'metadata':{
              'name':'case6-policy-role-example'
            },
            'spec':{
              'namespaceSelector':{
                'exclude':[
                  'kube-*'
                ],
                'include':[
                  'default'
                ]
              },
              'object-templates':[
                {
                  'complianceType':'mustonlyhave',
                  'objectDefinition':{
                    'apiVersion':'rbac.authorization.k8s.io/v1',
                    'kind':'Role',
                    'metadata':{
                      'name':'policy-role-example'
                    },
                    'rules':[
                      {
                        'apiGroups':[
                          'extensions',
                          'apps'
                        ],
                        'resources':[
                          'deployments'
                        ],
                        'verbs':[
                          'get',
                          'list',
                          'watch',
                          'delete',
                          'patch'
                        ]
                      }
                    ]
                  }
                }
              ],
              'remediationAction':'inform',
              'severity':'high'
            }
          }
        }
      ],
      'remediationAction':'inform'
    },
    'status':{
      'placement':[
        {
          'placementBinding':'case6-test-policy-pb',
          'placementRule':'case6-test-policy-plr'
        }
      ],
    }
  },
  'metadata':{
    'creationTimestamp':'2020-06-02T10:43:48Z',
    'name':'case6-test-policy',
    'namespace':'default',
    'resourceVersion':'42637093',
    'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
    'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213',
    'annotations':{
      'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
      'policies.open-cluster-management.io/categories':'PR.DS Data Security',
      'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
      'policies.open-cluster-management.io/standards':'NIST-CSF'
    },
    '__typename':'Metadata'
  },
  'annotations':{
    'categories':'PR.DS Data Security',
    'controls':'PR.DS-2 Data-in-transit',
    'standards':'NIST-CSF'
  },
  'placementPolicies':[
    {
      'metadata':{
        'annotations':{
          'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"apps.open-cluster-management.io/v1","kind":"PlacementRule","metadata":{"annotations":{},"name":"case6-test-policy-plr","namespace":"default"},"spec":{"clusterConditions":[{"type":"OK"}],"clusterSelector":{"matchExpressions":[]}}}\n'
        },
        'name':'case6-test-policy-plr',
        'namespace':'default',
        'creationTimestamp':'2020-06-02T10:43:49Z',
        'selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr',
        '__typename':'Metadata'
      },
      'status':{
        'decisions':[
          {
            'clusterName':'calamari',
            'clusterNamespace':'calamari'
          }
        ]
      },
      'raw':{
        'apiVersion':'apps.open-cluster-management.io/v1',
        'kind':'PlacementRule',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"apps.open-cluster-management.io/v1","kind":"PlacementRule","metadata":{"annotations":{},"name":"case6-test-policy-plr","namespace":"default"},"spec":{"clusterConditions":[{"type":"OK"}],"clusterSelector":{"matchExpressions":[]}}}\n'
          },
          'creationTimestamp':'2020-06-02T10:43:49Z',
          'generation':1,
          'name':'case6-test-policy-plr',
          'namespace':'default',
          'resourceVersion':'42637074',
          'selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr',
          'uid':'d35180d5-75a4-4576-90b5-9eba2a4da875'
        },
        'spec':{
          'clusterConditions':[
            {
              'type':'OK'
            }
          ],
          'clusterSelector':{
            'matchExpressions':[

            ]
          }
        },
        'status':{
          'decisions':[
            {
              'clusterName':'calamari',
              'clusterNamespace':'calamari'
            }
          ]
        }
      },
      '__typename':'PlacementPolicy'
    }
  ],
  'placementBindings':[
    {
      'metadata':{
        'name':'case6-test-policy-pb',
        'namespace':'default',
        'creationTimestamp':'2020-06-02T10:43:48Z',
        'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb',
        '__typename':'Metadata'
      },
      'placementRef':{
        'name':'case6-test-policy-plr',
        'kind':'PlacementRule',
        '__typename':'Subject'
      },
      'raw':{
        'apiVersion':'policies.open-cluster-management.io/v1',
        'kind':'PlacementBinding',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"PlacementBinding","metadata":{"annotations":{},"name":"case6-test-policy-pb","namespace":"default"},"placementRef":{"apiGroup":"apps.open-cluster-management.io","kind":"PlacementRule","name":"case6-test-policy-plr"},"subjects":[{"apiGroup":"policies.open-cluster-management.io","kind":"Policy","name":"case6-test-policy"}]}\n'
          },
          'creationTimestamp':'2020-06-02T10:43:48Z',
          'generation':1,
          'name':'case6-test-policy-pb',
          'namespace':'default',
          'resourceVersion':'42637066',
          'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb',
          'uid':'923b854e-637d-4a91-9242-04eb936c0f9b'
        },
        'placementRef':{
          'apiGroup':'apps.open-cluster-management.io',
          'kind':'PlacementRule',
          'name':'case6-test-policy-plr'
        },
        'subjects':[
          {
            'apiGroup':'policies.open-cluster-management.io',
            'kind':'Policy',
            'name':'case6-test-policy'
          }
        ]
      },
      '__typename':'PlacementBinding'
    }
  ],
  'complianceStatus':[
    {
      'clusterNamespace':'0',
      'localCompliantStatus':'0/0',
      'localValidStatus':'0/0',
      'compliant':'NonCompliant',
      '__typename':'CompliantStatus'
    }
  ],
  'compliancePolicy':[
    {
      'name':'case6-test-policy',
      'status':null,
      'complianceName':'case6-test-policy',
      'complianceNamespace':'default',
      'complianceSelfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
      'roleTemplates':[

      ],
      'roleBindingTemplates':[

      ],
      'objectTemplates':[

      ],
      'policyTemplates':[
        {
          'apiVersion':'policies.ibm.com/v1alpha1',
          'complianceType':'',
          'compliant':'Compliant',
          'lastTransition':'',
          'name':'case6-test-policy-trustedcontainerpolicy',
          'kind':'TrustedContainerPolicy',
          'validity':'',
          'raw':{
            'objectDefinition':{
              'apiVersion':'policies.ibm.com/v1alpha1',
              'kind':'TrustedContainerPolicy',
              'metadata':{
                'name':'case6-test-policy-trustedcontainerpolicy'
              },
              'spec':{
                'imageRegistry':'quay.io',
                'namespaceSelector':{
                  'exclude':[
                    'kube-system',
                    'default'
                  ],
                  'include':[
                    'e2e-test'
                  ]
                },
                'remediationAction':'inform',
                'severity':'low'
              }
            },
            'templateType':'policy-templates'
          },
          '__typename':'PolicyTemplate'
        },
        {
          'apiVersion':'policies.open-cluster-management.io/v1',
          'complianceType':'',
          'compliant':'Compliant',
          'lastTransition':'',
          'name':'case6-policy-role-example',
          'kind':'ConfigurationPolicy',
          'validity':'',
          'raw':{
            'objectDefinition':{
              'apiVersion':'policies.open-cluster-management.io/v1',
              'kind':'ConfigurationPolicy',
              'metadata':{
                'name':'case6-policy-role-example'
              },
              'spec':{
                'namespaceSelector':{
                  'exclude':[
                    'kube-*'
                  ],
                  'include':[
                    'default'
                  ]
                },
                'object-templates':[
                  {
                    'complianceType':'mustonlyhave',
                    'objectDefinition':{
                      'apiVersion':'rbac.authorization.k8s.io/v1',
                      'kind':'Role',
                      'metadata':{
                        'name':'policy-role-example'
                      },
                      'rules':[
                        {
                          'apiGroups':[
                            'extensions',
                            'apps'
                          ],
                          'resources':[
                            'deployments'
                          ],
                          'verbs':[
                            'get',
                            'list',
                            'watch',
                            'delete',
                            'patch'
                          ]
                        }
                      ]
                    }
                  }
                ],
                'remediationAction':'inform',
                'severity':'high'
              }
            },
            'templateType':'policy-templates'
          },
          '__typename':'PolicyTemplate'
        }
      ],
      'detail':{
        'exclude_namespace':[
          '*'
        ],
        'include_namespace':[
          '*'
        ]
      },
      'raw':{
        'apiVersion':'policies.open-cluster-management.io/v1',
        'kind':'Policy',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
            'policies.open-cluster-management.io/categories':'PR.DS Data Security',
            'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
            'policies.open-cluster-management.io/standards':'NIST-CSF'
          },
          'creationTimestamp':'2020-06-02T10:43:48Z',
          'generation':1,
          'name':'case6-test-policy',
          'namespace':'default',
          'resourceVersion':'42637093',
          'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
          'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
        },
        'spec':{
          'disabled':false,
          'policy-templates':[
            {
              'objectDefinition':{
                'apiVersion':'policies.ibm.com/v1alpha1',
                'kind':'TrustedContainerPolicy',
                'metadata':{
                  'name':'case6-test-policy-trustedcontainerpolicy'
                },
                'spec':{
                  'imageRegistry':'quay.io',
                  'namespaceSelector':{
                    'exclude':[
                      'kube-system',
                      'default'
                    ],
                    'include':[
                      'e2e-test'
                    ]
                  },
                  'remediationAction':'inform',
                  'severity':'low'
                }
              }
            },
            {
              'objectDefinition':{
                'apiVersion':'policies.open-cluster-management.io/v1',
                'kind':'ConfigurationPolicy',
                'metadata':{
                  'name':'case6-policy-role-example'
                },
                'spec':{
                  'namespaceSelector':{
                    'exclude':[
                      'kube-*'
                    ],
                    'include':[
                      'default'
                    ]
                  },
                  'object-templates':[
                    {
                      'complianceType':'mustonlyhave',
                      'objectDefinition':{
                        'apiVersion':'rbac.authorization.k8s.io/v1',
                        'kind':'Role',
                        'metadata':{
                          'name':'policy-role-example'
                        },
                        'rules':[
                          {
                            'apiGroups':[
                              'extensions',
                              'apps'
                            ],
                            'resources':[
                              'deployments'
                            ],
                            'verbs':[
                              'get',
                              'list',
                              'watch',
                              'delete',
                              'patch'
                            ]
                          }
                        ]
                      }
                    }
                  ],
                  'remediationAction':'inform',
                  'severity':'high'
                }
              }
            }
          ],
          'remediationAction':'inform'
        },
        'status':{
          'placement':[
            {
              'placementBinding':'case6-test-policy-pb',
              'placementRule':'case6-test-policy-plr'
            }
          ],
          'status':[
            {
              'clustername':'calamari',
              'clusternamespace':'calamari',
              'compliant':'NonCompliant'
            }
          ]
        },
        'raw':{
          'apiVersion':'policies.open-cluster-management.io/v1',
          'kind':'Policy',
          'metadata':{
            'annotations':{
              'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
              'policies.open-cluster-management.io/categories':'PR.DS Data Security',
              'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
              'policies.open-cluster-management.io/standards':'NIST-CSF'
            },
            'creationTimestamp':'2020-06-02T10:43:48Z',
            'generation':1,
            'name':'case6-test-policy',
            'namespace':'default',
            'resourceVersion':'42637093',
            'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
            'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
          },
          'spec':{
            'disabled':false,
            'policy-templates':[
              {
                'objectDefinition':{
                  'apiVersion':'policies.ibm.com/v1alpha1',
                  'kind':'TrustedContainerPolicy',
                  'metadata':{
                    'name':'case6-test-policy-trustedcontainerpolicy'
                  },
                  'spec':{
                    'imageRegistry':'quay.io',
                    'namespaceSelector':{
                      'exclude':[
                        'kube-system',
                        'default'
                      ],
                      'include':[
                        'e2e-test'
                      ]
                    },
                    'remediationAction':'inform',
                    'severity':'low'
                  }
                }
              },
              {
                'objectDefinition':{
                  'apiVersion':'policies.open-cluster-management.io/v1',
                  'kind':'ConfigurationPolicy',
                  'metadata':{
                    'name':'case6-policy-role-example'
                  },
                  'spec':{
                    'namespaceSelector':{
                      'exclude':[
                        'kube-*'
                      ],
                      'include':[
                        'default'
                      ]
                    },
                    'object-templates':[
                      {
                        'complianceType':'mustonlyhave',
                        'objectDefinition':{
                          'apiVersion':'rbac.authorization.k8s.io/v1',
                          'kind':'Role',
                          'metadata':{
                            'name':'policy-role-example'
                          },
                          'rules':[
                            {
                              'apiGroups':[
                                'extensions',
                                'apps'
                              ],
                              'resources':[
                                'deployments'
                              ],
                              'verbs':[
                                'get',
                                'list',
                                'watch',
                                'delete',
                                'patch'
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    'remediationAction':'inform',
                    'severity':'high'
                  }
                }
              }
            ],
            'remediationAction':'inform'
          },
          'status':{
            'placement':[
              {
                'placementBinding':'case6-test-policy-pb',
                'placementRule':'case6-test-policy-plr'
              }
            ],
            'status':[
              {
                'clustername':'calamari',
                'clusternamespace':'calamari',
                'compliant':'NonCompliant'
              }
            ]
          }
        },
        'name':'case6-test-policy',
        'namespace':'default',
        'remediation':'inform',
        'clusters':[
          '0'
        ],
        'clusterNS':{

        },
        'clusterConsoleURL':{

        }
      },
      '__typename':'CompliancePolicyDetail'
    }
  ],
  'compliancePolicies':[

  ],
  'policyCompliant':'0/0',
  'clusterCompliant':'1/1',
  'clusters':[
    '0'
  ],
  '__typename':'Compliance'
}

export const itemPolicyOverview_extra = {
  'raw':{
    'apiVersion':'policies.open-cluster-management.io/v1',
    'kind':'Policy',
    'metadata':{
      'annotations':{
        'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
        'policies.open-cluster-management.io/categories':'PR.DS Data Security',
        'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
        'policies.open-cluster-management.io/standards':'NIST-CSF'
      },
      'creationTimestamp':'2020-06-02T10:43:48Z',
      'generation':1,
      'name':'case6-test-policy',
      'namespace':'default',
      'resourceVersion':'42637093',
      'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
      'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
    },
    'spec':{
      'disabled':false,
      'policy-templates':[
        {
          'objectDefinition':{
            'apiVersion':'policies.ibm.com/v1alpha1',
            'kind':'TrustedContainerPolicy',
            'metadata':{
              'name':'case6-test-policy-trustedcontainerpolicy'
            },
            'spec':{
              'imageRegistry':'quay.io',
              'namespaceSelector':{
                'exclude':[
                  'kube-system',
                  'default'
                ],
                'include':[
                  'e2e-test'
                ]
              },
              'remediationAction':'inform',
              'severity':'low'
            }
          }
        },
        {
          'objectDefinition':{
            'apiVersion':'policies.open-cluster-management.io/v1',
            'kind':'ConfigurationPolicy',
            'metadata':{
              'name':'case6-policy-role-example'
            },
            'spec':{
              'namespaceSelector':{
                'exclude':[
                  'kube-*'
                ],
                'include':[
                  'default'
                ]
              },
              'object-templates':[
                {
                  'complianceType':'mustonlyhave',
                  'objectDefinition':{
                    'apiVersion':'rbac.authorization.k8s.io/v1',
                    'kind':'Role',
                    'metadata':{
                      'name':'policy-role-example'
                    },
                    'rules':[
                      {
                        'apiGroups':[
                          'extensions',
                          'apps'
                        ],
                        'resources':[
                          'deployments'
                        ],
                        'verbs':[
                          'get',
                          'list',
                          'watch',
                          'delete',
                          'patch'
                        ]
                      }
                    ]
                  }
                }
              ],
              'remediationAction':'inform',
              'severity':'high'
            }
          }
        }
      ],
      'role-templates':[],
      'object-templates':[],
      'other-templates':[],
      'remediationAction':'inform'
    },
    'status':{
      'placement':[
        {
          'placementBinding':'case6-test-policy-pb',
          'placementRule':'case6-test-policy-plr'
        }
      ],
    }
  },
  'metadata':{
    'creationTimestamp':'2020-06-02T10:43:48Z',
    'name':'case6-test-policy',
    'namespace':'default',
    'resourceVersion':'42637093',
    'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
    'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213',
    'annotations':{
      'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
      'policies.open-cluster-management.io/categories':'PR.DS Data Security',
      'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
      'policies.open-cluster-management.io/standards':'NIST-CSF'
    },
    '__typename':'Metadata'
  },
  'annotations':{
    'categories':'PR.DS Data Security',
    'controls':'PR.DS-2 Data-in-transit',
    'standards':'NIST-CSF'
  },
  'placementPolicies':[
    {
      'metadata':{
        'annotations':{
          'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"apps.open-cluster-management.io/v1","kind":"PlacementRule","metadata":{"annotations":{},"name":"case6-test-policy-plr","namespace":"default"},"spec":{"clusterConditions":[{"type":"OK"}],"clusterSelector":{"matchExpressions":[]}}}\n'
        },
        'name':'case6-test-policy-plr',
        'namespace':'default',
        'creationTimestamp':'2020-06-02T10:43:49Z',
        'selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr',
        '__typename':'Metadata'
      },
      'status':{
        'decisions':[
          {
            'clusterName':'calamari',
            'clusterNamespace':'calamari'
          }
        ]
      },
      'raw':{
        'apiVersion':'apps.open-cluster-management.io/v1',
        'kind':'PlacementRule',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"apps.open-cluster-management.io/v1","kind":"PlacementRule","metadata":{"annotations":{},"name":"case6-test-policy-plr","namespace":"default"},"spec":{"clusterConditions":[{"type":"OK"}],"clusterSelector":{"matchExpressions":[]}}}\n'
          },
          'creationTimestamp':'2020-06-02T10:43:49Z',
          'generation':1,
          'name':'case6-test-policy-plr',
          'namespace':'default',
          'resourceVersion':'42637074',
          'selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr',
          'uid':'d35180d5-75a4-4576-90b5-9eba2a4da875'
        },
        'spec':{
          'clusterConditions':[
            {
              'type':'OK'
            }
          ],
          'clusterSelector':{
            'matchExpressions':[

            ]
          }
        },
        'status':{
          'decisions':[
            {
              'clusterName':'calamari',
              'clusterNamespace':'calamari'
            }
          ]
        }
      },
      '__typename':'PlacementPolicy'
    }
  ],
  'placementBindings':[
    {
      'metadata':{
        'name':'case6-test-policy-pb',
        'namespace':'default',
        'creationTimestamp':'2020-06-02T10:43:48Z',
        'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb',
        '__typename':'Metadata'
      },
      'placementRef':{
        'name':'case6-test-policy-plr',
        'kind':'PlacementRule',
        '__typename':'Subject'
      },
      'raw':{
        'apiVersion':'policies.open-cluster-management.io/v1',
        'kind':'PlacementBinding',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"PlacementBinding","metadata":{"annotations":{},"name":"case6-test-policy-pb","namespace":"default"},"placementRef":{"apiGroup":"apps.open-cluster-management.io","kind":"PlacementRule","name":"case6-test-policy-plr"},"subjects":[{"apiGroup":"policies.open-cluster-management.io","kind":"Policy","name":"case6-test-policy"}]}\n'
          },
          'creationTimestamp':'2020-06-02T10:43:48Z',
          'generation':1,
          'name':'case6-test-policy-pb',
          'namespace':'default',
          'resourceVersion':'42637066',
          'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb',
          'uid':'923b854e-637d-4a91-9242-04eb936c0f9b'
        },
        'placementRef':{
          'apiGroup':'apps.open-cluster-management.io',
          'kind':'PlacementRule',
          'name':'case6-test-policy-plr'
        },
        'subjects':[
          {
            'apiGroup':'policies.open-cluster-management.io',
            'kind':'Policy',
            'name':'case6-test-policy'
          }
        ]
      },
      '__typename':'PlacementBinding'
    }
  ],
  'complianceStatus':[
    {
      'clusterNamespace':'0',
      'localCompliantStatus':'0/0',
      'localValidStatus':'0/0',
      'compliant':'NonCompliant',
      '__typename':'CompliantStatus'
    }
  ],
  'compliancePolicy':[
    {
      'name':'case6-test-policy',
      'status':null,
      'complianceName':'case6-test-policy',
      'complianceNamespace':'default',
      'complianceSelfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
      'roleTemplates':[

      ],
      'roleBindingTemplates':[

      ],
      'objectTemplates':[

      ],
      'policyTemplates':[
        {
          'apiVersion':'policies.ibm.com/v1alpha1',
          'complianceType':'',
          'compliant':'Compliant',
          'lastTransition':'',
          'name':'case6-test-policy-trustedcontainerpolicy',
          'kind':'TrustedContainerPolicy',
          'validity':'',
          'raw':{
            'objectDefinition':{
              'apiVersion':'policies.ibm.com/v1alpha1',
              'kind':'TrustedContainerPolicy',
              'metadata':{
                'name':'case6-test-policy-trustedcontainerpolicy'
              },
              'spec':{
                'imageRegistry':'quay.io',
                'namespaceSelector':{
                  'exclude':[
                    'kube-system',
                    'default'
                  ],
                  'include':[
                    'e2e-test'
                  ]
                },
                'remediationAction':'inform',
                'severity':'low'
              }
            },
            'templateType':'policy-templates'
          },
          '__typename':'PolicyTemplate'
        },
        {
          'apiVersion':'policies.open-cluster-management.io/v1',
          'complianceType':'',
          'compliant':'Compliant',
          'lastTransition':'',
          'name':'case6-policy-role-example',
          'kind':'ConfigurationPolicy',
          'validity':'',
          'raw':{
            'objectDefinition':{
              'apiVersion':'policies.open-cluster-management.io/v1',
              'kind':'ConfigurationPolicy',
              'metadata':{
                'name':'case6-policy-role-example'
              },
              'spec':{
                'namespaceSelector':{
                  'exclude':[
                    'kube-*'
                  ],
                  'include':[
                    'default'
                  ]
                },
                'object-templates':[
                  {
                    'complianceType':'mustonlyhave',
                    'objectDefinition':{
                      'apiVersion':'rbac.authorization.k8s.io/v1',
                      'kind':'Role',
                      'metadata':{
                        'name':'policy-role-example'
                      },
                      'rules':[
                        {
                          'apiGroups':[
                            'extensions',
                            'apps'
                          ],
                          'resources':[
                            'deployments'
                          ],
                          'verbs':[
                            'get',
                            'list',
                            'watch',
                            'delete',
                            'patch'
                          ]
                        }
                      ]
                    }
                  }
                ],
                'remediationAction':'inform',
                'severity':'high'
              }
            },
            'templateType':'policy-templates'
          },
          '__typename':'PolicyTemplate'
        }
      ],
      'detail':{
        'exclude_namespace':[
          '*'
        ],
        'include_namespace':[
          '*'
        ]
      },
      'raw':{
        'apiVersion':'policies.open-cluster-management.io/v1',
        'kind':'Policy',
        'metadata':{
          'annotations':{
            'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
            'policies.open-cluster-management.io/categories':'PR.DS Data Security',
            'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
            'policies.open-cluster-management.io/standards':'NIST-CSF'
          },
          'creationTimestamp':'2020-06-02T10:43:48Z',
          'generation':1,
          'name':'case6-test-policy',
          'namespace':'default',
          'resourceVersion':'42637093',
          'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
          'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
        },
        'spec':{
          'disabled':false,
          'policy-templates':[
            {
              'objectDefinition':{
                'apiVersion':'policies.ibm.com/v1alpha1',
                'kind':'TrustedContainerPolicy',
                'metadata':{
                  'name':'case6-test-policy-trustedcontainerpolicy'
                },
                'spec':{
                  'imageRegistry':'quay.io',
                  'namespaceSelector':{
                    'exclude':[
                      'kube-system',
                      'default'
                    ],
                    'include':[
                      'e2e-test'
                    ]
                  },
                  'remediationAction':'inform',
                  'severity':'low'
                }
              }
            },
            {
              'objectDefinition':{
                'apiVersion':'policies.open-cluster-management.io/v1',
                'kind':'ConfigurationPolicy',
                'metadata':{
                  'name':'case6-policy-role-example'
                },
                'spec':{
                  'namespaceSelector':{
                    'exclude':[
                      'kube-*'
                    ],
                    'include':[
                      'default'
                    ]
                  },
                  'object-templates':[
                    {
                      'complianceType':'mustonlyhave',
                      'objectDefinition':{
                        'apiVersion':'rbac.authorization.k8s.io/v1',
                        'kind':'Role',
                        'metadata':{
                          'name':'policy-role-example'
                        },
                        'rules':[
                          {
                            'apiGroups':[
                              'extensions',
                              'apps'
                            ],
                            'resources':[
                              'deployments'
                            ],
                            'verbs':[
                              'get',
                              'list',
                              'watch',
                              'delete',
                              'patch'
                            ]
                          }
                        ]
                      }
                    }
                  ],
                  'remediationAction':'inform',
                  'severity':'high'
                }
              }
            }
          ],
          'remediationAction':'inform'
        },
        'status':{
          'placement':[
            {
              'placementBinding':'case6-test-policy-pb',
              'placementRule':'case6-test-policy-plr'
            }
          ],
          'status':[
            {
              'clustername':'calamari',
              'clusternamespace':'calamari',
              'compliant':'NonCompliant'
            }
          ]
        },
        'raw':{
          'apiVersion':'policies.open-cluster-management.io/v1',
          'kind':'Policy',
          'metadata':{
            'annotations':{
              'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS Data Security","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policies.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n',
              'policies.open-cluster-management.io/categories':'PR.DS Data Security',
              'policies.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
              'policies.open-cluster-management.io/standards':'NIST-CSF'
            },
            'creationTimestamp':'2020-06-02T10:43:48Z',
            'generation':1,
            'name':'case6-test-policy',
            'namespace':'default',
            'resourceVersion':'42637093',
            'selfLink':'/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy',
            'uid':'c1aea785-0af3-4829-87eb-cf4298d0d213'
          },
          'spec':{
            'disabled':false,
            'policy-templates':[
              {
                'objectDefinition':{
                  'apiVersion':'policies.ibm.com/v1alpha1',
                  'kind':'TrustedContainerPolicy',
                  'metadata':{
                    'name':'case6-test-policy-trustedcontainerpolicy'
                  },
                  'spec':{
                    'imageRegistry':'quay.io',
                    'namespaceSelector':{
                      'exclude':[
                        'kube-system',
                        'default'
                      ],
                      'include':[
                        'e2e-test'
                      ]
                    },
                    'remediationAction':'inform',
                    'severity':'low'
                  }
                }
              },
              {
                'objectDefinition':{
                  'apiVersion':'policies.open-cluster-management.io/v1',
                  'kind':'ConfigurationPolicy',
                  'metadata':{
                    'name':'case6-policy-role-example'
                  },
                  'spec':{
                    'namespaceSelector':{
                      'exclude':[
                        'kube-*'
                      ],
                      'include':[
                        'default'
                      ]
                    },
                    'object-templates':[
                      {
                        'complianceType':'mustonlyhave',
                        'objectDefinition':{
                          'apiVersion':'rbac.authorization.k8s.io/v1',
                          'kind':'Role',
                          'metadata':{
                            'name':'policy-role-example'
                          },
                          'rules':[
                            {
                              'apiGroups':[
                                'extensions',
                                'apps'
                              ],
                              'resources':[
                                'deployments'
                              ],
                              'verbs':[
                                'get',
                                'list',
                                'watch',
                                'delete',
                                'patch'
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    'remediationAction':'inform',
                    'severity':'high'
                  }
                }
              }
            ],
            'remediationAction':'inform'
          },
          'status':{
            'placement':[
              {
                'placementBinding':'case6-test-policy-pb',
                'placementRule':'case6-test-policy-plr'
              }
            ],
            'status':[
              {
                'clustername':'calamari',
                'clusternamespace':'calamari',
                'compliant':'NonCompliant'
              }
            ]
          }
        },
        'name':'case6-test-policy',
        'namespace':'default',
        'remediation':'inform',
        'clusters':[
          '0'
        ],
        'clusterNS':{

        },
        'clusterConsoleURL':{

        }
      },
      '__typename':'CompliancePolicyDetail'
    }
  ],
  'compliancePolicies':[

  ],
  'policyCompliant':'0/0',
  'clusterCompliant':'1/1',
  'clusters':[
    '0'
  ],
  '__typename':'Compliance'
}

export const itemPolicyOverviewError = {
  'graphQLErrors':[

  ],
  'networkError':{
    'response':{

    },
    'statusCode':504,
    'bodyText':'Error occured while trying to proxy to: localhost:3000/graphql'
  },
  'message':'Network error: JSON.parse: unexpected character at line 1 column 1 of the JSON data'
}

export const itemSpec = {
  'disabled':false,
  'policy-templates':[
    {
      'objectDefinition':{
        'apiVersion':'policies.ibm.com/v1alpha1',
        'kind':'TrustedContainerPolicy',
        'metadata':{
          'name':'case6-test-policy-trustedcontainerpolicy'
        },
        'spec':{
          'imageRegistry':'quay.io',
          'namespaceSelector':{
            'exclude':[
              'kube-system',
              'default'
            ],
            'include':[
              'e2e-test'
            ]
          },
          'remediationAction':'inform',
          'severity':'low'
        }
      }
    },
    {
      'objectDefinition':{
        'apiVersion':'policies.open-cluster-management.io/v1',
        'kind':'ConfigurationPolicy',
        'metadata':{
          'name':'case6-policy-role-example'
        },
        'spec':{
          'namespaceSelector':{
            'exclude':[
              'kube-*'
            ],
            'include':[
              'default'
            ]
          },
          'object-templates':[
            {
              'complianceType':'mustonlyhave',
              'objectDefinition':{
                'apiVersion':'rbac.authorization.k8s.io/v1',
                'kind':'Role',
                'metadata':{
                  'name':'policy-role-example'
                },
                'rules':[
                  {
                    'apiGroups':[
                      'extensions',
                      'apps'
                    ],
                    'resources':[
                      'deployments'
                    ],
                    'verbs':[
                      'get',
                      'list',
                      'watch',
                      'delete',
                      'patch'
                    ]
                  }
                ]
              }
            }
          ],
          'remediationAction':'inform',
          'severity':'high'
        }
      }
    }
  ],
  'remediationAction':'inform'
}

export const staticResourceDataPolicyCluster = {
  'defaultSortField':'metadata.name',
  'primaryKey':'metadata.name',
  'secondaryKey':'metadata.namespace',
  'compliancePolicies':{
    'resourceKey':'compliancePolicies',
    'title':'table.header.compliance.policies',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'tableKeys':[
      {
        'msgKey':'table.header.compliant',
        'resourceKey':'policyCompliantStatus',
        'key':'policyCompliantStatus'
      },
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'table.header.cluster.compliant',
        'resourceKey':'clusterCompliant',
        'key':'clusterCompliant'
      },
      {
        'msgKey':'table.header.cluster.not.compliant',
        'resourceKey':'clusterNotCompliant',
        'key':'clusterNotCompliant'
      }
    ]
  },
  'placementBindingKeys':{
    'title':'application.placement.bindings',
    'defaultSortField':'name',
    'resourceKey':'placementBindings',
    'tableKeys':[
      {
        'key':'name',
        'resourceKey':'metadata.name',
        'msgKey':'table.header.name'
      },
      {
        'key':'namespace',
        'resourceKey':'metadata.namespace',
        'msgKey':'table.header.namespace'
      },
      {
        'key':'placementpolicy',
        'resourceKey':'placementRef.name',
        'msgKey':'table.header.placementpolicy'
      },
      {
        'key':'subjects',
        'resourceKey':'subjects',
        'msgKey':'table.header.subjects'
      },
      {
        'key':'timestamp',
        'resourceKey':'metadata.creationTimestamp',
        'msgKey':'table.header.created'
      }
    ],
    'detailKeys':{
      'title':'policy.pb.details.title',
      'headerRows':[
        'type',
        'detail'
      ],
      'rows':[
        {
          'cells':[
            {
              'resourceKey':'policy.pb.details.name',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.name'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pb.details.namespace',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.namespace'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pb.details.pp',
              'type':'i18n'
            },
            {
              'resourceKey':'placementRef.name'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pb.details.subjects',
              'type':'i18n'
            },
            {
              'resourceKey':'subjects[0]'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pb.details.timestamp',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.creationTimestamp'
            }
          ]
        }
      ]
    },
    'tableActions':[
      'table.actions.edit'
    ]
  },
  'placementPolicyKeys':{
    'title':'application.placement.policies',
    'defaultSortField':'name',
    'resourceKey':'placementPolicies',
    'tableKeys':[
      {
        'key':'name',
        'resourceKey':'metadata.name',
        'msgKey':'table.header.name'
      },
      {
        'key':'namespace',
        'resourceKey':'metadata.namespace',
        'msgKey':'table.header.namespace'
      },
      {
        'key':'clusterSelector',
        'resourceKey':'clusterLabels',
        'msgKey':'table.header.cluster.selector'
      },
      {
        'key':'decisions',
        'resourceKey':'status',
        'msgKey':'table.header.decisions'
      },
      {
        'key':'timestamp',
        'resourceKey':'metadata.creationTimestamp',
        'msgKey':'table.header.created'
      }
    ],
    'detailKeys':{
      'title':'policy.pp.details.title',
      'headerRows':[
        'type',
        'detail'
      ],
      'rows':[
        {
          'cells':[
            {
              'resourceKey':'policy.pp.details.name',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.name'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pp.details.namespace',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.namespace'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pp.details.clusterSelector',
              'type':'i18n'
            },
            {
              'resourceKey':'clusterLabels'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pp.details.decisions',
              'type':'i18n'
            },
            {
              'resourceKey':'status'
            }
          ]
        },
        {
          'cells':[
            {
              'resourceKey':'policy.pp.details.timestamp',
              'type':'i18n'
            },
            {
              'resourceKey':'metadata.creationTimestamp'
            }
          ]
        }
      ]
    },
    'tableActions':[
      'table.actions.edit'
    ]
  },
  'roleTemplates':{
    'resourceKey':'role-templates',
    'title':'table.header.role.template',
    'defaultSortField':'metadata.name',
    'normalizedKey':'metadata.name',
    'tableKeys':[
      {
        'msgKey':'table.header.role.template.name',
        'resourceKey':'metadata.name',
        'key':'name'
      },
      {
        'msgKey':'table.header.role.template.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'table.header.role.template.apiVersion',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      }
    ],
    'rows':[
      {
        'cells':[
          {
            'resourceKey':'metadata.name'
          },
          {
            'resourceKey':'complianceType'
          },
          {
            'resourceKey':'apiVersion'
          }
        ]
      }
    ],
    'subHeaders':[
      'table.header.role.template.complianceType',
      'table.header.apiGroups',
      'table.header.resources',
      'table.header.ruleVerbs'
    ]
  },
  'objectTemplates':{
    'resourceKey':'object-templates',
    'title':'table.header.object.template',
    'defaultSortField':'metadata.name',
    'normalizedKey':'metadata.name',
    'tableKeys':[
      {
        'msgKey':'table.header.object.template.name',
        'resourceKey':'metadata.name',
        'key':'name'
      },
      {
        'msgKey':'table.header.object.template.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'table.header.object.template.apiVersion',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.object.template.kind',
        'resourceKey':'kind',
        'key':'kind'
      }
    ]
  },
  'policyTemplates':{
    'resourceKey':'policy-templates',
    'title':'table.header.policy.template',
    'defaultSortField':'metadata.name',
    'normalizedKey':'metadata.name',
    'tableKeys':[
      {
        'msgKey':'table.header.object.template.name',
        'resourceKey':'metadata.name',
        'key':'name'
      },
      {
        'msgKey':'table.header.object.template.apiVersion',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.object.template.kind',
        'resourceKey':'kind',
        'key':'kind'
      }
    ]
  },
  'complianceStatus':{
    'resourceKey':'complianceStatus',
    'title':'table.header.compliance.compliant',
    'defaultSortField':'clusterNamespace',
    'normalizedKey':'clusterNamespace',
    'tableKeys':[
      {
        'msgKey':'table.header.cluster.namespace',
        'resourceKey':'clusterNamespace',
        'key':'clusterNamespace'
      },
      {
        'msgKey':'table.header.compliance.policy.status',
        'resourceKey':'localCompliantStatus',
        'key':'localCompliantStatus'
      },
      {
        'msgKey':'table.header.compliance.policy.valid',
        'resourceKey':'localValidStatus',
        'key':'localValidStatus'
      }
    ]
  },
  'tableKeys':[
    {
      'msgKey':'table.header.policy.name',
      'resourceKey':'metadata.name'
    },
    {
      'msgKey':'table.header.namespace',
      'resourceKey':'metadata.namespace'
    },
    {
      'msgKey':'table.header.remediation',
      'resourceKey':'remediation'
    },
    {
      'msgKey':'table.header.cluster.violation',
      'resourceKey':'clusterCompliant'
    },
    {
      'msgKey':'table.header.controls',
      'resourceKey':'metadata.annotations["policy.open-cluster-management.io/controls"]'
    },
    {
      'msgKey':'table.header.standards',
      'resourceKey':'metadata.annotations["policy.open-cluster-management.io/standards"]'
    },
    {
      'msgKey':'table.header.categories',
      'resourceKey':'metadata.annotations["policy.open-cluster-management.io/categories"]'
    }
  ],
  'tableActions':[
    'table.actions.edit',
    'table.actions.remove'
  ],
  'detailKeys':{
    'title':'compliance.details',
    'headerRows':[
      'type',
      'detail'
    ],
    'rows':[
      {
        'cells':[
          {
            'resourceKey':'description.title.name',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.name'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.namespace',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.namespace'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.createdAt',
            'type':'timestamp'
          },
          {
            'resourceKey':'metadata.creationTimestamp'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'table.header.cluster.violation',
            'type':'i18n'
          },
          {
            'resourceKey':'clusterCompliant'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.enforcement',
            'information':'grc.remediation.tooltip',
            'type':'i18n'
          },
          {
            'resourceKey':'raw.spec.remediationAction'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.disabled',
            'type':'i18n'
          },
          {
            'resourceKey':'raw.spec.disabled'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.categories',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.annotations["policy.open-cluster-management.io/categories"]'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.controls',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.annotations["policy.open-cluster-management.io/controls"]'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.standards',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.annotations["policy.open-cluster-management.io/standards"]'
          }
        ]
      }
    ]
  },
  'policyTemplatesKeys':{
    'title':'policy.template.details',
    'headerRows':[
      'description.title.name',
      'description.title.last.transition',
      'description.title.templateType'
    ],
    'rows':[
      {
        'cells':[
          {
            'resourceKey':'name'
          },
          {
            'resourceKey':'lastTransition'
          },
          {
            'resourceKey':'templateType'
          }
        ]
      }
    ]
  },
  'policyRules':{
    'title':'table.header.rules',
    'resourceKey':'rules',
    'defaultSortField':'ruleUID',
    'normalizedKey':'ruleUID',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'ruleUID',
        'key':'ruleUID'
      },
      {
        'msgKey':'table.header.templateType',
        'resourceKey':'templateType',
        'key':'templateType'
      },
      {
        'msgKey':'table.header.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'table.header.apiGroups',
        'resourceKey':'apiGroups',
        'key':'apiGroups'
      },
      {
        'msgKey':'table.header.ruleVerbs',
        'resourceKey':'verbs',
        'key':'verbs'
      },
      {
        'msgKey':'table.header.resources',
        'resourceKey':'resources',
        'key':'resources'
      }
    ]
  },
  'policyViolations':{
    'resourceKey':'violations',
    'title':'table.header.violation.detail',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'table.header.cluster',
        'resourceKey':'cluster',
        'key':'cluster'
      },
      {
        'msgKey':'table.header.message',
        'resourceKey':'message',
        'key':'message'
      },
      {
        'msgKey':'table.header.timestamp',
        'resourceKey':'timestamp',
        'key':'timestamp'
      }
    ]
  },
  'policyInfoKeys':{
    'title':'policy.details',
    'headerRows':[
      'type',
      'detail'
    ],
    'rows':[
      {
        'cells':[
          {
            'resourceKey':'description.title.name',
            'type':'i18n'
          },
          {
            'resourceKey':'name'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'table.header.message',
            'type':'i18n'
          },
          {
            'resourceKey':'message'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.status',
            'type':'i18n'
          },
          {
            'resourceKey':'status'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.enforcement',
            'type':'i18n'
          },
          {
            'resourceKey':'enforcement'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.exclude_namespace',
            'type':'i18n'
          },
          {
            'resourceKey':'detail.exclude_namespace'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.include_namespace',
            'type':'i18n'
          },
          {
            'resourceKey':'detail.include_namespace'
          }
        ]
      }
    ]
  },
  'policyDetailKeys':{
    'title':'policy.details',
    'headerRows':[
      'type',
      'detail'
    ],
    'rows':[
      {
        'cells':[
          {
            'resourceKey':'description.title.name',
            'type':'i18n'
          },
          {
            'resourceKey':'metadata.name'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'table.header.cluster',
            'type':'i18n'
          },
          {
            'resourceKey':'cluster'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'table.header.message',
            'type':'i18n'
          },
          {
            'resourceKey':'status.details'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.status',
            'type':'i18n'
          },
          {
            'resourceKey':'status.compliant'
          }
        ]
      },
      {
        'cells':[
          {
            'resourceKey':'description.title.enforcement',
            'type':'i18n'
          },
          {
            'resourceKey':'enforcement'
          }
        ]
      }
    ]
  },
  'policyRoleTemplates':{
    'title':'table.header.roleTemplates',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'resourceKey':'roleTemplates',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'table.header.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'description.title.api.version',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.compliant',
        'resourceKey':'compliant',
        'key':'compliant'
      }
    ]
  },
  'policyRoleBindingTemplates':{
    'title':'table.header.roleBindingTemplates',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'resourceKey':'roleBindingTemplates',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'table.header.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'description.title.api.version',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.compliant',
        'resourceKey':'compliant',
        'key':'compliant'
      }
    ]
  },
  'policyObjectTemplates':{
    'title':'table.header.objectTemplates',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'resourceKey':'objectTemplates',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'table.header.complianceType',
        'resourceKey':'complianceType',
        'key':'complianceType'
      },
      {
        'msgKey':'description.title.api.version',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.kind',
        'resourceKey':'kind',
        'key':'kind'
      },
      {
        'msgKey':'table.header.compliant',
        'resourceKey':'compliant',
        'key':'compliant'
      }
    ]
  },
  'policyPolicyTemplates':{
    'title':'table.header.policyTemplates',
    'defaultSortField':'name',
    'normalizedKey':'name',
    'resourceKey':'policyTemplates',
    'tableKeys':[
      {
        'msgKey':'table.header.name',
        'resourceKey':'name',
        'key':'name'
      },
      {
        'msgKey':'description.title.api.version',
        'resourceKey':'apiVersion',
        'key':'apiVersion'
      },
      {
        'msgKey':'table.header.kind',
        'resourceKey':'kind',
        'key':'kind'
      },
      {
        'msgKey':'table.header.compliant',
        'resourceKey':'compliant',
        'key':'compliant'
      }
    ]
  }
}

export const policiesClusterDetail = [
  {
    'cluster':'calamari',
    'metadata':{
      'name':'default.policy-certificatepolicy',
      'namespace':'calamari',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/default.policy-certificatepolicy',
      'creationTimestamp':'2020-06-05T13:13:17Z',
      'annotations':{
        'policy.open-cluster-management.io/categories':'PR.DS Data Security',
        'policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
        'policy.open-cluster-management.io/standards':'NIST-CSF'
      },
      'labels':{
        'policy.open-cluster-management.io/cluster-name':'calamari',
        'policy.open-cluster-management.io/cluster-namespace':'calamari',
        'policy.open-cluster-management.io/root-policy':'default.policy-certificatepolicy'
      },
      'resourceVersion':'55464942',
      'uid':'21615207-e76f-49ab-ba52-9af6c8a8f833',
      '__typename':'Metadata'
    },
    'enforcement':'inform',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'PR.DS Data Security',
          'policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit',
          'policy.open-cluster-management.io/standards':'NIST-CSF'
        },
        'creationTimestamp':'2020-06-05T13:13:17Z',
        'generation':1,
        'labels':{
          'policy.open-cluster-management.io/cluster-name':'calamari',
          'policy.open-cluster-management.io/cluster-namespace':'calamari',
          'policy.open-cluster-management.io/root-policy':'default.policy-certificatepolicy'
        },
        'name':'default.policy-certificatepolicy',
        'namespace':'calamari',
        'ownerReferences':[
          {
            'apiVersion':'policy.open-cluster-management.io/v1',
            'blockOwnerDeletion':true,
            'controller':true,
            'kind':'Policy',
            'name':'policy-certificatepolicy',
            'uid':'c6ee3116-1ac5-441a-80a7-9647a8ce2fcb'
          }
        ],
        'resourceVersion':'55464942',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/default.policy-certificatepolicy',
        'uid':'21615207-e76f-49ab-ba52-9af6c8a8f833'
      },
      'spec':{
        'disabled':false,
        'policy-templates':[
          {
            'objectDefinition':{
              'apiVersion':'policy.open-cluster-management.io/v1',
              'kind':'CertificatePolicy',
              'metadata':{
                'name':'policy-certificatepolicy-example'
              },
              'spec':{
                'minimumDuration':'300h',
                'namespaceSelector':{
                  'exclude':[
                    'kube-*'
                  ],
                  'include':[
                    'default'
                  ]
                },
                'remediationAction':'inform',
                'severity':'low'
              }
            }
          }
        ],
        'remediationAction':'inform'
      },
      'status':{
        'compliant':'NonCompliant',
        'details':[
          {
            'compliant':'NonCompliant',
            'history':[
              {
                'eventName':'default.policy-certificatepolicy.1616ef45443c6f0a',
                'lastTimestamp':'2020-06-15T15:00:07Z',
                'message':'NonCompliant; 1 certificates expire in less than 300h0m0s: default:rsa-ca-sample-secret'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:52:49Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:52:39Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:52:29Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:52:19Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:52:09Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:51:59Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:51:49Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:51:39Z',
                'message':'Compliant'
              },
              {
                'eventName':'default.policy-certificatepolicy.1615a80b722fc540',
                'lastTimestamp':'2020-06-09T14:51:29Z',
                'message':'Compliant'
              }
            ],
            'templateMeta':{
              'creationTimestamp':null,
              'name':'policy-certificatepolicy-example'
            }
          }
        ]
      }
    },
    'roleTemplates':[

    ],
    'roleBindingTemplates':[

    ],
    'objectTemplates':[

    ],
    'policyTemplates':[
      {
        'name':'policy-certificatepolicy-example',
        'kind':'CertificatePolicy',
        'lastTransition':'',
        'complianceType':'',
        'apiVersion':'policy.open-cluster-management.io/v1',
        'status':'NonCompliant',
        'raw':{
          'objectDefinition':{
            'apiVersion':'policy.open-cluster-management.io/v1',
            'kind':'CertificatePolicy',
            'metadata':{
              'name':'policy-certificatepolicy-example'
            },
            'spec':{
              'minimumDuration':'300h',
              'namespaceSelector':{
                'exclude':[
                  'kube-*'
                ],
                'include':[
                  'default'
                ]
              },
              'remediationAction':'inform',
              'severity':'low'
            }
          },
          'templateType':'policy-templates'
        },
        '__typename':'PolicyTemplate'
      }
    ],
    'violations':[
      {
        'name':'policy-certificatepolicy-example',
        'cluster':'calamari',
        'message':'NonCompliant; 1 certificates expire in less than 300h0m0s: default:rsa-ca-sample-secret',
        'timestamp':'2020-06-15T15:00:07Z',
        '__typename':'Violations'
      }
    ],
    'rules':[

    ],
    '__typename':'Policy'
  }
]

export const policiesClusterDetailError = {
  'graphQLErrors':[

  ],
  'networkError':{
    'response':{

    },
    'statusCode':504,
    'bodyText':'Error occured while trying to proxy to: localhost:3000/graphql'
  },
  'message':'Network error: JSON.parse: unexpected character at line 1 column 1 of the JSON data'
}
