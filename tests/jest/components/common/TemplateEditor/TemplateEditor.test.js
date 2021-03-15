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
//import { existing } from '../ComponentsTestingData'

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
    'description': 'The namespace to create and store the policy on the hub cluster.',
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
    'description': 'The parameter section that describes which set of rules will validate a cluster.',
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
      'PodSecurityPolicy - no privileged pods',
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
    'description': 'Fill the required parameter field to select the cluster where your policy is applied. The placement policy and placement binding are required, and added into the YAML file.',
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
    'description': 'The name or names of security standards your policy should validate. You can only create a new label by adding it directly into the YAML file.',
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
    'description': 'A security control category represent specific requirements for one or more standards. You can only create a new label by adding it directly into the YAML file.',
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
    'description': 'The control contains the instructions for ensuring that a policy meets the security requirements for one or more standards. You can only create a new label by adding it directly into the YAML file.',
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
    'name': 'Enforce if supported',
    'description': 'Select Enforce, if the feature is supported for your policy, to update remediationAction. When Enforce is not selected, the parameter value for remediationAction is inform.',
    'id': 'enforce',
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
    'description': 'Select to disable the policy from being propagated to the managed cluster. If selected, the policy can be re-enabled from the dropdown menu in the policies table.',
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
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('on control change function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
      />
    )
    const evt = {
      target: {
        value: 'value-testing'
      },
      selectedItems: ['selectedItems-testing-1', 'selectedItems-testing-2'],
    }
    expect(wrapper.instance().onChange('name', evt)).toEqual('name')
    const evt_duplicateName = {
      target: { value: 'policy-pod' }
    }
    expect(wrapper.instance().onChange('name', evt_duplicateName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    const evt_emptyName = {
      target: { value: '' }
    }
    expect(wrapper.instance().onChange('name', evt_emptyName)).toEqual('name')
    expect(wrapper.instance().state.exceptions.some((exception) => exception.text === msgs['validation.missing.resource'])).toEqual(true)
    const evt_badName = {
      target: { value: 'a-b-' }
    }
    expect(wrapper.instance().onChange('name', evt_badName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    expect(wrapper.instance().state.validPolicyName).toEqual(false)
    expect(wrapper.instance().state.exceptions.some((exception) => exception.text === msgs['error.policy.nameFormat.short'])).toEqual(true)
    wrapper.instance().handleExceptionNotification(wrapper.instance().state.exceptions, 'success.create.policy.check', '')
    expect(wrapper.instance().renderNotifications()).toMatchSnapshot()
    expect(wrapper.instance().onChange('namespace', evt)).toEqual('namespace')
    expect(wrapper.instance().onChange('standards', evt)).toEqual('standards')
    expect(wrapper.instance().onChange('categories', evt)).toEqual('categories')
    expect(wrapper.instance().onChange('controls', evt)).toEqual('controls')
    expect(wrapper.instance().onChange('clusters', evt)).toEqual('clusters')
    const evt_inform = false
    expect(wrapper.instance().onChange('enforce', evt_inform)).toEqual('enforce')
    const evt_enforce = true
    expect(wrapper.instance().onChange('enforce', evt_enforce)).toEqual('enforce')
    const evt_spec = {
      target: { value: 'value-testing' },
      selectedItems: ['CertificatePolicy - cert management expiration']
    }
    expect(wrapper.instance().onChange('specs', evt_spec)).toEqual('specs')
  })
})

describe('on control change function', () => {
  const deepCopy = _.cloneDeep(controlData)
  deepCopy[1].active = null
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
      />
    )
    const evt = {
      target: {
        value: 'value-testing'
      },
      selectedItems: ['selectedItems-testing-1', 'selectedItems-testing-2'],
    }
    expect(wrapper.instance().onChange('name', evt)).toEqual('name')
    const evt_duplicateName = {
      target: { value: 'policy-pod' }
    }
    expect(wrapper.instance().onChange('name', evt_duplicateName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    const evt_emptyName = {
      target: { value: '' }
    }
    expect(wrapper.instance().onChange('name', evt_emptyName)).toEqual('name')
    expect(wrapper.instance().state.exceptions.some((exception) => exception.text === msgs['validation.missing.resource'])).toEqual(true)
    const evt_badName = {
      target: { value: 'a-b-' }
    }
    expect(wrapper.instance().onChange('name', evt_badName)).toEqual('name')
    expect(wrapper.instance().state.duplicateName).toEqual(false)
    expect(wrapper.instance().state.validPolicyName).toEqual(false)
    expect(wrapper.instance().state.exceptions.some((exception) => exception.text === msgs['error.policy.nameFormat.short'])).toEqual(true)
    wrapper.instance().handleExceptionNotification(wrapper.instance().state.exceptions, 'success.create.policy.check', '')
    expect(wrapper.instance().renderNotifications()).toMatchSnapshot()
    expect(wrapper.instance().onChange('namespace', evt)).toEqual('namespace')
    expect(wrapper.instance().onChange('standards', evt)).toEqual('standards')
    expect(wrapper.instance().onChange('categories', evt)).toEqual('categories')
    expect(wrapper.instance().onChange('controls', evt)).toEqual('controls')
    expect(wrapper.instance().onChange('clusters', evt)).toEqual('clusters')
    const evt_inform = false
    expect(wrapper.instance().onChange('enforce', evt_inform)).toEqual('enforce')
    const evt_enforce = true
    expect(wrapper.instance().onChange('enforce', evt_enforce)).toEqual('enforce')
    const evt_spec = {
      target: { value: 'value-testing' },
      selectedItems: ['CertificatePolicy - cert management expiration']
    }
    expect(wrapper.instance().onChange('specs', evt_spec)).toEqual('specs')
  })
})

describe('on editor change function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
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
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
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
        template={policyTemplate}
        controlData={deepCopy}
        portals={Portals}
      />
    )
    expect(wrapper.instance().handleParse()).toMatchSnapshot()
  })
})

describe('handleEditorCommand function', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TemplateEditor
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
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
        template={policyTemplate}
        controlData={controlData}
        portals={Portals}
      />
    )
    expect(wrapper.instance().getResourceJSON()).toEqual(null)
  })
})
