/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { Tooltip } from '@patternfly/react-core'
import msgs from '../../../nls/platform.properties'

export const createDisableTooltip = (isDisabled, label, locale, component) => {
  // Tooltips will not show for disabled elements, so we need to wrap the element
  if (isDisabled) {
    return (<Tooltip
      content={msgs.get('error.permission.disabled', locale)}
      key={`${label}-tooltip`}
      zIndex={10001}
    >
      <div className='disable-tooltip'>{component}</div>
    </Tooltip>)
  } else {
    return component
  }
}
