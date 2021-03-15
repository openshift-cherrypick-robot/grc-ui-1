/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


const policies = [], namespaces = []
let page, loginPage, createPage, policyName, commonPage
const DISABLE_RBAC_PASS = process.env.RBAC_PASS == undefined ? true : false
const permissions = {
  'clusterAdmin': {
    'get': true,
    'patch': true,
    'create': true,
    'delete': true
  },
  'admin': {
    'get': true,
    'patch': true,
    'create': true,
    'delete': true
  },
  'edit': {
    'get': true,
    'patch': true,
    'create': false,
    'delete': false
  },
  'view': {
    'get': true,
    'patch': false,
    'create': false,
    'delete': false
  },
}

module.exports = {
  '@disabled': DISABLE_RBAC_PASS,

  before: (browser) => {
    page = browser.page.RbacPage()
    createPage = browser.page.AllPolicyPage()
    loginPage = browser.page.LoginPage()
    commonPage = browser.page.CommonPage()
    // Login with cluster admin
    loginPage.navigate()
    loginPage.authenticate()
    // Create policies for RBAC testing and save names for deletion later
    policyName = `rbac-policy-test-${browser.globals.time}`
    const ns = 'e2e-rbac-test'
    for (let i = 1; i <= 2; i++) {
      namespaces.push(`${ns}-${i}`)
      policies.push(`${policyName}-${ns}-${i}`)
      createPage.createTestPolicy(true, { policyName: policies[policies.length - 1], namespace: namespaces[namespaces.length - 1] })
      commonPage.searchPolicy(policies[policies.length - 1], true)
    }
  },

  beforeEach: () => {
    loginPage.logout()
  },

  afterEach: (browser) => {
    if(!process.env.SELENIUM_CLUSTER) {
      browser.collectCoverage()
    }
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Cluster-wide cluster-admin user': () => {
    loginPage.authenticate('e2e-cluster-admin-cluster')
    page.verifyAllPage(policyName, namespaces.length, permissions.clusterAdmin)
    const createdPolicy = `${policyName}-cluster-admin-cluster`
    page.verifyCreatePage(permissions.clusterAdmin, createPage, createdPolicy, namespaces, true)
    commonPage.deletePolicy(createdPolicy)
    commonPage.clearPatternFlySearchValue()
    page.verifyPolicyPage(policyName, permissions.clusterAdmin)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Cluster-wide admin user': () => {
    loginPage.authenticate('e2e-admin-cluster')
    page.verifyAllPage(policyName, namespaces.length, permissions.admin)
    const createdPolicy = `${policyName}-admin-cluster`
    page.verifyCreatePage(permissions.admin, createPage, createdPolicy, namespaces, true)
    commonPage.deletePolicy(createdPolicy)
    commonPage.clearPatternFlySearchValue()
    page.verifyPolicyPage(policyName, permissions.admin)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Cluster-wide edit user': () => {
    loginPage.authenticate('e2e-edit-cluster')
    page.verifyAllPage(policyName, namespaces.length, permissions.edit)
    page.verifyCreatePage(permissions.edit)
    page.verifyPolicyPage(policyName, permissions.edit)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Cluster-wide view user': () => {
    loginPage.authenticate('e2e-view-cluster')
    page.verifyAllPage(policyName, namespaces.length, permissions.view)
    page.verifyCreatePage(permissions.view)
    page.verifyPolicyPage(policyName, permissions.view)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Cluster-wide view user in a group': () => {
    loginPage.authenticate('e2e-group-cluster')
    page.verifyAllPage(policyName, namespaces.length, permissions.view)
    page.verifyCreatePage(permissions.view)
    page.verifyPolicyPage(policyName, permissions.view)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Namespaced cluster-admin user': () => {
    loginPage.authenticate('e2e-cluster-admin-ns')
    page.verifyAllPage(policyName, 1, permissions.clusterAdmin)
    const createdPolicy = `${policyName}-cluster-admin-ns`
    page.verifyCreatePage(permissions.clusterAdmin, createPage, createdPolicy, [namespaces[0]], false)
    commonPage.deletePolicy(createdPolicy)
    commonPage.clearPatternFlySearchValue()
    page.verifyPolicyPage(policyName, permissions.clusterAdmin, true)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Namespaced admin user': () => {
    loginPage.authenticate('e2e-admin-ns')
    // This would be 1, but admin user also has view access to namespace 2
    // Verify admin permissions for this user by filtering for the specific policys
    page.verifyAllPage(`${policyName}-${namespaces[0]}`, 1, permissions.admin)
    const createdPolicy = `${policyName}-admin-ns`
    // The ns array would only be namespace 1 but user also has view access to ns 2
    page.verifyCreatePage(permissions.admin, createPage, createdPolicy, namespaces, false, true)
    commonPage.deletePolicy(createdPolicy)
    commonPage.clearPatternFlySearchValue()
    // Verify view permissions for this user by filtering for the specific policy
    page.verifyAllPage(`${policyName}-${namespaces[1]}`, 1, permissions.view)
    page.verifyPolicyPage(`${policyName}-${namespaces[0]}`, permissions.admin, true)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Namespaced edit user': () => {
    loginPage.authenticate('e2e-edit-ns')
    page.verifyAllPage(`${policyName}-${namespaces[0]}`, 1, permissions.edit)
    page.verifyCreatePage(permissions.edit)
    page.verifyPolicyPage(`${policyName}-${namespaces[0]}`, permissions.edit, true)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Namespaced view user': () => {
    loginPage.authenticate('e2e-view-ns')
    page.verifyAllPage(`${policyName}-${namespaces[0]}`, 1, permissions.view)
    page.verifyCreatePage(permissions.view)
    page.verifyPolicyPage(`${policyName}-${namespaces[0]}`, permissions.view, true)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Namespaced view user in a group': () => {
    loginPage.authenticate('e2e-group-ns')
    page.verifyAllPage(`${policyName}-${namespaces[0]}`, 1, permissions.view)
    page.verifyCreatePage(permissions.view)
    page.verifyPolicyPage(`${policyName}-${namespaces[0]}`, permissions.view, true)
  },

  'GRC UI: [P1][Sev1][policy-grc] RBAC: Clean up': () => {
    loginPage.authenticate()
    // Delete created policies
    policies.forEach((policy) => {
      commonPage.deletePolicy(policy)
    })
  }
}
