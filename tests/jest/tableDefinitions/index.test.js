/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'
import {
  getDefaultSearchField, getDefaultSortField,
  getLink, getPrimaryKey, getSecondaryKey,
  getTableKeys, getURIKey
} from '../../../src-web/tableDefinitions/index'
import { RESOURCE_TYPES } from '../../../lib/shared/constants'

// eslint-disable-next-line no-console
console.log('Below console logs are just unit test results, not actual errors:')

// regular properties/selector/reducer testing
// compare the received and expect values
describe('definitions/index', () => {
  describe('#getDefaultSearchField', () => {
    it('should return the default search field of node', () => {
      const resourceType = {
        query: 'ALL_POLICIES',
        name: 'HCMCompliance'
      }
      expect(getDefaultSearchField(resourceType)).toBe('metadata.name')
    })

    it('should return undefined', () => {
      const resourceType = {}
      expect(getDefaultSearchField(resourceType)).toBe(undefined)
    })
  })

  describe('#getDefaultSortField', () => {
    it('should return the default sort field of node', () => {
      const item = {
        query: 'ALL_POLICIES',
        name: 'HCMCompliance'
      }
      expect(getDefaultSortField(item)).toBe('metadata.name')
    })

    it('should return undefined and error log', () => {
      expect(getDefaultSortField({})).toEqual(undefined)
    })
  })

  describe('#getLink', () => {
    it('should return the link of node as /namespace/name', () => {
      const link = true
      const resource = {
        metadata: {
          namespace: 'namespace',
          name: 'name'
        }
      }
      expect(getLink(link, resource)).toBe('/namespace/name')
    })
    it('should return the link of node as /namespace/name', () => {
      const link = (resource) => {
        return `/${resource.metadata.test1}/${resource.metadata.test2}`
      }
      const resource = {
        metadata: {
          test1: 'test1',
          test2: 'test2'
        }
      }
      expect(getLink(link, resource)).toBe('/test1/test2')
    })
    it('should return the link of node as /domain/host', () => {
      const link = 'domain/host'
      const resource = {
        domain: 'domain',
        host: 'host',
        metadata: {
          namespace: 'namespace',
          name: 'name'
        }
      }
      expect(getLink(link, resource)).toBe('/domain/host')
    })
  })

  describe('#getPrimaryKey', () => {
    it('should return the primary key of node', () => {
      const item = {
        query: 'ALL_POLICIES',
        name: 'HCMCompliance'
      }
      expect(getPrimaryKey(item)).toBe('metadata.name')
    })

    it('should return default value metadata.uid', () => {
      const item = {}
      expect(getPrimaryKey(item)).toBe('metadata.uid')
    })
  })

  describe('#getSecondaryKey', () => {
    it('should return the secondary key of node', () => {
      const item = {
        query: 'ALL_POLICIES',
        name: 'HCMCompliance'
      }
      expect(getSecondaryKey(item)).toBe('metadata.namespace')
    })

    it('should return default value cluster', () => {
      const item = {}
      expect(getSecondaryKey(item)).toBe('cluster')
    })
  })

  describe('#getTableKeys', () => {
    expect(getTableKeys(RESOURCE_TYPES.POLICIES_BY_POLICY)).toMatchSnapshot()
  })

  describe('#getURIKey', () => {
    it('should return the default sort field of node', () => {
      const item = {
        query: 'ALL_POLICIES',
        name: 'HCMCompliance'
      }
      expect(getURIKey(item)).toBe('metadata.name')
    })

    it('should return default value metadata.name', () => {
      const item = {}
      expect(getURIKey(item)).toBe('metadata.name')
    })
  })
})
