function displayExp(skillNr) {
    /* Sets display of a skill with certain number.
     *    */
    getExp(allSkills[skillNr], function (exp) {
         $(".exp" + skillNr).html(getLevel(exp));
        });
}

function createRowTable(skill) {
    /* Receiving parameters of a skill, creates table row.
     *    */
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

function displayTable (callback) {
    /* Creates table of skills by adding every skill row by row
     *    * and sets display of this skill.
     *       */
    for(var i = 0; i < allSkills.length; i++){
          var skill = {
                  skillName: allSkills[i],
                  expValue: -1, // This value will be updated in the display function.
                  skillNr: i,
                };
          createRowTable(skill);
          displayExp(i);
        }
    callback();
}

function newSkillToTable (nr) {
    /* Inserts new skill to HTML table of skills.
     *    */
    var skill = {
          skillName: allSkills[nr],
          expValue: 0,
          skillNr: nr,
        };
    displayExp(nr);
    createRowTable(skill);
    handleSkillButtons();
}

function resetHTMLTable() {
    $("#skills").remove();
    $("#skillBody").append(`
          <div id="skills">
            </div>
          `);
    displayTable(handleSkillButtons);
}

function handleSkillButtons () {
    /* Manages clicking on all buttons and submitting by enter.
     *    */
    $('.remove_skill_buttons').click(function () {
          removeSkill(this.id.replace('remove_skill_button', ''));
        });
    $('.add_value_buttons').click(function () {
          increaseValue(this.id.replace('add_value_button', ''));
        });
    $('.add_value_nums').keyup(function (event) {
          if (event.keyCode === 13) {
                  increaseValue(this.id.replace('add_value_num', ''));
                }
        });
    $("#skill_name").keyup(function (event) {
          if (event.keyCode === 13) {
                  addSkill();
                }
        });
}

function handleUniqueButtons () {
    $('#add_skill').click(addSkill);
    $('#export_storage_button').click(exportStorage);
    $('#import_storage_button').click(importStorage);
}

function getSkillsFromStorage (callbackDisplay) {
      /* Creates local table by taking skills from chrome storage.
       *      *    */
       var setSkillsArray = function (result) {
                    if (skillsArrayId in result) {
                                         allSkills = result[skillsArrayId];
                                       }
                    else{
                                         extension_log("Can't load the array of skills' names.");
                                       }
                    extension_log("All skills:");
                    extension_log(JSON.stringify(allSkills));
                    callbackDisplay(handleSkillButtons);
                  };
      chrome.storage.sync.get([skillsArrayId], setSkillsArray);
}

function getSkillsFromStorage (callbackDisplay) {
    /* Creates local table by taking skills from chrome storage.
     *    */
     var setSkillsArray = function (result) {
           if (skillsArrayId in result) {
                   allSkills = result[skillsArrayId];
                 }
           else{
                   extension_log("Can't load the array of skills' names.");
                 }
           extension_log("All skills:");
           extension_log(JSON.stringify(allSkills));
           callbackDisplay(handleSkillButtons);
         };
    chrome.storage.sync.get([skillsArrayId], setSkillsArray);
}

function resetHTMLTable() {
    $("#skills").remove();
    $("#skillBody").append(`
          <div id="skills">
            </div>
          `);
    displayTable(handleSkillButtons);
}
