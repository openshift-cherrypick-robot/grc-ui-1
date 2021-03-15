/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

export const getOpt = (opts, key, defaultValue) => {
  if (opts && opts[key]) {
    return opts[key]
  }
  return defaultValue
}

// create an unique resource name
export const getUniqueResourceName = name => {
  let uName = name
  if (Cypress.env('RESOURCE_ID') && (!name.endsWith(Cypress.env('RESOURCE_ID'))))
    uName = `${name}-${Cypress.env('RESOURCE_ID')}`

  return uName
}
