/**
 * 提示组件
 * -Props-
 *
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {is} from 'immutable';
import {BaseComponet} from '../../../utils/component_helper';
import _ from 'lodash';

// 组件基础功能注解
@BaseComponet
class HyToolTipCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // let thiscom=this.refs.tooltip_div?this.refs.tooltip_div.getDOMNode():null;
    // let _this=this;
  }

  componentDidUpdate() {
    let _thiscom = this.refs.tooltip_div;
    let _thisparentcom = this.refs.tooltip_div
      ? this.refs.tooltip_div.parentNode
      : null;
    let _controlcom = null;
    if (_thisparentcom) {
      _controlcom = _.find(_thisparentcom.childNodes, (node) => {
        return _.startsWith(node.className, 'form-control');
      });
    }
    if (!_thiscom || !_controlcom) {} else {
      const _thisheight = _thiscom.clientHeight;
      const _thiswidth = _thiscom.clientWidth;
      const _parentheight = _controlcom.clientHeight;
      const _parentwidth = _controlcom.clientWidth;
      const _diffwidth = _thisparentcom.clientWidth - _controlcom.clientWidth;
      // 判断tip位置
      let _left,
        _right = 0;
      if (_thiswidth < _parentwidth) {
        _left = (_parentwidth / 2) - (_thiswidth / 2) + _diffwidth;
      } else {
        _left=_right = '0px';
      }
      _thiscom.style.top = `${ - (_thisheight - 2)}px`;
      _thiscom.style.left = `${_left}px`;
      // _thiscom.style.right = `${_right}px`;
    }
  }

  /**
   * 根据props返回当前组件
   * @return {[type]} [description]
   */
  _getCurrentComponent = () => {
    // 如过原值、提示信息、错误信息都为空则不会显示弹出窗口
    if (!this.props.IsShow || (this.props.IsShow && !this.props.OriginValue && !this.props.TipValue && !this.props.ErrValue)) {
      return null;
    }
    let _tooltip = null;
    let _inner = [];
    let _arrowclass = "tooltip-arrow";
    if (this.props.OriginValue) {
      _inner.push(
        <div key="OriginValue" className="tooltip-inner warning-backgroundcolor">{this.props.OriginValue}</div>
      );
      _arrowclass = `${_arrowclass} warning-bordertopcolor`;
    } else {

      if (this.props.TipValue) {
        _inner.push(
          <div key="TipValue" className="tooltip-inner info-backgroundcolor">{this.props.TipValue}</div>
        );
        _arrowclass = `${_arrowclass} info-bordertopcolor`;
      }
      if (this.props.ErrValue) {
        _inner.push(
          <div key="ErrValue" className="tooltip-inner danger-backgroundcolor">{this.props.ErrValue}</div>
        );
        _arrowclass = `${_arrowclass} danger-bordertopcolor`;
      }
    }
    if (_inner.length > 0) {
      const _style = {
        opacity: 1,
        width:'auto',
        maxWidth:'100%',
        top: this.props.Offset
          ? this.props.Offset.top
          : 0,
        left: this.props.Offset
          ? this.props.Offset.left
          : 0
      }
      _tooltip = (
        <div ref="tooltip_div" className="tooltip top" style={_style}>
          <div className={_arrowclass}></div>
          {_inner}
        </div>
      );
    }
    return _tooltip;
  }

  render() {
    return this._getCurrentComponent();
  }
}

export default HyToolTipCom;
