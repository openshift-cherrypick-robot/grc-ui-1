/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'
import { RESOURCE_TYPES } from '../utils/constants'
import { createResources, createAndUpdateResources,
  clearRequestStatus, fetchSingleResource } from '../actions/common'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { CREATE_POLICY_DISCOVERY, EDIT_POLICY_DISCOVERY } from '../utils/client/queries'
import CreationView from '../components/modules/CreationView'
import msgs from '../nls/platform.properties'
import config from '../../server/lib/shared/config'
import { checkCreatePermission, checkEditPermission } from '../utils/CheckUserPermission'
import { LocaleContext } from '../components/common/LocaleContext'
import { AcmButton, AcmPageContent, AcmPageHeader } from '@stolostron/ui-components'

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
    match: PropTypes.object,
    mutateErrorMsg: PropTypes.string,
    mutatePBErrorMsg: PropTypes.string,
    mutatePRErrorMsg: PropTypes.string,
    mutateStatus: PropTypes.string,
    updateStatus: PropTypes.string,
    userAccess: PropTypes.array
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
    if (m1 && m1.message && typeof m1.message === 'string') {
      m1 = m1.message
    }
    if (m2 && m2.message && typeof m2.message === 'string') {
      m2 = m2.message
    }
    if (m1 && m2 && m1 !== m2) {
      return m1 + '; ' + m2
    } else if (m1) {
      return m1
    } else {
      return m2
    }
  }

  render () {
    const { mutateStatus, mutateErrorMsg, mutatePBErrorMsg, mutatePRErrorMsg, updateStatus, userAccess,
      match : {
        params: {
          name,
          namespace,
        }
      }
    } = this.props
    const isEdit = namespace !== undefined && name !== undefined
    const { updateRequested } = this.state
    const { locale } = this.context
    const hasPermission = isEdit ? checkEditPermission(userAccess) === 0 : checkCreatePermission(userAccess) === 0
    if (userAccess && userAccess.length > 0 && hasPermission) {
      return <Redirect to={`${config.contextPath}/all`} />
    }
    if ((mutateStatus && mutateStatus === 'DONE') && (!updateRequested || (updateStatus && updateStatus === 'DONE'))) {
      this.props.cleanReqStatus && this.props.cleanReqStatus()
      return <Redirect to={`${config.contextPath}/all`} />
    }
    const query = isEdit ? EDIT_POLICY_DISCOVERY : CREATE_POLICY_DISCOVERY
    return (
      <Query query={query} variables={{ name, namespace }}>
        {( result ) => {
          const { loading } = result
          const { data={} } = result
          const { discoveries, policyDiscoveries } = data
          const errored = discoveries ? false : true
          const error = discoveries ? null : result.error
          if (!loading && error) {
            if (error.graphQLErrors.length > 0) {
              error.name = error.graphQLErrors[0].name
            }
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
            <React.Fragment>
              <AcmPageHeader title={isEdit?msgs.get('button.edit.policy', locale):msgs.get('button.create.policy', locale)}
                titleTooltip={msgs.get('policy.create.tooltip', locale)}
                controls={
                  <React.Fragment>
                    <div className='page-header-button-group'>
                      <AcmButton id='cancel' variant='secondary'
                        onClick={() => this.handleCancel()}>
                        {msgs.get('button.cancel', locale)}
                      </AcmButton>
                      <AcmButton id={isEdit?'edit':'create'}
                        tooltip={msgs.get('error.permission.disabled', locale)}
                        onClick={() => this.clickChild()}>
                        {isEdit?msgs.get('button.save', locale):msgs.get('button.create', locale)}
                      </AcmButton>
                    </div>
                  </React.Fragment>
                }>
              </AcmPageHeader>
              <AcmPageContent>
                <CreationView
                  onCreate={click => this.clickChild = click}
                  policyDiscovered={policyDiscoveries && policyDiscoveries[0]}
                  discovered={discoveries}
                  fetchControl={fetchControl}
                  createControl={createControl}
                  buildControl={buildControl}
                  createAndUpdateControl={createAndUpdateControl}
                />
              </AcmPageContent>
            </React.Fragment>
          )
        }}
      </Query>
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
