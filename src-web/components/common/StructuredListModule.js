/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
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
import { StructuredListWrapper, StructuredListHead, DataTable, StructuredListRow, StructuredListCell, StructuredListBody } from 'carbon-components-react'
import { Module, ModuleHeader, ModuleBody } from 'carbon-addons-cloud-react'
import msgs from '../../../nls/platform.properties'
import resources from '../../../lib/shared/resources'
import { transform } from '../../../lib/client/resource-helper'
import { Link } from 'react-router-dom'
import ResourceTableRowExpandableList from './ResourceTableRowExpandableList'
import _uniqueId from 'lodash/uniqueId'

resources(() => {
  require('../../../scss/structured-list.scss')
})

const {
  TableCell,
  TableExpandRow,
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
    const { title, headerRows, rows, data, url, listSubItems } = this.props
    const { extended } = this.state
    return (
      <Module className='structured-list-module'>
        {title && <ModuleHeader>{msgs.get(title, this.context.locale)}</ModuleHeader>}
        <ModuleBody>
          <StructuredListWrapper className='bx--structured-list--condensed' role='region' ariaLabel={msgs.get(title, this.context.locale)}>
            <StructuredListHead>
              <StructuredListRow head key={_uniqueId('SLRowHeader')}>
                {listSubItems &&
                <StructuredListCell head key={'empty-header'}>
                </StructuredListCell>}
                {headerRows.map(row =>
                  <StructuredListCell head key={row+'Header'}>
                    {msgs.get(row, this.context.locale)}
                  </StructuredListCell>
                )}
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {Array.isArray(data) ? data.map((item, index) =>
                <StructuredListRow key={rows[0].cells[0].resourceKey+`Row ${index}`}>
                  <TableExpandRow
                    isExpanded={true}
                    onExpand={this.onSelect(index)}>
                    {rows[0].cells.map(cell =>
                      <StructuredListCell key={cell.resourceKey+'Cell'}>
                        <p>
                          {cell.link && url
                            ? <Link to={url} className='bx--link'>{transform(item, cell, this.context.locale)}</Link>
                            : transform(item, cell, this.context.locale)
                          }
                        </p>
                      </StructuredListCell>
                    )}
                  </TableExpandRow>
                  {listSubItems && extended === index &&
                    <TableExpandedRow>
                      <TableCell colSpan={1} />
                      <TableCell colSpan={8}>
                        <ResourceTableRowExpandableList
                          items={item.subItems}
                          type='name' />
                      </TableCell>
                    </TableExpandedRow>
                  }
                </StructuredListRow>
              ) :
                rows.map(({cells}) =>
                  <StructuredListRow key={cells[0].resourceKey+'Row'}>
                    {cells.map(cell =>
                      <StructuredListCell key={cell.resourceKey+'Cell'}>
                        <div>
                          {cell.link && url
                            ? <Link to={url} className='bx--link'>{transform(data, cell, this.context.locale)}</Link>
                            : transform(data, cell, this.context.locale)
                          }
                        </div>
                      </StructuredListCell>
                    )}
                  </StructuredListRow>
                )}
            </StructuredListBody>
          </StructuredListWrapper>
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
  headerRows: PropTypes.array,
  listSubItems: PropTypes.bool,
  rows: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string
}

export default StructuredListModule
