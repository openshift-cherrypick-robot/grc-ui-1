/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

export default {
  'data':{
     'items':[
        {
           'metadata':{
              'name':'policy-grc-testc',
              'namespace':'default',
              'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-testc',
              'annotations':{
                 'policy.open-cluster-management.io/categories':'PR.PT Protective Technology, PR.AC Identity Management and Access Control, PR.DS Data Security',
                 'policy.open-cluster-management.io/controls':'PR.PT-3 Least Functionality, PR.AC-4 Access Control, PR.DS-1 Data-at-rest',
                 'policy.open-cluster-management.io/standards':'NIST-CSF'
              },
              'resourceVersion':'520793',
              '__typename':'Metadata'
           },
           'name':'policy-grc-testc',
           'namespace':'default',
           'raw':{
              'apiVersion':'policy.open-cluster-management.io/v1',
              'kind':'Policy',
              'metadata':{
                 'annotations':{
                    'policy.open-cluster-management.io/categories':'PR.PT Protective Technology, PR.AC Identity Management and Access Control, PR.DS Data Security',
                    'policy.open-cluster-management.io/controls':'PR.PT-3 Least Functionality, PR.AC-4 Access Control, PR.DS-1 Data-at-rest',
                    'policy.open-cluster-management.io/standards':'NIST-CSF'
                 },
                 'creationTimestamp':'2021-04-08T19:57:01Z',
                 'generation':1,
                 'managedFields':[
                    {
                       'apiVersion':'policy.open-cluster-management.io/v1',
                       'fieldsType':'FieldsV1',
                       'fieldsV1':{
                          'f:metadata':{
                             'f:annotations':{
                                '.':{

                                },
                                'f:policy.open-cluster-management.io/categories':{

                                },
                                'f:policy.open-cluster-management.io/controls':{

                                },
                                'f:policy.open-cluster-management.io/standards':{

                                }
                             }
                          },
                          'f:spec':{
                             '.':{

                             },
                             'f:disabled':{

                             },
                             'f:policy-templates':{

                             },
                             'f:remediationAction':{

                             }
                          }
                       },
                       'manager':'unknown',
                       'operation':'Update',
                       'time':'2021-04-08T19:57:01Z'
                    },
                    {
                       'apiVersion':'policy.open-cluster-management.io/v1',
                       'fieldsType':'FieldsV1',
                       'fieldsV1':{
                          'f:status':{
                             '.':{

                             },
                             'f:compliant':{

                             },
                             'f:placement':{

                             },
                             'f:status':{

                             }
                          }
                       },
                       'manager':'governance-policy-propagator',
                       'operation':'Update',
                       'time':'2021-04-08T19:57:26Z'
                    }
                 ],
                 'name':'policy-grc-testc',
                 'namespace':'default',
                 'resourceVersion':'520793',
                 'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-grc-testc',
                 'uid':'a33db0f3-54e8-4eb5-864e-39c5630b7d8a'
              },
              'spec':{
                 'disabled':false,
                 'policy-templates':[
                    {
                       'objectDefinition':{
                          'apiVersion':'policy.open-cluster-management.io/v1',
                          'kind':'ConfigurationPolicy',
                          'metadata':{
                             'name':'policy-grc-testc-etcd-encryption'
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
                                   'complianceType':'musthave',
                                   'objectDefinition':{
                                      'apiVersion':'config.openshift.io/v1',
                                      'kind':'APIServer',
                                      'metadata':{
                                         'name':'cluster'
                                      },
                                      'spec':{
                                         'encryption':{
                                            'type':'{{ testFunc }}'
                                         }
                                      }
                                   }
                                }
                             ],
                             'remediationAction':'inform',
                             'severity':'med'
                          }
                       }
                    }
                 ],
                 'remediationAction':'inform'
              },
              'status':{
                 'compliant':'NonCompliant',
                 'placement':[
                    {
                       'placementBinding':'binding-policy-grc-testc',
                       'placementRule':'placement-policy-grc-testc'
                    }
                 ],
                 'status':[
                    {
                       'clustername':'local-cluster',
                       'clusternamespace':'local-cluster',
                       'compliant':'NonCompliant'
                    }
                 ]
              }
           },
           'remediation':'inform',
           'policyCompliant':'0/0',
           'clusterCompliant':'1/1/0',
           'clusterNS':{
              'local-cluster':'local-cluster'
           },
           'clusterConsoleURL':{
              'local-cluster':'https://console-openshift-console.apps.policy-grc-cp-autoclaims-bnch6.dev08.red-chesterfield.com'
           },
           'external': false,
           'source': null,
           '__typename':'Compliance'
        },
        {
           'metadata':{
              'name':'policy-limitrange',
              'namespace':'default',
              'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-limitrange',
              'annotations':{
                 'policy.open-cluster-management.io/categories':'PR.IP Information Protection Processes and Procedures',
                 'policy.open-cluster-management.io/controls':'PR.IP-1 Baseline Configuration',
                 'policy.open-cluster-management.io/standards':'NIST-CSF'
              },
              'resourceVersion':'419478',
              '__typename':'Metadata'
           },
           'name':'policy-limitrange',
           'namespace':'default',
           'raw':{
              'apiVersion':'policy.open-cluster-management.io/v1',
              'kind':'Policy',
              'metadata':{
                 'annotations':{
                    'policy.open-cluster-management.io/categories':'PR.IP Information Protection Processes and Procedures',
                    'policy.open-cluster-management.io/controls':'PR.IP-1 Baseline Configuration',
                    'policy.open-cluster-management.io/standards':'NIST-CSF'
                 },
                 'creationTimestamp':'2021-04-08T18:11:46Z',
                 'generation':1,
                 'managedFields':[
                    {
                       'apiVersion':'policy.open-cluster-management.io/v1',
                       'fieldsType':'FieldsV1',
                       'fieldsV1':{
                          'f:metadata':{
                             'f:annotations':{
                                '.':{

                                },
                                'f:policy.open-cluster-management.io/categories':{

                                },
                                'f:policy.open-cluster-management.io/controls':{

                                },
                                'f:policy.open-cluster-management.io/standards':{

                                }
                             }
                          },
                          'f:spec':{
                             '.':{

                             },
                             'f:disabled':{

                             },
                             'f:policy-templates':{

                             },
                             'f:remediationAction':{

                             }
                          }
                       },
                       'manager':'unknown',
                       'operation':'Update',
                       'time':'2021-04-08T18:11:46Z'
                    },
                    {
                       'apiVersion':'policy.open-cluster-management.io/v1',
                       'fieldsType':'FieldsV1',
                       'fieldsV1':{
                          'f:status':{
                             '.':{

                             },
                             'f:compliant':{

                             },
                             'f:placement':{

                             },
                             'f:status':{

                             }
                          }
                       },
                       'manager':'governance-policy-propagator',
                       'operation':'Update',
                       'time':'2021-04-08T18:12:13Z'
                    }
                 ],
                 'name':'policy-limitrange',
                 'namespace':'default',
                 'resourceVersion':'419478',
                 'selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/policy-limitrange',
                 'uid':'c2b80d55-2ac2-495e-8840-51c8a27996f1'
              },
              'spec':{
                 'disabled':false,
                 'policy-templates':[
                    {
                       'objectDefinition':{
                          'apiVersion':'policy.open-cluster-management.io/v1',
                          'kind':'ConfigurationPolicy',
                          'metadata':{
                             'name':'policy-limitrange-container-mem-limit-range'
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
                                      'apiVersion':'v1',
                                      'kind':'LimitRange',
                                      'metadata':{
                                         'name':'container-mem-limit-range'
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
                                   }
                                }
                             ],
                             'remediationAction':'inform',
                             'severity':'medium'
                          }
                       }
                    }
                 ],
                 'remediationAction':'inform'
              },
              'status':{
                 'compliant':'NonCompliant',
                 'placement':[
                    {
                       'placementBinding':'binding-policy-limitrange',
                       'placementRule':'placement-policy-limitrange'
                    }
                 ],
                 'status':[
                    {
                       'clustername':'local-cluster',
                       'clusternamespace':'local-cluster',
                       'compliant':'NonCompliant'
                    }
                 ]
              }
           },
           'remediation':'inform',
           'policyCompliant':'0/0',
           'clusterCompliant':'1/1/0',
           'clusterNS':{
              'local-cluster':'local-cluster'
           },
           'clusterConsoleURL':{
              'local-cluster':'https://console-openshift-console.apps.policy-grc-cp-autoclaims-bnch6.dev08.red-chesterfield.com'
           },
           'external': true,
           'source': {
              'type': 'git'
           },
           '__typename':'Compliance'
        }
     ]
  }
}
