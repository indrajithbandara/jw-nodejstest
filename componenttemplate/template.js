/**
 * 组件说明
 * -Props-
 * 公开属性说明
 */
// 引用React基础类库
import React, {Component, PropTypes} from 'react'
// 性能优化库
import {is} from 'immutable';
// redux连接方法
import {connect} from 'dva';

// 语言资源文件
import {GetLanguage} from '../../../../../localize/30000101';

// 拼接传入的数据对象，根据具体的业务绑定业务model
// 所有的业务组件必须导入AuthModel
function mapStateToProps(state) {
  return {
    ...state
  };
}

// 实现上下文数据绑定注解
@connect(mapStateToProps, null, null, {withRef: true})
// 组件基础功能注解
@BaseComponet
// 实现多任务多窗口注解
@MultiTaskComponent
// 创建组件
class componentName extends Component {

  // 验证props参数使用，暂时不适用
  static propTypes = {};

  // 构造函数
  constructor(props) {
    super(props)

    //初始化当前组件的state
    this.state = {
      //插入组件相关的状态
      //...
      //实现多任务多窗口代码片段
      ...this.props.DefaultState
        ? this.props.DefaultState.thisState
        : {}
    }
  }

  // 组件初次将要渲染方法
  componentWillMount() {}

  // 组件初次渲染完成方法
  componentDidMount() {}

  // Props或者state发生变更触发
  componentWillReceiveProps(nextProps) {
    // 如果当前组件为终极业务组件，需要实现根据页签索引更新当前组件defaultstate属性
    if (!is(this.props.params.tabindex, nextProps.params.tabindex)) {
      // 业务代码
      // ....

      // 根据新传入的props更新当前组件的默认状态
      this.setState({
        ...nextProps.DefaultState
          ? nextProps.DefaultState.thisState
          : {}
      })
    }

  }

  // 判断将要渲染的属性与当前属性是否相当，做性能优化，注解已经实现了该方法，注释即可！
  // shouldComponentUpdate (nextProps, nextState) {
  //
  // }

  // 组件将要更新触发
  componentWillUpdate(nextProps, nextState) {}

  // 组件更新完成触发
  componentDidUpdate(prevProps, prevState) {}

  // 逐渐将要注销触发
  componentWillUnmount() {}

  // 对外公开的方法，首字母大写
  PublicFunction = () => {}

  // 私有方法，使用下划线开头
  _privateFunction = () => {}

  // 渲染方法
  render() {

    // 实现自定义样式
    const _className = `resvlistcom row ${this.CustomClassName}`;

    // 实现多窗口多任务
    const _DefaultState = this.props.DefaultState;
    const _childrenState = (_DefaultState && _DefaultState.childrenState)
      ? _DefaultState.childrenState
      : {};

    // 如果该组件的子组件是根据按需加载的方式加载，需要调用注解中的方法克隆自组件
    // 注：功能组件不允许按需加载
    let _children = _getpropsChildren();

    // 判断以下组件是否被授权
    let _authorizeComponent;
    // OverrideAuth:父组件传入，表示是否覆盖自组件对外开放的权限
    // IsShowAuthorizeComponent：自定义属性，在这里表达是否创建authorityComponent组件
    if (this.props.OverrideAuth) {
      // 使用IsShowAuthorizeComponent代替权限号“1000”的判断
      if(this.props.IsShowAuthorizeComponent){
        // 根据业务对组件做操作
        // _authorityComponent=<span>需要授权判断的组件</span>
      }
      else{
        // 根据业务对组件做操作
        // _authorityComponent=<span>需要授权判断的组件</span>
      }
    }
    // 调用注解提供的方法验证组件授权
    // param1:this
    // param2:auth类型 0:授权
    // param3:authcode
    // else if (this._checkAuth(this, 0, '1000')) {
      // 根据业务对组件做操作
      // _authorityComponent=<span>需要授权判断的组件</span>
    // }

    // 判断以下组件是否有权限显示，
    // 所有被权限控制的组件功能，一定要对外公开对应的权限方法
    let _authorityComponent;
    // 调用注解提供的方法验证组件权限
    // param1:this
    // param2:auth类型 1:权限
    // param3:authcode
    if (this._checkAuth(this, 1, '5001')) {
      // 根据业务对组件做操作
      // _authorityComponent=<span>需要权限判断的组件</span>
    }

    // 使用语种资源文件
    const _searchItems = [
      {
        text: GetLanguage('C30000101-SearchItems-0-text'),
        type: 'input',
        default: '',
        placeholder: GetLanguage('C30000101-SearchItems-0-placeholder')
      }
    ]

    return (
      <div>
        {/* 按需加载子组件 */}
        {_children}

        {/* 非按需加载子组件 ref:组件ID  DefaultState：组件默认状态*/}
        <input ref="userName" DefaultState={_childrenState.userName}></input>

        {/* 需要授权判断的组件 */}
        {_authorizeComponent}

        {/* 需要组件判断的组件 */}
        {_authorityComponent}

        {/* 多语种实现 */}
        {/* <BaseSearchCom SearchItems={_searchItems}></BaseSearchCom> */}
      </div>
    )
  }
}

// es5调出方法，兼容router按需加载
module.exports = ResvListView;
