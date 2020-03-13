import React, { PureComponent } from 'react';
import TableHead from './TableHead/tableHead';
import ExporterCSV from './ExporterCSV/exporterCSV';

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>List of EPAM employees</h1>
        </header>
        <main id="main">
          <ExporterCSV />
          <TableHead />
          <div id="rows" />
        </main>
      </div>
    );
  }
}

export default App;
