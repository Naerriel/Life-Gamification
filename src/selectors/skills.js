const startingExpNeeded = 5;

export const createEmptySkill = (skillName) => {
  return {
    name: skillName,
    level: 0,
    exp: 0,
    expTillNextLevel: startingExpNeeded
  };
}

const expToLevelUp = (level) => {
  if(level <= 1){
    return 5;
  }
  return Math.floor(4 + (level - 1) * (Math.log10(level - 1) + 1));
}

export const addExperience = (exp, skill) => {
  if(!exp){
    return;
  }
  skill.exp += parseInt(exp);
  while (skill.exp >= skill.expTillNextLevel){
    skill.exp -= skill.expTillNextLevel;
    skill.level++;
    skill.expTillNextLevel = expToLevelUp(skill.level);
  }
}
