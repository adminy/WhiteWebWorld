module.exports = (state, emitter) => {
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
}
