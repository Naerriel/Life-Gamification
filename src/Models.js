class skill{
  constructor(name, nr, exp, level, expTillNextLevel){
    this.name = name;
    this.nr = nr;
    this.exp = exp;
    this.level = level;
    this.expTillNextLevel = expTillNextLevel;
  }
}

function fillOneSkillFullInfo(i){
  return new Promise((resolve, reject) => {
    let name = skillsNames[i];
    let nr = i;
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
      let newSkill = new skill(name, nr, exp, level, expTillNextLevel);
      skillsFullInfo.push(newSkill);
      resolve();
    });
  });
}

function fillSkillsFullInfo() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < skillsNames.length; i++){
      fillOneSkillFullInfo(i)
      .then(function () {
        if(i + 1 === skillsNames.length){
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
    let exp = skillsFullInfo[skillNr].exp;

    skillsFullInfo[skillNr].exp += addedExp;
    getLevelAndExpTillNextLevel(exp + addedExp)
    .then(function (obj){
      skillsFullInfo[skillNr].level = obj[0];
      skillsFullInfo[skillNr].expTillNextLevel = obj[1];
    });

    setExp(skillName, addedExp + exp)
    .then(function (){
      return resolve(skillNr);
    });
  });
}

function addSkill() {
  return new Promise((resolve, reject) => {
    let skillName = $('#skill_name').val();
    $('#skill_name').val('');

    skillsNames.push(skillName);
    fillOneSkillFullInfo(skillsNames.length - 1)
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
    skillsFullInfo.splice(skillNr, 1);
    setTable(skillsNames)
    .then(resolve);
  });
}
