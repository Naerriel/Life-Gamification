import { setRepoSettings, getRepoSettings } from "../repository/index.js";
import { defaultSettings } from "../libs/settings.js";
import { copyJSONWithoutReference } from "../libs/other.js";

const setSettings = settings => ({
  type: 'SET_SETTINGS',
  settings
});

export const saveSettings = (settings) => (dispatch) => {
  setRepoSettings(settings);
  dispatch(setSettings(settings));
}

export const getSettings = () => (dispatch) => {
  getRepoSettings()
    .then((settings) => {
      dispatch(setSettings(settings));
    })
    .catch(() => {
      dispatch(setSettings(defaultSettings));
    });
}
