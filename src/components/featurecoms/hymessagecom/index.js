/**
*  消息组件
*  -Props-
*Messages: 消息数据 array
*          Id: 消息Id
*          MessageContent : 消息内容 string
*          MessageType : 消息类型 string 支持‘success’，‘warning’,‘error’,'info'
*/

import React from 'react';
import Portal from 'react-overlays/lib/Portal';
import MessageNoticeCom from './messagenotice'


import './index.css'

export default class HyMessageCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           messages : props.Messages
        }
    }
    componentWillReceiveProps(props)
    {
        this.setState({
           messages : props.Messages
        })
    }
    /**
    *删除消息
    *@param {number} 消息索引
    */
    remove(index) {
      this.state.messages.splice(index,1);
      this.setState({
          messages : this.state.messages
      });
    }
    render(){
        const messageNodes = this.state.messages.map((message,index) => {
            return <MessageNoticeCom {...message} CloseEvent={this.remove.bind(this,index)} key={message.Id}></MessageNoticeCom>
        });
        return (
           <Portal>
             <div className="message">
                 {messageNodes}
             </div>
           </Portal>
        )
    }
}
