/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setSortField, setOneOfSearchValues, setVacation } from '../../../actions';
import dataTable from '../../data.json';
import arrowEmptyIcon from '../../../assets/icons/arrow-empty.svg';
import searchIcon from '../../../assets/icons/search.svg';
import searchFilterIcon from '../../../assets/icons/search-filter.svg';
import closeIcon from '../../../assets/icons/close.svg';
import '../../../node_modules/bootstrap-toggle/css/bootstrap-toggle.css';

import './tableHead.scss';

class TableHead extends PureComponent {
  constructor(props) {
    super(props);

    this.showSearchBar = this.showSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortValues = this.sortValues.bind(this);
    this.showInVacation = this.showInVacation.bind(this);
  }

  showSearchBar = event => {
    const { target } = event;
    document.getElementsByClassName('search-bar')[Number(`${target.id.slice(7)}`)].style.display =
      'flex';
    document.getElementsByClassName('buttons-block')[
      Number(`${target.id.slice(7)}`)
    ].style.marginTop = '0px';
  };

  closeSearchBar = event => {
    const { target } = event;
    document.getElementsByClassName('search-bar')[Number(`${target.id.slice(6)}`)].style.display =
      'none';
    document.getElementsByClassName('buttons-block')[
      Number(`${target.id.slice(6)}`)
    ].style.marginTop = '48px';
  };

  handleSearch = event => {
    const { setOneOfSearchValues } = this.props;
    setOneOfSearchValues(event.target.value, event.target.getAttribute('option'));
    document.getElementById(`search-${event.target.id.slice(13)}`).style.background =
      event.target.value === '' ? `url(${searchIcon})` : `url(${searchFilterIcon})`;
  };

  sortValues = event => {
    const { setSortField } = this.props;
    const option = event.currentTarget.getAttribute('option');
    setSortField(option);
  };

  showInVacation = () => {
    const { inVacation, setVacation } = this.props;
    setVacation(!inVacation);
  };

  render() {
    const { inVacation, searchValues } = this.props;

    return (
      <div className="option-list">
        {Object.keys(dataTable[0]).map((option, index) => {
          return option === 'vacation' ? (
            <div key={option} className="option-item checkbox">
              <p>{option}</p>
              <input
                type="checkbox"
                checked={inVacation}
                id="toggle-vacation"
                className="toggle-button"
                onChange={this.showInVacation}
              />
            </div>
          ) : (
            <div key={option} className="option-item">
              <form className="search-bar">
                <input
                  className="search-field"
                  id={`search-field-${index}`}
                  type="text"
                  placeholder={option}
                  value={searchValues[option] || ''}
                  onChange={this.handleSearch}
                  option={option}
                />
                <button
                  type="button"
                  className="close-button"
                  onClick={this.closeSearchBar}
                  id={`close-${index}`}
                  style={{ background: `url(${closeIcon})` }}
                />
              </form>
              <div className="buttons-block">
                <button
                  type="button"
                  id={`sort-${index}`}
                  className="sort-button"
                  onClick={this.sortValues}
                  option={option}
                >
                  <p className="option-title">{option}</p>
                  <div className="arrows">
                    <img className="up-arrow-icon" src={arrowEmptyIcon} alt="up-arrow" />
                    <img className="down-arrow-icon" src={arrowEmptyIcon} alt="down-arrow" />
                  </div>
                </button>
                <button
                  type="button"
                  className="search-button"
                  onClick={this.showSearchBar}
                  id={`search-${index}`}
                  style={{ background: `url(${searchIcon})` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ mainReducer }) => {
  return {
    searchValues: mainReducer.searchValues,
    inVacation: mainReducer.inVacation,
  };
};

export default connect(mapStateToProps, {
  setSortField,
  setOneOfSearchValues,
  setVacation,
})(TableHead);
