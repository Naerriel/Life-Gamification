import { getRepoSkills } from "../repository/index.js";
import { setRepoSkills } from "../repository/index.js";
import { createEmptySkill } from "../libs/skills.js";

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
  skillToRemove = JSON.stringify(skillToRemove);

  newSkills = newSkills.filter(skill => {
    if(removedASkill){
      return true;
    }
    if(JSON.stringify(skill) == skillToRemove){
      // Not sure if orders of those two JSONS will remain always the same
      // If not, you can use lodash isEqual to compare them.
      removedASkill = true;
      return false;
    }
    return true;
  });
  dispatch(saveSkills(newSkills));
}
