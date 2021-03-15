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

import React from 'react'
import PropTypes from 'prop-types'
import { DataTable } from 'carbon-components-react'
import _ from 'lodash'
import resources from '../../../lib/shared/resources'
import { transform } from '../../../lib/client/resource-helper'
import { Link } from 'react-router-dom'
import ResourceTableRowExpandableTable from './ResourceTableRowExpandableTable'
import { Module, ModuleHeader, ModuleBody } from 'carbon-addons-cloud-react'
import msgs from '../../../nls/platform.properties'
import _uniqueId from 'lodash/uniqueId'

resources(() => {
  require('../../../scss/structured-list.scss')
})

const {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow } = DataTable

class StructuredListModule extends React.Component {
  constructor() {
    super()
    this.state = {
      extended: undefined
    }
  }

  onSelect = (index) => () => {
    this.setState(state => {
      if (state.extended === index) {
        return { extended: undefined }
      } else {
        return { extended: index }
      }
    })
  }

  render() {
    const { headerRows, data, listSubItems, url, rows:resourceRows, title, subHeaders,
      linkFixedName, emptyColFront } = this.props
    const { extended } = this.state
    const frontPlaceholder = []
    if(emptyColFront) {
      for(let i=0; i < emptyColFront; i++){
        frontPlaceholder.push(<TableCell />)
      }
    }
    return (
      <Module className='structured-list-module'>
        {title && <ModuleHeader>{msgs.get(title, this.context.locale)}</ModuleHeader>}
        <ModuleBody>
          <Table className='resource-table-main simple-table'>
            <TableHead>
              <TableRow>
                {Array.isArray(headerRows) && headerRows.map((header, index) => {
                  if (header) {
                    return (
                      <th className={`bx--header-index-${index}`} scope={'col'} key={header}>
                        <span className='bx--table-header-label'>
                          {msgs.get(header, this.context.locale)}
                        </span>
                      </th>
                    )
                  } else {
                    return <th
                      className={`bx--header-index-${index}`}
                      scope={'col'}
                      key={_uniqueId('bx--header')}
                    />
                  }
                }
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                return data.map((row, rowIndex) => {
                  if (listSubItems) {
                    return (
                      <React.Fragment key={row.id}>
                        <TableExpandRow
                          isExpanded={extended === rowIndex}
                          onExpand={this.onSelect(rowIndex)}
                          ariaLabel='Overflow-menu'>
                          {Array.isArray(resourceRows) && resourceRows[0].cells.map((cell, cellIndex) =>
                            <td key={`${cell.resourceKey}Cell`}>
                              <p>{
                                (linkFixedName && (cellIndex in linkFixedName) && transform(row, cell, this.context.locale) !== '-')
                                  ? <a
                                      href={transform(row, cell, this.context.locale)}
                                      target={linkFixedName[cellIndex].urlTarget}
                                      className='bx--link'>
                                    {msgs.get(linkFixedName[cellIndex].fixedName, this.context.locale)}
                                  </a>
                                  : cell.link && url
                                    ? <Link
                                        to={url}
                                        className='bx--link'>
                                        {transform(row, cell, this.context.locale)}
                                    </Link>
                                    : transform(row, cell, this.context.locale)
                              }</p>
                            </td>
                          )}
                        </TableExpandRow>
                        {rowIndex === extended && listSubItems && (
                          <TableExpandedRow>
                            <td className='expand-arrow-align-makeup'></td>
                            {_.isEmpty(frontPlaceholder) ? null : frontPlaceholder}
                            <TableCell colSpan={3} className={'resource-table-expandable-cell'} >
                              <ResourceTableRowExpandableTable
                                items={row.subItems}
                                headers={subHeaders}
                                type='name' />
                            </TableCell>
                          </TableExpandedRow>
                        )}
                      </React.Fragment>
                    )
                  } else {
                    if(row && row.id){
                      return (
                        <TableRow key={row.id}>
                          {Array.isArray(resourceRows) && resourceRows[0].cells
                          && resourceRows[0].cells.map((cell)=>
                            <TableCell
                              key={`${cell.resourceKey.substring(0, 21)}Cell`}
                              className={row.id.includes('S_F_S_P')?_uniqueId('S_F_S_P'):_uniqueId('index')}>
                              {transform(row, cell, this.context.locale)}
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    }
                  }
                  return undefined
                })
              })()}
            </TableBody>
          </Table>
        </ModuleBody>
      </Module>
    )
  }
}

StructuredListModule.contextTypes = {
  locale: PropTypes.string
}

StructuredListModule.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  emptyColFront: PropTypes.number,
  headerRows: PropTypes.array,
  linkFixedName: PropTypes.object,
  listSubItems: PropTypes.bool,
  rows: PropTypes.array,
  subHeaders: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string
}

export default StructuredListModule
