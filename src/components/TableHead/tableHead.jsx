/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import arrowIcon from '../../../assets/icons/arrow.svg';
import arrowEmptyIcon from '../../../assets/icons/arrow-empty.svg';
import searchIcon from '../../../assets/icons/search.svg';

import './tableHead.scss';

export default class TableHead extends PureComponent {
  render() {
    const { dataTable } = this.props;

    return (
      <thead>
        <tr className="option-list">
          {Object.keys(dataTable[0]).map(option => {
            return (
              <th key={option} className="option-item">
                <button type="button" className="sort-button">
                  <p className="option-title">{option}</p>
                  <div className="arrows">
                    <img className="up-arrow-icon" src={arrowEmptyIcon} alt="up-arrow" />
                    <img className="down-arrow-icon" src={arrowEmptyIcon} alt="down-arrow" />
                  </div>
                </button>
                <button type="button" className="search-button">
                  <img className="search-icon" src={searchIcon} alt="search" />
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHead.propTypes = {
  dataTable: PropTypes.array.isRequired,
};
