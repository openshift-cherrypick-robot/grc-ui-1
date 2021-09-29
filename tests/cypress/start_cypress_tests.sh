#!/bin/bash

###############################################################################
# Copyright (c) 2020 Red Hat, Inc.
# Copyright Contributors to the Open Cluster Management project
###############################################################################
echo "Initiating tests..."
path_to_tests=./tests/cypress/tests/*.spec.js
if [[ "$1" == "--spec" ]] && [ ! -z "$2" ]; then
  path_to_tests="$2"
fi
if [ -z "$BROWSER" ]; then
  echo "BROWSER not exported; setting to 'chrome' (options available: 'chrome', 'firefox')"
  export BROWSER="chrome"
fi

if [ ! -z "$OC_HUB_CLUSTER_URL" ] && [ ! -z "$OC_CLUSTER_USER" ] && [ ! -z "$OC_HUB_CLUSTER_PASS" ]; then
  echo -e "Using cypress config from Travis env variables.\n"
  export CYPRESS_OPTIONS_HUB_CLUSTER_URL="$OC_HUB_CLUSTER_URL"
  export CYPRESS_OPTIONS_HUB_USER="$OC_CLUSTER_USER"
  export CYPRESS_OPTIONS_HUB_PASSWORD="$OC_HUB_CLUSTER_PASS"
elif [ ! -z "$OC_CLUSTER_URL" ] && [ ! -z "$OC_CLUSTER_USER" ] && [ ! -z "$OC_CLUSTER_PASS" ]; then
  echo -e "Using cypress config from Docker env variables.\n"
  export CYPRESS_OPTIONS_HUB_CLUSTER_URL="$OC_CLUSTER_URL"
  export CYPRESS_OPTIONS_HUB_USER="$OC_CLUSTER_USER"
  export CYPRESS_OPTIONS_HUB_PASSWORD="$OC_CLUSTER_PASS"
elif [ ! -z "$OC_CLUSTER_URL" ] && [ ! -z "$OC_CLUSTER_TOKEN" ]; then
  echo -e "Using cypress config from Docker env variable.\n"
  export CYPRESS_OPTIONS_HUB_CLUSTER_URL="$OC_CLUSTER_URL"
  export CYPRESS_OPTIONS_HUB_TOKEN="$OC_CLUSTER_TOKEN"
else
  USER_OPTIONS_FILE=./cypressEnvConfig.yaml
  echo -e "System env variables don't exist, loading local config from '$USER_OPTIONS_FILE' file.\n"
  if [ -f "$USER_OPTIONS_FILE" ]; then
    echo "Using cypress config from '$USER_OPTIONS_FILE' file."
    export CYPRESS_OPTIONS_HUB_CLUSTER_URL=`yq e '.options.hub.hubClusterURL' $USER_OPTIONS_FILE`
    export CYPRESS_OPTIONS_HUB_USER=`yq e '.options.hub.user' $USER_OPTIONS_FILE`
    export CYPRESS_OPTIONS_HUB_PASSWORD=`yq e '.options.hub.password' $USER_OPTIONS_FILE`
    export CYPRESS_BASE_URL=`yq e '.options.hub.baseURL' $USER_OPTIONS_FILE`
  else
    echo "Can't find '$USER_OPTIONS_FILE' locally and set all cypress config to empty."
    export CYPRESS_OPTIONS_HUB_CLUSTER_URL=""
    export CYPRESS_OPTIONS_HUB_USER=""
    export CYPRESS_OPTIONS_HUB_PASSWORD=""
  fi
fi

if [ -z "$MANAGED_CLUSTER_NAME" ]; then
  echo "MANAGED_CLUSTER_NAME not set."
else
  export CYPRESS_MANAGED_CLUSTER_NAME="$MANAGED_CLUSTER_NAME"
  echo "MANAGED_CLUSTER_NAME is set, set CYPRESS_MANAGED_CLUSTER_NAME to $MANAGED_CLUSTER_NAME"
  export CLUSTER_LABEL_SELECTOR="-l name=$MANAGED_CLUSTER_NAME"
fi

echo -e "\nLogging into Kube API server...\n"
ATTEMPTS=0
MAX_ATTEMPTS=10
INTERVAL=20
FAILED="true"
while [[ "${FAILED}" == "true" ]] && (( ATTEMPTS != MAX_ATTEMPTS )); do
  if [ -z "$CYPRESS_OPTIONS_HUB_TOKEN" ]; then
    oc login --server="$CYPRESS_OPTIONS_HUB_CLUSTER_URL" -u "$CYPRESS_OPTIONS_HUB_USER" -p "$CYPRESS_OPTIONS_HUB_PASSWORD" --insecure-skip-tls-verify
  else
    oc login --server="$CYPRESS_OPTIONS_HUB_CLUSTER_URL" --token="$CYPRESS_OPTIONS_HUB_TOKEN" --insecure-skip-tls-verify
  fi
  if [[ "$?" != "0" ]]; then
    echo "* Error logging in to cluster. Trying again in ${INTERVAL}s (Retry $((++ATTEMPTS))/${MAX_ATTEMPTS})"
  else
    FAILED="false"
  fi
  sleep ${INTERVAL}
done
if [[ "${FAILED}" == "true" ]]; then
  echo -e "\nERROR: Failed to log in to cluster. The following commands will likely fail.\n"
fi

if [[ "${CYPRESS_OPTIONS_HUB_CLUSTER_URL}" =~ "openshiftapps.com" ]]; then
  echo "ROSA cluster detected - excluding @rbac tests"
  if [[ -z "$CYPRESS_TAGS_EXCLUDE" ]]; then
    export CYPRESS_TAGS_EXCLUDE="@rbac"
  else
    export CYPRESS_TAGS_EXCLUDE="@rbac|$CYPRESS_TAGS_EXCLUDE"
  fi
fi

# We're assuming here both that 'kubeadmin' is still enabled and that the IDP is configured properly
echo -e "\nDetermining whether any IDPs are configured..."
IDP=$(oc get oauth -o jsonpath={.items[*].spec.identityProviders})
if [[ -n "${IDP}" ]] && [[ "${IDP}" != "[]" ]]; then
  export CYPRESS_OC_IDP_CONFIGURED="true"
fi

echo -e "\nFetching ACM namespace and console URL...\n"
acm_installed_namespace=`oc get subscriptions.operators.coreos.com --all-namespaces | grep advanced-cluster-management | awk '{print $1}'`
RHACM_CONSOLE_URL=https://`oc get route multicloud-console -n $acm_installed_namespace -o=jsonpath='{.spec.host}'`

export CYPRESS_BASE_URL="${CYPRESS_BASE_URL:-$RHACM_CONSOLE_URL}"
export CYPRESS_coverage="${CYPRESS_coverage:-"false"}"
export CYPRESS_RESOURCE_ID="${CYPRESS_RESOURCE_ID:-"$(date +"%s")"}"
export CYPRESS_RBAC_PASS="$RBAC_PASS"
export CYPRESS_FAIL_FAST_PLUGIN="${CYPRESS_FAIL_FAST_PLUGIN:-"true"}"
export CYPRESS_OC_IDP="$OC_IDP"
echo -e "Running Cypress tests with the following environment:\n"
echo -e "\tCYPRESS_RESOURCE_ID (used for policy identifier) : $CYPRESS_RESOURCE_ID"
echo -e "\tCYPRESS_BASE_URL (used as cypress entry point URL) : $CYPRESS_BASE_URL"
echo -e "\tCYPRESS_OPTIONS_HUB_CLUSTER_URL : $CYPRESS_OPTIONS_HUB_CLUSTER_URL"
echo -e "\tCYPRESS_OPTIONS_HUB_USER        : $CYPRESS_OPTIONS_HUB_USER"
echo -e "\tCYPRESS_OC_IDP                  : $CYPRESS_OC_IDP"
echo -e "\tCYPRESS_OC_IDP_CONFIGURED       : $CYPRESS_OC_IDP_CONFIGURED"
echo -e "\tCYPRESS_MANAGED_CLUSTER_NAME    : $CYPRESS_MANAGED_CLUSTER_NAME"
echo -e "\tCYPRESS_FAIL_FAST_PLUGIN        : $CYPRESS_FAIL_FAST_PLUGIN"
echo -e "\tCYPRESS_STANDALONE_TESTSUITE_EXECUTION: $CYPRESS_STANDALONE_TESTSUITE_EXECUTION"
echo -e "\tCYPRESS_coverage                : $CYPRESS_coverage"
echo -e "\tCYPRESS_TAGS_INCLUDE            : $CYPRESS_TAGS_INCLUDE"
echo -e "\tCYPRESS_TAGS_EXCLUDE            : $CYPRESS_TAGS_EXCLUDE"
echo -e "\tCLUSTER_LABEL_SELECTOR          : $CLUSTER_LABEL_SELECTOR"
[ -n "$CYPRESS_RBAC_PASS" ] && echo -e "RBAC_PASS set" || echo -e "Warning: RBAC_PASS is not set"

# save a list of available clusters to .tests/cypress/config/clusters.yaml file so tests can use it
oc get managedclusters $CLUSTER_LABEL_SELECTOR -o custom-columns='name:.metadata.name,available:.status.conditions[?(@.reason=="ManagedClusterAvailable")].status,vendor:.metadata.labels.vendor' --no-headers | awk '/True/ { printf "%s:\n  vendor: %s\n", $1, $3 }' > ./tests/cypress/config/clusters.yaml
echo "Available clusters stored in ./tests/cypress/config/clusters.yaml:"
cat ./tests/cypress/config/clusters.yaml

testCode=0

# We are caching the cypress binary for containerization, therefore it does not need npx. However, locally we need it.
HEADLESS="--headless"
if [[ "$LIVE_MODE" == true ]]; then
  HEADLESS=""
  echo "Running cypress under browser headful model."
else
  echo "Running cypress under browser headless model."
fi

if [ "$NODE_ENV" == "dev" ]; then
  npx cypress run --browser "$BROWSER" "$HEADLESS" --spec "$path_to_tests" --reporter cypress-multi-reporters
elif [ "$NODE_ENV" == "debug" ]; then
  npx cypress open --browser "$BROWSER" --config numTestsKeptInMemory=0
else
  cypress run --browser "$BROWSER" "$HEADLESS" --spec "$path_to_tests" --reporter cypress-multi-reporters
fi
