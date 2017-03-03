/**
 * 消息管理
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * SysmessageModel:系统消息列表：array
 * ModelCode:父业务模块编码
 * -权限控制
 * OverrideAuth:当前组件权限是否被覆盖 bool
 * IsShowTitle:是否显示标题 该属性受OverrideAuth控制
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';
import {connect} from 'dva';

// lib
import {HistoryHandle} from '../../../utils/router_helper';
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';

// component
import {HyListGroupCom} from '../../featurecoms';

//resourcelanguage
import {GetLanguage} from './messagemanage-res';

// css
import './index.css';

// 拼接传入的数据对象
function mapStateToProps({MessageListModel, AuthModel}) {
  return {MessageModel: MessageListModel, AuthModel};
}

// 实现上下文数据绑定注解
@connect(mapStateToProps, null, null, {withRef: true})
// 组件基本功能注解
@BaseComponet
// 实现多任务多窗口注解
@MultiTaskComponent
// 创建组件
class MessageManage extends Component {
  // 获取当前类信息
  GetComponentInfo() {
    return {"ComponentName": "MessageManage", "ComponentVersion": "1.0", "ComponentTitle": "消息管理"}
  }

  static propTypes = {};

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.dispatch({type: 'MessageListModel/query',params:{a:'1',b:'3333'}});
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  /**
   * 组装消息信息
   * @return {[type]} [description]
   */
  _packageData = () => {
    let _messageData = this.props.MessageModel.data.map((item, index) => {
      return {ItemText: item.MessageText, BadgeMsg: item.ReNumber}
    })
    return _messageData;
  }

  /**
   * 项目选择事件
   * @param  {object} sender 响应组件
   * @param  {object} obj    事件参数
   * @return {null}
   */
  _selectItemEvent = (sender, obj) => {
    alert(obj);
  }

  render() {
    const _className = `messagemanage ${this.CustomClassName}`;
    const _messageData = this._packageData();

    // 定义组件标题
    let _title;
    if (this.props.OverrideAuth && this.props.IsShowTitle) {
      // 使用父级组件来覆盖当前组件权限
      _title = <div className="title">{GetLanguage(`${this.props.ModelCode}_title`)}</div>;
    } else if (!this.props.OverrideAuth && this._checkAuth(this, 6001)) {
      // 当前组件权限控制
      _title = <div className="title">{GetLanguage(`${this.props.ModelCode}_title`)}</div>;
    }

    return (
      <div className={_className} style={this.props.CustomStyle}>
        {_title}
        <div className="content">
          <HyListGroupCom ref="aaa" ItemSelectEvent={this._selectItemEvent} IsLink={true} DataSource={_messageData}/>
        </div>
      </div>
    );
  }
}

export default MessageManage;
