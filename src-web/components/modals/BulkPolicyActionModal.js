/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	AcmAlert,
	AcmButton,
	AcmModal,
	AcmTable,
} from '@open-cluster-management/ui-components'
import { Spinner, ButtonVariant } from '@patternfly/react-core'
import msgs from '../../nls/platform.properties'
import { withRouter } from 'react-router-dom'
import { REQUEST_STATUS } from '../../actions/index'
import {
	bulkPolicyActions,
	clearRequestStatus,
	receivePatchError,
	updateModal,
} from '../../actions/common'

const policyTableColumns = (modalType) => {
	switch (modalType) {
		case 'bulk-policy-action-inform':
		case 'bulk-policy-action-enforce':
			return [
				{
					header: 'Policy name',
					sort: 'name.rawData',
					cell: 'name.rawData',
					search: 'name.rawData',
				},
				{
					header: 'Source',
					sort: 'source.text',
					cell: 'source.text',
				},
				{
					header: 'Remediation',
					sort: 'remediation.title',
					cell: 'remediation.title',
				},
			]
		case 'bulk-policy-action-enable':
		case 'bulk-policy-action-disable':
			return [
				{
					header: 'Policy name',
					sort: 'name.rawData',
					cell: 'name.rawData',
					search: 'name.rawData',
				},
				{
					header: 'Source',
					sort: 'source.text',
					cell: 'source.text',
				},
				{
					header: 'Status',
					sort: 'status.text',
					cell: 'status.text',
				},
			]
		/* istanbul ignore next */
		default:
			break
	}
}

export class BulkPolicyActionModal extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmitClick = this.handleSubmitClick.bind(this)
		this.handleCloseClick = this.handleCloseClick.bind(this)
	}

	handleSubmitClick() {
		const {
			type: modalType,
			handleSubmit,
			data = [],
		} = this.props
		switch (modalType) {
			case 'bulk-policy-action-disable':
				handleSubmit(
					data,
					true,
					'/spec/disabled',
					modalType,
					bulkPolicyActions
				)
				break
			case 'bulk-policy-action-enable':
				handleSubmit(
					data,
					false,
					'/spec/disabled',
					modalType,
					bulkPolicyActions
				)
				break
			case 'bulk-policy-action-enforce':
				handleSubmit(
					data,
					'enforce',
					'/spec/remediationAction',
					modalType,
					bulkPolicyActions
				)
				break
			case 'bulk-policy-action-inform':
				handleSubmit(
					data,
					'inform',
					'/spec/remediationAction',
					modalType,
					bulkPolicyActions
				)
				break
			default:
				break
		}
	}

	handleCloseClick() {
		const { type: modalType, handleClose } = this.props
		handleClose(modalType)
	}

	render() {
		const {
			actionType,
			type: modalType,
			data,
			label,
			locale,
			open,
			reqErrorMsg,
			reqStatus,
		} = this.props
		return (
			<div>
				{reqStatus === REQUEST_STATUS.IN_PROGRESS && (
					<Spinner className="patternfly-spinner" />
				)}
				<AcmModal
					variant="medium"
					id={`bulk-${actionType}-policy-modal'`}
					isOpen={open}
					showClose={true}
					onClose={this.handleCloseClick}
					title={
						data.length > 1
							? msgs.get(label.heading, [data.length], locale)
							: msgs.get(
									`modal.${actionType}-hcmcompliance.heading`,
									locale
							)
					}
					actions={[
						<AcmButton
							key="confirm"
							variant={ButtonVariant.primary}
							onClick={this.handleSubmitClick}
						>
							{msgs.get(label.primaryBtn, locale)}
						</AcmButton>,
						<AcmButton
							key="cancel"
							variant={ButtonVariant.link}
							onClick={this.handleCloseClick}
						>
							{msgs.get('modal.button.cancel', locale)}
						</AcmButton>,
					]}
				>
					{reqStatus === REQUEST_STATUS.ERROR && (
						<AcmAlert
							isInline={true}
							noClose={true}
							variant="warning"
							title={
								reqErrorMsg ||
								msgs.get('error.default.description', locale)
							}
						/>
					)}
					<p style={{ marginBottom: '.5rem' }}>
						{msgs.get(
							`modal.actions.bulk.${actionType}.description`,
							locale
						)}
					</p>
					{data.some(
						(policy) => policy.source.text.toLowerCase() !== 'local'
					) && (
						<AcmAlert
							isInline={true}
							noClose={true}
							variant="default"
							title={msgs.get(
								'modal.actions.bulk.external.alert.title',
								[
									data.filter(
										(policy) =>
											policy.source.text.toLowerCase() !==
											'local'
									).length,
								],
								locale
							)}
							message={msgs.get(
								'modal.actions.bulk.external.alert.message',
								locale
							)}
						/>
					)}
					<AcmTable
						plural="policy actions"
						items={data}
						searchPlaceholder={msgs.get(
							'modal.actions.bulk.table.search.placeholder',
							locale
						)}
						columns={policyTableColumns(modalType)}
						keyFn={(item) => item.uid.toString()}
						gridBreakPoint=""
					/>
				</AcmModal>
			</div>
		)
	}
}

BulkPolicyActionModal.propTypes = {
	actionType: PropTypes.string,
	data: PropTypes.array,
	handleClose: PropTypes.func,
	handleSubmit: PropTypes.func,
	label: PropTypes.shape({
		heading: PropTypes.string,
		label: PropTypes.string,
		primaryBtn: PropTypes.string,
	}),
	locale: PropTypes.string,
	open: PropTypes.bool,
	reqErrorMsg: PropTypes.string,
	reqStatus: PropTypes.string,
	type: PropTypes.string,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
	return state.modal
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
	return {
		handleSubmit: (
			policies,
			newData,
			resourcePath,
			modalType,
			dispatchFn
		) => {
			dispatch(dispatchFn(policies, newData, resourcePath, modalType))
		},
		handleClose: (modalType) => {
			dispatch(clearRequestStatus())
			dispatch(updateModal({ open: false, type: modalType }))
		},
		receivePatchError: (resourceType, err) => {
			dispatch(receivePatchError(err, resourceType))
		},
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BulkPolicyActionModal)
)
