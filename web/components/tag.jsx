const close = element => element.classList.remove('is-active')
const closeButton = e => close(e.target.parentElement.parentElement.parentElement)
const createTag = e => {
  const [field1, field2, field3] = e.target.parentElement.parentElement.childNodes[1].childNodes
  const tagName = field1.querySelector('input')
  const tagType = field2.querySelector('select')
  const [enabled, blacklisted] = field3.querySelectorAll('input[type="checkbox"]')
  console.log('Tag Name, Type, enabled, blacklisted: ', tagName.value, parseInt(tagType.value), enabled.checked, blacklisted.checked)
  // make the createTag button Load
}
module.exports = ({ state }) => (
  <div class='modal'>
    <div class='modal-background' onclick={e => close(e.target.parentElement)} />
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Create Tag</p>
        <button class='delete' aria-label='close' onclick={closeButton} />
      </header>
      <section class='modal-card-body'>
        <div class='field'>
          <label class='label'>Tag Name</label>
          <div class='control has-icons-left has-icons-right'>
            <input class={'input is-' + (state.tagExists ? 'danger' : 'success')} type='text' placeholder='Tag Name e.g. Anything With "Ads" word' />
            <span class='icon is-small is-left'>
              <i class='fas fa-tag' />
            </span>
            <span class='icon is-small is-right'>
              <i class={'fas fa-' + (state.tagExists ? 'exclamation-triangle' : 'check')} />
            </span>
          </div>
          <p class={'help ' + (state.tagExists ? 'is-danger' : 'is-success')}>{state.tagExists ? 'Tag name already exists' : 'This name is available'}</p>
        </div>

        <div class='field'>
          <label class='label'>Domain Type</label>
          <div class='control'>
            <div class='select'>
              <select name='type'>
                <option value='0'>Ads & Malware</option>
                <option value='1'>Entertainment</option>
                <option value='2'>Educational</option>
              </select>
            </div>
          </div>
        </div>
        <div class='field'>
          <div class='control'>
            <label class='checkbox'>
              <input type='checkbox' name='enabled' checked />
              &nbsp;Enabled&nbsp;
            </label>
            <label class='checkbox'>
              <input type='checkbox' name='blacklisted' checked />
              &nbsp;Blacklisted&nbsp;
            </label>
          </div>
        </div>
      </section>
      <footer class='modal-card-foot'>
        <button class='button is-success' onclick={createTag}>Create</button>
        <button class='button' onclick={closeButton}>Cancel</button>
      </footer>
    </div>
  </div>
)
