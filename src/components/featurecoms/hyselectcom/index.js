/**
 * 下拉菜单
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * Placeholder:空数据提示信息 string
 * Title:输入框标题 string
 * IsHiddenTitle:是否隐藏标题 bool
 * Name:组件名称 string
 * ToolTipText:提示信息
 * ErrMessage:错误提示信息
 * Disabled:是否禁用 bool
 * IsNotComboBox:是否不为combobox组件 默认为false
 * DefaultActiveFirstOption:是否默认选择项目中的第一条 bool
 * NotFoundContent:没有找到条目时显示的文字信息 string
 * SelectIndex:选择的项目索引 int
 * ToolTip:提示信息屬性
 *          IsShowToolTip:是否显示展开提示信息框 bool
 *          ToolTipText:提示信息内容 string
 *          OriginValue：原值 string
 *          ShowErrToolTip:显示错误提示信息 function(errmessage):string 错误信息
 * OnSearchEvent:输入变更事件  function
 * OnSelectEvent:选择事件 function
 * OnBlurEvent:失去焦点事件 function
 * OnFocusEvent:获得焦点事件 function
 * DataSource:选项数据 array
 *            ItemText:显示文字内容 string
 *            ItemValue:值 string
 *            CustomConent:自定义内容 stirng ********{text}********
 *            Disabled:是否禁用该项 bool
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';

// lib
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';
// 下拉菜单
import Select, {Option} from 'rc-select';
// tooltip
import HyToolTipCom from '../hytooltipcom';

// css
import './index.css';

@BaseComponet
@MultiTaskComponent
class HySelectCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this._onsearchTimer = null;

    this.state = {
      value: this.props.SelectIndex
        ? this.props.DataSource[this.props.SelectIndex].ItemText
        : '',
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
        value: nextProps.SelectIndex
          ? nextProps.DataSource[nextProps.SelectIndex].ItemText
          : ''
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
   * 整理下拉菜单项目
   * @return {[type]} [description]
   */
  _packageData = () => {
    if (!this.props.DataSource) {
      return null
    }
    const _items = this.props.DataSource.map((item, index) => {
      const _text = item.CustomConent
        ? item.CustomConent.replace(new RegExp(/({text})/g), item.ItemText)
        : item.ItemText;
      return <Option key={`${this.props.Name}-${index}`} disabled={item.Disabled
        ? true
        : false} value={item.ItemText}>{_text}</Option>
    })
    return _items;
  }

  /**
   * 触发修改事件，暂不使用
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  _onChangeEvent = (value) => {
    // console.log('_onChangeEvent');
    // console.log('value',value);
    // this.setState({value: value});
    // if(this._onchangeTimer){
    //   clearTimeout(this._onchangeTimer);
    // }
    // this._onchangeTimer=setTimeout(()=>{
    //   if(this.props.OnChangeEvent){
    //     const _sender = e;
    //     const _obj = this.DataSource[e.props.index];
    //   }
    // },200);
  }

  /**
   * 触发输入框修改事件，并于500毫秒后回调父组件事件
   * @param  {string} value 输入框当前值
   * @return {[type]}       [description]
   */
  _onSearchEvent = (value) => {
    this.setState({value: value});
    if (this._onsearchTimer) {
      clearTimeout(this._onsearchTimer);
    }
    if (value == '') {
      return;
    }
    this._onsearchTimer = setTimeout(() => {
      if (this.props.OnSearchEvent) {
        const _sender = this;
        let _obj = {
          value
        };
        _obj.name = this.props.Name;
        this.props.OnSearchEvent(_sender, _obj);
      }
    }, 500);
  }

  /**
   * 触发选择事件
   * @param  {string} value 选择的值，并回调父组件事件
   * @param  {obj} e     事件对象
   * @return {[type]}       [description]
   */
  _onSelectEvent = (value, e) => {
    this.setState({
      value: value
    }, () => {
      if (this.props.OnSelectEvent) {
        const _sender = e;
        let _obj = this.props.DataSource[e.props.index];
        _obj.name = this.props.Name;
        this.props.OnSelectEvent(_sender, _obj);
      }
    });
    this._closeToolTip();
  }

  /**
   * 焦点离开事件，并回调父组件事件
   * @param  {obj} sender 当前响应元素
   * @param  {obj} obj   事件参数
   * @return {[type]}        [description]
   */
  _onBlurEvent = (sender, obj) => {
    this._closeToolTip();
    if (this.props.OnBlurEvent) {
      const _sender = this;
      const _obj = {
        name: this.props.Name
      };
      this.props.OnBlurEvent(_sender, _obj);
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
    // 生成组件样式
    const _className = `form-group ${this.CustomClassName}`;
    // 获取组件子组件
    let _options = this.props.children || this._packageData();
    return (
      <div className={_className}>
        <label className={this.props.IsHiddenTitle
          ? 'sr-only'
          : ''} htmlFor={this.props.Name}>{this.props.Title}</label>
        <HyToolTipCom IsShow={this.state.IsShowToolTip} TipValue={this.props.ToolTipText} ErrValue={this.state.ErrMessage} OriginValue={this.props.OriginValue}/>
        <Select className="form-control" combobox={this.props.IsNotComboBox
          ? false
          : true} ref={this.props.Name} style={this.props.CustomStyle} notFoundContent={this.props.NotFoundContent} placeholder={this.props.Placeholder} defaultActiveFirstOption={this.props.DefaultActiveFirstOption} onChange={this._onChangeEvent} onSelect={this._onSelectEvent} onSearch={this._onSearchEvent} onBlur={this._onBlurEvent} onFocus={this._onFocusEvent} showSearch={this.props.IsNotComboBox
          ? false
          : true} value={this.state.value}>
          {_options}
        </Select>
      </div>
    );
  }
}

export default HySelectCom;
