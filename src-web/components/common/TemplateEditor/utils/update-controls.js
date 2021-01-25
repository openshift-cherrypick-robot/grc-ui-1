/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import jsYaml from 'js-yaml'
import YamlParser from '../components/YamlParser'
import msgs from '../../../../../nls/platform.properties'
import _ from 'lodash'

export const initializeControlData = (template, initialControlData) =>{
  return initialControlData.map(control=>{
    control = Object.assign({}, control)

    // if user data was cached, apply now
    // save custom user input for session??
    if (control.cacheUserValueKey) {
      const storageKey = `${control.cacheUserValueKey}--${window.location.href}`
      const sessionObject = JSON.parse(sessionStorage.getItem(storageKey))
      if (sessionObject) {
        control.available = _.uniq([...control.available, ...sessionObject])
      }
    }

    // if available choices are objects, convert to keys
    if (typeof _.get(control, 'available[0]') === 'object') {
      const {available:localAvailable} = control
      control.availableMap = {}
      let labelSort = false
      control.available = localAvailable.map(choice=>{
        let availableKey
        const {key, value, name, description} = choice
        if (key) {
          availableKey = `${key}: "${value}"`
          labelSort = control.hasLabels = true
        } else if (name) {
          availableKey = `${name} - ${description}`
          control.hasReplacements = true
        }
        control.availableMap[availableKey] = choice
        return availableKey
      }).sort((a,b)=>{
        if (labelSort) {
          const aw = a.startsWith('name')
          const bw = b.startsWith('name')
          if (aw && !bw) {
            return 1
          } else if (!aw && bw) {
            return -1
          }
        }
        return a.localeCompare(b)
      })
    }

    // initialize reverse paths
    // used when user edits yaml to know what control to update
    let reverse = control.reverse || []
    reverse = Array.isArray(reverse) ? reverse : [reverse]
    control.reverse = reverse.map(path=>{
      return path.replace('.', '.$raw.')
    })

    return control
  })
}

// don't save user data until they create
export const cacheUserData = (controlData) => {
  controlData.forEach(control=>{
    if (control.cacheUserValueKey && control.userData && control.userData.length>0) {
      const storageKey = `${control.cacheUserValueKey}--${window.location.href}`
      sessionStorage.setItem(storageKey, JSON.stringify(control.userData))
    }
  })
}

export const updateControls = (controlData, oldParsed, newParsed, locale) => {

  // stuff newly parsed yaml object into a control's active values using the object to control path (reverse)
  let isCustomName = false
  controlData.forEach(control=>{
    const {type, reverse} = control
    switch (type) {
    case 'text':
      isCustomName = isCustomName || updateTextControl(control, reverse, newParsed)
      break
    case 'checkbox':
      updateCheckboxControl(control, reverse, newParsed)
      break
    case 'singleselect':
      updateSingleSelectControl(control, reverse, newParsed)
      break
    case 'multiselect':
      updateMultiSelectControl(control, reverse, oldParsed, newParsed, locale)
      break
    }
  })
  return isCustomName
}

const updateTextControl = (control, reverse, newParsed) => {
  const newActive = _.get(newParsed, reverse[0])
  const isCustomName = control.id==='name' && control.active!==newActive
  control.active = newActive === null ? '' : newActive
  return isCustomName
}

const updateCheckboxControl = (control, reverse, newParsed) => {
  const newActive = _.get(newParsed, reverse[0])
  control.active = newActive === null ? '' : newActive
  control.checked = control.available.indexOf(newActive)===1
}

const updateSingleSelectControl = (control, reverse, newParsed) => {
  const newActive = _.get(newParsed, reverse[0])
  //single select can only have one string as active, otherwise no pre-selected
  if (typeof newActive === 'string') {
    control.active = newActive
  }
  else {
    control.active = ''
  }
}

const updateMultiSelectControl = (control, reverse, oldParsed, newParsed, locale) => {
  const {hasLabels, hasReplacements} = control
  if (hasLabels) {
    updateMultiSelectLabelControl(control, reverse, newParsed)
  } else if (hasReplacements) {
    updateMultiSelectReplacementControl(control, reverse, oldParsed, newParsed, locale)
  } else {
    updateMultiSelectStringControl(control, reverse, newParsed)
  }
}

const updateMultiSelectStringControl = (control, reverse, newParsed) => {
  let values = _.get(newParsed, reverse[0])
  if (values && typeof values==='string') {
    const set = new Set(control.available)
    values = values.split(',').map((item) => {
      return item.trim()
    }).filter(v=>{return v!==''})
    control.userData = values.filter(value=>{
      return !set.has(value)
    })
  } else {
    values = []
  }
  control.active = values
}

const updateMultiSelectLabelControl = (control, reverse, newParsed) => {
  const selectors = []
  const userData = []
  const userMap = {}
  const {availableMap} = control
  const matchLabels = _.get(newParsed, `${reverse[0]}.matchLabels`)
  if (matchLabels instanceof Object) {
    Object.entries(matchLabels).forEach(([key, value]) => {
      updateUserData(availableMap, userMap, userData, selectors, key, value)
    })
  }
  const matchExpressions = _.get(newParsed, `${reverse[0]}.matchExpressions`)
  if (matchExpressions instanceof Object) {
    matchExpressions.forEach(({key, operator, values})=>{
      if (operator==='In') {
        values.forEach(value => {
          updateUserData(availableMap, userMap, userData, selectors, key, value)
        })
      }
    })
  }
  if (userData.length>0) {
    control.userData = userData
    control.userMap = userMap
  }
  control.active = selectors
}

const updateUserData = (availableMap, userMap, userData, selectors, key, value) => {
  const selection = `${key}: "${value}"`
  selectors.push(selection)
  if (!availableMap[selection]) {
    userMap[selection] = {key, value}
    userData.push(selection)
  }
}

const updateMultiSelectReplacementControl = (control, reverse, oldParsed, newParsed, locale) => {

  // get all objects this control can possibly add to the template
  const oldObjects = getTemplateObjects(reverse, oldParsed)
  const newObjects = getTemplateObjects(reverse, newParsed)
  // if old and new have objects
  if (oldObjects && newObjects) {
    // did user an edit an object?
    control.hasCapturedUserSource = control.hasCapturedUserSource || !_.isEqual(oldObjects, newObjects)
  } else if (!oldObjects && newObjects) {
    // did user paste in some objects?
    control.hasCapturedUserSource = true
  } else if (oldObjects && !newObjects) {
    // did user delete the objects?
    control.active = []
    control.hasCapturedUserSource = false
  }

  // if user has manually changed the objects, save their changes and remove all active selected templates
  if (control.hasCapturedUserSource) {
    control.userData = getTemplateSource(reverse, newParsed)
    if (control.userData !== '') {
      control.active = [msgs.get('creation.view.policy.custom', locale)]
    } else {
      // If userData is empty, we should reset the form
      control.active = []
      control.hasCapturedUserSource = false
    }
  } else {
    delete control.userData
  }
}

const getTemplateObjects = (reverse, parsed) => {
  const objects = []
  reverse.forEach(path=>{
    const object = _.get(parsed, path)
    if (object) {
      objects.push(object)
    }
  })
  return objects.length>0 ? objects : undefined
}

export const getTemplateSource = (reverse, parsed) => {
  let ret = []
  reverse.forEach(path=>{
    const pathArray = path.split('.')
    const pathBase = pathArray.shift()
    pathArray.shift()

    // dig out the yaml and the object that points to it
    const yaml = _.get(parsed, `${pathBase}.$yml`)
    const pathReformat = path.length>0 ? pathBase + `.$synced.${pathArray.join('.$v.')}.$v` : pathBase
    const synced = _.get(parsed, pathReformat)
    if (yaml && synced) {
      // capture the source lines
      const lines = yaml.split('\n')
      // the templates are an array, so we need to iterate over each
      for (let i = 0; i < synced.length; i++) {
        const syncItem = synced[i]
        if (i+1 < synced.length) {
          ret = [...ret, ...lines.slice(syncItem.$r, synced[i+1].$r).join('\n')]
        } else {
          ret = [...ret, ...lines.slice(syncItem.$r, syncItem.$r+syncItem.$l).join('\n')]
        }
      }
    }
  })
  return ret.join('\n')
}

export const parseYAML = (yaml) => {
  let absLine=0
  const parsed = {}
  const yamls = yaml.split(/^---$/gm)
  const exceptions = []
  // check for syntax errors
  try {
    yamls.forEach((snip)=>{
      const obj = jsYaml.safeLoad(snip)
      const key = _.get(obj, 'kind', 'unknown')
      let values = parsed[key]
      if (!values) {
        values = parsed[key] = []
      }
      const post = new RegExp(/[\r\n]+$/).test(snip)
      snip = snip.trim()
      const $synced = new YamlParser().parse(snip, absLine)
      if ($synced === null) {
        throw new Error('YAML returned null')
      }
      $synced.$r = absLine
      $synced.$l = snip.split(/[\r\n]+/g).length
      values.push({$raw: obj, $yml: snip, $synced})
      absLine += $synced.$l
      if (post) {
        absLine++
      }
    })
  } catch (e) {
    const {mark={}, reason, message} = e
    const {line=0, column=0} = mark
    exceptions.push({
      row: line+absLine,
      column,
      text: _.capitalize(reason||message),
      type: 'error',
    })
  }
  return {parsed, exceptions}
}

