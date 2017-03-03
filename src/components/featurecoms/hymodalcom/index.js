/**
*  modal组件
*  -Props-
*Show: 是否显示 bool
*Title:  标题  string
*BodyContent: 内容(支持直接html标签)
*FootButtons: 底部按钮 array
*             className: 自定义类名
*             text: 按钮内容
*ButtonEvent: 点击按钮会调用的方法
*             sender: 被点击的按钮
*             args: 参数对象
*                   index: 点击的按钮索引
*/

import React from 'react';
import ReactDOM from 'react-dom';
//component
import {HyBaseModalCom} from '../hybasemodalcom';

//创建组件
class HyModalCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           Show : true
        }
    }
    componentWillReceiveProps(props){
      this.setState({
         Show : props.Show
      })
    }
    /**
    *点击按钮调用的方法
    *@param {number} 按钮索引
    *@param {object} 事件对象
    */
    handleClick(index,event){
        this.props.ButtonEvent && this.props.ButtonEvent(event,{index});
        event.stopPropagation();
        event.preventDefault();
    }
    /**
    *隐藏组件
    */
    hide(){
      this.setState({
         ...this.state,
         Show : false
      })
    }
    render(){
      const footNode = this.props.FootButtons.map((button,index) => {
          const btnClass = button.className || 'btn-primary';
          return <button className={`btn ${btnClass}`} onClick={this.handleClick.bind(this,index)} key={index}>{button.text}</button>
      })
      return (
          <HyBaseModalCom Show={this.state.Show} container={this.props.container}>
              <div className="modal-header">
                  <h4 className="modal-title">{this.props.Title}</h4>
              </div>
              <div className="modal-body">
                  {this.props.BodyContent}
              </div>
              <div className="modal-footer">
                  {footNode}
              </div>
          </HyBaseModalCom>
      )
    }
}

function Show(properties,callback) {
  const props = properties || {};
  let div = document.createElement('div');
  document.body.appendChild(div);
  properties.ButtonEvent = (target,index)=>{
     target.hide();
     callback(index);
     setTimeout(()=>{
       ReactDOM.unmountComponentAtNode(div);
       document.body.removeChild(div);
     },150);

  }
  ReactDOM.render(<HyModalCom {...props} container={div}/>, div);
};

export default {
   Show : Show
};
