import { getRepoSkills } from "../repository/index.js";
import { setRepoSkills } from "../repository/index.js";
import { createEmptySkill } from "../libs/skills.js";
import isEqual from 'lodash/isEqual';

const copyJSONWithoutReference = (array) => {
  return JSON.parse(JSON.stringify(array));
}

const setSkills = (skills) => ({
  type: 'SET_SKILLS',
  skills
});

const saveSkills = (skills) => (dispatch) => {
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
  dispatch(saveSkills(newSkills));
}
