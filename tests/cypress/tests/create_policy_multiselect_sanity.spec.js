/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { checkItems, verifyItemsChecked } from '../support/views'

const specificationsList = ['CertificatePolicy', 'EtcdEncryption']
const selectSpecsQuery = '.pf-c-select__toggle-button[aria-label="specs"]'
const standardsList = ['NIST-CSF']
const selectStandardsQuery = '.pf-c-select__toggle-button[aria-label="standards"]'
const categoriesList = ['PR.DS Data Security']
const selectCategoriesQuery = '.pf-c-select__toggle-button[aria-label="categories"]'
const controlsList = ['PR.DS-1 Data-at-rest', 'PR.DS-2 Data-in-transit']
const selectControlsQuery = '.pf-c-select__toggle-button[aria-label="controls"]'
const itemQuery = '.pf-c-select__menu-item'

describeT('RHACM4K-1671 - GRC UI: [P2][Sev2][policy-grc] Test create policy multi-select acts correctly', () => {

  it('Access the Create policy page', () => {
    cy.FromGRCToCreatePolicyPage()
  })

  it(`Check Specifications ${specificationsList}`, () => {
    cy.then(() => {
      // while we could use only selectItems() which does both the check and verification, better be explicit here about both steps
      checkItems(specificationsList, selectSpecsQuery, itemQuery)
    })
  })

  it(`Verify Specifications ${specificationsList} are selected`, () => {
    cy.then(() => {
      verifyItemsChecked(specificationsList, selectSpecsQuery)
    })
  })

  it(`Verify Standard ${standardsList} has been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(standardsList, selectStandardsQuery)
    })
  })

  it(`Verify Category ${categoriesList} has been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(categoriesList, selectCategoriesQuery)
    })
  })

  it(`Verify Controls ${controlsList} have been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(controlsList, selectControlsQuery)
    })
  })

})
