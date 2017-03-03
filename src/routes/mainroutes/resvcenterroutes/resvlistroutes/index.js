module.exports = {
  path: 'resvlist(/:resvnum)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/resvlist-view'))
    })
  },
}
