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

import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DESCENDING } from '../actions/'
/*
* UI helper to handle search and sort for table components
* */
class TableHelper {
  handleInputValue(cb, e) {
    const value = e.target.value
    cb(value)
  }
  handleSort(prevSortDirection, prevSortColumn, cb, e) {
    const target = e.currentTarget
    if (target) {
      const newSortColumn = target && target.getAttribute('data-key')
      const defaultSortColumn = target && target.getAttribute('data-default-key')
      const newSortDirection = !prevSortColumn
        ? defaultSortColumn === newSortColumn
          ? SORT_DIRECTION_DESCENDING
          : SORT_DIRECTION_ASCENDING
        : prevSortColumn !== newSortColumn
          ? SORT_DIRECTION_ASCENDING: prevSortDirection === SORT_DIRECTION_ASCENDING ? SORT_DIRECTION_DESCENDING
            : SORT_DIRECTION_ASCENDING
      cb(newSortDirection, newSortColumn)
    }
  }
}

export default new TableHelper()
