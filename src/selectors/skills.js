const startingExpNeeded = 5;

export const createEmptySkill = (skillName) => {
  // Return empty object upon updating skill's info.
  return {
    name: skillName,
    level: 0,
    exp: 0,
    expTillNextLevel: startingExpNeeded
  };
}
