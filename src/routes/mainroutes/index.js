module.exports = {
  path: 'main/:tabindex',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/mainframe'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./resvcenterroutes'),
        require('./30000101')
      ])
    })
  }
}
