/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { Label, Popover } from '@patternfly/react-core'
import '../../scss/label-with-popover.scss'

const LabelWithPopover = ({
  children,
  labelContent,
  labelIcon,
  labelColor,
  popoverHeader
}) => (
  <div className="label-with-popover">
    <Popover
      headerContent={popoverHeader}
      bodyContent={children}
      className="label-with-popover"
      enableFlip
      hasAutoWidth
      minWidth="18.75rem"
      maxWidth="30rem"
      position="bottom"
      flipBehavior={['bottom', 'top', 'right', 'left']}
      zIndex={999}
    >
      <Label
        onClick={event => {
          event.preventDefault()
          event.nativeEvent.preventDefault()
          event.stopPropagation()
        }}
        color={labelColor || 'grey'}
        href="#"
        icon={labelIcon}
      >
        {labelContent}
      </Label>
    </Popover>
  </div>
)

LabelWithPopover.propTypes = {
  children: PropTypes.object,
  labelColor: PropTypes.string,
  labelContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelIcon: PropTypes.object,
  popoverHeader: PropTypes.object
}

export default LabelWithPopover
