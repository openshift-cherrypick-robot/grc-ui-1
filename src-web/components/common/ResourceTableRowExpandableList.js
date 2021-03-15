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

import React from 'react'
import PropTypes from 'prop-types'
import { StructuredListWrapper, StructuredListRow, StructuredListCell, StructuredListBody } from 'carbon-components-react'
import msgs from '../../../nls/platform.properties'
import _uniqueId from 'lodash/uniqueId'

const ResourceTableRowExpandableContent = ({ items }, context) =>
  <StructuredListWrapper>
    <StructuredListBody>
      {items.map(item => (
        <StructuredListRow className={'nested-expandable-row'} key={_uniqueId('item.name')} data-row-name={item.name} >
          <StructuredListCell className={'nested-expandable-row-header'} noWrap>{msgs.get(item.name, context.locale)}</StructuredListCell>
          <StructuredListCell className={'nested-expandable-row-content'} noWrap>{item.items.join(', ')}</StructuredListCell>
        </StructuredListRow>
      ))}
    </StructuredListBody>
  </StructuredListWrapper>

ResourceTableRowExpandableContent.contextTypes = {
  locale: PropTypes.string
}

ResourceTableRowExpandableContent.propTypes = {
  items: PropTypes.array,
}

export default ResourceTableRowExpandableContent
