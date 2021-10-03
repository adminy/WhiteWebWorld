const Tabs = require('../components/tabs')
const DomainsListConfig = require('../components/domains_list/config')
const DomainsList = require('../components/domains_list/main')
const DomainsListPages = require('../components/domains_list/pages')

module.exports = (state, emit) => (
  <body>
    <section class='section'>
      <div class='container'>
        <Tabs />
        <DomainsListConfig />
        <DomainsList domains={state.domains} />
        <DomainsListPages />
      </div>
    </section>
  </body>
)
