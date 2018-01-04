class skill{
  constructor(name, exp, level, expTillNextLevel){
    this.name = name;
    this.exp = exp;
    this.level = level;
    this.expTillNextLevel = expTillNextLevel;
  }
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

function updateSkill(skillNr){
  /* Increases skill's exp by the amount in correspondent text area.
   */
  return new Promise((resolve, reject) => {
    let addedExp = parseInt($("#add_value_num" + skillNr).val());
    $("add_value_num" + skillNr).val('');
    let skillName = allSkills[skillNr];

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

    allSkills.push(skillName);
    setExp(skillName, 0)
    .then(function() {
      setTable(allSkills);
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
    allSkills.splice(skillNr, 1);
    setTable(allSkills)
    .then(resolve);
  });
}
