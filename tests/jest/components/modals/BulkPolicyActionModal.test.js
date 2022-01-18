/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { BulkPolicyActionModal } from '../../../../src-web/components/modals/BulkPolicyActionModal'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AcmAlert } from '@stolostron/ui-components'
import { REQUEST_STATUS } from '../../../../src-web/actions/index'

describe('PolicyActionModal component', () => {
    it('Modal successfully renders and performs inform bulk action', () => {
        const onHandleClose = jest.fn()
        const onHandleSubmit = jest.fn()
		const wrapper = mount(
			<BulkPolicyActionModal
                actionType={'inform'}
                data={[
                    {
                        name: {
                            rawData: 'test-external-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            rawData: {
                                gitPath: 'stable',
                                gitBranch: 'main',
                                type: 'GitHub',
                                pathname: 'https://github.com/stolostron/policy-collection.git'
                            },
                            text: 'Git',
                        },
                        status: {
                            rawData: false,
                            text: 'Enabled',
                            title: 'Enabled',
                        },
                        uid: '1',
                    },
                    {
                        name: {
                            rawData: 'test-local-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            text: 'local',
                        },
                        status: {
                            rawData: false,
                            text: 'Disabled',
                            title: 'Disabled',
                        },
                        uid: '2',
                    },
                ]}
                handleClose={onHandleClose}
                handleSubmit={onHandleSubmit}
                label={{
                    primaryBtn: 'modal.actions.bulk.inform.primaryBtn',
                    label: 'label',
                    heading: 'modal.actions.bulk.inform.heading'
                }}
                open={true}
                type={'bulk-policy-action-inform'}
			/>
		)
        wrapper.find('.pf-m-primary').simulate('click')
        expect(onHandleSubmit).toHaveBeenCalled()
    })
    it('Modal successfully renders and performs enforce bulk action', () => {
        const onHandleClose = jest.fn()
        const onHandleSubmit = jest.fn()
		const wrapper = mount(
			<BulkPolicyActionModal
                actionType={'enforce'}
                data={[
                    {
                        name: {
                            rawData: 'test-external-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            rawData: {
                                gitPath: 'stable',
                                gitBranch: 'main',
                                type: 'GitHub',
                                pathname: 'https://github.com/stolostron/policy-collection.git'
                            },
                            text: 'Git',
                        },
                        status: {
                            rawData: false,
                            text: 'Enabled',
                            title: 'Enabled',
                        },
                        uid: '1',
                    },
                    {
                        name: {
                            rawData: 'test-local-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            text: 'local',
                        },
                        status: {
                            rawData: false,
                            text: 'Disabled',
                            title: 'Disabled',
                        },
                        uid: '2',
                    },
                ]}
                handleClose={onHandleClose}
                handleSubmit={onHandleSubmit}
                label={{
                    primaryBtn: 'modal.actions.bulk.enforce.primaryBtn',
                    label: 'label',
                    heading: 'modal.actions.bulk.enforce.heading'
                }}
                open={true}
                type={'bulk-policy-action-enforce'}
			/>
		)
        wrapper.find('.pf-m-primary').simulate('click')
        expect(onHandleSubmit).toHaveBeenCalled()
    })
    it('Modal successfully renders and performs enable bulk action', () => {
        const onHandleClose = jest.fn()
        const onHandleSubmit = jest.fn()
		const wrapper = mount(
			<BulkPolicyActionModal
                actionType={'enable'}
                data={[
                    {
                        name: {
                            rawData: 'test-external-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            rawData: {
                                gitPath: 'stable',
                                gitBranch: 'main',
                                type: 'GitHub',
                                pathname: 'https://github.com/stolostron/policy-collection.git'
                            },
                            text: 'Git',
                        },
                        status: {
                            rawData: false,
                            text: 'Enabled',
                            title: 'Enabled',
                        },
                        uid: '1',
                    },
                    {
                        name: {
                            rawData: 'test-local-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            text: 'local',
                        },
                        status: {
                            rawData: false,
                            text: 'Disabled',
                            title: 'Disabled',
                        },
                        uid: '2',
                    },
                ]}
                handleClose={onHandleClose}
                handleSubmit={onHandleSubmit}
                label={{
                    primaryBtn: 'modal.actions.bulk.enable.primaryBtn',
                    label: 'label',
                    heading: 'modal.actions.bulk.enable.heading'
                }}
                open={true}
                type={'bulk-policy-action-enable'}
			/>
		)
        wrapper.find('.pf-m-primary').simulate('click')
        expect(onHandleSubmit).toHaveBeenCalled()
    })
    it('Modal successfully renders and performs disable bulk action', () => {
        const onHandleClose = jest.fn()
        const onHandleSubmit = jest.fn()
		const wrapper = mount(
			<BulkPolicyActionModal
                actionType={'disable'}
                data={[
                    {
                        name: {
                            rawData: 'test-external-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            rawData: {
                                gitPath: 'stable',
                                gitBranch: 'main',
                                type: 'GitHub',
                                pathname: 'https://github.com/stolostron/policy-collection.git'
                            },
                            text: 'Git',
                        },
                        status: {
                            rawData: false,
                            text: 'Enabled',
                            title: 'Enabled',
                        },
                        uid: '1',
                    },
                    {
                        name: {
                            rawData: 'test-local-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            text: 'local',
                        },
                        status: {
                            rawData: false,
                            text: 'Disabled',
                            title: 'Disabled',
                        },
                        uid: '2',
                    },
                ]}
                handleClose={onHandleClose}
                handleSubmit={onHandleSubmit}
                label={{
                    primaryBtn: 'modal.actions.bulk.disable.primaryBtn',
                    label: 'label',
                    heading: 'modal.actions.bulk.disable.heading'
                }}
                open={true}
                type={'bulk-policy-action-disable'}
			/>
		)
        wrapper.find('.pf-m-primary').simulate('click')
        expect(onHandleSubmit).toHaveBeenCalled()
    })
	it('Modal returns notification on error', () => {
        const component = shallow(
            <BulkPolicyActionModal
                actionType={'inform'}
                data={[
                    {
                        name: {
                            rawData: 'test-external-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'inform',
                            title: 'Inform',
                        },
                        source: {
                            rawData: {
                                gitPath: 'stable',
                                gitBranch: 'main',
                                type: 'GitHub',
                                pathname: 'https://github.com/stolostron/policy-collection.git'
                            },
                            text: 'Git',
                        },
                        status: {
                            rawData: false,
                            text: 'Enabled',
                            title: 'Enabled',
                        },
                    },
                    {
                        name: {
                            rawData: 'test-local-policy',
                        },
                        namespace: 'policies',
                        remediation: {
                            rawData: 'enforce',
                            title: 'Enforce',
                        },
                        source: {
                            text: 'local',
                        },
                        status: {
                            rawData: false,
                            text: 'Disabled',
                            title: 'Disabled',
                        },
                    },
                ]}
                handleClose={jest.fn()}
                handleSubmit={jest.fn()}
                label={{
                    primaryBtn: 'modal.actions.bulk.inform.primaryBtn',
                    label: 'label',
                    heading: 'modal.actions.bulk.inform.heading'
                }}
                open={true}
                type={'bulk-policy-action-inform'}

                locale={'en'}
                reqStatus={REQUEST_STATUS.ERROR}
                reqErrorMsg='There was an error.'
            />
        )
        expect(component.find(AcmAlert)).toHaveLength(2)
        expect(toJson(component)).toMatchSnapshot()
    })
})
