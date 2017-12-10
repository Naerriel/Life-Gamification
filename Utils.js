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

function addSkill () {
  /* Adds skill to storage and to current table.
   */
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

  newSkillToTable(allSkills.length - 1);
}

function clearSkills () {
  /* Erases all skills.
   */
  var emptyArray = [];
  chrome.storage.sync.set({skillsArrayId: emptyArray});
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
     *    * and stores modified table in Chrome Storage.
     *       */
    allSkills.splice(skillNr, 1);
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
  //var text = JSON.stringify(allSkills);
  //extension_log(text);
  //text += "[";
  //function addToString(i) {
  //  if(i < allSkills.length){
  //    if(i != 0) {
  //      text += ",";
  //    }
  //    chrome.storage.sync.get([allSkills[i]], function (result) {
  //      var exp = result[allSkills[i]];
  //      extension_log(exp);
  //      text += exp.toString();
  //      addToString(i + 1);
  //    });
  //  }
  //  else{
  //    text += "]";
  //    extension_log(text);
  //    $('#storage_stringified').html(text);
  //  }
  //}
  //addToString(0);
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
     *    */
    for (var i = 0; i < maxLevel; i++) {
          expTable[i] = Math.floor(i * i / 2);
        }
}

function createRowTable(skill) {
  /* Receiving parameters of a skill, creates table row.
   */
  var htmlCode = (`
    <h4 class="skill_name"> ` + skill.skillName + `: </h4>
    <a class="exp` + skill.skillNr + `"> ` + skill.expValue + ` </a>
    <div>
      <input id="add_value_num` + skill.skillNr + `" class="add_value_nums" type="number" name="addValue" value="">
      <button id="add_value_button` + skill.skillNr + `" class="add_value_buttons" type="button">Add</button>
      <button id="remove_skill_button` + skill.skillNr + `" class="remove_skill_buttons" type="button">Remove</button>
    </div>
  `);
  $('#skills').append(htmlCode);
  // extension_log(htmlCode);
}

function increaseValue(skillNr){
  /* Increases value of a skill with certain number by value in input type text.
   */
  var addedExp = $("#add_value_num" + skillNr).val();
  $("#add_value_num" + skillNr).val('');
  updateExp(parseInt(addedExp), skillNr, displayExp);
}

