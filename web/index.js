// styles
import 'bulma/css/bulma.min'
import 'bulma-tooltip/dist/css/bulma-tooltip.min'
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import './style.scss'
window.React = require('jsx-dom')
const choo = require('choo')
const app = choo()
app.mount('body')

// store procedures
app.use(require('./store-procedures/task'))

// routes
app.route('/', require('./views/logs'))
app.route('/filters', require('./views/filters'))
app.route('/dns', require('./views/dns'))
