module.exports = (state, emitter) => {
  React.createElement = (tag, attr, ...children) => {
    if (typeof attr === 'string' || Array.isArray(attr)) {
      children.unshift(attr)
      attr = {}
    }
    attr = attr || {}
    attr.children && !children.length && ({ children, ...attr } = attr)
    return React.jsx(tag, { ...attr, children, state, emitter }, attr.key)
  }

  emitter.on('formSubmit', e => {
    e.preventDefault()
    const form = new FormData(e.target)
    const name = form.get('your-name')
    document.location.href = `/user/${name}`
  })

  emitter.on('connectRoom', () => {
    const { name } = state.params
    const ws = new WebSocket(`ws://localhost/user/${name}`)
    ws.binaryType = 'arraybuffer'
    ws.onopen = () => emitter.emit('render')
    ws.onerror = ws.onclose = () => emitter.emit('render')
  })

  state.domains = []

  fetch('/api/domains').then(res => res.json()).then(domains => {
    state.domains = domains
    emitter.emit('render')
  })

  const $C = id => document.getElementById(id).classList
  emitter.on('user-settings', () => $C('user-settings-popup').add('is-active'))
  emitter.on('settings', () => $C('settings-popup').add('is-active'))
}
