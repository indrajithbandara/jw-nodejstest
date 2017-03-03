import React from 'react'
import './hymenuitem.css';

export default class HyMenuCom extends React.Component{
    constructor(props)
    {
       super(props);
    }
    menuClick(event){
       if(this.props.MenuClickEvent)
       {
          this.props.MenuClickEvent(event,{
               index: this.props.index,
               data: this.props.menuData
          });
       }
       event.stopPropagation();
       event.preventDefault();
    }
    render(){
       return (
          <li role="presentation" className={`menu-item-class ${this.props.CustomClassName}`} style={this.props.CustomStyle} onClick={this.menuClick.bind(this)}>
             <span className={this.props.menuData.icoclass}></span>
             <a role="menuitem" href="#">{this.props.menuData.text} </a>
          </li>
       )
    }
}
