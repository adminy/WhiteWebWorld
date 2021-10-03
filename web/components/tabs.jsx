function changeTab (e, emitter, goto) {
  e = e.target.parentElement
  const tab = e.tagName === 'LI' ? e : e.parentElement
  const tabs = tab.parentElement.childNodes
  tabs.forEach(tab => tab.classList.remove('is-active'))
  tab.classList.add('is-active')
  emitter.emit('replaceState', goto)
}

const Tab = ({ goto, info, emitter }) => (
  <li class={{ 'is-active': window.location.pathname === goto }} onclick={e => changeTab(e, emitter, goto)}>
    <a>
      {info.map(({ name, icon }) => (
        <div>
          <span class='icon is-small'><i class={'fas fa-' + icon} aria-hidden='true' /></span>
          <span>&nbsp;{name}&nbsp;</span>
        </div>
      ))}
    </a>
  </li>
)

module.exports = () => (
  <div class='tabs is-centered is-boxed is-medium'>
    <ul>
      <Tab goto='/' info={[{ name: 'Websites Log', icon: 'list-alt' }]} />
      <Tab goto='/filters' info={[{ name: 'Whitelist', icon: 'user-check' }, { name: 'Blacklist', icon: 'ban' }]} />
      <Tab goto='/dns' info={[{ name: 'DNS Servers', icon: 'server' }]} />
    </ul>
  </div>
)
