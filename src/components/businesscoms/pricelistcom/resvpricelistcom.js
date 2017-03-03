import React, { Component, PropTypes } from 'react';
import {is} from 'immutable';
import {connect} from 'dva';

// lib
import {HistoryHandle} from '../../../utils/router_helper';
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';

// 拼接传入的数据对象
function mapStateToProps({resvpricelistmodel}) {
  return {resvpricelistmodel};
}

// 实现上下文数据绑定注解
@connect(mapStateToProps, null, null, {withRef: true})
// 组件基本功能注解
@BaseComponet
// 实现多任务多窗口注解
@MultiTaskComponent
// 创建组件
class ResvPriceListCom extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props)
    this.state={

    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  shouldComponentUpdate (nextProps, nextState) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }

  render() {
    return (
      <div>MyComponent</div>
    );
  }
}

export default ResvPriceListCom;
