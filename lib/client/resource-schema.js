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

import { schema } from 'normalizr'
import _ from 'lodash'

export const createResourcesSchema = (attribute, uniqueKey) => {
  // to support multi cluster, use ${name}-${uniqueKey} as unique id
  return new schema.Entity('items', {},
    { idAttribute: value => `${_.get(value, attribute)}-${_.get(value, uniqueKey)}` }
  )
}
