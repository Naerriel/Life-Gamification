class skill{
  constructor(name, exp, level, expTillNextLevel){
    this.name = name;
    this.exp = exp;
    this.level = level;
    this.expTillNextLevel = expTillNextLevel;
  }
}

function fillSkillArray() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < skillsNames.length; i++){
      let name = skillsNames[i];
      let exp;
      let level;
      let expTillNextLevel;
      getExp(name)
      .then(function (expResult){
        exp = expResult;
      })
      .then(function (){
        getLevelAndLevelUpExp(exp)
        .then(function (obj) {
          level = obj[0];
          expTillNextLevel = obj[1];
        });
      })
      .then(function (){
        let newSkill = new skill(name, exp, level, expTillNextLevel);
        skillsFullInfo.push(newSkill);
        if(i + 1 === skillsNames.length) resolve();
      });
    }
  });
}

function getLevelAndLevelUpExp(exp) {
  /* Calculates current level and exp needed to next level.
   */
  return new Promise((resolve, reject) => {
    let level = 0;
    while(exp >= expTable[level + 1]){
      level++;
    }
    let levelExp = exp - expTable[level];
    let totalExpNeeded = expTable[level + 1] - expTable[level];
    let levelUpExp = totalExpNeeded - levelExp;
    resolve([level, levelUpExp]);
  });
}

function updateExp(skillNr){
  /* Increases skill's exp by the amount in correspondent text area.
   */
  return new Promise((resolve, reject) => {
    let addedExp = parseInt($("#add_value_num" + skillNr).val());
    $("#add_value_num" + skillNr).val('');
    let skillName = skillsNames[skillNr];

    getExp(skillName)
    .then(function (exp){
      setExp(skillName, addedExp + exp);
    })
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
    setExp(skillName, 0)
    .then(function() {
      setTable(skillsNames);
    })
    .then(resolve);
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
    setTable(skillsNames)
    .then(resolve);
  });
}
