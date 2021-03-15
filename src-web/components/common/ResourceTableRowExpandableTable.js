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
import msgs from '../../../nls/platform.properties'
import { DataTable,  } from 'carbon-components-react'
import _uniqueId from 'lodash/uniqueId'

const {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell } = DataTable

const ResourceTableRowExpandableTable = ({ items, headers }, context) =>
  <Table className='resource-table-expandable'>
    <TableHead>
      <TableRow>
        {headers && headers.map((header, index) => {
          if (header) {
            return (
              <th className={`bx--table-header-index-${index}`} scope={'col'} key={header}>
                <span className='bx--table-header-label'>{msgs.get(header, context.locale)}</span>
              </th>
            )
          } else {
            return <th className={`bx--table-header-index-${index}`} scope={'col'} key={_uniqueId('bx--table-header')} />
          }
        }
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {items && items.map(row => {//check undefined row.id to avoid whole page crush
        if(row && row.cells){//single sub row for policy/cluster violation side panel
          return (
            <TableRow key={row.id ? row.id : _uniqueId('sidePanelTableRow')}>
              {row.cells.map(cell => (cell && typeof cell === 'string') ?
                <TableCell key={_uniqueId(cell.substring(0, 21))}>{cell}</TableCell>
                : <TableCell key={_uniqueId('sidePanelTableCell')}>{'-'}</TableCell>)}
            </TableRow>
          )
        }
        else if (row && row.subRowsArray) {//mulit sub rows for cluster finding side panel
          return row.subRowsArray.map(subRow => {
            if(subRow && subRow.cells) {
              return (
                <TableRow key={subRow.id ? subRow.id : _uniqueId('sidePanelTableRow')}>
                  {subRow.cells.map((cell, index) => (cell && typeof cell === 'string') ?
                    <TableCell
                      key={_uniqueId(cell.substring(0, 21))}
                      className={`bx--table-subRowsArray-subRow-index-${index}`}>
                      {cell}
                    </TableCell> :
                    <TableCell key={_uniqueId('sidePanelTableCell')}>{'-'}</TableCell>)}
                </TableRow>
              )
            }
            return null
          })
        }
        return null
      })
      }
    </TableBody>
  </Table>

ResourceTableRowExpandableTable.propTypes = {
  headers: PropTypes.array,
  items: PropTypes.array
}

export default ResourceTableRowExpandableTable
