const close = element => element.classList.remove('is-active')
const closeButton = e => close(e.target.parentElement.parentElement.parentElement)

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
        {[
          { mac: 'ab:cd:ef', ip: '192.168.8.1', name: 'Router', timestamp: '12/34/56' },
          { mac: 'ab:cd:ef:gb', ip: '192.168.8.2', name: 'Phone 1', timestamp: '12/34/56' },
          { mac: 'ab:cd:ef:ga', ip: '192.168.8.3', name: 'Phone 2', timestamp: '12/34/56' }

        ].map(({ mac, name, ip, timestamp }) => (
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
                  <p class='control'>
                    <input class='input' type='text' placeholder='Device Name e.g. IphoneX' value={name} />
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </section>
      <footer class='modal-card-foot'>
        <button class='button is-success'>Save</button>
        <button class='button' onclick={closeButton}>Cancel</button>
      </footer>
    </div>
  </div>
)
