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

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

module.exports = {
  elements: {
    spinner: '.patternfly-spinner',
    table: '.pf-c-table',
    createPolicyButton: '#create-policy',
    cancelCreatePolicyButton: '#cancel-button-portal-id-btn',
    submitCreatePolicyButton: '#create-button-portal-id',
    resetEditor: 'div.creation-view-yaml-header div.editor-bar-button[title="Reset"]',
    yamlMonacoEditor: '.monaco-editor',
    searchInput: '.pf-c-search-input__text',
    searchInputClear: '.pf-c-search-input__clear',
    resourceFilterBar: 'div.resource-filter-bar > span',
    resourceFilterBarClear: 'div.resource-filter-bar > span.button',
    filterButton: '#resource-toolbar > div > div > div.resource-filter-button',
    filterMenu: '#resource-toolbar > div.resource-filter-view',
    filterSectionTitles: '#resource-toolbar > div.resource-filter-view > div.filter-sections-container > div > div.filter-section > div.filter-section-title',
    sidePolicyPanel: 'div.bx--modal-container > div.bx--modal-content',
    sidePolicyPanelClose: 'div.bx--modal-container > div.bx--modal-header > button.bx--modal-close',
    sidePolicyPanelClusterLink: 'div.bx--modal-container > div.bx--modal-content a.bx--link',
    toggleButtonPolicies: '.pf-c-toggle-group__item:first-child .pf-c-toggle-group__button',
    toggleButtonCluster: '.pf-c-toggle-group__item:last-child .pf-c-toggle-group__button',
    allTableHeading: '.pf-c-table__button-content .pf-c-table__text, .pf-c-table__column-help .pf-c-table__text',
    overflowMenuToggle: '.pf-c-table  .pf-c-dropdown__toggle',
    overflowMenuBox: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu',
    overflowViewClusters: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu > li:nth-child(1) > button',
    deleteButton: '.bx--overflow-menu-options__option--danger',
    confirmDeleteButton: '.bx--btn--danger--primary',
    noResource: '.no-resource',
    summaryCardCount: 'button#summary-toggle .grc-cards-count > .pf-c-label__content',
    summaryCollapse: 'button#summary-toggle > span.pf-c-accordion__toggle-icon',
    summaryInfoContainer: 'div.module-grc-cards > dl > dd.grc-cards-container',
    summaryOptions: 'div.module-grc-cards > dl > div.header-options',
    summaryDropdown: 'div.module-grc-cards > dl > div.header-options > .pf-c-dropdown > button#grc-cards-toggle',
    summaryDropdownBox: 'div.module-grc-cards > dl > div.header-options > .pf-c-dropdown > ul > li',
    summaryCards: 'div.module-grc-cards > dl > dd > div > div',
    summaryCardsInfo: 'div.module-grc-cards > dl > dd > div > div:nth-child(%s) > div.card-container > div.card-content > div:nth-child(2)',
    summaryCardsInfo_Empty: 'div.module-grc-cards > dl > dd > div > div:nth-child(%s) > div.card-container > div.card-content > div:nth-child(2) > .empty-violations-strip',
    summaryCardsInfo_Content: 'div.module-grc-cards > dl > dd > div > div:nth-child(%s) > div.card-container > div.card-content > div:nth-child(2) > div:nth-child(%s)',
    policyNameInput: '#name',
    namespaceDropdown: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box',
    namespaceDropdownBox: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__menu > div',
    namespaceDropdownValue: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__field > span',
    templateDropdown: '.creation-view-controls-container > div > div:nth-child(3) > div.bx--multi-select.bx--list-box',
    templateDropdownBox: '.creation-view-controls-container > div > div:nth-child(3) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu > div',
    templateDropdownInput: '.creation-view-controls-container > div > div:nth-child(3) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > input',
    clusterDropdown: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box',
    clusterDropdownBox: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu > div',
    clusterDropdownInput: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > input',
    clusterDropdownClearValue: '.creation-view-controls-container > div > div:nth-child(4) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > div.bx--list-box__selection[title="Clear selected item"]',
    standardsDropdown: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box',
    standardsDropdownBox: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu > div',
    standardsDropdownInput: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > input',
    standardsDropdownClearValue: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > div.bx--list-box__selection[title="Clear selected item"]',
    standardsDropdownClearAll: '.creation-view-controls-container > div > div:nth-child(5) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > div.bx--list-box__selection[title="Clear all selected items"]',
    categoriesDropdown: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box',
    categoriesDropdownBox: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu > div',
    categoriesDropdownInput: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > input',
    categoriesDropdownClearValue: '.creation-view-controls-container > div > div:nth-child(6) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > div.bx--list-box__selection[title="Clear selected item"]',
    controlsDropdown: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box',
    controlsDropdownBox: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box > div.bx--list-box__menu > div',
    controlsDropdownInput: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > input',
    controlsDropdownClearValue: '.creation-view-controls-container > div > div:nth-child(7) > div.bx--multi-select.bx--list-box > div.bx--list-box__field > div.bx--list-box__selection[title="Clear selected item"]',
    enforceCheckbox: '#enforce',
    disableCheckbox: '#disabled',
    createErrorDecoration: '.errorDecoration',
    createNotification: '.bx--inline-notification__subtitle',
  },
  commands: [{
    dynamicSelector(selectorRef, ...params) {
      let selectorStr = this.elements[selectorRef].selector
      params.forEach(param => selectorStr = selectorStr.replace('%s', param))
      return selectorStr
    },
    createTestPolicy,
    checkCreateNotification,
    testCreateCustomSelections,
    testDetailsPage,
    testFilters,
    updateYamlEditor,
    // verifyPagination,
    verifyPolicyTable,
    verifySummary,
    verifyTable,
    verifyToggle,
    verifyCreateNotifications,
  }],
  compareTemplate: compareTemplate
}
function verifySummary(url) {
  this.waitForElementVisible('@summaryCollapse')
  this.waitForElementVisible('@summaryInfoContainer')
  // Collapse the cards (both the cards and the dropdown should disappear)
  this.navigate(url + '?card=false&index=0')
  this.waitForElementNotPresent('@summaryInfoContainer')
  this.waitForElementNotPresent('@summaryOptions')
  // Expand the cards
  this.navigate(url + '?card=true&index=0')
  this.waitForElementVisible('@summaryInfoContainer')
  // Standards summary
  this.waitForElementVisible('@summaryDropdown')
  this.click('@summaryDropdown')
  // Select 'Categories' in the cards dropdown
  this.click('@summaryDropdownBox:nth-child(1)')
  checkPolicySummaryCards(this)
  // Select 'Standards' in the cards dropdown
  this.click('@summaryDropdown')
  this.click('@summaryDropdownBox:nth-child(2)')
  checkPolicySummaryCards(this)
}
function checkPolicySummaryCards(browser) {
  // Get all cards and iterate over them
  browser.api.elements('@summaryCards', (cards) => {
    const numCards = cards.value.length
    // Check number displayed matches number of cards
    browser.expect.element('@summaryCardCount').text.to.equal(numCards.toString())
    for (let cardNum = 1; cardNum <= numCards; cardNum++) {
      const cardInfo = browser.dynamicSelector('summaryCardsInfo', cardNum)
      browser.waitForElementVisible(cardInfo)
      // Check to make sure it's not a card with no violations
      const emptyCard = browser.dynamicSelector('summaryCardsInfo_Empty', cardNum)
      browser.api.element('css selector', emptyCard, (result) => {
        if (result.status === -1) {
          // Verify and iterate over two violation links on card: 1) Cluster 2) Policy
          browser.expect.element(cardInfo).to.have.property('childElementCount').equals(2)
          for (let i = 1; i <= 2; i++) {
            browser.waitForElementVisible(browser.dynamicSelector('summaryCardsInfo_Content', cardNum, i))
            browser.click(browser.dynamicSelector('summaryCardsInfo_Content', cardNum, i))
            // Check to see whether filters were applied on click
            browser.api.element('@resourceFilterBarClear', (result2) => {
              if (result2.status !== -1) {
                // First violation selection of each card is cluster (no expandable row), second is policy
                verifyTable(browser, i === 1)
                browser.click('@resourceFilterBarClear')
                // Clicking a card collapses the cards, so we need to re-expand them
                browser.expect.element('@summaryInfoContainer').to.not.be.visible
                browser.click('@summaryCollapse')
                browser.waitForElementVisible('@summaryInfoContainer')
              } else {
                browser.assert.fail(`Filters should have appeared after clicking part ${i} of GRC card ${cardNum} but were not present.`)
              }
            })
          }
        } else {
          browser.assert.ok(true, `GRC Card ${cardNum} has no violations.`)
        }
      })
    }
  })
}
function verifyTable(browser, cluster) {
  browser.api.element('@noResource', (result) => {
    if (result.status === -1) {
      browser.waitForElementVisible('@table')
      // Check side panel
      browser.click('@overflowMenuToggle')
      // *** TEMPORARY TEST WITHOUT SIDE PANEL ***
      // Open overflow, verify it's not "View", and close overflow menu
      browser.expect.element('@overflowMenuBox').to.be.present
      if (cluster) {
        browser.expect.element('@overflowViewClusters').text.to.equal('Launch cluster')
      } else {
        browser.expect.element('@overflowViewClusters').text.to.equal('Edit')
      }
      browser.click('@overflowMenuToggle')
      browser.expect.element('@overflowMenuBox').to.not.be.present
    }
  })
}
// Test content toggle
function verifyToggle() {
  // CLUSTER TOGGLE
  this.click('@toggleButtonCluster')
  this.waitForElementVisible('@allTableHeading')
  this.expect.element('@allTableHeading').text.to.equal('Cluster name')
  // Check to make sure the cluster link redirects to its RHACM cluster page
  this.expect.element('tbody tr > *:first-child > a').to.have.attribute('href').that.matches(/.*\/multicloud\/clusters\/[a-z0-9-]+\/overview$/)
  // POLICY TOGGLE
  this.click('@toggleButtonPolicies')
  this.waitForElementVisible('@allTableHeading')
  this.expect.element('@allTableHeading').text.to.equal('Policy name')
}
// function verifyPagination() {
//   const pagination = '.bx--pagination'
//   this.waitForElementVisible(pagination)
//   this.click('select[id="bx-pagination-select-resource-table-pagination"] option[value="5"]')
//   this.waitForElementVisible('.bx--pagination__button.bx--pagination__button--forward')
//   this.click('.bx--pagination__button.bx--pagination__button--forward')
//   this.waitForElementVisible('.bx--pagination__button.bx--pagination__button--backward')
//   this.click('.bx--pagination__button.bx--pagination__button--backward')
//   this.click('select[id="bx-pagination-select-resource-table-pagination"] option[value="10"]')
// }
/* Test policy filters on the policy summary page */
function testFilters(spec = {}) {
  const headings = [ 'Standards', 'Categories', 'Controls', 'Type' ]
  // Open filter menu
  this.click('@filterButton')
  this.expect.element('@filterMenu').to.be.present
  // Wait for filter menu opening animation to finish
  this.waitForElementVisible('@filterSectionTitles')
  this.pause(500)
  // Check for proper headings and click checkboxes that match policy
  for (let i = 0; i < headings.length; i++) {
    this.api.element('xpath', `//div[contains(@class,"filter-section-title") and text()="${headings[i]}"]`, (result) => {
      this.assert.ok(result.status >= 0, `Filter heading ${headings[i]} is present`)
    })
    if (headings[i] !== 'Type') {
      const heading = headings[i].toLowerCase()
      const label = spec[heading][0]
      let labelTrunc
      if (label.length > 20) {
        labelTrunc = `${label.substring(0,9)}...${label.substring(label.length-8)}`
      } else {
        labelTrunc = label
      }
      this.click('xpath', `//div[contains(@class,"filter-section")]//label/span[text()="${label}"]`)
      this.expect.element(`div.filter-section > div > input[id="${heading}${label}"]`).to.be.selected
      this.expect.element(`@resourceFilterBar:nth-child(${i + 2})`).text.to.equal(labelTrunc)
    }
  }
  // Expect our policy to still be visible after checking its respective filters
  this.expect.element('tbody tr > *:first-child > a').text.to.contain(spec.policyName)
  // Leave and return to the summary page to make sure the filters are still there
  this.click('tbody tr > *:first-child > a')
  this.waitForElementNotPresent('@spinner')
  this.click('.bx--breadcrumb > div:nth-child(1)')
  this.waitForElementNotPresent('@spinner')
  // Check for the filter buttons
  for (let i = 0; i < headings.length; i++) {
    if (headings[i] !== 'Type') {
      const heading = headings[i].toLowerCase()
      const label = spec[heading][0]
      let labelTrunc
      if (label.length > 20) {
        labelTrunc = `${label.substring(0,9)}...${label.substring(label.length-8)}`
      } else {
        labelTrunc = label
      }
      this.expect.element(`@resourceFilterBar:nth-child(${i + 2})`).text.to.equal(labelTrunc)
    }
  }
  // Clear filters
  this.click('@resourceFilterBar:last-child')
  this.expect.element('@resourceFilterBar').to.not.be.present
}
/* Helper function to select dropdown options */
function dropdownSelector(browser, label = '', options = ['']) {
  if (options && options[0] != '') {
    browser.click(`@${label}Dropdown`)
    browser.waitForElementVisible(`@${label}DropdownBox`)
    options.forEach(item => {
      browser.setValue(`@${label}DropdownInput`, item)
      browser.expect.element(`@${label}DropdownBox:nth-child(1)`).text.to.equal(item)
      browser.click(`@${label}DropdownBox:nth-child(1)`)
      browser.click(`@${label}DropdownClearValue`)
    })
    browser.click(`@${label}DropdownInput`)
    browser.waitForElementNotPresent(`@${label}DropdownBox`)
  }
}
/* Helper function to parse template files */
function applyTemplate(name, templateFile) {
  const file = fs.readFileSync(path.join(__dirname, `../e2e/yaml/create_policy/${templateFile}`), 'utf8')
  if (name && name != '') {
    return file.replace(/\[TEST_POLICY_NAME\]/g, name)
  } else {
    return file
  }
}
/* Helper function to compare the editor with a template */
function compareTemplate(browser, templateFile, spec = {}) {
  browser.api.execute('return window.monaco.editor.getModels()[0].getValue()', [], (result) => {
    const expected = applyTemplate(spec.policyName, templateFile)
    const actual = result.value
    const expectedlines = expected.split(/\r?\n/)
    const actuallines = actual.split(/\r?\n/)
    let i = 0, diff = '', same = true
    while (same && (i < expectedlines.length || i < actuallines.length)) {
      if (i < expectedlines.length) {
        if (i < actuallines.length) {
          if (expectedlines[i] != actuallines[i]) {
            diff = 'EXPECTED: ' + expectedlines[i] + '\nACTUAL  : ' + actuallines[i] + '\n---\n'
            same = false
          }
        } else {
          diff = 'EXPECTED: ' + expectedlines[i] + '\nACTUAL  : <EOF>' + '\n---\n'
          same = false
        }
      } else {
        diff = 'EXPECTED: <EOF>\nACTUAL  : ' + actuallines[i] + '\n---\n'
        same = false
      }
      i++
    }
    if (!same) {
      browser.assert.fail(`YAML in editor differs from expected YAML (${templateFile}) on Line ${i}:\n` + diff)
    } else {
      browser.assert.ok(true, `YAML in editor matches expected YAML (${templateFile}).`)
    }
  })
}
/*
 * Create a policy given spec object with arrays of policy options
 *
 * Defaults to the 'default' namespace with the first available policy template.
 * Validates against the given templateFile (will skip this step if none is given)
 * If the same standards/categories/controls are provided as a template, they
 * will be deselected
 */
function createTestPolicy(create = true,
  spec = {
    policyName: 'default-policy-test',
    namespace: 'default',
    specification: [''],
    cluster: [''],
    standards: [''],
    categories: [''],
    controls: [''],
    enforce: false,
    disable: false
  }, templateFile = '') {
  /* Press Create Policy Button or Reset the form */
  this.api.url(result => {
    if (result.value.indexOf('/policies/create') < 0) {
      this.waitForElementVisible('@createPolicyButton')
      this.click('@createPolicyButton')
      this.waitForElementNotPresent('@spinner')
    } else {
      this.click('@resetEditor')
    }
  })
  /* Wait for Editor to appear */
  this.waitForElementVisible('@yamlMonacoEditor')
  /* Input Policy Name */
  this.click('@policyNameInput').clearValue('@policyNameInput')
  this.setValue('@policyNameInput', spec.policyName)
  /* Select Namespace */
  this.click('@namespaceDropdown')
  this.waitForElementVisible('@namespaceDropdownBox')
  if (!spec.namespace) {
    spec.namespace = 'default'
  }
  this.click('xpath', `//div[contains(@class,"bx--list-box__menu-item") and text()="${spec.namespace}"]`)
  this.waitForElementNotPresent('@namespaceDropdownBox')
  /* Select Specification template */
  if (!spec.specification) {
    spec.specification = ['']
  }
  spec.specification.forEach(item => {
    this.click('@templateDropdown')
    this.waitForElementVisible('@templateDropdownBox')
    this.setValue('@templateDropdownInput', item + ' - ')
    this.expect.element('@templateDropdownBox:nth-child(1)').text.to.startWith(item)
    this.click('@templateDropdownBox:nth-child(1)')
    this.waitForElementNotPresent('@templateDropdownBox')
  })
  /* Select Cluster, Standards, Categories, Controls dropdowns */
  dropdownSelector(this, 'cluster', spec.cluster)
  dropdownSelector(this, 'standards', spec.standards)
  dropdownSelector(this, 'categories', spec.categories)
  dropdownSelector(this, 'controls', spec.controls)
  /* Enable 'enforce' for policy (instead of 'inform') if indicated */
  if (spec.enforce) {
    this.click('@enforceCheckbox')
  } else {
    spec.enforce = false
  }
  /* Disable policy from propagating to managed clusters if indicated */
  if (spec.disable) {
    this.click('@disableCheckbox')
  } else {
    spec.disable = false
  }
  /* Verify displayed YAML based on input (if a template file is given) */
  if (templateFile) {
    compareTemplate(this, templateFile, spec)
  }
  /* Create policy if requested */
  if (create) {
    this.waitForElementVisible('@submitCreatePolicyButton')
    this.click('@submitCreatePolicyButton')
    this.expect.element('@table').to.be.present
  }
}
/* Test whether customizing selections works as expected */
function testCreateCustomSelections(templates) {
  // Set up a policy with multiple specifications
  this.createTestPolicy(false, {specification: templates})
  // Clear Standards and make sure it's working as expected
  this.click('@standardsDropdownClearAll')
  this.expect.element('@standardsDropdownInput').to.have.attribute('placeholder').that.equals('Begin typing to search for label to select')
}
/* Helper function to edit YAML in editor and verify fields changed */
function editYaml(browser, content, line, element, clear = false, expected = content) {
  browser.click('@yamlMonacoEditor')
  /* Delete current content if indicated and enter content */
  browser.api.execute(
    `const monaco = window.monaco.editor.getModels()[0]\n \
    const current = monaco.getLineContent(${line})\n \
    monaco.pushEditOperations([], \
      [{ \
        range: { \
            startColumn: ${clear} ? current.indexOf(':') + 3 : current.length + 1, \
            endColumn: current.length + 1, \
            startLineNumber: ${line}, \
            endLineNumber: ${line} \
          }, \
        text:'${content.replace(/\r?\n/g, '\\n').replace(/'/g, '\\\'')}' \
      }] \
    )`, [])
  /* Wait half a second for DOM update */
  browser.pause(500)
  if (element.indexOf('Dropdown') > 0) {
    browser.api.getAttribute('css selector', browser.elements[element], 'placeholder', (result) => {
      if (result.value) {
        browser.assert.equal(result.value, expected, `Placeholder value of @${element} matches expected value "${expected}"`)
      } else {
        browser.expect.element(`@${element}`).text.to.equal(expected)
      }
    })
  } else if (element.indexOf('Checkbox') > 0) {
    browser.expect.element(`@${element}`).to.be.selected
  } else {
    throw new Error('editYaml was given an unknown element type (if this is unexpected, a new test may need to be specified): ' + element)
  }
}
/* Test whether updating the YAML updates the fields accordingly */
function updateYamlEditor() {
  /* Press Create Policy Button or Reset the form */
  this.api.url(result => {
    if (result.value.indexOf('/policies/create') < 0) {
      this.waitForElementVisible('@createPolicyButton')
      this.click('@createPolicyButton')
      this.waitForElementNotPresent('@spinner')
    } else {
      this.click('@resetEditor')
    }
  })
  /* Enter data */
  editYaml(this, 'test-namespace', 5, 'namespaceDropdownValue')
  editYaml(this, 'test-standard', 7, 'standardsDropdownInput')
  editYaml(this, 'test-category', 8, 'categoriesDropdownInput')
  editYaml(this, 'test-control', 9, 'controlsDropdownInput')
  editYaml(this, 'enforce', 11, 'enforceCheckbox', true)
  editYaml(this, 'true', 12, 'disableCheckbox', true)
  editYaml(this, applyTemplate('', 'custom_spec.yaml'), 13, 'templateDropdownInput', true, 'Custom specifications')
}
// Check notification on the Create page for a violation
function checkCreateNotification(expectedNotification='', errExpected=true) {
  if (errExpected) {
    // Click "Create" button
    this.waitForElementVisible('@submitCreatePolicyButton')
    this.click('@submitCreatePolicyButton')
    // Check notification
    this.waitForElementVisible('@createNotification')
    this.expect.element('@createNotification').text.to.equal(expectedNotification)
  } else {
    this.expect.element('@createErrorDecoration').to.not.be.present
  }
}
// Check a set of messages that should appear with invalid/missing input
function verifyCreateNotifications(policyName) {
  const nameErrMsg = 'Name already exists: pressing \'Create\' will prompt to update the existing policy'
  const missingNsErrMsg = 'Missing: metadata.namespace'
  const missingSpecErrMsg = 'Missing: spec.policy-templates'
  const successMsg = 'No errors found'
  // Create a policy with the given name
  this.createTestPolicy(true, {policyName})
  // Head back to the creation page
  this.click('@createPolicyButton')
  this.waitForElementNotPresent('@spinner')
  // Input the same name as the previous policy
  this.click('@policyNameInput').clearValue('@policyNameInput')
  this.setValue('@policyNameInput', policyName)
  // Expect duplicate name notification to not appear since there's no namespace selected
  this.expect.element('@createNotification').to.not.be.present
  // Click "Create" -- expect missing Namespace error
  this.checkCreateNotification(missingNsErrMsg)
  // Select namespace "Default"
  this.click('@namespaceDropdown')
  this.waitForElementVisible('@namespaceDropdownBox')
  this.click('xpath', '//div[contains(@class,"bx--list-box__menu-item") and text()="default"]')
  this.waitForElementNotPresent('@namespaceDropdownBox')
  // Expect error notification to change that there are Specification templates missing
  this.checkCreateNotification(missingSpecErrMsg)
  // Select a template Specification
  this.click('@templateDropdown')
  this.waitForElementVisible('@templateDropdownBox')
  this.click('@templateDropdownBox:nth-child(1)')
  this.waitForElementNotPresent('@templateDropdownBox')
  // Expect duplicate name notification to appear
  this.expect.element('@createNotification').text.to.equal(nameErrMsg)
  // Change the namespace to "e2e-rbac-test-1"
  this.click('@namespaceDropdown')
  this.waitForElementVisible('@namespaceDropdownBox')
  this.click('xpath', '//div[contains(@class,"bx--list-box__menu-item") and text()="e2e-rbac-test-1"]')
  this.waitForElementNotPresent('@namespaceDropdownBox')
  // Expect notification that there are no errors
  this.expect.element('@createNotification').text.to.equal(successMsg)
  // Click "Cancel" to return to the overview page
  this.click('@cancelCreatePolicyButton')
}
function verifyPolicyTable(name, templateFile) {
  // Parse template file into object
  const file = applyTemplate(name, templateFile)
  const data = yaml.safeLoadAll(file)
  // Verify summary table fields
  this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(1) > a').text.to.equal(name)
  this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(2)').text.to.equal(data[0].metadata.namespace)
  if (data[0].metadata.annotations['policy.open-cluster-management.io/standards']) {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(5)').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/standards'])
  } else {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(5)').text.to.equal('-')
  }
  if (data[0].metadata.annotations['policy.open-cluster-management.io/controls']) {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(6)').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/categories'])
  } else {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(6)').text.to.equal('-')
  }
  if (data[0].metadata.annotations['policy.open-cluster-management.io/categories']) {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(7)').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/controls'])
  } else {
    this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(7)').text.to.equal('-')
  }
}
function testDetailsPage(name, templateFile) {
  // Parse template file into object
  const file = applyTemplate(name, templateFile)
  const data = yaml.safeLoadAll(file)
  // Verify and click policy name in policy table
  this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(2)').text.to.equal(data[0].metadata.namespace)
  this.expect.element('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(1) > a').text.to.equal(name)
  this.click('.pf-c-table > tbody > tr:nth-child(1) > td:nth-child(1) > a')
  this.waitForElementNotPresent('@spinner')
  // DETAILS TAB TESTS
  // Check policy details
  this.expect.element('.bx--detail-page-header-title').text.to.equal(name)
  this.expect.element('.section-title:nth-of-type(1)').text.to.equal('Policy details')
  this.expect.element('.pf-c-description-list:nth-child(1) > .pf-c-description-list__group:nth-child(1) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(name)
  this.expect.element('.pf-c-description-list:nth-child(1) > .pf-c-description-list__group:nth-child(3) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(data[0].spec.remediationAction)
  this.expect.element('.pf-c-description-list:nth-child(1) > .pf-c-description-list__group:nth-child(4) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(data[0].spec.disabled.toString())
  this.expect.element('.pf-c-description-list:nth-child(3) > .pf-c-description-list__group:nth-child(1) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/categories'])
  this.expect.element('.pf-c-description-list:nth-child(3) > .pf-c-description-list__group:nth-child(2) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/controls'])
  this.expect.element('.pf-c-description-list:nth-child(3) > .pf-c-description-list__group:nth-child(3) > .pf-c-description-list__description > .pf-c-description-list__text').text.to.equal(data[0].metadata.annotations['policy.open-cluster-management.io/standards'])
  // Check Placement rule
  this.expect.element('.overview-content > div:nth-child(2) > .section-title').text.to.equal('Placement')
  this.waitForElementVisible('.overview-content-second > div:nth-child(1) > div > div > div:nth-child(1) > .bx--module__title')
  this.expect.element('.overview-content-second > div:nth-child(1) > div > div > div:nth-child(1) > .bx--module__title').text.to.equal('Placement rule')
  this.expect.element('.overview-content-second > div:nth-child(1) > div > div > .bx--module__content > section > div > div:nth-child(1) > div:nth-child(2)').text.to.equal('placement-' + name)
  this.expect.element('.overview-content-second > div:nth-child(1) > div > div > .bx--module__content > section > div > div:nth-child(2) > div:nth-child(2)').text.to.equal(data[2].metadata.namespace)
  this.api.getText('.overview-content-second > div:nth-child(1) > div > div > .bx--module__content > section > div > div:nth-child(3) > div:nth-child(2)', (result) => {
    this.assert.equal(result.value.replace(/ /g, ''), 'matchExpressions=' + JSON.stringify(data[2].spec.clusterSelector.matchExpressions))
  })
  // Check Placement binding
  this.expect.element('.overview-content-second > div:nth-child(2) > div > div > div:nth-child(1) > .bx--module__title').text.to.equal('Placement binding')
  this.expect.element('.overview-content-second > div:nth-child(2) > div > div > .bx--module__content > section > div > div:nth-child(1) > div:nth-child(2)').text.to.equal('binding-' + name)
  this.expect.element('.overview-content-second > div:nth-child(2) > div > div > .bx--module__content > section > div > div:nth-child(2) > div:nth-child(2)').text.to.equal(data[1].metadata.namespace)
  // Check Policy templates
  this.expect.element('.overview-content > div:nth-child(3) > .section-title').text.to.equal('Policy templates')
  // VIOLATION TAB TESTS
  this.waitForElementVisible('#status-tab')
  this.click('#status-tab')
  this.waitForElementNotPresent('@spinner')
  // YAML TAB TESTS
  this.waitForElementVisible('#yaml-tab')
  this.click('#yaml-tab')
  this.waitForElementVisible('.monaco-editor')
  this.waitForElementVisible('.yaml-editor-button > button:nth-child(1)')
  this.waitForElementVisible('.yaml-editor-button > button:nth-child(2)')
  // Return to All Policies page
  this.click('.bx--breadcrumb > div:nth-child(1)')
}
