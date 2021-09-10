#!/usr/bin/env bash
# Copyright (c) 2021 Red Hat, Inc.
# Copyright Contributors to the Open Cluster Management project

######################
# configure env
######################

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

NODE_ENV=development
echo export NODE_ENV=$NODE_ENV > ${DIR}/.env

API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
echo export API_SERVER_URL=$API_SERVER_URL >> ${DIR}/.env

SERVICEACCT_TOKEN=$(oc whoami -t)
echo export SERVICEACCT_TOKEN=$SERVICEACCT_TOKEN >> ${DIR}/.env

OCM_ADDRESS=https://`oc -n open-cluster-management get route multicloud-console -o json | jq -r '.spec.host'`
grcUiApiUrl=$OCM_ADDRESS/multicloud/policies/graphql
echo export grcUiApiUrl=$grcUiApiUrl >> ${DIR}/.env

searchApiUrl=$OCM_ADDRESS/multicloud/policies/search/graphql
echo export searchApiUrl=$searchApiUrl >> ${DIR}/.env

OAUTH2_CLIENT_ID=multicloudingress
echo export OAUTH2_CLIENT_ID=$OAUTH2_CLIENT_ID >> ${DIR}/.env

OAUTH2_CLIENT_SECRET=multicloudingresssecret
echo export OAUTH2_CLIENT_SECRET=$OAUTH2_CLIENT_SECRET >> ${DIR}/.env

OAUTH2_REDIRECT_URL=https://localhost:3000/multicloud/policies/auth/callback
echo export OAUTH2_REDIRECT_URL=$OAUTH2_REDIRECT_URL >> ${DIR}/.env

REDIRECT_URIS=$(oc get OAuthClient $OAUTH2_CLIENT_ID -o json | jq -c "[.redirectURIs[], \"$OAUTH2_REDIRECT_URL\"] | unique")
oc patch OAuthClient multicloudingress --type json -p "[{\"op\": \"add\", \"path\": \"/redirectURIs\", \"value\": ${REDIRECT_URIS}}]"
