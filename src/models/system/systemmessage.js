/**
 * 系统消息model
 */

const _initState=[{
  messageid:-1,
  //0:alert|1:message|2:modal:|3:comfirm|4:Notification
  type:0,
  //需要提示的消息内容
  text:'',
  //按钮集合，最多支持两个按钮，每个按钮的元素属性为：
  //buttontext：按钮文字描述
  //url：按钮跳转的地址
  //eventparams：按钮事件参数{type:namespace/asyncfunction,params}
  buttons:[]
}];
export default {
  namespace : 'SystemMessage',
  state : _initState,
  effects : {
    // 查询操作
    * query({params},{select,call,put}) {
      // 暂不实现获取功能
      console.log('111');
    }
    // 插入一条消息
    * insert({params},{select,call,put}){

    }
    // 移除一条消息
    * remove({messageid},{select,call,put}){

    }
  },
  reducers : {
    // 暂不实现拼装功能

  }
}
