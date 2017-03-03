module.exports = {
  path: '30000101',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/30000101'))
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
