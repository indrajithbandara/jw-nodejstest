import React, { Component, PropTypes } from 'react';

import {HyInputCom} from '../../../../components/featurecoms';

class C30000101 extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    return (
      <div>
        MyComponent
        {this.props.children}
      </div>
    );
  }
}

module.exports = C30000101;
