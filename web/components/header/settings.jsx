const close = element => element.classList.remove('is-active')
const closeButton = e => close(e.target.parentElement.parentElement.parentElement)

module.exports = ({ state }) => (
  <div class='modal' id='settings-popup'>
    <div class='modal-background' onclick={e => close(e.target.parentElement)} />
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title has-text-left'>Settings</p>
        <button class='delete' aria-label='close' onclick={closeButton} />
      </header>
      <section class='modal-card-body'>
        ...
      </section>
      <footer class='modal-card-foot'>
        <button class='button is-success'>Save</button>
        <button class='button' onclick={closeButton}>Cancel</button>
      </footer>
    </div>
  </div>
)
