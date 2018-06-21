import { setRepoSkills, getRepoSkills } from "repository/index.js"
import {
  createEmptySkill,
  validateSkills,
  addExperience} from "libs/skills.js"
import { setSkillDeletionUndoing } from "./undo.js"
import { copyJSONWithoutReference } from "libs/other.js"

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
