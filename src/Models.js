(function(){
  LifeGamification.models = {};

  class skill{
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
        let newSkill = new skill(name, skillNr, exp, level, expTillNextLevel);
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

  LifeGamification.models.updateExp = function (skillNr){
    /* Increases skill's exp by the amount in correspondent text area.
     */
    return new Promise((resolve, reject) => {
      let addedExp = parseInt($("#add_value_num" + skillNr).val());
      $("#add_value_num" + skillNr).val('');

      let skillName = skillsNames[skillNr];
      let exp = LifeGamification.skillsCollection[skillNr].exp;

      LifeGamification.skillsCollection[skillNr].exp += addedExp;
      LifeGamification.models.
        getLevelAndExpTillNextLevel(exp + addedExp)
      .then(function (obj){
        LifeGamification.skillsCollection[skillNr].level = obj[0];
        LifeGamification.skillsCollection[skillNr].expTillNextLevel = obj[1];
      });

      LifeGamification.repository.setExp(skillName, addedExp + exp)
      .then(function (){
        return resolve(skillNr);
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
        return resolve();
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
      setTable(skillsNames)
      .then(resolve);
    });
  }
})();
