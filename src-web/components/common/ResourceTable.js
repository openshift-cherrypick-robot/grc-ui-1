/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import resources from '../../../lib/shared/resources'
import { PAGE_SIZES } from '../../actions/index'
import {
  PaginationV2, DataTable, OverflowMenu, OverflowMenuItem, Icon, Checkbox
} from 'carbon-components-react'
import { Tooltip } from '@patternfly/react-core'
import PropTypes from 'prop-types'
import { createDisableTooltip } from './DisableTooltip'
import msgs from '../../../nls/platform.properties'
import { transform } from '../../../lib/client/resource-helper'
import { resourceActions } from './ResourceTableRowMenuItemActions'
import { connect } from 'react-redux'
import { getLink, getPrimaryKey, getSecondaryKey } from '../../tableDefinitions/index'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import filterUserAction from './FilterUserAction'
import { LocaleContext } from './LocaleContext'
import formatUserAccess from './FormatUserAccess'

resources(() => {
  require('../../../scss/table.scss')
})

const translateWithId = (locale, id) => msgs.get(id, locale)

const {
  TableContainer,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableBody,
  TableCell
} = DataTable

export class ResourceTable extends React.Component {
  static contextType = LocaleContext
  render() {
    const {
      staticResourceData,
      page,
      pageSize,
      sortColumn,
      sortDirection,
      handleSort,
      totalFilteredItems,
      changeTablePage,
      handleSearch,
      searchValue,
      darkSearchBox,
      actions,
      items,
      itemIds,
      expandableTable,
      selectableTable,
      onSelectAll,
      placeHolderText,
      highLightRowName,
    } = this.props

    const showSearch = _.get(this.props, 'showSearch', true)
    const showPagination = _.get(this.props, 'showPagination', true)
    const id = (staticResourceData && staticResourceData.resourceKey)
      ? `${staticResourceData.resourceKey}-`
      : ''
    const firstResKeyStr = 'tableKeys[0].resourceKey'

    const PagenationComponent = showPagination ?
      (<PaginationV2
        key='pagination'
        id={`${id}resource-table-pagination`}
        onChange={changeTablePage}
        pageSize={pageSize || PAGE_SIZES.DEFAULT}
        pageSizes={PAGE_SIZES.VALUES}
        totalItems={totalFilteredItems}
        page={page}
        disabled={pageSize >= totalFilteredItems}
        isLastPage={pageSize >= totalFilteredItems}
        itemsPerPageText={msgs.get('pagination.itemsPerPage', this.context.locale)}
        pageRangeText={(current, total) =>
          msgs.get('pagination.pageRange', [current, total], this.context.locale)}
        itemRangeText={(min, max, total) => {
          const itemRange = msgs.get('pagination.itemRange', [min, max], this.context.locale)
          const itemRangeDescription = msgs.get(
            'pagination.itemRangeDescription', [total], this.context.locale
          )
          return `${itemRange} ${itemRangeDescription}`
        }
        }
        pageInputDisabled={pageSize >= totalFilteredItems} />) : null

    return [
      <DataTable
        key='data-table'
        rows={this.getRows()}
        headers={this.getHeaders()}
        translateWithId={translateWithId.bind(null, this.context.locale)}
        render={({ rows, headers }) => (
          <TableContainer id={`${id}table-container`}>
            {showSearch ?
              (<TableToolbar aria-label={`${id}search`} role='region'>
                <TableToolbarSearch
                  onChange={handleSearch}
                  value={searchValue}
                  aria-label={`${id}search`}
                  id={`${id}search`}
                  light={!darkSearchBox}
                  placeHolderText={placeHolderText} />
                <TableToolbarContent>
                  {actions}
                </TableToolbarContent>
              </TableToolbar>) : null
            }
            <Table className='resource-table'>
              <TableHead>
                <TableRow>
                  {expandableTable && <TableExpandHeader />}
                  {selectableTable &&
                    <th scope='col'>
                      <Checkbox
                        checked={itemIds &&
                          itemIds.filter(item => items[item] && items[item].selected).length === itemIds.length}
                        indeterminate={this.getIndeterminateStatus()}
                        id={'select-all'}
                        name={'select-all'}
                        onChange={onSelectAll}
                        data-selected={itemIds &&
                          itemIds.filter(item => items[item] && items[item].selected).length === itemIds.length}
                        labelText={''}
                        aria-label={msgs.get(itemIds.filter(item =>
                          items[item] &&
                          items[item].selected).length === itemIds.length
                          ? 'unselect'
                          : 'select', this.context.locale
                        )} />
                    </th>
                  }
                  {headers.map(header => {
                    if (header && header.header !== '') {
                      return (
                        <th scope={'col'} key={header.key}>
                          <div
                            role={'button'}
                            tabIndex={0}
                            title={msgs.get(
                              `svg.description.${!sortColumn || sortDirection === 'desc' ? 'asc' : 'desc'}`,
                              this.context.locale
                            )}
                            onClick={handleSort}
                            onKeyPress={handleSort}
                            className={
                              `bx--table-sort-v2${sortDirection === 'asc'
                                ? ' bx--table-sort-v2--ascending'
                                : ''}${sortColumn === header.key ? ' bx--table-sort-v2--active' : ''}`
                            }
                            data-key={header.key}
                            data-default-key={staticResourceData.defaultSortField}>
                            <span className='bx--table-header-label'>{header.header}</span>
                            { header.information &&
                            <Tooltip content={header.information}>
                              <svg className='info-icon'>
                                <use href={'#diagramIcons_info'} ></use>
                              </svg>
                            </Tooltip>
                            }
                            <Icon
                              className='bx--table-sort-v2__icon'
                              name='caret--down'
                              description={msgs.get(
                                `svg.description.${!sortColumn || sortDirection === 'desc' ? 'asc' : 'desc'}`,
                                this.context.locale
                              )} />
                          </div>
                        </th>
                      )
                    } else {
                      return <th scope={'col'} key={header.key} />
                    }
                  }
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {(() => {
                  return rows.map(row => {
                    if(row && row.id){
                      return (
                        <TableRow
                          key={row.id}
                          data-row-name={_.get(items[row.id], _.get(staticResourceData, firstResKeyStr))}
                          className={
                            _.get(items[row.id], _.get(staticResourceData, firstResKeyStr)) === highLightRowName
                              ? 'high-light'
                              : ''
                          }
                        >
                          {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                        </TableRow>
                      )
                    }
                    return undefined
                  })
                })()}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />,
      PagenationComponent
    ]
  }

  getHeaders() {
    const { locale } = this.context
    const { staticResourceData, tableActions, items, itemIds } = this.props
    let headers = staticResourceData.tableKeys.filter(tableKey => {
      return tableKey.disabled
        ? typeof tableKey.disabled === 'function'
          ? tableKey.disabled(itemIds && itemIds.map(id => items[id]))
          : !tableKey.disabled
        : tableKey
    })
    headers = headers.map(tableKey => ({
      key: tableKey.resourceKey,
      header: tableKey.dropdown ? '' : msgs.get(tableKey.msgKey, locale),
      information: tableKey.information ? msgs.get(tableKey.information, locale) : ''
    }))
    tableActions && !_.isEmpty(tableActions) && headers.push({ key: 'action', header: ''})
    return headers
  }

  checkPolicyDisabled(data) {
    return _.get(data, 'raw.spec.disabled', false)
  }

  checkPolicyRemediation(data) {
    return _.get(data, 'raw.spec.remediationAction', 'inform')
  }

  getRows() {
    const { history, items, itemIds, tableActions, resourceType, staticResourceData, match,
      getResourceAction, userAccess } = this.props
    const { locale } = this.context
    const { normalizedKey } = staticResourceData
    const userAccessHash = formatUserAccess(userAccess)
    const localResources = itemIds &&
      itemIds.map(
        id => items[id] || (Array.isArray(items)
        && items.find(target =>
          (normalizedKey && _.get(target, normalizedKey) === id) || (target.name === id)
        ))
      )
    if (localResources && localResources.length > 0) {
      return localResources.map((item, index) => {
        const row = {}
        if (normalizedKey) {
          row.id = `${_.get(item, normalizedKey)}${_.get(item, 'cluster', '')}`
        } else {
          row.id = getSecondaryKey(resourceType)
            ? `${_.get(item, getPrimaryKey(resourceType))}-${_.get(item, getSecondaryKey(resourceType))}`
            : _.get(item, getPrimaryKey(resourceType)) || `table-row-${index}`
        }
        const menuActions = item.metadata && item.metadata.namespace && tableActions
                                && _.clone(tableActions[item.metadata.namespace]) || _.clone(tableActions)
        const filteredActions = (Array.isArray(menuActions) && menuActions.length > 0)
          ? filterUserAction(item, menuActions, userAccessHash, resourceType)
          : []

        if (item.consoleURL && item.consoleURL === '-' && Array.isArray(filteredActions)){
          const removeIndex = filteredActions.indexOf('table.actions.launch.cluster')
          if (removeIndex > -1) {
            filteredActions.splice(removeIndex, 1)
          }
        }

        //changes menu item based on whether policy is enabled or disabled
        row.disabled = false
        row.remediation = 'inform'
        if (Array.isArray(filteredActions) && filteredActions.length === 4) {
          if (this.checkPolicyDisabled(item)) {
            filteredActions[filteredActions.indexOf('table.actions.disable')] = 'table.actions.enable'
            row.disabled = true
          }
          if (this.checkPolicyRemediation(item) === 'enforce') {
            filteredActions[filteredActions.indexOf('table.actions.enforce')] = 'table.actions.inform'
            row.remediation = 'enforce'
          }
        }

        if (Array.isArray(filteredActions) && filteredActions.length > 0) {
          row.action = (
            <OverflowMenu
              floatingMenu
              flipped
              iconDescription={msgs.get('svg.description.overflowMenu', locale)}
              ariaLabel='Overflow-menu'
              tabIndex={0}
            >
              {filteredActions.map((action) => {
                const disableFlag = action.includes('disabled.')
                if (disableFlag) {
                  action = action.replace('disabled.', '')
                }
                return (<OverflowMenuItem
                  disabled={disableFlag}
                  data-table-action={action}
                  isDelete={
                    action ==='table.actions.remove' ||
                    action ==='table.actions.policy.remove' ||
                    action ==='table.actions.compliance.remove'
                  }
                  onClick={() => getResourceAction(action, item, null, history, locale)}
                  primaryFocus={true}
                  key={action}
                  itemText={createDisableTooltip(disableFlag, action, locale, msgs.get(action, locale))}
                />)
              })}
            </OverflowMenu>
          )
        }
        staticResourceData.tableKeys.forEach(key => {
          row[key.resourceKey] = (key.link) ?
            <Link to={`${match.url}${getLink(key.link, item)}`}>{transform(item, key, locale)}</Link> :
            transform(item, key, locale)
          if (key.resourceKey === 'objectDefinition.metadata.name' && row[key.resourceKey] === '-') {
            row[key.resourceKey] = _.get(item, 'objectDefinition.kind')
          }
          if (key.resourceKey === 'remediation') {
            row[key.resourceKey] = msgs.get('policy.remediation.' + row[key.resourceKey], locale)
          }
        })
        return row
      })
    }
    return []
  }

  getIndeterminateStatus() {
    const { itemIds, items } = this.props
    const selectedItems = itemIds.filter(item => items[item] && items[item].selected)
    let indeterminateStatus = itemIds && selectedItems.length !== itemIds.length && selectedItems.length > 0
    selectedItems.forEach(selectedItem => {
      if (items[selectedItem].subItems && items[selectedItem].subItems.length > 0) {
        const selectedSubItems = items[selectedItem].subItems.filter(subItem => subItem.selected)
        if (selectedSubItems.length < items[selectedItem].subItems.length) {
          indeterminateStatus = true
          return indeterminateStatus
        }
      }
      return undefined
    })
    return indeterminateStatus
  }
}

ResourceTable.propTypes = {
  actions: PropTypes.array,
  changeTablePage: PropTypes.func,
  darkSearchBox: PropTypes.bool,
  expandableTable: PropTypes.bool,
  getResourceAction: PropTypes.func,
  handleSearch: PropTypes.func,
  handleSort: PropTypes.func,
  highLightRowName: PropTypes.string,
  history: PropTypes.object.isRequired,
  itemIds: PropTypes.array,
  items: PropTypes.object,
  match: PropTypes.object,
  onSelectAll: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  placeHolderText: PropTypes.string,
  resourceType: PropTypes.object,
  searchValue: PropTypes.string,
  selectableTable: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
  staticResourceData: PropTypes.object,
  tableActions: PropTypes.array,
  totalFilteredItems: PropTypes.number,
  userAccess: PropTypes.array,
}

const mapStateToProps = (state) => {
  const userAccess = state.userAccess ? state.userAccess.access : []
  return { userAccess }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const resourceType = ownProps.subResourceType || ownProps.resourceType
  return {
    getResourceAction: (action, resource, hasService, history, locale) =>
      resourceActions(action, dispatch, resourceType, resource, hasService, history, locale)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceTable))
