// import key from 'keymaster';
export default {
  namespace : 'SystemFrame',
  state : {},
  subscriptions : {
    // keyboard({dispatch, history}) {
    //   try {
    //     key.filter = function(event) {
    //       var tagName = (event.target || event.srcElement).tagName;
    //       key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName)
    //         ? 'input'
    //         : 'other');
    //       return true;
    //     }
    //     key('F3', () => {
    //       console.log('up');
    //     });
    //     key('ctrl+down', () => {
    //       console.log('down');
    //     });
    //     key('ctrl+0+right', () => {
    //       console.log('alt-right');
    //     });
    //     key('shift+9', () => {
    //       console.log('shift-right');
    //     });
    //   } catch (e) {
    //     console.log('e',e);
    //   } finally {
    //
    //   }
    // },
    router({dispatch, history}) {
      // console.log('2');
      // history.listen(({pathname})=>{
      //   if(pathname==='/'){
      //     alert('222');
      //   }
      // });
    }
  },
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
