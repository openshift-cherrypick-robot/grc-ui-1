/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ******************************************************************************
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { hideResourceToolbar, showResourceToolbar } from '../../../lib/client/resource-helper'
import { TemplateEditor } from '../common/TemplateEditor'
import policyTemplate from '../common/templates/policy-template.hbs'
import Choices from '../common/templates'
import msgs from '../../../nls/platform.properties'
import { LocaleContext } from '../common/LocaleContext'
import _ from 'lodash'

// where to put Create/Cancel buttons
const Portals = Object.freeze({
  editBtn: 'edit-button-portal-id',
  createBtn: 'create-button-portal-id',
  cancelBtn: 'cancel-button-portal-id',
})

// controlData is converted to templateData when template handlebar is rendered
//  id: becomes template variable;
//  active: becomes value replacement
//  type: what type of control to prompt user
//  available: available choices
//  reverse: the yaml object to control path--if user edits yaml, what control should be updated
//  mustExist: when validating the template for creation, this value must exist
const controlData = [
  {
    name: 'creation.view.policy.name',
    id: 'name',
    type: 'text',
    active: 'policy-grc',
    reverse: 'Policy[0].metadata.name',
    mustExist: true,
  },
  {
    name: 'creation.view.policy.namespace',
    id: 'namespace',
    type: 'singleselect',
    description: 'policy.create.namespace.tooltip',
    available: [],
    reverse: 'Policy[0].metadata.namespace',
    mustExist: true,
  },
  {
    name: 'creation.view.policy.specs',
    description: 'policy.create.specs.tooltip',
    placeholder: 'creation.view.policy.select.specs',
    id: 'specs',
    type: 'multiselect',
    available: [],
    isOneSelection: true, // close dropdown on one selection--otherwise dropdown stays open
    updateNamePrefix: 'policy-', // if user hasn't typed in a custom name, update name using this selection
    reverse: 'Policy[0].spec.policy-templates',
    mustExist: true,
  },
  {
    name: 'creation.view.policy.selector',
    description: 'policy.create.selectors.tooltip',
    placeholder: 'creation.view.policy.select.selectors',
    id: 'clusters',
    type: 'multiselect',
    available: [],
    reverse: 'PlacementRule[0].spec.clusterSelector', // automatically does matchLabels && matchExpressions
  },
  {
    name: 'creation.view.policy.standards',
    description: 'policy.create.standards.tooltip',
    placeholder: 'creation.view.policy.select.standards',
    id: 'standards',
    type: 'multiselect',
    available: ['NIST', 'NIST-CSF', 'PCI', 'FISMA', 'HIPAA'],
    reverse: 'Policy[0].metadata.annotations["policy.open-cluster-management.io/standards"]',
    cacheUserValueKey: 'create.policy.standards',
  },
  {
    name: 'creation.view.policy.categories',
    description: 'policy.create.categories.tooltip',
    placeholder: 'creation.view.policy.select.categories',
    id: 'categories',
    type: 'multiselect',
    available: [
      'PR.PT Protective Technology',
      'PR.DS Data Security',
      'PR.AC Identity Management and Access Control',
      'PR.IP Information Protection Processes and Procedures',
      'DE.CM Security Continuous Monitoring'
    ],
    reverse: 'Policy[0].metadata.annotations["policy.open-cluster-management.io/categories"]',
    cacheUserValueKey: 'create.policy.categories',
  },
  {
    name: 'creation.view.policy.controls',
    description: 'policy.create.controls.tooltip',
    placeholder: 'creation.view.policy.select.controls',
    id: 'controls',
    type: 'multiselect',
    available: [
      'PR.PT-1 Audit Logging',
      'PR.PT-3 Least Functionality',
      'PR.DS-1 Data-at-rest',
      'PR.DS-2 Data-in-transit',
      'PR.AC-4 Access Control',
      'PR.AC-5 Network Integrity',
      'PR.IP-1 Baseline Configuration',
      'DE.CM-7 Monitoring for Unauthorized Activity',
      'DE.CM-8 Vulnerability Scans'
    ],
    reverse: 'Policy[0].metadata.annotations["policy.open-cluster-management.io/controls"]',
    cacheUserValueKey: 'create.policy.controls',
  },
  {
    name: 'creation.view.policy.enforce',
    description: 'policy.create.enforce.tooltip',
    id: 'enforce',
    type: 'checkbox',
    active: 'inform',
    checked: false,
    available: ['inform', 'enforce'],  // in template, 'inform'===checkbox unchecked
    reverse: 'Policy[0].spec.remediationAction',
  },
  {
    name: 'creation.view.policy.disabled',
    description: 'policy.create.disabled.tooltip',
    id: 'disabled',
    type: 'checkbox',
    active: false,
    checked: false,
    available: [false, true],
    reverse: 'Policy[0].spec.disabled',
  },
]

export default class CreationView extends React.Component {

  static propTypes = {
    buildControl: PropTypes.shape({
      buildResourceLists: PropTypes.func,
    }),
    createAndUpdateControl: PropTypes.shape({
      createAndUpdateResource: PropTypes.func,
      cancelCreateAndUpdate: PropTypes.func,
      createAndUpdateStatus: PropTypes.string,
      createAndUpdateMsg: PropTypes.string
    }),
    createControl: PropTypes.shape({
      createResource: PropTypes.func,
      cancelCreate: PropTypes.func,
      creationStatus: PropTypes.string,
      creationMsg: PropTypes.string
    }),
    discovered: PropTypes.object,
    fetchControl: PropTypes.shape({
      isLoaded: PropTypes.bool,
      isFailed: PropTypes.bool,
    }),
    updateControl: PropTypes.shape({
      updateResource: PropTypes.func,
      cancelUpdate: PropTypes.func,
      updateStatus: PropTypes.string,
      updateMsg: PropTypes.string
    }),
  }

  static contextType = LocaleContext

  componentWillUnmount() {
    showResourceToolbar()
  }

  render() {
    hideResourceToolbar()
    const { locale } = this.context
    const {fetchControl, createControl, buildControl, updateControl, discovered, createAndUpdateControl} = this.props
    return (
      <TemplateEditor
        template={policyTemplate}
        controlData={getControlData(discovered, locale)}
        portals={Portals}
        fetchControl={fetchControl}
        createControl={createControl}
        buildControl={buildControl}
        updateControl={updateControl}
        createAndUpdateControl={createAndUpdateControl}
        type={'policy'}
        locale={locale}
      />
    )
  }
}

const getControlData = (discovered, locale) => {
  if (discovered) {
    const mergedData = _.cloneDeep(controlData)

    // add preset spec choices from yaml
    const controlMap = _.keyBy(mergedData, 'id')
    Object.values(Choices).forEach(choice=>{
      const available = _.get(controlMap, `${choice.multiselect}.available`)
      if (available) {
        available.push(choice)
      }
    })

    // add discovered choices from server
    //  add available annotations to categories, etc controls
    //  add existing policy names to name control
    const {policyNames, namespaces, annotations, clusterLabels, policiesByNamespace } = discovered
    const {name, namespace, clusters, standards, categories, controls } = _.keyBy(mergedData, 'id')
    name.existing = policyNames
    name.existingByNamespace = policiesByNamespace
    namespace.available = namespaces
    clusters.available = clusterLabels
    if ((typeof annotations.standards === 'object' && Object.keys(annotations.standards).length > 0)
      || (Array.isArray(annotations.standards) && annotations.standards.length > 0)) {
      standards.available = _.uniq([...standards.available, ...annotations.standards], true)
    }
    if ((typeof annotations.categories === 'object' && Object.keys(annotations.categories).length > 0)
      || (Array.isArray(annotations.categories) && annotations.categories.length > 0)) {
      categories.available = _.uniq([...categories.available, ...annotations.categories], true)
    }
    if ((typeof annotations.controls === 'object' && Object.keys(annotations.controls).length > 0)
      || (Array.isArray(annotations.controls) && annotations.controls.length > 0)) {
      controls.available = _.uniq([...controls.available, ...annotations.controls], true)
    }

    // convert message keys
    mergedData.forEach(control=>{
      ['name', 'description', 'placeholder'].forEach(key=>{
        if (control[key]) {
          control[key] = msgs.get(control[key], locale)
        }
      })
    })

    return mergedData
  }
  return controlData
}
