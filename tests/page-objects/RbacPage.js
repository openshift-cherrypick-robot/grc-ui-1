/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


const config = require('../../config')

// const disableMsg = 'You do not have the required permissions to take this action.'

module.exports = {
  elements: {
    spinner: '.patternfly-spinner',
    tooltip: '.pf-c-tooltip',
    searchPatternFlyInput: '.pf-c-search-input__text-input',
    allTable: '.pf-c-table > tbody',
    policyLink: '.pattern-fly-table-body > tr:nth-child(1) > td:nth-child(1) > a',
    createPolicyButton: '#create-policy',
    overflowMenu: '.pf-c-table  .pf-c-dropdown__toggle',
    overflowMenuBody: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu',
    overflowMenuBody_Edit: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu > li:nth-child(1) > button',
    overflowMenuBody_Disable: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu > li:nth-child(2) > button',
    overflowMenuBody_Enforce: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu > li:nth-child(3) > button',
    overflowMenuBody_Remove: '.pattern-fly-table-body > tr:nth-child(1) .pf-c-dropdown__menu > li:nth-child(5) > button',
    sidePolicyPanel: 'div.bx--modal-container > div.bx--modal-content',
    sidePolicyPanelClose: 'div.bx--modal-container > div.bx--modal-header > button.bx--modal-close',
    submitCreatePolicyButton: '#create-button-portal-id',
    policyNameInput: '#name',
    namespaceDropdown: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box',
    namespaceDropdownBox: '.creation-view-controls-container > div > div:nth-child(2) > div.bx--list-box > div.bx--list-box__menu > div',
    placementRuleEdit: 'div.page-content-container div.overview-content-second > div.overview-content-second-cell:nth-child(1) button.text-edit-button',
    placementBindingEdit: 'div.page-content-container div.overview-content-second > div.overview-content-second-cell:nth-child(2) button.text-edit-button',
    statusTab: '#status-tab',
    statusTable: '.pattern-fly-table',
    statusDetailsLink: 'tr:first-child div.policy-details-message > *',
    statusClusterToggle_templates: '#policy-status-templates',
    statusClusterToggle_clusters: '#policy-status-clusters',
    yamlTab: '#yaml-tab',
    yamlEditor: '.monaco-editor',
    yamlEditButton: '#edit-button',
    yamlSubmitButton: '#submit-button'
  },
  commands: [{
    verifyAllPage,
    verifyCreatePage,
    verifyPolicyPage,
    log
  }]
}
/* Helper for checking Tooltip on elements */
// function checkTooltip(browser, selector, message) {
//   browser.moveToElement(selector, undefined, undefined)
//   browser.expect.element('@tooltip').text.to.equal(message)
// }
/* Verify user can only see policies they should on the summary page */
function verifyAllPage(name, nsNum, permissions) {
  this.log(`verifyAllPage policy: ${name} nsNum: ${nsNum} permissions: ${JSON.stringify(permissions)}`)
  // Filter for our RBAC policies
  this.waitForElementVisible('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').clearValue('@searchPatternFlyInput').setValue('@searchPatternFlyInput', name)
  this.waitForElementVisible('@allTable')
  // Check that user can see expected number of policies
  this.expect.element('@allTable').to.have.property('childElementCount').equals(nsNum)
  // Check overflow menu for first policy
  this.expect.element('@overflowMenu').to.be.visible
  this.click('@overflowMenu')
  this.expect.element('@overflowMenuBody').to.be.visible
  // All users should be able to view
  if (permissions.patch) {
    this.expect.element('@overflowMenuBody_Edit').to.be.enabled
    this.expect.element('@overflowMenuBody_Disable').to.be.enabled
    this.expect.element('@overflowMenuBody_Enforce').to.be.enabled
  } else {
    this.expect.element('@overflowMenuBody_Edit').to.be.not.enabled
    // checkTooltip(this, '@overflowMenuBody_Edit', disableMsg)
    this.expect.element('@overflowMenuBody_Disable').to.be.not.enabled
    // checkTooltip(this, '@overflowMenuBody_Disable', disableMsg)
    this.expect.element('@overflowMenuBody_Enforce').to.be.not.enabled
    // checkTooltip(this, '@overflowMenuBody_Enforce', disableMsg)
  }
  // Check for remove permissions
  if (permissions.delete) {
    this.expect.element('@overflowMenuBody_Remove').to.be.enabled
  } else {
    this.expect.element('@overflowMenuBody_Remove').to.be.not.enabled
    // checkTooltip(this, '@overflowMenuBody_Remove', disableMsg)
  }
  this.waitForElementVisible('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').clearValue('@searchPatternFlyInput')
}

function verifyPolicyPage(name, permissions, namespaced=false) {
  this.log(`verifyPolicyPage policy: ${name} permissions: ${{permissions}}`)
  // Filter for our RBAC policies
  this.waitForElementVisible('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').clearValue('@searchPatternFlyInput').setValue('@searchPatternFlyInput', name)
  this.waitForElementVisible('@allTable')
  // Navigate to policy page
  this.expect.element('@policyLink').text.to.startWith(name)
  this.click('@policyLink')
  this.waitForElementNotPresent('@spinner')
  this.waitForElementPresent('.bx--tabs__nav')
  this.waitForElementPresent('@placementBindingEdit')
  if (permissions.patch) {
    this.expect.element('@placementBindingEdit').to.be.enabled
    this.expect.element('@placementRuleEdit').to.be.enabled
  } else {
    this.expect.element('@placementBindingEdit').to.not.be.enabled
    // checkTooltip(this, '@placementBindingEdit', disableMsg)
    this.expect.element('@placementRuleEdit').to.not.be.enabled
    // checkTooltip(this, '@placementRuleEdit', disableMsg)
  }
  // Check Status tab
  //
  // Only clusterwide users will have access to cluster information, so we don't
  // run these tests for namespaced users
  if (!namespaced) {
    this.click('@statusTab')
    this.waitForElementPresent('@statusTable')
    // The "View details" link should be disabled with a tooltip since it requires
    // permissions to create a managedClusterView
    this.click('@statusClusterToggle_clusters')
    if (permissions.create) {
      this.expect.element('@statusDetailsLink').to.have.property('href')
    } else {
      this.expect.element('@statusDetailsLink').to.not.have.property('href')
      // checkTooltip(this, '@statusDetailsLink', disableMsg)
    }
    this.click('@statusClusterToggle_templates')
    this.waitForElementPresent('@statusTable')
    if (permissions.create) {
      this.expect.element('@statusDetailsLink').to.have.property('href')
    } else {
      this.expect.element('@statusDetailsLink').to.not.have.property('href')
      // checkTooltip(this, '@statusDetailsLink', disableMsg)
    }
  }
  // Check YAML tab
  this.click('@yamlTab')
  this.waitForElementPresent('@yamlEditor')
  if (permissions.patch) {
    this.expect.element('@yamlEditButton').to.be.enabled
    this.expect.element('@yamlSubmitButton').to.be.enabled
  } else {
    this.expect.element('@yamlEditButton').to.be.not.enabled
    // checkTooltip(this, '@yamlEditButton', disableMsg)
    this.expect.element('@yamlSubmitButton').to.be.not.enabled
    // checkTooltip(this, '@yamlSubmitButton', disableMsg)
  }
  this.click('.bx--breadcrumb > div:nth-child(1)')
  this.waitForElementNotPresent('@spinner')
  this.waitForElementVisible('@searchPatternFlyInput')
  this.click('@searchPatternFlyInput').clearValue('@searchPatternFlyInput')
}

function verifyCreatePage(permissions, createPage, policyName = '', ns = [], clusterwide = false, elevated = false) {
  // Check Create Policy button
  // If a user has multiple permissions for different namespaces, the create
  // button may be enabled, which is the purpose of setting `elevated`
  if (permissions.create || elevated) {
    this.expect.element('@createPolicyButton').to.be.enabled
    if (permissions.create) {
      // Go to Create policy page
      this.click('@createPolicyButton')
      this.waitForElementNotPresent('@spinner')
      // Check available namespaces
      this.click('@namespaceDropdown')
      this.waitForElementVisible('@namespaceDropdownBox')
      ns.forEach((namespace) => {
        this.api.elements('xpath', `//div[contains(@class,"bx--list-box__menu-item") and text()="${namespace}"]`, (result) => {
          this.assert.equal(result.value.length, 1, `User should be able to see namespace ${namespace}`)
        })
      })
      // If user has clusterwide permissions, they should see more namespaces
      // Otherwise, they should only see the namespaces specified
      if (clusterwide) {
        this.api.elements('@namespaceDropdownBox', (result) => {
          this.assert.ok(result.value.length > ns.length, 'User should be able to see namespaces clusterwide.')
        })
      } else {
        this.api.elements('@namespaceDropdownBox', (result) => {
          this.assert.ok(result.value.length, ns.length, `User should only be able to see namespaces: ${ns}`)
        })
      }
      this.click('@namespaceDropdown')
      this.waitForElementNotPresent('@namespaceDropdownBox')
      // Create policy
      createPage.createTestPolicy(true, { policyName: policyName, namespace: ns[0] })
    }
  } else {
    this.expect.element('@createPolicyButton').to.not.be.enabled
    // checkTooltip(this, '@createPolicyButton', disableMsg)

    // Make sure users can't navigate to the Create page directly
    this.api.url(`${this.api.launchUrl}${config.get('contextPath')}/create`)
    this.waitForElementNotPresent('@spinner')
    this.expect.element('@submitCreatePolicyButton').to.not.be.present
    this.expect.element('@createPolicyButton').to.be.present
  }
}

function log(message) {
  return this.perform(() => {
    // eslint-disable-next-line no-console
    console.log(message)
  })
}
