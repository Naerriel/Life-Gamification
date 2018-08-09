const startingExpNeeded = 5

export const createEmptySkill = () => {
  return {
    id: Date.now(),
    name: "",
    level: 1,
    exp: 0,
    expTillNextLevel: startingExpNeeded,
    timer: {}
  }
}

const expToLevelUp = (level) => {
  if(level <= 1){
    return startingExpNeeded
  }
  return Math.floor(4 + (level - 1) * (Math.log10(level - 1) + 1))
}

export const addExperience = (exp, skill) => {
  if(isNaN(exp)){
    return
  }
  skill.exp += parseInt(exp, 10)
  while (skill.exp >= skill.expTillNextLevel) {
    skill.exp -= skill.expTillNextLevel
    skill.level++
    skill.expTillNextLevel = expToLevelUp(skill.level)
  }
  while (skill.exp < 0) {
    skill.level--
    skill.expTillNextLevel = expToLevelUp(skill.level)
    skill.exp += skill.expTillNextLevel
  }
}

const validateSkillField = (skill, skillField) => {
  if(!(skillField in skill)){
    if(skillField === "expTillNextLevel"){
      skill[skillField] = expToLevelUp(skill["level"])
    } else {
      skill[skillField] = createEmptySkill()[skillField]
    }
  }
}

export const validateSkills = (skills) => {
  let skillFields = ["id", "name", "level", "exp", "expTillNextLevel", "timer"]

  skills.forEach((skill) => {
    skillFields.forEach((skillField) => {
      validateSkillField(skill, skillField)
    })
  })
}
