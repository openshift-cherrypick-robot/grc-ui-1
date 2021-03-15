#!/bin/bash
# Copyright (c) 2020 Red Hat, Inc.
# Copyright Contributors to the Open Cluster Management project

set -e



OCM_NAMESPACE=open-cluster-management
OCM_ROUTE=multicloud-console
OCM_ADDRESS=https://`oc -n $OCM_NAMESPACE get route $OCM_ROUTE -o json | jq -r '.spec.host'`

OAUTH2_CLIENT_ID=multicloudingress
OAUTH2_CLIENT_SECRET=multicloudingresssecret
GRC_REDIRECT_URL=https://localhost:3000/multicloud/policies/auth/callback
HEADER_REDIRECT_URL=https://localhost:3000/multicloud/header/auth/callback
TOPOLOGY_REDIRECT_URL=https://localhost:3000/multicloud/topology/auth/callback

# Patch ingress with redirect URL
REDIRECT_URIS=$(oc get OAuthClient $OAUTH2_CLIENT_ID -o json | jq -c "[.redirectURIs[], \"$GRC_REDIRECT_URL\", \"$HEADER_REDIRECT_URL\", \"$TOPOLOGY_REDIRECT_URL\"] | unique")
echo "Patch cluster to set up REDIRECT_URIS: $REDIRECT_URIS"
oc patch OAuthClient multicloudingress --type json -p "[{\"op\": \"add\", \"path\": \"/redirectURIs\", \"value\": ${REDIRECT_URIS}}]"
