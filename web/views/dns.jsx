const Tabs = require('../components/tabs')
const DNS = require('../components/dns')

module.exports = (state, emit) => (
  <body>
    <section class='section'>
      <div class='container'>
        <Tabs />
        <DNS />
      </div>
    </section>
  </body>
)
