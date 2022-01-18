/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import {
  AcmModal, AcmButton
} from '@stolostron/ui-components'
import { ButtonVariant } from '@patternfly/react-core'
import msgs from '../../../nls/platform.properties'

import '../../../scss/ansible-modal.scss'

export const renderAnsibleRemovalModal = ({
  openDelModal, policyAutoName, locale,
  handleDeleteClick, handleCloseDelModal
}) => <AcmModal
  titleIconVariant={'warning'}
  variant='medium'
  id='remove-ansible-modal'
  isOpen={openDelModal}
  showClose={true}
  onClose={handleCloseDelModal}
  title={msgs.get('modal.delete.automation.heading', locale)}
  actions={[
    <AcmButton key="confirm" variant={ButtonVariant.danger} onClick={handleDeleteClick}>
    {msgs.get('modal.button.delete.automation', locale)}
    </AcmButton>,
    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={handleCloseDelModal}>
    {msgs.get('modal.button.cancel', locale)}
    </AcmButton>
  ]}
>
  {msgs.get(
    'modal.delete.automation.description',
    [policyAutoName || msgs.get('modal.delete.automation.name.backup', locale)],
    locale
  )}
</AcmModal>
