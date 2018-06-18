import { setRepoSkills, getRepoSkills } from "../repository/index.js";
import { createEmptySkill, validateSkills } from "../libs/skills.js";
import { setSkillDeletionUndoing } from "./undo.js";
import { copyJSONWithoutReference } from "../libs/other.js";
import isEqual from 'lodash/isEqual';

const setSkills = (skills) => ({
  type: 'SET_SKILLS',
  skills
});

export const saveSkills = (skills) => (dispatch) => {
  validateSkills(skills);
  setRepoSkills(skills);
  dispatch(setSkills(skills));
}

export const getSkills = () => (dispatch) => {
  getRepoSkills()
    .then((skills) => {
      dispatch(setSkills(skills));
    })
    .catch(() => {
      dispatch(setSkills([]));
    });
}

export const addSkill = () => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills);
  newSkills.push(createEmptySkill());
  dispatch(saveSkills(newSkills));
}

export const renameSkill = (newName, skillToChange) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills);
  let renamedASkill = false;

  newSkills.forEach((skill) => {
    if(!renamedASkill && isEqual(skill, skillToChange)){
      skill.name = newName;
      renamedASkill = true;
    }
  });
  dispatch(saveSkills(newSkills));
}

export const deleteSkill = (skillToRemove) => (dispatch, getState) => {
  let newSkills = copyJSONWithoutReference(getState().skills);
  let removedASkill = false;

  newSkills = newSkills.filter(skill => {
    if(removedASkill){
      return true;
    }
    if(isEqual(skill, skillToRemove)){
      removedASkill = true;
      return false;
    }
    return true;
  });
  dispatch(setSkillDeletionUndoing(skillToRemove));
  dispatch(saveSkills(newSkills));
}
