import { setRepoSkills, getRepoSkills } from "repository/index.js"
import { createEmptySkill, validateSkills } from "libs/skills.js"
import { setSkillDeletionUndoing } from "./undo.js"
import { copyJSONWithoutReference } from "libs/other.js"
import isEqual from 'lodash/isEqual'

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
