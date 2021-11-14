const Header = require('./header')

const App = ({ children }) => (
  <body>
    <section class='section'>
      <Header />
      <div class='container'>
        {children}
      </div>
    </section>
  </body>
)
module.exports = App
