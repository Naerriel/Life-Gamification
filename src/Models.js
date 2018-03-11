(function(){
  LifeGamification.models = {};
  const expTable = [];
  const skillsCollection = {};
  LifeGamification.skillsCollection = skillsCollection;

  class Skill{
    constructor(name, exp){
      this.name = name;
      this.exp = exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
    }

    addExp(exp) {
      this.exp += exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
    }

    calcLevel() {
      // TODO calc it in the better way.
      let level = 0;
      while(this.exp >= expTable[level + 1]){
        level++;
      }
      this.level = level;
    }

    calcExpTillNextLevel() {
      const levelExp = this.exp - expTable[this.level];
      const totalExpNeeded = expTable[this.level + 1] - expTable[this.level];
      this.expTillNextLevel = totalExpNeeded - levelExp;
    }

  }

  LifeGamification.models.createSkillsCollection = function (skillsJSON) {
    return new Promise((resolve, reject) => {
      for (let skillName in skillsJSON) {
        const skillData = skillsJSON[skillName];
        const newSkill = new Skill(skillName, skillData.exp);
        skillsCollection[skillName] = newSkill;
      }
      resolve(skillsCollection);
    });
  }

  LifeGamification.models.updateExp = function (skill, addedExp){
    return new Promise((resolve, reject) => {
      if(!addedExp) {
        console.log("Error: AddedExp is NULL or 0.");
        return reject(skill);
      }
      if(addedExp + skill.exp < 0){
        addedExp = -skill.exp;
      }
      skill.addExp(addedExp);
      saveSkillsCollection()
        .then(function (){
          return resolve(skill);
        });
    });
  }

  const saveSkillsCollection = function () {
    return new Promise((resolve, reject) => {
      LifeGamification.repository.updateSkills(skillsCollection).then(resolve);
    });
  }

  LifeGamification.models.addSkill = function (skillName) {
    return new Promise((resolve, reject) => {
      if(!skillName){
        return reject();
      }
      const newSkill = new Skill(skillName, 0);
      skillsCollection[skillName] = newSkill;
      saveSkillsCollection()
        .then(function() {
          resolve(newSkill);
        });
    });
  }

  LifeGamification.models.fillExpTable = function () {
    expTable[1] = 0;
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = expTable[i - 1] + (4 + (i - 1) * (Math.log10(i - 1) + 1));
    }
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = Math.floor(expTable[i]);
    }
  }

  LifeGamification.models.removeSkill = function (skill) {
    return new Promise((resolve, reject) => {
      skillName = skill.name;
      delete skillsCollection[skillName];
      LifeGamification.repository.updateSkills(skillsCollection);
      saveSkillsCollection
        .then(resolve());
    });
  }

  LifeGamification.models.clearCollection = function () {
    for (let name in skillsCollection) {
      delete skillsCollection[name];
    }
  }
})();
