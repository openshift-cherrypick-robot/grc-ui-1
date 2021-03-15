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

import React from 'react'
import { Button } from '@patternfly/react-core'
import { createDisableTooltip } from './DisableTooltip'
import msgs from '../../../nls/platform.properties'
import config from '../../../lib/shared/config'

// createFlag=0 nonclickable create button, createFlag=1 clickable create button
export const createDocLink = (locale, handleCreateResource, submitBtnTextKey, createFlag=0) => {
  const vNumber = config['ACM_VERSION']
  const rhPath = 'https://access.redhat.com/'
  const acmPath = 'documentation/en-us/red_hat_advanced_cluster_management_for_kubernetes/'
  const grcPath = `${vNumber}/html/security/security#manage-security-policies`
  const docURL = `${rhPath}${acmPath}${grcPath}`
  const disableFlag = (createFlag !== 1)
  const createButton = (<Button
    id='create-resource'
    variant='primary'
    isDisabled={disableFlag}
    isSmall
    onClick={handleCreateResource}
  >
    { submitBtnTextKey }
  </Button>)
  return (
    <div className={'button-group'}>
      <div className={'button-group-create-resource'}>
        {createDisableTooltip(disableFlag, 'create-resource', locale, createButton)}
      </div>
      <div className={'button-group-doc-link'}>
        <Button
          id='doc-link'
          variant='link'
          component='a'
          href={docURL}
          target='doc'
          aria-describedby='launchWindow'
          isInline
        >
          {msgs.get('button.view.doc', locale)}
        </Button>
      </div>
    </div>
  )
}

export const createDetails = (msgPart1, msgCreate, msgPart2) => {
  return [
    `${msgPart1} `,
    <span
      key='no-resource-detail__link'
      className='no-resource-detail__link'
    >
      {msgCreate}
    </span>,
    ` ${msgPart2}`
  ]
}
