import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from './table';

import './tableBody.scss';

const LOADING = 1;
const LOADED = 2;
const itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index += 1) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index += 1) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 500)
  );
};

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
            <>
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={1000}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    className="List"
                    height={tableBodyHeight}
                    itemCount={1000}
                    itemSize={42}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={1385}
                  >
                    {Table}
                  </List>
                )}
              </InfiniteLoader>
            </>
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

//        {!virtualization ? (
//          <div id="data-table" className="table-body">
//            <FixedSizeList height={tableBodyHeight} itemCount={1000} itemSize={42} width={1385}>
//              {Table}
//            </FixedSizeList>
//          </div>
//        ) : (
//          <div
//            id="data-table"
//            className="table-body"
//            style={{ overflowY: 'scroll', height: `${tableBodyHeight}px` }}
//          >
//            <Table />
//          </div>
//        )}

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
