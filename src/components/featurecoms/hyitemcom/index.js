/**
 * 列表项目组件
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * Islink:是否采用A标签 bool
 * ItemText:项目内显示的文字信息 string
 * BadgeMsg：标签内容 string
 * ItemClickEvent:项目点击事件 function
 * ItemIndex:项目索引
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';

// lib
import {BaseComponet} from '../../../utils/component_helper';

// component
import HyBadgeCom from '../hybadgecom';

// 组件基本功能注解
@BaseComponet
// 创建组件
class HyItemCom extends Component {
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

  _itemClickEvent = (sender, obj) => {
    if (this.props.ItemClickEvent) {
      obj.itemindex = this.props.ItemIndex;
      this.props.ItemClickEvent(sender, obj);
    }
  }

  render() {
    // 生成组件样式
    const _className = `list-group-item ${this.CustomClassName}`;
    //判断当前props.children是否有值，如过有使用children做为内容展示，否则根据逻辑生成
    let _content;
    let _current;
    let _badge;
    if (this.props.children) {
      _content = this.props.children;
      _badge = '';
    } else {
      _badge = this.props.BadgeMsg
        ? <HyBadgeCom BadgeMsg={this.props.BadgeMsg}/>
        : '';
      _content = this.props.ItemText;
    }
    if (_content && this.props.Islink) {
      _current = <li className={_className} onClick={this._itemClickEvent} style={this.props.CustomStyle}>{_content}</li>;
    } else if (_content && !this.props.Islink) {
      _current = <li className={_className} onClick={this._itemClickEvent} style={this.props.CustomStyle}>{_badge}{_content}</li>;
    } else {
      _current = null;
    }
    return _current;
  }
}

export default HyItemCom;
