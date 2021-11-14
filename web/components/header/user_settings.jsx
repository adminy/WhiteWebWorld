const close = element => element.classList.remove('is-active')
const closeButton = e => close(e.target.parentElement.parentElement.parentElement)

const UserInfo = ({ mac, name, ip, timestamp, emitter }) => (
  <div>
    <div class='columns'>
      <div class='column field is-horizontal'>
        <div class='field-label is-normal'>
          <label class='label'>Mac</label>
        </div>
        <div class='field-body'>
          <div class='field'>
            <p class='control'>
              <input class='input is-static' type='text' value={mac} readonly />
            </p>
          </div>
        </div>
      </div>
      <div class='column field is-horizontal'>
        <div class='field-label is-normal'>
          <label class='label'>IP</label>
        </div>
        <div class='field-body'>
          <div class='field'>
            <p class='control has-tooltip-left' data-tooltip={'Last Updated: ' + timestamp}>
              <input class='input is-static' type='text' value={ip} readonly />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class='field is-horizontal'>
      <div class='field-label is-normal'>
        <label class='label'>Name</label>
      </div>
      <div class='field-body'>
        <div class='field'>
          <p class='control columns'>
            <input class='input' type='text' placeholder='Device Name e.g. IphoneX' value={name} />
            <button class='button is-save' onclick={e => emitter.emit('update-mac-name', e)}>✔</button>
          </p>
        </div>
      </div>
    </div>
    <hr />
  </div>
)

module.exports = ({ state }) => (
  <div class='modal' id='user-settings-popup'>
    <div class='modal-background' onclick={e => close(e.target.parentElement)} />
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title has-text-left'>
          <i class='fas fa-users' />
          <span class='px-5'>Settings</span>
        </p>
        <button class='delete' aria-label='close' onclick={closeButton} />
      </header>
      <section class='modal-card-body'>
        {state.users.map(o => <UserInfo {...o} />)}
      </section>
    </div>
  </div>
)
