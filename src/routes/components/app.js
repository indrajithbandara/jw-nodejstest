import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';


// 拼接传入的数据对象
function mapStateToProps({AuthModel, SystemMessage}) {
  return {AuthModel, SystemMessage};
}

@connect(mapStateToProps, null, null, {withRef: true})
class App extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {pathname} = this.props.location
    return (
      <div className="appframe">
        {this.props.children || '测试首页'}
      </div>
    );
  }
}

module.exports = App;
