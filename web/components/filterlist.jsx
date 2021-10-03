const Tag = require('./tag')

const types = {
  0: 'danger', // Block (ads, malware, etc)
  1: 'info', // Entertainment (blocked during work hours)
  2: 'primary' // Educational (Resources & Information that is respectfully whitelisted),
}

function changeBlackWhiteList (e) {
  const icon = !e.target.childElementCount ? e.target : e.target.firstChild
  if (icon.classList.contains('fa-user-check')) {
    icon.classList.remove('fa-user-check')
    icon.classList.add('fa-ban')
    icon.parentElement.classList.add('is-danger')
  } else {
    icon.classList.remove('fa-ban')
    icon.classList.add('fa-user-check')
    icon.parentElement.classList.remove('is-danger')
  }
}

const WhiteBlackListButton = ({ isWhitelisted }) => (
  <span class={'tag is-medium is-light' + (isWhitelisted ? '' : ' is-danger')} onclick={changeBlackWhiteList}><i class={'fas fa-' + (isWhitelisted ? 'user-check' : 'ban')} /></span>
)

function saveDomain (e) {
  const button = !e.target.childElementCount ? e.target.parentElement : e.target
  button.classList.add('is-loading')
  button.disabled = true
  const textField = button.parentElement.firstChild
  textField.disabled = true
  textField.classList.add('is-success')
  setTimeout(() => {
    textField.classList.remove('is-success')
    textField.disabled = false
    const ul = button.parentElement.parentElement
    ul.insertBefore(<li class='is-size-6'>{textField.value}</li>, ul.childNodes[ul.childElementCount - 3].nextSibling)
    textField.value = ''
    button.classList.remove('is-loading')
    button.disabled = false
  }, 1000)
}

const Entry = ({ tag, list, type }) => (
  <section class='hero'>
    <div class='title tags has-addons'>
      <span class={'tag is-medium is-light is-' + types[type]}>{tag}</span>
      <WhiteBlackListButton isWhitelisted={Math.random() < 0.5} />
      <span class='tag is-medium is-hovered'><input type='checkbox' checked /></span>
      <span class='tag is-medium is-delete is-danger is-light' />
    </div>
    <ul class='subtitle'>
      {list.map(site => (
        <li class='is-size-6'>
          <div class='control'>
            <div class='tags has-addons'>
              <span class='tag is-delete is-danger is-light' />
              <span class='tag'>{site}</span>
            </div>
          </div>
        </li>
      ))}
      <li><input class='input is-inline' type='text' placeholder='*.example.domain.com' /><button onclick={saveDomain} class='button is-light'><i class='fas fa-check' /></button></li>
      <li><hr /></li>
    </ul>
  </section>
)

function openTag (e) {
  e = e.target.parentElement
  e = e.tagName === 'DIV' ? e : e.parentElement
  e.firstChild.classList.add('is-active')
}

module.exports = () => (
  <div>
    <Tag />
    <button onclick={openTag} class='button is-rounded is-pulled-right is-primary'><i class='fas fa-tag' />+</button>
    <Entry tag='Programming' type={2} list={['*.google.com', 'accounts.google.com']} />
    <Entry tag='Ads' type={0} list={['ads.google.com', 'accounts.google.com', 'drive.google.com']} />
    <Entry tag='Youtube' type={1} list={['ads.google.com', 'accounts.google.com', 'static.gogole.com', 'drive.google.com']} />
  </div>
)
