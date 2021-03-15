/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
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
/**
 * Functional React component that serves as a base
 * for all pages and renders the header
 */
const Page = ({ children }) =>
  <div className='page-content-container' role='main'>
    {children}
  </div>

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Page
