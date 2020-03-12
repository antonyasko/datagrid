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
  const { searchValues } = props;

  const fieldsWithSearchValues = Object.keys(searchValues).filter(field => !!searchValues[field]);
  const dataToShow = fieldsWithSearchValues.length
    ? dataTable.filter(obj =>
        fieldsWithSearchValues.every(field => {
          return typeof obj[field] === 'number'
            ? String(obj[field]).indexOf(searchValues[field]) === 0
            : obj[field].toUpperCase().indexOf(searchValues[field].toUpperCase()) === 0;
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
