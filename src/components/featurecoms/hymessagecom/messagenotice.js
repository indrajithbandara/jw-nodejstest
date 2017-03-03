import React from 'react'

import './messagenotice.css'

const defaultProps = {
    Duration : 1.5
}

class MessageNoticeCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           isShowMessage : true,
        }
    }
    componentDidMount(){
        if(this.props.Duration)
        {
           this.closeTimer = setTimeout(()=>{
               this.close();
           },this.props.Duration * 1000);
        }
    }
    componentWillUnmount(){
        this.clearCloseTimer();
    }
    /**
    *清除定时器
    */
    clearCloseTimer(){
        if(this.closeTimer)
        {
           clearTimeout(this.closeTimer);
           this.closeTimer = null;
        }
    }
    /**
    *关闭消息框
    */
    close(){
        this.setState({
           isShowMessage: false
        })
        //等到动画完毕后通知父组件
        setTimeout(()=>{
            this.props.CloseEvent && this.props.CloseEvent();
        },240);
    }
    render(){
        let msgTypeClass = '';
        let iconClass = '';
        switch (this.props.MessageType) {
          case 'success':
              msgTypeClass = 'message-success';
              iconClass = 'icon-check-circle';
              break;
          case 'warning':
              msgTypeClass = 'message-warning';
              iconClass = 'icon-warning-circle';
              break;
          case 'error':
               msgTypeClass = 'message-error';
               iconClass = 'icon-close-circle';
               break;
          default:
               msgTypeClass = 'message-info';
               iconClass = 'icon-check-circle';
        }
        const aniClass = this.state.isShowMessage ? 'message-fade-enter':'message-fade-leave';
        return (
          <div className={`message-notice ${aniClass}`}>
              <div className={`message-notice-content ${msgTypeClass}`}>
                  <span className={`message-icon ${iconClass}`}></span>
                  <span>{this.props.MessageContent}</span>
                  <a tabIndex="0" onClick={this.close.bind(this)} className="message-nitice-content-close">
                    <span className="message-nitice-content-close-x">×</span>
                  </a>
              </div>
          </div>
        );
    }
}
MessageNoticeCom.defaultProps = defaultProps;

export default MessageNoticeCom;
