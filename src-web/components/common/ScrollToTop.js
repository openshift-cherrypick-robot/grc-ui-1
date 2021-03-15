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

import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
/**
 * Component that will scroll the window up on every navigation
 * Follows pattern recommended by react router
 * See: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
 * **/

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window && window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
ScrollToTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  location: PropTypes.object,
}

export default withRouter(ScrollToTop)
