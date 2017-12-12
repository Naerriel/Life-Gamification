function updateExp(addedExp, skillNr, callback){
  /* Increases skill's exp by a certain amount.
   *    */
  var skillName = allSkills[skillNr];
  var updateStorage = function (result) {
    var overallExp;
    if (skillName in result) {
      overallExp = result[skillName] + addedExp;
    }
    else {
      overallExp = addedExp;
    }
    var skillsDict = {};
    skillsDict[skillName] = overallExp;
    chrome.storage.sync.set(skillsDict);
    callback(skillNr);
  };
  chrome.storage.sync.get([skillName], updateStorage);
}

function getExp(skillName, callback){
  /* Gets exp of a skill from storage.
   */
  chrome.storage.sync.get([skillName], function (result) {
    var overallExp;
    if (skillName in result) {
      overallExp = result[skillName];
    }
    else{
      overallExp = 0;
    }
    callback(overallExp);
  });
}

function getLevel(exp) {
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
    var htmlCode = (`
          Level ` + level + `: ` + levelUpExp + ` more.
          `);
    return htmlCode;
}

function addSkill () {
  /* Adds skill to storage and to current table.
   */
  extension_log("adding a skill");
  var skillName = $('#skill_name').val();
  $('#skill_name').val('');
  if(skillName === ""){
    return;
  }
  // If not for this if, hundreds of empty skills would be created with Enter key.
  // To fix.
  var skillsDict = {};
  skillsDict[skillName] = 0;
  allSkills.push(skillName);
  chrome.storage.sync.set({skillsArrayId: allSkills});
  chrome.storage.sync.set(skillsDict);
  debugAddingSkill(skillName);

  skillToTable(allSkills.length - 1);
}

function setSkill (id) {

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
        extension_log("There isn't any array of skills` names.");
        reject();
      }
    };
    chrome.storage.sync.get([skillsArrayId], setSkillsArray);
  });
}

function increaseValue(skillNr){
  /* Increases value of a skill with certain number by value in input type text.
   */
  var addedExp = $("#add_value_num" + skillNr).val();
  $("#add_value_num" + skillNr).val('');
  updateExp(parseInt(addedExp), skillNr, displayLevelAndExp);
}

function handleSkillButtons () {
  /* Manages clicking on all buttons and submitting by enter.
 	 */
  $("#skills").on("click", ".add_value_buttons", function () {
		increaseValue(this.id.replace('add_value_button', ''));
  });
  $("#skills").on("click", ".remove_skill_buttons", function () {
    removeSkill(this.id.replace('remove_skill_button', ''));
  });
  $("#skills").on("keyup", ".add_value_nums", function (event) {
    if (event.keyCode === 13) {
      increaseValue(this.id.replace('add_value_num', ''));
    }
  });
}

function handleImportExportButtons () {
  $('#export_storage_button').click(exportStorage);
  $('#import_storage_button').click(importStorage);
}

function handleAddSkillButton () {
  $('#add_skill').click(addSkill);
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      addSkill();
    }
  });
}

