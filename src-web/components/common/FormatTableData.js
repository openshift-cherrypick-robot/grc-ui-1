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
import _ from 'lodash'

export const formatPoliciesToClustersTableData = (policies) => {
  const clusterTableData = []
  const clusterMap = new Map()
  if (Array.isArray(policies) && policies.length > 0) {
    policies.forEach((policy) => {
      const statuses = _.get(policy, 'raw.status.status', {})
      // step 1, build policies info grouped by each unique cluster name
      if (Array.isArray(statuses) && statuses.length > 0) {
        statuses.forEach((singleClusterStatus) => {
          const clusterName = singleClusterStatus.clustername
          if (!clusterMap.has(clusterName)) {
            clusterMap.set(clusterName, [])
          }
          let compliantNum = 0
          let nonCompliantNum = 0
          let nameSpace = '-'
          let consoleURL = '-'
          let nonCompliantPolicyName = ''
          if (policy.clusterNS && typeof policy.clusterNS === 'object' && policy.clusterNS[clusterName]) {
            nameSpace = policy.clusterNS[clusterName]
          }
          if (policy.clusterConsoleURL && typeof policy.clusterConsoleURL === 'object' && policy.clusterConsoleURL[clusterName]) {
            consoleURL = policy.clusterConsoleURL[clusterName]
          }
          const policyCompliantStatusOnCluster = _.get(singleClusterStatus, 'compliant', '').trim().toLowerCase()
          if (policyCompliantStatusOnCluster === 'compliant') {
            compliantNum = 1
          } else if (policyCompliantStatusOnCluster === 'noncompliant') {
            nonCompliantNum = 1
            nonCompliantPolicyName = _.get(policy, 'metadata.name', '-')
          } else {
            nonCompliantPolicyName = _.get(policy, 'metadata.name', '-')
          }
          const singlePolicyData = {
            nameSpace,
            compliantNum,
            nonCompliantNum,
            nonCompliantPolicyName,
            consoleURL,
          }
          clusterMap.get(clusterName).push(singlePolicyData)
        })
      }
    })

    // step 2, combine single policy info in policiesData together under each unique cluster name
    for (const [clusterName, policiesData] of clusterMap.entries()) {
      let namespace = '-'
      let consoleURL = '-'
      let totalCompliantNum = 0
      let totalNonCompliantNum = 0
      const totalPoliciesUnderCluster = policiesData.length
      const nonCompliant = []
      policiesData.forEach((singlePolicyData) => {
        namespace = singlePolicyData.nameSpace
        if (singlePolicyData.nonCompliantPolicyName) {
          nonCompliant.push(singlePolicyData.nonCompliantPolicyName)
        }
        totalCompliantNum += singlePolicyData.compliantNum
        totalNonCompliantNum += singlePolicyData.nonCompliantNum
        consoleURL = singlePolicyData.consoleURL
      })
      const singleClusterData = {
        cluster: clusterName,
        namespace,
        violation: `${totalNonCompliantNum}/${totalPoliciesUnderCluster}/${totalPoliciesUnderCluster-totalCompliantNum-totalNonCompliantNum}`,
        nonCompliant,
        consoleURL,
      }
      clusterTableData.push(singleClusterData)
    }
  }
  return clusterTableData
}

export const formatExpandablePolicies = (policies) => {
  const result = []
  if (policies) {
    policies.forEach(policy => {
      if(policy) {
        const subItems = [{name: 'policy.pb', items: policy.placementBindings ? policy.placementBindings.map(pb => pb.metadata.name) : []},
          {name: 'policy.pp', items: policy.placementPolicies ? policy.placementPolicies.map(pp => pp.metadata.name) : []}]
        result.push({...policy, subItems})
      }
    })
  }
  return result
}
