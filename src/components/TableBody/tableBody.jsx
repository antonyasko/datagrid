/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './tableBody.scss';

export default class TableBody extends PureComponent {
  render() {
    const { dataTable } = this.props;

    return (
      <tbody>
        {dataTable.map((employee, index) => {
          return (
            <tr key={dataTable[index].id} className="employee-options">
              {Object.values(dataTable[index]).map(option => {
                return (
                  <td key={option} className="employee-item">
                    {option}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  dataTable: PropTypes.array.isRequired,
};
