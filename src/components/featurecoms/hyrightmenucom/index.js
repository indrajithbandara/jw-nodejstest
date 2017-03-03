/**
*  右键菜单组件
*需设置父元素的position为relative，并指定id然后传入Container Props
*  -Props-
*Container：父级相对定位元素id 必传 不传无法确定位置
*HeadInfo: 菜单头部数据 string
*DatasSource 菜单数据 array
*            text: 显示的内容 string
*            icoclass: 菜单左边图标样式
*CustomClassName: 自定义样式类
*CustomStyle: 自定义样式
*MenuClickEvent: 点击菜单事件
*                sender: 事件对象  object
*                args: 参数对象
*                      index: 菜单索引
*                      data: 菜单数据
*                      mouseUpTarget: 鼠标抬起时的target
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

//component
import HyMenuCom from './hymenuitem'
import RootCloseWrapper from '../rootclosewrapper';

//当前显示的右键菜单组件
let CurrentShowRightMenu = null;

//创建并导出组件
export default class HyRightMenuCom extends React.Component{
    constructor(props)
    {
       super(props);
       this.state = {
           rightMenuStyle : {display : 'block'},  //先设置为block以便在didMount时获取元素宽高
           mouseUpTarget: ''
       }
    }
    componentDidMount(){
       let parentNode = ReactDOM.findDOMNode(this).parentNode; //拿到该组件的父节点

       // 监听父组件的右键事件
       parentNode.addEventListener('mouseup',this.mouseUp.bind(this));
       parentNode.addEventListener('contextmenu',this.contextMenu.bind(this));
       //parentNode.addEventListener('click',this.handleClick.bind(this));
       //将rightMenu的宽高保存起来，为了后面使用
       let rightMenu = ReactDOM.findDOMNode(this.refs.rightMenuWrapper);
       this.rightMenuWidth = rightMenu.clientWidth;
       this.rightmMenuHeight = rightMenu.clientHeight;
       this.setState({
          rightMenuStyle : {display:"none"}
       })  //隐藏右键菜单
    }
    componentWillUnMount(){
       parentNode.removeEventListener('mouseup');
       parentNode.removeEventListener('contextmenu');
       //parentNode.removeEventListener('click');
    }
    /**
    *获取left偏移量
    * @param target点击的元素
    * @param container 父组件传递的用于确定位置的id
    */
    getOffsetLeft(target,container)
    {
       if(target.id === container)
       {
          return 0;
       }
       return target.offsetLeft + ((target.offsetParent && target.offsetParent.id !== container) ? this.getOffsetLeft(target.offsetParent,container) : 0 );
    }
    /**
    *获取top偏移量
    * @param target点击的元素
    * @param container 父组件传递的用于确定位置的id
    */
    getOffsetTop(target,container)
    {
      if(target.id === container)
      {
         return 0;
      }
       return target.offsetTop + ((target.offsetParent && target.offsetParent.id !== container) ? this.getOffsetTop(target.offsetParent,container) : 0 );
    }
    /**
    *获取点击位置相对于点击控件的X值
    * @param event 点击事件
    */
    getOffsetX(event){
       return event.clientX - event.target.getBoundingClientRect().left;
    }
    /**
    *获取点击位置相对于点击控件的Y值
    * @param event 点击事件
    */
    getOffsetY(event){
       return event.clientY - event.target.getBoundingClientRect().top;
    }
    /**
    * 鼠标抬起时事件
    */
    mouseUp(event){
       if(!this.props.Container)
       {
          alert('请在Prop上传递Container，值为父级相对定位元素id，否则无法确定右键菜单显示位置')
          return;
       }
       if(event.button !== 2) //如果不是右键
       {
          return;
       }
       //判断当前显示的右键菜单，确保当前页面只有一个右键菜单显示
       if(CurrentShowRightMenu && CurrentShowRightMenu != this)
       {
          CurrentShowRightMenu.handleClick();
       }
       CurrentShowRightMenu = this;
       // this.getOffsetX(event,event.target)
       let left = this.getOffsetLeft(event.target,this.props.Container) + this.getOffsetX(event); //offsetLeft获取当前元素到其父级层左边的距离. offsetX点击区域到点击元素左上角的角力
       let top = this.getOffsetTop(event.target,this.props.Container) + this.getOffsetY(event);
       //距离浏览器最大left = 可视区域宽度 - 右键菜单宽度
       let maxClientX = document.documentElement.clientWidth - this.rightMenuWidth;
       //距离浏览器最大top = 可视区域高度 - 右键菜单高度
       let maxClientY = document.documentElement.clientHeight - this.rightmMenuHeight;
       //如果大于距离浏览器最大left，并且整个可视窗口能容得下右键菜单，往左移相应的大小
       if(maxClientX > 0 && event.clientX > maxClientX)  //
       {
          left = left - (event.clientX - maxClientX);
       }
       //如果大于距离浏览器最大left，并且整个可视窗口能容得下右键菜单,往上移相应的大小
       if(maxClientY > 0 && event.clientY > maxClientY)
       {
          top = top - (event.clientY - maxClientY);
       }
       if(event.button == 2)  //代表单击的是右键
       {
          this.setState({
             rightMenuStyle : {display:"block",top:top,left:left},
             mouseUpTarget : event.target
          })
       }
    }
    /**
    *contextmenu事件
    */
    contextMenu(event){
        event.preventDefault();
        event.stopPropagation();
    }
    /**
    *点击菜单外会触发的事件
    */
    handleClick(event){
        this.setState({
           rightMenuStyle : {display:"none"}
        })
    }
    /**
    *点击菜单会触发的事件
    */
    menuClick(sender,obj){
        if(this.props.MenuClickEvent)
        {
           this.props.MenuClickEvent(sender, {
                ...obj,
                mouseUpTarget: this.state.mouseUpTarget
           });
        }
        this.handleClick(sender);
    }
    render(){
        return (
            <RootCloseWrapper onRootClose={this.handleClick.bind(this)}>
                  <ul className="dropdown-menu right-menu-ul" style={this.state.rightMenuStyle} role="menu" ref="rightMenuWrapper">
                     <li role="presentation" className="dropdown-header">{this.props.HeadInfo}</li>
                     {this.props.DatasSource.map(function(value,index){
                        return (<HyMenuCom  menuData={value} key={index} index={index} CustomStyle={this.props.CustomStyle}
                          CustomClassName={this.props.CustomClassName} MenuClickEvent={this.menuClick.bind(this)}/>)
                     }.bind(this))}
                     <li role="presentation" className="dropdown-header">{this.props.FootInfo}</li>
                  </ul>
            </RootCloseWrapper>
       )
    }
}
