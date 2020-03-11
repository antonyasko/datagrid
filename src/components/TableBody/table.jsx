/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import dataTable from '../../data.json';

const Table = props => {
  const { searchValues } = props;
  const fieldsWithSearchValues = Object.keys(searchValues).filter(field => !!searchValues[field]);
  const dataToShow = fieldsWithSearchValues.length
    ? dataTable.filter(obj =>
        fieldsWithSearchValues.every(field => {
          if (typeof obj[field] === 'number') {
            return String(obj[field]).includes(searchValues[field]);
          }
          return obj[field].toUpperCase().includes(searchValues[field].toUpperCase());
        })
      )
    : dataTable;

  return (
    <table>
      <tbody>
        {dataToShow.map((employee, index) => {
          return (
            <tr key={dataToShow[index].id} className="employee-options">
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
