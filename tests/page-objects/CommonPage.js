/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

const parser = require('../utils/yamlHelper')
const config = require('../../config')
const allpolicy = require('./AllPolicyPage')

module.exports = {
  elements: {
    spinner: '.patternfly-spinner',
    table: '.pf-c-table',
    createPolicyButton: '#create-policy',
    cancelCreatePolicyButton: '#cancel-button-portal-id',
    submitCreatePolicyButton: '#create-button-portal-id',
    yamlMonacoEditor: '.monaco-editor',
    searchPatternFlyInput: '.pf-c-search-input__text-input',
    searchPatternFlyInputClear: '.pattern-fly-table-group .pf-c-search-input .pf-c-search-input__clear .pf-c-button',
    PatternFlyTabEmptyState: '.pattern-fly-table-group .pattern-fly-table .pf-c-empty-state__content',
    overflowButton: '.bx--overflow-menu:nth-of-type(1)',
    confirmDeleteButton: '.bx--btn--danger--primary',
    noResource: '.no-resource',
    policyStatus: '#complianceStatus-module-id',
    policyNameInput: '#name',
    namespaceDropdown: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box',
    namespaceDropdownBox: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__menu',
    templateDropdown: '.creation-view-controls-container > div > div:nth-child(3) > div.bx--multi-select.bx--list-box',
    templateDropdownBox: '.creation-view-controls-container > div > div:nth-child(3) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu',
    clusterSelectorDropdown: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box > div.bx--list-box__field',
    clusterSelectorDropdownBox: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu',
    enforce: '.creation-view-controls-checkbox > div.bx--form-item.bx--checkbox-wrapper',
    standardsDropdown: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box',
    standardsDropdownBox: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu',
    categoriesDropdown: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box',
    categoriesDropdownBox: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu',
    controlsDropdown: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box',
    controlsDropdownBox: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu',
    summaryCollapse: 'button#summary-toggle > span.pf-c-accordion__toggle-icon',
    summaryInfoContainer: 'div.module-grc-cards > dl > dd.grc-cards-container',
    summaryDropdown: 'div.module-grc-cards > dl > div.header-options > .pf-c-dropdown > button#grc-cards-toggle',
    summaryDropdownBox: 'div.module-grc-cards > dl > div.header-options > .pf-c-dropdown > ul',
    filterClear: '.resource-filter-bar > span.button',
  },
  commands: [{
    createPolicy,
    searchPolicy,
    deletePolicy,
    checkStatus,
    setPatternFlySearchValue,
    clearPatternFlySearchValue,
    log,
    enforcePolicy,
    informPolicy,
    testPolicyStatusTabSearching,
    tryEnable,
    tryDisable,
    clickButtonOnOverflowModal,
    noResourceCheck,
  }]
}

function noResourceCheck(path='', exists=false) {
  this.log(`Verifying: ${path}`)
  this.api.url(`${this.api.launchUrl}${config.get('contextPath')}${path}`)
  this.waitForElementNotPresent('@spinner')
  if (exists)
    this.expect.element('@noResource').to.not.be.present
  else
    this.expect.element('@noResource').to.be.visible
}

/*
* @name - the name of created testing data
* @nameTarget - DOM target postfix of created testing data on main page
* @overflowPosition - overflow icon position on main page
* @actionName - the name of clicked overflow action on overfrlow popup
* @actionPosition - the position of clicked action on overfrlow popup
* @modalName - DOM name of the modal which is opened from overfrlow popup
* @clickButtonName - DOM name of clicked button on the opened modal
*/
function clickButtonOnOverflowModal(name, nameTarget, overflowPosition, actionName, actionPosition, modalName, clickButtonName){
  this.log(`modal ${modalName} -- ${actionName} policy ${name} button ${clickButtonName}`)
  this.waitForElementVisible('.pf-c-table')
  this.expect.element(`.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(1) > ${nameTarget}`).text.to.equal(name)
  this.waitForElementVisible(`.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(${overflowPosition})`)
  this.click(`.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(${overflowPosition}) > div > button`)
  this.waitForElementVisible('.pf-c-dropdown__menu')
  this.waitForElementVisible(`.pf-c-dropdown__menu > li:nth-child(${actionPosition})`)
  this.expect.element(`.pf-c-dropdown__menu > li:nth-child(${actionPosition}) > button`).text.to.equal(actionName)
  this.click(`.pf-c-dropdown__menu > li:nth-child(${actionPosition}) > button`)
  this.waitForElementVisible(modalName)
  this.waitForElementVisible(`${modalName} > div > .bx--modal-footer > ${clickButtonName}`)
  this.click(`${modalName} > div > .bx--modal-footer > ${clickButtonName}`)
  this.waitForElementNotPresent(modalName)
}

function createPolicy(browser, name, yaml, time, filename) {
  this.log(`Creating policy:\n${yaml}`)
  this.waitForElementNotPresent('@spinner')
  this.waitForElementVisible('@createPolicyButton')
  this.click('@createPolicyButton')
  this.waitForElementNotPresent('@spinner')
  // test cancel button for create policy page first and return to main page
  this.waitForElementVisible('@cancelCreatePolicyButton')
  this.click('@cancelCreatePolicyButton')
  // re-entry create policy page from main page
  this.waitForElementNotPresent('@spinner')
  this.waitForElementVisible('@createPolicyButton')
  this.click('@createPolicyButton')
  this.waitForElementNotPresent('@spinner')
  // test create policy
  this.click('@namespaceDropdown')
  this.waitForElementVisible('.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__menu > div:nth-child(1)')
  this.click('.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__menu > div:nth-child(1)')
  this.waitForElementPresent('@yamlMonacoEditor')
  this.click('@yamlMonacoEditor')
  parser.enterTextInYamlEditor(this, browser, yaml, time)
  this.pause(1000)
  if (filename) {
    verifyStableYaml(this, filename, name)
  }
  this.waitForElementNotPresent('@spinner')
  this.waitForElementVisible('@submitCreatePolicyButton')
  this.click('@submitCreatePolicyButton')
  //verify placementrule + placementbinding
  this.expect.element('@table').to.be.present
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  this.click('tbody tr > *:first-child > a')
  this.waitForElementNotPresent('@spinner')
  this.expect.element('.bx--detail-page-header-title').text.to.equal(name)
  this.expect.element('.section-title:nth-of-type(1)').text.to.equal('Policy details')
  this.expect.element('.pf-c-description-list:nth-child(1) > .pf-c-description-list__group:nth-child(1) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(name)
  this.expect.element('.overview-content > div:nth-child(2) > .section-title').text.to.equal('Placement')
  this.waitForElementVisible('.overview-content-second > div:nth-child(1) > div > div > div:nth-child(1) > .bx--module__title')
  this.expect.element('.overview-content-second > div:nth-child(1) > div > div > div:nth-child(1) > .bx--module__title').text.to.equal('Placement rule')
  this.expect.element('.overview-content-second > div:nth-child(1) > div > div > .bx--module__content > section > div > div:nth-child(1) > div:nth-child(2)').text.to.equal('placement-' + name)
  this.expect.element('.overview-content-second > div:nth-child(2) > div > div > div:nth-child(1) > .bx--module__title').text.to.equal('Placement binding')
  this.expect.element('.overview-content-second > div:nth-child(2) > div > div > .bx--module__content > section > div > div:nth-child(1) > div:nth-child(2)').text.to.equal('binding-' + name)
  this.click('.bx--breadcrumb > div:nth-child(1)')
  this.waitForElementNotPresent('@spinner')
}

function verifyStableYaml(el, yaml, name) {
  //check/uncheck enforce to reload DOM
  el.waitForElementVisible('@enforce')
  el.click('@enforce')
  el.pause(1000)
  el.click('@enforce')
  allpolicy.compareTemplate(el, yaml, { policyName: name })
}

function enforcePolicy(name){
  this.log(`Enforcing policy: ${name}`)
  //verify table/menu exist
  this.waitForElementVisible('body')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  //verify cancel button (.bx--btn.bx--btn--tertiary) on enforce policy modal and return to main page
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Enforce', 3, '#enforce-resource-modal', '.bx--btn.bx--btn--tertiary')
  //re-entry overflow menu then click enforce policy button (.bx--btn.bx--btn--danger--primary)
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Enforce', 3, '#enforce-resource-modal', '.bx--btn.bx--btn--danger--primary')
  this.waitForElementVisible('.pf-c-table')
  this.expect.element('.pf-c-table> tbody > tr:nth-child(1) > td:nth-child(3)').text.to.equal('enforce')
  this.clearPatternFlySearchValue()
}

function informPolicy(name){
  this.log(`Informing policy: ${name}`)
  //verify table/menu exist
  this.waitForElementVisible('body')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  //verify cancel button (.bx--btn.bx--btn--secondary) on inform policy modal and return to main page
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Inform', 3, '#inform-resource-modal', '.bx--btn.bx--btn--secondary')
  //re-entry overflow menu then click inform policy button (.bx--btn.bx--btn--primary)
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Inform', 3, '#inform-resource-modal', '.bx--btn.bx--btn--primary')
  this.waitForElementVisible('.pf-c-table')
  this.waitForElementVisible('.pf-c-table> tbody > tr:nth-child(1) > td:nth-child(3)')
  this.expect.element('.pf-c-table> tbody > tr:nth-child(1) > td:nth-child(3)').text.to.equal('inform')
  this.clearPatternFlySearchValue()
}

function checkStatus(name, violationExpected, violationText) {
  this.log(`Checking policy: ${name} violationExpected: ${violationExpected}`)
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  this.expect.elements('tbody tr > *:first-child > a').count.to.equal(1).before(2000)
  // wait for yellow triangle to disappear
  this.waitForElementNotPresent('css selector','.pf-c-table .violationCell svg[fill=\'#f0ab00\']')
  if (violationExpected) {
    // should show red not compliant
    this.waitForElementPresent('css selector', '.pf-c-table .violationCell svg[fill=\'#c9190b\']')
  } else {
    // should show green compliant
    this.waitForElementPresent('css selector', '.pf-c-table .violationCell svg[fill=\'#467f40\']')
  }
  this.click('tbody tr > *:first-child > a')
  this.waitForElementPresent('#status-tab')
  this.click('#status-tab')
  this.waitForElementPresent('.policy-status-view')
  this.expect.element('tbody tr > *:first-child > a').to.have.attribute('href').that.matches(/.*\/multicloud\/clusters\/[a-z0-9-]+\/overview$/)
  this.testPolicyStatusTabSearching()
  this.log('Checking policy status by templates')
  this.waitForElementPresent('#policy-status-templates').click('#policy-status-templates')
  this.waitForElementPresent('.policy-status-by-templates-table')
  this.expect.elements('.policy-status-by-templates-table').count.not.to.equal(0)
  if (violationExpected) {
    // should show red not compliant
    this.expect.elements('.policy-status-by-templates-table td[data-label="Status"] svg[fill="#c9190b"]').count.not.to.equal(0)
  } else {
    // should show green compliant
    this.expect.elements('.policy-status-by-templates-table td[data-label="Status"] svg[fill="#467f40"]').count.not.to.equal(0)
  }
  this.log('Checking policy status by clusters')
  this.waitForElementPresent('#policy-status-clusters').click('#policy-status-clusters')
  this.waitForElementPresent('.policy-status-by-clusters-table')
  if (violationExpected) {
    // should show red not compliant
    this.expect.elements('.policy-status-by-clusters-table td[data-label="Status"] svg[fill="#c9190b"]').count.not.to.equal(0)
  } else {
    // should show green compliant
    this.expect.elements('.policy-status-by-clusters-table td[data-label="Status"] svg[fill="#467f40"]').count.not.to.equal(0)
  }

  if (violationExpected) {
    if (violationText) {
      // check for 1st entry in the table
      // it should be a violation as table are sorted to show Not compliant first
      this.expect.element('.policy-status-by-clusters-table .pattern-fly-table > table > tbody > tr:nth-child(1) > td:nth-child(4) > div').text.to.equal(violationText)
    }
  }

  this.log('checking view history for policy status history')
  this.click('.policy-status-by-clusters-table .pattern-fly-table > table > tbody > tr:nth-child(1) > td:nth-child(6) a')
  this.waitForElementPresent('.policy-status-history-view')
  this.expect.elements('.policy-status-history-view .table tbody>tr').count.not.to.equal(0)

  this.log('checking view details for policy template details')
  this.click('.bx--breadcrumb > div:nth-child(3)')
  this.waitForElementPresent('#policy-status-clusters').click('#policy-status-clusters')
  this.waitForElementPresent('.policy-status-by-clusters-table')
  this.click('.policy-status-by-clusters-table .pattern-fly-table > table > tbody > tr:nth-child(1) > td:nth-child(4) a')
  this.waitForElementPresent('.policy-template-details-view')
  this.waitForElementPresent('.policy-template-details-view .table')
  this.getText('css selector', '.overview div.pf-c-description-list__group:nth-child(3) > dd:nth-child(2) > div:nth-child(1)', (kind) => {
    if (kind.value === '-') {
      this.assert.fail(`Failed to retrieve policy details: kind=${this.log(kind)}`)
    }
    if (violationExpected) {
      this.expect.element('.overview div.pf-c-description-list__group:nth-child(5) > dd:nth-child(2) > div:nth-child(1)').text.to.equal('NonCompliant')
    } else {
      this.expect.element('.overview div.pf-c-description-list__group:nth-child(5) > dd:nth-child(2) > div:nth-child(1)').text.to.equal('Compliant')
    }
  })
  this.click('.bx--breadcrumb > div:nth-child(1)')
}

function searchPolicy(name, expectToDisplay) {
  this.setPatternFlySearchValue(name)
  if(expectToDisplay){
    this.expect.element('tbody tr > *:first-child > a').text.to.equal(name)
  } else{
    this.waitForElementNotPresent('tbody tr > *:first-child > a')
  }
}

function deletePolicy(name){
  this.log(`Deleting policy: ${name}`)
  this.waitForElementVisible('body')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  //verify cancel button (.bx--btn.bx--btn--tertiary) on delete policy modal and return to main page
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Remove', 5, '#remove-resource-modal', '.bx--btn.bx--btn--tertiary')
  //re-entry overflow menu then click delete policy button (.bx--btn.bx--btn--danger--primary)
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Remove', 5, '#remove-resource-modal', '.bx--btn.bx--btn--danger--primary')
  this.waitForElementNotPresent('@spinner')
}

function clearPatternFlySearchValue(){
  this.waitForElementVisible('@searchPatternFlyInputClear')
  this.isVisible('@searchPatternFlyInputClear', result => {
    if (result.value) {
      this.click('@searchPatternFlyInputClear')
    }
  })
  this.waitForElementNotPresent('@searchPatternFlyInputClear')
}

function testPolicyStatusTabSearching(){
  this.log('Testing PatternFly tab searching bar on policy status tab message field')
  this.api.getText('.policy-details-message', (result) => {
    if (result && result.value ) {
      // get policy status tab message field text
      let policyStatusMessage = result.value
      this.log(`searching text before truncate is ${policyStatusMessage}`)
      if (typeof policyStatusMessage === 'string' && policyStatusMessage.length > 0) {
        policyStatusMessage = policyStatusMessage.replace('View details', '')
        this.log(`searching text after truncate is ${policyStatusMessage}`)
        this.setPatternFlySearchValue(policyStatusMessage)
        this.waitForElementNotPresent('@PatternFlyTabEmptyState')
        this.clearPatternFlySearchValue()
      }
    }
  })
}

function setPatternFlySearchValue(value){
  this.log(`Searching for PatternFly table: ${value}`)
  this.waitForElementVisible('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').clearValue('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').setValue('@searchPatternFlyInput', value)
  this.waitForElementVisible('@searchPatternFlyInput')
}

function log(message) {
  return this.perform(() => {
    // eslint-disable-next-line no-console
    console.log(message)
  })
}

function tryEnable(name){
  this.log(`Enabling policy: ${name}`)
  //verify table/menu exist
  this.waitForElementVisible('body')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  //verify cancel button (.bx--btn.bx--btn--secondary) on enable policy modal and return to main page
  this.clickButtonOnOverflowModal(name, 'div:nth-child(1) > a', 9, 'Enable', 2, '#enable-resource-modal', '.bx--btn.bx--btn--secondary')
  //re-entry overflow menu then click enable policy button (.bx--btn.bx--btn--primary)
  this.clickButtonOnOverflowModal(name, 'div:nth-child(1) > a', 9, 'Enable', 2, '#enable-resource-modal', '.bx--btn.bx--btn--primary')
  this.waitForElementVisible('.pf-c-table')
  this.waitForElementNotPresent('.pf-c-table .disabled-label')
  this.clearPatternFlySearchValue()
}

function tryDisable(name){
  this.log(`Disabling policy: ${name}`)
  //verify table/menu exist
  this.waitForElementVisible('body')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.setPatternFlySearchValue(name)
  //verify cancel button (.bx--btn.bx--btn--tertiary) on disable policy modal and return to main page
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Disable', 2, '#disable-resource-modal', '.bx--btn.bx--btn--tertiary')
  //re-entry overflow menu then click delete policy button (.bx--btn.bx--btn--danger--primary)
  this.clickButtonOnOverflowModal(name, 'a', 9, 'Disable', 2, '#disable-resource-modal', '.bx--btn.bx--btn--danger--primary')
  this.waitForElementVisible('.pf-c-table')
  this.waitForElementPresent('.pf-c-table .disabled-label')
  this.clearPatternFlySearchValue()
}
