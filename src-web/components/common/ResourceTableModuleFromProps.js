/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Module, ModuleHeader, ModuleBody } from 'carbon-addons-cloud-react'
import _ from 'lodash'
import msgs from '../../../nls/platform.properties'
// eslint-disable-next-line import/no-named-as-default
import ResourceTable from '../../components/common/ResourceTable'
import TableHelper from '../../util/table-helper'
import { LocaleContext } from '../../components/common/LocaleContext'

export class ResourceTableModule extends React.Component {
  static propTypes = {
    definitionsKey: PropTypes.string,
    normalizedKey: PropTypes.string,
    resourceType: PropTypes.object,
    showPagination: PropTypes.bool,
    showSearch: PropTypes.bool,
    staticResourceData: PropTypes.object,
    subResourceType: PropTypes.object,
    tableResources: PropTypes.array,
  }

  static contextType = LocaleContext

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.formatResourceData = this.formatResourceData.bind(this)
    this.handleSearch=TableHelper.handleInputValue.bind(this, this.handleSearch)
    this.state = {
      resourceItems: {},
      resourceIds: [],
      sortDirection: 'asc',
      searchValue: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.formatResourceData()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { tableResources } = this.props
    if (nextProps.tableResources !== tableResources) {
      this.formatResourceData(nextProps.tableResources)
    }
  }

  render() {
    const { staticResourceData, definitionsKey, resourceType, subResourceType, showSearch, showPagination } = this.props
    const keys = staticResourceData[definitionsKey]
    const { resourceItems, resourceIds, searchValue, sortDirection } = this.state
    const showModuleHeader = _.get(this.props, 'showModuleHeader', true)

    return (
      (resourceItems && Object.keys(resourceItems).length > 0 || searchValue)? <Module id={`${definitionsKey}-module-id`}>
        {showModuleHeader ? <ModuleHeader>{msgs.get(keys.title, this.context.locale)}</ModuleHeader> : null}
        <ModuleBody>
          <ResourceTable
            items={resourceItems || []}
            itemIds={resourceIds || []}
            staticResourceData={keys}
            resourceType={resourceType}
            subResourceType={subResourceType}
            totalFilteredItems={resourceIds && resourceIds.length}
            handleSort={this.handleSort}
            handleSearch={this.handleSearch}
            searchValue={searchValue}
            darkSearchBox={false}
            sortDirection={sortDirection}
            tableActions={keys.tableActions}
            showSearch={showSearch}
            showPagination={showPagination}
          />
        </ModuleBody>
      </Module> : null
    )
  }

  createNormalizedItems(input, normalizedKey) {
    if (input) {
      return _.keyBy(input, repo => normalizedKey? `${_.get(repo, normalizedKey)}${_.get(repo, 'cluster', '')}`: _.get(repo, 'name', ''))
    }
    return []
  }

  formatResourceData(inputData) {
    let { tableResources } = this.props
    const { normalizedKey } = this.props
    if (inputData) {
      tableResources = inputData
    }
    const { searchValue } = this.state
    let normalizedItems = this.createNormalizedItems(tableResources,normalizedKey)
    let itemIds = Object.keys(normalizedItems)
    if (searchValue) {
      itemIds = itemIds.filter(repo => repo.includes(searchValue))
      normalizedItems = _.pick(normalizedItems, itemIds)
    }
    this.setState({ resourceItems: normalizedItems, resourceIds: itemIds })
  }

  // handleSearch will only search for a specific id column
  handleSearch(searchValue) {
    if (!searchValue) {
      return this.setState({ searchValue: '' }, this.formatResourceData)
    }
    this.setState((prevState) => {
      let resItems = prevState.resourceItems
      let resIds = prevState.resourceIds
      resIds = resIds.filter(repo => repo.includes(searchValue))
      resItems = _.pick(resItems, resIds)
      return { resourceItems: resItems, resourceIds: resIds, searchValue }
    })
    return undefined
  }
  handleSort(key) {
    const target = key.currentTarget
    const selectedKey = target && target.getAttribute('data-key')
    if (selectedKey) {
      const { staticResourceData, definitionsKey } = this.props
      const resourceKeys = staticResourceData[definitionsKey]
      const { resourceItems, sortDirection } = this.state
      const sortKey = resourceKeys.tableKeys.find(tableKey => tableKey.resourceKey === selectedKey).resourceKey
      const sortedRes = _.orderBy(resourceItems, [sortKey], [sortDirection])

      const { normalizedKey } = resourceKeys
      const normalizedItems = this.createNormalizedItems(sortedRes, normalizedKey)
      const itemIds = Object.keys(normalizedItems)
      this.setState({ resourceIds: itemIds, resourceItems: normalizedItems, sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { staticResourceData, definitionsKey, resourceData } = ownProps
  const resourceKey = staticResourceData[definitionsKey].resourceKey
  const normalizedKey = staticResourceData[definitionsKey].normalizedKey
  const tableResources = resourceData[resourceKey]
  return {
    normalizedKey,
    tableResources
  }
}

export default withRouter(connect(mapStateToProps)(ResourceTableModule))
