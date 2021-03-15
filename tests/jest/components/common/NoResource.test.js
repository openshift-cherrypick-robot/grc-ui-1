/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import NoResource from '../../../../src-web/components/common/NoResource'
import renderer from 'react-test-renderer'

describe('NoResource component', () => {
  it('renders as expected', () => {
    const topButton = <div>topButton</div>
    const component = renderer.create(
      <NoResource title='title' detail='detailed description' topButton={topButton}>
        <div className='child'>Test</div>
      </NoResource>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected', () => {
    const topButton = <div>topButton</div>
    const component = renderer.create(
      <NoResource
        title='title'
        detail='detailed description'
        topButton={topButton} filterToEmpty={true}>
        <div className='child'>Test</div>
      </NoResource>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected', () => {
    const topButton = <div>topButton</div>
    const component = renderer.create(
      <NoResource
        title='title'
        detail='detailed description'
        topButton={topButton}
        titleClassName={'test-title'}
        imgClassName={'test-image'}
        svgName={'test-svg.svg'} alt={'test'}>
        <div className='child'>Test</div>
      </NoResource>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected', () => {
    const component = renderer.create(
      <NoResource>
        <div className='child'>Test</div>
      </NoResource>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected', () => {
    const component = renderer.create(
      <NoResource
        className={'test-class'}
        titleClassName={'test-title'}
        imgClassName={'test-image'}
        svgName={'test-svg.svg'} alt={'test'}>
        <div className='child'>Test</div>
      </NoResource>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
