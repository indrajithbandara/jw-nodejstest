import React, {Component, PropTypes} from 'react';
import {HistoryHandle} from '../../utils/router_helper';

class LoginPage extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  _login = (e) => {
    HistoryHandle.replace('/main/0/resvcenter');
  }

  render() {
    return (
      <div className="loginpage" onClick={this._login}>MyComponent</div>
    );
  }
}

export default LoginPage;
