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


export const resourceType = {
  'name': 'HCMCompliance',
  'list': 'ALL_POLICIES'
}

export const removeResourceModalLabels = {
  'primaryBtn': 'modal.remove-hcmcompliance.heading',
  'label': 'modal.remove-hcmcompliance.label',
  'heading': 'modal.remove-hcmcompliance.heading'
}

export const editResourceModalLabels = {
  'primaryBtn': 'modal.button.submit',
  'label': 'modal.edit-hcmcompliance.label',
  'heading': 'modal.edit-hcmcompliance.heading'
}

export const disableResourceModalLabels = {
  'primaryBtn': 'modal.disable-hcmcompliance.heading',
  'label': 'modal.disable-hcmcompliance.heading',
  'heading': 'modal.disable-hcmcompliance.heading'
}

export const enableResourceModalLabels = {
  'primaryBtn': 'modal.enable-hcmcompliance.heading',
  'label': 'modal.enable-hcmcompliance.label',
  'heading': 'modal.enable-hcmcompliance.heading'
}

export const enforceResourceModalLabels = {
  'primaryBtn': 'modal.enforce-hcmcompliance.heading',
  'label': 'modal.enforce-hcmcompliance.label',
  'heading': 'modal.enforce-hcmcompliance.heading'
}

export const informResourceModalLabels = {
  'primaryBtn': 'modal.inform-hcmcompliance.heading',
  'label': 'modal.inform-hcmcompliance.label',
  'heading': 'modal.inform-hcmcompliance.heading'
}

export const availableFilters = {
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
}

export const resourceModalData = {'kind':'HCMCompliance','metadata':{'name':'policy-auditpolicy-will-sev','namespace':'mcm','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-auditpolicy-will-sev','annotations':{'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections','policy.open-cluster-management.io/controls':'IAM','policy.open-cluster-management.io/standards':'FISMA','seed-generation':'2'},'resourceVersion':'5300122','__typename':'Metadata'},'name':'policy-auditpolicy-will-sev','namespace':'mcm','raw':{'apiVersion':'policy.open-cluster-management.io/v1','kind':'Policy','metadata':{'annotations':{'policy.open-cluster-management.io/categories':'SystemAndCommunicationsProtections','policy.open-cluster-management.io/controls':'IAM','policy.open-cluster-management.io/standards':'FISMA','seed-generation':'2'},'creationTimestamp':'2019-10-01T14:55:28Z','finalizers':['finalizer.policies.ibm.com','propagator.finalizer.mcm.ibm.com'],'generation':27,'name':'policy-auditpolicy-will-sev','namespace':'mcm','resourceVersion':'5300122','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/policies/policy-auditpolicy-will-sev','uid':'81b9569e-e45b-11e9-8895-005056a061f1'},'spec':{'complianceType':'musthave','namespaces':{'exclude':['kube-*'],'include':['default']},'policy-templates':[{'objectDefinition':{'apiVersion':'audit.policies.ibm.com/v1alpha1','kind':'AuditPolicy','metadata':{'label':{'category':'System-Integrity'},'name':'policy-auditpolicy-will-sev'},'spec':{'clusterAuditPolicy':{'auditPolicyRules':{'auth-idp':'ignore','helmapi':'ignore','kubernetes':'ignore','platform-api':'ignore','platform-identity-manager':'ignore','platform-identity-provider':'ignore','vulnerability-advisor':'ignore'}},'namespaceSelector':{'exclude':['kube-system'],'include':['default','kube-*']},'remediationAction':'inform','severity':'low'}},'status':{'Validity':{}}}],'remediationAction':'inform'},'status':{'placementBindings':['binding-policy-auditpolicy-will-sev'],'placementPolicies':['placement-policy-auditpolicy-will-sev'],'status':{'cluster1':{'aggregatePoliciesStatus':{'policy-auditpolicy-will-sev':{'compliant':'Compliant'}},'clustername':'cluster1','compliant':'Compliant'},'clusterhub':{'aggregatePoliciesStatus':{'policy-auditpolicy-will-sev':{}},'clustername':'clusterhub'}}}},'remediation':'inform','policyCompliant':'1/2','clusterCompliant':'1/2','placementPolicies':[{'metadata':{'name':'placement-policy-auditpolicy-will-sev','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementpolicies/placement-policy-auditpolicy-will-sev','__typename':'Metadata'},'__typename':'PlacementPolicy'}],'placementBindings':[{'metadata':{'name':'binding-policy-auditpolicy-will-sev','selfLink':'/apis/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings/binding-policy-auditpolicy-will-sev','__typename':'Metadata'},'__typename':'PlacementBinding'}],'__typename':'Compliance','subItems':[{'name':'policy.pb','items':['binding-policy-auditpolicy-will-sev']},{'name':'policy.pp','items':['placement-policy-auditpolicy-will-sev']}],'custom':{'metadata.name':{'key':null,'ref':null,'props':{'to':'/multicloud/policies/all/policy-auditpolicy-will-sev','children':'policy-auditpolicy-will-sev','replace':false},'_owner':null,'_store':{}},'metadata.annotations["policy.open-cluster-management.io/standards"]':'FISMA','metadata.annotations["policy.open-cluster-management.io/controls"]':'IAM','metadata.annotations["policy.open-cluster-management.io/categories"]':'System And Communications Protections'}}

export const resourceModalYAML= 'apiVersion: policy.open-cluster-management.io/v1\nkind: Policy\nmetadata:\n  name: policy-auditpolicy-will-sev\n  namespace: mcm\n  annotations:\n    policy.open-cluster-management.io/categories: SystemAndCommunicationsProtections\n    policy.open-cluster-management.io/controls: IAM\n    policy.open-cluster-management.io/standards: FISMA\n    seed-generation: \'2\'\n  finalizers:\n    - finalizer.policies.ibm.com\n    - propagator.finalizer.mcm.ibm.com\n  generation: 31\n  resourceVersion: \'5696116\'\nspec:\n  complianceType: musthave\n  namespaces:\n    exclude:\n      - kube-*\n    include:\n      - default\n  policy-templates:\n    - objectDefinition:\n        apiVersion: audit.policies.ibm.com/v1alpha1\n        kind: AuditPolicy\n        metadata:\n          name: policy-auditpolicy-will-sev\n          label:\n            category: System-Integrity\n        spec:\n          clusterAuditPolicy:\n            auditPolicyRules:\n              auth-idp: ignore\n              helmapi: ignore\n              kubernetes: ignore\n              platform-api: ignore\n              platform-identity-manager: ignore\n              platform-identity-provider: ignore\n              vulnerability-advisor: ignore\n          namespaceSelector:\n            exclude:\n              - kube-system\n            include:\n              - default\n              - kube-*\n          remediationAction: inform\n          severity: low\n  remediationAction: inform\n'
