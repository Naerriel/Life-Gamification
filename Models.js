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
  skillToTable(allSkills.length - 1);
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

function handleSkillButtons () {
  /* Manages event listeners corresponding to skills.
 	 */
  $("#skills").on("click", ".add_value_buttons", function () {
		var skillNr = this.id.replace('add_value_button', '');
    updateSkill(skillNr)
    .then(levelAndExpHTML);
  });
  $("#skills").on("click", ".remove_skill_buttons", function () {
    removeSkill(this.id.replace('remove_skill_button', ''));
  });
  $("#skills").on("keyup", ".add_value_nums", function (event) {
    if (event.keyCode === 13) {
      var skillNr = this.id.replace('add_value_num', '');
      updateSkill(skillNr)
      .then(levelAndExpHTML);
    }
  });
}

function handleImportExportButtons () {
  /* Manages event listeners corresponding to import & export functions.
   */
  $('#export_storage_button').click(exportStorage);
  $('#import_storage_button').click(importStorage);
}

function handleAddSkillButton () {
  /* Manages event listeners corresponding to adding new skills.
   */
  $('#add_skill').click(addSkill);
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      addSkill();
    }
  });
}
