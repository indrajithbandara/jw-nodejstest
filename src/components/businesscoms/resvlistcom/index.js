/**
 * 预订列表组件
 * -Props-
 * UserList:用户列表数据
 * ParentModelCode:父业务模块编码
 * params.TabIndex:tab页签索引
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';
import {connect} from 'dva';

// lib
import {HistoryHandle} from '../../../utils/router_helper';
import {BaseComponet, MultiTaskComponent} from '../../../utils/component_helper';
import {SetCookie, GetCookie, RemoveCookie} from '../../../utils/cookie_helper';

// components
import {HyTableCom} from '../../featurecoms';
import {HyConfirmCom} from '../../featurecoms';

// css
import './index.css';

// 拼接传入的数据对象
function mapStateToProps(state) {
  return {users:state.users};
}

@connect(mapStateToProps, null, null, {withRef: true})
@BaseComponet
@MultiTaskComponent
class ResvListCom extends Component {

  // 获取当前类信息
  GetComponentInfo() {
    return {"ComponentName":"ResvListCom","ComponentVersion":"1.0","ComponentTitle":"预定查询"}
  }

  static propTypes = {};

  // 构造函数
  constructor(props) {
    super(props);
    let tempWidth = "10%"
    this.state = {
      // 当前组件的Code
      value: '',
      DatasSource: [],
      ColumnData: [
        {
          "name": "选择",
          isActionColumn: true,
          tm:"<a href='#'>{text}</a>"
        }, {
          "name": "编码",
          "field": "STAFF_CODE",
        }, {
          "name": "用户名",
          "field": "USER_NAME"
        }, {
          "name": "英文名",
          "field": "USER_NAME_EN"
        }, {
          "name": "帐号",
          "field": "LOGIN_ACCOUNT"
        }, {
          "name": "创建时间",
          "field": "CREATED_DATE"
        }, {
          "name": "更改时间",
          "field": "MODIFIED_DATE"
        }, {
          "name": "操作",
          isActionColumn: true
        }
      ],
      PagInationData: {},
      SummaryInfo: '',
      CustomClassName: "trBgClass",
      CustomStyle: {
        color: 'red'
      },    
      IsShowInput : true,
      IsShowSummaryInfo: true,
      IsShowFeatureGroup: false,
      FeatureBGroupData: [
        {
          Type: "button",
          ToolTip: "这是一个按钮",
          Text: "显示alert"
        }, {
          Type: "button",
          Text: "显示confirm"
        },
        {
          Type: "button",
          Text: "自定义modal内容"
        }
      ],
      LeftFeatureTdData: [
        {
          Type: "checkbox",
          ToolTip: "这是一个按钮",
          Options: [
            {
              value: 0,
              text: ''
            }
          ]
        }
      ],
      RightFeatureTdData: [
        {
          Type: "button",
          ToolTip: "这是一个按钮",
          Text: "编辑"
        }, {
          Type: "button",
          ToolTip: "这是一个按钮",
          Text: "删除"
        }
      ],
      IsShowTRightMenu: true,
      TRightMenuData: {
        DatasSource: [
          {
            text: "标题行菜单1",
            icoclass: "icoClass"
          }, {
            text: "标题行菜单2",
            icoclass: "icoClass"
          }, {
            text: "标题行菜单1",
            icoclass: "icoClass"
          }
        ],
        CustomClassName: "menuItemClass",
        CustomStyle: {
          color: 'green'
        },
        HeadInfo: "头标题",
        FootInfo: "尾标题"
      },
      IsShowDRightMenu: true,
      DRightMenuData: {
        DatasSource: [
          {
            text: "菜单1",
            icoclass: "icoClass"
          }, {
            text: "菜单2",
            icoclass: "icoClass"
          }, {
            text: "菜单3",
            icoclass: "icoClass"
          }
        ],
        CustomClassName: "menuItemClass",
        CustomStyle: {
          color: 'green'
        },
        HeadInfo: "头标题",
        FootInfo: "尾标题"
      },
      CheckIds: [],
      isShowModal : false,
      isShowAlert : false,
      isShowConfirm : false,
      isShowNotification: false,
      isShowMessage : false,
      RightFeatureTdEvent: this._rightFeatureTdEvent.bind(this),
      FeatureEvent: this._featureEvent,
      PagInationEvent: this._pageJump,
      LeftFeatureTdEvent: this._leftFeatureTdEvent,
      TRightMenuEvent: this._tRightMenuEvent,
      DRightMenuEvent: this._dRightMenuEvent,
      ...this.props.DefaultState
        ? this.props.DefaultState.thisState
        : {}
    };
  }

  // 初始化渲染完成后调用
  componentDidMount() {
    // 初始化数据
    this.props.dispatch({type: 'users/query', payload: 'test params'});
  }

  // 当Props或者state发生变更时触发
  componentWillReceiveProps(nextProps) {
    if (!is(this.props.params.tabindex, nextProps.params.tabindex)) {
      this.props.dispatch({type: 'users/query', payload: 'test params'});
      this.setState({
        ...nextProps.DefaultState
          ? nextProps.DefaultState.thisState
          : {}
      })
    }
  }

  _featureEvent = (index, subindex, eventType, value) => {
    if (index == 0) {
      this.context.router.push('/edit');
    } else if (index == 1) {
      if (this.state.CheckIds.length === 0) {
        alert("请选择需要删除的数据");
        return;
      }
      if (confirm("确认删除选中的数据")) {
        this.props.BatchDeleteUserAction(this.state.CheckIds, {index: this.props.users.currentPage});
      }
    }
  }
  _leftFeatureTdEvent = (RowIndex, index, checkedIndex, DatasSource) => {
    if (index == 0) {
      if (checkedIndex.length > 0) {
        this.state.CheckIds.push(DatasSource.ID);
      } else {
        DeleteByValueInArray(this.state.CheckIds, DatasSource.ID);
      }
    }
  }
  _rightFeatureTdEvent(RowIndex, index, checkedIndex, DatasSource){
    // if (index == 0) {
    //   let path = `/edit/${DatasSource.ID}`;
    //   this.context.router.push(path);
    // } else if (index == 1) {
    //   if (confirm("确认删除该条数据")) {
    //     this.props.DeleteUserDataAction(DatasSource.ID, {index: this.props.users.currentPage});
    //   }
    // }
    this.setState({
        ...this.state,
        isShowConfirm : true;
    })
  }
  _tRightMenuEvent = (menuindex, data) => {
    alert(menuindex);
  }
  _dRightMenuEvent = (rowindex, menuindex, data) => {
    alert(menuindex);
  }

  _onChange = (e) => {
    this.setState({value: e.target.value})
  }

  _setCookie = (e) => {
    SetCookie('namea', '1111').then(val => console.log('val', val)).catch(e => console.log('e', e));
  }
  _getCookie = (e) => {
    GetCookie('namea').then(val => console.log('val', val)).catch(e => console.log('e', e));
  }
  _removeCookie = (e) => {
    RemoveCookie('namea').then(val => console.log('val', val)).catch(e => console.log('e', e));
  }
  _confirmEvent(index){
     alert(index);
  }

  // 渲染函数
  render() {


    let PagInationData = {};
    if (this.props.users) {
      PagInationData = {
        PageIndex: this.props.users.currentPage,
        DataCount: this.props.users.recordsTotal,
        PageSize: this.props.users.pageSize
      }
    }
    let confirm = '';
    if(this.state.isShowConfirm)
    {
        confirm = <HyConfirmCom Title="提示" Content="确认删除吗" ConfirmEvent={this._confirmEvent.bind(this)}/>
    }

    return (
      <div className="resvlistcom">
        <div>
          <input ref="userName" type="text" value={this.state.value} onChange={this._onChange}/>
          <button onClick={this._setCookie}>设置cookie</button>
          <button onClick={this._getCookie}>获取cookie</button>
          <button onClick={this._removeCookie}>移除cookie</button>
        </div>
        <HyTableCom ref="ResvListTable" {...this.state} PagInationData={PagInationData} DatasSource={this.props.users
          ? this.props.users.data
          : []}/>
      </div>

    );
  }
}

// es5调出方法，兼容router按需加载
module.exports = ResvListCom;
