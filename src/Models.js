class skill{
  constructor(name, nr, exp, level, expTillNextLevel){
    this.name = name;
    this.nr = nr;
    this.exp = exp;
    this.level = level;
    this.expTillNextLevel = expTillNextLevel;
  }
}

function createSkill(skillNr){
  return new Promise((resolve, reject) => {
    let name = skillsNames[skillNr];
    let exp;
    let level;
    let expTillNextLevel;

    getExp(name)
    .then(function (expResult){
      exp = expResult;
    })
    .then(function (){
      getLevelAndExpTillNextLevel(exp)
      .then(function (obj) {
        level = obj[0];
        expTillNextLevel = obj[1];
      });
    })
    .then(function (){
      let newSkill = new skill(name, skillNr, exp, level, expTillNextLevel);
      skillsCollection.push(newSkill);
      resolve();
    });
  });
}

function createSkillsCollection() {
  return new Promise((resolve, reject) => {
    for (let skillNr = 0; skillNr < skillsNames.length; skillNr++){
      createSkill(skillNr)
      .then(function () {
        if(skillNr + 1 === skillsNames.length){
          resolve();
        }
      });
    }
  });
}

function getLevelAndExpTillNextLevel(exp) {
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

function updateExp(skillNr){
  /* Increases skill's exp by the amount in correspondent text area.
   */
  return new Promise((resolve, reject) => {
    let addedExp = parseInt($("#add_value_num" + skillNr).val());
    $("#add_value_num" + skillNr).val('');

    let skillName = skillsNames[skillNr];
    let exp = skillsCollection[skillNr].exp;

    skillsCollection[skillNr].exp += addedExp;
    getLevelAndExpTillNextLevel(exp + addedExp)
    .then(function (obj){
      skillsCollection[skillNr].level = obj[0];
      skillsCollection[skillNr].expTillNextLevel = obj[1];
    });

    setExp(skillName, addedExp + exp)
    .then(function (){
      return resolve(skillNr);
    });
  });
}

function addSkill(skillName) {
  return new Promise((resolve, reject) => {
    skillsNames.push(skillName);
    createSkill(skillsNames.length - 1)
    .then(function() {
      setExp(skillName, 0);
    })
    .then(function() {
      setTable(skillsNames);
      return resolve();
    });
  });
}

function fillExpTable() {
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

function removeSkill(skillNr) {
  return new Promise((resolve, reject) => {
    skillsNames.splice(skillNr, 1);
    skillsCollection.splice(skillNr, 1);
    setTable(skillsNames)
    .then(resolve);
  });
}
