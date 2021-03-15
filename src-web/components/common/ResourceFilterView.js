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
import { Checkbox, Icon } from 'carbon-components-react'
import { Scrollbars } from 'react-custom-scrollbars'
import resources from '../../../lib/shared/resources'
import '../../../graphics/diagramIcons.svg'
import msgs from '../../../nls/platform.properties'
import _ from 'lodash'

resources(() => {
  require('../../../scss/resource-filter-view.scss')
})

// if section has more then this number of filters, add "show more"
const SHOW_MORE = 10

const ShowOrMoreItem = ({ count, isExpanded, onExpand, locale }) => {
  return (
    <div className='filter-section-expand' tabIndex={0} role={'button'}
      onClick={onExpand} onKeyPress={onExpand}>
      {isExpanded ?
        msgs.get('filter.view.collapse', locale) :
        msgs.get('filter.view.expand', [count], locale)}
    </div>
  )
}

ShowOrMoreItem.propTypes = {
  count: PropTypes.number,
  isExpanded: PropTypes.bool,
  locale: PropTypes.string,
  onExpand: PropTypes.func,
}

const FilterSection = ({ section: {name, filters, isExpanded, onExpand}, locale }) => {
  filters.sort(({label:a, isAll:ia, isOther:oa}, {label:b, isAll:ib, isOther:ob})=>{
    if (ia && !ib) {
      return -1
    } else if (!ia && ib) {
      return 1
    }
    if (oa && !ob) {
      return 1
    } else if (!oa && ob) {
      return -1
    }
    return a.localeCompare(b)
  })

  // show more/or less
  const count = filters.length-SHOW_MORE-2
  const showMoreOrLess = count>0
  if (showMoreOrLess && !isExpanded) {
    filters = filters.slice(0, SHOW_MORE)
  }

  return (
    <div className='filter-section'>
      <div className='filter-section-title'>
        {name}
      </div>
      {filters.map(({key, label, checked, onChange, onKeyPress}) => {
        return <Checkbox
          id={key}
          key={key}
          className='filter-section-checkbox'
          labelText={label}
          checked={checked}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      })}
      {showMoreOrLess &&
        <ShowOrMoreItem
          count={count}
          isExpanded={isExpanded}
          onExpand={onExpand}
          locale={locale}
        />}
    </div>
  )
}

FilterSection.propTypes = {
  locale: PropTypes.string,
  section: PropTypes.object,
}

export default class ResourceFilterView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      expanded: {},
    }
    this.resize = _.debounce(()=>{
      this.layoutView()
    }, 150)
    this.handleMouse = this.handleMouse.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.handleFilterClose = this.handleFilterClose.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    window.addEventListener('mouseup', this.handleMouse, true)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mouseup', this.handleMouse, true)
  }

  handleMouse (event) {
    // make sure dropdown is closed when clicking outside
    // unless they click a link and nothing is filtered
    if (this.filterViewRef && !this.filterViewRef.contains(event.target)) {
      const clickedTab = event.target.href!==undefined || (event.target.firstChild && event.target.firstChild.href!==undefined)
      if (!clickedTab || Object.keys(this.props.activeFilters).length === 0) {
        this.handleFilterClose()
      }
    }
  }

  layoutView() {
    this.forceUpdate()
  }

  setContainerRef = ref => {this.containerRef = ref}

  setFilterViewRef = ref => {
    if (ref) {
      this.filterViewRef = ref
      this.filterViewRef.addEventListener('wheel', this.handleWheel, {passive: false} )
    } else if (this.filterViewRef) {
      this.filterViewRef.removeEventListener('wheel', this.handleWheel, {passive: false} )
      this.filterViewRef = ref
    }
  }

  // prevent mouse wheel from affecting main display
  handleWheel(event) {
    if (this.containerRef) {
      this.containerRef.view.scrollTop = this.containerRef.view.scrollTop + event.deltaY
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    const { locale } = this.context
    const { availableFilters={}, activeFilters } = this.props

    // add filter sections
    const sections=[]

    Object.keys(availableFilters).forEach(key=>{
      sections.push(this.getSectionData(key, availableFilters[key], activeFilters[key], locale))
    })

    // calc height of scrollbar container
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const headerContainer = document.getElementById('header-container')
    const rectHeight = headerContainer ? headerContainer.getBoundingClientRect().height : 0
    const scrollHeight = height-rectHeight
    const containerWidth = 260 // based on resource-filter-view width of 300px
    return (
      <div className='resource-filter-view' ref={this.setFilterViewRef} style={{height:scrollHeight+3}} >
        <h3 className='filterHeader'>
          <svg className='titleIcon'>
            <use href={'#diagramIcons_filter'} ></use>
          </svg>
          <div className='titleText'>
            {msgs.get('filter.view.title', locale)}
          </div>
          <Icon
            className='closeIcon'
            tabIndex={0}
            role={'button'}
            description={msgs.get('filter.view.close', locale)}
            name="icon--close"
            onClick={this.handleFilterClose}
            onKeyPress={this.handleFilterClose}
          />
        </h3>
        <Scrollbars style={{ width: containerWidth, height: scrollHeight-80 }}
          renderView = {this.renderView}
          renderThumbVertical = {this.renderThumbVertical}
          ref={this.setContainerRef}
          className='filter-sections-container'>
          {sections.map(section => {
            return <FilterSection key={section.key} section={section} locale={locale} />
          })}
        </Scrollbars>
      </div>)
  }

  renderView({ style, ...props }) {
    style.marginBottom = -17
    return (
      <div {...props} style={{ ...style }} />
    )
  }

  renderThumbVertical({ style, ...props }) {
    const finalStyle = {
      ...style,
      cursor: 'pointer',
      borderRadius: 'inherit',
      backgroundColor: 'rgba(255,255,255,.2)'
    }
    return <div className={'filter-sections-scrollbar'} style={finalStyle} {...props} />
  }

  getSectionData(key, availableFilters, activeSet=new Set(), locale) {
    const {name, availableSet} = availableFilters
    const multipleChoices = availableSet.size>1
    const other=msgs.get('overview.grc.overview.other', locale)
    const filters = Array.from(availableSet).map(value=>{
      return {
        key: key+value,
        label: value,
        isOther: value===other,
        checked: !multipleChoices || activeSet.has(value),
        onChange: !multipleChoices ? ()=>{/*This is intentional*/} : this.onChange.bind(this, key, value),
        onKeyPress: !multipleChoices ? ()=>{/*This is intentional*/} : this.onKeyPress.bind(this, key, value, !multipleChoices || activeSet.has(value)),
      }
    })
    if (multipleChoices) {
      filters.unshift({
        key: key+'all',
        label: msgs.get('filter.view.all', locale),
        isAll: true,
        checked: activeSet.size===0,
        onChange: this.onChange.bind(this, key, 'all'),
        onKeyPress: this.onKeyPress.bind(this, key, 'all'),
      })
    }
    return {
      key,
      name,
      filters,
      isExpanded: this.state.expanded[key],
      onExpand: this.onExpand.bind(this, key),
    }
  }

  onChange = (key, value, checked) => {
    const {updateFilters} = this.props
    updateFilters(key, value, checked)
  }

  //handler checkbox by press enter key
  onKeyPress = (key, value, checked) => {
    const {updateFilters} = this.props
    updateFilters(key, value, !checked)
  }

  onExpand = (label) => {
    this.setState(prevState=>{
      const expanded = _.cloneDeep(prevState.expanded)
      expanded[label] = !expanded[label]
      return {expanded}
    })
  }

  handleFilterClose = () => {
    this.props.onClose()
  }
}

ResourceFilterView.propTypes = {
  activeFilters: PropTypes.object,
  availableFilters: PropTypes.object,
  onClose: PropTypes.func,
  updateFilters: PropTypes.func,
}
