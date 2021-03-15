###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2017, 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################
# Copyright Contributors to the Open Cluster Management project


include build/Configfile

USE_VENDORIZED_BUILD_HARNESS ?=

ifndef USE_VENDORIZED_BUILD_HARNESS
-include $(shell curl -s -H 'Authorization: token ${GITHUB_TOKEN}' -H 'Accept: application/vnd.github.v4.raw' -L https://api.github.com/repos/open-cluster-management/build-harness-extensions/contents/templates/Makefile.build-harness-bootstrap -o .build-harness-bootstrap; echo .build-harness-bootstrap)
else
-include vbh/.build-harness-bootstrap
endif

default::
	@echo "Build Harness Bootstrapped"

install:
	npm install

copyright-check:
	./build/copyright-check.sh $(TRAVIS_BRANCH)

lint:
	npm run lint

prune:
	npm prune --production

build-prod:
	npm run build:production

unit-test:
	if [ ! -d "test-output/unit" ]; then \
		mkdir -p test-output/unit; \
	fi
	npm test

travis-slack-reporter:
	node ./tests/utils/slack-reporter.js

build-test-image:
	make component/build

push-test-image:
	make component/push

publish-test-image:
	rm -rf pipeline
	make pipeline-manifest/update COMPONENT_NAME=$(COMPONENT_NAME)-tests PIPELINE_MANIFEST_COMPONENT_SHA256=${TRAVIS_COMMIT} PIPELINE_MANIFEST_COMPONENT_REPO=${TRAVIS_REPO_SLUG} PIPELINE_MANIFEST_BRANCH=${TRAVIS_BRANCH}
