import { setRepoHistory, getRepoHistory } from "repository"
import { emptyHistory } from "utils/history"
import { copyJSONWithoutReference } from "utils/other"

const setHistory = history => ({
  type: 'SET_HISTORY',
  history
})

export const saveHistory = (history) => (dispatch) => {
  setRepoHistory(history)
  dispatch(setHistory(history))
}

export const getHistory = () => (dispatch) => {
  getRepoHistory()
    .then((history) => {
      dispatch(setHistory(history))
    })
    .catch(() => {
      dispatch(setHistory(emptyHistory))
    })
}

const addSkillToHistory = (History, skillName) => {
  if(!History.skills.includes(skillName)) {
    History.skills.push(skillName)
  }
}

export const addLog = (log) => (dispatch, getState) => {
  let newHistory = copyJSONWithoutReference(getState().history)
  newHistory.logs.push(log)
  addSkillToHistory(newHistory, log.skillName)
  dispatch(saveHistory(newHistory))
}
