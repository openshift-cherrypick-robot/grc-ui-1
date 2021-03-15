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
import { validateYAML } from '../../../../../src-web/components/common/TemplateEditor/utils/validate-yaml'

//parsed, exceptions, locale
describe('truncate middle', () => {
  it('should truncate string as expected', () => {
    expect(validateYAML('', [], '')).toMatchSnapshot()
  })
})
