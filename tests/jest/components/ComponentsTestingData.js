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


import moment from 'moment'

const currentTime = moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ssZ').toString()
// eslint-disable-next-line no-console
console.log('Current time used to unit test GrcView ; ' + JSON.stringify(currentTime))

export const GrcViewPolicyCluster = [
  {
    'metadata': {
      'name': 'my-policy',
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/my-policy',
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
    'namespace': 'calamari',
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
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 55,
        'name': 'my-policy',
        'namespace': 'calamari',
        'resourceVersion': '1347399',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/my-policy',
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
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-my-policy',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-my-policy',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-my-policy',
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
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-ma',
      'annotations': {
        'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor","policy.open-cluster-management.io/standards":"NIST"},"name":"policy-ma","namespace":"calamari"},"spec":{"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"MutationPolicy","metadata":{"label":{"category":"System-Integrity"},"name":"mutation-policy-example"},"spec":{"conditions":{"ownership":["ReplicaSet","Deployment","DeamonSet","ReplicationController"]},"namespaceSelector":{"exclude":["kube-system"],"include":["default","kube-*"]},"remediationAction":"enforce"}}}],"remediationAction":"enforce"}}\n',
        'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor',
        'policy.open-cluster-management.io/standards': 'NIST',
        'seed-generation': '1'
      },
      'resourceVersion': '1347579',
      '__typename': 'Metadata'
    },
    'name': 'policy-ma',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor","policy.open-cluster-management.io/standards":"NIST"},"name":"policy-ma","namespace":"calamari"},"spec":{"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"MutationPolicy","metadata":{"label":{"category":"System-Integrity"},"name":"mutation-policy-example"},"spec":{"conditions":{"ownership":["ReplicaSet","Deployment","DeamonSet","ReplicationController"]},"namespaceSelector":{"exclude":["kube-system"],"include":["default","kube-*"]},"remediationAction":"enforce"}}}],"remediationAction":"enforce"}}\n',
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-16T13:18:48Z',
        'finalizers': [
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 45,
        'name': 'policy-ma',
        'namespace': 'calamari',
        'resourceVersion': '1347579',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-ma',
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
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-ma',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-ma',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-ma',
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
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod',
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
    'namespace': 'calamari',
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
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 19,
        'name': 'policy-pod',
        'namespace': 'calamari',
        'resourceVersion': '1257026',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-pod',
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
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-pod',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-pod',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-pod',
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
      'namespace': 'calamari',
      'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-role',
      'annotations': {
        'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"calamari"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.calamari.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}\n',
        'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
        'seed-generation': '1'
      },
      'resourceVersion': '1201118',
      '__typename': 'Metadata'
    },
    'name': 'policy-role',
    'namespace': 'calamari',
    'raw': {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'Policy',
      'metadata': {
        'annotations': {
          'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"calamari"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.calamari.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}\n',
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
          'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
          'seed-generation': '1'
        },
        'creationTimestamp': '2019-07-16T13:19:03Z',
        'finalizers': [
          'propagator.finalizer.calamari.ibm.com'
        ],
        'generation': 16,
        'name': 'policy-role',
        'namespace': 'calamari',
        'resourceVersion': '1201118',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-role',
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
            'apiVersion': 'roletemplate.calamari.ibm.com/v1alpha1',
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
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-role',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementPolicy'
      }
    ],
    'placementBindings': [
      {
        'metadata': {
          'name': 'binding-role',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-role',
          '__typename': 'Metadata'
        },
        '__typename': 'PlacementBinding'
      }
    ],
    '__typename': 'Compliance'
  }
]

export const GrcViewPolicyCluster2 = [
  {'metadata':{'name':'case6-test-policy','namespace':'default','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy','annotations':{'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS Data Security","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policy.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n','policy.open-cluster-management.io/categories':'PR.DS Data Security','policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit','policy.open-cluster-management.io/standards':'NIST-CSF'},'resourceVersion':'37198197','__typename':'Metadata'},'name':'case6-test-policy','namespace':'default','raw':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'Policy','metadata':{'annotations':{'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS Data Security","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case6-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case6-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system","default"],"include":["e2e-test"]},"remediationAction":"inform","severity":"low"}}},{"objectDefinition":{"apiVersion":"policy.open-cluster-management.io/v1","kind":"ConfigurationPolicy","metadata":{"name":"case6-policy-role-example"},"spec":{"namespaceSelector":{"exclude":["kube-*"],"include":["default"]},"object-templates":[{"complianceType":"mustonlyhave","objectDefinition":{"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"name":"policy-role-example"},"rules":[{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","delete","patch"]}]}}],"remediationAction":"inform","severity":"high"}}}],"remediationAction":"inform"}}\n','policy.open-cluster-management.io/categories':'PR.DS Data Security','policy.open-cluster-management.io/controls':'PR.DS-2 Data-in-transit','policy.open-cluster-management.io/standards':'NIST-CSF'},'creationTimestamp':'2020-05-27T14:36:05Z','generation':1,'name':'case6-test-policy','namespace':'default','resourceVersion':'37198197','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case6-test-policy','uid':'ed964170-b17d-4e23-880e-575be3eac901'},'spec':{'disabled':false,'policy-templates':[{'objectDefinition':{'apiVersion':'policies.ibm.com/v1alpha1','kind':'TrustedContainerPolicy','metadata':{'name':'case6-test-policy-trustedcontainerpolicy'},'spec':{'imageRegistry':'quay.io','namespaceSelector':{'exclude':['kube-system','default'],'include':['e2e-test']},'remediationAction':'inform','severity':'low'}}},{'objectDefinition':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'ConfigurationPolicy','metadata':{'name':'case6-policy-role-example'},'spec':{'namespaceSelector':{'exclude':['kube-*'],'include':['default']},'object-templates':[{'complianceType':'mustonlyhave','objectDefinition':{'apiVersion':'rbac.authorization.k8s.io/v1','kind':'Role','metadata':{'name':'policy-role-example'},'rules':[{'apiGroups':['extensions','apps'],'resources':['deployments'],'verbs':['get','list','watch','delete','patch']}]}}],'remediationAction':'inform','severity':'high'}}}],'remediationAction':'inform'},'status':{'placement':[{'placementBinding':'case6-test-policy-pb','placementRule':'case6-test-policy-plr'}],'status':[{'clustername':'calamari','clusternamespace':'calamari','compliant':'NonCompliant'}]}},'remediation':'inform','policyCompliant':'0/0','clusterCompliant':'1/1','clusterNS':{'calamari':'calamari'},'clusterConsoleURL':{'calamari':'https://console-openshift-console.apps.calamari.dev08.red-chesterfield.com'},'placementPolicies':[{'metadata':{'name':'case6-test-policy-plr','selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/case6-test-policy-plr','__typename':'Metadata'},'__typename':'PlacementPolicy'}],'placementBindings':[{'metadata':{'name':'case6-test-policy-pb','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/case6-test-policy-pb','__typename':'Metadata'},'__typename':'PlacementBinding'}],'__typename':'Compliance'},
  {'metadata':{'name':'policy-rolebinding','namespace':'default','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-rolebinding','annotations':{'policy.open-cluster-management.io/categories':'PR.AC Identity Management Authentication and Access Control','policy.open-cluster-management.io/controls':'PR.AC-4 Access Control','policy.open-cluster-management.io/standards':'NIST-CSF'},'resourceVersion':'37491359','__typename':'Metadata'},'name':'policy-rolebinding','namespace':'default','raw':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'Policy','metadata':{'annotations':{'policy.open-cluster-management.io/categories':'PR.AC Identity Management Authentication and Access Control','policy.open-cluster-management.io/controls':'PR.AC-4 Access Control','policy.open-cluster-management.io/standards':'NIST-CSF'},'creationTimestamp':'2020-05-27T13:23:03Z','generation':7,'name':'policy-rolebinding','namespace':'default','resourceVersion':'37491359','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-rolebinding','uid':'f5f5ad1b-8acc-4814-9560-9edd3ace6fba'},'spec':{'disabled':false,'policy-templates':[{'objectDefinition':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'ConfigurationPolicy','metadata':{'name':'policy-rolebinding-example'},'spec':{'namespaceSelector':{'exclude':['kube-*'],'include':['default']},'object-templates':[{'complianceType':'musthave','objectDefinition':{'apiVersion':'rbac.authorization.k8s.io/v1','kind':'RoleBinding','metadata':{'name':'operate-pods-rolebinding'},'roleRef':{'apiGroup':'rbac.authorization.k8s.io','kind':'Role','name':'operator'},'subjects':[{'apiGroup':'rbac.authorization.k8s.io','kind':'User','name':'admin'}]}}],'remediationAction':'inform','severity':'high'}}}],'remediationAction':'inform'},'status':{'placement':[{'placementBinding':'binding-policy-rolebinding','placementRule':'placement-policy-rolebinding'}],'status':[{'clustername':'calamari','clusternamespace':'calamari','compliant':'NonCompliant'}]}},'remediation':'inform','policyCompliant':'0/0','clusterCompliant':'1/1','clusterNS':{'calamari':'calamari'},'clusterConsoleURL':{'calamari':'https://console-openshift-console.apps.calamari.dev08.red-chesterfield.com'},'placementPolicies':[{'metadata':{'name':'placement-policy-rolebinding','selfLink':'/apis/apps.open-cluster-management.io/v1/namespaces/default/placementrules/placement-policy-rolebinding','__typename':'Metadata'},'__typename':'PlacementPolicy'}],'placementBindings':[{'metadata':{'name':'binding-policy-rolebinding','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/placementbindings/binding-policy-rolebinding','__typename':'Metadata'},'__typename':'PlacementBinding'}],'__typename':'Compliance'}
]

export const GrcViewRefreshControl = {
  'reloading': false,
  'refreshCookie': 'grc-refresh-interval-cookie',
  'timestamp': 'Tue Jul 23 2019 01:13:42 GMT-0400 (Eastern Daylight Time)'
}

export const GrcViewSecondaryHeaderProps =  {
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
    }
  ]
}

export const reduxStorePolicyCluster = {
  user: 'admin',
  loggedIn: 'LOGGED_IN',
  uiconfig: {
    cluster_address: '9.42.82.240',
    cluster_ca_domain: 'mycluster.icp',
    cluster_endpoint: 'https://mycluster.icp:8443',
    cluster_kube_apiserver_host: '9.42.82.240',
    cluster_kube_apiserver_port: '8001',
    cluster_name: 'mycluster',
    cluster_router_http_port: '8080',
    cluster_router_https_port: '8443',
    edition: 'Enterprise Edition',
    proxy_address: '9.42.82.240',
    proxy_ingress_http_port: '80',
    proxy_ingress_https_port: '443',
    version: 'latest'
  },
  userAccess: {
    'type': 'USER_ACCESS_SUCCESS',
    'access': [
      {
        'namespace': 'calamari',
        'rules': {
          '*/*': [
            '*'
          ],
          'policy.open-cluster-management.io/policies': [
            'get',
            'list',
            'watch',
            'update',
            'patch',
            'create',
            'delete',
            'deletecollection'
          ],
          'policy.open-cluster-management.io/policies/status': [
            'get',
            'list',
            'watch',
            'update',
            'patch',
            'create',
            'delete',
            'deletecollection'
          ],
          'policy.open-cluster-management.io/placementbindings': [
            'get',
            'list',
            'watch',
            'update',
            'patch',
            'create',
            'delete',
            'deletecollection'
          ]
        }
      },
      {
        'namespace': 'default',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'hive',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'kube-node-lease',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'kube-public',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'kube-system',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'open-cluster-management',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'open-cluster-management-hub',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-apiserver',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-apiserver-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-authentication',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-authentication-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cloud-credential-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cluster-machine-approver',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cluster-node-tuning-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cluster-samples-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cluster-storage-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-cluster-version',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-config',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-config-managed',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-console',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-console-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-controller-manager',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-controller-manager-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-dns',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-dns-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-etcd',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-etcd-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-image-registry',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-infra',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-ingress',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-ingress-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-insights',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kni-infra',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-apiserver',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-apiserver-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-controller-manager',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-controller-manager-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-scheduler',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-scheduler-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-storage-version-migrator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-kube-storage-version-migrator-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-machine-api',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-machine-config-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-marketplace',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-monitoring',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-multus',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-network-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-node',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-openstack-infra',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-operator-lifecycle-manager',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-operators',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-ovirt-infra',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-sdn',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-service-ca',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-service-ca-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-service-catalog-apiserver-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-service-catalog-controller-manager-operator',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-user-workload-monitoring',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      },
      {
        'namespace': 'openshift-vsphere-infra',
        'rules': {
          '*/*': [
            '*'
          ]
        }
      }
    ],
    'status': 'DONE'
  },
  resourceToolbar: {
    refreshControl: {
      reloading: true,
      refreshCookie: 'grc-refresh-interval-cookie',
      timestamp: 'Thu Sep 12 2019 16:22:18 GMT-0400 (Eastern Daylight Time)'
    },
    availableFilters: {
      standards: {
        name: 'Standards',
        availableSet: [
          'FISMA',
          'PCI',
          'HIPAA',
          'NIST'
        ]
      },
      categories: {
        name: 'Categories',
        availableSet: [
          'System And Communications Protections',
          'System And Information Integrity'
        ]
      },
      controls: {
        name: 'Controls',
        availableSet: [
          'Secret Encryption',
          'Cert Manager',
          'Mutation Advisor',
          'VA'
        ]
      },
      type: {
        name: 'Type',
        availableSet: [
          'Enforce',
          'Inform only'
        ]
      },
      severity: {
        availableSet: []
      }
    },
    activeFilters: {
      standards: new Set([
        'NIST',
        'HIPAA'
      ])
    }
  },
  secondaryHeader: {
    title: '',
    tabs: [],
    breadcrumbItems: [],
    links: [],
    description: {},
    information: {}
  },
  modal: {},
  PoliciesList: {
    items: [],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'INCEPTION',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  ALL_POLICIES: {
    items: [
      {
        metadata: {
          name: 'policy-limitrange',
          namespace: 'calamari',
          selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-limitrange',
          annotations: {
            'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
            'policy.open-cluster-management.io/controls': 'CertManager',
            'policy.open-cluster-management.io/standards': 'HIPAA',
            'seed-generation': '1'
          },
          resourceVersion: '3489357',
          __typename: 'Metadata'
        },
        name: 'policy-limitrange',
        namespace: 'calamari',
        raw: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
              'policy.open-cluster-management.io/controls': 'CertManager',
              'policy.open-cluster-management.io/standards': 'HIPAA',
              'seed-generation': '1'
            },
            creationTimestamp: '2019-09-04T16:27:02Z',
            finalizers: [
              'propagator.finalizer.calamari.ibm.com',
              'finalizer.policies.ibm.com'
            ],
            generation: 7,
            name: 'policy-limitrange',
            namespace: 'calamari',
            resourceVersion: '3489357',
            selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-limitrange',
            uid: 'd358638d-cf30-11e9-a1ed-005056a0b88e'
          },
          spec: {
            complianceType: 'musthave',
            namespaces: {
              exclude: [
                'kube-*'
              ],
              include: [
                'default'
              ]
            },
            'object-templates': [
              {
                complianceType: 'musthave',
                objectDefinition: {
                  apiVersion: 'v1',
                  kind: 'LimitRange',
                  metadata: {
                    name: 'mem-limit-range'
                  },
                  spec: {
                    limits: [
                      {
                        'default': {
                          memory: '512Mi'
                        },
                        defaultRequest: {
                          memory: '256Mi'
                        },
                        type: 'Container'
                      }
                    ]
                  }
                }
              }
            ],
            remediationAction: 'inform'
          },
          status: {
            placementBindings: [
              'binding-policy-limitrange'
            ],
            placementPolicies: [
              'placement-policy-limitrange'
            ],
            status: {
              cluster1: {
                aggregatePoliciesStatus: {
                  'policy-limitrange': {
                    compliant: 'NonCompliant'
                  }
                },
                clustername: 'cluster1',
                compliant: 'NonCompliant'
              },
              clusterhub: {
                aggregatePoliciesStatus: {
                  'policy-limitrange': {
                    compliant: 'NonCompliant'
                  }
                },
                clustername: 'clusterhub',
                compliant: 'NonCompliant'
              }
            }
          }
        },
        remediation: 'inform',
        policyCompliant: '2/2',
        clusterCompliant: '2/2',
        placementPolicies: [
          {
            metadata: {
              name: 'placement-policy-limitrange',
              selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-policy-limitrange',
              __typename: 'Metadata'
            },
            __typename: 'PlacementPolicy'
          }
        ],
        placementBindings: [
          {
            metadata: {
              name: 'binding-policy-limitrange',
              selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-policy-limitrange',
              __typename: 'Metadata'
            },
            __typename: 'PlacementBinding'
          }
        ],
        __typename: 'Compliance',
        subItems: [
          {
            name: 'policy.pb',
            items: [
              'binding-policy-limitrange'
            ]
          },
          {
            name: 'policy.pp',
            items: [
              'placement-policy-limitrange'
            ]
          }
        ],
        custom: {
          'metadata.name': {
            key: null,
            ref: null,
            props: {
              to: '/multicloud/policies/all/policy-limitrange',
              children: 'policy-limitrange',
              replace: false
            },
            _owner: null,
            _store: {}
          },
          'metadata.annotations["policy.open-cluster-management.io/standards"]': 'HIPAA',
          'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Cert Manager',
          'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections'
        }
      },
      {
        metadata: {
          name: 'policy-namespace',
          namespace: 'calamari',
          selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-namespace',
          annotations: {
            'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
            'policy.open-cluster-management.io/controls': 'MutationAdvisor',
            'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
            'seed-generation': '1'
          },
          resourceVersion: '4855462',
          __typename: 'Metadata'
        },
        name: 'policy-namespace',
        namespace: 'calamari',
        raw: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
              'policy.open-cluster-management.io/controls': 'MutationAdvisor',
              'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
              'seed-generation': '1'
            },
            creationTimestamp: '2019-09-10T17:55:15Z',
            finalizers: [
              'propagator.finalizer.calamari.ibm.com',
              'finalizer.policies.ibm.com'
            ],
            generation: 9,
            name: 'policy-namespace',
            namespace: 'calamari',
            resourceVersion: '4855462',
            selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/policy-namespace',
            uid: '2516c2c7-d3f4-11e9-a1ed-005056a0b88e'
          },
          spec: {
            complianceType: 'musthave',
            namespaces: {},
            'object-templates': [
              {
                complianceType: 'musthave',
                objectDefinition: {
                  apiVersion: 'v1',
                  kind: 'Namespace',
                  metadata: {
                    name: 'dev-will-test'
                  }
                }
              }
            ],
            remediationAction: 'enforce'
          },
          status: {
            placementBindings: [
              'binding-namespace'
            ],
            placementPolicies: [
              'placement-namespace'
            ],
            status: {
              cluster1: {
                aggregatePoliciesStatus: {
                  'policy-namespace': {}
                },
                clustername: 'cluster1'
              },
              clusterhub: {
                aggregatePoliciesStatus: {
                  'policy-namespace': {}
                },
                clustername: 'clusterhub'
              }
            }
          }
        },
        remediation: 'enforce',
        policyCompliant: '2/2',
        clusterCompliant: '2/2',
        placementPolicies: [
          {
            metadata: {
              name: 'placement-namespace',
              selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementpolicies/placement-namespace',
              __typename: 'Metadata'
            },
            __typename: 'PlacementPolicy'
          }
        ],
        placementBindings: [
          {
            metadata: {
              name: 'binding-namespace',
              selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/placementbindings/binding-namespace',
              __typename: 'Metadata'
            },
            __typename: 'PlacementBinding'
          }
        ],
        __typename: 'Compliance',
        subItems: [
          {
            name: 'policy.pb',
            items: [
              'binding-namespace'
            ]
          },
          {
            name: 'policy.pp',
            items: [
              'placement-namespace'
            ]
          }
        ],
        custom: {
          'metadata.name': {
            key: null,
            ref: null,
            props: {
              to: '/multicloud/policies/all/policy-namespace',
              children: 'policy-namespace',
              replace: false
            },
            _owner: null,
            _store: {}
          },
          'metadata.annotations["policy.open-cluster-management.io/standards"]': 'NIST, HIPAA',
          'metadata.annotations["policy.open-cluster-management.io/controls"]': 'Mutation Advisor',
          'metadata.annotations["policy.open-cluster-management.io/categories"]': 'System And Communications Protections, System And Information Integrity'
        }
      }
    ],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'DONE',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  HCMSecurityFindingsList: {
    items: [],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'INCEPTION',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  HCMClusterFindingsList: {
    items: [],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'INCEPTION',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  resourceFilters: {}
}

export const GrcViewFindingCluster = [
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-2767ac02-ce7a-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'mapping error from raw object: `no matches for kind "VulnerabilityPolicy" in version "policies.ibm.com/v1alpha1"`',
    'updateTime': currentTime,
    'finding': {
      'severity': 'MEDIUM',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-vulnerabilitypolicy',
      'resourceId': '2767ac02-ce7a-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'PCI'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-22ac9660-cf15-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'rolebindings `operate-pods-rolebinding` is missing',
    'updateTime': currentTime,
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-rolebinding-1',
      'resourceId': '22ac9660-cf15-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-22ac9660-cf15-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': currentTime,
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-rolebinding-1',
      'resourceId': '22ac9660-cf15-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-d358638d-cf30-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'limitranges `mem-limit-range` is missing',
    'updateTime': '2019-09-15T14:49:38.406220Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-limitrange',
      'resourceId': 'd358638d-cf30-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'HIPAA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'CertManager'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-d358638d-cf30-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-15T14:49:37.206988Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-limitrange',
      'resourceId': 'd358638d-cf30-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'HIPAA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'CertManager'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8be1a627-cb2c-11e9-a1eb-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-15T14:49:35.892074Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-image',
      'resourceId': '8be1a627-cb2c-11e9-a1eb-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-8be1a627-cb2c-11e9-a1eb-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'clusterimagepolicies `mongo` is missing',
    'updateTime': '2019-09-15T14:49:34.546915Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-image',
      'resourceId': '8be1a627-cb2c-11e9-a1eb-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-a18d825a-cb36-11e9-a1eb-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-15T14:49:33.034863Z',
    'finding': {
      'severity': 'MEDIUM',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-iampolicy',
      'resourceId': 'a18d825a-cb36-11e9-a1eb-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-a18d825a-cb36-11e9-a1eb-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'NonCompliant; 1 clusterrole admin users violations detected in namespace `cluster-wide`',
    'updateTime': '2019-09-15T14:49:31.415041Z',
    'finding': {
      'severity': 'MEDIUM',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-iampolicy',
      'resourceId': 'a18d825a-cb36-11e9-a1eb-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-48316272-d009-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-15T14:49:29.926577Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-pod',
      'resourceId': '48316272-d009-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-48316272-d009-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'pods `nginx-pod` is missing',
    'updateTime': '2019-09-15T08:12:50.637446Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-pod',
      'resourceId': '48316272-d009-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'FISMA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections'
      ],
      'securityControl': 'MutationAdvisor'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-5b4caebf-d341-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-12T17:49:20.727667Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568061286260-policy-test',
      'resourceId': '5b4caebf-d341-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-5b4caebf-d341-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-12T17:49:18.716240Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568061286260-policy-test',
      'resourceId': '5b4caebf-d341-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-34c2d5bc-d337-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-12T17:49:17.093456Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568056925581-policy-test',
      'resourceId': '34c2d5bc-d337-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-34c2d5bc-d337-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-12T17:49:15.642708Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568056925581-policy-test',
      'resourceId': '34c2d5bc-d337-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4fe26689-d302-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-12T17:49:14.254742Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568034219566-policy-test',
      'resourceId': '4fe26689-d302-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-4fe26689-d302-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-12T17:49:12.892542Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568034219566-policy-test',
      'resourceId': '4fe26689-d302-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-9cc06eb5-d308-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-12T17:49:01.556249Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568036913520-policy-test',
      'resourceId': '9cc06eb5-d308-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-9cc06eb5-d308-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-12T17:49:00.433037Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568036913520-policy-test',
      'resourceId': '9cc06eb5-d308-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-e1efa5a4-d496-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-11T13:20:41.695295Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568207972605-policy-test',
      'resourceId': 'e1efa5a4-d496-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-e1efa5a4-d496-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-11T13:20:39.291212Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568207972605-policy-test',
      'resourceId': 'e1efa5a4-d496-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-524e95b5-d42d-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-11T00:44:51.957836Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568162636873-policy-test',
      'resourceId': '524e95b5-d42d-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8514ac0a-d418-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T22:16:21.690479Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568153704100-policy-test',
      'resourceId': '8514ac0a-d418-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4f8c0bf2-d418-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T22:14:50.526978Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568153613164-policy-test',
      'resourceId': '4f8c0bf2-d418-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-348ab228-d40a-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T20:33:43.620675Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568147552669-policy-test',
      'resourceId': '348ab228-d40a-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-348ab228-d40a-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T20:33:41.120084Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568147552669-policy-test',
      'resourceId': '348ab228-d40a-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-b1fe01c2-d407-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T20:15:47.094914Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568146478323-policy-test',
      'resourceId': 'b1fe01c2-d407-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-b1fe01c2-d407-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T20:15:44.691882Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568146478323-policy-test',
      'resourceId': 'b1fe01c2-d407-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T19:32:43.614886Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568143899657-policy-test',
      'resourceId': 'b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T19:32:40.365082Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568143899657-policy-test',
      'resourceId': 'b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T19:03:05.998427Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': '1568142120415-policy-test',
      'resourceId': '8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T19:03:03.590474Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568142120415-policy-test',
      'resourceId': '8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-a0f60bfb-d3d3-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': 'namespaces `prod` is missing',
    'updateTime': '2019-09-10T14:03:25.228534Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568124103676-policy-test',
      'resourceId': 'a0f60bfb-d3d3-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T13:59:48.300164Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': 'policy-namespace',
      'resourceId': '4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST',
        'HIPAA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections',
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'MutationAdvisor,VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T13:59:43.189220Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'clusterhub',
      'resourceType': 'Policy',
      'resourceName': 'policy-namespace',
      'resourceId': '4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'clusterhub',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST',
        'HIPAA'
      ],
      'securityCategories': [
        'SystemAndCommunicationsProtections',
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'MutationAdvisor,VA'
    },
    '__typename': 'Occurrence'
  },
  {
    'name': 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-04bcaee9-d3d2-11e9-a1ed-005056a0b88e',
    'shortDescription': 'Policy that is not compliant',
    'longDescription': 'MCM Policy that is not compliant',
    'providerId': 'security-advisor',
    'providerName': 'id-mycluster-account/providers/security-advisor',
    'remediation': '',
    'updateTime': '2019-09-10T13:51:15.095202Z',
    'finding': {
      'severity': 'HIGH',
      'certainty': 'HIGH',
      'networkConnection': null,
      'nextSteps': [
        {
          'title': 'View the details for the compliance problem in the occurrence of the findings.',
          'url': null
        }
      ],
      'dataTransferred': null
    },
    'reportedBy': {
      'id': 'calamari-policy-adapter',
      'title': 'Security Advisor MCM Policy Findings Adapter',
      'url': null
    },
    'context': {
      'accountId': 'id-mycluster-account',
      'region': 'cluster1',
      'resourceType': 'Policy',
      'resourceName': '1568123422580-policy-test',
      'resourceId': '04bcaee9-d3d2-11e9-a1ed-005056a0b88e',
      'resourceCrn': null,
      'serviceName': 'icp4mcm-findings',
      'serviceCrn': null,
      'clusterName': 'cluster1',
      'namespaceName': 'Excludes: [kube-*], Includes: [default]'
    },
    'securityClassification': {
      'securityStandards': [
        'NIST'
      ],
      'securityCategories': [
        'SystemAndInformationIntegrity'
      ],
      'securityControl': 'VA'
    },
    '__typename': 'Occurrence'
  }
]

export const reduxStoreFindingCluster = {
  user: 'admin',
  loggedIn: 'LOGGED_IN',
  uiconfig: {
    cluster_address: '9.42.82.240',
    cluster_ca_domain: 'mycluster.icp',
    cluster_endpoint: 'https://mycluster.icp:8443',
    cluster_kube_apiserver_host: '9.42.82.240',
    cluster_kube_apiserver_port: '8001',
    cluster_name: 'mycluster',
    cluster_router_http_port: '8080',
    cluster_router_https_port: '8443',
    edition: 'Enterprise Edition',
    proxy_address: '9.42.82.240',
    proxy_ingress_http_port: '80',
    proxy_ingress_https_port: '443',
    version: 'latest'
  },
  userAccess: {
    type: 'ROLE_RECEIVE_SUCCESS',
    role: 'ClusterAdministrator',
    status: 'DONE'
  },
  resourceToolbar: {
    refreshControl: {
      reloading: false,
      refreshCookie: 'grc-refresh-interval-cookie',
      timestamp: 'Sun Sep 15 2019 11:04:57 GMT-0400 (Eastern Daylight Time)'
    },
    availableFilters: {
      standards: {
        name: 'Standards',
        availableSet: [
          'PCI',
          'FISMA',
          'HIPAA',
          'NIST'
        ]
      },
      categories: {
        name: 'Categories',
        availableSet: [
          'System And Information Integrity',
          'System And Communications Protections'
        ]
      },
      controls: {
        name: 'Controls',
        availableSet: [
          'VA',
          'Mutation Advisor',
          'Cert Manager',
          'Mutation Advisor VA'
        ]
      },
      type: {
        availableSet: []
      },
      severity: {
        name: 'Severity',
        availableSet: [
          'High',
          'Medium',
          'Low'
        ]
      }
    },
    activeFilters: {
      severity: new Set([])
    }
  },
  secondaryHeader: {
    title: 'Governance and risk',
    tabs: [
      {
        id: 'grc-overview',
        label: 'tabs.grc.overview',
        url: '/multicloud/policies',
        index: 0
      },
      {
        id: 'grc-all',
        label: 'tabs.grc.all',
        url: '/multicloud/policies/all',
        index: 1
      },
      {
        id: 'grc-findings',
        label: 'tabs.grc.findings',
        url: '/multicloud/policies/findings',
        index: 2
      }
    ],
    links: [
      {
        id: 'create-policy',
        label: 'button.create.policy',
        url: '/multicloud/policies/create'
      }
    ],
    description: '',
    information: 'A core service that enables operators to define multicluster policies needed to meet enterprise requirements and standards.'
  },
  modal: {},
  HCMSecurityFindingsList: {
    items: [
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-2767ac02-ce7a-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'mapping error from raw object: `no matches for kind "VulnerabilityPolicy" in version "policies.ibm.com/v1alpha1"`',
        updateTime: currentTime,
        finding: {
          severity: 'MEDIUM',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-vulnerabilitypolicy',
          resourceId: '2767ac02-ce7a-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'PCI'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-vulnerabilitypolicy',
          'finding.severity': 'Medium',
          'securityClassification.securityStandards': 'PCI',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-22ac9660-cf15-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'rolebindings `operate-pods-rolebinding` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-rolebinding-1',
          resourceId: '22ac9660-cf15-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-rolebinding-1',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-22ac9660-cf15-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-rolebinding-1',
          resourceId: '22ac9660-cf15-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-rolebinding-1',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-d358638d-cf30-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'limitranges `mem-limit-range` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-limitrange',
          resourceId: 'd358638d-cf30-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'HIPAA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'CertManager'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-limitrange',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'HIPAA',
          'securityClassification.securityControl': 'Cert Manager',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-d358638d-cf30-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-limitrange',
          resourceId: 'd358638d-cf30-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'HIPAA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'CertManager'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-limitrange',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'HIPAA',
          'securityClassification.securityControl': 'Cert Manager',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8be1a627-cb2c-11e9-a1eb-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-image',
          resourceId: '8be1a627-cb2c-11e9-a1eb-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-image',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-8be1a627-cb2c-11e9-a1eb-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'clusterimagepolicies `mongo` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-image',
          resourceId: '8be1a627-cb2c-11e9-a1eb-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-image',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-a18d825a-cb36-11e9-a1eb-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'MEDIUM',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-iampolicy',
          resourceId: 'a18d825a-cb36-11e9-a1eb-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-iampolicy',
          'finding.severity': 'Medium',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-a18d825a-cb36-11e9-a1eb-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'NonCompliant; 1 clusterrole admin users violations detected in namespace `cluster-wide`',
        updateTime: currentTime,
        finding: {
          severity: 'MEDIUM',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-iampolicy',
          resourceId: 'a18d825a-cb36-11e9-a1eb-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-iampolicy',
          'finding.severity': 'Medium',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-48316272-d009-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-pod',
          resourceId: '48316272-d009-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-pod',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-48316272-d009-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'pods `nginx-pod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-pod',
          resourceId: '48316272-d009-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'FISMA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections'
          ],
          securityControl: 'MutationAdvisor'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-pod',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'FISMA',
          'securityClassification.securityControl': 'Mutation Advisor',
          'securityClassification.securityCategories': 'System And Communications Protections',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-5b4caebf-d341-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568061286260-policy-test',
          resourceId: '5b4caebf-d341-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568061286260-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-5b4caebf-d341-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568061286260-policy-test',
          resourceId: '5b4caebf-d341-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568061286260-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-34c2d5bc-d337-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568056925581-policy-test',
          resourceId: '34c2d5bc-d337-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568056925581-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-34c2d5bc-d337-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568056925581-policy-test',
          resourceId: '34c2d5bc-d337-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568056925581-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4fe26689-d302-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568034219566-policy-test',
          resourceId: '4fe26689-d302-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568034219566-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-4fe26689-d302-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568034219566-policy-test',
          resourceId: '4fe26689-d302-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568034219566-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-9cc06eb5-d308-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568036913520-policy-test',
          resourceId: '9cc06eb5-d308-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568036913520-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-9cc06eb5-d308-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568036913520-policy-test',
          resourceId: '9cc06eb5-d308-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568036913520-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-e1efa5a4-d496-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568207972605-policy-test',
          resourceId: 'e1efa5a4-d496-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568207972605-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-e1efa5a4-d496-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568207972605-policy-test',
          resourceId: 'e1efa5a4-d496-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568207972605-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-524e95b5-d42d-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568162636873-policy-test',
          resourceId: '524e95b5-d42d-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568162636873-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8514ac0a-d418-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568153704100-policy-test',
          resourceId: '8514ac0a-d418-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568153704100-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4f8c0bf2-d418-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568153613164-policy-test',
          resourceId: '4f8c0bf2-d418-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568153613164-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-348ab228-d40a-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568147552669-policy-test',
          resourceId: '348ab228-d40a-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568147552669-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-348ab228-d40a-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568147552669-policy-test',
          resourceId: '348ab228-d40a-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568147552669-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-b1fe01c2-d407-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568146478323-policy-test',
          resourceId: 'b1fe01c2-d407-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568146478323-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-b1fe01c2-d407-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568146478323-policy-test',
          resourceId: 'b1fe01c2-d407-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568146478323-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568143899657-policy-test',
          resourceId: 'b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568143899657-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568143899657-policy-test',
          resourceId: 'b2f3fc2e-d401-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568143899657-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: '1568142120415-policy-test',
          resourceId: '8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568142120415-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568142120415-policy-test',
          resourceId: '8e28ce53-d3fd-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568142120415-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-a0f60bfb-d3d3-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'namespaces `prod` is missing',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568124103676-policy-test',
          resourceId: 'a0f60bfb-d3d3-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568124103676-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: 'policy-namespace',
          resourceId: '4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST',
            'HIPAA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections',
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'MutationAdvisor,VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-namespace',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST, HIPAA',
          'securityClassification.securityControl': 'Mutation Advisor VA',
          'securityClassification.securityCategories': 'System And Communications Protections, System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/clusterhub-policy-4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'clusterhub',
          resourceType: 'Policy',
          resourceName: 'policy-namespace',
          resourceId: '4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'clusterhub',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST',
            'HIPAA'
          ],
          securityCategories: [
            'SystemAndCommunicationsProtections',
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'MutationAdvisor,VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: policy-namespace',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST, HIPAA',
          'securityClassification.securityControl': 'Mutation Advisor VA',
          'securityClassification.securityCategories': 'System And Communications Protections, System And Information Integrity',
          updateTime: '-'
        }
      },
      {
        name: 'id-mycluster-account/providers/security-advisor/occurrences/cluster1-policy-04bcaee9-d3d2-11e9-a1ed-005056a0b88e',
        shortDescription: 'Policy that is not compliant',
        longDescription: 'MCM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: '',
        updateTime: currentTime,
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'View the details for the compliance problem in the occurrence of the findings.',
              url: null
            }
          ],
          dataTransferred: null
        },
        reportedBy: {
          id: 'calamari-policy-adapter',
          title: 'Security Advisor MCM Policy Findings Adapter',
          url: null
        },
        context: {
          accountId: 'id-mycluster-account',
          region: 'cluster1',
          resourceType: 'Policy',
          resourceName: '1568123422580-policy-test',
          resourceId: '04bcaee9-d3d2-11e9-a1ed-005056a0b88e',
          resourceCrn: null,
          serviceName: 'icp4mcm-findings',
          serviceCrn: null,
          clusterName: 'cluster1',
          namespaceName: 'Excludes: [kube-*], Includes: [default]'
        },
        securityClassification: {
          securityStandards: [
            'NIST'
          ],
          securityCategories: [
            'SystemAndInformationIntegrity'
          ],
          securityControl: 'VA'
        },
        __typename: 'Occurrence',
        custom: {
          context: 'Policy: 1568123422580-policy-test',
          'finding.severity': 'High',
          'securityClassification.securityStandards': 'NIST',
          'securityClassification.securityControl': 'VA',
          'securityClassification.securityCategories': 'System And Information Integrity',
          updateTime: '-'
        }
      }
    ],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'DONE',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  HCMClusterFindingsList: {
    items: [],
    itemsPerPage: 10,
    page: 1,
    search: '',
    sortDirection: 'asc',
    status: 'INCEPTION',
    putErrorMsg: '',
    postErrorMsg: '',
    pendingActions: []
  },
  resourceFilters: {}
}

export const existing =
{
  'clusterLabels':[
    {
      'key':'cloud',
      'value':'IBM'
    },
    {
      'key':'datacenter',
      'value':'toronto'
    },
    {
      'key':'environment',
      'value':'Dev'
    },
    {
      'key':'owner',
      'value':'marketing'
    },
    {
      'key':'region',
      'value':'US'
    },
    {
      'key':'vendor',
      'value':'ICP'
    }
  ],
  'compliances':[
    {
      'name':'grc-policy',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'',
        'policy.open-cluster-management.io/controls':'',
        'policy.open-cluster-management.io/standards':'',
        'seed-generation':'1'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube-*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'policy/v1beta1',
              'kind':'PodSecurityPolicy',
              'metadata':{
                'annotations':{
                  'seccomp.security.alpha.kubernetes.io/allowedProfileNames':'*'
                },
                'name':'restricted-calamari'
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
          }
        ],
        'remediationAction':'enforce'
      },
      '__typename':'ExistingCompliance'
    },
    {
      'name':'grc-policy2',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'',
        'policy.open-cluster-management.io/controls':'',
        'policy.open-cluster-management.io/standards':'',
        'seed-generation':'1'
      },
      'spec':{
        'complianceType':'musthave',
        'namespaces':{
          'exclude':[
            'kube-*'
          ],
          'include':[
            'default'
          ]
        },
        'object-templates':[
          {
            'complianceType':'musthave',
            'objectDefinition':{
              'apiVersion':'policy/v1beta1',
              'kind':'PodSecurityPolicy',
              'metadata':{
                'annotations':{
                  'seccomp.security.alpha.kubernetes.io/allowedProfileNames':'*'
                },
                'name':'restricted-calamari'
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
          }
        ],
        'remediationAction':'enforce'
      },
      '__typename':'ExistingCompliance'
    },
    {
      'name':'policy-iam',
      'namespace':'calamari',
      'annotations':{
        'kubectl.kubernetes.io/last-applied-configuration':'{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor","policy.open-cluster-management.io/standards":"NIST"},"name":"policy-iam","namespace":"calamari"},"spec":{"policy-templates":[{"objectDefinition":{"apiVersion":"calamari-grcpolicy.ibm.com/v1alpha1","kind":"IamPolicy","metadata":{"label":{"category":"System-Integrity"},"name":"iam-policy-example"},"spec":{"maxClusterRoleBindingUsers":5,"namespaceSelector":{"exclude":["kube-system"],"include":["default","kube-*"]},"remediationAction":"enforce"}}}]}}\n',
        'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor',
        'policy.open-cluster-management.io/standards':'NIST',
        'seed-generation':'1'
      },
      'spec':{
        'namespaces':{

        },
        'policy-templates':[
          {
            'objectDefinition':{
              'apiVersion':'calamari-grcpolicy.ibm.com/v1alpha1',
              'kind':'IamPolicy',
              'metadata':{
                'label':{
                  'category':'System-Integrity'
                },
                'name':'iam-policy-example'
              },
              'spec':{
                'maxClusterRoleBindingUsers':5,
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
        ]
      },
      '__typename':'ExistingCompliance'
    },
    {
      'name':'policy-ma',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor',
        'policy.open-cluster-management.io/standards':'NIST',
        'seed-generation':'1'
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
      '__typename':'ExistingCompliance'
    },
    {
      'name':'policy-pod',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards':'NIST,HIPAA',
        'seed-generation':'1'
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
      '__typename':'ExistingCompliance'
    },
    {
      'name':'policy-role',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
        'policy.open-cluster-management.io/controls':'MutationAdvisor,VA',
        'policy.open-cluster-management.io/standards':'NIST,HIPAA',
        'seed-generation':'1'
      },
      'spec':{
        'namespaces':{
          'exclude':[
            'kube*'
          ],
          'include':[
            'default'
          ]
        },
        'remediationAction':'inform',
        'role-templates':[
          {
            'apiVersion':'roletemplate.calamari.ibm.com/v1alpha1',
            'complianceType':'musthave',
            'metadata':{
              'creationTimestamp':null,
              'name':'operator-role-policy'
            },
            'rules':[
              {
                'complianceType':'musthave',
                'policyRule':{
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
                    'create',
                    'delete',
                    'patch'
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
      '__typename':'ExistingCompliance'
    },
    {
      'name':'policy1',
      'namespace':'calamari',
      'annotations':{
        'policy.open-cluster-management.io/categories':'SystemAndInformationIntegrity, RBAC',
        'policy.open-cluster-management.io/controls':'MutationAdvisor',
        'policy.open-cluster-management.io/standards':'NIST',
        'seed-generation':'2'
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
                'name':'restricted-calamari'
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
            'apiVersion':'roletemplate.calamari.ibm.com/v1alpha1',
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
      '__typename':'ExistingCompliance'
    }
  ],
  '__typename':'Existing'
}
