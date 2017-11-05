var skillsId = "skillsId";
var allSkills = [];

function updateExp(addedExp, callback, skillNr){
  /* Increases skill's exp by a certain amount.
   */
  var skillName = allSkills[skillNr];
  var updateStorage = function (result) {
    var overallExp;
    if (skillName in result) {
      overallExp = result[skillName] + addedExp;
    }
    else {
      overallExp = addedExp;
    }
    var object = {}
    object[skillName] = overallExp;
    chrome.storage.sync.set(object);
    callback(skillNr);
  }
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

function displayExp(skillNr) {
  /* Sets display of a skill with certain number.
   */
  getExp(allSkills[skillNr], function (exp) {
    extension_log(allSkills[skillNr] + " ma exp = " + exp);
    $(".exp" + skillNr).html(exp);
  });
}

function increaseValue(skillNr){
  var addedExp = $("#add_value_num" + skillNr).val();
  updateExp(parseInt(addedExp), displayExp, skillNr);
}

function extension_log (message) {
  /* Writes to console argument.
   */
  var script = 'console.log(`' + message + '`);';
  chrome.tabs.executeScript({
    code: script
  });
}

function createRowTable(skill) {
  /* Receiving parameters of a skill, creates table row.
   */
  var htmlCode = (`
    <h4 class="skill_name"> ` + skill.skillName + `: </h4>
    <a class="exp` + skill.skillNr + `"> ` + skill.expValue + ` </a>
      <div>
      <input id="add_value_num` + skill.skillNr + `" class="add_value_nums" type="number" name="addValue" value ="">
      <button id="add_value_button` + skill.skillNr + `" class="add_value_buttons" type="button">Dodaj</button>
    </div>
  `);
  $('#skills').append(htmlCode);
  // extension_log(htmlCode);
}

function displayTable (callback) {
  /* Creates table of skills by adding one skill row by row
   * and sets display of this skill.
   */
  for(i = 0; i < allSkills.length; i++){
    var skill = {
      skillName: allSkills[i],
      expValue: -1,
      skillNr: i,
    };
    createRowTable(skill);
    displayExp(i);
  }
  callback();
}

function newSkillToTable (nr) {
  /* Used for inserting added skill to table of skills.
   */
  var skill = {
    skillName: allSkills[nr],
    expValue: 0,
    skillNr: nr,
  };
  displayExp(nr);
  createRowTable(skill);
}

function addSkill () {
  /* Adds skill to storage and to current table.
   */
  var skillName = $('#skill_name').val();
  var object = {}
  object[skillName] = 0;
  allSkills.push(skillName);
  chrome.storage.sync.set({skillsId: allSkills});
  chrome.storage.sync.set(object);

  var logResult = function (result) {
    extension_log("Wypisuje moje obecne skille.");
    extension_log(JSON.stringify(result));
  }
  var logValueResult = function (result) {
    extension_log("Wypisuje dodany skill.");
    if (skillName in result) {
      extension_log("Wartosc skilla " + skillName + " to ");
      extension_log(result[skillName]);
    }
    else {
      extension_log('Nie ma w bazie skilla ' + skillName + '.');
    }
  }
  chrome.storage.sync.get([skillsId], logResult);
  chrome.storage.sync.get([skillName], logValueResult);
  newSkillToTable(allSkills.length - 1);
}

function clearSkills () {
  /* Erases all skills.
   */
  var emptyArray = [];
  chrome.storage.sync.set({skillsId: emptyArray});
}

function debugSkillsExp(index) {
  /* Writes to consol all skills and it's exp.
   */
  var skillName = allSkills[index];
  extension_log("nazwa skilla to: " + skillName);
  chrome.storage.sync.get([skillName], function (result) {
    extension_log(skillName + ": " + result[skillName]);
  });
  if (index + 1 < allSkills.length) {
    debugSkillsExp(index + 1);
  }
}

function getSkillsFromStorage (callbackDisplay) {
  /* Creates local table by taking skills from chrome storage.
   */
   var logResult = function (result) {
    if (skillsId in result) {
      allSkills = result[skillsId];
      callbackDisplay(handleButtons);
    }
    else{
      extension_log('Jest problem z pobraniem skilli.');
    }
  }
  chrome.storage.sync.get([skillsId], logResult);
}

function handleButtons () {
  $('.add_value_buttons').click(function () {
    increaseValue(this.id.replace('add_value_button', ''));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  $('#add_skill').click(addSkill);
  extension_log("Rozpoczynam.");
  // clearSkills();
  getSkillsFromStorage(displayTable);
});
