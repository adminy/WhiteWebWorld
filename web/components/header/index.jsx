const Tabs = require('./tabs')
const SettingsPopup = require('./settings')
const UserSettingsPopup = require('./user_settings')

const Header = ({ emitter }) => (
  <div class='has-text-right'>
    <SettingsPopup />
    <UserSettingsPopup />
    <button class='button icon' onclick={e => emitter.emit('user-settings')} data-tooltip='User Settings'><i class='fas fa-users-cog' /></button>
    <button class='button icon' onclick={e => emitter.emit('settings')} data-tooltip='WWW Settings'><i class='fas fa-sliders-v-square' /></button>
    <Tabs />
  </div>
)

module.exports = Header
