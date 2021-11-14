function extractClassButton (e) {
  const icon = !e.target.childElementCount ? e.target : e.target.firstChild
  return { button: icon.parentElement, iconClass: icon.classList }
}
function orderByFreqOrDate (e) {
  const { button, iconClass } = extractClassButton(e)
  if (iconClass.contains('fa-wave-square')) {
    button.setAttribute('data-tooltip', 'Sort By Time')
    iconClass.remove('fa-wave-square')
    iconClass.add('fa-hourglass')
  } else {
    button.setAttribute('data-tooltip', 'Sort By Frequency')
    iconClass.remove('fa-hourglass')
    iconClass.add('fa-wave-square')
  }
}

function orderAscOrDesc (e) {
  const { button, iconClass } = extractClassButton(e)
  if (iconClass.contains('fa-angle-down')) {
    button.setAttribute('data-tooltip', 'ASC')
    iconClass.remove('fa-angle-down')
    iconClass.add('fa-angle-up')
  } else {
    button.setAttribute('data-tooltip', 'DESC')
    iconClass.remove('fa-angle-up')
    iconClass.add('fa-angle-down')
  }
}

function refreshList (e) {
  const { button } = extractClassButton(e)
  button.classList.add('is-loading')
  button.disabled = true
  setTimeout(() => {
    button.classList.remove('is-loading')
    button.disabled = false
  }, 1000)
}

module.exports = () => (
  <div class='columns'>
    <div class='column is-1'>
      <label class='label is-medium'>User</label>
    </div>
    <div class='column is-2'>
      <div class='control has-icons-left'>
        <div class='select is-info'>
          <select>
            <option value='*' default>Everyone</option>
            {[{ name: 'Pi', mac: 'bbbbbbbbbbbbbb' }].map(({ mac, name }) => (
              <option value={mac}>{name}</option>
            ))}
          </select>
        </div>
        <span class='icon is-small is-left'>
          <i class='fas fa-users' />
        </span>
      </div>

    </div>
    <div class='column is-4'>
      <label class='label is-medium has-text-right'>Order By</label>
    </div>
    <div class='column'>
      <button class='button is-medium icon' onclick={orderByFreqOrDate} data-tooltip='Sort By Frequency'><i class='fas fa-wave-square' aria-hidden='true' /></button>
      <button class='button is-medium icon' onclick={orderAscOrDesc} data-tooltip='DESC'><i class='fas fa-angle-down' aria-hidden='true' /></button>
    </div>
    <div class='column is-1'>
      <label class='label is-medium'>Limit</label>
    </div>
    <div class='column is-1'>
      <input class='input is-small' type='number' value={20} />
    </div>
    <div class='column is-1'>
      <span data-tooltip='Refresh'><button class='button is-medium icon' onclick={refreshList}><i class='fas fa-sync-alt' aria-hidden='true' /></button></span>
    </div>

  </div>
)
