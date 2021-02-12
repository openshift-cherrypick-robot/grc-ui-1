/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

import { checkItems, verifyItemsChecked } from '../views/common'

const specificationsList = ['CertificatePolicy', 'EtcdEncryption']
const selectSpecsQuery = '.bx--multi-select[aria-label="specs"]'
const standardsList = ['NIST-CSF']
const selectStandardsQuery = '.bx--multi-select[aria-label="standards"]'
const categoriesList = ['PR.DS Data Security']
const selectCategoriesQuery = '.bx--multi-select[aria-label="categories"]'
const controlsList = ['PR.DS-1 Data-at-rest', 'PR.DS-2 Data-in-transit']
const selectControlsQuery = '.bx--multi-select[aria-label="controls"]'
const itemQuery = 'input[type="checkbox"]'
const labelQuery = '.bx--checkbox-label'

describe('RHACM4K-1671 - GRC UI: [P2][Sev2][policy-grc] Test create policy multi-select acts correctly', () => {

  it('Access the Create policy page', () => {
    cy.FromGRCToCreatePolicyPage()
  })

  it(`Check Specifications ${specificationsList}`, () => {
    cy.then(() => {
      // while we could use only selectItems() which does both the check and verification, better be explicit here about both steps
      checkItems(specificationsList, selectSpecsQuery, itemQuery, labelQuery)
    })
  })

  it(`Verify Specifications ${specificationsList} are selected`, () => {
    cy.then(() => {
      verifyItemsChecked(specificationsList, selectSpecsQuery, itemQuery, labelQuery)
    })
  })

  it(`Verify Standard ${standardsList} has been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(standardsList, selectStandardsQuery, itemQuery, labelQuery)
    })
  })

  it(`Verify Category ${categoriesList} has been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(categoriesList, selectCategoriesQuery, itemQuery, labelQuery)
    })
  })

  it(`Verify Controls ${controlsList} have been pre-selected`, () => {
    cy.then(() => {
      verifyItemsChecked(controlsList, selectControlsQuery, itemQuery, labelQuery)
    })
  })

})
