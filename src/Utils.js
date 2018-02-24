LifeGamification.utils = {};

LifeGamification.utils.debugAddingSkill = function(skillName) {
  /* Writes all skills' names and experience value of currently added skill.
   */
  let logResult = function (result) {
    console.log("The array of skills' names: ");
    console.log(JSON.stringify(result));
  };
  chrome.storage.sync.get([skillsArrayId], logResult);
  getExp(skillName)
  .then(function(exp) {
    console.log(`Skill ${skillName} experience value is ${exp}`);
  });
}

LifeGamification.utils.debugSkillsExp = function(index) {
  /* Writes to consol all skills and it's exp.
   */
  let skillName = skillsNames[index];
  chrome.storage.sync.get([skillName], function (result) {
    console.log(skillName + ": " + result[skillName]);
  });
  if (index + 1 < skillsNames.length) {
    LifeGamification.utils.debugSkillsExp(index + 1);
  }
}

LifeGamification.utils.exportStorage = function () {
  /* Stringifies storage so it can be copied and later imported.
   */
  let keyList = skillsNames.slice();
  keyList.push("skillsArrayId");
  chrome.storage.sync.get(keyList, function (result) {
    $('#storage_stringified').html(JSON.stringify(result));
  });
}

LifeGamification.utils.importStorage = function () {
  /* Gets stringified storage and saves it in chrome storage.
   */
  let storage = $("#storage_stringified").val();
  chrome.storage.sync.set(JSON.parse(storage), function() {
    LifeGamification.repository.getSkills()
    .then(LifeGamification.view.resetHTMLTable);
  });
}
