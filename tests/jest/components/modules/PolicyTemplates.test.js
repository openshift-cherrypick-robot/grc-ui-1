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
import PolicyTemplatesView from '../../../../src-web/components/modules/PolicyTemplatesView'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

describe('PolicyTemplatesView component', () => {
  it('renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const resourceData = {
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
            'propagator.finalizer.mcm.ibm.com',
            'finalizer.policies.ibm.com'
          ],
          'generation': 7,
          'name': '1569249226915-policy-test',
          'namespace': 'mcm',
          'resourceVersion': '7688204',
          'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
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
      'metadata': {
        'creationTimestamp': '2019-09-23T14:34:25Z',
        'name': '1569249226915-policy-test',
        'namespace': 'mcm',
        'resourceVersion': '7688204',
        'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
        'uid': '3dc879b5-de0f-11e9-a1ed-005056a0b88e',
        'annotations': {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'NIST',
          'seed-generation': '1'
        },
        '__typename': 'Metadata'
      },
      'annotations': {
        'categories': 'SystemAndInformationIntegrity',
        'controls': 'VA',
        'standards': 'NIST'
      },
      'placementPolicies': [
        {
          'metadata': {
            'annotations': {
              'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
              'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ='
            },
            'name': 'placement-1569249226915-policy-test',
            'namespace': 'mcm',
            'creationTimestamp': '2019-09-23T14:34:25Z',
            'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-1569249226915-policy-test',
            '__typename': 'Metadata'
          },
          'clusterLabels': {
            'matchExpressions': [
              {
                'key': 'cloud',
                'operator': 'In',
                'values': [
                  'IBM'
                ]
              }
            ]
          },
          'status': {
            'decisions': [
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
              'name': 'placement-1569249226915-policy-test',
              'namespace': 'mcm',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-1569249226915-policy-test',
              'uid': '3de387ad-de0f-11e9-a6d8-02e847915a0f',
              'resourceVersion': '188032',
              'creationTimestamp': '2019-09-23T14:34:25Z',
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
                    'key': 'cloud',
                    'operator': 'In',
                    'values': [
                      'IBM'
                    ]
                  }
                ]
              },
              'resourceHint': {}
            },
            'status': {
              'decisions': [
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
            'name': 'binding-1569249226915-policy-test',
            'namespace': 'mcm',
            'creationTimestamp': '2019-09-23T14:34:25Z',
            'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-1569249226915-policy-test',
            '__typename': 'Metadata'
          },
          'placementRef': {
            'name': 'placement-1569249226915-policy-test',
            'kind': 'PlacementPolicy',
            '__typename': 'Subject'
          },
          'subjects': [
            {
              'name': '1569249226915-policy-test',
              'apiGroup': 'policy.open-cluster-management.io',
              'kind': 'Policy',
              '__typename': 'Subject'
            }
          ],
          'raw': {
            'apiVersion': 'mcm.ibm.com/v1alpha1',
            'kind': 'PlacementBinding',
            'metadata': {
              'name': 'binding-1569249226915-policy-test',
              'namespace': 'mcm',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-1569249226915-policy-test',
              'uid': '3de3a5b6-de0f-11e9-a6d8-02e847915a0f',
              'resourceVersion': '185883',
              'creationTimestamp': '2019-09-23T14:34:25Z',
              'labels': {
                'name': 'binding-1569249226915-policy-test',
                'placementPolicy': 'placement-1569249226915-policy-test'
              },
              'annotations': {
                'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
                'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ='
              },
              'finalizers': [
                'propagator.finalizer.mcm.ibm.com'
              ]
            },
            'subjects': [
              {
                'kind': 'Policy',
                'apiGroup': 'policy.open-cluster-management.io',
                'name': '1569249226915-policy-test'
              }
            ],
            'placementRef': {
              'name': 'placement-1569249226915-policy-test',
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
          'localCompliantStatus': '0/1',
          'localValidStatus': '1/1',
          'compliant': 'NonCompliant',
          '__typename': 'CompliantStatus'
        },
        {
          'clusterNamespace': 'clusterhub',
          'localCompliantStatus': '0/1',
          'localValidStatus': '1/1',
          'compliant': 'NonCompliant',
          '__typename': 'CompliantStatus'
        }
      ],
      'compliancePolicy': [
        {
          'name': '1569249226915-policy-test',
          'status': 'NonCompliant',
          'complianceName': '1569249226915-policy-test',
          'complianceNamespace': 'mcm',
          'complianceSelfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
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
                'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
                'policy.open-cluster-management.io/controls': 'VA',
                'policy.open-cluster-management.io/standards': 'NIST',
                'seed-generation': '1'
              },
              'creationTimestamp': '2019-09-23T14:34:25Z',
              'finalizers': [
                'propagator.finalizer.mcm.ibm.com',
                'finalizer.policies.ibm.com'
              ],
              'generation': 7,
              'name': '1569249226915-policy-test',
              'namespace': 'mcm',
              'resourceVersion': '7688204',
              'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
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
            },
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
                  'propagator.finalizer.mcm.ibm.com',
                  'finalizer.policies.ibm.com'
                ],
                'generation': 7,
                'name': '1569249226915-policy-test',
                'namespace': 'mcm',
                'resourceVersion': '7688204',
                'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
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
            'name': '1569249226915-policy-test',
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
          'name': '1569249226915-policy-test',
          'clusterCompliant': [],
          'clusterNotCompliant': [
            'cluster1',
            'clusterhub'
          ],
          'complianceName': '1569249226915-policy-test',
          'complianceNamespace': 'mcm',
          'policies': [
            {
              'name': '1569249226915-policy-test',
              'cluster': 'cluster1',
              'compliant': 'NonCompliant',
              'complianceName': '1569249226915-policy-test',
              'complianceNamespace': 'mcm',
              'valid': 'unknown',
              'enforcement': 'unknown',
              'status': 'NonCompliant',
              'raw': null,
              'metadata': {
                'annotations': {
                  'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
                  'policy.open-cluster-management.io/controls': 'VA',
                  'policy.open-cluster-management.io/standards': 'NIST',
                  'seed-generation': '1'
                },
                'creationTimestamp': '2019-09-23T14:34:25Z',
                'name': '1569249226915-policy-test',
                'resourceVersion': '7688204',
                'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
                'uid': '3dc879b5-de0f-11e9-a1ed-005056a0b88e',
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
              'name': '1569249226915-policy-test',
              'cluster': 'clusterhub',
              'compliant': 'NonCompliant',
              'complianceName': '1569249226915-policy-test',
              'complianceNamespace': 'mcm',
              'valid': 'unknown',
              'enforcement': 'unknown',
              'status': 'NonCompliant',
              'raw': null,
              'metadata': {
                'annotations': {
                  'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
                  'policy.open-cluster-management.io/controls': 'VA',
                  'policy.open-cluster-management.io/standards': 'NIST',
                  'seed-generation': '1'
                },
                'creationTimestamp': '2019-09-23T14:34:25Z',
                'name': '1569249226915-policy-test',
                'resourceVersion': '7688204',
                'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/1569249226915-policy-test',
                'uid': '3dc879b5-de0f-11e9-a1ed-005056a0b88e',
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
      'policyCompliant': '2/2',
      'clusterCompliant': '2/2',
      'clusters': [
        'cluster1',
        'clusterhub'
      ],
      '__typename': 'Compliance'
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <PolicyTemplatesView
              className={'compliance-templates'}
              editResource={jest.fn()}
              editable={true}
              resourceType={resourceType}
              resourceData={resourceData}
              headerKey={'table.header.complianceTemplate'}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
