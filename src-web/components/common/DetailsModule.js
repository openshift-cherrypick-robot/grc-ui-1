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
import _ from 'lodash'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Tooltip,
  Divider
} from '@patternfly/react-core'
import msgs from '../../../nls/platform.properties'
import resources from '../../../lib/shared/resources'
import moment from 'moment'
import { getPolicyCompliantStatus } from '../../tableDefinitions/utils'
import { LocaleContext } from './LocaleContext'

resources(() => {
  require('../../../scss/structured-list.scss')
})

class DetailsModule extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expanded: `${props.title.toLowerCase().replace(/ /g,'-')}-toggle`
    }
  }
  static defaultProps = {
    colSize: 'default',
    numColumns: 2
  }
  formatData() {
    const { listData, listItem, numColumns } = this.props
    const colData = []
    const itemsForEachColumn = _.chunk(listItem, Math.ceil(listItem.length / numColumns))
    itemsForEachColumn.forEach((col) => {
      const oneColData = []
      col.forEach((item) => {
        if (Array.isArray(item.cells) && item.cells[0]) {
          const entry = []
          entry[0] = item.cells[0].resourceKey ? item.cells[0].resourceKey : '-'
          const entryData = item.cells[1] ? _.get(listData, item.cells[1].resourceKey, '-') : '-'
          const replacedData = JSON.stringify(entryData).replace(/\[|\]|"/g, ' ')
          entry[1] = (typeof(entryData) === 'object'||typeof(entryData) === 'boolean') ? replacedData : entryData
          if(item && item.cells[0] && item.cells[0].resourceKey){
            if(item.cells[0].type === 'timestamp') {
              entry[1] = moment(entry[1], 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
            } else if(item.cells[1] && item.cells[1].resourceKey === 'clusterCompliant') {
              entry[1] = getPolicyCompliantStatus({clusterCompliant: entry[1]}, this.context.locale)
            }
          }
          // third column entry[2] is tooltip information, if not exist then no tooltip
          if (item.cells[0].information) {
            entry[2] = item.cells[0].information
          }
          oneColData.push(entry)
        }
      })
      colData.push(oneColData)
    })
    return colData
  }

  renderDescriptionListBody(renderedData) {
    let maxRows = 0
    const renderedDescriptionList = []
    renderedData.forEach((col, index) => {
      const colData = []
      col.forEach((row) => {
        if (row) {
          const rowData = []
          rowData.push(
            <DescriptionListGroup key={`description-list-item-${row[0]}-group`} >
              <DescriptionListTerm key={`description-list-item-${row[0]}-term`}>
                {msgs.get(row[0], this.context.locale)}
                {row[2] && // no third item no tooltip
                  <Tooltip content={msgs.get(row[2], this.context.locale)}>
                    <svg className='info-icon'>
                      <use href={'#diagramIcons_info'} ></use>
                    </svg>
                  </Tooltip>}
              </DescriptionListTerm>
              <DescriptionListDescription key={`description-list-item-${row[0]}-description`}>
                {row[1]}
              </DescriptionListDescription>
            </DescriptionListGroup>
          )
          colData.push(rowData)
        }
      })
      // Push empty rows into DescriptionList in order to even up columns
      if (colData.length > maxRows) {
        maxRows = colData.length
      } else {
        for (let i = colData.length; i < maxRows; i++) {
          colData.push(
            <div key={`empty-cell-${i}`}>&nbsp;</div>
          )
        }
      }
      renderedDescriptionList.push(
        <DescriptionList
          columnModifier={{[this.props.colSize]: '1Col'}}
          isHorizontal
          key={_.uniqueId('description-list-')}
        >
          {colData}
        </DescriptionList>
      )
      if (index < renderedData.length - 1) {
        renderedDescriptionList.push(
          <Divider isVertical key={_.uniqueId('divider-')} />
        )
      }
    })
    return renderedDescriptionList
  }

  onToggle(id) {
    if (id === this.state.expanded) {
      this.setState({expanded: ''})
    } else {
      this.setState({expanded: id })
    }
  }

  render() {
    const { title } = this.props
    const renderedData = this.formatData()
    const id = title.toLowerCase().replace(/ /g,'-')

    return(<Accordion className='accordion-header'>
      <AccordionItem>
        <AccordionToggle
          className='section-title'
          id={`${id}-toggle`}
          onClick={() => {this.onToggle(`${id}-toggle`)}}
          isExpanded={this.state.expanded===`${id}-toggle`}
        >
          {msgs.get(title, this.context.locale)}
        </AccordionToggle>
        <AccordionContent id={`${id}-expand`} isHidden={this.state.expanded !== `${id}-toggle`}>
          {this.renderDescriptionListBody(renderedData)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>)

  }

  static contextType = LocaleContext

  static propTypes = {
    colSize: PropTypes.oneOf(['default', 'md', 'lg', 'xl', '2xl']),
    listData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    listItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    numColumns: PropTypes.number.isRequired,
    title: PropTypes.string,
  }
}

export default DetailsModule
