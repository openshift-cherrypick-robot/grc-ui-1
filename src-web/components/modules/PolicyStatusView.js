/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Title,
  ToggleGroup,
  ToggleGroupItem,
} from '@patternfly/react-core'
import { AcmTable, AcmTablePaginationContextProvider } from '@stolostron/ui-components'
import { LocaleContext } from '../common/LocaleContext'
import statusByTemplatesDef from '../../tableDefinitions/statusByTemplatesDef'
import statusByClustersDef from '../../tableDefinitions/statusByClustersDef'
import NoResource from '../../components/common/NoResource'
import { transform } from '../../tableDefinitions/utils'
import { checkCreatePermission } from '../../utils/CheckUserPermission'
import msgs from '../../nls/platform.properties'
import '../../scss/policy-status-view.scss'

class PolicyStatusView extends React.Component {
  constructor(props) {
    super(props)
    const paramQuery = new URLSearchParams(location.search.substring(1))
    const indexQuery = paramQuery.get('index')
    const clusterQuery = paramQuery.get('clusterFilter')
    const toggleIndex = indexQuery && parseInt(indexQuery, 10) < 2 ? parseInt(indexQuery, 10) : 0
    this.state= {
      toggleIndex,
      toggleIndexQueryEnabled: Boolean(indexQuery !== null),
      clusterQuery
    }
    this.toggleClick = this.toggleClick.bind(this)
  }

  static contextType = LocaleContext

  render() {
    const { items=[], userAccess } = this.props
    const { locale } = this.context
    if (items.length === 0) {
      return <NoResource
        title={msgs.get('no-status.title', [msgs.get('routes.grc', locale)], locale)}
        svgName='EmptyPagePlanet-illus.png'>
      </NoResource>
    }
    // Check for "create" permissions in order to determine whether to enable
    // the "View Details" link, which requires creating a managedClusterView
    // (See https://github.com/stolostron/backlog/issues/6135)
    const showDetailsLink = checkCreatePermission(userAccess)
    const statusAccess = items.map(item => ({...item, showDetailsLink: showDetailsLink}))
    const tableDataByTemplate = groupByTemplate(statusAccess, locale)
    const tableDataByClusters = transform(statusAccess, statusByClustersDef, locale)
    const {toggleIndex, clusterQuery} = this.state

    return (
      <div className='policy-status-view'>
        <ToggleGroup className='policy-status-toggle' variant='light'>
          <ToggleGroupItem
            buttonId={'policy-status-clusters'}
            onChange={this.toggleClick}
            isSelected={toggleIndex===0}
            text={msgs.get('tabs.policy.status.toggle.clusters', locale)}
            >
          </ToggleGroupItem>
          <ToggleGroupItem
            buttonId={'policy-status-templates'}
            onChange={this.toggleClick}
            isSelected={toggleIndex===1}
            text={msgs.get('tabs.policy.status.toggle.templates', locale)}
            >
          </ToggleGroupItem>
        </ToggleGroup>
        <div className='policy-status-tab'>
          {toggleIndex===0 && <div className='policy-status-by-clusters-table'>
            <Title
              className='title'
              headingLevel="h3">
              {msgs.get('tabs.policy.status.toggle.clusters', locale)}
            </Title>
            <AcmTablePaginationContextProvider localStorageKey='grc-status-view'>
              <AcmTable
                items={tableDataByClusters.rows}
                columns={tableDataByClusters.columns}
                keyFn={(item) => item.uid.toString()}
                gridBreakPoint=''
                search={clusterQuery}
                setSearch={this.handleSearch}
                initialSort={tableDataByClusters.sortBy}
                searchPlaceholder={msgs.get('tabs.grc.toggle.clusterViolations.placeHolderText', locale)}
                fuseThreshold={0}
                plural={'clusters'}
              />
            </AcmTablePaginationContextProvider>
          </div>}
          {toggleIndex===1 && tableDataByTemplate.map((table) => {
            return <div
              className='policy-status-by-templates-table'
              key={`template-index-${table.name}`}
            >
              <Title
                className='title'
                headingLevel="h3">
                {`${msgs.get('policy.template', locale)}: ${table.name}`}
              </Title>
              <AcmTablePaginationContextProvider localStorageKey='grc-status-view'>
                <AcmTable
                  items={table.data.rows}
                  columns={table.data.columns}
                  keyFn={(item) => item.uid.toString()}
                  gridBreakPoint=''
                  initialSort={table.data.sortBy}
                  searchPlaceholder={msgs.get('tabs.grc.toggle.clusterViolations.placeHolderText', locale)}
                  fuseThreshold={0}
                  plural={'templates'}
                />
              </AcmTablePaginationContextProvider>
            </div>
          })}
        </div>
      </div>
    )
  }

  handleSearch = (value) => {
    // Update URL query if it changes (without adding to browser history)

    const searchQuery = new URLSearchParams(location.search.substring(1))
    searchQuery.delete('clusterFilter')
    // If there are other queries, keep them in the URL, otherwise return the URL without queries
    if (searchQuery.toString() !== '') {
      window.history.replaceState({}, document.title, `${location.origin}${location.pathname}?${searchQuery.toString()}`)
    } else {
      window.history.replaceState({}, document.title, `${location.origin}${location.pathname}`)
    }

    this.setState({
      clusterQuery: value,
    })
  }

  toggleClick(isSelected, event) {
    if (isSelected) {
      const eventArray = [
        'policy-status-clusters',
        'policy-status-templates'
      ]
      const index = eventArray.indexOf(event.currentTarget.id)
      const toggleIndex = index < 0 ? 0 : index
      this.setState({toggleIndex})
      // Only update the URL if there was a query to begin with
      if (this.state.toggleIndexQueryEnabled) {
        const toggleQuery = new URLSearchParams(location.search.substring(1))
        toggleQuery.set('index', toggleIndex)
        window.history.replaceState({}, document.title, `${location.origin}${location.pathname}?${toggleQuery.toString()}`)
      }
    }
  }
}

function groupByTemplate(status, locale) {
  if (!(Array.isArray(status) && status.length > 0)) {
    return []
  }
  const tableDataByTemplate = []
  const templateNames = new Set(status.map((s) => s.templateName))
  templateNames.forEach((tname) => {
    const matchingStatuses = status.filter((s) => s.templateName === tname)
    tableDataByTemplate.push({
      name: tname?.toString(),
      data: transform(matchingStatuses, statusByTemplatesDef, locale)
    })
  })
  return tableDataByTemplate
}

PolicyStatusView.propTypes = {
  items: PropTypes.array,
  // searchValue: PropTypes.string,
  userAccess: PropTypes.array,
}

const mapStateToProps = (state) => {
  const userAccess = state.userAccess && state.userAccess.access
    ? state.userAccess.access
    : []
  return {
    userAccess: userAccess
  }
}

export default connect(mapStateToProps)(PolicyStatusView)
