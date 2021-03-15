/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class TableTimestamp extends React.Component {
  render() {
    const { timestamp } = this.props
    let fromNow = 'unknown'
    if (timestamp && timestamp.includes('T')) {
      fromNow = moment(timestamp, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
    } else if (timestamp) {
      fromNow = moment(timestamp, 'YYYY-MM-DD HH:mm:ss').fromNow()
    }
    return <span>{fromNow}</span>
  }
}

TableTimestamp.propTypes = {
  timestamp: PropTypes.string,
}

export default TableTimestamp
