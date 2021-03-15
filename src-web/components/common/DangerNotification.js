/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


import React from 'react'
import { NotificationDrawer, NotificationDrawerBody,
  NotificationDrawerList, NotificationDrawerListItem,
  NotificationDrawerListItemHeader } from '@patternfly/react-core'

export const DangerNotification = (error) => {
  const errMsg =  error.message ? error.message : error.error.message
  return <NotificationDrawer>
    <NotificationDrawerBody>
      <NotificationDrawerList>
        <NotificationDrawerListItem variant="danger">
          <NotificationDrawerListItemHeader
            variant="danger"
            title={errMsg}
            srTitle="Danger notification:"
          />
        </NotificationDrawerListItem>
      </NotificationDrawerList>
    </NotificationDrawerBody>
  </NotificationDrawer>
}
