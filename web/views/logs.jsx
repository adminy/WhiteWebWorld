const App = require('../components/app')
const DomainsListConfig = require('../components/domains_list/config')
const DomainsList = require('../components/domains_list/main')
const DomainsListPages = require('../components/domains_list/pages')

module.exports = (state, emit) => (
  <App>
    <DomainsListConfig />
    <DomainsList domains={state.domains} />
    <DomainsListPages />
  </App>
)
