
import { query } from '../../services/messagelogic';
import Immutable from 'immutable';

const _initState={
  // 业务数据列表
  data: [],
  // 总数据量
  recordsTotal: 0,
  // 当前是否处于加载状态
  loading: false,
  // 当前页索引
  currentPage: 1,
  // 单页数据量
  pageSize:10,
  // 公共对象，用于保存前后端交互所使用的所有公共属性
  responseCommonDto:{}
};

export default {
  namespace : 'MessageListModel',
  state : _initState,
  effects : {
    // 查询操作
    * query(params,{select,call,put}) {
      // 获取当前是否正在加载数据
      const loading = yield select(state => state.loading);
      if(loading){
        // 如果现在正在加载数据则直接返回
        return;
      }
      // 设置当前model开始加载数据
      yield put({ type: 'showLoading' });
      // 调用query方法API层获取数据，并通过解构式赋值的写法赋值给data变量
      const { data } = yield call(query);
      // 判断API层返回的数据是否可用(数据合法性由数据访问类库封装)
      if (data) {
        // 触发reducers对应的方法拼装当前组件的state
        yield put({
          type: 'querySuccess',
          redata: {...data}
        });
      }
    },
    *create() {},
    * 'delete' () {},
    *update() {}
  },
  reducers : {
    // 加载中状态
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    // 查询数据成功
    querySuccess(state, action) {
      return {...state, ...action.redata, loading: false};
    },
    // 新建成功
    createSuccess() {},
    // 删除成功
    deleteSuccess() {},
    // 更新成功
    updateSuccess() {}
  }
}
