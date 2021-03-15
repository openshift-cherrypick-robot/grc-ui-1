/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { getConfigObject } from '../config'

const closeMenuQuery = 'svg[aria-label="Close menu"]'
const clearAllBtnQuery = 'svg[aria-label="Clear all selected items"]'
const selectItemQuery = 'input[type="checkbox"]'
const timestampRegexp = /^((an?|[0-9]+) (days?|hours?|minutes?|few seconds) ago|in a few seconds)$/

export const pageLoader = {
  shouldExist: () => cy.get('.patternfly-spinner').should('exist')  ,
  shouldNotExist: () => cy.get('.patternfly-spinner').should('not.exist')
}

export const uncheckAllItems = (listQuery, itemQuery=selectItemQuery, useClearAllBtn=true) => {
  // we should use a promise to complete this task first prior moving on
  return new Cypress.Promise((resolve) => {
    cy.then(() => {
      if (!useClearAllBtn) { // uncheck items one by one
      cy.get(listQuery)
        .click()
        .then(() => {
          // get the number of checked items
          const n = Cypress.$(listQuery).find(itemQuery+'[checked]').length
          // uncheck all values that could have been eventually pre-checked
          for (var i=0; i<n; i++) {
            cy.get(listQuery)
              .then(() => {
                if (!Cypress.$(listQuery).find(itemQuery).length) { // drow-down is collapsed, need to expand it manually
                  cy.get(listQuery)
                    .click()
                }
              })
              // better to query the element over an over again as it is being modified with uncheck()
              .get(listQuery).within( () => {
                cy.get(itemQuery)
                  .first()
                  .next('label')
                  .click()
              })
          }
        })
      }
      else { // use the 'clear all' button to clear all selected items at once
        cy.then( () => {
          const arr = Cypress.$(listQuery).find(clearAllBtnQuery)
          if (arr.length) {
            cy.wrap(arr[0])
              .click()
            }
          })
      }
    })
    .then(() => {
      const e = Cypress.$(listQuery).find(closeMenuQuery)
      if (e.length) { // drow-down is not collapsed, need to collapse it manually
        cy.wrap(e)
          .click()
      }
    })
    .then(() => {
      resolve('uncheckAllItems')
    })
  })
}

export const checkItems = (labels, listQuery, itemQuery=selectItemQuery, labelQuery='label') => {
  // we should use a promise to complete this task first prior moving on
  return new Cypress.Promise((resolve) => {
    // now check all the required values
    cy.get(listQuery)
      .then(() => {
      for (const label of labels) {
        cy.get(listQuery)
          .click()
          .get(listQuery).within( () => {
            cy.get('input.bx--text-input')
              .first()
              .as('input')
          })
          .get('@input')
          .clear()
          .type(label)
          .get(listQuery).within( () => {
            cy.get(itemQuery)
              .next(labelQuery)
              .contains(label)
              .click()
          })
        }
      })
      // clear the input field
      .then(() => {
        cy.get(listQuery).within(() => {
          cy.get('input.bx--text-input').first().clear()
        })
      })
      .then(() => {
        resolve('checkItems')
      })
  })
}

export const verifyItemsChecked = (labels, listQuery, itemQuery=selectItemQuery, labelQuery='label') => {
  // we should use a promise to complete this task first prior moving on
  return new Cypress.Promise((resolve) => {
    // now check all the required values
    cy.get(listQuery)
      .then(() => {
        // first need to query the element again as it has been probably recreated
        cy.then( () => {
          if (!Cypress.$(listQuery).find(itemQuery).length) { // drow-down is collapsed, need to open it again
            cy.get(listQuery)
              .click()
          }
        })
        // verify that the item is checked
        .then(() => {
          for (const label of labels) {
            cy.get(listQuery).within(() => {
              cy.get(labelQuery).contains(label).parents('label').siblings(itemQuery).should('be.checked')
            })
          }
        })
        // collapse the dropdown menu
        .get(listQuery).within(() => {
          cy.get(closeMenuQuery)
            .click()
        })
      })
      .then(() => {
        resolve('verifyItemsChecked')
      })
  })
}


export const selectItems = async (labels, listQuery, itemQuery='input[type="checkbox"]', labelQuery='.bx--checkbox-label', verifyChecked=true) => {
  uncheckAllItems(listQuery, itemQuery)
  .then( () => {
    if (labels.length) {
      cy.then(() => {
        checkItems(labels, listQuery, itemQuery, labelQuery)
      })
      .then(() => {
        if (verifyChecked) {
          verifyItemsChecked(labels, listQuery, itemQuery, labelQuery)
        }
      })
    }
  })
  //.then(() => { uncheckAllItems(listQuery, itemQuery) })  // this is here just if needed to test that uncheck works
}


export const getDefaultSubstitutionRules = (rules = {}) => {
  if (rules['label'] == undefined) {
    if (Cypress.env('MANAGED_CLUSTER_NAME') !== undefined) {
      rules['label'] = `- {key: name, operator: In, values: ["${Cypress.env('MANAGED_CLUSTER_NAME')}"]}`
    } else {
      rules['label'] = '[]'
    }
  }
  if (rules['id'] == undefined) {
    if (Cypress.env('RESOURCE_ID')) {
      rules['id'] = Cypress.env('RESOURCE_ID')
    }
  }
  if (rules['namespace'] == undefined) {
    rules['namespace'] = 'default'
  }
  const substitutions = []
  for (const [key, value] of Object.entries(rules)) {
    substitutions.push([new RegExp('\\['+key.toUpperCase()+'\\]', 'g'), value])
  }
  return substitutions
}

export const action_createPolicyFromYAML = (policyYAML, create=true) => {
  console.log(policyYAML)
  cy.toggleYAMLeditor('On')
    .YAMLeditor()
    .invoke('setValue', policyYAML)
    // create
    .then(() => {
      if (create) {
        cy.get('#create-button-portal-id-btn').click()
        cy.CheckGrcMainPage()
      }
    })
}

// this function is mainly used to testing selection on the create policy page
export const action_createPolicyFromSelection = (uPolicyName, create=true, policyConfig) => {
  // fill the form uName
  cy.get('input[aria-label="name"]')
    .clear()
    .type(uPolicyName)
  // namespace
  if (policyConfig['namespace']) {
    cy.get('.bx--dropdown[aria-label="Choose an item"]')
      .click()
      .contains(policyConfig['namespace'])
      .click()
  }
  //specs
  if (policyConfig['specifications']) {
    cy.then(() => {
      selectItems(policyConfig['specifications'], '.bx--multi-select[aria-label="specs"]')
    })
  }
  // cluster binding
  if (policyConfig['cluster_binding']) {
    cy.then(() => {
      selectItems(policyConfig['cluster_binding'], '.bx--multi-select[aria-label="clusters"]', )
    })
  }
  // standards
  if (policyConfig['standards']) {
    cy.then(() => {
      selectItems(policyConfig['standards'], '.bx--multi-select[aria-label="standards"]', )
    })
  }
  // categories
  if (policyConfig['categories']) {
    cy.then(() => {
      selectItems(policyConfig['categories'], '.bx--multi-select[aria-label="categories"]', )
    })
  }
  // controls
  if (policyConfig['controls']) {
    cy.then(() => {
      selectItems(policyConfig['controls'], '.bx--multi-select[aria-label="controls"]', )
    })
  }
  // enforce
  if (policyConfig['enforce']) {
    cy.then(() => {
      if (policyConfig['enforce']) {
        cy.get('input[aria-label="enforce"][type="checkbox"]')
          .next('label')
          .click()
      }
    })
  }
  // disable
  if (policyConfig['disable']) {
    cy.then(() => {
      if (policyConfig['disable']) {
        cy.get('input[aria-label="disabled"][type="checkbox"]')
          .next('label')
          .click()
      }
    })
  }
  // create
  cy.then(() => {
    if (create) {
      cy.get('#create-button-portal-id-btn').click()
      // after creation, always return to grc main page
      cy.CheckGrcMainPage()
    }
  })
}

// this function verify whether create policy form contain values matching the policy configuration
// oldPolicyName is used only to wait for a form update (since we cannot use wait() )
export const action_verifyCreatePolicySelection = (policyName, policyConfig) => {
  // first wait for the form update
  //cy.get('#name').invoke('val').should('not.match', /policy-grc/)
  // now check the updated policy name
  cy.get('#name').invoke('val').should('match', new RegExp('^'+policyName+'$'))
  // namespace
  if (policyConfig['namespace']) {
    cy.get('div[aria-label="namespace"]').contains(new RegExp('^'+policyConfig['namespace']+'$'))
  }
  //specs
  if (policyConfig['specifications']) {
    cy.then(() => {
        verifyItemsChecked(policyConfig['specifications'], '.bx--multi-select[aria-label="specs"]')
      })
      // also check that the number of selected items matches
      .get('.bx--multi-select[aria-label="specs"]').within(() => {
        cy.get('div[title="Clear all selected items"]').contains(new RegExp('[^0-9]?'+policyConfig['specifications'].length+'[^0-9]?'))
      })
  }
  // cluster binding
  if (policyConfig['cluster_binding']) {
    cy.then(() => {
        verifyItemsChecked(policyConfig['cluster_binding'], '.bx--multi-select[aria-label="clusters"]')
      })
      // also check that the number of selected items matches
      .get('.bx--multi-select[aria-label="clusters"]').within(() => {
        cy.get('div[title="Clear all selected items"]').contains(new RegExp('[^0-9]?'+policyConfig['cluster_binding'].length+'[^0-9]?'))
      })
  }
  // standards
  if (policyConfig['standards']) {
    cy.then(() => {
        verifyItemsChecked(policyConfig['standards'], '.bx--multi-select[aria-label="standards"]')
      })
      // also check that the number of selected items matches
      .get('.bx--multi-select[aria-label="standards"]').within(() => {
        cy.get('div[title="Clear all selected items"]').contains(new RegExp('[^0-9]?'+policyConfig['standards'].length+'[^0-9]?'))
      })
  }
  // categories
  if (policyConfig['categories']) {
    cy.then(() => {
        verifyItemsChecked(policyConfig['categories'], '.bx--multi-select[aria-label="categories"]')
      })
      // also check that the number of selected items matches
      .get('.bx--multi-select[aria-label="categories"]').within(() => {
        cy.get('div[title="Clear all selected items"]').contains(new RegExp('[^0-9]?'+policyConfig['categories'].length+'[^0-9]?'))
      })
  }
  // controls
  if (policyConfig['controls']) {
    cy.then(() => {
        verifyItemsChecked(policyConfig['controls'], '.bx--multi-select[aria-label="controls"]')
      })
      // also check that the number of selected items matches
      .get('.bx--multi-select[aria-label="controls"]').within(() => {
        cy.get('div[title="Clear all selected items"]').contains(new RegExp('[^0-9]?'+policyConfig['controls'].length+'[^0-9]?'))
      })
  }
  // enforce
  if (policyConfig['enforce']) {
    cy.then(() => {
      if (policyConfig['enforce']) {
        cy.get('input[aria-label="enforce"][type="checkbox"]').should('be.checked')
      } else {
        cy.get('input[aria-label="enforce"][type="checkbox"]').should('not.be.checked')
      }
    })
  }
  // disable
  if (policyConfig['disable']) {
    cy.then(() => {
      if (policyConfig['disable']) {
        cy.get('input[aria-label="disabled"][type="checkbox"]').should('be.checked')
      } else {
        cy.get('input[aria-label="disabled"][type="checkbox"]').should('not.be.checked')
      }
    })
  }
}


// enabled='enabled', checking if policy is enabled; enabled='disabled', checking if policy is disabled
// targetStatus = 0, don't check policy status; targetStatus = 1, check policy status is non-violation
// targetStatus = 2, check policy status is violation; targetStatus = 3, check policy status is pending
export const action_verifyPolicyInListing = (
  uName, policyConfig, enabled='enabled',
  violationsCounter='', targetStatus = null
  ) => {
  if (targetStatus == null) {
    if (violationsCounter && violationsCounter[0] != '[') {
      targetStatus = violationsCounter.startsWith('0/') ? 1 : 2
    }
    else if (enabled == 'disabled') {
      targetStatus = 3
    } else {
      targetStatus = 0
    }
  }
  doTableSearch(uName)
  cy.get('.grc-view-by-policies-table').within(() => {
    console.log(uName)
    cy.log(uName)
    cy.get('a').contains(uName).parents('td').siblings('td')
    .spread((namespace, remediation, violations, standards, categories, controls) => {
      // check namespace
      if (policyConfig['namespace']) {
        cy.wrap(namespace).contains(policyConfig['namespace'].trim(), { matchCase: false })
      }
      // check enforce/inform
      if (policyConfig['enforce'] == true) {
        cy.wrap(remediation).contains('enforce', { matchCase: false })
      } else if (policyConfig['enforce'] == false) {
        cy.wrap(remediation).contains('inform', { matchCase: false })
      }
      // check the violation status
      if ([1,2,3].includes(targetStatus)) {
        cy.wrap(violations).find('svg').then((elems) => {
          if (elems.length === 1) {
            expect(getStatusIconFillColor(targetStatus)).to.equal(elems[0].getAttribute('fill').trim().toLowerCase())
          }
        })
      }
      // check the cluster violations value
      if (violationsCounter) {
        cy.wrap(violations.textContent).should('match', new RegExp('^'+violationsCounter+'$'))
      }
      // check standard
      if (policyConfig['standards']) {
        for (const std of policyConfig['standards']) {
          cy.wrap(standards).contains(std.trim())
        }
      }
      // check categories
      if (policyConfig['categories']) {
        for (const cat of policyConfig['categories']) {
          cy.wrap(categories).contains(cat.trim())
        }
      }
      // check controls
      if (policyConfig['controls']) {
        for (const ctl of policyConfig['controls']) {
          cy.wrap(controls).contains(ctl.trim())
        }
      }
    })

    if (enabled.toLowerCase() === 'disabled') { // check disabled policy
      cy.get('a')
      .contains(uName)
      .siblings('span')
      .contains('disabled', { matchCase: false })
      .then(() => isPolicyStatusAvailable(uName)) // check policy status, it should not be available
      .then((v) => expect(v).to.be.false)
    } else { // check enabled policy
      cy.get('a')
        .contains(uName)
        .siblings('span')
        .should('not.exist')
    }
  })
  clearTableSearch()
}

export const action_verifyPolicyNotInListing = (uName) => {
  // either there are no policies at all or there are some policies listed
  if (!Cypress.$('#page').find('div.no-resource'.length)) {
    cy.get('.grc-view-by-policies-table').within(() => {
      cy.get('a')
        .contains(uName)
        .should('not.exist')
    })
  }
}

export const action_actionPolicyActionInListing = (uName, action, cancel=false) => {
  cy.CheckGrcMainPage()
  doTableSearch(uName)
  cy.get('.grc-view-by-policies-table').within(() => {
    cy.get('a')
      .contains(uName)
      .parents('td')
      .siblings('td')
      .last()
      .click()
  })
  .then(() => {
    cy.get('button').contains(action, { matchCase: false }).click()
  })
  .then(() => {
    cy.get('.bx--modal-container').within(() => {
      if (cancel) {
        cy.get('button').contains('Cancel', { matchCase: false })
          .click()
      } else {
        cy.get('button').contains(action, { matchCase: false })
          .click()
      }
    })
  })
  // wait for the dialog to be closed
  .then(() => {
    cy.get('.bx--modal-container').should('not.exist')
  })
  // after mainpage table action, always return to grc main page
  cy.CheckGrcMainPage()
  clearTableSearch()
}

// needs to be run only on /multicloud/policies/all/default/${policyName}
// where it checks whether all clusters have the expected status available
export const isClusterPolicyStatusAvailable = (clusterViolations, clusterList=null) => {
  let statusAvailable = true
  if (clusterList == null) { clusterList = Object.keys(clusterViolations) }
  // search for the cluster status in a Placement rule section
  return cy.then(() => {
    cy.get('section[aria-label="Placement rule"]').within(() => {
    cy.get('.bx--structured-list-td').spread((
      label1, name, label2, namespace, label3,
      selector, label4, decisions
      ) => {
      // check Decisions
      // for each cluster check that the expected status is listed
      cy.then(() => {
        for (const clusterName in clusterViolations) {
          cy.wrap(decisions).within(() => {
            // find cluster name
            cy.get('a').contains(clusterName)
              .next().as('clusterStatus')
              // check status
              .then(() => {
                if (clusterViolations[clusterName]) {  // do the check only if we have violation details for the cluster
                  const clusterStatus = getClusterPolicyStatus(clusterViolations[clusterName]).toLowerCase()
                  cy.get('@clusterStatus').then((e) => {
                    // check the cluster status
                    if (! e[0].textContent.match(new RegExp(clusterStatus))) {
                      statusAvailable = false
                    }
                  })
                }
                // always check that status icon doesn't indicate status not being available
                cy.get('@clusterStatus').find('path').then((elems) => {
                  const d = elems[0].getAttribute('d')
                  // M569 seem to be unique to an icon telling that policy status is not available for some cluster
                  if (d.startsWith('M569')) {
                    statusAvailable = false
                  }
                })
              })
          })
        }
      })
    })
  }).then(() => statusAvailable )
})
}

// needs to be run at /multicloud/policies/all at ClusterViolations tab
// optionally, specific violationsCounter value can be provided
export const isClusterViolationsStatusAvailable = (name, violationsCounter) => {
  let statusAvailable = false
  // page /multicloud/policies/all
  return cy.then(() => {
    cy.get('[aria-label="Sortable Table"]').within(() => {
      cy.get('a').contains(name).parents('td').siblings('td').spread((namespace, counter) => {
        // check the violation status
        cy.wrap(counter).find('path').then((elems) => {
          if (elems.length === 1) {
            const d = elems[0].getAttribute('d')
            // M569 seem to be unique to an icon telling that policy status is not available for some cluster
            statusAvailable = !d.startsWith('M569')
            if (statusAvailable && violationsCounter) { // also check if violations counter matches
              if (!counter.textContent.match('\\b'+violationsCounter+'\\b')) { // not found
                statusAvailable = false
              }
            }
          }
        })
      })
    })
    .then(() => statusAvailable)
  })
}



// needs to be run either at /multicloud/policies/all or /multicloud/policies/all/{namespace}/{policy} page
// here statusPending = true to check consist pending status for disable policy
export const isPolicyStatusAvailable = (uName, violationsCounter) => {
  let statusAvailable = false
  // page /multicloud/policies/all
  //if (window.location.toString().endsWith('/multicloud/policies/all')) {
return cy.url().then((pageURL) => {
  if (pageURL.endsWith('/multicloud/policies/all')) {
    cy.get('[aria-label="Sortable Table"]').within(() => {
    cy.get('a').contains(uName).parents('td').siblings('td').spread((namespace, remediation, violations) => {
      // check the violation status
      cy.wrap(violations).find('path').then((elems) => {
        if (elems.length === 1) {
          const d = elems[0].getAttribute('d')
          // M569 seem to be unique to an icon telling that policy status is not available for some cluster
          statusAvailable = !d.startsWith('M569')
          if (statusAvailable && violationsCounter) { // also check if violations counter matches
            if (!violations.textContent.match('\\b'+violationsCounter+'\\b')) { // not found
              statusAvailable = false
            }
          }
        }
      })
    })
  })
  .then(() => statusAvailable)
  } else { // other pages
    cy.get('.violationCell').spread((violations) => {
      // check the violation status
      cy.wrap(violations).find('path').then((elems) => {
        if (elems.length == 1) {
          const d = elems[0].getAttribute('d')
          // M569 seem to be unique to an icon telling that policy status is not available for some cluster
          statusAvailable = !d.startsWith('M569')
        }
      })
    })
    .then(() => statusAvailable)
  }
})
}

// needs to be run only on /multicloud/policies/all/default/${policyName}/status
// where it checks whether all listed (e.g. filtered) templates have status
export const isClusterTemplateStatusAvailable = (clusterViolations = {}) => {
  let statusAvailable = true
  // search for the template status in a table
  return cy.then(() => {
    cy.get('tbody').within(() => {
      cy.get('tr').each((row) => {
        cy.wrap(row).find('td').spread((cluster, status, template) => {
          const clusterName = cluster.textContent.trim()
          const templateName = template.textContent.trim()
          if (clusterViolations[clusterName]) {  // do the check only if we have violation details for the cluster
            // get respective violation ID
            let violationID
            for (const patternId of clusterViolations[clusterName]) {
              const name = patternId.replace(/-[^-]*$/, '')
              const id = patternId.replace(/^.*-/, '')
              if (templateName == name) {
                violationID = id
                break
              }
            }
            const clusterStatus = getPolicyStatusForViolationId(violationID)
            // check the cluster status
            if (! status.textContent.match(new RegExp(clusterStatus))) {
              statusAvailable = false
            }
          } else {  // we do not know the expected status, only check the icon
            cy.wrap(status).find('path').then((elems) => {
              if (elems.length === 1) {
                const d = elems[0].getAttribute('d')
                // M569 seem to be unique to an icon telling that policy status is not available for some cluster
                if (d.startsWith('M569')) {
                  statusAvailable = false
                }
              } else {
                statusAvailable = false
              }
            })
          }
        })
      })
    })
    .then(() => statusAvailable )
  })
}

export const action_verifyPolicyInPolicyDetails = (
  uName, policyConfig, enabled='enabled',
  violationsCounter='', targetStatus = null
  ) => {
  if (targetStatus == null) {
    if (violationsCounter && violationsCounter[0] != '[') {
      targetStatus = violationsCounter.startsWith('0/') ? 1 : 2
    }
    else if (enabled == 'disabled') {
      targetStatus = 3
    } else {
      targetStatus = 0
    }
  }
  //cy.get('div.vertical-expend').then((e) => {
  cy.get('#compliance\\.details-expand').within(() => {
    cy.get('div.pf-c-description-list__text').spread((
      name, namespace, enforcement, disabled, violations,
      categories, controls, standards, created
      ) => {
      // check name
      cy.wrap(name).contains(uName)
      // check namespace
      if (policyConfig['namespace']) {
        cy.wrap(namespace).contains(policyConfig['namespace'])
      }
      // check enforce/inform
      if (policyConfig['enforce'] == true) {
        cy.wrap(enforcement).contains('enforce', { matchCase: false })
      } else if (policyConfig['enforce'] == false) {
        cy.wrap(enforcement).contains('inform', { matchCase: false })
      }
      // check state
      if (enabled == 'enabled') {
        cy.wrap(disabled).contains('false')
      } else {
        cy.wrap(disabled).contains('true')
      }
      if ([1,2,3].includes(targetStatus)) {
        // check the violation status
        cy.wrap(violations).find('svg').then((elems) => {
          if (elems.length === 1) {
            getStatusIconFillColor(targetStatus) === elems[0].getAttribute('fill').trim().toLowerCase()
          }
        })
      }
      // check violations counter
      if (violationsCounter) {
        cy.wrap(violations).contains(new RegExp('^'+violationsCounter+'$'))
      }
      // check categories
      if (policyConfig['categories']) {
        for (const cat of policyConfig['categories']) {
          cy.wrap(categories).contains(cat)
        }
      }
      // check controls
      if (policyConfig['controls']) {
        for (const ctl of policyConfig['controls']) {
          cy.wrap(controls).contains(ctl)
        }
      }
      // check standard
      if (policyConfig['standards']) {
        for (const std of policyConfig['standards']) {
          cy.wrap(standards).contains(std)
        }
      }
      // check creation time
      cy.wrap(created).contains(timestampRegexp)
    })
  })
}

const getStatusIconFillColor = (targetStatus) => {
  switch(targetStatus) {
    case 1: // 467f40 is the unique non-volation status color
    case 'compliant':
      return '#467f40'
    case 2: // c9190b is the unique violation status color
    case 'not compliant':
      return '#c9190b'
    case 3:
    default: // f0ab00 is the unique pending status color
    case 'no status':
      return '#f0ab00'
  }
}


export const action_verifyPlacementRuleInPolicyDetails = (policyName, policyConfig, clusterViolations, checkLength=true) => {
  cy.get('section[aria-label="Placement rule"]').within(() => {
    cy.get('.bx--structured-list-td').spread((
      label1, name, label2, namespace, label3,
      selector, label4, decisions, label5, timestamp
      ) => {
      // check name
      cy.wrap(name).contains('placement-'+policyName)
      // check namespace
      if (policyConfig['namespace']) {
        cy.wrap(namespace).contains(policyConfig['namespace'])
      }
      // check binding selector
      if (policyConfig['binding_selector']) {
        // FIXME: in theory there could be multiple bindings
        cy.wrap(selector).contains(policyConfig['binding_selector'][0])
      }
      // check Decisions
      if (clusterViolations) {
        // check the number of clusters listed matches the configuration
        // for each cluster check that the expected status is listed
        if (checkLength) {
          cy.wrap(decisions).find('a').should('have.length', Object.keys(clusterViolations).length)
        }
        cy.then(() => {
          for (const clusterName in clusterViolations) {
            cy.wrap(decisions).within(() => {
              // find cluster name
              cy.get('a').contains(clusterName)
                .next().as('clusterStatus')
              // check status
                .then(() => {
                  const clusterStatus = getClusterPolicyStatus(clusterViolations[clusterName]).toLowerCase()
                  cy.get('@clusterStatus').contains(new RegExp(clusterStatus))
                  // check status icon
                  // FIXME: we are not checking status icon if we do not know the expected policy status
                  if (clusterStatus[0] != '(') {  // it is not regexp for unspecified status
                    const fillColor = getStatusIconFillColor(clusterStatus)
                    cy.get('@clusterStatus').find('svg[fill="'+fillColor+'"]').should('exist')
                  }
                })
            })
          }
        })
      }
      // check creation time
      cy.wrap(timestamp).contains(timestampRegexp)
    })
  })
}

// will add more check to enhance it later
export const verifyPolicyInPolicyStatus = (uName) => {
  cy.get('.pf-c-toggle-group__button').contains('Templates')
  .click()
  .then(() => {
    cy.get('.policy-status-by-templates-table .pf-c-title').contains(uName)
    verifyPolicyInPolicyHistory(uName)
  })
}

// will add more check to enhance it later
export const verifyPolicyInPolicyHistory = (uName) => {
  cy.get('tbody tr td a').contains('View history', { matchCase: false }).first()
  .click()
  .then(() => {
    cy.get('div h4').contains(uName, { matchCase: false })
  })
}

export const verifyPolicyByYAML = (uName, originalYAML, ingoreClusterSelector=true) => {
  cy.CheckGrcMainPage()
  cy.get('.grc-view-by-policies-table').within(() => {
    cy.get('a')
      .contains(uName)
      .parents('td')
      .siblings('td')
      .last()
      .click()
  })
  .then(() => {
    cy.get('button').contains('Edit', { matchCase: false }).click()
  })
  .then(() => {
    cy.get('.bx--modal-container').within(() => {
      cy.log(ingoreClusterSelector)
      // // eslint-disable-next-line cypress/no-assigning-return-values
      // const acutalYAML = cy.YAMLeditor().first().invoke('getValue')
      // cy.log(acutalYAML)
    })
  })

  // after mainpage table action, always return to grc main page
  cy.CheckGrcMainPage()
}

export const getPolicyTemplatesNameAndKind = (policyName, policyConfig) => {
  const templates = new Set()
  for (const specification of policyConfig['specifications']) {
    const shortSpec = specification.split('-')[0].trim() // get only part before '-'

    switch(shortSpec) {
    case 'CertificatePolicy':
      templates.add(policyName+'-cert-expiration'+'/'+'CertificatePolicy')
      break
    case 'ComplianceOperator':
      templates.add('comp-operator-ns'+'/'+'ConfigurationPolicy')
      templates.add('comp-operator-operator-group'+'/'+'ConfigurationPolicy')
      templates.add('comp-operator-subscription'+'/'+'ConfigurationPolicy')
      break
    case 'EtcdEncryption':
      templates.add(policyName+'-etcd-encryption'+'/'+'ConfigurationPolicy')
      break
    case 'GatekeeperOperator':
      templates.add('gatekeeper-operator-ns'+'/'+'ConfigurationPolicy')
      templates.add('gatekeeper-operator-catalog-source'+'/'+'ConfigurationPolicy')
      templates.add('gatekeeper-operator-group'+'/'+'ConfigurationPolicy')
      templates.add('gatekeeper-operator-subscription'+'/'+'ConfigurationPolicy')
      templates.add('gatekeeper'+'/'+'ConfigurationPolicy')
      break
    case 'IamPolicy':
      templates.add(policyName+'-limit-clusteradmin'+'/'+'IamPolicy')
      break
    case 'ImageManifestVulnPolicy':
      templates.add(policyName+'-image-vulnerability'+'/'+'ConfigurationPolicy')
      templates.add(policyName+'-image-vulnerability-sub'+'/'+'ConfigurationPolicy')
      break
    case 'LimitRange':
      templates.add(policyName+'-container-mem-limit-range'+'/'+'ConfigurationPolicy')
      break
    case 'Namespace':
      templates.add(policyName+'-prod-ns'+'/'+'ConfigurationPolicy')
      break
    case 'Pod':
      templates.add(policyName+'-nginx-pod'+'/'+'ConfigurationPolicy')
      break
    case 'PodSecurityPolicy':
      templates.add(policyName+'-restricted-psp'+'/'+'ConfigurationPolicy')
      break
    case 'Role':
      templates.add(policyName+'-deployments-role'+'/'+'ConfigurationPolicy')
      break
    case 'RoleBinding':
      templates.add(policyName+'-operatoruser-rolebinding'+'/'+'ConfigurationPolicy')
      break
    case 'SecurityContextConstraints':
      templates.add(policyName+'-restricted-scc'+'/'+'ConfigurationPolicy')
      break
    }
  }
  return Array.from(templates)
}

// from the set of known violations per cluster read just violations relevant for the particular policy
export const getViolationsPerPolicy = (policyName, policyConfig, clusterViolations, clusters = undefined) => {
  const violations = {}
  const templates = getPolicyTemplatesNameAndKind(policyName, policyConfig)
  if (clusters == undefined) {  // clusters were not defined, get a list of all cluster names from the clusterViolations dictionary
    clusters = Object.keys(clusterViolations).filter((value) => { return value != '*' }) // get all keys except the default/wildcard '*' when present
  }
  for (const cluster of clusters) {
    violations[cluster] = []
  }
  for (const template of templates) {
    const templateName = template.split('/', 2)[0]
    for (const cluster of clusters) {
      let violationList = []  // will contain a list of violations for the specific cluster
      if (cluster in clusterViolations) {  // I know violations for the specific cluster in clusterViolations
        violationList = clusterViolations[cluster]
      }
      else if ('*' in clusterViolations) {  // I am using the default/wildcard '*' settings from clusterViolations
        violationList = clusterViolations['*']
      }
      for (const clusterViolation of violationList) {
        // if violation pattern ID matches the template name and a number or ?, add it to the list
        if (clusterViolation.match(new RegExp('^'+templateName+'-[0-9?]+$'))) {
          violations[cluster].push(clusterViolation)
        }
      }
    }
  }
  return violations
}

export const getClusterPolicyStatus = (clusterViolations, format='long') => {
  // in theory there could be multiple violations found by one policy
  // or multiple compliance statuses when one policy has multiple specifications
  // if the policy status would be unknown return '?'
  let result = 'Compliant'
  for (const violation of clusterViolations) {
    const id = violation.replace(/^.*-/, '')
    if (id == '?') {  // if the status is unknown
      result = '(Compliant|Not Compliant)'
    } else if (id[0] != '0') {  // if there is an actual violation (non-zero ID)
      result = 'Not Compliant'
      break
    }
  }
  if (format == 'short') {
    switch (result) {
      case 'Not Compliant':
        return 'NonCompliant'
      case 'Compliant':
        return 'Compliant'
      default:
        return '(Compliant|NonCompliant)'
    }
  } else {
    return result
  }
}


export const getViolationsCounter = (clusterViolations) => {
  let violations = 0
  const clusters = Object.keys(clusterViolations).length
  for (const cluster in clusterViolations) {
    // in theory there could be multiple violations found by one policy
    // also, if the policy has multiple specifications there could be even multiple compliances
    for (const violation of clusterViolations[cluster]) {
      const id = violation.replace(/^.*-/, '')
      if (id == '?') { // unspecific violation
        return '[0-9]+/'+clusters
      }
      if (id[0] != '0') {  // if there is an actual violation (non-zero ID)
        violations = violations + 1
        break  // stop checking this server
      }
    }
  }
  return violations+'/'+clusters
}

export const action_verifyPolicyInPolicyDetailsTemplates = (uName, policyConfig) => {
  cy.get('#policy-templates-table-container').within(() => {
    const templates = getPolicyTemplatesNameAndKind(uName, policyConfig)
    for (const template of templates) {
      const [templateName, templateKind] = template.split('/', 2)
      cy.get('tr[data-row-name="'+templateName+'"]').children().spread((name, visibleAPIver, visibleKind) => {
        // double-check name
        cy.wrap(name).contains(templateName)
        // check api version
        cy.wrap(visibleAPIver).contains(policyConfig['apiVersion'])
        // check kind
        cy.wrap(visibleKind).contains(templateKind)
      })
    }
  })
}

export const action_verifyPlacementBindingInPolicyDetails = (uName, policyConfig) => {
  cy.get('section[aria-label="Placement binding"]').within(() => {
    cy.get('.bx--structured-list-td').spread((
      label1, name, label2, namespace, label3,
      placement_rule, label4, subjects, label5, timestamp
      ) => {
        cy.wrap(name).contains('binding-'+uName)
        if (policyConfig['namespace']) {
          cy.wrap(namespace).contains(policyConfig['namespace'])
        }
        cy.wrap(placement_rule).contains('placement-'+uName)
        if (policyConfig['apiVersion']) {
          let apiVer = policyConfig['apiVersion']
          apiVer = apiVer.substring(0, apiVer.length - 3)
          cy.wrap(subjects).contains(uName+'('+apiVer+')')
        }
        cy.wrap(timestamp).contains(timestampRegexp)
      })
    })
}


// does the search using the search form
// so far tested only on the policy status page
export const doTableSearch = (text, inputSelector = null, parentSelector = null) => {
  if (inputSelector === null) {
    inputSelector = 'input[aria-label="Search input"]'
  }
  // do the search only if there are resources on the page
  if (!Cypress.$('#page').find('div.no-resource').length) {
    // FIXME - do this search without a force
    cy.get(inputSelector, {withinSubject: parentSelector}).clear({force: true}).type(text, {force: true})
  }
}

export const clearTableSearch = (inputSelector = null, parentSelector = null) => {
  if (inputSelector === null) {
    inputSelector = 'input[aria-label="Search input"]'
  }
  // clear the search only if there are resources on the page
  if (!Cypress.$('#page').find('div.no-resource'.length)) {
    // FIXME - do this without a force
    cy.get(inputSelector, {withinSubject: parentSelector}).clear({force: true})
  }
}


export const action_verifyViolationsInPolicyStatusClusters = (policyName, policyConfig, clusterViolations, violationPatterns, clusters = undefined) => {
  if (clusters == undefined) {
    clusters = Object.keys(clusterViolations)
  }
  for (const cluster of clusters) {
    for (const patternId of clusterViolations[cluster]) {
      // from a messageId having format "templateName-id' parse both templateName and id
      const templateName = patternId.replace(/-[^-]*$/, '')
      const id = patternId.replace(/^.*-/, '')
      // now use the search to better target the required policy and to get it on the first page
      doTableSearch(templateName)
      // first we need to sort rows per Cluster name and later Template name to make sure they won't reorder in case some cluster state is updated - if this
      // happens, field values won't match expectations
      cy.get('th[data-label="Cluster"]').within(() => {
        cy.get('button').click()
      })
      cy.get('th[data-label="Template"]').within(() => {
        cy.get('button').click()
      })
      cy.get('tbody').within(() => {
        // now find the appropriate row with the cluster name
        cy.get('td').contains(new RegExp('^'+cluster+'$')).parents('td').siblings('td').spread((clusterStatus, template, message, lastReport, history) => {
          // check status
          const expectedStatus = getPolicyStatusForViolationId(id)
          cy.wrap(clusterStatus).contains(new RegExp(expectedStatus))
          // check status icon
          // FIXME: we are not checking status icon if we do not know the expected policy status
          if (id != '?') {
            const fillColor = getStatusIconFillColor(expectedStatus.toLowerCase())
            cy.wrap(clusterStatus).find('svg').should('have.attr', 'fill', fillColor)
          }
          // double-check template
          cy.wrap(template).contains(templateName)
          // check message
          // FIXME: here we should have a function that split the content per ';' and tests each part agains Compliant/NonCompliant and expected messages
          if (id == '?') {
            cy.wrap(message).contains(new RegExp('(NonCompliant|Compliant); '+violationPatterns[templateName][id]))
          } else if (id[0] == '0') {
            cy.wrap(message).contains(new RegExp('Compliant; '+violationPatterns[templateName][id]))
          } else {
            cy.wrap(message).contains(new RegExp('NonCompliant; '+violationPatterns[templateName][id]))
          }
          // check last report timestamp
          cy.wrap(lastReport).contains(timestampRegexp)
          // check View history link
          cy.wrap(history).within(() => {
            cy.get('a').contains('View history')
            const url_pattern = `/multicloud/policies/all/${policyConfig['namespace']}/${policyName}/status/${cluster}/templates/${templateName}/history$`
            cy.get('a').invoke('attr', 'href').then((target) => { cy.wrap(target).should('match', new RegExp(url_pattern)) })
          })
        })
      })
    }
  }
  clearTableSearch()
}

export const getPolicyStatusForViolationId = (id, format='long') => {
  if (format == 'long') {
    switch(id[0]) {  // take just the first digit
      case '?':
        return '(Not compliant|Compliant)'
      case '0':
        return 'Compliant'
      default:
        return 'Not compliant'
    }
  }
  if (format == 'short') {
    switch(id[0]) {
      case '?':
        return '(NonCompliant|Compliant)'
      case '0':
        return 'Compliant'
      default:
        return 'NonCompliant'
    }
  }
}

export const action_verifyViolationsInPolicyStatusTemplates = (policyName, policyConfig, clusterViolations, violationPatterns, clusters = undefined) => {
  if (clusters == undefined) {
    clusters = Object.keys(clusterViolations)
  }
  for (const cluster of clusters) {
    for (const patternId of clusterViolations[cluster]) {
      // from a messageId having format "templateName-id' parse both templateName and id
      const templateName = patternId.replace(/-[^-]*$/, '')
      const id = patternId.replace(/^.*-/, '')
      // now find the right search (there could be more) to better target the required cluster result and to get it on the first page
      // FIXME: this should be replaced by a separate function/command doing this, ideally without 'force'
      cy.get('h4').contains(new RegExp('^'+templateName+'$')).parent('div.policy-status-by-templates-table').as('form')
      cy.get('@form').then(e => doTableSearch(cluster, null, e))
      cy.get('@form').within(() => {
        cy.get('tbody').within(() => {
          cy.get('td').contains(new RegExp('^'+cluster+'$')).parents('td').siblings('td').spread((clusterStatus, message, lastReport, history) => {
            // check status
            const expectedStatus = getPolicyStatusForViolationId(id)
            cy.wrap(clusterStatus).contains(new RegExp(expectedStatus))
            // check status icon
            // FIXME: we are not checking status icon if we do not know the expected policy status
            if (id != '?') {
              const fillColor = getStatusIconFillColor(expectedStatus.toLowerCase())
              cy.wrap(clusterStatus).find('svg').should('have.attr', 'fill', fillColor)
            }
            // check message
            // FIXME: here we should have a function that split the content per ';' and tests each part agains Compliant/NonCompliant and expected messages
            if (id == '?') {
              cy.wrap(message).contains(new RegExp('(NonCompliant|Compliant); '+violationPatterns[templateName][id]))
            } else if (id[0] == '0') {
              cy.wrap(message).contains(new RegExp('Compliant; '+violationPatterns[templateName][id]))
            } else {
              cy.wrap(message).contains(new RegExp('NonCompliant; '+violationPatterns[templateName][id]))
            }
            // check last report timestamp
            cy.wrap(lastReport).contains(timestampRegexp)
            // check View history link
            cy.wrap(history).within(() => {
              cy.get('a').contains('View history')
              const url_pattern = `/multicloud/policies/all/${policyConfig['namespace']}/${policyName}/status/${cluster}/templates/${templateName}/history$`
              cy.get('a').invoke('attr', 'href').then((target) => { cy.wrap(target).should('match', new RegExp(url_pattern)) })
            })
          })
        })
      })
    }
  }
}

export const action_verifyPolicyDetailsInCluster =  (policyName, policyConfig, clusterName, clusterViolations, violationPatterns) => {
  const clusterStatus = getClusterPolicyStatus(clusterViolations[clusterName], 'short')
  cy.get('section[aria-label="Policy details"]').within(() => {
    cy.get('.bx--structured-list-td').spread((nameLabel, name, clusterLabel, cluster, messageLabel, message, statusLabel, status, enforcementLabel, enforcement ) => {
      // verify namespace
      if (policyConfig['namespace']) {
        cy.wrap(name).contains(policyConfig['namespace']+'.'+policyName)
      }
      // verify cluster name
      cy.wrap(cluster).contains(clusterName)
      // verify cluster status
      cy.wrap(status).contains(new RegExp(clusterStatus))
      // verify policy enforcement settings
      policyConfig['enforce'] === true ? cy.wrap(enforcement).contains('enforce') : cy.wrap(enforcement).contains('inform')
      // verify the message
      // first check that the right ammount of messages is listed
      const number_of_messages = (message.textContent.match(/Compliant[,;]/g) || []).length
      const violations = clusterViolations[clusterName]
      expect(number_of_messages).to.equal(violations.length)
      // verify that each violation/compliance message is present
      for (const violation of violations) {
        const templateName = violation.replace(/-[^-]*$/, '')
        const id = violation.replace(/^.*-/, '')
        const clusterStatus2 = getPolicyStatusForViolationId(id, 'short')
        const pattern = violationPatterns[templateName][id]
        if (clusterStatus2 == 'NonCompliant') {
          cy.wrap(message).contains(new RegExp(templateName+': '+clusterStatus2+'; '+pattern))
        } else {
          cy.wrap(message).contains(new RegExp(templateName+': '+clusterStatus2))
        }
      }
    })
  })
}

export const action_verifyPolicyTemplatesInCluster = (policyName, policyConfig, clusterName, clusterViolations) => {
  const violations = clusterViolations[clusterName]
  for (const violation of violations) {
    const templateName = violation.replace(/-[^-]*$/, '')
    const id = violation.replace(/^.*-/, '')
    doTableSearch(templateName, '#policyTemplates-search')
    cy.get('#policyPolicyTemplates-module-id').within(() => {

      cy.get('tbody').children('tr[data-row-name="'+templateName+'"]').find('td').spread((name, api, kind, compliant) => {
        cy.wrap(name).contains(policyName)
        if(policyConfig['apiVersion']) {
          cy.wrap(api).contains(policyConfig['apiVersion'])
        }
        if(policyConfig['kind']) {
          cy.wrap(kind).contains(policyConfig['kind'])
        }
        const clusterStatus = getPolicyStatusForViolationId(id).toLowerCase()
        cy.wrap(compliant).contains(new RegExp(clusterStatus))
        // check status icon
        // FIXME: we are now doing the check only if we know the the status
        if (id != '?') {
          const fillColor = getStatusIconFillColor(clusterStatus)
          cy.wrap(compliant).find('svg').should('have.attr', 'fill', fillColor)
        }
      })
    })
    clearTableSearch('#policyTemplates-search')
  }
}

export const action_verifyPolicyViolationDetailsInCluster = (policyName, policyConfig, clusterName, clusterViolations, violationPatterns) => {
  const violations = clusterViolations[clusterName]
  for (const violation of violations) {
    const templateName = violation.replace(/-[^-]*$/, '')
    const id = violation.replace(/^.*-/, '')
    const pattern = violationPatterns[templateName][id]
    const clusterStatus = getClusterPolicyStatus(violations, 'short')
    doTableSearch(templateName, '#violations-search')
    cy.get('#policyViolations-module-id').within(() => {
      cy.get('tbody').children('tr[data-row-name="'+templateName+'"]').find('td').spread((name, cluster, message, last_update) => {
        // check policy name
        cy.wrap(name).contains(policyName)
        // check cluster name
        cy.wrap(cluster).contains(clusterName)
        // check violation message
        cy.wrap(message).contains(new RegExp(clusterStatus+'[,;] '+pattern))
        // check last results date
        cy.wrap(last_update).contains(timestampRegexp)
      })
    })
    clearTableSearch('#violations-search')
  }
}

export const action_verifyPolicyViolationDetailsInHistory = (templateName, violations, violationPatterns) => {
  cy.get('table[aria-label="Sortable Table"]').within(() => {
    for (const violation of violations) {
      const id = violation.replace(/^.*-/, '')
      const pattern = violationPatterns[templateName][id]
      const policyStatus = getPolicyStatusForViolationId(id)
      // this is tricky, sometimes the message is directly in <td> and sometimes in <span> inside that <td>
      // therefore we will be approaching it via the parent <tr>
      cy.get('td').contains(new RegExp(pattern)).parents('tr').find('td').spread((state, message, timestamp) => {
        cy.wrap(state).contains(new RegExp(policyStatus))
        cy.wrap(timestamp).contains(/^(an?|[0-9]+) (days?|hours?|minutes?|few seconds) ago$/)
      })
    }
  })
}

export const checkNotificationMessage = (kind, title, notification) => {
  cy.get('div[kind="'+kind+'"]').within( () => {
    cy.get('.bx--inline-notification__title').should('contain', title)
    cy.get('svg[fill-rule="evenodd"]').should('exist')
    cy.get('.bx--inline-notification__subtitle').should('contain', notification)
  })
}

export const verifyPolicyTemplateViolationDetailsForCluster = (policyName, policyConfig, clusterName, clusterViolations, violationPatterns) => {
  const violations = clusterViolations[clusterName]
  const clusterStatus = getClusterPolicyStatus(violations, 'short')
  cy.get('div.overview').find('div.pf-c-description-list__text').spread((name, cluster, kind, api, compliant, details) => {
    // check name
    cy.wrap(name).contains(policyName)
    // check cluster name
    cy.wrap(cluster).contains(clusterName)
    // check policy kind
    if (policyConfig['kind']) {
      cy.wrap(kind).contains(policyConfig['kind'])
    }
    // check apiVersion
    if (policyConfig['apiVersion']) {
      cy.wrap(api).contains(policyConfig['apiVersion'])
    }
    // check status
    cy.wrap(compliant).contains(clusterStatus)
    // check details
    for (const violation of violations) {
      const templateName = violation.replace(/-[^-]*$/, '')
      const id = violation.replace(/^.*-/, '')
      const pattern = violationPatterns[templateName][id]
      cy.wrap(details).contains(pattern)
    }
  })
}

export const action_verifyClusterViolationsInListing = (clusterName, violationsCounter = '', violatedPolicies = [], targetStatus = null) => {
  if (targetStatus == null) {
    if (violationsCounter && violationsCounter[0] != '[') {
      targetStatus = violationsCounter.startsWith('0/') ? 1 : 2
    } else {
      targetStatus = 0
    }
  }
  doTableSearch(clusterName)
  cy.get('table[aria-label="Sortable Table"]').within(() => {
    cy.get('a').contains(clusterName).parents('td').siblings('td')
    .spread((namespace, violations, policies) => {
      // FIXME: skip namespace
      // check the violation status
      if ([1,2].includes(targetStatus)) {
        cy.wrap(violations).find('svg').then((elems) => {
          if (elems.length === 1) {
            expect(getStatusIconFillColor(targetStatus)).to.equal(elems[0].getAttribute('fill').trim().toLowerCase())
          }
        })
      }
      // check the cluster violations counter value
      if (violationsCounter) {
        cy.wrap(violations.textContent).should('match', new RegExp('^'+violationsCounter+'$'))
      } else {
        cy.wrap(violations.textContent).should('match', /^[0-9]+\/[0-9]+$/)
      }
      // check violated policies
      // in fact there is no sense checking it precisely since policy listing woudl be truncated in the UI
      if (violatedPolicies.length > 0) {
        if (policies.textContent.includes('...')) {  // policy listing is truncated
          const [prefix, suffix] = policies.textContent.split('...', 2)
          const allPolicies = violatedPolicies.join()
          expect(allPolicies).to.contain(prefix)
          expect(allPolicies).to.contain(suffix)
        } else {  // listing is not truncated
          for (const policyName of violatedPolicies) {
            cy.wrap(policies).contains(policyName)
          }
        }
      }
    })
  })
  clearTableSearch()
}

export const getClusterViolationsCounterAndPolicyList = (clusterName, clusterList, confFileViolations, confPolicies) => {
  let counter = 0
  const violatedPolicies = []
  let violationCounter = ''

  // first we need to find out the proper violationsCounter value by counting violated policies
  for (const policyName in confPolicies) {
    // we need to do the substitution per policy
    const confClusterViolations = getConfigObject(confFileViolations, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
    // in theory there could be multiple violations found by one policy
    // also, if the policy has multiple specifications there could be even multiple compliances
    for (const violation of clusterViolations[clusterName]) {
      const id = violation.replace(/^.*-/, '')
      if (id == '?') { // unspecific violation, we won't ever know exact value of violationCounter
        counter = '?'
      } else if (counter != '?' && id[0] != '0') {  // if there is an actual violation (non-zero ID)
        counter = counter + 1
        violatedPolicies.push(policyName)
        break  // stop checking this policy
      }
    }
  }
  // now build a regexp for violationCounter based on counter and violatedPolicies
  if (counter == '?') {
    violationCounter = '[0-9]+/' + Object.keys(confPolicies).length.toString()
  } else {
    violationCounter = counter.toString() + '/' + Object.keys(confPolicies).length.toString()
  }
  return [ violationCounter, violatedPolicies]
}
