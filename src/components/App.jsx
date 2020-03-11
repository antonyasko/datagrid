import React, { PureComponent } from 'react';
import TableHead from './TableHead/tableHead';

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>List of EPAM employees</h1>
        </header>
        <main id="main">
          <TableHead />
          <div id="rows" />
        </main>
      </div>
    );
  }
}

export default App;
