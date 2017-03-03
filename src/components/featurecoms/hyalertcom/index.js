/**
*  alert组件
*  直接调用组件的Show方法弹出alert
*  参数： props object
*               Title : 标题
*               content : 内容
*        callback: 点击确定按钮的回调方法
*/
import HyModalCom from '../hymodalcom';

function Show(properties,callback) {
  const props = properties || {};
  let prop = {
     Title : props.Title,
     BodyContent : <span> {props.Content}</span>,
     FootButtons : [{
         text : '确定'
     }]
  }
  HyModalCom.Show(prop,(index)=>{
     callback && callback(index);
  })
};

export default {
   Show : Show
}
