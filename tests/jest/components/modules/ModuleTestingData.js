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


export const findingsTestingDataSet1 = [
  {
    'name':'id-mycluster-account/providers/security-advisor/occurrences/secret-4093fbf9-765f-11e9-9e07-00163e01db7b',
    'shortDescription':'Policy that is not compliant',
    'finding':{
      'severity':'HIGH',
      'certainty':'HIGH',
      'networkConnection':null,
      'nextSteps':[
        {
          'title':'View the details for the compliance problem in the occurrence of the findings.',
          'url':null
        }
      ],
      'dataTransferred':null
    },
    'reportedBy':{
      'id':'mcm-policy-adapter',
      'title':'Security Advisor MCM Policy Findings Adapter',
      'url':null
    },
    'context':{
      'accountId':'id-mycluster-account',
      'region':null,
      'resourceType':'Secret',
      'resourceName':'other-auth-secret',
      'resourceId':'4093fbf9-765f-11e9-9e07-00163e01db7b',
      'resourceCrn':null,
      'serviceName':null,
      'serviceCrn':null,
      'clusterName':'mycluster_name',
      'namespaceName':'kube-system'
    },
    'securityClassification':{
      'securityStandards':[
        'NIST',
        'CIS'
      ],
      'securityCategories':[
        'System and communications protections'
      ],
      'securityControl':'test'
    },
    '__typename':'Occurrence'
  },
  {
    'name':'id-mycluster-account/providers/security-advisor/occurrences/secret-4093fbf5-765f-11e9-9e07-00163e01db7b',
    'shortDescription':'Policy that is not compliant',
    'finding':{
      'severity':'HIGH',
      'certainty':'HIGH',
      'networkConnection':null,
      'nextSteps':[
        {
          'title':'View the details for the compliance problem in the occurrence of the findings.',
          'url':null
        }
      ],
      'dataTransferred':null
    },
    'reportedBy':{
      'id':'mcm-policy-adapter',
      'title':'Security Advisor MCM Policy Findings Adapter',
      'url':null
    },
    'context':{
      'accountId':'id-mycluster-account',
      'region':null,
      'resourceType':'Secret',
      'resourceName':'platform-auth-secret',
      'resourceId':'4093fbf5-765f-11e9-9e07-00163e01db7b',
      'resourceCrn':null,
      'serviceName':null,
      'serviceCrn':null,
      'clusterName':'cluster1',
      'namespaceName':'kube-system'
    },
    'securityClassification':{
      'securityStandards':[
        'NIST',
        'CIS'
      ],
      'securityCategories':[
        'System and communications protections'
      ],
      'securityControl':'test'
    },
    '__typename':'Occurrence'
  },
  {
    'name':'id-mycluster-account/providers/security-advisor/occurrences/secret-94fe9769-765f-11e9-9e07-00163e01db7b',
    'shortDescription':'Policy that is not compliant',
    'finding':{
      'severity':'HIGH',
      'certainty':'HIGH',
      'networkConnection':null,
      'nextSteps':[
        {
          'title':'View the details for the compliance problem in the occurrence of the findings.',
          'url':null
        }
      ],
      'dataTransferred':null
    },
    'reportedBy':{
      'id':'mcm-policy-adapter',
      'title':'Security Advisor MCM Policy Findings Adapter',
      'url':null
    },
    'context':{
      'accountId':'id-mycluster-account',
      'region':null,
      'resourceType':'Secret',
      'resourceName':'multicluster_name-hub-search-secrets',
      'resourceId':'94fe9769-765f-11e9-9e07-00163e01db7b',
      'resourceCrn':null,
      'serviceName':null,
      'serviceCrn':null,
      'clusterName':'clusterhub',
      'namespaceName':'kube-system'
    },
    'securityClassification':{
      'securityStandards':[
        'NIST',
        'CIS'
      ],
      'securityCategories':[
        'System and communications protections'
      ],
      'securityControl':'test'
    },
    '__typename':'Occurrence'
  }
]

export const policiesTestingDataSet1 = [
  {
    'metadata':{
      'name':'compliance-all',
      'namespace':'mcm',
      'selfLink':'/apis/compliance.policy.open-cluster-management.io/v1/namespaces/mcm/compliances/compliance-all',
      'annotations':{
        'seed-generation':'1'
      },
      'resourceVersion':'1071070',
      '__typename':'Metadata'
    },
    'name':'compliance-all',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'compliance.mcm.ibm.com/v1alpha1',
      'kind':'Compliance',
      'metadata':{
        'annotations':{
          'seed-generation':'1'
        },
        'creationTimestamp':'2019-05-21T14:02:49Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':6,
        'name':'compliance-all',
        'namespace':'mcm',
        'resourceVersion':'1071070',
        'selfLink':'/apis/compliance.policy.open-cluster-management.io/v1/namespaces/mcm/compliances/compliance-all',
        'uid':'1e04ec63-7bd1-11e9-820c-005056a061f1'
      },
      'spec':{
        'runtime-rules':[
          {
            'apiVersion':'policy.open-cluster-management.io/v1',
            'kind':'Policy',
            'metadata':{
              'creationTimestamp':null,
              'labels':{
                'cis-docker':'true'
              },
              'name':'policy-comp'
            },
            'spec':{
              'complianceType':'musthave',
              'namespaces':{
                'exclude':[
                  'kube*'
                ],
                'include':[
                  'default'
                ]
              },
              'object-templates':[
                {
                  'complianceType':'musthave',
                  'objectDefinition':{
                    'apiVersion':'rbac.authorization.k8s.io/v1',
                    'kind':'RoleBinding',
                    'metadata':{
                      'name':'operate-pods-rolebinding',
                      'namespace':'default'
                    },
                    'roleRef':{
                      'apiGroup':'rbac.authorization.k8s.io',
                      'kind':'Role',
                      'name':'operator'
                    },
                    'subjects':[
                      {
                        'apiGroup':'rbac.authorization.k8s.io',
                        'kind':'User',
                        'name':'admin'
                      }
                    ]
                  },
                  'status':{
                    'Validity':{

                    }
                  }
                },
                {
                  'complianceType':'musthave',
                  'objectDefinition':{
                    'apiVersion':'policy/v1beta1',
                    'kind':'PodSecurityPolicy',
                    'metadata':{
                      'annotations':{
                        'seccomp.security.alpha.kubernetes.io/allowedProfileNames':'*'
                      },
                      'name':'restricted-mcm'
                    },
                    'spec':{
                      'allowPrivilegeEscalation':false,
                      'allowedCapabilities':[
                        '*'
                      ],
                      'fsGroup':{
                        'rule':'RunAsAny'
                      },
                      'hostIPC':false,
                      'hostNetwork':true,
                      'hostPID':false,
                      'hostPorts':[
                        {
                          'max':65535,
                          'min':1000
                        }
                      ],
                      'privileged':false,
                      'runAsUser':{
                        'rule':'RunAsAny'
                      },
                      'seLinux':{
                        'rule':'RunAsAny'
                      },
                      'supplementalGroups':{
                        'rule':'RunAsAny'
                      },
                      'volumes':[
                        '*'
                      ]
                    }
                  },
                  'status':{
                    'Validity':{

                    }
                  }
                },
                {
                  'complianceType':'musthave',
                  'objectDefinition':{
                    'apiVersion':'networking.k8s.io/v1',
                    'kind':'NetworkPolicy',
                    'metadata':{
                      'name':'deny-from-other-namespaces',
                      'namespace':'default'
                    },
                    'spec':{
                      'ingress':[
                        {
                          'from':[
                            {
                              'podSelector':{

                              }
                            }
                          ]
                        }
                      ],
                      'podSelector':{
                        'matchLabels':null
                      }
                    }
                  },
                  'status':{
                    'Validity':{

                    }
                  }
                },
                {
                  'complianceType':'musthave',
                  'objectDefinition':{
                    'apiVersion':'v1',
                    'kind':'LimitRange',
                    'metadata':{
                      'name':'mem-limit-range'
                    },
                    'spec':{
                      'limits':[
                        {
                          'default':{
                            'memory':'512Mi'
                          },
                          'defaultRequest':{
                            'memory':'256Mi'
                          },
                          'type':'Container'
                        }
                      ]
                    }
                  },
                  'status':{
                    'Validity':{

                    }
                  }
                }
              ],
              'remediationAction':'inform',
              'role-templates':[
                {
                  'apiVersion':'roletemplate.mcm.ibm.com/v1alpha1',
                  'complianceType':'musthave',
                  'metadata':{
                    'creationTimestamp':null,
                    'name':'operator-role'
                  },
                  'rules':[
                    {
                      'complianceType':'mustnothave',
                      'policyRule':{
                        'apiGroups':[
                          'core'
                        ],
                        'resources':[
                          'secrets'
                        ],
                        'verbs':[
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
                      'complianceType':'musthave',
                      'policyRule':{
                        'apiGroups':[
                          'core'
                        ],
                        'resources':[
                          'pods'
                        ],
                        'verbs':[
                          'get',
                          'list',
                          'watch'
                        ]
                      }
                    }
                  ],
                  'selector':{
                    'matchLabels':{
                      'dev':'true'
                    }
                  },
                  'status':{
                    'Validity':{

                    }
                  }
                }
              ]
            },
            'status':{

            }
          }
        ]
      },
      'status':{
        'placementBindings':[
          'binding-comp'
        ],
        'placementPolicies':[
          'placement-comp'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              'policy-comp':{
                'compliant':'NonCompliant',
                'valid':true
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              'policy-comp':{
                'compliant':'NonCompliant',
                'valid':true
              }
            },
            'clustername':'clusterhub',
            'compliant':'NonCompliant'
          }
        }
      }
    },
    'remediation':'',
    'policyCompliant':'2/2',
    'clusterCompliant':'2/2',
    'clusterNS': {
      'beldams': 'beldams',
      'cetane': 'cetane',
      'djebel': 'djebel',
    },
    'placementPolicies':[
      {
        'metadata':{
          'name':'placement-comp',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-comp',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'binding-comp',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-comp',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
  {
    'metadata':{
      'name':'policy-ma',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor',
        'policy.open-cluster-management.io/standards':'NIST',
        'seed-generation':'1'
      },
      'resourceVersion':'1308515',
      '__typename':'Metadata'
    },
    'name':'policy-ma',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor',
          'policy.open-cluster-management.io/standards':'NIST',
          'seed-generation':'1'
        },
        'creationTimestamp':'2019-05-17T12:58:05Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':22,
        'name':'policy-ma',
        'namespace':'mcm',
        'resourceVersion':'1308515',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
        'uid':'692d81a1-78a3-11e9-820c-005056a061f1'
      },
      'spec':{
        'namespaces':{

        },
        'policy-templates':[
          {
            'objectDefinition':{
              'apiVersion':'policies.ibm.com/v1alpha1',
              'kind':'MutationPolicy',
              'metadata':{
                'label':{
                  'category':'System-Integrity'
                },
                'name':'mutation-policy-example'
              },
              'spec':{
                'conditions':{
                  'ownership':[
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
                },
                'namespaceSelector':{
                  'exclude':[
                    'kube-system'
                  ],
                  'include':[
                    'default',
                    'kube-*'
                  ]
                },
                'remediationAction':'enforce'
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'enforce'
      },
      'status':{
        'placementBindings':[
          'binding-ma'
        ],
        'placementPolicies':[
          'placement-ma'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              'policy-ma':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              'policy-ma':{
                'compliant':'Compliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'Compliant'
          }
        }
      }
    },
    'remediation':'enforce',
    'policyCompliant':'1/2',
    'clusterCompliant':'1/2',
    'clusterNS': {
      'beldams': 'beldams',
      'cetane': 'cetane',
      'djebel': 'djebel',
    },
    'placementPolicies':[
      {
        'metadata':{
          'name':'placement-ma',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-ma',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'binding-ma',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-ma',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
  {
    'metadata':{
      'name':'policy-pod',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
        'policy.open-cluster-management.io/standards':'NIST,HIPAA',
        'seed-generation':'1'
      },
      'resourceVersion':'131792',
      '__typename':'Metadata'
    },
    'name':'policy-pod',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
          'policy.open-cluster-management.io/standards':'NIST,HIPAA',
          'seed-generation':'1'
        },
        'creationTimestamp':'2019-05-17T12:57:48Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':7,
        'name':'policy-pod',
        'namespace':'mcm',
        'resourceVersion':'131792',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
        'uid':'5f3aea80-78a3-11e9-820c-005056a061f1'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'v1',
              'kind':'Pod',
              'metadata':{
                'name':'nginx-pod'
              },
              'spec':{
                'containers':[
                  {
                    'image':'nginx:1.7.9',
                    'name':'nginx',
                    'ports':[
                      {
                        'containerPort':80
                      }
                    ]
                  }
                ]
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'inform'
      },
      'status':{
        'placementBindings':[
          'binding-pod'
        ],
        'placementPolicies':[
          'placement-pod'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              'policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              'policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'NonCompliant'
          }
        }
      }
    },
    'remediation':'inform',
    'policyCompliant':'2/2',
    'clusterCompliant':'2/2',
    'placementPolicies':[
      {
        'metadata':{
          'name':'placement-pod',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-pod',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'binding-pod',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-pod',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
]

export const policiesTestingDataSet2 = [
  {
    'metadata':{
      'name':'1558374675051-policy-pod',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1558374675051-policy-pod',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
        'policy.open-cluster-management.io/standards':'NIST CSF',
        'seed-generation':'2'
      },
      'resourceVersion':'6281988',
      '__typename':'Metadata'
    },
    'name':'1558374675051-policy-pod',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
          'policy.open-cluster-management.io/standards':'NIST CSF',
          'seed-generation':'2'
        },
        'creationTimestamp':'2019-05-20T17:51:38Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':6,
        'name':'1558374675051-policy-pod',
        'namespace':'mcm',
        'resourceVersion':'6281988',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1558374675051-policy-pod',
        'uid':'eacbfd03-7b27-11e9-a751-005056a0b88e'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'v1',
              'kind':'Pod',
              'metadata':{
                'name':'nginx1'
              },
              'spec':{
                'containers':[
                  {
                    'image':'nginx:1.7.9',
                    'name':'nginx',
                    'ports':[
                      {
                        'containerPort':80
                      }
                    ]
                  }
                ]
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'inform'
      },
      'status':{
        'placementBindings':[
          '1558374675051-placement-binding-test'
        ],
        'placementPolicies':[
          '1558374675051-placement-policy-test'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              '1558374675051-policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              '1558374675051-policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'NonCompliant'
          }
        }
      }
    },
    'remediation':'inform',
    'policyCompliant':'2/2',
    'clusterCompliant':'2/2',
    'clusterNS': {
      'beldams': 'beldams',
      'cetane': 'cetane',
      'djebel': 'djebel',
    },
    'placementPolicies':[
      {
        'metadata':{
          'name':'1558374675051-placement-policy-test',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/1558374675051-placement-policy-test',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'1558374675051-placement-binding-test',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/1558374675051-placement-binding-test',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
  {
    'metadata':{
      'name':'1558382034240-policy-pod',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1558382034240-policy-pod',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
        'policy.open-cluster-management.io/standards':'NIST CSF, NIST',
        'seed-generation':'2'
      },
      'resourceVersion':'6975805',
      '__typename':'Metadata'
    },
    'name':'1558382034240-policy-pod',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
          'policy.open-cluster-management.io/standards':'NIST CSF, NIST',
          'seed-generation':'2'
        },
        'creationTimestamp':'2019-05-20T19:54:18Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':11,
        'name':'1558382034240-policy-pod',
        'namespace':'mcm',
        'resourceVersion':'6975805',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1558382034240-policy-pod',
        'uid':'0d98fa74-7b39-11e9-a751-005056a0b88e'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'v1',
              'kind':'Pod',
              'metadata':{
                'name':'nginx1'
              },
              'spec':{
                'containers':[
                  {
                    'image':'nginx:1.7.9',
                    'name':'nginx',
                    'ports':[
                      {
                        'containerPort':80
                      }
                    ]
                  }
                ]
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'inform'
      },
      'status':{
        'placementBindings':[
          '1558382034240-placement-binding-test'
        ],
        'placementPolicies':[
          '1558382034240-placement-policy-test'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              '1558382034240-policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              '1558382034240-policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'NonCompliant'
          }
        }
      }
    },
    'remediation':'inform',
    'policyCompliant':'2/2',
    'clusterCompliant':'2/2',
    'placementPolicies':[
      {
        'metadata':{
          'name':'1558382034240-placement-policy-test',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/1558382034240-placement-policy-test',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'1558382034240-placement-binding-test',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/1558382034240-placement-binding-test',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
  {
    'metadata':{
      'name':'policy-ma',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor',
        'policy.open-cluster-management.io/standards':'NIST CSF, NIST',
        'seed-generation':'1'
      },
      'resourceVersion':'6975864',
      '__typename':'Metadata'
    },
    'name':'policy-ma',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor',
          'policy.open-cluster-management.io/standards':'NIST CSF, NIST',
          'seed-generation':'1'
        },
        'creationTimestamp':'2019-05-16T15:21:53Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':48,
        'name':'policy-ma',
        'namespace':'mcm',
        'resourceVersion':'6975864',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
        'uid':'55ca144d-77ee-11e9-a751-005056a0b88e'
      },
      'spec':{
        'namespaces':{

        },
        'policy-templates':[
          {
            'objectDefinition':{
              'apiVersion':'policies.ibm.com/v1alpha1',
              'kind':'MutationPolicy',
              'metadata':{
                'label':{
                  'category':'System-Integrity'
                },
                'name':'mutation-policy-example'
              },
              'spec':{
                'conditions':{
                  'ownership':[
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
                },
                'namespaceSelector':{
                  'exclude':[
                    'kube-system'
                  ],
                  'include':[
                    'default',
                    'kube-*'
                  ]
                },
                'remediationAction':'enforce'
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'enforce'
      },
      'status':{
        'placementBindings':[
          'binding-ma'
        ],
        'placementPolicies':[
          'placement-ma'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              'policy-ma':{
                'compliant':'Compliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'Compliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              'policy-ma':{
                'compliant':'Compliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'Compliant'
          }
        }
      }
    },
    'remediation':'enforce',
    'policyCompliant':'0/2',
    'clusterCompliant':'0/2',
    'placementPolicies':[
      {
        'metadata':{
          'name':'placement-ma',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-ma',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'binding-ma',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-ma',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
  {
    'metadata':{
      'name':'policy-pod',
      'namespace':'mcm',
      'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
        'policy.open-cluster-management.io/standards':'NIST,HIPAA',
        'seed-generation':'1'
      },
      'resourceVersion':'5210306',
      '__typename':'Metadata'
    },
    'name':'policy-pod',
    'namespace':'mcm',
    'raw':{
      'apiVersion':'policy.open-cluster-management.io/v1',
      'kind':'Policy',
      'metadata':{
        'annotations':{
          'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls':'MutationAdvisor,,VA',
          'policy.open-cluster-management.io/standards':'NIST,HIPAA',
          'seed-generation':'1'
        },
        'creationTimestamp':'2019-05-16T15:23:05Z',
        'finalizers':[
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation':12,
        'name':'policy-pod',
        'namespace':'mcm',
        'resourceVersion':'5210306',
        'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
        'uid':'80b48466-77ee-11e9-a751-005056a0b88e'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'v1',
              'kind':'Pod',
              'metadata':{
                'name':'nginx-pod'
              },
              'spec':{
                'containers':[
                  {
                    'image':'nginx:1.7.9',
                    'name':'nginx',
                    'ports':[
                      {
                        'containerPort':80
                      }
                    ]
                  }
                ]
              }
            },
            'status':{
              'Validity':{

              }
            }
          }
        ],
        'remediationAction':'inform'
      },
      'status':{
        'placementBindings':[
          'binding-pod'
        ],
        'placementPolicies':[
          'placement-pod'
        ],
        'status':{
          'cluster1':{
            'aggregatePoliciesStatus':{
              'policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'cluster1',
            'compliant':'NonCompliant'
          },
          'clusterhub':{
            'aggregatePoliciesStatus':{
              'policy-pod':{
                'compliant':'NonCompliant'
              }
            },
            'clustername':'clusterhub',
            'compliant':'NonCompliant'
          }
        }
      }
    },
    'remediation':'inform',
    'policyCompliant':'2/2',
    'clusterCompliant':'2/2',
    'clusterNS': {
      'beldams': 'beldams',
      'cetane': 'cetane',
      'djebel': 'djebel',
    },
    'placementPolicies':[
      {
        'metadata':{
          'name':'placement-pod',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-pod',
          '__typename':'Metadata'
        },
        '__typename':'PlacementPolicy'
      }
    ],
    'placementBindings':[
      {
        'metadata':{
          'name':'binding-pod',
          'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-pod',
          '__typename':'Metadata'
        },
        '__typename':'PlacementBinding'
      }
    ],
    '__typename':'Compliance'
  },
]

export const policiesTestingDataSet3 = [
  {'metadata':{'name':'case6-test-policy','namespace':'default','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy','annotations':{'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS Data Security","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policy.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n','policy.open-cluster-management.io/categories':'PR.DS Data Security','policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit','policy.open-cluster-management.io/standards':'NIST-CSF'},'resourceVersion':'37198197','__typename':'Metadata'},'name':'case6-test-policy','namespace':'default','raw':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'Policy','metadata':{'annotations':{'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS Data Security","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policy.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n','policy.open-cluster-management.io/categories':'PR.DS Data Security','policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit','policy.open-cluster-management.io/standards':'NIST-CSF'},'creationTimestamp':'2020-05-27T14:36:05Z','generation':1,'name':'case6-test-policy','namespace':'default','resourceVersion':'37198197','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy','uid':'ed964170-b17d-4e23-880e-575be3eac901'},'spec':{'disabled':false,'policy-templates':[{'objectDefinition':{'apiVersion':'policies.ibm.com/v1alpha1','kind':'TrustedContainerPolicy','metadata':{'name':'case6-test-policy-trustedcontainerpolicy'},'spec':{'imageRegistry':'quay.io','namespaceSelector':{'exclude':['kube-system','default'],'include':['e2e-test']},'remediationAction':'inform','severity':'low'}}},{'objectDefinition':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'ConfigurationPolicy','metadata':{'name':'case6-policy-role-example'},'spec':{'namespaceSelector':{'exclude':['kube-*'],'include':['default']},'object-templates':[{'complianceType':'mustonlyhave','objectDefinition':{'apiVersion':'rbac.authorization.k8s.io/v1','kind':'Role','metadata':{'name':'policy-role-example'},'rules':[{'apiGroups':['extensions','apps'],'resources':['deployments'],'verbs':['get','list','watch','delete','patch']}]}}],'remediationAction':'inform','severity':'high'}}}],'remediationAction':'inform'},'status':{'placement':[{'placementBinding':'case6-test-policy-pb','placementRule':'case6-test-policy-plr'}],'status':[{'clustername':'calamari','clusternamespace':'calamari','compliant':'NonCompliant'}]}},'remediation':'inform','policyCompliant':'0/0','clusterCompliant':'1/1','clusterNS':{'calamari':'calamari'},'clusterConsoleURL':{'calamari':'https://console-openshift-console.apps.calamari.dev08.red-chesterfield.com'},'placementPolicies':[{'metadata':{'name':'case6-test-policy-plr','selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr','__typename':'Metadata'},'__typename':'PlacementPolicy'}],'placementBindings':[{'metadata':{'name':'case6-test-policy-pb','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb','__typename':'Metadata'},'__typename':'PlacementBinding'}],'__typename':'Compliance'},
  {'metadata':{'name':'policy-rolebinding','namespace':'default','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-rolebinding','annotations':{'policy.open-cluster-management.io/categories':'PR.AC Identity Management Authentication and Access Control','policy.open-cluster-management.io/controls':'PR.AC-4 Access Control','policy.open-cluster-management.io/standards':'NIST-CSF'},'resourceVersion':'37491359','__typename':'Metadata'},'name':'policy-rolebinding','namespace':'default','raw':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'Policy','metadata':{'annotations':{'policy.open-cluster-management.io/categories':'PR.AC Identity Management Authentication and Access Control','policy.open-cluster-management.io/controls':'PR.AC-4 Access Control','policy.open-cluster-management.io/standards':'NIST-CSF'},'creationTimestamp':'2020-05-27T13:23:03Z','generation':7,'name':'policy-rolebinding','namespace':'default','resourceVersion':'37491359','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-rolebinding','uid':'f5f5ad1b-8acc-4814-9560-9edd3ace6fba'},'spec':{'disabled':false,'policy-templates':[{'objectDefinition':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'ConfigurationPolicy','metadata':{'name':'policy-rolebinding-example'},'spec':{'namespaceSelector':{'exclude':['kube-*'],'include':['default']},'object-templates':[{'complianceType':'musthave','objectDefinition':{'apiVersion':'rbac.authorization.k8s.io/v1','kind':'RoleBinding','metadata':{'name':'operate-pods-rolebinding'},'roleRef':{'apiGroup':'rbac.authorization.k8s.io','kind':'Role','name':'operator'},'subjects':[{'apiGroup':'rbac.authorization.k8s.io','kind':'User','name':'admin'}]}}],'remediationAction':'inform','severity':'high'}}}],'remediationAction':'inform'},'status':{'placement':[{'placementBinding':'binding-policy-rolebinding','placementRule':'placement-policy-rolebinding'}],'status':[{'clustername':'calamari','clusternamespace':'calamari','compliant':'NonCompliant'}]}},'remediation':'inform','policyCompliant':'0/0','clusterCompliant':'1/1','clusterNS':{'calamari':'calamari'},'clusterConsoleURL':{'calamari':'https://console-openshift-console.apps.calamari.dev08.red-chesterfield.com'},'placementPolicies':[{'metadata':{'name':'placement-policy-rolebinding','selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/placement-policy-rolebinding','__typename':'Metadata'},'__typename':'PlacementPolicy'}],'placementBindings':[{'metadata':{'name':'binding-policy-rolebinding','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/binding-policy-rolebinding','__typename':'Metadata'},'__typename':'PlacementBinding'}],'__typename':'Compliance'}
]

export const policieSubResourceListTestingResourceData = {
  'headerRows': [
    '',
    'table.header.cluster.name',
    'table.header.rule.violation',
    ''
  ],
  'subHeaders': [
    'table.header.name',
    'table.header.message',
    'table.header.reason'
  ],
  'rows': [
    {
      'cells': [
        {
          'resourceKey': 'metadata.name'
        },
        {
          'resourceKey': 'violated'
        },
        {
          'resourceKey': 'spec.consoleURL'
        }
      ]
    }
  ]
}

export const policieSubResourceListTestingItemData = [
  {
    'name': 'cluster1',
    'metadata': {
      'labels': {
        'cloud': 'IBM',
        'datacenter': 'toronto',
        'environment': 'Dev',
        'name': 'cluster1',
        'owner': 'marketing',
        'region': 'US',
        'vendor': 'ICP'
      },
      'name': 'cluster1',
      'namespace': 'cluster1',
      'annotations': {
        'mcm.ibm.com/deployer-prefix': 'md',
        'mcm.ibm.com/secretRef': 'cluster1-federation-secret',
        'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
        'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXIxOmNsdXN0ZXIx'
      },
      'uid': '54f29807-8b85-11e9-9f14-c233a33df5d1',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/clusterstatuses/cluster1',
      '__typename': 'Metadata'
    },
    'kind': 'Cluster',
    'apiVersion': 'clusterregistry.k8s.io/v1alpha1',
    'spec': {
      'consoleURL': 'https://9.42.78.148:8443'
    },
    'status': {
      'conditions': [
        {
          'type': 'OK',
          'status': '',
          'lastHeartbeatTime': '2019-06-12T13:46:04Z',
          'lastTransitionTime': '2019-06-10T13:42:11Z'
        }
      ]
    },
    'total': '1',
    'violated': '1',
    'policy': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '7998'
        },
        'creationTimestamp': '2019-06-10T20:09:44Z',
        'finalizers': [
          'policy.finalizer.mcm.ibm.com',
          'sync.finalizer.mcm.ibm.com'
        ],
        'generation': 7998,
        'name': 'policy-ma',
        'namespace': 'cluster1',
        'resourceVersion': '3385191',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-ma',
        'uid': 'b08122bd-8bbb-11e9-af27-005056a0e992'
      },
      'spec': {
        'namespaces': {},
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'policies.ibm.com/v1alpha1',
              'kind': 'MutationPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'mutation-policy-example'
              },
              'spec': {
                'conditions': {
                  'ownership': [
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
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
                'remediationAction': 'enforce'
              }
            },
            'status': {
              'Compliant': 'NonCompliant',
              'Validity': {},
              'conditions': [
                {
                  'lastTransitionTime': '2019-06-12T05:50:40Z',
                  'message': 'NonCompliant; 4 mutated pods detected in namespace `default`; 0 mutated pods detected in namespace `kube-public`',
                  'reason': 'policy: cluster1/mutation-policy-example',
                  'status': 'True',
                  'type': 'completed'
                }
              ]
            }
          }
        ],
        'remediationAction': 'enforce'
      },
      'status': {
        'compliant': 'NonCompliant'
      }
    },
    '__typename': 'ClusterInfo',
    'id': 'cluster1',
    'subItems': [
      {
        'id': 'mutation-policy-example',
        'cells': [
          'mutation-policy-example',
          'NonCompliant; 4 mutated pods detected in namespace `default`; 0 mutated pods detected in namespace `kube-public`',
          'policy: cluster1/mutation-policy-example'
        ]
      }
    ]
  },
  {
    'name': 'clusterhub',
    'metadata': {
      'labels': {
        'cloud': 'IBM',
        'datacenter': 'toronto',
        'environment': 'Dev',
        'name': 'clusterhub',
        'owner': 'marketing',
        'region': 'US',
        'vendor': 'ICP'
      },
      'name': 'clusterhub',
      'namespace': 'clusterhub',
      'annotations': {
        'mcm.ibm.com/deployer-prefix': 'md',
        'mcm.ibm.com/secretRef': 'clusterhub-federation-secret',
        'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
        'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXJodWI6Y2x1c3Rlcmh1Yg=='
      },
      'uid': '3847014b-8b85-11e9-9f14-c233a33df5d1',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/clusterhub/clusterstatuses/clusterhub',
      '__typename': 'Metadata'
    },
    'kind': 'Cluster',
    'apiVersion': 'clusterregistry.k8s.io/v1alpha1',
    'spec': {
      'consoleURL': 'https://9.42.81.137:8443'
    },
    'status': {
      'conditions': [
        {
          'type': 'OK',
          'status': '',
          'lastHeartbeatTime': '2019-06-12T13:46:21Z',
          'lastTransitionTime': null
        }
      ]
    },
    'total': '1',
    'violated': '0',
    'policy': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '7736'
        },
        'creationTimestamp': '2019-06-10T13:44:41Z',
        'finalizers': [
          'propagator.finalizer.mcm.ibm.com',
          'policy.finalizer.mcm.ibm.com'
        ],
        'generation': 7736,
        'name': 'policy-ma',
        'namespace': 'clusterhub',
        'ownerReferences': [
          {
            'apiVersion': 'policy.open-cluster-management.io/v1',
            'blockOwnerDeletion': true,
            'controller': true,
            'kind': 'Policy',
            'name': 'policy-ma',
            'uid': 'd3aa0bb6-8b85-11e9-983e-005056a061f1'
          }
        ],
        'resourceVersion': '3382035',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/clusterhub/policies/policy-ma',
        'uid': 'e5961247-8b85-11e9-983e-005056a061f1'
      },
      'spec': {
        'namespaces': {},
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'policies.ibm.com/v1alpha1',
              'kind': 'MutationPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'mutation-policy-example'
              },
              'spec': {
                'conditions': {
                  'ownership': [
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
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
                'remediationAction': 'enforce'
              }
            },
            'status': {
              'Compliant': 'Compliant',
              'Validity': {},
              'conditions': [
                {
                  'lastTransitionTime': '2019-06-12T05:59:28Z',
                  'message': 'Compliant; 0 mutated pods detected in namespace `default`; 0 mutated pods detected in namespace `kube-public`',
                  'reason': 'policy: clusterhub/mutation-policy-example',
                  'status': 'True',
                  'type': 'completed'
                }
              ]
            }
          }
        ],
        'remediationAction': 'enforce'
      },
      'status': {
        'compliant': 'Compliant'
      }
    },
    '__typename': 'ClusterInfo',
    'id': 'clusterhub',
    'subItems': [
      {
        'id': 'inapplicable1',
        'cells': [
          'N/A',
          'N/A ',
          'N/A  '
        ]
      }
    ]
  }
]

export const clusterSubResourceListTestingResourceData = {
  'headerRows': [
    '',
    'table.header.policy.name',
    'table.header.rule.violation',
    'table.header.control'
  ],
  'subHeaders': [
    'table.header.name',
    'table.header.message',
    'table.header.reason'
  ],
  'rows': [
    {
      'cells': [
        {
          'resourceKey': 'metadata.name'
        },
        {
          'resourceKey': 'violatedNum'
        },
        {
          'resourceKey': 'metadata.annotations["policy.open-cluster-management.io/controls"]'
        }
      ]
    }
  ]
}

export const clusterSubResourceListTestingItemData = [
  {
    'cluster': null,
    'metadata': {
      'name': 'policy-ma',
      'namespace': 'cluster1',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-ma',
      'creationTimestamp': '2019-06-10T20:09:44Z',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'NIST',
        'seed-generation': '7998'
      },
      'resourceVersion': '3385191',
      'uid': 'b08122bd-8bbb-11e9-af27-005056a0e992',
      '__typename': 'Metadata'
    },
    'status': 'NonCompliant',
    'enforcement': 'enforce',
    'detail': {
      'exclude_namespace': [
        '*'
      ],
      'include_namespace': [
        '*'
      ],
      '__typename': 'PolicyDetail'
    },
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '7998'
        },
        'creationTimestamp': '2019-06-10T20:09:44Z',
        'finalizers': [
          'policy.finalizer.mcm.ibm.com',
          'sync.finalizer.mcm.ibm.com'
        ],
        'generation': 7998,
        'name': 'policy-ma',
        'namespace': 'cluster1',
        'resourceVersion': '3385191',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-ma',
        'uid': 'b08122bd-8bbb-11e9-af27-005056a0e992'
      },
      'spec': {
        'namespaces': {},
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'policies.ibm.com/v1alpha1',
              'kind': 'MutationPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'mutation-policy-example'
              },
              'spec': {
                'conditions': {
                  'ownership': [
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
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
                'remediationAction': 'enforce'
              }
            },
            'status': {
              'Compliant': 'NonCompliant',
              'Validity': {},
              'conditions': [
                {
                  'lastTransitionTime': '2019-06-12T05:50:40Z',
                  'message': 'NonCompliant; 4 mutated pods detected in namespace `default`; 0 mutated pods detected in namespace `kube-public`',
                  'reason': 'policy: cluster1/mutation-policy-example',
                  'status': 'True',
                  'type': 'completed'
                }
              ]
            }
          }
        ],
        'remediationAction': 'enforce'
      },
      'status': {
        'compliant': 'NonCompliant'
      }
    },
    '__typename': 'Policy',
    'id': 'policy-ma',
    'violatedNum': 1,
    'subItems': [
      {
        'id': 'mutation-policy-example',
        'cells': [
          'mutation-policy-example',
          'NonCompliant; 4 mutated pods detected in namespace `default`; 0 mutated pods detected in namespace `kube-public`',
          'policy: cluster1/mutation-policy-example'
        ]
      }
    ]
  },
  {
    'cluster': null,
    'metadata': {
      'name': 'policy-pod',
      'namespace': 'cluster1',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-pod',
      'creationTimestamp': '2019-06-10T20:07:44Z',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '45514'
      },
      'resourceVersion': '3460078',
      'uid': '6915ae3b-8bbb-11e9-af27-005056a0e992',
      '__typename': 'Metadata'
    },
    'status': 'NonCompliant',
    'enforcement': 'inform',
    'detail': {
      'exclude_namespace': [
        'kube*'
      ],
      'include_namespace': [
        'default'
      ],
      '__typename': 'PolicyDetail'
    },
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '45514'
        },
        'creationTimestamp': '2019-06-10T20:07:44Z',
        'finalizers': [
          'policy.finalizer.mcm.ibm.com',
          'sync.finalizer.mcm.ibm.com'
        ],
        'generation': 45512,
        'name': 'policy-pod',
        'namespace': 'cluster1',
        'resourceVersion': '3460078',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-pod',
        'uid': '6915ae3b-8bbb-11e9-af27-005056a0e992'
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
              'Compliant': 'NonCompliant',
              'Validity': {},
              'conditions': [
                {
                  'lastTransitionTime': '2019-06-12T13:51:59Z',
                  'message': 'pods `nginx-pod` is missing',
                  'reason': 'K8s missing a must have object',
                  'status': 'True',
                  'type': 'violation'
                }
              ]
            }
          }
        ],
        'remediationAction': 'inform'
      },
      'status': {
        'compliant': 'NonCompliant'
      }
    },
    '__typename': 'Policy',
    'id': 'policy-pod',
    'violatedNum': 1,
    'subItems': [
      {
        'id': 'nginx-pod',
        'cells': [
          'nginx-pod',
          'pods `nginx-pod` is missing',
          'K8s missing a must have object'
        ]
      }
    ]
  },
  {
    'cluster': null,
    'metadata': {
      'name': 'policy-role',
      'namespace': 'cluster1',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-role',
      'creationTimestamp': '2019-06-11T14:34:55Z',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '2'
      },
      'resourceVersion': '3235798',
      'uid': '14b4adb0-8c56-11e9-af27-005056a0e992',
      '__typename': 'Metadata'
    },
    'status': 'Compliant',
    'enforcement': 'enforce',
    'detail': {
      'exclude_namespace': [
        'kube*'
      ],
      'include_namespace': [
        'default'
      ],
      '__typename': 'PolicyDetail'
    },
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '2'
        },
        'creationTimestamp': '2019-06-11T14:34:55Z',
        'finalizers': [
          'policy.finalizer.mcm.ibm.com',
          'sync.finalizer.mcm.ibm.com'
        ],
        'generation': 2,
        'name': 'policy-role',
        'namespace': 'cluster1',
        'resourceVersion': '3235798',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/policy-role',
        'uid': '14b4adb0-8c56-11e9-af27-005056a0e992'
      },
      'spec': {
        'namespaces': {
          'exclude': [
            'kube*'
          ],
          'include': [
            'default'
          ]
        },
        'remediationAction': 'enforce',
        'role-templates': [
          {
            'apiVersion': 'roletemplate.mcm.ibm.com/v1alpha1',
            'complianceType': 'musthave',
            'metadata': {
              'creationTimestamp': null,
              'name': 'operator-role-policy'
            },
            'rules': [
              {
                'complianceType': 'musthave',
                'policyRule': {
                  'apiGroups': [
                    'extensions',
                    'apps'
                  ],
                  'resources': [
                    'deployments'
                  ],
                  'verbs': [
                    'get',
                    'list',
                    'watch',
                    'create',
                    'delete',
                    'patch'
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
              'Compliant': 'Compliant',
              'Validity': {
                'valid': true
              },
              'conditions': [
                {
                  'lastTransitionTime': '2019-06-11T14:34:56Z',
                  'message': 'k8s RBAC role "operator-role-policy" exists and matches',
                  'reason': 'K8s RBAC role matches',
                  'status': 'True',
                  'type': 'completed'
                }
              ]
            }
          }
        ]
      },
      'status': {
        'compliant': 'Compliant',
        'valid': true
      }
    },
    '__typename': 'Policy',
    'id': 'policy-role',
    'violatedNum': 0,
    'subItems': [
      {
        'id': 'inapplicable2',
        'cells': [
          'N/A',
          'N/A ',
          'N/A  '
        ]
      }
    ]
  }
]

export const policiesTabModuleRefreshControl = {
  'reloading': false,
  'refreshCookie': 'grc-refresh-interval-cookie',
  'timestamp': 'Tue Jul 23 2019 01:13:42 GMT-0400 (Eastern Daylight Time)'
}

export const policiesTabModuleFilteredPolicies = [
  {
    'metadata': {
      'name': 'my-policy',
      'namespace': 'mcm',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/my-policy',
      'annotations': {
        'policy.open-cluster-management.io/categories': '',
        'policy.open-cluster-management.io/controls': '',
        'policy.open-cluster-management.io/standards': '',
        'seed-generation': '1'
      },
      'resourceVersion': '1347399',
      '__typename': 'Metadata'
    },
    'name': 'my-policy',
    'namespace': 'mcm',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': '',
          'policy.open-cluster-management.io/controls': '',
          'policy.open-cluster-management.io/standards': '',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-21T15:53:58Z',
        'finalizers': [
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation': 55,
        'name': 'my-policy',
        'namespace': 'mcm',
        'resourceVersion': '1347399',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/my-policy',
        'uid': 'c049ec0d-abcf-11e9-8a41-005056a061f1'
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
              'apiVersion': 'rbac.authorization.k8s.io/v1',
              'kind': 'RoleBinding',
              'metadata': {
                'name': 'operate-pods-rolebinding'
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
          }
        ],
        'remediationAction': 'enforce'
      },
      'status': {
        'placementBindings': [
          'binding-my-policy'
        ],
        'placementPolicies': [
          'placement-my-policy'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'my-policy': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'Compliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'my-policy': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'clusterhub',
            'compliant': 'Compliant'
          }
        }
      }
    },
    'remediation': 'enforce',
    'policyCompliant': '0/2',
    'clusterCompliant': '0/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-my-policy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-my-policy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-my-policy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-my-policy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementBinding'
      }
    ],
    '__typename': 'Compliance'
  },
  {
    'metadata': {
      'name': 'policy-ma',
      'namespace': 'mcm',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
      'annotations': {
        'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor","policy.open-cluster-management.io/standards":"NIST"},"name":"policy-ma","namespace":"mcm"},"spec":{"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"MutationPolicy","metadata":{"label":{"category":"System-Integrity"},"name":"mutation-policy-example"},"spec":{"conditions":{"ownership":["ReplicaSet","Deployment","DeamonSet","ReplicationController"]},"namespaceSelector":{"exclude":["kube-system"],"include":["default","kube-*"]},"remediationAction":"enforce"}}}],"remediationAction":"enforce"}}\n',
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'NIST',
        'seed-generation': '1'
      },
      'resourceVersion': '1347579',
      '__typename': 'Metadata'
    },
    'name': 'policy-ma',
    'namespace': 'mcm',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor","policy.open-cluster-management.io/standards":"NIST"},"name":"policy-ma","namespace":"mcm"},"spec":{"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"MutationPolicy","metadata":{"label":{"category":"System-Integrity"},"name":"mutation-policy-example"},"spec":{"conditions":{"ownership":["ReplicaSet","Deployment","DeamonSet","ReplicationController"]},"namespaceSelector":{"exclude":["kube-system"],"include":["default","kube-*"]},"remediationAction":"enforce"}}}],"remediationAction":"enforce"}}\n',
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-16T13:18:48Z',
        'finalizers': [
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation': 45,
        'name': 'policy-ma',
        'namespace': 'mcm',
        'resourceVersion': '1347579',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-ma',
        'uid': '3f218d45-a7cc-11e9-8a41-005056a061f1'
      },
      'spec': {
        'namespaces': {},
        'policy-templates': [
          {
            'objectDefinition': {
              'apiVersion': 'policies.ibm.com/v1alpha1',
              'kind': 'MutationPolicy',
              'metadata': {
                'label': {
                  'category': 'System-Integrity'
                },
                'name': 'mutation-policy-example'
              },
              'spec': {
                'conditions': {
                  'ownership': [
                    'ReplicaSet',
                    'Deployment',
                    'DeamonSet',
                    'ReplicationController'
                  ]
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
                'remediationAction': 'enforce'
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
          'binding-ma'
        ],
        'placementPolicies': [
          'placement-ma'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-ma': {
                'compliant': 'NonCompliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'NonCompliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-ma': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'clusterhub',
            'compliant': 'Compliant'
          }
        }
      }
    },
    'remediation': 'enforce',
    'policyCompliant': '1/2',
    'clusterCompliant': '1/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-ma',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-ma',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-ma',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-ma',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementBinding'
      }
    ],
    '__typename': 'Compliance'
  },
  {
    'metadata': {
      'name': 'policy-pod',
      'namespace': 'mcm',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
      'annotations': {
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor,CertificateManager',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '1257026',
      '__typename': 'Metadata'
    },
    'name': 'policy-pod',
    'namespace': 'mcm',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor,CertificateManager',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-16T13:16:46Z',
        'finalizers': [
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation': 19,
        'name': 'policy-pod',
        'namespace': 'mcm',
        'resourceVersion': '1257026',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-pod',
        'uid': 'f61a25eb-a7cb-11e9-8a41-005056a061f1'
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
          'binding-pod'
        ],
        'placementPolicies': [
          'placement-pod'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-pod': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'Compliant'
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
    'policyCompliant': '1/2',
    'clusterCompliant': '1/2',
    'placementPolicies': [
      {
        'metadata': {
          'name': 'placement-pod',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-pod',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-pod',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-pod',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementBinding'
      }
    ],
    '__typename': 'Compliance'
  },
  {
    'metadata': {
      'name': 'policy-role',
      'namespace': 'mcm',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-role',
      'annotations': {
        'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"mcm"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.mcm.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}\n',
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '1201118',
      '__typename': 'Metadata'
    },
    'name': 'policy-role',
    'namespace': 'mcm',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"mcm"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.mcm.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}\n',
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-16T13:19:03Z',
        'finalizers': [
          'propagator.finalizer.mcm.ibm.com'
        ],
        'generation': 16,
        'name': 'policy-role',
        'namespace': 'mcm',
        'resourceVersion': '1201118',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-role',
        'uid': '47dbc091-a7cc-11e9-8a41-005056a061f1'
      },
      'spec': {
        'namespaces': {
          'exclude': [
            'kube*'
          ],
          'include': [
            'default'
          ]
        },
        'remediationAction': 'inform',
        'role-templates': [
          {
            'apiVersion': 'roletemplate.mcm.ibm.com/v1alpha1',
            'complianceType': 'musthave',
            'metadata': {
              'creationTimestamp': null,
              'name': 'operator-role-policy'
            },
            'rules': [
              {
                'complianceType': 'musthave',
                'policyRule': {
                  'apiGroups': [
                    'extensions',
                    'apps'
                  ],
                  'resources': [
                    'deployments'
                  ],
                  'verbs': [
                    'get',
                    'list',
                    'watch',
                    'create',
                    'delete',
                    'patch'
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
          'binding-role'
        ],
        'placementPolicies': [
          'placement-role'
        ],
        'status': {
          'cluster1': {
            'aggregatePoliciesStatus': {
              'policy-role': {
                'compliant': 'Compliant'
              }
            },
            'clustername': 'cluster1',
            'compliant': 'Compliant'
          },
          'clusterhub': {
            'aggregatePoliciesStatus': {
              'policy-role': {
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
          'name': 'placement-role',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-role',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-role',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-role',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementBinding'
      }
    ],
    '__typename': 'Compliance'
  }
]

export const policiesTabModuleSecondaryHeaderProps =  {
  'title': 'routes.grc',
  'information': 'grc.header.tooltip',
  'links': [
    {
      'id': 'create-policy',
      'label': 'button.create.policy',
      'url': '/multicloud/policies/create'
    }
  ],
  'tabs': [
    {
      'id': 'grc-overview',
      'label': 'tabs.grc.overview',
      'url': '/multicloud/policies',
      'index': 0
    },
    {
      'id': 'grc-all',
      'label': 'tabs.grc.all',
      'url': '/multicloud/policies/all',
      'index': 1
    },
    {
      'id': 'grc-findings',
      'label': 'tabs.grc.findings',
      'url': '/multicloud/policies/findings',
      'index': 2
    }
  ]
}
