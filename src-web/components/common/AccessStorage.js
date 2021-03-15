/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

// sessionStorage access section
export const deleteSessionState = (sessionName) => {
  sessionStorage.removeItem(sessionName)
}

export const getSessionState = (sessionName) => {
  let state = {}
  const savedState = sessionStorage.getItem(sessionName)
  if (savedState && typeof state ===  'object') {
    try {
      state = JSON.parse(savedState)
    } catch (e) {
      //
    }
  } else if (typeof state ===  'string') {
    state = savedState
  }
  return state
}

export const saveSessionState = (sessionName, state) => {
  if (typeof state === 'string') {
    sessionStorage.setItem(sessionName, state)
  } else {
    // Convert our sets to arrays for stringify
    const stateObject = {}
    for (const key in state) {
      if (typeof state[key] === 'object') { // set is also object
        stateObject[key] = Array.from(state[key])
      } else {
        stateObject[key] = state[key]
      }
    }
    sessionStorage.setItem(sessionName, JSON.stringify(stateObject))
  }
}

// simply replace session value on the given key
export const replaceSessionPair = (sessionName, key, value) => {
  const state = getSessionState(sessionName)
  if (key) {
    state[key] = value
  }
  saveSessionState(sessionName, state)
}

// append session value on the given key
export const addSessionPair = (sessionName, key, value) => {
  const state = getSessionState(sessionName)
  state[key] = new Set(state[key])
  state[key].add(value)
  saveSessionState(sessionName, state)
}
