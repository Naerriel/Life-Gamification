export const filterSkills = (skills = [], text = "") => {
  const skillsSearch = text.toLowerCase();

  return skills.filter(skillName => {
    return skillName.toLowerCase().includes(skillsSearch);
  });
}
