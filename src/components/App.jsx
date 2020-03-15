import React, { PureComponent } from 'react';
import TableHead from './TableHead/tableHead';
import ExporterCSV from './ExporterCSV/exporterCSV';
import Virtualizer from './Virtualizer/virtualizer';

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>List of EPAM employees</h1>
        </header>
        <main id="main">
          <form id="useful-buttons">
            <ExporterCSV />
            <Virtualizer />
          </form>
          <TableHead />
          <div id="rows" />
        </main>
      </div>
    );
  }
}

export default App;
