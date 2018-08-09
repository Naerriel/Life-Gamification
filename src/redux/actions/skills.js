import { setRepoSkills, getRepoSkills } from "repository"
import {
  createEmptySkill,
  validateSkills,
  addExperience} from "utils/skills"
import { setSkillDeletionUndoing } from "./undo.js"
import { copyJSONWithoutReference } from "utils/other"
import { timeToMilliSeconds } from "utils/time"

const setSkills = (skills) => ({
  type: 'SET_SKILLS',
  skills
})

export const saveSkills = (skills) => (dispatch) => {
  validateSkills(skills)
  setRepoSkills(skills)
  dispatch(setSkills(skills))
}

export const getSkills = () => (dispatch) => {
  getRepoSkills()
    .then((skills) => {
      dispatch(setSkills(skills))
    })
    .catch(() => {
      dispatch(setSkills([]))
    })
}

export const addSkill = () => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)
  newSkills.push(createEmptySkill())
  dispatch(saveSkills(newSkills))
}

export const addExp = (skillId, exp) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  let skillToReceiveExp = newSkills.find(skill => {
    console.log(skill)
    return skill.id === skillId
  })
  addExperience(exp, skillToReceiveExp)
  dispatch(saveSkills(newSkills))
}

export const renameSkill = (newName, skillId) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  newSkills.find(skill => {
    return skill.id === skillId
  }).name = newName
  dispatch(saveSkills(newSkills))
}

export const deleteSkill = (skillToRemove) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  newSkills = newSkills.filter(skill => {
    return skill.id !== skillToRemove.id
  })
  dispatch(setSkillDeletionUndoing(skillToRemove))
  dispatch(saveSkills(newSkills))
}

const swapInArray = (arr, indexA, indexB) => {
  let temp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = temp
}

export const swapSkills = (indexA, indexB, skills) => (dispatch) => {
  let newSkills = copyJSONWithoutReference(skills)
  swapInArray(newSkills, indexA, indexB)
  dispatch(saveSkills(newSkills))
}

// TODO Delete repetitions in timer functions
// Procrastinating on this task because of need to resolve
// copyJSONWithoutReference - how should it be done?

export const pauseTimer = (skillId, timeLeft) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  const skillToModify = newSkills.find(skill => {
    return skill.id === skillId
  })

  console.log(skillToModify)
  skillToModify.timer.timeLeft = timeLeft
  skillToModify.timer.timeStamp = -1
  dispatch(saveSkills(newSkills))
}

export const playTimer = (skillId, timeLeft) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  const skillToModify = newSkills.find(skill => {
    return skill.id === skillId
  })

  const timeStamp = new Date().valueOf() + timeToMilliSeconds(timeLeft)

  skillToModify.timer.timeLeft = timeLeft
  skillToModify.timer.timeStamp = timeStamp
  dispatch(saveSkills(newSkills))
}

export const startTimer = (skillId, settings) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  const skillToModify = newSkills.find(skill => {
    return skill.id === skillId
  })

  skillToModify.timer = {
    timeLeft: settings.time,
    timeStamp: new Date().valueOf() + timeToMilliSeconds(settings.time),
    sessionsCompleted: 0,
    settings
  }
  dispatch(saveSkills(newSkills))
}

export const eraseTimer = (skillId) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)

  const skillToModify = newSkills.find(skill => {
    return skill.id === skillId
  })

  skillToModify.timer = {}
  dispatch(saveSkills(newSkills))
}
