import React, {Component, PropTypes} from 'react';
import {HistoryHandle} from '../../../utils/router_helper';

class LeftMenuCom extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * 页面跳转
   * @param  {string} menuvalue 传入的业务模块名称
   * @return {null}
   */
  _pageTo = (menuvalue) => {
    console.log(menuvalue);
    if(this.props.MenuClick){
      this.props.MenuClick(menuvalue);
    }
    // HistoryHandle.replace(`/main/${_tabIndex}/${menuvalue}`);
  }

  render() {
    let menudata = this.props.MenuData;
    if (!menudata) {
      menudata = [];
    }
    return (
      <div className="panel panel-primary paddingl-r-0">
        <div className="panel-heading">多任务DEMO</div>
        <div className="panel-body">
          <p>满足以下需求：</p>
          1、多窗口<br/>
          2、多任务<br/>
          3、数据缓存<br/>
          4、本地持久化<br/>
        </div>

        <ul className="list-group">
          {menudata.map((item, index) => {
            return (
              <li key={index} className="list-group-item" onClick={() => {
                this._pageTo(item.menuvalue)
              }}>
                {item.text}
              </li>
            )
          })
}
        </ul>
      </div>

    );
  }
}

module.exports = LeftMenuCom;
