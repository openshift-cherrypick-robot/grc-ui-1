/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import {TemplateEditor} from '../../../../../src-web/components/common/TemplateEditor'
import renderer from 'react-test-renderer'
import policyTemplate from '../../../../../src-web/components/common/templates/policy-template.hbs'
import { shallow } from 'enzyme'
import _ from 'lodash'
const msgs = require('../../../config/platform-properties.json')

const Portals = Object.freeze({
  createBtn: 'create-button-portal-id',
  cancelBtn: 'cancel-button-portal-id',
})

const controlData = [
  {
    'name': 'Name',
    'id': 'name',
    'type': 'text',
    'active': 'policy-certificatepolicy-1',
    'reverse': [
      'Policy[0].metadata.name'
    ],
    'mustExist': true,
    'existing': [
      'policy-certificatepolicy',
      'policy-grc-rbactest',
      'policy-iampolicy',
      'policy-iampolicy-1',
      'policy-pod',
      'policy-rolebinding-test',
      'policy-trustednode'
    ]
  },
  {
    'name': 'Namespace',
    'id': 'namespace',
    'type': 'singleselect',
    'description': 'Enter the hub cluster namespace where the policy is created and stored.',
    'available': [
      'blah',
      'default',
      'governance',
      'hive'
    ],
    'reverse': [
      'Policy[0].metadata.namespace'
    ],
    'mustExist': true,
    'active': 'governance'
  },
  {
    'name': 'Specifications',
    'description': 'Select a policy to define the parameters for a specific policy. The specifications are automatically updated after you select a policy.',
    'placeholder': 'Begin typing to search for label to select',
    'id': 'specs',
    'type': 'multiselect',
    'available': [
      'CertificatePolicy - cert management expiration',
      'IamPolicy - limit clusteradminrole and report violation',
      'ImageManifestVulnPolicy - detect image vulnerabilities',
      'LimitRange - limit memory usage',
      'Namespace - must have namespace \'prod\'',
      'Pod - nginx pod must exist',
      'Role - role must follow defined permissions',
      'RoleBinding - role binding must exist',
      'SecurityContextConstraints - restricted scc'
    ],
    'isOneSelection': true,
    'updateNamePrefix': 'policy-',
    'reverse': [
      'Policy[0].spec.role-templates',
      'Policy[0].spec.object-templates',
      'Policy[0].spec.policy-templates'
    ],
    'mustExist': true,
    'availableMap': {
      'CertificatePolicy - cert management expiration': {
        'name': 'CertificatePolicy',
        'description': 'cert management expiration',
        'multiselect': 'specs',
        'replacements': {
          'standards': 'NIST-CSF\n',
          'categories': 'PR.DS Data Security\n',
          'controls': 'PR.DS-2 Data-in-transit\n',
          'policyTemplates': '- objectDefinition:\n    apiVersion: policies.ibm.com/v1alpha1\n    kind: CertificatePolicy # cert management expiration\n    metadata:\n      name: {{name}}-example\n    spec:\n      namespaceSelector:\n        include: ["default"]\n        exclude: []\n      remediationAction: inform\n      severity: low\n      minimumDuration: 300h\n'
        }
      }
    },
    'hasReplacements': true,
    'active': [
      'CertificatePolicy - cert management expiration'
    ]
  },
  {
    'name': 'Cluster selector',
    'description': 'Search for a label to apply to the policy.',
    'placeholder': 'Begin typing to search for label to select',
    'id': 'clusters',
    'type': 'multiselect',
    'available': [
      'cloud: "Amazon"',
      'vendor: "OpenShift"',
      'name: "calamari"'
    ],
    'reverse': [
      'PlacementRule[0].spec.clusterSelector'
    ],
    'mustExist': false,
    'availableMap': {
      'cloud: "Amazon"': {
        'key': 'cloud',
        'value': 'Amazon'
      },
      'name: "calamari"': {
        'key': 'name',
        'value': 'calamari'
      },
      'vendor: "OpenShift"': {
        'key': 'vendor',
        'value': 'OpenShift'
      }
    },
    'hasLabels': true,
    'active': [
      'cloud: "Amazon"'
    ]
  },
  {
    'name': 'Standards',
    'description': 'Enter the name or names of the specific rules or conditions that are required for this policy.',
    'placeholder': 'Begin typing to search for label to select',
    'id': 'standards',
    'type': 'multiselect',
    'available': [
      'NIST',
      'PCI',
      'FISMA',
      'HIPAA',
      'NIST-CSF'
    ],
    'reverse': [
      'Policy[0].metadata.annotations["policy.open-cluster-management.io/standards"]'
    ],
    'cacheUserValueKey': 'create.policy.standards',
    'wasSet': new Set([
      'CertificatePolicy - cert management expiration'
    ]),
    'active': [
      'NIST-CSF'
    ]
  },
  {
    'name': 'Categories',
    'description': 'Enter the name of the requirements for the standard that you entered.',
    'placeholder': 'Begin typing to search for label to select',
    'id': 'categories',
    'type': 'multiselect',
    'available': [
      'PR.PT Protective Technology',
      'PR.DS Data Security',
      'PR.AC Identity Management Authentication and Access Control',
      'PR.IP Information Protection Processes and Procedures',
      'DE.CM Security Continuous Monitoring'
    ],
    'reverse': [
      'Policy[0].metadata.annotations["policy.open-cluster-management.io/categories"]'
    ],
    'cacheUserValueKey': 'create.policy.categories',
    'wasSet': new Set([
      'CertificatePolicy - cert management expiration'
    ]),
    'active': [
      'PR.DS Data Security'
    ]
  },
  {
    'name': 'Controls',
    'description': 'Enter the name of the protection measure that is related to the controls for this policy.',
    'placeholder': 'Begin typing to search for label to select',
    'id': 'controls',
    'type': 'multiselect',
    'available': [
      'PR.PT-1 Audit Logging',
      'PR.PT-3 Least Functionality',
      'PR.DS-2 Data-in-transit',
      'PR.DS-2 Data-at-rest',
      'PR.AC-4 Access Control',
      'PR.AC-5 Network Integrity',
      'PR.IP-1 Baseline Configuration',
      'DE.CM-7 Monitoring for unauthorized activity',
      'DE.CM-8 Vulnerability scans'
    ],
    'reverse': [
      'Policy[0].metadata.annotations["policy.open-cluster-management.io/controls"]'
    ],
    'cacheUserValueKey': 'create.policy.controls',
    'wasSet': new Set([
      'CertificatePolicy - cert management expiration'
    ]),
    'active': [
      'PR.DS-2 Data-in-transit'
    ]
  },
  {
    'name': `${msgs['creation.view.policy.remediation']}`,
    'description': `${msgs['policy.create.remediation.tooltip']}`,
    'id': 'remediation',
    'type': 'checkbox',
    'active': 'inform',
    'checked': false,
    'available': [
      'inform',
      'enforce'
    ],
    'reverse': [
      'Policy[0].spec.remediationAction'
    ],
    'mustExist': true
  },
  {
    'name': 'Disable policy',
    'description': 'Select Disable to pause propagation to your managed clusters.',
    'id': 'disabled',
    'type': 'checkbox',
    'active': false,
    'checked': false,
    'available': [
      'false',
      'true'
    ],
    'reverse': [
      'Policy[0].spec.disabled'
    ]
  }
]

describe('TemplateEditor component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('on control change function with active selections', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    const evt = ['selectedItems-testing-1', 'selectedItems-testing-2']
    const evt_name = 'new_name'
    expect(wrapper.instance().onChange('name', evt_name)).toEqual('name')
    const evt_duplicateName = 'policy-pod'
    expect(wrapper.instance().onChange('name', evt_duplicateName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    const evt_emptyName = ''
    expect(wrapper.instance().onChange('name', evt_emptyName)).toEqual('name')
    const evt_badName = 'a-b-'
    expect(wrapper.instance().onChange('name', evt_badName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    expect(wrapper.instance().state.validPolicyName).toEqual(false)
    expect(wrapper.instance().renderNotifications()).toMatchSnapshot()
    expect(wrapper.instance().onChange('namespace', evt)).toEqual('namespace')
    expect(wrapper.instance().onChange('standards', evt)).toEqual('standards')
    expect(wrapper.instance().onChange('categories', evt)).toEqual('categories')
    expect(wrapper.instance().onChange('controls', evt)).toEqual('controls')
    expect(wrapper.instance().onChange('clusters', evt)).toEqual('clusters')
    const evt_inform = { currentTarget: { value: 'inform' }}
    expect(wrapper.instance().onChange('remediation', null, evt_inform)).toEqual('remediation')
    const evt_enforce = { currentTarget: { value: 'enforce' }}
    expect(wrapper.instance().onChange('remediation', null, evt_enforce)).toEqual('remediation')
    const evt_spec = ['CertificatePolicy - cert management expiration']
    expect(wrapper.instance().onChange('specs', evt_spec)).toEqual('specs')
  })
})

describe('on control change function without active selections', () => {
  const deepCopy = _.cloneDeep(controlData)
  deepCopy[1].active = null
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    const evt = ['selectedItems-testing-1', 'selectedItems-testing-2']
    const evt_name = 'new_name'
    expect(wrapper.instance().onChange('name', evt_name)).toEqual('name')
    const evt_duplicateName = 'policy-pod'
    expect(wrapper.instance().onChange('name', evt_duplicateName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    const evt_emptyName =''
    expect(wrapper.instance().onChange('name', evt_emptyName)).toEqual('name')
    const evt_badName = 'a-b-'
    const evt_namespace = {
      selectedItem: 'test-namespace'
    }
    // Without any namespace, the name should still be valid to allow the missing namespace error to show
    expect(wrapper.instance().onChange('name', evt_badName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    expect(wrapper.instance().state.validPolicyName).toEqual(true)
    // With a namespace, the name should no longer be valid
    expect(wrapper.instance().onChange('namespace', evt_namespace)).toEqual('namespace')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    expect(wrapper.instance().state.validPolicyName).toEqual(false)
    expect(wrapper.instance().renderNotifications()).toMatchSnapshot()
    expect(wrapper.instance().onChange('namespace', evt)).toEqual('namespace')
    expect(wrapper.instance().onChange('standards', evt)).toEqual('standards')
    expect(wrapper.instance().onChange('categories', evt)).toEqual('categories')
    expect(wrapper.instance().onChange('controls', evt)).toEqual('controls')
    expect(wrapper.instance().onChange('clusters', evt)).toEqual('clusters')
    const evt_inform = { currentTarget: { value: 'inform' }}
    expect(wrapper.instance().onChange('remediation', null, evt_inform)).toEqual('remediation')
    const evt_enforce = { currentTarget: { value: 'enforce' }}
    expect(wrapper.instance().onChange('remediation', null, evt_enforce)).toEqual('remediation')
    const evt_spec = ['CertificatePolicy - cert management expiration']
    expect(wrapper.instance().onChange('specs', evt_spec)).toEqual('specs')
  })
})

describe('on editor change function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(wrapper.instance().handleParse()).toMatchSnapshot()
  })
})

describe('on editor change function', () => {
  const deepCopy = _.cloneDeep(controlData)
  deepCopy[1].active = null
  deepCopy[deepCopy.length-1].active = false
  deepCopy[deepCopy.length-1].available = [true, false]
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(wrapper.instance().handleParse()).toMatchSnapshot()
  })
})

describe('on editor change function', () => {
  const deepCopy = _.cloneDeep(controlData)
  deepCopy[1].active = [['default1', 'default2'], 'mcm']
  deepCopy[deepCopy.length-1].active = true
  deepCopy[deepCopy.length-1].available = [true, false]
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(wrapper.instance().handleParse()).toMatchSnapshot()
  })
})

describe('handleEditorCommand function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(wrapper.instance().handleEditorCommand('next')).toEqual('next')
    expect(wrapper.instance().handleEditorCommand('undo')).toEqual('undo')
    expect(wrapper.instance().handleEditorCommand('redo')).toEqual('redo')
    expect(wrapper.instance().handleEditorCommand('restore')).toEqual('restore')
  })
})

describe('getResourceJSON function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        onCreate={jest.fn()}
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
        createControl={{}}
        type={''}
      />
    )
    expect(wrapper.instance().getResourceJSON()).toEqual(null)
  })
})
