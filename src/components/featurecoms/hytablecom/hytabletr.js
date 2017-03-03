/**
*  Table Tr组件
*  -Props-
*isTitleTr: 是否是标题航 bool
*ColumnData: 标题行数据 对象数组
*            name : 名称
*            field: 数据属性名
*            isActionColumn: 是否是操作列
*            template: 模版（如果该值存在，会将数据放在该模版中显示）模版列需要显示数据时将{text}包裹在控件中
*LeftFeatureTdData:  左侧功能列数据源 array
*                    Type: 控件类型 string，支持input，button，drowdown，checkbox
*                    Tooltip: 鼠标放上去显示的内容
*                    Text: 内容 string
*                    Options: 其他配置项 array 如果是drowdown或者checkbox时使用
*                             value: 值  string
*                             text: 显示内容 string
*LeftFeatureEvent:  左侧功能组组件被触发事件后会调用的方法 input：onchange, button: onclick, drowdown: onchange, checkbox: onclick
*                sender: 触发事件的target object
*                args: 参数对象  object
*                      index: 控件索引
*                      type: 事件类型 string,
*                      value: 触发事件对象的值 string,
*                      checkedIndex: checkbox选中的索引 array
*                      datasSource: 激发事件的数据行数据
*DatasSource: 数据行数据 object
*RightFeatureTdData: 右侧功能列数据源 array 格式同上（LeftFeatureTdData）
*RightFeatureEvent:  右侧功能组组件被触发事件后会调用的方法 格式同上(RightFeatureEvent)
*/


import React, {Component} from 'react';
//component
import HyFeatureGroupCom from '../hyfeaturegroupcom';

import './hytabletr.css'
//创建并导出组件
export default class HyTableTrCom extends Component{
     constructor(props){
        super(props);
     }
     /**
     * 将对象转为数组
     * @param  对象
     * @return 转换好的数组
     */
     transformObjToArr(obj){
        if(obj instanceof Array)  //如果是数组类型，直接返回
        {
          return obj;
        }
        let arr = [];
        for(let item in obj){
            arr.push(obj[item]);
        }
        return arr;
     }
     /**
     * 左侧功能组事件
     * @param sender 响应元素
     * @param obj 参数
     */
     _leftFeatureTdEvent(sender,obj)
     {
         this.props.LeftFeatureTdEvent && this.props.LeftFeatureTdEvent(sender,
          {
             ...obj,
             dataSource: this.props.dataSource
          });
     }
      /**
     * 右侧功能组事件
     * @param sender 响应元素
     * @param obj 参数
     */
     _rightFeatureTdEvent(sender,obj)
     {
         this.props.RightFeatureTdEvent && this.props.RightFeatureTdEvent(sender,{
            ...obj,
            dataSource: this.props.dataSource
         });
     }
     render(){
        let tdArray = [];
        let props = this.props;
        if(props.isTitleTr === true) //代表是标题行
        {
           let text;
           props.ColumnData.forEach(function(value,index){
               text = value.name ? value.name : value;
               if(props.ColumnData.length - 1 === index && value.isActionColumn === true) //如果最后一列是功能列,不设置宽度，让自适应
               {
                 tdArray.push(<td key={index}>{text}</td>);
                 return;
               }
               tdArray.push(<td key={index} width={value.width} className="table-td-class">{text}</td>)
           })
        }
        else //代表是数据行
        {
           let text;
           if(props.LeftFeatureTdData)  //如果左侧功能列存在
           {
               tdArray.push(<td key="LeftFeatureTdData" width={props.ColumnData[0].width}  className="table-td-class"><HyFeatureGroupCom FeatureBGroupData={props.LeftFeatureTdData} FeatureEvent={this._leftFeatureTdEvent.bind(this)}/></td>)
           }
           let dataSourceArr = this.transformObjToArr(props.DatasSource);
           props.ColumnData.forEach(function(value,index){
               if(value.isActionColumn === true)
               {
                   return;
               }
               text = value.field ? props.DatasSource[value.field] : dataSourceArr[index];
               if(value.template)
               {
                 tdArray.push(<td key={index}  className="table-td-class" width={value.width} dangerouslySetInnerHTML={{__html: value.template.replace('{text}',text)}}></td>);
               }
               else{
                 tdArray.push(<td key={index}  className="table-td-class" width={value.width}><span title={text}>{text}</span></td>);
               }

           }.bind(this))
           if(props.RightFeatureTdData) //右侧功能列
           {
               tdArray.push(<td key="RightFeatureTdData">
                                <HyFeatureGroupCom
                                FeatureBGroupData={props.RightFeatureTdData} FeatureEvent={this._rightFeatureTdEvent.bind(this)}/>
                                </td>)
           }
        }
        return (
                 <tr className={props.CustomClassName} style={props.CustomStyle} data-rowindex={this.props.RowIndex}>
                     {tdArray}
                 </tr>
               )
     }
}
