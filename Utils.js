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
  var logValueResult = function (result) {
    if (skillName in result) {
      extension_log("Skill " + skillName + " experience value is ");
      extension_log(result[skillName]);
    }
    else {
      extension_log('Skill ' + skillName + ' is not in the base.');
    }
  };
  chrome.storage.sync.get([skillsArrayId], logResult);
  chrome.storage.sync.get([skillName], logValueResult);
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
  let keyList = allSkills.slice();
  keyList.push("skillsArrayId");
  extension_log("KEYLIST:");
  extension_log(keyList);
  chrome.storage.sync.get(keyList, function (result) {
    extension_log("Hi");
    $('#storage_stringified').html(JSON.stringify(result));
  });
}

function importStorage () {
  var text = $('#storage_stringified').val();
  var rightBracketPos = 0;
  while(text[rightBracketPos] != "]" && rightBracketPos < text.length){
    rightBracketPos++;
  }
  if(rightBracketPos < text.length && text[rightBracketPos] == "]"){
    var toSkills = text.slice(0, rightBracketPos + 1);
    var toExp = text.slice(rightBracketPos + 1, text.length);
    var newSkills = JSON.parse(toSkills);
    var newExp = JSON.parse(toExp);
    chrome.storage.sync.set({skillsArrayId: newSkills}, function () {
      allSkills = newSkills;
      extension_log(allSkills.length);

      function setExp (i) {
        if(i < allSkills.length){
          var skillName = allSkills[i];
          var skillExp = newExp[i];
          var skillsDict = {};
          skillsDict[skillName] = skillExp;
          chrome.storage.sync.set(skillsDict, setExp(i+ 1));
        }
        else{
          setTimeout(function() {
            resetHTMLTable();
          },100);
        }
      }
      setExp(0);
    });
  }
  else{
    extension_log("Incorrect JSONs.");
  }
}

function fillExpTable() {
  /* Fills expTable with numbers according to a certain formula.
   */
  for (var i = 0; i < maxLevel; i++) {
    expTable[i] = Math.floor(i * i / 2);
  }
}
