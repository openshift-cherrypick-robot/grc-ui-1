/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { AcmButton } from '@stolostron/ui-components'
import { ButtonVariant } from '@patternfly/react-core'
import { createDisableTooltip } from '../../common/DisableTooltip'
import msgs from '../../../nls/platform.properties'

export const buildModalButtonList = ({
    onlyEdit, activeItem, opInstalled, policyAutoName, locale,
    handleSubmitClick, handleCloseClick, handleOpenDelModal
}) => {
    const actions = []
    if (!activeItem) {
      actions.push(
        <AcmButton
          key="confirm"
          isDisabled={!opInstalled}
          variant={ButtonVariant.primary}
          onClick={handleSubmitClick}
        >
            {msgs.get('modal.button.save', locale)}
        </AcmButton>
      )
    }
    actions.push(
      <AcmButton
        key="cancel"
        variant={ButtonVariant.secondary}
        onClick={handleCloseClick}
      >
          {msgs.get('modal.button.cancel', locale)}
      </AcmButton>
    )
    if (!activeItem && policyAutoName) {
      const delButton = (
        <AcmButton
          key="delete"
          variant={ButtonVariant.danger}
          isDisabled={onlyEdit}
          onClick={onlyEdit? undefined : handleOpenDelModal}
          >
            {msgs.get('modal.button.delete', locale)}
          </AcmButton>)
      actions.push(createDisableTooltip(onlyEdit, 'delete', locale, delButton))
    }
    return actions
  }

