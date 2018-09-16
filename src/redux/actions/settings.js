import { setRepoSettings, getRepoSettings } from "repository"
import { defaultSettings, validateSettings } from "utils/settings"
import { copyJSONWithoutReference } from "utils/other"

const setSettings = settings => ({
  type: 'SET_SETTINGS',
  settings
})

export const saveSettings = (settings) => (dispatch) => {
  settings = copyJSONWithoutReference(settings)
  validateSettings(settings)
  setRepoSettings(settings)
  dispatch(setSettings(settings))
}

export const getSettings = () => (dispatch) => {
  getRepoSettings()
    .then((settings) => {
      dispatch(setSettings(settings))
    })
    .catch(() => {
      dispatch(setSettings(defaultSettings))
    })
}
