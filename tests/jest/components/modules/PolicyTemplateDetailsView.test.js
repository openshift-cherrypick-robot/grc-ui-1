/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import renderer from 'react-test-renderer'
import React from 'react'
import PolicyTemplateDetailsView from '../../../../src-web/components/modules/PolicyTemplateDetailsView'

const data = {
  'apiVersion': 'policy.open-cluster-management.io/v1',
  'kind': 'ConfigurationPolicy',
  'metadata': {
    'creationTimestamp': '2020-08-20T22:37:24Z',
    'generation': 1,
    'labels': {
      'cluster-name': 'calamari',
      'cluster-namespace': 'calamari',
      'policy.open-cluster-management.io/cluster-name': 'calamari',
      'policy.open-cluster-management.io/cluster-namespace': 'calamari'
    },
    'name': 'policy-gatekeeper-admission',
    'namespace': 'calamari',
    'ownerReferences': [
      {
        'apiVersion': 'policy.open-cluster-management.io/v1',
        'blockOwnerDeletion': true,
        'controller': true,
        'kind': 'Policy',
        'name': 'default.policy-gatekeeper',
        'uid': '96210e96-ecbf-4aea-aa47-e11ec52f0855'
      }
    ],
    'resourceVersion': '25993504',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/configurationpolicies/policy-gatekeeper-admission',
    'uid': 'a925d81e-9b77-4de0-8917-5d55a46e2445'
  },
  'spec': {
    'object-templates': [
      {
        'complianceType': 'mustnothave',
        'objectDefinition': {
          'apiVersion': 'v1',
          'kind': 'Event',
          'metadata': {
            'annotations': {
              'constraint_action': 'deny',
              'constraint_kind': 'K8sRequiredLabels',
              'constraint_name': 'ns-must-have-gk',
              'event_type': 'violation'
            },
            'namespace': 'gatekeeper-system'
          }
        }
      }
    ],
    'remediationAction': 'inform',
    'severity': 'low'
  },
  'status': {
    'compliancyDetails': [
      {
        'Compliant': 'NonCompliant',
        'Validity': {},
        'conditions': [
          {
            'lastTransitionTime': '2020-08-21T17:01:43Z',
            'message': 'events exist and should be deleted: [openshift-multus.162c73ad488032d5, openshift-multus.162c749621995399, openshift-multus.162c757efd7ebb62] in namespace gatekeeper-system',
            'reason': 'K8s has a must `not` have object',
            'status': 'True',
            'type': 'violation'
          }
        ]
      }
    ],
    'compliant': 'NonCompliant',
    'relatedObjects': [
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'namespace': 'gatekeeper-system',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
          }
        },
        'reason': 'Resource found but not expected'
      },
      {
        'compliant': 'Compliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'namespace': 'gatekeeper-system',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
          }
        },
        'reason': 'Resource found and expected'
      },
      {
        'compliant': 'Pending',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'namespace': 'gatekeeper-system',
          }
        },
        'reason': 'No status',
        'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
      },
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c73ad488032d5',
            'namespace': 'gatekeeper-system',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c73ad488032d5'
          }
        },
        'reason': 'Resource found but not expected'
      },
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c749621995399',
            'namespace': 'gatekeeper-system',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c749621995399'
          }
        },
        'reason': 'Resource found but not expected'
      }
    ]
  }
}

const dataWithSelfLink = {
  'apiVersion': 'policy.open-cluster-management.io/v1',
  'kind': 'ConfigurationPolicy',
  'metadata': {
    'creationTimestamp': '2020-08-20T22:37:24Z',
    'generation': 1,
    'labels': {
      'cluster-name': 'calamari',
      'cluster-namespace': 'calamari',
      'policy.open-cluster-management.io/cluster-name': 'calamari',
      'policy.open-cluster-management.io/cluster-namespace': 'calamari'
    },
    'name': 'policy-gatekeeper-admission',
    'namespace': 'calamari',
    'ownerReferences': [
      {
        'apiVersion': 'policy.open-cluster-management.io/v1',
        'blockOwnerDeletion': true,
        'controller': true,
        'kind': 'Policy',
        'name': 'default.policy-gatekeeper',
        'uid': '96210e96-ecbf-4aea-aa47-e11ec52f0855'
      }
    ],
    'resourceVersion': '25993504',
    'selfLink': '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/configurationpolicies/policy-gatekeeper-admission',
    'uid': 'a925d81e-9b77-4de0-8917-5d55a46e2445'
  },
  'spec': {
    'object-templates': [
      {
        'complianceType': 'mustnothave',
        'objectDefinition': {
          'apiVersion': 'v1',
          'kind': 'Event',
          'metadata': {
            'annotations': {
              'constraint_action': 'deny',
              'constraint_kind': 'K8sRequiredLabels',
              'constraint_name': 'ns-must-have-gk',
              'event_type': 'violation'
            },
            'namespace': 'gatekeeper-system'
          }
        }
      }
    ],
    'remediationAction': 'inform',
    'severity': 'low'
  },
  'status': {
    'compliancyDetails': [
      {
        'Compliant': 'NonCompliant',
        'Validity': {},
        'conditions': [
          {
            'lastTransitionTime': '2020-08-21T17:01:43Z',
            'message': 'events exist and should be deleted: [openshift-multus.162c73ad488032d5, openshift-multus.162c749621995399, openshift-multus.162c757efd7ebb62] in namespace gatekeeper-system',
            'reason': 'K8s has a must `not` have object',
            'status': 'True',
            'type': 'violation'
          }
        ]
      }
    ],
    'compliant': 'NonCompliant',
    'relatedObjects': [
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
          }
        },
        'reason': 'Resource found but not expected'
      },
      {
        'compliant': 'Compliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
          }
        },
        'reason': 'Resource found and expected'
      },
      {
        'compliant': 'Pending',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c757efd7ebb62',
            'namespace': 'gatekeeper-system',
          }
        },
        'reason': 'No status',
        'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c757efd7ebb62'
      },
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c73ad488032d5',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c73ad488032d5'
          }
        },
        'reason': 'Resource found but not expected'
      },
      {
        'compliant': 'NonCompliant',
        'object': {
          'apiVersion': '/v1',
          'kind': 'events',
          'metadata': {
            'name': 'openshift-multus.162c749621995399',
            'selfLink': '/api/v1/namespaces/gatekeeper-system/events/openshift-multus.162c749621995399'
          }
        },
        'reason': 'Resource found but not expected'
      }
    ]
  }
}

describe('PolicyTemplateDetailsView component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <PolicyTemplateDetailsView template={data} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected with SelfLinnk', () => {
    const component = renderer.create(
      <PolicyTemplateDetailsView template={dataWithSelfLink} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected -- relatedObjects field is []', () => {
    data.status.relatedObjects = []
    const component = renderer.create(
      <PolicyTemplateDetailsView template={data} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected -- no related object field', () => {
    delete data.status.relatedObjects
    const component = renderer.create(
      <PolicyTemplateDetailsView template={data} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
