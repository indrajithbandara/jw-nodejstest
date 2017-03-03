module.exports = {
  path: 'resvcenter',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/resvcenterpage'))
    })
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {component: require('./resvlistroutes/components/resvlist_view')})
    })
  },
  onEnter(nextState, replace, callback
    ?) {
    callback();
  },
  onChange(prevState, nextState, replace, callback
    ?) {
    callback();
  },
  onLeave(prevState) {
    return false;
  }
}
