/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'
import purifyReactNode from '../../../../src-web/components/common/PurifyReactNode'

describe('test purifyReactNode', () => {
  it('renders null node', () => {
    expect(purifyReactNode(null)).toMatchSnapshot()
  })
  it('renders empty node', () => {
    expect(purifyReactNode('')).toMatchSnapshot()
  })
  it('renders string', () => {
    expect(purifyReactNode('Red Hat')).toMatchSnapshot()
  })
  it('renders number', () => {
    expect(purifyReactNode(2020)).toMatchSnapshot()
  })
  it('renders empty object', () => {
    expect(purifyReactNode({})).toMatchSnapshot()
  })
  it('renders empty array', () => {
    expect(purifyReactNode([])).toMatchSnapshot()
  })
  it('renders object1', () => {
    const object1 = {
      props: {
        name: 'object1'
      }
    }
    expect(purifyReactNode(object1)).toMatchSnapshot()
  })
  it('renders object2', () => {
    const object2 = {
      props: {
        name: 'object2',
        children: 'object2child1'
      }
    }
    expect(purifyReactNode(object2)).toMatchSnapshot()
  })
  it('renders object3', () => {
    const object3 = {
      props: {
        name: 'object3',
        children: {
          props: {
            children: [
              'object3->child1',
              {
                props: {
                  name: 'object3->child1',
                  children: 'object3->child1->grandchild1'
                }
              }
            ]
          }
        }
      }
    }
    expect(purifyReactNode(object3)).toMatchSnapshot()
  })
  it('renders object4', () => {
    const object4 = {
      props: {
        name: 'object4',
        children: {
          props: {
            children: [
              'object4->child1',
              {
                props: {
                  'text': 'NonCompliant; violation - namespaces `prod` does not exist as specified',
                  'maxCharacters': 300,
                }
              }
            ]
          }
        }
      }
    }
    expect(purifyReactNode(object4)).toMatchSnapshot()
  })
})
