/**
 * 预订列表组件
 * -Props-
 * CustomClassName:自定义样式 string
 * CustomStyle:自定义行内样式 string
 * UserList:用户列表数据
 * ParentModelCode:父业务模块编码
 */
import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';
import {connect} from 'dva';

// lib
import {HistoryHandle} from '../../../../../utils/router_helper';
import {BaseComponet, MultiTaskComponent} from '../../../../../utils/component_helper';


// 表格组件
import {HyTableCom, HyInputCom, HySelectCom,HyRightMenuCom,HyDateTimePickerCom} from '../../../../../components/featurecoms';
// 消息管理组件
import MessageManage from '../../../../../components/businesscoms/messagemanage';




// resourcelanguage
import {GetLanguage} from '../../../../../localize/30000101';

// css
import './resvlist_view.css';

// 拼接传入的数据对象
// ResvListModel：预订单数据
// AuthModel:授权、权限数据
function mapStateToProps({ResvListModel, AuthModel}) {
  return {ResvListModel, AuthModel};
}

// 实现上下文数据绑定
@connect(mapStateToProps, null, null, {withRef: true})
// 组件基础功能注解
@BaseComponet
// 实现多任务多窗口注解
@MultiTaskComponent

class ResvListView extends Component {

  // 获取当前类信息
  GetComponentInfo() {
    return {"ComponentName": "ResvListView", "ComponentVersion": "1.0", "ComponentTitle": "预定查询"}
  }

  static propTypes = {};

  // 构造函数
  constructor(props) {
    console.log('window.__INITIAL_STATE__',window.__INITIAL_STATE__);
    super(props);
    let tempWidth = "10%";

    this._payTypeData = [
      {
        'ItemText': GetLanguage('C30000101-payType-DataSource-0-ItemText'),
        'ItemValue': '0'
      }, {
        'ItemText': GetLanguage('C30000101-payType-DataSource-1-ItemText'),
        'ItemValue': '1'
      }, {
        'ItemText': GetLanguage('C30000101-payType-DataSource-2-ItemText'),
        'ItemValue': '2'
      }, {
        'ItemText': GetLanguage('C30000101-payType-DataSource-3-ItemText'),
        'ItemValue': '3'
      }
    ];
    this._customStyleWidth = {
      width: '120px'
    };

    this.state = {
      userName:'',
      resvNum:'',
      userPhone:'',
      userEmail:'',
      payType:0,
      PayTypeData:this._payTypeData,
      ColumnData: [
        {
          "name": "选择",
          isActionColumn: true,
          width: tempWidth
        }, {
          "name": "预订编号",
          "field": "RESVNUM",
           width: tempWidth
        }, {
          "name": "账单号",
          "field": "ACCOUNT",
          width: tempWidth
        }, {
          "name": "客人姓名",
          "field": "NAME",
          width: tempWidth,
          "template":"<a href='http://www.baidu.com' target='_blank'>{text}</a>"
        }, {
          "name": "联系方式",
          "field": "PHONE",
          width: tempWidth
        }, {
          "name": "预订来期",
          "field": "ARRDT",
          width: tempWidth
        }, {
          "name": "预订离期",
          "field": "ENDDT",
          width: tempWidth
        }, {
          "name": "创建时间",
          "field": "CREATEDATE",
          width: tempWidth
        },{
          "name": "操作",
          isActionColumn: true,
          width: tempWidth
        }
      ],
      SummaryInfo: '',
      CustomClassName: "trBgClass",
      CustomStyle: {},
      IsShowSummaryInfo: true,
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
      ...this.props.DefaultState
        ? this.props.DefaultState.thisState
        : {}
    };
  }

  // 初始化渲染完成后调用
  componentDidMount() {
    // 初始化数据
    this.props.dispatch({type: 'ResvListModel/query', payload: 'test params'});
  }

  // 当Props或者state发生变更时触发
  componentWillReceiveProps(nextProps) {
    if (!is(this.props.params.tabindex, nextProps.params.tabindex)) {
      console.log('nextProps',nextProps);
      this.setState({
        ...nextProps.DefaultState
          ? nextProps.DefaultState.thisState
          : {}
      },()=>{
        console.log('this.state2',this.state);
        this.props.dispatch({type: 'ResvListModel/query', payload: 'test params'});
      })
    }
  }

  _emailverification = (v) => {
    if (v.length > 10) {
      return false;
    } else {
      return true;
    }
  }

  _verificationName=(v)=>{
    if(v.length<3 || v.length>10){
      return {state:false,errmessage:'提示错误信息'};
    }else{
      return {state:true,errmessage:''};
    }
  }

  _onSearchEvent=(sender,obj)=>{
    if(obj && obj.value){

    }
  }

  _onSelectEvent=(sender,obj)=>{
    if(obj){
      this.setState({
        [obj.name]:obj.ItemValue
      })
    }
  }

  _onSearchDataEvent=(sender,obj)=>{
    // this.setState({
    //   PayTypeErrMessage:GetLanguage('C30000101-payType-ErrMessage'),
    //   PayTypeIsShowToolTip:true
    // })
    this.refs.payType.ShowErrToolTip(GetLanguage('C30000101-payType-ErrMessage'));
  }


  _inputOnChangeEvent=(sender,obj)=>{
    this.setState({
      [obj.name]:obj.value
    });
  }
  _DatePickerChange=(sender,obj)=>{
    this.setState({
       ...this.state,
       DatePicker : {
          Value : obj.value
       }
    })
  };

  // 渲染函数
  render() {

    // 实现自定义样式
    const _className = `resvlistcom row ${this.CustomClassName}`;
    // 实现多窗口多任务
    const _DefaultState = this.props.DefaultState;
    const _childrenState = (_DefaultState && _DefaultState.childrenState)
      ? _DefaultState.childrenState
      : {};

    // 翻页功能定义
    let PagInationData = {};
    let IsShowPagInation = false;
    // 判断是否存在数据，并且根据5000权限号判断是否有显示翻页功能的权限
    if (this.props.ResvListModel && this.props.AuthModel && this._checkAuth(this, 1, '5000')) {
      IsShowPagInation = true;
      PagInationData = {
        PageIndex: this.props.ResvListModel.currentPage,
        DataCount: this.props.ResvListModel.recordsTotal,
        PageSize: this.props.ResvListModel.pageSize,
        IsShowInput : true
      }
    }
    // 表格功能组定义
    let _featureBGroupData = [];
    // 根据5001权限号判断是否有功能组的权限
    if (this.props.AuthModel && this._checkAuth(this, 1, '5001')) {
      _featureBGroupData = [
        {
          Type: "button",
          ToolTip: "这是一个按钮",
          Text: "添加"
        }, {
          Type: "button",
          Text: "批量删除"
        }
      ];
    }

    // 定义覆盖messagemanage标题权限
    let _messageManageAuth = {};
    // 设置覆盖权限
    // 当自组建与父组件权限判断冲突时，采用父组件权限覆盖自组件权限
    _messageManageAuth.OverrideAuth = true;
    // 根据当前组件权限判断是否需要显示消息列表的标题
    if (this.props.AuthModel && this._checkAuth(this, 1, '6003')) {
      _messageManageAuth.IsShowTitle = true;
    }

    // 初始化支付方式选项
    const _customStyleWidth = {
      width: '120px'
    };

    return (
      <div className={_className} style={this.props.CustomStyle}>
        <div style={{width: '100%', height: '200px',paddingLeft:'15px'}}>
           <HyDateTimePickerCom
             ref="resvatt"
             DefaultState={_childrenState.resvatt} {...this.state.DatePicker}
             OnChangeEvent={this._DatePickerChange}/>
        </div>
        <div className="col-md-12 col-lg-12">
          <form className="form-inline">
            <HyInputCom
              ref="userName"
              Placeholder="请输入客人名称"
              OnChangeEvent={this._inputOnChangeEvent}
              Title="客人姓名"
              Name="userName"
              InputType="text"
              Value={this.state.userName}
              ToolTipText="入住人姓名"
              Verification={this._verificationName}
              /> {' '}
            <HyInputCom
              ref="resvNum"
              Placeholder="请输入预订编号"
              OnChangeEvent={this._inputOnChangeEvent}
              Title="预订编号"
              Name="resvNum"
              Value={this.state.resvNum}
              InputType="text"/> {' '}
            <HyInputCom
              ref="userPhone"
              Placeholder="请输入联系方式"
              OnChangeEvent={this._inputOnChangeEvent}
              Title="联系方式"
              Name="userPhone"
              Value={this.state.userPhone}
              InputType="text"/> {' '}
            <HyInputCom
              ref="userEmail"
              Verification={this._emailverification}
              Placeholder="请输入电子邮箱"
              OnChangeEvent={this._inputOnChangeEvent}
              Title="电子邮箱"
              Name="userEmail"
              Value={this.state.userEmail}
              InputType="email"/> {' '}
            <HySelectCom
              ref="payType"
              Name="payType"
              Placeholder={GetLanguage('C30000101-payType-Placeholder')}
              NotFoundContent={GetLanguage('C30000101-HySelectCom-NotFoundContent')}
              Title={GetLanguage('C30000101-payType-Title')}
              IsNotComboBox={false}
              OnSearchEvent={this._onSearchEvent}
              OnSelectEvent={this._onSelectEvent}
              SelectIndex={this.state.payType}
              DataSource={this.state.PayTypeData}
              CustomStyle={this._customStyleWidth}
              IsShowToolTip={this.state.PayTypeIsShowToolTip}
              ToolTipText={GetLanguage('C30000101-payType-ToolTipText')}
              ErrMessage={this.state.PayTypeErrMessage}>
            </HySelectCom>
            <button type="button" onClick={this._onSearchDataEvent} className="btn btn-default">查询订单</button>
          </form>
        </div>
        <div className="col-md-8 col-lg-8" style={{
          paddingBottom: '10px',
          paddingTop: '10px'
        }}>
          <HyTableCom ref="ResvListTable" DefaultState={_childrenState.ResvListTable} {...this.state} FeatureBGroupData={_featureBGroupData} IsShowPagInation={IsShowPagInation} PagInationData={PagInationData} DatasSource={this.props.ResvListModel
            ? this.props.ResvListModel.data
            : []}/>
        </div>
        <div className="col-md-4 col-lg-4">
          <MessageManage ref="MessageManage" DefaultState={_childrenState.MessageManage} {..._messageManageAuth}/>
        </div>
      </div>
    );
  }
}

// es5调出方法，兼容router按需加载
module.exports = ResvListView;
