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

const truncate = function (fullStr, strLen, separator) {
  if (fullStr === null || typeof fullStr === 'undefined') {
    return fullStr
  }

  if (fullStr.length <= strLen) {
    return fullStr
  }

  separator = separator || '...'

  const sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2)

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars)
}

export default truncate
