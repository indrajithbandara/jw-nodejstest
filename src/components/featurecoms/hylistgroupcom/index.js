/**
 * 列表组组件
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * ItemSelectEvent:列表项点击事件 function
 * SelectIndex:选择的项索引 number
 * IsLink:是否采用A标签 bool
 * DataSource:列表数据源 array
 *            ItemText:显示文字内容 string
 *            BadgeMsg:标记文字内容 string
 *            CustomConent:自定义内容 stirng
 * Public Function
 * GetSelectItem():获取已选择的项目 null=>object
 *                  index:选择项目的索引
 *                  item:选择项目的对象
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';

// lib
import {BaseComponet,MultiTaskComponent} from '../../../utils/component_helper';

// component
import HyItemCom from '../hyitemcom';

@BaseComponet
// 实现多任务多窗口注解
@MultiTaskComponent
// 创建组件
class HyListGroupCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props)

    this.state = {
      SelectIndex: this.props.SelectIndex
        ? this.props.SelectIndex
        : -1
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  /**
   * 获取所选项目
   */
  GetSelectItem = () => {
    if (this.state.SelectIndex === -1) {
      return null;
    } else {
      return {
        index: this.state.SelectIndex,
        item: this.props.DataSource[this.state.SelectIndex]
      };
    }
  }

  /**
   * 生成列表元素
   * @return {array} 返回列表元素数组
   */
  _getlistItem = () => {
    if (!this.props.DataSource) {
      return null;
    }
    let _listComponent = this.props.DataSource.map((item,index) => {
      if (item.CustomConent) {
        return <HyItemCom key={index} ItemIndex={index} ItemClickEvent={(sender,obj) => {this._itemSelectEvent(sender,obj)}}>{item.CustomConent}</HyItemCom>;
      } else {
        return (<HyItemCom key={index} ItemIndex={index} ItemClickEvent={(sender,obj) => {this._itemSelectEvent(sender,obj)}} CustomClassName={is(index, this.state.SelectIndex)
          ? 'active'
          : ''} Islink={this.props.Islink} ItemText={item.ItemText} BadgeMsg={item.BadgeMsg}/>);
      }

    });
    return _listComponent;
  }

  /**
   * 处理列表项选择事件
   * @param  {object} sender 响应元素
   * @param  {object} obj    事件参数
   * @return {null}
   */
  _itemSelectEvent = (sender, obj) => {
    this.setState({SelectIndex: obj.itemindex});
    if (this.props.ItemSelectEvent) {
      obj.item = this.props.DataSource[obj.itemindex];
      this.props.ItemSelectEvent(sender,obj)
    }
  }

  render() {
    // 生成组件样式
    const _className = `list-group ${this.CustomClassName}`;
    const _content = this._getlistItem();
    let _currentComponent;
    if (this.props.Islink && !this.props.children) {
      _currentComponent = <div className={_className} style={this.props.CustomStyle}>{_content}</div>;
    } else if (!this.props.Islink && !this.props.children) {
      _currentComponent = <ul className={_className} style={this.props.CustomStyle}>{_content}</ul>;
    } else if (this.props.Islink && this.props.children) {
      _currentComponent = <div className={_className} style={this.props.CustomStyle}>{this.props.children}</div>;
    } else if (!this.props.Islink && !this.props.children) {
      _currentComponent = <ul className={_className} style={this.props.CustomStyle}>{this.props.children}</ul>;
    } else {
      _currentComponent = null;
    }

    return _currentComponent;
  }
}

export default HyListGroupCom;
