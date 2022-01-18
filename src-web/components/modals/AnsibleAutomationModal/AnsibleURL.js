/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { AcmLaunchLink } from '@stolostron/ui-components'
import TruncateText from '../../common/TruncateText'

import '../../../scss/ansible-modal.scss'

export const renderAnsibleURL = (id, text, URL, truncateLength, noIcon, icon) => {
  if (!text || text !== '-') {
    let linkText = text
    if (truncateLength) {
      linkText = <TruncateText maxCharacters={truncateLength} text={linkText} />
    }
    const link = {
      id,
      text: linkText,
      href: URL,
      noIcon,
      icon,
    }
    return <AcmLaunchLink links={[link]} />
  } else {
    return text
  }
}
