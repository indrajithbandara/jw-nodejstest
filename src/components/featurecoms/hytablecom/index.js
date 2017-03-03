/**
* 表格组件
* -Props-
* IsShowSummaryInfo: 是否显示汇总信息区域 bool
* SummaryInfo: 汇总信息区域文字内容 string
* IsShowFeatureGroup: 是否显示右上角功能组组件 bool
* FeatureBGroupData: 右上角功能组组件数据源 array
*                    Type: 控件类型 string，支持input，button，drowdown，checkbox
*                    Tooltip: 鼠标放上去显示的内容
*                    Text: 内容 string
*                    Options: 其他配置项 array 如果是drowdown或者checkbox时使用
*                             value: 值  string
*                             text: 显示内容 string
*FeatureEvent:  右上角功能组组件被触发事件后会调用的方法 input：onchange, button: onclick, drowdown: onchange, checkbox: onclick
*                sender: 触发事件的target object
*                args: 参数对象  object
*                      index: 控件索引
*                      type: 事件类型 string,
*                      value: 触发事件对象的值 string,
*                      checkedIndex: checkbox选中的索引 array
*ColumnData: 标题行数据 对象数组
*            name : 名称
*            field: 数据属性名
*            isActionColumn: 是否是操作列
*            template: 模版（如果该值存在，会将数据放在该模版中显示）模版列需要显示数据时将{text}包裹在控件中
*LeftFeatureTdData:  左侧功能列数据源 array 格式同上(FeatureBGroupData)
*LeftFeatureTdEvent: 左侧功能列被触发事件后会调用的方法：格式同上(FeatureEvent) args增加datasSource: 激发事件的行的数据
*CustomClassName: 自定义数据行类
*CustomStyle: 自定义数据行样式
*DatasSource: 表格数据源 array
*RightFeatureTdData:  右侧功能列数据源 array 格式同上(FeatureBGroupData)
*RightFeatureTdEvent: 右侧功能列被触发事件后会调用的方法：格式同上(FeatureEvent) args增加datasSource: 激发事件的行的数据
*IsShowTRightMenu 是否显示标题行右键菜单 bool
*TRightMenuData 标题行右键菜单数据 object
*               HeadInfo: 菜单头部数据 string
*               DatasSource: 菜单数据 array
*                            text: 显示的内容 string
*                            icoclass: 菜单左边图标样式
*               CustomClassName: 自定义样式类
*               CustomStyle: 自定义样式
*TRightMenuEvent: 点击菜单事件
*                 sender: 触发事件的target  object
*                         args: 参数对象
*                               index: 菜单索引
*                               data: 菜单数据
*IsShowDRightMenu: 是否显示数据行右键菜单 bool
*DRightMenuData: 数据行右键菜单数据 object 格式同上(TRightMenuData)
*DRightMenuEvent: 点击菜单事件
*                 sender: 触发事件的target  object
*                         args: 参数对象
*                               index: 菜单索引
*                               data: 菜单数据
*                               rowIndex: 数据行索引
*IsShowPagInation: 是否显示分页数据
*PagInationData: 分页数据 object
*                DataCount: 数据数量
*                PageIndex: 当前页索引
*                PageSize: 页数量
*IsShowInput: 是否显示输入框可以输入页数跳转
*PagInationEvent: 分页事件
*                 sender: 触发事件的target  object
*                 args: 参数对象
*                       index: 页索引
*
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//component
import HyTableTrCom from './hytabletr';
import HyPaginationCom from '../hypaginationcom';
import HyFeatureGroupCom from '../hyfeaturegroupcom';
import HyRightMenuCom from '../hyrightmenucom';  //引入右键菜单组件

import './index.css'

export default class HyTableCom extends Component{
    constructor(props){
       super(props);
    }
    /**
    *右上角功能组组件事件
    */
    _featureEvent(sender,obj){
       this.props.FeatureEvent && this.props.FeatureEvent(sender,obj);
    }
    /**
    *左侧功能组组件事件
    */
    _leftFeatureTdEvent(sender,obj){
       this.props.LeftFeatureTdEvent && this.props.LeftFeatureTdEvent(sender,obj);
    }
    /**
    *右侧功能组组件事件
    */
    _rightFeatureTdEvent(sender,obj){
       this.props.RightFeatureTdEvent && this.props.RightFeatureTdEvent(sender,obj);
    }
    /**
    *标题行右键菜单组件事件
    */
    _tRightMenuEvent(sender,obj){
       this.props.TRightMenuEvent && this.props.TRightMenuEvent(sender,obj);
    }
    /**
    *内容行右键菜单组件事件
    */
    _dRightMenuEvent(sender,obj){
       if(this.props.DRightMenuEvent)
       {
          let rowIndex = sender.parentNode.getAttribute("data-rowindex");
          this.props.DRightMenuEvent(sender, {
             ...obj,
             rowIndex : rowIndex
          })
       }
    }
    /**
    *分页组件事件
    */
    _pagInationEvent(sender,obj){
       this.props.PagInationEvent && this.props.PagInationEvent(sender,obj);
    }
    render(){
       //汇总信息区域
       let summaryInfo = "";
       if(this.props.IsShowSummaryInfo && (this.props.IsShowSummaryInfo === true || this.props.IsShowSummaryInfo === "true") && this.props.SummaryInfo)
       {
          summaryInfo = <div className="summary-info">{this.props.SummaryInfo}</div>
       }
       let featureGroup = "";
       //功能组组件
       if(this.props.IsShowFeatureGroup && (this.props.IsShowFeatureGroup === true || this.props.IsShowFeatureGroup === "true") && this.props.FeatureBGroupData)
       {
          featureGroup = <div className="top-feature-group"><HyFeatureGroupCom  FeatureBGroupData={this.props.FeatureBGroupData} FeatureEvent={this._featureEvent.bind(this)}/></div>
       }
       //标题行
       let titleTr = <HyTableTrCom  isTitleTr={true} {...this.props} index="tableTitleTr"/>;
       //  //标题行右键菜单
       let tRightMenu = "";
       if(this.props.IsShowTRightMenu && (this.props.IsShowTRightMenu === true || this.props.IsShowTRightMenu === "true") && this.props.TRightMenuData)
       {
           tRightMenu = (<HyRightMenuCom Container="tableHead"  {...this.props.TRightMenuData} MenuClickEvent={this._tRightMenuEvent.bind(this)}/>);
       }
       let bodyTr = [];
       //内容行
       this.props.DatasSource.forEach(function(value,index){
          bodyTr.push(<HyTableTrCom  isTitleTr="false" ColumnData={this.props.ColumnData}
                      DatasSource={value} key={index} RowIndex={index}
                      CustomClassName={this.props.CustomClassName} CustomStyle={this.props.CustomStyle}
                      LeftFeatureTdData={this.props.LeftFeatureTdData} LeftFeatureTdEvent={this._leftFeatureTdEvent.bind(this)}
                      RightFeatureTdData={this.props.RightFeatureTdData} RightFeatureTdEvent={this._rightFeatureTdEvent.bind(this)}
                      />)
       }.bind(this))

       //内容行右键菜单
       let dRightMenu = "";
       if(this.props.IsShowDRightMenu && (this.props.IsShowDRightMenu === true || this.props.IsShowDRightMenu === "true") && this.props.DRightMenuData){
           dRightMenu = <HyRightMenuCom Container="tableBody"  {...this.props.DRightMenuData} MenuClickEvent={this._dRightMenuEvent.bind(this)}/>
       }  
       //分页组件
       let pagination = "";
       if(this.props.IsShowPagInation && (this.props.IsShowPagInation === true || this.props.IsShowPagInation === "true") && this.props.PagInationData)
       {
           pagination = <HyPaginationCom PagInationData={this.props.PagInationData} PagInationEvent={this._pagInationEvent.bind(this)}/>;
       }
       return (
         <div ref="" className="table-div-style">
             <div>
                  {summaryInfo}
                  {featureGroup}
             </div>
             <div className="table-head-style" id="tableHead">
                  {tRightMenu}
                  <table className="table-bordered table-hover text-center table-style table-title-style">
                     <thead>
                       {titleTr}
                     </thead>
                  </table>
                  <div className="table-head-right-scroll"></div>
             </div>
             <div className="table-body-position" id="tableBody">
                 <div className="table-body-style">
                      {dRightMenu}
                      <table className="table-bordered table-hover text-center table-style table-content-style">
                        <tbody>
                          {bodyTr}
                        </tbody>
                      </table>
                 </div>
             </div>
             <div className="table-foot-style">
                {pagination}
             </div>
         </div>
       )
    }
}
