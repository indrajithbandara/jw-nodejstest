module.exports = {
  path: 'resvinfo/:resvnum',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/resvformview'))
    })
  },
}
