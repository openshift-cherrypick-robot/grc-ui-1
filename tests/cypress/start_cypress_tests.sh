#!/bin/bash

###############################################################################
# Copyright (c) 2020 Red Hat, Inc.
###############################################################################
echo "Initiating tests..."

if [ -z "$BROWSER" ]; then
  echo "BROWSER not exported; setting to 'chrome' (options available: 'chrome', 'firefox')"
  export BROWSER="chrome"
fi

if [ ! -z "$OC_HUB_CLUSTER_URL" ] && [ ! -z "$OC_CLUSTER_USER" ] && [ ! -z "$OC_HUB_CLUSTER_PASS" ]; then
  echo -e "Using cypess config from Travis env variables.\n"
  export CYPRESS_OPTIONS_HUB_CLUSTER_URL=$OC_HUB_CLUSTER_URL
  export CYPRESS_OPTIONS_HUB_USER=$OC_CLUSTER_USER
  export CYPRESS_OPTIONS_HUB_PASSWORD=$OC_HUB_CLUSTER_PASS
elif [ ! -z "$OC_CLUSTER_URL" ] && [ ! -z "$OC_CLUSTER_USER" ] && [ ! -z "$OC_CLUSTER_PASS" ]; then
  echo -e "Using cypess config from Docker env variables.\n"
  export CYPRESS_OPTIONS_HUB_CLUSTER_URL=$OC_CLUSTER_URL
  export CYPRESS_OPTIONS_HUB_USER=$OC_CLUSTER_USER
  export CYPRESS_OPTIONS_HUB_PASSWORD=$OC_CLUSTER_PASS
else
  USER_OPTIONS_FILE=./cypressEnvConfig.yaml
  echo -e "System env variables don't exist, loading local config from '$USER_OPTIONS_FILE' file.\n"
  if [ -f $USER_OPTIONS_FILE ]; then
    echo "Using cypess config from '$USER_OPTIONS_FILE' file."
    export CYPRESS_OPTIONS_HUB_CLUSTER_URL=`yq r $USER_OPTIONS_FILE 'options.hub.hubClusterURL'`
    export CYPRESS_OPTIONS_HUB_USER=`yq r $USER_OPTIONS_FILE 'options.hub.user'`
    export CYPRESS_OPTIONS_HUB_PASSWORD=`yq r $USER_OPTIONS_FILE 'options.hub.password'`
    export CYPRESS_BASE_URL=`yq r $USER_OPTIONS_FILE 'options.hub.baseURL'`
  else
    echo "Can't find '$USER_OPTIONS_FILE' locally and set all cypess config to empty."
    export CYPRESS_OPTIONS_HUB_CLUSTER_URL=""
    export CYPRESS_OPTIONS_HUB_USER=""
    export CYPRESS_OPTIONS_HUB_PASSWORD=""
  fi
fi

export CYPRESS_RESOURCE_ID=$(date +"%s")
if [ -z "$MANAGED_CLUSTER_NAME" ]; then
  echo "MANAGED_CLUSTER_NAME not set."
else
  export CYPRESS_MANAGED_CLUSTER_NAME=$MANAGED_CLUSTER_NAME
  echo "MANAGED_CLUSTER_NAME is set, set CYPRESS_MANAGED_CLUSTER_NAME to $MANAGED_CLUSTER_NAME"
fi


if [ ! -z "$SELENIUM_CLUSTER" ]; then
  echo "SELENIUM_CLUSTER env parameter is found, run system e2e testing and use OC_HUB_CLUSTER_URL"
  export CYPRESS_BASE_URL=$SELENIUM_CLUSTER
else
  echo "pull request e2e testing and use travis env CYPRESS_BASE_URL or localhost"
  export CYPRESS_BASE_URL=${CYPRESS_BASE_URL:-"https://localhost:3000"}
fi

if [ "$CYPRESS_BASE_URL" = "https://localhost:3000" ]; then
  export CYPRESS_coverage=true
else
  export CYPRESS_coverage=false
fi

export CYPRESS_FAIL_FAST_PLUGIN=${CYPRESS_FAIL_FAST_PLUGIN:-"true"}
echo -e "Running cypess tests with the following environment:\n"
echo -e "\tCYPRESS_RESOURCE_ID (used as policy time stamp) : $CYPRESS_RESOURCE_ID"
echo -e "\tCYPRESS_BASE_URL (used as cypress entry point URL)  : $CYPRESS_BASE_URL"
echo -e "\tCYPRESS_OPTIONS_HUB_CLUSTER_URL   : $CYPRESS_OPTIONS_HUB_CLUSTER_URL"
echo -e "\tCYPRESS_OPTIONS_HUB_USER       : $CYPRESS_OPTIONS_HUB_USER"
echo -e "\tCYPRESS_MANAGED_CLUSTER_NAME       : $CYPRESS_MANAGED_CLUSTER_NAME"
echo -e "\tCYPRESS_FAIL_FAST_PLUGIN       : $CYPRESS_FAIL_FAST_PLUGIN"
echo -e "\tCYPRESS_coverage       : $CYPRESS_coverage"

echo -e "\nLogging into Kube API server\n"
oc login --server=${CYPRESS_OPTIONS_HUB_CLUSTER_URL} -u $CYPRESS_OPTIONS_HUB_USER -p $CYPRESS_OPTIONS_HUB_PASSWORD --insecure-skip-tls-verify

# save a list of available clusters to .tests/cypress/config/clusters.yaml file so tests can use it
oc get managedclusters -o custom-columns='name:.metadata.name,available:.status.conditions[?(@.reason=="ManagedClusterAvailable")].status,vendor:.metadata.labels.vendor' --no-headers | awk '/True/ { printf "%s:\n  vendor: %s\n", $1, $3 }' > ./tests/cypress/config/clusters.yaml
echo "Available clusters stored in ./tests/cypress/config/clusters.yaml:"
cat ./tests/cypress/config/clusters.yaml

testCode=0

# We are caching the cypress binary for containerization, therefore it does not need npx. However, locally we need it.
HEADLESS="--headless"
if [[ "$LIVE_MODE" == true ]]; then
  HEADLESS=""
  echo "Running cypess under browser headful model."
else
  echo "Running cypess under browser headless model."
fi

if [ "$NODE_ENV" == "dev" ]; then
  npx cypress run --browser $BROWSER $HEADLESS --spec "./tests/cypress/tests/*.spec.js" --reporter cypress-multi-reporters  
elif [ "$NODE_ENV" == "debug" ]; then
  npx cypress open --browser $BROWSER --config numTestsKeptInMemory=0
else 
  cypress run --browser $BROWSER $HEADLESS --spec "./tests/cypress/tests/*.spec.js" --reporter cypress-multi-reporters
fi
