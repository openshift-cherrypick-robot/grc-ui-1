#!/bin/bash
# Licensed Materials - Property of IBM
# (c) Copyright IBM Corporation 2020. All Rights Reserved.
# Note to U.S. Government Users Restricted Rights:
# Use, duplication or disclosure restricted by GSA ADP Schedule
# Contract with IBM Corp.
# Copyright (c) 2020 Red Hat, Inc.
# Copyright Contributors to the Open Cluster Management project

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "===== E2E Cluster Setup ====="

# Specify kubeconfig files (the default values are the ones generated in Prow)
HUB_NAME=${HUB_NAME:-"hub-1"}
MANAGED_NAME=${MANAGED_NAME:-"managed-1"}
HUB_KUBE=${HUB_KUBE:-"${SHARED_DIR}/${HUB_NAME}.kc"}
MANAGED_KUBE=${MANAGED_KUBE:-"${SHARED_DIR}/${MANAGED_NAME}.kc"}

echo "* Clean up managed"
if (ls "${MANAGED_KUBE}" &>/dev/null); then
  export KUBECONFIG=${MANAGED_KUBE}
  export MANAGED_CLUSTER_NAME=${MANAGED_CLUSTER_NAME:-${MANAGED_NAME}}
else
  echo "* Managed cluster not found. Continuing using Hub as managed."
  export KUBECONFIG=${HUB_KUBE}
  export MANAGED_CLUSTER_NAME="local-cluster"
fi

$DIR/install-cert-manager.sh
$DIR/cluster-clean-up.sh managed

echo "* Clean up hub"
export KUBECONFIG=${HUB_KUBE}

$DIR/cluster-clean-up.sh hub

echo "* Create RBAC users"
# rbac-setup.sh also sets OC_CLUSTER_PASS and OC_CLUSTER_USER
export RBAC_PASS=$(head /dev/urandom | tr -dc 'A-Za-z0-9' | head -c $((32 + RANDOM % 8)))
source $DIR/rbac-setup.sh

echo "* Set up cluster for test"
$DIR/cluster-setup.sh

echo "===== E2E Environment Setup ====="

# Set cluster URL and password (the default values are the ones generated in Prow)
HUB_NAME=${HUB_NAME:-"hub-1"}
export OC_CLUSTER_URL=${OC_CLUSTER_URL:-"$(jq -r '.api_url' ${SHARED_DIR}/${HUB_NAME}.json)"}

acm_installed_namespace=`oc get subscriptions.operators.coreos.com --all-namespaces | grep advanced-cluster-management | awk '{print $1}'`

VERSION_TAG=${VERSION_TAG:-"latest"}
DOCKER_URI=quay.io/open-cluster-management/grc-ui-api:${VERSION_TAG}
if [[ "${RUN_LOCAL}" == "true" ]]; then
  docker pull ${DOCKER_URI}
  docker run -d -t -i -p 4000:4000 --name grcuiapi -e NODE_ENV=development -e SERVICEACCT_TOKEN=$SERVICEACCT_TOKEN -e API_SERVER_URL=$API_SERVER_URL $DOCKER_URI
else
  echo "* Patching GRC UI API with grcuiapi:${VERSION_TAG}"
  GRCUIAPI_LABEL="component=ocm-grcuiapi"
  GRCUIAPI=$(oc get deployment -l ${GRCUIAPI_LABEL} -n ${acm_installed_namespace} -o=jsonpath='{.items[*].metadata.name}')
  oc patch deployment ${GRCUIAPI} -n ${acm_installed_namespace} -p "{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"grc-ui-api\",\"image\":\"${DOCKER_URI}\"}]}}}}"
  oc delete pod -l ${GRCUIAPI_LABEL} -n ${acm_installed_namespace}
  i=0
  while (oc get pod -l ${GRCUIAPI_LABEL} -n ${acm_installed_namespace} -o json | jq -r '.items[].status.phase' | grep -v "Running"); do
    sleep 10
    echo "* Waiting for the API to be running"
    # Try for up to 5 minutes
    i=$[i + 1]
    if [[ "$i" == '30' ]]; then
      echo "* ERROR: Timeout waiting for the API"
      exit 1
    fi
  done
fi

echo "* Export envs to run E2E"
# Setting coverage to "false" until Sonar is restored for E2E
export CYPRESS_coverage=${CYPRESS_coverage:-"false"}
export CYPRESS_TAGS_EXCLUDE=${CYPRESS_TAGS_EXCLUDE:-"@extended"}
if [[ "${FAIL_FAST}" != "false" ]]; then
  export  CYPRESS_FAIL_FAST_PLUGIN="true"
fi
export NO_COLOR=${NO_COLOR:-"1"}

if [[ "${RUN_LOCAL}" == "true" ]]; then
  echo "* Building and running grcui"
  export CYPRESS_BASE_URL="https://localhost:3000"
  npm run build
  npm run start:instrument &>/dev/null &
  sleep 10
fi

echo "===== E2E Test ====="
echo "* Launching Cypress E2E test"
# Use a clean kubeconfig for login
touch ${DIR}/tmpkube
export KUBECONFIG=${DIR}/tmpkube
# Run E2E tests
npm run test:cypress-headless
# Clean up the kubeconfig
unset KUBECONFIG
rm ${DIR}/tmpkube

# kill the node process to let nyc generate coverage report
# NODE_PROCESS=$(ps -ef | grep 'node app.js' | grep -v grep)
# echo "* Killing NodeJS process:"
# echo "${NODE_PROCESS}"
# echo ${NODE_PROCESS} | awk '{print $2}' | xargs kill
# sleep 10

# sed -i 's|SF:|SF:'"$(pwd)"/'|g' test-output/server/coverage/lcov.info
# sed -i 's|SF:|SF:'"$(pwd)"/'|g' test-output/cypress/coverage/lcov.info
