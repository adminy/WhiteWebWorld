function changeTab (e) {
  e = e.target.parentElement
  const tab = e.tagName === 'LI' ? e : e.parentElement
  const tabs = tab.parentElement.childNodes
  tabs.forEach(tab => tab.classList.remove('is-active'))
  tab.classList.add('is-active')
}

const Tab = ({ name, name2, icon, icon2, isActive }) => (
  <li class={{ 'is-active': isActive }} onclick={changeTab}>
    <a>
      <span class='icon is-small'>
        <i class={'fas fa-' + icon} aria-hidden='true' />
      </span>
      <span>{name} &nbsp;</span>
      {icon2 && <span><i class={'fas fa-' + icon2} aria-hidden='true' /></span>}
      {name2 && <span>{name2}</span>}

    </a>
  </li>
)

module.exports = () => (
  <div class='tabs is-centered is-boxed is-medium'>
    <ul>
      <Tab name='Websites Log' icon='list-alt' isActive />
      <Tab name='Whitelist' name2='Blacklist' icon='user-check' icon2='ban' />
      <Tab name='DNS Servers' icon='server' />
    </ul>
  </div>
)
