import { getRepoSkills } from "../repository/skills.js";
import { setRepoSkills } from "../repository/skills.js";
import { createEmptySkill } from "../selectors/skills.js";

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
