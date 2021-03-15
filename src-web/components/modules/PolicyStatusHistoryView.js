/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import {
  Title,
} from '@patternfly/react-core'
import PatternFlyTable from '../common/PatternFlyTable'
import { LocaleContext } from '../common/LocaleContext'
import statusHistoryDef from '../../tableDefinitions/statusHistoryDef'
import { transform } from '../../tableDefinitions/utils'
import msgs from '../../../nls/platform.properties'

class PolicyStatusHistoryView extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextType = LocaleContext

  render() {
    const { history, cluster, template } = this.props
    const { locale } = this.context

    const tableData = transform(history, statusHistoryDef, locale)

    return (
      <div className='policy-status-history-view'>
        <div className='table'>
          <Title className='title' headingLevel="h3">{cluster}</Title>
          <Title className='title' headingLevel="h4">{`${msgs.get('policy.template', locale)}: ${template}`}</Title>
          <br></br>
          <PatternFlyTable {...tableData} noResultMsg={msgs.get('table.search.no.results', locale)} />
        </div>
      </div>

    )
  }
}

PolicyStatusHistoryView.propTypes = {
  cluster: PropTypes.string,
  history: PropTypes.array,
  template: PropTypes.string
}

export default PolicyStatusHistoryView
