/* eslint-disable react/prop-types */
import React from 'react';
import { FixedSizeList } from 'react-window';
import { connect } from 'react-redux';

import Table from './table';
import './tableBody.scss';

const windowHeight = document.documentElement.clientHeight;

const TableRows = props => {
  const { virtualization } = props;

  return virtualization ? (
    <FixedSizeList height={windowHeight - 300} itemCount={1} itemSize={42} width={1385}>
      {Table}
    </FixedSizeList>
  ) : (
    <div style={{ background: 'green' }}>qqq</div>
  );
};

const mapStateToProps = ({ mainReducer }) => {
  const { virtualization } = mainReducer;

  return {
    virtualization,
  };
};

export default connect(mapStateToProps, {})(TableRows);
