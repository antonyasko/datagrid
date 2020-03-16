import React, { PureComponent } from 'react';
import './exporterCSV.scss';

export default class ExporterCSV extends PureComponent {
  constructor(props) {
    super(props);

    this.exportToCSV = this.exportToCSV.bind(this);
  }

  parseCell = tableCell => {
    let parsedValue = tableCell.textContent;

    parsedValue = parsedValue.replace(/"/g, `""`);
    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

    return parsedValue;
  };

  exportToCSV = () => {
    const csvOutput = this.convertToCSV();
    const csvBlob = new Blob([csvOutput], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement('a');

    anchorElement.href = blobUrl;
    anchorElement.download = 'table.csv';
    anchorElement.click();

    URL.revokeObjectURL(blobUrl);
  };

  convertToCSV = () => {
    const lines = [];
    const rowHead = Array.from(document.body.getElementsByClassName('option-list'));
    const rowsBody = Array.from(document.body.getElementsByClassName('table-row'));
    const numCols = rowsBody[0].getElementsByClassName('table-cell').length;

    let lineHead = '';
    for (let i = 0; i < numCols; i += 1) {
      if (rowHead[0].children[i] !== undefined) lineHead += this.parseCell(rowHead[0].children[i]);
      lineHead += i !== numCols - 1 ? ';' : '';
    }
    lines.push(lineHead);

    rowsBody.forEach(rowBody => {
      let lineBody = '';
      for (let i = 0; i < numCols; i += 1) {
        if (rowBody.children[i] !== undefined) lineBody += this.parseCell(rowBody.children[i]);
        lineBody += i !== numCols - 1 ? ';' : '';
      }
      lines.push(lineBody);
    });

    return lines.join('\n');
  };

  render() {
    return (
      <button type="button" id="export-csv" onClick={this.exportToCSV}>
        Export to CSV
      </button>
    );
  }
}
