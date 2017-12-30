function getExp(skillName){
  /* Gets exp of a skill from storage.
   */
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([skillName], function (result) {
      var overallExp;
      if (skillName in result) {
        overallExp = result[skillName];
      }
      else{
        overallExp = 0;
      }
      resolve(overallExp);
    });
  });
}

function getLevelAndLevelUpExp(exp) {
  /* Calculates current level and exp needed to next level.
   * O(max_level) - computational complexity
   */
  var level = 0;
  while(exp >= expTable[level + 1]){
    level++;
  }
  var levelExp = exp - expTable[level];
  var totalExpNeeded = expTable[level + 1] - expTable[level];
  var levelUpExp = totalExpNeeded - levelExp;
  return [level, levelUpExp];
}

function addSkill () {
  /* Adds skill to storage and to current table.
   */
  var skillName = $('#skill_name').val();
  $('#skill_name').val('');

  var skillsDict = {};
  skillsDict[skillName] = 0;
  allSkills.push(skillName);

  chrome.storage.sync.set({skillsArrayId: allSkills});
  chrome.storage.sync.set(skillsDict);
  debugAddingSkill(skillName);
}

function getSkills () {
  /*  Creates a local table by taking skills from chrome storage.
   */
  return new Promise((resolve, reject) => {
    var setSkillsArray = function (result) {
      if(skillsArrayId in result) {
        allSkills = result[skillsArrayId];
        resolve();
      }
      else{
        extension_log("There isn't any array of skills names.");
        reject();
      }
    };
    chrome.storage.sync.get([skillsArrayId], setSkillsArray);
  });
}

function clearSkills () {
  /* Erases all skills.
   */
  chrome.storage.sync.set({skillsArrayId: []});
}

function updateSkill(skillNr){
  /* Increases skill's exp by the amount in correspondent text area.
   */
  return new Promise((resolve, reject) => {
    var addedExp = parseInt($("#add_value_num" + skillNr).val());
    $("add_value_num" + skillNr).val('');
    var skillName = allSkills[skillNr];

    var updateStorage = function (result) {
      var overallExp = 0;
      if (skillName in result) {
        overallExp += result[skillName] + addedExp;
      }
      else {
        overallExp += addedExp;
      }
      var skillsDict = {};
      skillsDict[skillName] = overallExp;
      chrome.storage.sync.set(skillsDict, function(){
        resolve(skillNr);
 	     });
    };
    chrome.storage.sync.get([skillName], updateStorage);
  });
}

function fillExpTable() {
  /* Fills expTable with numbers according to a certain formula.
   */
  expTable[1] = 0;
  for (var i = 2; i < maxLevel; i++) {
    expTable[i] = expTable[i - 1] + (4 + (i - 1) * (Math.log10(i - 1) + 1));
  }
  for (var i = 2; i < maxLevel; i++) {
    expTable[i] = Math.floor(expTable[i]);
  }
}

function removeSkill(skillNr) {
  /* Removes skill from allSkills table
   * and stores modified table in Chrome Storage.
   */
  allSkills.splice(skillNr, 1);
  extension_log("allSkills after splice: " + allSkills);
  chrome.storage.sync.set({skillsArrayId: allSkills});
  resetHTMLTable();
}

