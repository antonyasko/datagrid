/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React from 'react';

import { connect } from 'react-redux';

import dataTable from '../../data.json';

const rowsState = { ctrl: false };

document.body.addEventListener('keydown', e => {
  if (e.key === 'Delete') {
    const activeRows = Array.from(document.body.getElementsByClassName('active-row'));
    if (activeRows.length !== 0) activeRows.forEach(item => item.remove());
  }
  if (e.key === 'Control') rowsState.ctrl = true;
});

document.body.addEventListener('keyup', e => {
  if (e.key === 'Control') rowsState.ctrl = false;
});

function makeActiveRow(e) {
  const { currentTarget } = e;
  const nodeClass = currentTarget.classList;
  const activeRows = Array.from(document.body.getElementsByClassName('active-row'));

  if (activeRows.length === 0) {
    nodeClass.add('active-row');
  } else if (activeRows.length === 1) {
    if (rowsState.ctrl) {
      nodeClass.contains('active-row')
        ? nodeClass.remove('active-row')
        : nodeClass.add('active-row');
    } else {
      nodeClass.contains('active-row')
        ? nodeClass.remove('active-row')
        : (activeRows.forEach(item => item.classList.remove('active-row')),
          nodeClass.add('active-row'));
    }
  } else if (activeRows.length > 1) {
    if (rowsState.ctrl) {
      nodeClass.contains('active-row')
        ? nodeClass.remove('active-row')
        : nodeClass.add('active-row');
    } else {
      activeRows.forEach(item => item.classList.remove('active-row'));
      nodeClass.contains('active-row')
        ? nodeClass.remove('active-row')
        : nodeClass.add('active-row');
    }
  }
}

const Table = props => {
  const { searchValues, inVacation } = props;

  const dataWithVacation = inVacation ? dataTable : dataTable.filter(obj => obj.vacation === false);

  const fieldsWithSearchValues = Object.keys(searchValues).filter(field => !!searchValues[field]);
  const dataToShow = fieldsWithSearchValues.length
    ? dataWithVacation.filter(obj =>
        fieldsWithSearchValues.every(field => {
          return typeof obj[field] === 'number'
            ? String(obj[field]).indexOf(searchValues[field]) === 0
            : obj[field].toUpperCase().indexOf(searchValues[field].toUpperCase()) === 0;
        })
      )
    : dataWithVacation;

  const { sortField, sortFieldCounter } = props;

  let sortedTableData;

  if (sortFieldCounter % 3 === 0) {
    sortedTableData = dataToShow.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else if (sortFieldCounter % 3 === 1) {
    sortedTableData = dataToShow.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
  } else if (sortFieldCounter % 3 === 2) {
    sortedTableData = dataToShow.sort((a, b) => (a[sortField] < b[sortField] ? 1 : -1));
  }

  return sortedTableData.map((employee, index) => {
    return (
      <div
        key={sortedTableData[index].id}
        className="employee-options table-row"
        onClick={makeActiveRow}
      >
        {Object.values(sortedTableData[index]).map((option, i) => {
          return (
            <div key={`td${i}`} className="employee-item">
              {typeof option !== 'boolean' ? option : option === true ? 'Yes' : 'No'}
            </div>
          );
        })}
      </div>
    );
  });
};

const mapStateToProps = ({ mainReducer }) => {
  const { searchValues, sortField, sortFieldCounter, virtualization, inVacation } = mainReducer;

  return {
    sortField,
    sortFieldCounter,
    searchValues,
    virtualization,
    inVacation,
  };
};

export default connect(mapStateToProps, {})(Table);
