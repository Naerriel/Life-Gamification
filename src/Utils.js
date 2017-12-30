function extension_log (message) {
  /* Writes to console argument.
   */
  var script = 'console.log(`' + message + '`);';
  chrome.tabs.executeScript({
    code: script
  });
}

function debugAddingSkill(skillName) {
  /* Writes all skills' names and experience value of currently added skill.
   */
  var logResult = function (result) {
    extension_log("The array of skills' names: ");
    extension_log(JSON.stringify(result));
  };
  chrome.storage.sync.get([skillsArrayId], logResult);
  getExp(skillName)
  .then( function(exp) {
    extension_log("Skill " + skillName + " experience value is " + exp);
  });
}

function debugSkillsExp(index) {
  /* Writes to consol all skills and it's exp.
   */
  var skillName = allSkills[index];
  chrome.storage.sync.get([skillName], function (result) {
    extension_log(skillName + ": " + result[skillName]);
  });
  if (index + 1 < allSkills.length) {
    debugSkillsExp(index + 1);
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

function exportStorage () {
  /* Stringifies storage so it can be copied and later imported.
   */
  let keyList = allSkills.slice();
  keyList.push("skillsArrayId");
  chrome.storage.sync.get(keyList, function (result) {
    $('#storage_stringified').html(JSON.stringify(result));
  });
}

function importStorage () {
  /* Gets stringified storage and saves it in chrome storage.
   */
  var storage = $("#storage_stringified").val();
  chrome.storage.sync.set(JSON.parse(storage), function() {
    getSkills()
    .then(resetHTMLTable);
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
