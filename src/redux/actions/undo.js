import { saveSkills } from "./skills.js"
import { copyJSONWithoutReference } from "libs/other.js"

export const setSkillDeletionUndoing = (skill) => ({
  type: 'SET_SKILL_DELETION_UNDOING',
  skill
})

export const eraseSkillDeletionUndoing = () => ({
  type: 'ERASE_SKILL_DELETION_UNDOING'
})

export const undoSkillDeletion = (skill) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills)
  newSkills.push(skill)
  dispatch(eraseSkillDeletionUndoing())
  dispatch(saveSkills(newSkills))
}

