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

module.exports.ACM_ACCESS_COOKIE = 'acm-access-token-cookie'
module.exports.CFC_AUTH_COOKIE = 'cfc-acs-auth-cookie'

module.exports.REFRESH_TIMES = [5, 10, 30, 60, 5*60, 30*60, 0]
module.exports.DEFAULT_REFRESH_TIME = 10
module.exports.GRC_REFRESH_INTERVAL_COOKIE = 'grc-refresh-interval-cookie'
module.exports.GRC_VIEW_STATE_COOKIE = 'grc-view-state-cookie'
module.exports.GRC_SEARCH_STATE_COOKIE = 'grc-search-state-cookie'
module.exports.GRC_FILTER_STATE_COOKIE = 'grc-filter-state-cookie'

module.exports.RESOURCE_TYPES = {
  POLICIES_BY_CLUSTER: { name: 'PoliciesByCluster', query: 'ALL_POLICIES' },
  POLICIES_BY_POLICY: { name: 'HCMCompliance', query: 'ALL_POLICIES' },
  POLICY: { name: 'Policy', query: 'PoliciesList' },
  PLACEMENT_RULE: { name: 'PlacementRule', query: 'PlacementRulesList' },
  PLACEMENT_BINDING: { name: 'PlacementBinding', query: 'PlacementBindingsList' },
}
