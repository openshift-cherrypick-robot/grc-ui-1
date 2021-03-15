/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Title,
} from '@patternfly/react-core'
import jsYaml from 'js-yaml'
import _ from 'lodash'
import YamlEditor from '../common/YamlEditor'
import PatternFlyTable from '../common/PatternFlyTable'
import { LocaleContext } from '../common/LocaleContext'
import relatedObjectsDef from '../../tableDefinitions/relatedObjectsDef'
import { transform } from '../../tableDefinitions/utils'
import msgs from '../../../nls/platform.properties'

class PolicyTemplateDetailsView extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextType = LocaleContext

  setContainerRef = container => {
    this.containerRef = container
    this.layoutEditors()
  }

  setEditor = (editor) => {
    this.editor=editor
    this.layoutEditors()
  }

  layoutEditors() {
    if (this.containerRef && this.editor) {
      const rect = this.containerRef.getBoundingClientRect()
      const width = rect.width
      const height = rect.height - 24 // minus height of title
      this.editor.layout({width, height})
    }
  }

  componentDidMount() {
    window.addEventListener('resize',  this.layoutEditors.bind(this))
  }

  render() {
    const { template, selfLink } = this.props
    const { locale } = this.context
    // clone and inject cluster info into relatedObjects
    let relatedObjects = _.get(_.cloneDeep(template), 'status.relatedObjects', [])
    if (relatedObjects.length > 0) {
      relatedObjects = relatedObjects.map(o => {
        o.cluster = template.metadata.namespace
        if (!template.metadata.selfLink) {
          o.selfLink = selfLink
        }
        return o
      })
    }
    const tableData = transform(relatedObjects, relatedObjectsDef, locale)

    return (
      <div className='policy-template-details-view'>
        <div className='details'>
          <div className='overview'>
            <Title className='title' headingLevel="h2">{msgs.get('panel.header.template.details', locale)}</Title>
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.name', locale)}</DescriptionListTerm>
                <DescriptionListDescription>{_.get(template, 'metadata.name', '-')}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.cluster', locale)}</DescriptionListTerm>
                <DescriptionListDescription>
                  {_.get(template, 'metadata.namespace', '-')}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.kind', locale)}</DescriptionListTerm>
                <DescriptionListDescription>{_.get(template, 'kind', '-')}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.apiGroups', locale)}</DescriptionListTerm>
                <DescriptionListDescription>{_.get(template, 'apiVersion', '-')}</DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.compliant', locale)}</DescriptionListTerm>
                <DescriptionListDescription>
                  {_.get(template, 'status.compliant', '-')}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>{msgs.get('table.header.violation.detail', locale)}</DescriptionListTerm>
                <DescriptionListDescription>
                  {JSON.stringify(_.get(template, 'status.compliancyDetails', '-'))}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </div>
          <div className='yaml' ref={this.setContainerRef}>
            <Title className='title' headingLevel="h2">{msgs.get('panel.header.template.yaml', locale)}</Title>
            <div>
              <YamlEditor
                width={'100%'}
                height={'500px'}
                readOnly
                setEditor={this.setEditor}
                yaml={jsYaml.safeDump(template)} />
            </div>
          </div>
        </div>
        <div className='table'>
          <Title className='title' headingLevel="h2">{msgs.get('panel.header.related.resources', locale)}</Title>
          <PatternFlyTable {...tableData} noResultMsg={msgs.get('table.search.no.results', locale)} />
        </div>
      </div>

    )
  }
}

PolicyTemplateDetailsView.propTypes = {
  selfLink: PropTypes.string,
  template: PropTypes.object,
}

export default PolicyTemplateDetailsView
