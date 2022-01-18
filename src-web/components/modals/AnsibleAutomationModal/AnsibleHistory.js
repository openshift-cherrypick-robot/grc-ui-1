/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { AcmTable } from '@stolostron/ui-components'
import ansibleJobHistoryDef from '../../../tableDefinitions/ansibleJobHistoryDef'
import { transform } from '../../../tableDefinitions/utils'
import _ from 'lodash'

import '../../../scss/ansible-modal.scss'

export const renderAnsibleHistory = (historyData, locale) => {
  const tableData = transform(_.get(historyData.items ? historyData : {'items':[]}, 'items', []), ansibleJobHistoryDef, locale)
  return <AcmTable
    initialSort={tableData.sortBy}
    showToolbar={false}
    autoHidePagination={true}
    plural='ansible jobs'
    items={tableData.rows}
    columns={tableData.columns}
    keyFn={(item) => item.uid.toString()}
    gridBreakPoint=''
  />
}
