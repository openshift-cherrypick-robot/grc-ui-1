/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import renderer from 'react-test-renderer'
import React from 'react'
import PatternFlyTable from '../../../../src-web/components/common/PatternFlyTable'
import { SortByDirection } from '@patternfly/react-table'
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon'
import CodeIcon from '@patternfly/react-icons/dist/js/icons/code-icon'

const tableData = {
  columns: [
    { title: 'Repositories' },
    'Branches',
    { title: 'Pull requests' },
    'Workspaces',
    'Last Commit'
  ],
  rows: [['one', 'two', 'a', 'four', 'five'], ['a', 'two', 'k', 'four', 'five'], ['p', 'two', 'b', 'four', 'five']],
  sortBy: {}
}

const tableDataTests = {
  arrayLarge: {
    rows: [
      ['one', 'two', 'a', 'four', 'one'],   ['a', 'two', 'k', 'four', 'two'],    ['p', 'two', 'b', 'four', 'three'],
      ['one', 'two', 'a', 'four', 'four'],  ['a', 'two', 'k', 'four', 'five'],   ['p', 'two', 'b', 'four', 'six'],
      ['one', 'two', 'a', 'four', 'seven'], ['a', 'two', 'k', 'four', 'eight'],  ['p', 'two', 'b', 'four', 'nine'],
      ['one', 'two', 'a', 'four', 'ten'],   ['a', 'two', 'k', 'four', 'eleven'], ['p', 'two', 'b', 'four', 'twelve'],
    ],
  },
  arrayIRowHTMLwCells: {
    rows: [
      {
        cells: [
          { title: <a href="#">siemur/test-space3</a>, props: { component: 'th' } },
          { title: (<React.Fragment><CodeBranchIcon key="icon" /> 7</React.Fragment>) },
          { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
          { title: <a href="#">Open in Github</a> },
          { title: '20 minutes' }]
      },
      {
        cells: [
          { title: <a href="#">siemur/test-space1</a>, props: { component: 'th' } },
          { title: (<React.Fragment><CodeBranchIcon key="icon" /> 10</React.Fragment>) },
          { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
          { title: <a href="#">Open in Github</a> },
          { title: '22 minutes' }]
      },
      {
        cells: [
          { title: <a href="#">siemur/test-space2</a>, props: { component: 'th' } },
          { title: (<React.Fragment><CodeBranchIcon key="icon" /> 3</React.Fragment>) },
          { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
          { title: <a href="#">Open in Github</a> },
          { title: '21 minutes' }]
      }
    ],
  },
  arrayIRowHTMLwoCells: {
    rows: [
      [
        { title: <a href="#">siemur/test-space3</a>, props: { component: 'th' } },
        { title: (<React.Fragment><CodeBranchIcon key="icon" /> 7</React.Fragment>) },
        { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
        { title: <a href="#">Open in Github</a> },
        '20 minutes',
      ],
      [
        { title: <a href="#">siemur/test-space1</a>, props: { component: 'th' } },
        { title: (<React.Fragment><CodeBranchIcon key="icon" /> 10</React.Fragment>) },
        { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
        { title: <a href="#">Open in Github</a> },
        '22 minutes'
      ],
      [
        { title: <a href="#">siemur/test-space2</a>, props: { component: 'th' } },
        { title: (<React.Fragment><CodeBranchIcon key="icon" /> 3</React.Fragment>) },
        { title: (<React.Fragment><CodeIcon key="icon" /> 4</React.Fragment>) },
        { title: <a href="#">Open in Github</a> },
        '21 minutes'
      ]
    ],
  }
}

describe('PatternFlyTable component', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <PatternFlyTable {...tableData} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('PatternFlyTable component', () => {
  it('renders empty state', () => {
    const component = renderer.create(
      <PatternFlyTable columns={tableData.columns} sortBy={tableData.sortBy} rows={[]} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('PatternFlyTable table sorting and filtering', () => {
  const filterSort = PatternFlyTable.getDerivedStateFromProps
  const state = {
    startIdx: 0,
    endIdx: 10,
  }
  it('should show the first 10 rows of a large table paginated', () => {
    expect(filterSort({pagination: true, ...tableDataTests.arrayLarge}, {...state, sortBy:{}}).rows.length).toEqual(10)
  })
  it('should show all rows of a large table unpaginated', () => {
    expect(filterSort({pagination: false, ...tableDataTests.arrayLarge}, {...state, sortBy:{}}).rows.length).toEqual(12)
  })
  it('should return no values given nonexistent filter for string values', () => {
    expect(filterSort({searchable: true, ...tableDataTests.arrayLarge}, {...state, searchState:'not here', sortBy:{}}).rows.length).toEqual(0)
  })
  it('should return expected values given existent filter for string values', () => {
    expect(filterSort({searchable: true, ...tableDataTests.arrayLarge}, {...state, searchState:'b', sortBy:{}})).toMatchSnapshot()
  })
  it('should filter text contained in React components with cells', () => {
    expect(filterSort({searchable: true, ...tableDataTests.arrayIRowHTMLwCells}, {...state, searchState:'space1', sortBy:{}})).toMatchSnapshot()
  })
  it('should filter text contained in React components without cells', () => {
    expect(filterSort({searchable: true, ...tableDataTests.arrayIRowHTMLwoCells}, {...state, searchState:'space1', sortBy:{}})).toMatchSnapshot()
  })
  it('should sort rows by ascending strings in column 5', () => {
    expect(filterSort({...tableDataTests.arrayLarge}, {...state, sortBy:{index: 4, direction: SortByDirection.asc}})).toMatchSnapshot()
  })
  it('should sort rows by descending strings in column 5', () => {
    expect(filterSort({...tableDataTests.arrayLarge}, {...state, sortBy:{index: 4, direction: SortByDirection.desc}})).toMatchSnapshot()
  })
  it('should not move equivalent string rows while sorting column 4', () => {
    expect(filterSort({...tableDataTests.arrayLarge}, {...state, sortBy:{index: 3, direction: SortByDirection.asc}})).toMatchSnapshot()
  })
  it('should sort rows by ascending React/HTML in column 1', () => {
    expect(filterSort({...tableDataTests.arrayIRowHTMLwCells}, {...state, sortBy:{index: 0, direction: SortByDirection.asc}})).toMatchSnapshot()
  })
  it('should sort rows by descending React/HTML in column 1', () => {
    expect(filterSort({...tableDataTests.arrayIRowHTMLwCells}, {...state, sortBy:{index: 0, direction: SortByDirection.desc}})).toMatchSnapshot()
  })
  it('should not move equivalent React/HTML rows while sorting column 4', () => {
    expect(filterSort({...tableDataTests.arrayIRowHTMLwCells}, {...state, sortBy:{index: 3, direction: SortByDirection.asc}})).toMatchSnapshot()
  })
  it('should sort rows by ascending strings in mixed table in column 5', () => {
    expect(filterSort({...tableDataTests.arrayIRowHTMLwCells}, {...state, sortBy:{index: 4, direction: SortByDirection.asc}})).toMatchSnapshot()
  })
})
