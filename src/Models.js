(function(){
  LifeGamification.models = {};
  const expTable = [];

  class Skill{
    constructor(name, nr, exp, level, expTillNextLevel){
      this.name = name;
      this.nr = nr;
      this.exp = exp;
      this.level = level;
      this.expTillNextLevel = expTillNextLevel;
    }
  }

  LifeGamification.models.createSkill = function (skillNr){
    return new Promise((resolve, reject) => {
      let name = skillsNames[skillNr];
      let exp;
      let level;
      let expTillNextLevel;

      LifeGamification.repository.getExp(name)
      .then(function (expResult){
        exp = expResult;
      })
      .then(function (){
        LifeGamification.models.
          getLevelAndExpTillNextLevel(exp)
        .then(function (obj) {
          level = obj[0];
          expTillNextLevel = obj[1];
        });
      })
      .then(function (){
        let newSkill = new Skill(name, skillNr, exp, level, expTillNextLevel);
        LifeGamification.skillsCollection.push(newSkill);
        resolve();
      });
    });
  }

  LifeGamification.models.createSkillsCollection = function () {
    return new Promise((resolve, reject) => {
      for (let skillNr = 0; skillNr < skillsNames.length; skillNr++){
        LifeGamification.models.createSkill(skillNr)
        .then(function () {
          if(skillNr + 1 === skillsNames.length){
            resolve();
          }
        });
      }
    });
  }

  LifeGamification.models.getLevelAndExpTillNextLevel = function (exp) {
    /* Calculates current level and exp needed to next level.
     */
    return new Promise((resolve, reject) => {
      let level = 0;
      while(exp >= expTable[level + 1]){
        level++;
      }
      let levelExp = exp - expTable[level];
      let totalExpNeeded = expTable[level + 1] - expTable[level];
      let expTillNextLevel = totalExpNeeded - levelExp;
      resolve([level, expTillNextLevel]);
    });
  }

  skillByNumber = function (skillNr) {
    let skill = null;
    LifeGamification.skillsCollection.forEach(function(elem){
      if (parseInt(elem.nr) === parseInt(skillNr)) {
        skill = elem;
      }
    });
    return skill;
  }

  LifeGamification.models.updateExp = function (skillNr, addedExp){
    /* Increases Skill's exp by the amount in correspondent text area.
     */
    return new Promise((resolve, reject) => {
      let skill = skillByNumber(skillNr);
      let skillName = skill.name;

      skill.exp += addedExp;
      LifeGamification.models.getLevelAndExpTillNextLevel(skill.exp)
      .then(function (obj){
        skill.level = obj[0];
        skill.expTillNextLevel = obj[1];
      });

      LifeGamification.repository.setExp(skillName, skill.exp)
      .then(function (){
        return resolve(skill);
      });
    });
  }

  LifeGamification.models.addSkill = function (skillName) {
    return new Promise((resolve, reject) => {
      skillsNames.push(skillName);
      LifeGamification.models.createSkill(skillsNames.length - 1)
      .then(function() {
        LifeGamification.repository.setExp(skillName, 0);
      })
      .then(function() {
        LifeGamification.repository.setTable(skillsNames);
        let skill = LifeGamification.skillsCollection[skillsNames.length - 1];
        return resolve(skill);
      });
    });
  }

  LifeGamification.models.fillExpTable = function () {
    /* Fills expTable with numbers according to a certain formula.
     */
    expTable[1] = 0;
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = expTable[i - 1] + (4 + (i - 1) * (Math.log10(i - 1) + 1));
    }
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = Math.floor(expTable[i]);
    }
  }

  LifeGamification.models.removeSkill = function (skillNr) {
    return new Promise((resolve, reject) => {
      skillsNames.splice(skillNr, 1);
      LifeGamification.skillsCollection.splice(skillNr, 1);
      LifeGamification.repository.setTable(skillsNames)
      .then(resolve);
    });
  }
})();
