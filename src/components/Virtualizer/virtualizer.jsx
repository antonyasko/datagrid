import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setVirtualization } from '../../../actions';

import './virtualizer.scss';

class Virtualizer extends PureComponent {
  constructor(props) {
    super(props);

    this.changeVirtualization = this.changeVirtualization.bind(this);
  }

  changeVirtualization = () => {
    const { virtualization, setVirtualization } = this.props;
    setVirtualization(!virtualization);
  };

  render() {
    const { virtualization } = this.props;

    return (
      <div id="virtualizer-block">
        <p id="virtualizer-title">Virtualization:</p>
        <input
          type="checkbox"
          checked={virtualization}
          id="toggle-virtualizer"
          className="toggle-button"
          onChange={this.changeVirtualization}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ mainReducer }) => {
  return { virtualization: mainReducer.virtualization };
};

export default connect(mapStateToProps, {
  setVirtualization,
})(Virtualizer);
