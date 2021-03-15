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
import _ from 'lodash'
import { Breadcrumb, Tabs, Tab } from 'carbon-components-react'
import { Button, Tooltip } from '@patternfly/react-core'
import { createDisableTooltip } from '../common/DisableTooltip'
import resources from '../../../lib/shared/resources'
import { withRouter, Link } from 'react-router-dom'
import msgs from '../../../nls/platform.properties'
import checkCreatePermission from '../common/CheckCreatePermission'

resources(() => {
  require('../../../scss/secondary-header.scss')
})

export class SecondaryHeader extends React.Component {
  constructor(props) {
    super(props)
    this.renderBreadCrumb = this.renderBreadCrumb.bind(this)
    this.renderTabs = this.renderTabs.bind(this)
    this.renderLinks = this.renderLinks.bind(this)

    this.state = {
      shadowPresent: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    if (window.scrollY > .1 && this.state.shadowPresent === false) {
      this.setState({shadowPresent:true})
    }
    else if (window.scrollY <= .1 && this.state.shadowPresent === true) {
      this.setState({shadowPresent:false})
    }
  }

  render() {
    const { tabs, title, breadcrumbItems, links, description, location, userAccess } = this.props
    const { shadowPresent: scrolled } = this.state
    const { locale } = this.context
    const displayType = location.pathname.split('/').pop()
    let showCreationLink // 0=clickable, 1=non-clickable, 2=hide
    switch(displayType) {
    case 'all':
    default:
      showCreationLink = checkCreatePermission(userAccess)
      break
    }
    const midName = (!location.pathname.startsWith('/multicloud/policies/all/') ? 'secondary-header-grc-overview' : '')
    const hasTabs = Boolean(tabs && tabs.length>0)
    const hasBreadcrumb = Boolean(breadcrumbItems)
    const hasButtons = Boolean(showCreationLink !== 2 && links && links.length>0)
    const noBreadcrumbClass = ' no-breadcrumb'
    return (
      <div
        className={`secondary-header-wrapper${scrolled?' scrolled':''}${hasTabs?'':' no-tabs'}${hasBreadcrumb?'':noBreadcrumbClass}${hasButtons?'':' no-buttons'}`}
        role='region'
        aria-label={title}
      >
        <div className={`secondary-header ${midName} simple-header${scrolled ? '-with-shadow' : ''}${description ? ' special-layout': ''}`}>
          <header aria-label={`Heading: ${title}`}>
            <div className='bx--detail-page-header-content'>
              {hasBreadcrumb &&
                (
                  <Breadcrumb>
                    {this.renderBreadCrumb()}
                  </Breadcrumb>
                )
              }
              {this.renderHeader(hasBreadcrumb, noBreadcrumbClass)}
              {hasTabs &&
                <Tabs selected={this.getSelectedTab() || 0} aria-label={`${title} ${msgs.get('tabs.label', locale)}`}>
                  {this.renderTabs()}
                </Tabs>
              }
            </div>
          </header>
        </div>
        {hasButtons &&
          <div className='secondary-header-links'>
            {this.renderLinks(showCreationLink)}
          </div>
        }
      </div>
    )
  }

  renderHeader(hasBreadcrumb = false, noBreadcrumbClass = ' no-breadcrumb') {
    const { title:headerTitle, description, information, links=[] } = this.props
    if (description) {
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      return (
        <div className={`bx--detail-page-header-title-container${hasBreadcrumb ? '': noBreadcrumbClass}`}>
          <h1 className='bx--detail-page-header-title'>{headerTitle}</h1>
          <div className='detail-page-header-title-button' onClick={description.action}><p>{description.display}</p></div>
        </div>
      )
    } else {
      return (
        <div className={`bx--detail-page-header-title-container${hasBreadcrumb ? '': noBreadcrumbClass}`}>
          <h1 className='bx--detail-page-header-title'>{headerTitle}</h1>
          {information &&
            <Tooltip content={information}>
              <svg className='info-icon'>
                <use href={'#diagramIcons_info'} ></use>
              </svg>
            </Tooltip>
          }
          {links && links.map(link => {
            const {id, kind, title:linkTitle } = link
            // if portal, react component will create the button using a portal
            if (kind==='portal' && linkTitle) {
              return <div key={id} id={id} className='portal' />
            } else {
              return null
            }})}
        </div>
      )
    }
  }

  renderBreadCrumb() {
    const { locale } = this.context
    const { breadcrumbItems } = this.props
    return breadcrumbItems && breadcrumbItems.map((breadcrumb, index) => {
      const key = `${breadcrumb.id}-${index}`
      const noLocale = _.get(breadcrumb, 'noLocale', false)
      return (
        <div key={key} className='bx--breadcrumb-item' title={decodeURIComponent(breadcrumb.label)}>
          {breadcrumb.handleClick ?
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div className='breadcrumb-link' onClick={breadcrumb.handleClick} >{msgs.get(breadcrumb.label, locale)}</div> :
            <Link to={breadcrumb.url || ''} className='bx--link'>{noLocale ? breadcrumb.label : msgs.get(breadcrumb.label, locale)}</Link>}
        </div>
      )
    })
  }

  renderTabs() {
    const { tabs } = this.props,
          { locale } = this.context
    return tabs.map(tab => {
      return <Tab label={msgs.get(tab.label, locale)} key={tab.id} id={tab.id} href={tab.url} onClick={tab.handleClick ? tab.handleClick : this.clickTab.bind(this, tab.url)} />
    })
  }

  renderLinks(showCreationLink) {
    const { links } = this.props,
          { locale } = this.context,
          disableFlag = (showCreationLink !== 1)
    return links.map(link => {
      const {id, label, url, kind='primary', handleClick=(()=> this.props.history.push(url)) } = link
      // if portal, react component will create the button using a portal
      if (kind==='portal') {
        return <div key={id} id={id} className='portal' />
      }
      const buttonItem = (<Button
        isDisabled={disableFlag}
        key={id}
        id={id}
        onClick={handleClick}
        variant={kind}
        isSmall
      >
        {msgs.get(label, locale)}
      </Button>)
      return createDisableTooltip(disableFlag, id, locale, buttonItem)
    })
  }

  getSelectedTab() {
    const { tabs, location } = this.props
    const selectedTab = tabs.map((tab, index) => {
      tab.index = index
      return tab
    }).filter((tab, index) => {
      if (index !== 0) {
        return location.pathname.startsWith(tab.url)
      }
      return undefined
    })
    return selectedTab[0] && selectedTab[0].index
  }

  clickTab(url) {
    this.props.history.push(url)
    return url
  }
}

SecondaryHeader.contextTypes = {
  locale: PropTypes.string
}

SecondaryHeader.propTypes = {
  breadcrumbItems: PropTypes.array,
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  history: PropTypes.object.isRequired,
  information: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  links: PropTypes.array,
  location: PropTypes.object,
  tabs: PropTypes.array,
  title: PropTypes.string,
  userAccess: PropTypes.array
}

const mapStateToProps = (state) => {
  const userAccess = state.userAccess && state.userAccess.access
    ? state.userAccess.access
    : []
  return {
    title: state.secondaryHeader.title,
    tabs: state.secondaryHeader.tabs,
    breadcrumbItems: state.secondaryHeader.breadcrumbItems,
    links: state.secondaryHeader.links,
    refresh: state.secondaryHeader.refresh,
    userAccess: userAccess,
    description: state.secondaryHeader.description,
    information: state.secondaryHeader.information,
  }
}

export default withRouter(connect(mapStateToProps)(SecondaryHeader))
