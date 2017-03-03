/**
*  confirm组件
*  直接调用组件的Show方法弹出confirm
*  参数： props object
*               Title : 标题
*               Content : 内容
*               Buttons: 按钮的属性 array 按照按钮索引0，1放在数组中
*                        text: 按钮的文字内容
*                        className： 按钮的class
*        callback: 点击确定按钮的回调方法 方法参数 isConfirm bool
*/
import HyModalCom from '../hymodalcom';

function Show (properties,callback){
     const props = properties || {};
     const attr = {
        Title : props.Title,
        BodyContent : <span>{props.Content}</span>,
        FootButtons :[
              {
                  text : props.Buttons && props.Buttons[0] ? props.Buttons[0].text : '确定',
                  className : props.Buttons && props.Buttons[0] ? props.Buttons[0].className : ''
              },
              {
                  text : props.Buttons && props.Buttons[1] ? props.Buttons[1].text : '取消',
                  className : props.Buttons && props.Buttons[1] ? props.Buttons[1].className  : 'btn-default'
              }]
     }
     HyModalCom.Show(attr,(index)=>{
         callback && callback(index == 0);
     })
}
export default {
   Show : Show
}
