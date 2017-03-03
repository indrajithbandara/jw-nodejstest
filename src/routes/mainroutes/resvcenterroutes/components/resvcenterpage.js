import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';
import {BaseComponet, MultiTaskComponent} from '../../../../utils/component_helper';

// css
import './resvcenterpage.css';

@BaseComponet
@MultiTaskComponent
class ResvCenterPage extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      ...this.props.DefaultState
        ? this.props.DefaultState.thisState
        : {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!is(this.props.DefaultState, nextProps)) {
      const _defaultstate = nextProps.DefaultState
        ? nextProps.DefaultState.thisState
        : {};
      this.setState({
        ..._defaultstate.thisState
      })
    }
  }

  render() {
    // 实现多任务多窗口
    const _DefaultState=this.props.DefaultState;
    const _childrenState=(_DefaultState && _DefaultState.childrenState)?_DefaultState.childrenState:{};
    // 如过子组件不需按需加载，则注释以下方法
    const _children = this._getpropsChildren();

    return (
      <div className="resvcenter row">
        <div className="col-md-12 col-lg-12">
          {_children}
        </div>
      </div>
    );
  }
}

ResvCenterPage.Title = "预订中心";
ResvCenterPage.ComponentName = "ResvCenterPage";
ResvCenterPage.ComponentVersion = "1.0";

ResvCenterPage.GetComponentInfo = function() {
  return {ComponentName: ResvCenterPage.ComponentName, ComponentVersion: ResvCenterPage.ComponentVersion, ComponentTitle: ResvCenterPage.Title}
}

module.exports = ResvCenterPage;
