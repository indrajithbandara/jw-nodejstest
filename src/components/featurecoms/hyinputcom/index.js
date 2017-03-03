/**
 * 输入框
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * Placeholder:空数据提示信息 string
 * Title:输入框标题 string
 * IsHiddenTitle:是否隐藏标题 bool
 * Name:组件名称 string
 * Value:初值
 * InputType:输入框类型 string
 * IsShowToolTip:是否显示展开提示信息框 bool
 * ToolTipText:提示信息内容 string
 * OriginValue：原值 string
 * Verification:自定义验证条件 function(v):string 输入的值 return {state:bool,errmessage:''}
 * OnBlurEvent:失去焦点事件 function
 * OnFocusEvent:获得焦点事件 function
 * OnClickEvent: 点击事件 function
 * ShowErrToolTip:显示错误提示信息 function(errmessage):string 错误信息
 * SetFocus: 设置输入框获得焦点 function()
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';

// lib
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';

// component
// tooltip
import HyToolTipCom from '../hytooltipcom';

@BaseComponet
@MultiTaskComponent
class HyInputCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      IsShowToolTip: this.props.IsShowToolTip,
      ...this.props.DefaultState
        ? this.props.DefaultState.thisState
        : {}
    };
  }

  // 当Props或者state发生变更时触发
  componentWillReceiveProps(nextProps) {
    if (!is(this.props, nextProps)) {
      this.setState({
        ...nextProps.DefaultState
          ? nextProps.DefaultState.thisState
          : {},
        IsShowToolTip: nextProps.IsShowToolTip,
        Value:nextProps.Value?nextProps.Value:''
      })
    }
  }

  /**
   * 打开错误提示消息ToolTip
   * @param {string} errMessage 错误信息
   */
  ShowErrToolTip = (errMessage) => {
    this.setState({IsShowToolTip: true, ErrMessage: errMessage})
  }

  /**
  * 设置输入框焦点
  */
  SetFocus(){
    this.refs.hyinput.focus();
  }

  /**
   * 关闭ToolTip
   * @return {[type]} [description]
   */
  _closeToolTip = () => {
    if (this.state.IsShowToolTip) {
      this.setState({IsShowToolTip: false});
      if (this.props.OnCloseToolTipEvent) {
        const _sender = this;
        const _obj = {
          name: this.props.Name
        };
        this.props.OnCloseToolTipEvent(_sender, _obj);
      }
    }
  }

  /**
   * 处理修改事件
   * @param  {obj} e 当前响应组件事件对象
   * @return {[type]}   [description]
   */
  _onchangeEvent = (e, obj) => {
    obj=obj || {};
    let _isVerification = {state:true,errmessage:''};
    const _value=e.target?e.target.value:e.value;
    if (this.props.Verification) {
      _isVerification = this.props.Verification(_value);
    }
    if (_isVerification.state) {
      this._closeToolTip();
      this.setState({Value: _value, ErrMessage: ''});

      if (this.props.OnChangeEvent) {
        obj.value = _value;
        obj.name = this.props.Name;
        this.props.OnChangeEvent(e, obj)
      }
    } else {
      this.ShowErrToolTip(_isVerification.errmessage);
    }
  }

  /**
   * 焦点离开事件，并回调父组件事件
   * @param  {obj} sender 当前响应元素
   * @param  {obj} obj   事件参数
   * @return {[type]}        [description]
   */
  _onBlurEvent = (sender, obj) => {
    //判断如果当前输入域中不为空则调用change函数验证输入域内容
    if(this.refs.hyinput.value.length>0){
      this._onchangeEvent(this.refs.hyinput,{});
    }
    if (this.props.OnBlurEvent) {
      const _sender = this;
      const _obj = {
        name: this.props.Name
      };
      this.props.OnBlurEvent(_sender, _obj);
    }
  }
  /**
   * 点击事件
   * @param  {obj} sender 当前响应元素
   * @param  {obj} obj   事件参数
   * @return {[type]}        [description]
   */
  _onClickEvent = (sender) =>{
     if(this.props.OnClickEvent){
       const _sender = this;
       const _obj = {
       };
       this.props.OnClickEvent(_sender, _obj);
     }
  }

  /**
   * 获得焦点事件，并回调父组件事件
   * @param  {obj} sender 当前响应元素
   * @param  {obj} obj    事件参数
   * @return {[type]}        [description]
   */
  _onFocusEvent = (sender, obj) => {
    this.setState({IsShowToolTip: true});
    if (this.props.OnFocusEvent) {
      const _sender = this;
      const _obj = {
        name: this.props.Name
      };
      this.props.OnFocusEvent(_sender, _obj);
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className={this.props.IsHiddenTitle
          ? 'sr-only'
          : ''} htmlFor={this.props.Name}>{this.props.Title}</label>
        <HyToolTipCom IsShow={this.state.IsShowToolTip} TipValue={this.props.ToolTipText} ErrValue={this.state.ErrMessage} OriginValue={this.props.OriginValue}/>
        <input
          ref="hyinput"
          type={this.props.InputType}
          className="form-control"
          name={this.props.Name}
          id={this.props.Name}
          placeholder={this.props.Placeholder}
          value={this.props.Value || ''}
          onChange={this._onchangeEvent}
          onFocus={this._onFocusEvent}
          onBlur={this._onBlurEvent}
          onClick={this._onClickEvent}
          />
      </div>
    );
  }
}

export default HyInputCom;
