/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import dataTable from '../../data.json';

document.body.addEventListener('keydown', e => {
  if (e.code === 'Delete') {
    const activeRows = document.body.getElementsByClassName('active-row');
    if (activeRows.length !== 0) {
      Array.from(activeRows).forEach(item => item.remove());
    }
  }
});

function makeActive(e) {
  const { target } = e;
  const nodeClass = target.parentNode.classList;
  if (target.tagName === 'TD') {
    nodeClass.contains('active-row') ? nodeClass.remove('active-row') : nodeClass.add('active-row');
  }
}

const Table = props => {
  const { searchValues } = props;

  const fieldsWithSearchValues = Object.keys(searchValues).filter(field => !!searchValues[field]);
  const dataToShow = fieldsWithSearchValues.length
    ? dataTable.filter(obj =>
        fieldsWithSearchValues.every(field => {
          if (typeof obj[field] === 'number') {
            return String(obj[field]).indexOf(searchValues[field]) === 0;
          }
          return obj[field].toUpperCase().indexOf(searchValues[field].toUpperCase()) === 0;
        })
      )
    : dataTable;

  return (
    <table>
      <tbody>
        {dataToShow.map((employee, index) => {
          return (
            <tr key={dataToShow[index].id} className="employee-options" onClick={makeActive}>
              {Object.values(dataToShow[index]).map((option, i) => {
                return (
                  <td key={`td${i}`} className="employee-item">
                    {option}
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
  return {
    searchValues: mainReducer.searchValues,
  };
};

export default connect(mapStateToProps, {})(Table);
