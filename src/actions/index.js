import { getRepoSkills } from "../repository/skills.js";
import { setRepoSkills } from "../repository/skills.js";
import { createEmptySkill, addExperience } from "../selectors/skills.js";

export const setSkills = (skills) => ({
  type: 'SET_SKILLS',
  skills
});

export const addSkill = (skills, skillName) => (dispatch) => {
  const newSkills = [...skills, createEmptySkill(skillName)];
  setRepoSkills(newSkills);
  dispatch(setSkills(newSkills));
}

export const getSkills = () => (dispatch) => {
  getRepoSkills()
    .then((skills) => {
      dispatch(setSkills(skills));
    });
}

export const addExp = (exp, skillName) => (dispatch, getState) => {
  let newSkills = JSON.parse(JSON.stringify(getState().skills));
  addExperience(exp, newSkills.find((skill) => {
    return skill.name === skillName;
  }));
  setRepoSkills(newSkills);
  dispatch(setSkills(newSkills));
}

export const removeSkill = (skillName) => (dispatch, getState) => {
  let newSkills = JSON.parse(JSON.stringify(getState().skills));
  newSkills = newSkills.filter(skill => skill.name !== skillName);
  setRepoSkills(newSkills);
  dispatch(setSkills(newSkills));
}
