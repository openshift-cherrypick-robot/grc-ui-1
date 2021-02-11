/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

const closeMenuQuery = 'svg[aria-label="Close menu"]'
const clearAllBtnQuery = 'svg[aria-label="Clear all selected items"]'
const selectItemQuery = 'input[type="checkbox"]'

export const pageLoader = {
  shouldExist: () => cy.get('.patternfly-spinner', { timeout: 20000 }).should('exist')  ,
  shouldNotExist: () => cy.get('.patternfly-spinner', { timeout: 20000 }).should('not.exist')
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
