import React, {Component, PropTypes} from 'react';
import {is} from 'immutable';
import {IsRender,BaseComponet,MultiTaskComponent} from '../../../utils/component_helper';
import {connect} from 'dva';

// lib
import {HistoryHandle} from '../../../utils/router_helper';
import {GetSessionItem,SetSessionItem} from '../../../utils/sessionstorage_helper';

// component
import {LeftMenuCom} from '../../../components/featurecoms';
import MessageManage from '../../../components/businesscoms/messagemanage';

@MultiTaskComponent
@BaseComponet
class MainFrame extends Component {

  // 获取当前类信息
  GetComponentInfo() {
    return {ComponentName: "ResvListCom", ComponentVersion: "1.0", ComponentTitle: "预定查询"}
  }

  static propTypes = {};

  constructor(props) {
    super(props);

    // 组件初始化获取之前的tab标签数据和tab内容路由数据
    const _tabData = GetSessionItem('tabData');
    const _tabItems = GetSessionItem('tabItems');

    this.state = {
      // 初始化菜单数据
      menudata: [
        {
          text: '预订中心',
          menuvalue: 'resvcenter'
        }, {
          text: '会员中心',
          menuvalue: 'membercenter'
        }, {
          text: '客史中心',
          menuvalue: 'historycenter'
        }, {
          text: '来访信息管理',
          menuvalue: 'visitcenter'
        }, {
          text: '分析中心',
          menuvalue: 'analysiscenter'
        }, {
          text: '系统配置',
          menuvalue: 'sysconfig'
        }
      ],
      // 初始化页签数据
      tabitems: _tabItems
        ? _tabItems
        : [
          {
            tabtitle: '空白标签',
            tabcontenttag: '',
            active: true
          }
        ],
      // 初始化页签路由数据
      customrouter: _tabData
        ? _tabData
        : {}
    };
  }

  /**
   * 当props或者state发生变更时触发
   */
  componentWillReceiveProps(nextProps) {
    //验证tabindex是否合法
    const _checkvalue = this._checkTabindex(nextProps.params.tabindex);
    if (!_checkvalue) {
      return;
    }
    // 提取当前tab数据
    let _tabitems = this.state.tabitems;
    // 界面路由缓存数据
    let _customrouter = this.state.customrouter;
    // 按照当前tab索引查询并修改tab数据
    if (_tabitems[this.props.params.tabindex]) {
      _tabitems[this.props.params.tabindex].tabcontenttag = this.props.location.pathname;
      _tabitems[this.props.params.tabindex].active = false;
    }
    // 根据待跳转页面的tab索引查询并修改tab数据
    _tabitems[nextProps.params.tabindex].active = true;

    // 根据待跳转页面的子视图更新tab数据中tab索引对应的数据标题属性
    if (nextProps.children) {
      _tabitems[nextProps.params.tabindex].tabtitle = nextProps.children.type.Title;
    } else {
      _tabitems[nextProps.params.tabindex].tabtitle = '空白标签';
      // 清空当前节点下的历史数据
      delete _customrouter[nextProps.params.tabindex];
    }

    const _thisUrl = this.props.location.pathname;
    if (this.refs.MainViewChildren) {

      const _thisChildrenData = this.refs.MainViewChildren.MultiTaskGetState();
      _customrouter[this.props.params.tabindex] = {
        ..._customrouter[this.props.params.tabindex],
        [_thisUrl]: _thisChildrenData
      }
    }

    // 通过本地存储保存tab数据
    SetSessionItem('tabData',_customrouter);
    SetSessionItem('tabItems',_tabitems);

    // 重新设置当前组件的state
    this.setState({tabitems: _tabitems, customrouter: _customrouter});
  }

  // 将要进行渲染时触发
  componentWillMount() {
    // 检查当前页签索引是否合法
    this._checkTabindex(this.props.params.tabindex);
  }

  /**
   * 检查tab索引是否超过了当前的最大值
   * @param  {number} tabindex tab缩影
   * @return {[type]}          [description]
   */
  _checkTabindex = (tabindex) => {
    let _recheck = true;
    if (tabindex >= this.state.tabitems.length) {
      HistoryHandle.replace('/main/0');
      _recheck = false;
    }
    return _recheck;
  }

  /**
   * 获取Tab项目标签
   * @return jxsArr
   */
  _getTabList = () => {
    const _tabTitles = this.state.tabitems.map((item, index) => {
      return (
        <li key={index} role="presentation" className={this.state.tabitems[index].active
          ? 'active'
          : ''}>
          <a onClick={() => {
            this._switchTab(index)
          }}>{this.state.tabitems[index].tabtitle}</a>
        </li>
      );
    });
    return _tabTitles;
  }

  /**
   * 切换Tab标签
   * @param  {number} tabindex 页签索引
   * @return {null}
   */
  _switchTab = (tabindex) => {
    if (!is(tabindex, parseInt(this.props.params.tabindex))) {
      const _tabcententTag = this.state.tabitems[tabindex].tabcontenttag;
      HistoryHandle.replace(_tabcententTag);
    }
  }

  /**
   * 增加TAB标签
   */
  _addTab = () => {
    //
    let _activeIndex = this.state.tabitems.findIndex(item => {
      return item.active
    });
    let _tabItems = this.state.tabitems;
    _tabItems[_activeIndex].active = false;
    _tabItems.push({tabtitle: '空白标签', tabcontenttag: '', active: true});
    this.setState({
      ...this.state,
      tabitems: _tabItems
    })
    HistoryHandle.replace(`/main/${this.state.tabitems.length - 1}`);
  }

  /**
   * 对于按需加载的子组件，进行克隆操作并附上系统需要的Props值
   * @return {[type]} [description]
   */
  _getpropsChildren = () => {
    if (this.props.children) {
      let _customrouter = {};
      if (this.state.customrouter && this.state.customrouter != {}) {
        _customrouter = this.state.customrouter[this.props.params.tabindex]
          ? this.state.customrouter[this.props.params.tabindex][this.props.location.pathname]
          : {};
      }
      return React.cloneElement(this.props.children, {
        ref: 'MainViewChildren',
        DefaultState: _customrouter
      });
    } else {
      return <div/>;
    }
  }

  /**
   * 点击菜单事件
   * @param  {string} menuvalue 菜单路由值
   * @return {[type]}           [description]
   */
  _menuClick = (menuvalue) => {
    //获取当前页面Tab索引
    const _tabIndex = this.props.params.tabindex
      ? this.props.params.tabindex
      : 0;
    HistoryHandle.replace(`/main/${_tabIndex}/${menuvalue}`);
  }

  // 渲染方法
  render() {
    const _tabTitles = this._getTabList();
    const _children = this._getpropsChildren();
    return (
      <div className="mainappframe row paddingl-r-0">
        <div className="col-md-2 col-lg-2 leftframe" style={{paddingBottom:'426px'}}>
          <LeftMenuCom MenuData={this.state.menudata} MenuClick={this._menuClick} TabIndex={this.props.params.tabindex}/>
          {/* <MessageManage ModelCode={this._getchildrenCode(this,'messagemanage')}/> */}
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 rightframe paddingl-r-0">
          <ul className="nav nav-tabs">
            {_tabTitles}
            <li role="presentation">
              <a onClick={this._addTab}>+</a>
            </li>
          </ul>

          <div className="tab-content">
            {_children}
          </div>
        </div>
      </div>
    )
  }
}
module.exports = MainFrame;
