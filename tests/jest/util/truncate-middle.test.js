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
import truncate from'../../../src-web/util/truncate-middle'

describe('truncate middle', () => {
  it('should truncate string as expected', () => {
    expect(truncate(null, 5, '...')).toBe(null)
  })
  it('should truncate string as expected', () => {
    expect(truncate('this is a unit test', 5, '...')).toBe('t...t')
  })
  it('should truncate string as expected', () => {
    expect(truncate('this is a unit test', 10, '   ')).toBe('this   est')
  })
  it('should truncate string as expected', () => {
    expect(truncate('this is a unit test', 20, '...')).toBe('this is a unit test')
  })
  it('should truncate string as expected', () => {
    expect(truncate('this is a unit test', 6)).toBe('th...t')
  })
})
