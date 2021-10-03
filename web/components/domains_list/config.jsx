function orderByFreqOrDate (e) {
  const iconClass = (!e.target.childElementCount ? e.target : e.target.firstChild).classList
  if (iconClass.contains('fa-wave-square')) {
    iconClass.remove('fa-wave-square')
    iconClass.add('fa-hourglass')
  } else {
    iconClass.remove('fa-hourglass')
    iconClass.add('fa-wave-square')
  }
}

function orderAscOrDesc (e) {
  const iconClass = (!e.target.childElementCount ? e.target : e.target.firstChild).classList
  if (iconClass.contains('fa-angle-down')) {
    iconClass.remove('fa-angle-down')
    iconClass.add('fa-angle-up')
  } else {
    iconClass.remove('fa-angle-up')
    iconClass.add('fa-angle-down')
  }
}

function refreshList (e) {
  const button = !e.target.childElementCount ? e.target.parentElement : e.target
  button.classList.add('is-loading')
  button.disabled = true
  setTimeout(() => {
    button.classList.remove('is-loading')
    button.disabled = false
  }, 1000)
}

module.exports = () => (
  <div class='columns'>
    <div class='column is-7'>
      <label class='label is-medium has-text-right'>Order By</label>
    </div>
    <div class='column'>
      <button class='button is-medium icon' onclick={orderByFreqOrDate}><i class='fas fa-wave-square' aria-hidden='true' /></button>
      <button class='button is-medium icon' onclick={orderAscOrDesc}><i class='fas fa-angle-down' aria-hidden='true' /></button>
    </div>
    <div class='column is-1'>
      <label class='label is-medium'>Limit</label>
    </div>
    <div class='column is-1'>
      <input class='input is-small' type='number' value={20} />
    </div>
    <div class='column is-1'>
      <button class='button is-medium icon' onclick={refreshList}><i class='fas fa-sync-alt' aria-hidden='true' /></button>
    </div>

  </div>
)
