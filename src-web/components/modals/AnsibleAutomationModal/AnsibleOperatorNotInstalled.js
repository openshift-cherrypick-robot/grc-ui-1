/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { AcmLaunchLink } from '@stolostron/ui-components'
import { Alert } from '@patternfly/react-core'
import msgs from '../../../nls/platform.properties'
import { getAnsibleOperatorLink } from '../../../../server/lib/server/ansibleOperatorLink'

import '../../../scss/ansible-modal.scss'

export const renderAnsibleOperatorNotInstalled = (locale) => {
  const link = {
    id: 'installAnsibleOperatorLink',
    text: msgs.get('ansible.operator.installLink', locale),
    onClick: getAnsibleOperatorLink,
  }
  return (
    <Alert
      variant='danger'
      isInline={true}
      title={msgs.get('ansible.operator.notInstalled', locale)}
      actionClose=''
    >
      <AcmLaunchLink links={[link]} />
    </Alert>
  )
}
