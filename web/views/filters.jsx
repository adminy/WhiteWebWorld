const Tabs = require('../components/tabs')
const FilterList = require('../components/filterlist')

module.exports = (state, emit) => (
  <body>
    <section class='section'>
      <div class='container'>
        <Tabs />
        <FilterList />
      </div>
    </section>
  </body>
)
