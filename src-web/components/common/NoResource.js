/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
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
import msgs from '../../../nls/platform.properties'
import config from '../../../lib/shared/config'
import resources from '../../../lib/shared/resources'

resources(() => {
  require('../../../scss/no-resource.scss')
})

const NoResource = ({
  title,
  detail,
  className,
  imgClassName,
  titleClassName,
  svgName,
  alt,
  children,
  topButton,
}, context )=> {
  return  title ?
    <div>
      {topButton}
      <div className={className ? className : 'no-resource'}>
        <img
          className={imgClassName ? imgClassName : 'no-resource-icon'}
          src={`${config.contextPath}/graphics/${svgName ? svgName : 'EmptyPagePlanet-illus.png'}`}
          alt={alt ? alt : msgs.get('svg.description.noresource', context.locale)} />
        <div className={'no-resource-text-info'}>
          <div className={titleClassName ? titleClassName : 'no-resource-title'}>{title}</div>
          {detail && <div className='no-resource-detail'>{detail}</div>}
        </div>
        {children}
      </div>
    </div> :
    <div className={className ? className : 'no-resource'}>
      <img
        className={imgClassName ? imgClassName : 'no-resource-icon'}
        src={`${config.contextPath}/graphics/${svgName ? svgName : 'EmptyPagePlanet-illus.png'}`}
        alt={alt ? alt : msgs.get('svg.description.noresource', context.locale)} />
    </div>
}

NoResource.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  detail: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  imgClassName: PropTypes.string,
  svgName: PropTypes.string,
  title:PropTypes.string,
  titleClassName:PropTypes.string,
  topButton: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

NoResource.contextTypes = {
  locale: PropTypes.string
}

export default NoResource
