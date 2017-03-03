// 公共的ajax帮助库
import request from '../utils/request_helper';
// 参数对象序列化库
import qs from 'qs';

/**
 * 查询用户列表
 * @param  {object}  params 查询参数对象
 * @return {Promise}        [description]
 */
export async function query(params) {
  return request(`/api/message_query?${qs.stringify(params)}`);
}
