/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { Text, Select, SelectOption, SelectVariant } from '@patternfly/react-core'
import msgs from '../../../nls/platform.properties'
import TitleWithTooltip from '../../common/TitleWithTooltip'
import { renderAnsibleURL } from './AnsibleURL'
import _uniqueId from 'lodash/uniqueId'
import { AcmIcon, AcmIconVariant } from '@stolostron/ui-components'

import '../../../scss/ansible-modal.scss'

export const renderAnsibleCredentialsSelection = ({
  data, locale , credentialName, credentialIsOpen,
  setCredentialsSelectionValue, onCredentialsSelectionToggle,
  renderAnsibleJobTemplatesSelection, getAnsibleConnection
}) => {
  const ansCredentials = data.ansibleCredentials
  const ansCredentialFlag = Array.isArray(ansCredentials) && ansCredentials.length > 0
  return (
    <React.Fragment>
      {ansCredentialFlag &&
        <React.Fragment>
          {TitleWithTooltip({
            className: 'titleWithTooltip',
            headingLevel: 'h3',
            position: 'top',
            title: msgs.get('ansible.credential.selection.title', locale),
            tooltip: msgs.get('ansible.credential.selection.title', locale),
          })}
         <div className='infoArea createCredential'>
            <Select
              variant={SelectVariant.single}
              placeholderText={msgs.get('ansible.credential.selection.placeholder', locale)}
              aria-label={msgs.get('ansible.credential.selection.placeholder', locale)}
              onSelect={(event,selection) => setCredentialsSelectionValue(event, selection, ansCredentials)}
              onToggle={onCredentialsSelectionToggle}
              selections={credentialName}
              isOpen={credentialIsOpen}
            >
              {ansCredentials.map((credential) => (
                <SelectOption
                  key={_uniqueId(credential.name)}
                  value={credential.name ? credential.name : '-'}
                  isPlaceholder={credential.name ? credential.name : '-'}
                  description={`${credential.host ? credential.host : '-'}`}
                />
              ))}
            </Select>
          {renderAnsibleURL(
            'createCredentialLink',
            msgs.get('ansible.launch.createCredential', locale),
            '/multicloud/credentials',
            60,
            false,
            <AcmIcon icon={AcmIconVariant.openNewTab} />
          )}
          </div>
          {credentialName && renderAnsibleJobTemplatesSelection(
            getAnsibleConnection(ansCredentials)
          )}
        </React.Fragment>}
      {!ansCredentialFlag &&
        <div className='infoArea createCredential noExistingCredential'>
          <Text>
            {msgs.get('ansible.no.credential', locale)}
            {renderAnsibleURL(
              'createCredentialLink',
              msgs.get('ansible.launch.createCredential', locale),
              '/multicloud/credentials',
              60,
              false,
              <AcmIcon icon={AcmIconVariant.openNewTab} />
            )}
          </Text>
        </div>
      }
    </React.Fragment>
  )
}

