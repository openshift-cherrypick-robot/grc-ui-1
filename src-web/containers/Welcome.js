/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import resources from '../../lib/shared/resources'
resources(() => {
  require('../../scss/common.scss')
})
// without curly braces means component with redux
// eslint-disable-next-line import/no-named-as-default
import { Route } from 'react-router-dom'
import client from '../../lib/shared/client'
// import config from '../../lib/shared/config'
import { AcmHeaderPrototype } from '@open-cluster-management/ui-components'

class WelcomeStatic extends React.Component {

  constructor(props) {
    super(props)
    if (client && document.getElementById('propshcm')) {
      this.serverProps = JSON.parse(document.getElementById('propshcm').textContent)
    }
  }

  render() {
    return (
      <div className='expand-vertically'>
        <div>TEST CONTENT</div>
      </div>
    )
  }
}

// eslint-disable-next-line react/display-name
export default props => (
  // eslint-disable-next-line react/prop-types
  <AcmHeaderPrototype urlpath={client ? window.location.pathname : props.url} href="/" target="_self">
    <Route path={'/multicloud/welcome'} serverProps={props} component={WelcomeStatic} />
  </AcmHeaderPrototype>
)
