const App = require('../components/app')
const Dns = require('../components/dns')

module.exports = (state, emit) => (
  <App>
    <Dns />
  </App>
)
