import React from 'react';
import { FixedSizeList } from 'react-window';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from './table';

import './tableBody.scss';

const windowHeight = document.documentElement.clientHeight;
const marginTop = 300;
const tableBodyHeight = windowHeight - marginTop;

const TableRows = props => {
  const { virtualization } = props;

  return (
    <div cellSpacing="0" className="table">
      <div id="data-table" className="table-body">
        {!virtualization ? (
          <div id="data-table" className="table-body">
            <FixedSizeList
              height={tableBodyHeight}
              itemCount={1000}
              itemSize={42}
              width={1385}
            >
              {Table}
            </FixedSizeList>
          </div>
        ) : (
          <div
            id="data-table"
            className="table-body"
            style={{ overflowY: 'scroll', height: `${tableBodyHeight}px` }}
          >
            <Table />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ mainReducer }) => {
  const { virtualization } = mainReducer;

  return {
    virtualization,
  };
};

TableRows.propTypes = {
  virtualization: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {})(TableRows);
