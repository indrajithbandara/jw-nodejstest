

const _initState = {
  // 权限代码
  authority: [
    '5001',
    '5000',
    '5003',
    '5004',
    '5005',
    '5006',
    '5007',
    '5008',
    '5009',
    '6001'
  ],
  // 授权代码
  authorize: [
    '001',
    '002',
    '003',
    '004',
    '005',
    '006',
    '1123',
    '3212',
    '0001'
  ]
};

import {query} from '../../services/resvlogic';

//authority
//authorize
export default {
  namespace : 'AuthModel',
  state : _initState,
  effects : {
    // 查询操作
    * query({
      params
    }, {select, call, put}) {
      // 暂不实现获取功能
    }
  },
  reducers : {
    // 暂不实现拼装功能

  }
}
