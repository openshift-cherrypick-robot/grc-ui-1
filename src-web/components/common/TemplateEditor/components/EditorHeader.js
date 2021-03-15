/*******************************************************************************
 * Licensed Materials - Property of IBM
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import '../scss/editor-header.scss'
import msgs from '../../../../../nls/platform.properties'

class EditorHeader extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    locale: PropTypes.string,
  }

  constructor (props) {
    super(props)
  }

  render() {
    const { children, locale } = this.props
    const editorToolbarTitle = msgs.get('editor.toolbar', locale)
    return (
      <div className='creation-view-yaml-header' >
        <div className='creation-view-yaml-header-toolbar' role='region' aria-label={editorToolbarTitle} id={editorToolbarTitle}>
          {children}
        </div>
      </div>
    )
  }

}

export default EditorHeader
