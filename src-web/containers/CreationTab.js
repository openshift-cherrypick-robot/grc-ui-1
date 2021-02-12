/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import { createResources, createAndUpdateResources, updateSecondaryHeader,
  clearRequestStatus, fetchSingleResource } from '../actions/common'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Page from '../components/common/Page'
import { CREATE_POLICY_DISCOVERY } from '../../lib/client/queries'
import CreationView from '../components/modules/CreationView'
import msgs from '../../nls/platform.properties'
import config from '../../lib/shared/config'
import checkCreatePermission from '../components/common/CheckCreatePermission'
import { LocaleContext } from '../components/common/LocaleContext'

export class CreationTab extends React.Component {

  constructor (props) {
    super(props)
    this.state= {
      updateRequested: false
    }
  }

  static contextType = LocaleContext

  static propTypes = {
    cleanReqStatus: PropTypes.func,
    handleCreateAndUpdateResources: PropTypes.func,
    handleCreateResources: PropTypes.func,
    handleFetchResource: PropTypes.func,
    mutateErrorMsg: PropTypes.string,
    mutatePBErrorMsg: PropTypes.string,
    mutatePRErrorMsg: PropTypes.string,
    mutateStatus: PropTypes.string,
    secondaryHeaderProps: PropTypes.object,
    updateSecondaryHeader: PropTypes.func,
    updateStatus: PropTypes.string,
    userAccess: PropTypes.array
  }

  UNSAFE_componentWillMount() {
    const { updateSecondaryHeader:localUpdateSecondaryHeader, secondaryHeaderProps } = this.props
    const { title, tabs, breadcrumbItems, information } = secondaryHeaderProps
    const portals = [
      {
        id: 'edit-button-portal-id',
        kind: 'portal',
        title: true,
      },
      {
        id: 'cancel-button-portal-id',
        kind: 'portal',
      },
      {
        id: 'create-button-portal-id',
        kind: 'portal',
      }]
    localUpdateSecondaryHeader(msgs.get(title, this.context.locale), tabs, breadcrumbItems, portals, msgs.get(information, this.context.locale))
  }

  handleCreate = (resourceJSON) => {
    if (resourceJSON) {
      const {handleCreateResources} = this.props
      handleCreateResources(RESOURCE_TYPES.POLICY, resourceJSON)
    }
  }

  async buildCreateUpdateLists(resourceJSON) {
    if (resourceJSON) {
      return new Promise((resolve) => {
        const { handleFetchResource } = this.props
        let plc = {}
        const pbs = []
        const prs = []
        const create = []
        const update = []
        for (let i = 0; i < resourceJSON.length; i++) {
          if (resourceJSON[i].kind === 'Policy') {
            plc = resourceJSON[i]
          } else if (resourceJSON[i].kind === 'PlacementBinding') {
            pbs.push(resourceJSON[i])
          } else if (resourceJSON[i].kind === 'PlacementRule') {
            prs.push(resourceJSON[i])
          }
        }
        const targetNS = plc.metadata.namespace
        handleFetchResource(RESOURCE_TYPES.POLICY, {
          clusterName: plc.metadata.namespace,
          name: plc.metadata.name
        }).then((res) => {
          if (res.items.policies && res.items.policies.length !== 0) {
            plc.metadata.selfLink = res.items.policies[0].metadata.selfLink
            plc.metadata.resourceVersion = res.items.policies[0].metadata.resourceVersion
            update.push(plc)
          } else {
            create.push(plc)
          }
        }).then(() => {
          return handleFetchResource(RESOURCE_TYPES.PLACEMENT_BINDING, {
            pbs: pbs.map((pb => pb.metadata.name)),
          })
        }).then((res) => {
          this.addPBs(res, pbs, update, create, targetNS)
        }).then(() => {
          return handleFetchResource(RESOURCE_TYPES.PLACEMENT_RULE, {
            prs: prs.map((pr => pr.metadata.name)),
          })
        }).then((res) => {
          this.addPRs(res, prs, update, create, targetNS)
        }).then(() => {
          return resolve({ create, update })
        })
      })
    }
    return Promise.resolve()
  }

  addPBs = (res, pbs, update, create, namespace) => {
    if (res.items.placementBindings) {
      const resPBs = {}
      res.items.placementBindings.forEach((b) => {
        resPBs[b.metadata.name] = b
      })
      pbs.forEach((pb) => {
        const resPB = resPBs[pb.metadata.name]
        if (resPB && resPB.metadata.namespace === namespace) {
          pb.metadata.selfLink = resPB.metadata.selfLink
          pb.metadata.resourceVersion = resPB.metadata.resourceVersion
          update.push(pb)
        } else {
          create.push(pb)
        }
      })
    } else {
      throw new Error('Error fetching placement binding')
    }
  }

  addPRs = (res, prs, update, create, namespace) => {
    if (res.items.placementRules) {
      const resPRs = {}
      res.items.placementRules.forEach((r) => {
        resPRs[r.metadata.name] = r
      })
      prs.forEach((pr) => {
        const resPR = resPRs[pr.metadata.name]
        if (resPR && resPR.metadata.namespace === namespace) {
          pr.metadata.selfLink = resPR.metadata.selfLink
          pr.metadata.resourceVersion = resPR.metadata.resourceVersion
          update.push(pr)
        } else {
          create.push(pr)
        }
      })
    } else {
      throw new Error('Error fetching placement rule')
    }
  }

  handleCreateAndUpdate = (createList, updateList) => {
    this.props.handleCreateAndUpdateResources([
      RESOURCE_TYPES.POLICY,
      RESOURCE_TYPES.PLACEMENT_BINDING,
      RESOURCE_TYPES.PLACEMENT_RULE
    ], createList, updateList)
  }

  handleCancel = () => {
    this.props.cleanReqStatus && this.props.cleanReqStatus()
    window.history.back()
  }

  formatUpdateError = (m1, m2) => {
    if (m1 && m2) {
      return m1 + '; ' + m2
    } else if (m1) {
      return m1
    } else {
      return m2
    }
  }

  render () {
    const { mutateStatus, mutateErrorMsg, mutatePBErrorMsg, mutatePRErrorMsg, updateStatus, userAccess } = this.props
    const { updateRequested } = this.state
    if (checkCreatePermission(userAccess) !== 1) {
      return <Redirect to={`${config.contextPath}/all`} />
    }
    if ((mutateStatus && mutateStatus === 'DONE') && (!updateRequested || (updateStatus && updateStatus === 'DONE'))) {
      this.props.cleanReqStatus && this.props.cleanReqStatus()
      return <Redirect to={`${config.contextPath}/all`} />
    }
    return (
      <Page>
        <Query query={CREATE_POLICY_DISCOVERY}>
          {( result ) => {
            const { loading } = result
            const { data={} } = result
            const { discoveries } = data
            const errored = discoveries ? false : true
            const error = discoveries ? null : result.error
            if (!loading && error) {
              const errorName = result.error.graphQLErrors[0].name ? result.error.graphQLErrors[0].name : error.name
              error.name = errorName
            }
            const fetchControl = {
              isLoaded: !loading,
              isFailed: errored,
              error: error
            }
            const buildControl = {
              buildResourceLists: this.buildCreateUpdateLists.bind(this),
            }
            const createControl = {
              createResource: this.handleCreate.bind(this),
              cancelCreate: this.handleCancel.bind(this),
              creationStatus: mutateStatus,
              creationMsg: mutateErrorMsg,
            }
            const createAndUpdateControl = {
              createAndUpdateResource: this.handleCreateAndUpdate.bind(this),
              cancelCreateAndUpdate: this.handleCancel.bind(this),
              createAndUpdateStatus: updateStatus,
              createAndUpdateMsg: this.formatUpdateError(this.formatUpdateError(mutatePBErrorMsg, mutateErrorMsg), mutatePRErrorMsg),
            }
            return (
              <CreationView
                discovered={discoveries}
                fetchControl={fetchControl}
                createControl={createControl}
                buildControl={buildControl}
                createAndUpdateControl={createAndUpdateControl}
              />
            )
          }
          }
        </Query>
      </Page>
    )
  }
}

const mapStateToProps = (state) => {
  let updateState = 'IN_PROGRESS'
  if ((state['PlacementRulesList'].mutateStatus === 'ERROR') || (state['PlacementBindingsList'].mutateStatus === 'ERROR') || (state['PoliciesList'].mutateStatus === 'ERROR')) {
    updateState = 'ERROR'
  } else if ((state['PlacementRulesList'].mutateStatus === 'DONE') && (state['PlacementBindingsList'].mutateStatus === 'DONE')
    && (state['PoliciesList'].mutateStatus === 'DONE')) {
    updateState = 'DONE'
  }
  const userAccess = state.userAccess && state.userAccess.access
    ? state.userAccess.access
    : []
  return {
    mutateStatus: state['PoliciesList'].mutateStatus,
    mutateErrorMsg: state['PoliciesList'].mutateErrorMsg,
    mutatePRErrorMsg: state['PlacementRulesList'].mutateErrorMsg,
    mutatePBErrorMsg: state['PlacementBindingsList'].mutateErrorMsg,
    updateStatus: updateState,
    userAccess: userAccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, breadcrumbItems, links, information) => dispatch(updateSecondaryHeader(title, tabs, breadcrumbItems, links, '', information)),
    handleCreateResources: (type, json) => dispatch(createResources(type, json)),
    handleCreateAndUpdateResources: (types, create, update) => dispatch(createAndUpdateResources(types, create, update)),
    handleFetchResource: (type, json) => dispatch(fetchSingleResource(type, json)),
    cleanReqStatus: () => {
      dispatch(clearRequestStatus(RESOURCE_TYPES.POLICY))
      dispatch(clearRequestStatus(RESOURCE_TYPES.PLACEMENT_RULE))
      dispatch(clearRequestStatus(RESOURCE_TYPES.PLACEMENT_BINDING))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreationTab))
