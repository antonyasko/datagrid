/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
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

function makeActive(e) {
  const { target } = e;
  const nodeClass = target.parentNode.classList;
  const activeRows = Array.from(document.body.getElementsByClassName('active-row'));

  if (target.tagName === 'TD') {
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

  const { sortField } = props;
  const sortedTableData = sortField
    ? dataToShow.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1))
    : dataToShow;

  return (
    <table cellSpacing="0">
      <tbody id="data-table">
        {sortedTableData.map((employee, index) => {
          return (
            <tr key={sortedTableData[index].id} className="employee-options" onClick={makeActive}>
              {Object.values(sortedTableData[index]).map((option, i) => {
                return (
                  <td key={`td${i}`} className="employee-item">
                    {typeof option !== 'boolean' ? option : option === true ? 'Yes' : 'No'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = ({ mainReducer }) => {
  const { searchValues, sortField, virtualization, inVacation } = mainReducer;

  return {
    sortField,
    searchValues,
    virtualization,
    inVacation,
  };
};

export default connect(mapStateToProps, {})(Table);
