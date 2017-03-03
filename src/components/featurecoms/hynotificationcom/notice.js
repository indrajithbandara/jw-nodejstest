import React from 'react'

import './notice.css'

const defaultProps = {
    Duration : 0,
    Closable : true
}

class HyNoticeCom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           isShowNotification : true
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
    clearCloseTimer(){
        if(this.closeTimer)
        {
           clearTimeout(this.closeTimer);
           this.closeTimer = null;
        }
    }
    close(){
        this.clearCloseTimer();
        this.setState({
            isShowNotification : false
        });
        //等到动画完毕后通知父组件
        setTimeout(()=>{
            this.props.CloseEvent && this.props.CloseEvent();
        },240);
    }
    handleClick(i,event){
        this.props.Options[i].ActionEvent && this.props.Options[i].ActionEvent(event,{index : i});
        event.stopPropagation();
        event.preventDefault();
    }
    render(){
        let action = [];
        if(this.props.Options)
        {
           for(let i = 0;i < 2;i++)
           {
               let tempOpt = this.props.Options[i];
               if(tempOpt)
               {
                 let className = tempOpt.CustomClassName || 'btn-primary';
                 action.push(<button className={`btn btn-xs ${className}`} key={i} onClick={this.handleClick.bind(this,i)}>{tempOpt.text}</button>)
               }
           }
        }
        let aniClass = this.state.isShowNotification ? 'notification-fade-enter' : 'notification-fade-leave';
        return (
            <div className={`notification-notice ${aniClass}`}>
               <div className="notification-notice-content">
                  <div className="notification-notice-message">
                      {this.props.Title}
                  </div>
                  <div className="notification-notice-description">
                      {this.props.Description}
                  </div>
                  <div className="notification-notice-btn">
                      {action}
                  </div>
               </div>
               {this.props.Closable ?
                   <a tabIndex="0" onClick={this.close.bind(this)} className="notification-notice-close">
                     <span className="notification-notice-close-x"></span>
                   </a> : null
               }
            </div>
        );
    }
}
HyNoticeCom.defaultProps = defaultProps;

export default HyNoticeCom;
