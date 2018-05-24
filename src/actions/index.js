export const getSkills = (skills) => ({
  type: 'SKILLS_GOT_SUCCESS',
  skills
});

export const addSkill = (skillName) => ({
  type: 'ADD_SKILL',
  skillName
});
