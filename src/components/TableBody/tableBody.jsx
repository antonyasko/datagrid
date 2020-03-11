import React from 'react';
import { FixedSizeList as List } from 'react-window';
import Table from './table';
import './tableBody.scss';

const windowHeight = document.documentElement.clientHeight;

const TableRows = () => (
  <List height={windowHeight - 225} itemCount={1} itemSize={42} width={1385}>
    {Table}
  </List>
);

export default TableRows;
