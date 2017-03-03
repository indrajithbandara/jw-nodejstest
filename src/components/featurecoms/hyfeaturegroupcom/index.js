/**
*  功能组组件
*  -Props-
*FeatureBGroupData: 功能组组件数据源 array
*                    Type: 控件类型 string，支持input，button，drowdown，checkbox
*                    Tooltip: 鼠标放上去显示的内容
*                    Text: 内容 string
*                    Options: 其他配置项 array 如果是drowdown或者checkbox时使用
*                             value: 值  string
*                             text: 显示内容 string
* FeatureEvent:  功能组组件被触发事件后会调用的方法 input：onchange, button: onclick, drowdown: onchange, checkbox: onclick
*                sender: 触发事件的target object
*                args: 参数对象  object
*                      index: 控件索引
*                      type: 事件类型 string,
*                      value: 触发事件对象的值 string,
*                      checkedIndex: checkbox选中的索引 array
*/


import React, {Component} from 'react';
import './index.css'


//创建组件
export default class HyFeatureGroupCom extends Component
{
    constructor(props){
       super(props);
       this.state = {
          CheckedIndex : []
       }
    }
    /**
    *控件事件处理
    *@param {number}控件的索引
    *@param {number}checkbox项的索引
    *@param {object}事件对象
    */
    _featureEvent(index,subindex,event)
    {
        if(!this.props.FeatureEvent)
        {
           return;
        }
        if(event.target.type === "checkbox")
        {
           if(event.target.checked === true)
           {
              this.state.CheckedIndex.push(subindex);
              this.setState({
                CheckedIndex: this.state.CheckedIndex
              })
           }
           else {
             this.state.CheckedIndex.forEach(function(value,index){
                                        if(value === subindex)
                                        {
                                           this.state.CheckedIndex.splice(index,1);
                                        }
                                   }.bind(this));
              this.setState({
                CheckedIndex: this.state.CheckedIndex
              })
           }
        }
        this.props.FeatureEvent(event,{
            type: event.type,
            value: event.target.value,
            index: index,
            checkedIndex: this.state.CheckedIndex
        })
        //this.props.FeatureEvent(index,this.state.CheckedIndex,event.type,event.target.value);
        event.stopPropagation();
      //  event.preventDefault();
    }
    /**
    *判断checkbox项是否选中
    *@param {number} 索引
    *@return {bool} 是否选中
    */
    _isChecked(item){
        for(let i=0;i<this.state.CheckedIndex.length;i++)
        {
            if(item == this.state.CheckedIndex[i])
            {
               return true;
            }
        }
        return false;
    }
    render(){
       if(!this.props.FeatureBGroupData)
       {
          return null;
       }
       let featureArr = [];
       let options = [];
       this.props.FeatureBGroupData.forEach(function(value,index){
          switch (value.Type) {
            case "input":
                featureArr.push(<div className="btn-group" key={index}><input type="text" className="form-control"  title={value.ToolTip} onChange={this._featureEvent.bind(this,index,0)}/></div>);
              break;
            case "button":
                featureArr.push(<button type="button" title={value.ToolTip} className="btn btn-primary" key={index} onClick={this._featureEvent.bind(this,index,0)}>{value.Text}</button>)
              break;
            case "dropdown":
                options = [];
                value.Options.forEach(function(value,subindex){
                    options.push(<option key={'option' + subindex} value={value.value}>{value.text}</option>)
                });
                featureArr.push(<div className="btn-group" key={index}><select className="form-control" onChange={this._featureEvent.bind(this,index,0)}>{options}</select></div>)
              break;
            case "checkbox":
                options = [];
                value.Options.forEach(function(value,subindex){
                    options.push(<label key={'label' + subindex}><input  type="checkbox" checked={this._isChecked(subindex) ? "checked":""} value={value.value} onChange={this._featureEvent.bind(this,index,subindex)}/>{value.text}</label>)
                }.bind(this));
                featureArr.push(options);
            default:
          }
       }.bind(this));
       //让按钮组垂直排列：只需将下面的btn-group改为btn-group-vertical
       return (
          <div className="btn-group">
            {featureArr}
          </div>
       )
    }
}
