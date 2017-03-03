import React from 'react';
import _array from 'lodash';
import {is} from 'immutable';

// 多任务多窗口组件基础方法实现
function getpropsChildren() {
  if (this.props.children) {
    const _DefaultState = this.props.DefaultState;
    const _childrenState = (_DefaultState && _DefaultState.childrenState)
      ? _DefaultState.childrenState
      : {};
    return React.cloneElement(this.props.children, {
      ref: 'ChildrenCom',
      DefaultState: _childrenState.ChildrenCom
    });
  } else {
    return <div>{this._reactInternalInstance._currentElement.type.GetComponentInfo().Title}</div>;
  }
}

function MultiTaskGetState() {
  //遍历refs属性，获取所有自组件State
  let _childrenState = {};
  for (let key in this.refs) {
    if (this.refs[key].MultiTaskGetState) {
      _childrenState[key] = this.refs[key].MultiTaskGetState();
    } else if (this.refs[key].refs && this.refs[key].refs.wrappedInstance && this.refs[key].refs.wrappedInstance.MultiTaskGetState) {
      _childrenState[key] = this.refs[key].refs.wrappedInstance.MultiTaskGetState();
    }
  }
  let _thisComponentInfo = {};
  if (this.GetComponentInfo) {
    _thisComponentInfo = this.GetComponentInfo();
  }
  let _comState = {
    ..._thisComponentInfo,
    thisState: this.state,
    childrenState: _childrenState
  }
  return _comState;
}

/**
 * 多任务多窗口基本方法实现
 * @param {object} component 传入调用组件对象
 */
export function MultiTaskComponent(component) {
  component.prototype._getpropsChildren = getpropsChildren;
  component.prototype.MultiTaskGetState = MultiTaskGetState;
}

//=组件基本注解=====================================================
// 判断如果两次props和state的值相同则不用render方法.
function shouldComponentUpdate(nextProps, nextState) {

  const thisProps = this.props || {},
    thisState = this.state || {};

  try {
    if (Object.keys(thisProps || {}).length !== Object.keys(nextProps || {}).length || Object.keys(thisState || {}).length !== Object.keys(nextState || {}).length) {
      return true;
    }
  } catch (e) {

    console.log('e', e);
  }

  for (const key in nextProps) {
    if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}

function checkAuth(current, type, code) {

  const _authType = type == 0
    ? 'authorize'
    : 'authority';

  if (!current.props.AuthModel || !current.props.AuthModel[_authType]) {
    return false;
  }
  const _index = _array.findIndex(current.props.AuthModel[_authType], (v) => v == code);
  if (_index === -1) {
    return false;
  } else {
    return true;
  }
}

export function BaseComponet(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  component.prototype._checkAuth = checkAuth;
}
