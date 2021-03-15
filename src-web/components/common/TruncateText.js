/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


import React from 'react'
import { Tooltip } from '@patternfly/react-core'
import PropTypes from 'prop-types'
import truncate from '../../util/truncate-middle'

class TruncateText extends React.PureComponent {
  static propTypes = {
    maxCharacters: PropTypes.number,
    maxWidth: PropTypes.number,
    position: PropTypes.string,
    text: PropTypes.string.isRequired,
    textEnd: PropTypes.string
  }

  static defaultProps ={
    maxCharacters: 35,
  }

  render() {
    const {text, maxCharacters, maxWidth, position, textEnd} = this.props
    const postfix = textEnd ? textEnd : ''
    if (!text) {
      return ''
    }
    else if (typeof text !== 'string') {
      return `${text.toString()}${postfix}`
    }
    else if (text.length <= maxCharacters){
      return `${text}${postfix}`
    }

    return <Tooltip
      maxWidth = {maxWidth ? maxWidth : '80rem'}
      enableFlip = {false}
      position = {position ? position : 'top'}
      content = {<div>{text}</div>}
    >
      <span className='textWithTruncation'>{`${truncate(text, maxCharacters)}${postfix}`}</span>
    </Tooltip>
  }
}

export default TruncateText
