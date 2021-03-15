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
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Notification } from 'carbon-components-react'
import { Spinner } from '@patternfly/react-core'
import StructuredListModule from '../common/StructuredListModule'
import resources from '../../../lib/shared/resources'
import PolicyTemplatesView from './PolicyTemplatesView'
import NoResource from '../common/NoResource'
// eslint-disable-next-line import/no-named-as-default
import ResourceTableModule from '../common/ResourceTableModuleFromProps'
import { RESOURCE_TYPES } from '../../../lib/shared/constants'
import msgs from '../../../nls/platform.properties'

resources(() => {
  require('../../../scss/resource-overview.scss')
})
resources(() => {
  require('../../../scss/policy-yaml-tab.scss')
})

class PolicyClusterDetail extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    loading: PropTypes.any,
    policies: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
      PropTypes.array
    ]),
    resourceType: PropTypes.object,
    staticResourceData: PropTypes.object,
  }

  static defaultProps = {
    resourceType: RESOURCE_TYPES.POLICIES_BY_POLICY,
  }

  static contextTypes = {
    locale: PropTypes.string
  }

  constructor (props) {
    super(props)
  }

  render() {
    const {staticResourceData, error, loading, resourceType, policies} = this.props
    const { locale } = this.context
    const modulesRight = [], modulesBottom = []
    if (error) {
      return <Notification
        title=''
        className='persistent'
        subtitle={msgs.get(error, locale)}
        kind='error' />
    } else if (policies === null) {
      return <NoResource
            title={msgs.get('error.not.found', this.context.locale)}
            svgName='EmptyPagePlanet-illus.png'>
          </NoResource>
    } else if ( loading || !policies || !Array.isArray(policies) ) {
      return <Spinner className='patternfly-spinner' />
    }
    const policy = policies[0]
    React.Children.map([
      <PolicyTemplatesView key='Policy Templates' headerKey='table.header.policyTemplate' viewOnly right />,
      <ResourceTableModule key='roleTemplates' definitionsKey='policyRoleTemplates' />,
      <ResourceTableModule key='objectTemplates' definitionsKey='policyObjectTemplates' />,
      <ResourceTableModule key='policyTemplates' definitionsKey='policyPolicyTemplates' />,
      <ResourceTableModule key='rules' definitionsKey='policyRules' />,
      <ResourceTableModule key='violations' definitionsKey='policyViolations' />], module => {
      if (module.props.right) {
        modulesRight.push(React.cloneElement(module, { staticResourceData: staticResourceData, resourceType: resourceType, resourceData: policy }))
      } else {
        modulesBottom.push(React.cloneElement(module, { staticResourceData: staticResourceData, resourceType: resourceType, resourceData: policy }))
      }
    })
    return (
      <div className='page-content-container policy-cluster-detail' role='main'>
        <div className='overview-content'>
          <StructuredListModule
            title={staticResourceData.policyDetailKeys.title}
            headerRows={staticResourceData.policyDetailKeys.headerRows}
            rows={staticResourceData.policyDetailKeys.rows}
            data={policy} />
          {modulesRight.length > 0 &&
            <div className='overview-content-right'>
              {modulesRight}
            </div>}
          <div className='overview-content-bottom'>
            {modulesBottom}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PolicyClusterDetail)
