/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@patternfly/react-icons'
import { Tooltip } from '@patternfly/react-core'
import dangerColor from '@patternfly/react-tokens/dist/js/global_danger_color_100'
import okColor from '@patternfly/react-tokens/dist/js/global_palette_green_500'
import warningColor from '@patternfly/react-tokens/dist/js/global_warning_color_100'

export const GreenCheckCircleIcon = ({tooltip}) => {
  if (tooltip) {
    return (
      <Tooltip content={<div>{tooltip}</div>}>
        <CheckCircleIcon  color={okColor.value} />
      </Tooltip>
    )
  }
  return <CheckCircleIcon color={okColor.value} />
}

GreenCheckCircleIcon.propTypes = {
  tooltip: PropTypes.string,
}

export const RedExclamationCircleIcon = ({tooltip}) => {
  if (tooltip) {
    return (
      <Tooltip content={tooltip}>
        <ExclamationCircleIcon color={dangerColor.value} />
      </Tooltip>
    )
  }
  return <ExclamationCircleIcon color={dangerColor.value} />
}

RedExclamationCircleIcon.propTypes = {
  tooltip: PropTypes.string,
}

export const YellowExclamationTriangleIcon = ({tooltip}) => {
  if (tooltip) {
    return (
      <Tooltip content={<div>{tooltip}</div>}>
        <ExclamationTriangleIcon color={warningColor.value} />
      </Tooltip>
    )
  }
  return <ExclamationTriangleIcon color={warningColor.value} />
}

YellowExclamationTriangleIcon.propTypes = {
  tooltip: PropTypes.string,
}
