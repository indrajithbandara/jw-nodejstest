/**
*  分页组件
*  -Props-
*PagInationData: 分页组件数据 object
*                DataCount: 数据数量
*                PageIndex: 当前页索引
*                PageSize: 页数量
*IsShowInput: 是否显示输入框可以输入页数跳转
*PagInationEvent: 分页事件
*                sender: 触发事件的target  object
*                args: 参数对象
*                      index: 页索引
*/

import React, {Component} from 'react';
import "./index.css"

//创建并导出组件
export default class HyPaginationCom extends Component{
  constructor(props){
     super(props);
     this.state = {
        PageCount : 0
     }
  }
  componentWillReceiveProps(nextProps){
     if(!nextProps.PagInationData)
     {
        return;
     }
     this.PageCount = parseInt((parseInt(nextProps.PagInationData.DataCount,10) + parseInt(nextProps.PagInationData.PageSize,10) - 1) / parseInt(nextProps.PagInationData.PageSize,10),10);
  }
  /**
  * 处理跳转页码事件
  * @param {number} 页索引
  * @param {object} 事件对象
  */
  _jumpPage(index,event){
      if(this.props.PagInationEvent)
      {
        if(!index)
        {
           index = this.refs.pageInput.value;
        }
        if(!index)
        {
           alert("请输入正确的页码");
           return;
        }
        else
        {
           if(isNaN(index) || index < 1 || index > this.PageCount)
           {
               alert("当前页不存在");
               return;
           }
        }
        this.props.PagInationEvent(event,{index:index});
      }
      event.stopPropagation();
      event.preventDefault();
  }

  render(){
     if(!this.props.PagInationData)
     {
        return null;
     }
     let liArr = [];
     let pagData = this.props.PagInationData;
     //总页数
     let pageCount = this.PageCount;
     let showCount = 10; //需要显示的页数
     let pagePre = pagData.PageIndex - (showCount / 2); //左边显示的最小页数
     if (pagData.PageIndex <= 1)
     {
         liArr.push(<li className="disabled" key="pre"><a href="javascript:;">«</a></li>);
     }
     else
     {
         liArr.push(<li key="pre"><a href="javascript:;" onClick={this._jumpPage.bind(this,pagData.PageIndex - 1)}>«</a></li>);
     }
     if(pagePre <= 1 || pageCount <= showCount)
     {
        //如果最小小于1,则需要从1开始显示
        pagePre = 1;
     }
     else
     {
         //如果显示不足
        if(pagePre > (pageCount - showCount))
        {
           pagePre = pageCount - showCount + 1;
        }
        //如果大于1,则显示...
        liArr.push(<li key="morePre"><a>...</a></li>)
     }
     //显示的右边最大页数
     var pageNext = pagData.PageIndex + (showCount / 2);
     if ((showCount / 2) % 2 == 1)
     {
         pageNext -= 1;
     }
     if (pageNext >= pageCount)
     {
         //如果大于总页数,则显示到总页数
         pageNext = pageCount;
     }
     if (pageNext < showCount)
     {
         //如果小于总页数,则显示到右边最大页数
         pageNext = showCount < pageCount ? showCount : pageCount;
     }
     if (pagData.PageIndex > 0 && pageCount > 0)
     {
         for (let i = pagePre; i <= pageNext; i++)
         {
             if (pagData.PageIndex == i)
             {
                 liArr.push(<li className="active" key={i}><a onClick={this._jumpPage.bind(this,i)}>{i}</a></li>);
             }
             else
             {
                 liArr.push(<li key={i}><a onClick={this._jumpPage.bind(this,i)}>{i}</a></li>);
             }
         }
     }
     //如果小于总页数,则需要显示...
     if (pageNext < pageCount && pageCount > showCount)
     {
         liArr.push(<li key="moreNext"><a>...</a></li>);
     }
     if (pagData.PageIndex >= pageCount)
     {
         liArr.push(<li className="disabled" key="next"><a href="javascript:;">»</a></li>);
     }
     else
     {
         liArr.push(<li key="next"><a onClick={this._jumpPage.bind(this,pagData.PageIndex + 1)}>»</a></li>)
     }
     if(pagData.IsShowInput) //是否可以输入页索引跳转
     {
         liArr.push(<li key="input" className="pagination-input-li"><input ref="pageInput" type='number' className="form-control pagination-input"/><button className="btn btn-primary pagination-btn" onClick={this._jumpPage.bind(this,undefined)}>跳转</button></li>);
     }
     return (
        <div>
            <ul className="pagination pagination-ul">
               {liArr}
            </ul>
        </div>
     );
  }
}
