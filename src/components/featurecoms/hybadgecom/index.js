/**
 * 标记组件
 * -Props-
 * BadgeMsg：标签内容
 * CustomClassName:自定义样式
 * CustomStyle:自定义行内样式
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';

// lib
import {BaseComponet} from '../../../utils/component_helper';


@BaseComponet
// 创建组件
class HyBadgeCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    // 生成组件样式
    const _className = `badge ${this.CustomClassName}`;
    return (
      <span className={_className} style={this.props.CustomStyle}>{this.props.BadgeMsg}</span>
    );
  }
}

export default HyBadgeCom;
