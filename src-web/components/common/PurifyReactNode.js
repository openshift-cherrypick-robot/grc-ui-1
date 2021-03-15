/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

// Recursively subtract the pure data part from the react root node
export default function purifyReactNode(reactNode) {
  if (!reactNode) {
    return ''
  } else if (typeof reactNode === 'string') {
    return reactNode
  } else if (typeof reactNode === 'number') {
    return reactNode.toString()
  } else if (reactNode.props && reactNode.props.text) {
    return purifyReactNode(reactNode.props.text)
  } else if (reactNode.props && reactNode.props.children) {
    return purifyReactNode(reactNode.props.children)
  } else if (Array.isArray(reactNode) && reactNode.length > 0) {
    return reactNode.map(childElement => purifyReactNode(childElement)).join('')
  }
  return ''
}
