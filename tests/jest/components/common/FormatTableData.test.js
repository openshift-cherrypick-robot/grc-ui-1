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

// Policy data was generated from a running cluster by logging the `policies`
// input to `FormatTableData` and includes compliant, noncompliant, and
// pending (just created) data
import { policies, policies2, policies3 } from './CommonTestingData'
import {
  formatPoliciesToClustersTableData,
  formatExpandablePolicies
} from '../../../../src-web/components/common/FormatTableData'

describe('formatPoliciesToClustersTableData', () => {
  // Tests whether policy data can be consolidated from individual policies to
  // cluster data containing an overview for each cluster specifically
  it('should correctly format', () => {
    expect(formatPoliciesToClustersTableData(policies)).toMatchSnapshot()
  })
  it('should correctly format', () => {
    expect(formatPoliciesToClustersTableData(policies2)).toMatchSnapshot()
  })
  it('should correctly format', () => {
    expect(formatPoliciesToClustersTableData(policies3)).toMatchSnapshot()
  })
  it('should return an empty array given nothing', () => {
    expect(formatPoliciesToClustersTableData(null)).toEqual([])
  })
})

describe('formatExpandablePolicies', () => {
  // Should inject additional data for expandable rows of the policies table
  it('should correctly add expandable data for table', () => {
    const result = formatExpandablePolicies(policies)
    expect(result).toMatchSnapshot()
    result.forEach(item => {
      expect(item.subItems.length).toEqual(2)
      expect(item.subItems[0].name).toEqual('policy.pb')
      expect(item.subItems[1].name).toEqual('policy.pp')
    })
  })
  it('should return an empty array given nothing', () => {
    expect(formatExpandablePolicies(null)).toEqual([])
  })
})

