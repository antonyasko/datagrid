import React, { PureComponent } from 'react';
import TableHead from './TableHead/tableHead';
import TableBody from './TableBody/tableBody';

import dataTable from '../data12.json';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.options = [
      '№',
      'Full Name',
      'Age',
      'Place of residence',
      'Gender',
      'E-mail',
      'On vacation',
    ];
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>List of EPAM employees</h1>
        </header>
        <main className="main">
          <table className="table">
            <TableHead dataTable={dataTable} />
            <TableBody dataTable={dataTable} />
          </table>
        </main>
      </div>
    );
  }
}

export default App;
