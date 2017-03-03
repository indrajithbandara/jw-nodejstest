/**
*  通知组件
*  -Props-
*Notices: 通知数据 array
*         Title : 消息标题 string
*         Id : 消息Id string
*         Description : 消息内容 string
*         Closable: 消息是否可关闭(右上角显示关闭按钮) bool
*         Duration : 消息消失间隔时间，单位秒  如果不自动消失传0 number,
*         Options : 按钮选项 array
*              text : 按钮内容 string,
*              CustomClassName: 自定义类名 string
*              ActionEvent : 回调方法 function
*                            sender: 触发事件的target  object
*                            args: 参数对象 object
*                                  index:  按钮索引
*/


import React from 'react';
//conponent
import Portal from 'react-overlays/lib/Portal';
import HyNoticeCom from './notice'
import './index.css'

export default class HyNotificationCom extends React.Component{
    constructor(props)
    {
       super(props);
       this.state = {
           notices: props.Notices
       }
    }
    componentWillReceiveProps(props){
       this.setState({
           notices: props.Notices
       })
    }
    /**
    *删除通知
    *@param {number} 通知索引
    */
    remove(index) {
      this.state.notices.splice(index,1);
      this.setState({
          notices : this.state.notices
       });
    }
    render(){
       const noticeNodes = this.state.notices.map((notice,index) => {
           return <HyNoticeCom {...notice} CloseEvent={this.remove.bind(this,index)} key={notice.Id}></HyNoticeCom>
       });
       return (
          <Portal>
              <div className='notification'>
                  {noticeNodes}
              </div>
          </Portal>
       );
    }
}
