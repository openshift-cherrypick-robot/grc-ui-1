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
import moment from 'moment'
import _ from 'lodash'
import msgs from '../../nls/platform.properties'
import { Tag} from 'carbon-components-react'
import _uniqueId from 'lodash/uniqueId'

/*
* UI helpers to help with data transformations
* */

export const getLabelsToString = (item, locale, labelsKey) => {
  labelsKey = labelsKey || 'labels'
  const labels = _.get(item, labelsKey)
  const labelKeys = labels && Object.keys(labels)
  if (labelKeys && labelKeys.length > 0) {
    let str = ''
    for (const key of labelKeys) {
      str += key + '=' + labels[key] + ','
    }
    return str.substring(0, str.length - 1)
  } else {
    return '-'
  }
}

export function getLabelsToList(item, locale, labelsKey) {
  labelsKey = labelsKey || 'labels'
  const labels = _.get(item, labelsKey)
  if (!labels || Object.keys(labels).length===0) {
    return '-'
  }

  const showValueAsString = (value, key) => {
    return (
      <li key={key + value} style={{display:'block'}}>
        <b>{`${key}`}</b>{` = ${value !== '' ? value : '""'}`}
      </li>
    )
  }

  const showValueAsSnippet = (value, key) => {
    return (
      <li key={key + value} style={{display:'block'}}>
        <b>{key}</b>{' =' }
        {value}
      </li>
    )
  }

  return <ul>
    {_.map(labels, (value, key) => {
      try {
        if (typeof value === 'string') {
          if (!value.trim().startsWith('{')) {
            // definately a string
            return showValueAsString(value, key)
          } else {
            value = JSON.parse(value)
          }
        }
        // maybe a snippet
        return showValueAsSnippet(JSON.stringify(value, null, 2), key)
      } catch (e) {
        // any errors, show as string
        return showValueAsString(value, key)
      }
    })}
  </ul>
}

export const transform = (resource, key, locale, isSearch) => {
  let value = _.get(resource, key.resourceKey)
  if (key.type === 'timestamp') {
    return moment.unix(value).format('MMM Do YYYY \\at h:mm A')
  } else if (key.type === 'i18n') {
    return msgs.get(key.resourceKey, locale)
  } else if (key.type === 'boolean') {
    value = (Boolean(value)).toString()
    return msgs.get(value, locale)
  } else if (key.transformFunction && typeof key.transformFunction === 'function') {
    return key.transformFunction(resource, locale, key.resourceKey, isSearch)
  } else if (key.type === 'tag') {
    const data = key.getData(resource)
    return data ?
      data.map(tagText => <Tag key={_uniqueId('tag')} style={{display: 'inline-block'}} type={'beta'} title={tagText.title}>{tagText.value
        ? `${tagText.name}:${tagText.value}` : tagText.name}</Tag>)
      : '-'
  } else {
    return (value || value === 0) ? value : '-'
  }
}

export const getResourceType = (item, locale, key) => {
  return key ? _.get(item, key) : item.resourceType
}

export const getTabs  = (tabs, getUrl) => {
  return tabs.map((tab, index) => {
    return {
      id: `${tab}-tab`,
      label: `tabs.${tab}`,
      url: getUrl(tab, index)
    }
  })
}

export const getAge = (item, locale, timestampKey) => {
  const key = timestampKey ? timestampKey : 'created'
  const createdTime = _.get(item, key)
  if (createdTime && createdTime.includes('T')) {
    return moment(createdTime, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
  } else if (createdTime) {
    return moment(createdTime, 'YYYY-MM-DD HH:mm:ss').fromNow()
  }
  return '-'
}

export const showResourceToolbar = () => {
  const toolbar = document.getElementById('resource-toolbar')
  if (toolbar) {
    toolbar.classList.remove('hide')
  }
}

export const hideResourceToolbar = () => {
  const toolbar = document.getElementById('resource-toolbar')
  if (toolbar) {
    toolbar.classList.add('hide')
  }
}
