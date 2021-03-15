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
import EditorBar from '../../../../../../src-web/components/common/TemplateEditor/components/EditorBar'
import renderer from 'react-test-renderer'

describe('EditorBar component', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const exceptions = [{text:'bad', row:0}]
    const component = renderer.create(
      <EditorBar
        hasUndo={false}
        hasRedo={true}
        exceptions={exceptions}
        gotoEditorLine={fn}
        handleEditorCommand={fn}
        handleSearchChange={fn}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
