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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import resources from '../../../lib/shared/resources'
import { updateActiveFilters } from '../../actions/common'
import { Icon, Tag } from 'carbon-components-react'
import msgs from '../../../nls/platform.properties'
import _ from 'lodash'
import queryString from 'query-string'
import { saveSessionState } from '../../components/common/AccessStorage'
import { GRC_FILTER_STATE_COOKIE } from '../../../lib/shared/constants'
import TruncateText from '../../components/common/TruncateText'

resources(() => {
  require('../../../scss/resource-filterbar.scss')
})

class ResourceFilterBar extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { locale } = this.context
    const { activeFilters={} } = this.props
    const boundFilters=[]
    const clearFilters = []
    // individual filter tags
    Object.keys(activeFilters).forEach(key=>{
      const activeSet = activeFilters[key]
      if (activeSet.size>0) {
        clearFilters.push(key)
        activeSet.forEach(value=>{
          if(value) {
            boundFilters.push({
              name: value,
              onClick: this.removeActiveFilter.bind(this, key, value),
              onKeyPress: this.removeActiveFilter.bind(this, key, value)
            })
          }
        })
      }
    })
    if (clearFilters.length>0) {
      // clear all tag
      const clearAll = msgs.get('filter.remove.all', locale)
      return (
        <div className='resource-filter-bar'>
          <span className='title'>{msgs.get('filter.remove.filters', locale)}</span>
          {boundFilters.map(({name, onClick, onKeyPress}) => {
            return <Tag key={name} type='custom' tabIndex={0} role={'button'} onKeyPress={onKeyPress}>
              <TruncateText maxCharacters={20} text={name} />
              <Icon
                className='closeIcon'
                description={msgs.get('filter.remove.tag', locale)}
                name="icon--close"
                onClick={onClick}
              />
            </Tag>
          })}
          <span className='button' tabIndex={0} role={'button'}
            title={clearAll} aria-label={clearAll}
            onClick={this.handleClearClick.bind(this)}
            onKeyPress={this.handleClearKeyPress.bind(this)} >
            {clearAll}
          </span>
        </div>
      )
    }
    return null
  }

  removeActiveFilter = (key, value) => {
    const {updateActiveFilters:localUpdateActiveFilters} = this.props
    const activeFilters = _.cloneDeep(this.props.activeFilters||{})
    const activeSet = _.get(activeFilters, key, new Set())
    activeSet.delete(value)
    if (activeSet.size===0 && activeFilters[key]) {
      delete activeFilters[key]
    }
    if (_.isEmpty(activeFilters)) {
      this.removeAllActiveFilters()
    } else {
      saveSessionState(GRC_FILTER_STATE_COOKIE, activeFilters)
      localUpdateActiveFilters(activeFilters)
    }
  }

  handleClearClick = () => {
    this.removeAllActiveFilters()
  }

  handleClearKeyPress() {
    this.handleClearClick()
  }

  removeAllActiveFilters = () => {
    //step 1 clear up stored active filters in sessionStorage
    //step 2 clear up active filters in resource filter
    const { updateActiveFilters:localUpdateActiveFilters, location, history } = this.props
    const emptyFilters = {}
    saveSessionState(GRC_FILTER_STATE_COOKIE, emptyFilters)
    localUpdateActiveFilters(emptyFilters)
    //step 3 make sure url doesn't have toggle removed and restore if it does
    const newURL = queryString.parse(location.search)
    if(newURL.toggle) {
      delete newURL.toggle
      const op = '?'
      history.push(`${location.pathname}${op}${queryString.stringify(newURL)}`)
    }
  }
}

ResourceFilterBar.propTypes = {
  activeFilters: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  updateActiveFilters: PropTypes.func,
}

const mapStateToProps = (state) => {
  const {resourceToolbar: {activeFilters}} = state
  return { activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateActiveFilters: (activeFilters) => dispatch(updateActiveFilters(activeFilters))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceFilterBar))
