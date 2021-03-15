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
import YamlEditor from '../../../../../../src-web/components/common/TemplateEditor/components/YamlEditor'
import renderer from 'react-test-renderer'

describe('YamlEditor', () => {
  it('renders as expected', () => {
    const props = {
      height: '41vh',
      onYamlChange() {},
      readOnly: true,
      setEditor() {},
      width: '50vw',
      yaml: 'YamlEditorTestYaml1'
    }
    const component = renderer.create(
      <YamlEditor  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected', () => {
    const props = {
    }
    const component = renderer.create(
      <YamlEditor  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
