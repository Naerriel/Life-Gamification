import { getRepoSkills } from "../repository/index.js";
import { setRepoSkills } from "../repository/index.js";
import { createEmptySkill } from "../libs/skills.js";

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
  let newSkills = JSON.parse(JSON.stringify(getState().skills));
  newSkills.push(createEmptySkill());
  dispatch(saveSkills(newSkills));
}
