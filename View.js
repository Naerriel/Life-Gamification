function displayLevelAndExp(skillNr) {
  /* Sets display of a skill with a certain level
   * and number of experience points needed to level up.
   */
  getExp(allSkills[skillNr], function (exp) {
    $(".exp" + skillNr).html(getLevel(exp));
  });
}

function createRowTable(skill) {
  /* Receiving parameters of a skill, creates table row.
   */
  extension_log("I create new row.");
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
}

function skillToTable (i) {
  var skill = {
    skillName: allSkills[i],
    expValue: -1,
    // This value will be updated in the display function.
    skillNr: i,
  };
  createRowTable(skill);
  displayLevelAndExp(i);
}

function displayTable () {
  /* Creates table of skills by adding every skill row by row
   * and sets display of this skill.
   */
  for(var i = 0; i < allSkills.length; i++){
    skillToTable(i);
  }
}

function newSkillToTable (nr) {
  /* Inserts new skill to HTML table of skills.
  *    */
  var skill = {
    skillName: allSkills[nr],
    expValue: 0,
    skillNr: nr,
  };
  extension_log("HERE!");
  displayLevelAndExp(nr);
  createRowTable(skill);
}

function resetHTMLTable() {
  $("#skills").remove();
  $("#skillBody").append(`
    <div id="skills">
    </div>
  `);
  displayTable();
  handleSkillButtons();
}

function handleUniqueButtons () {
  $('#add_skill').click(addSkill);
  $('#export_storage_button').click(exportStorage);
  $('#import_storage_button').click(importStorage);
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      addSkill();
    }
  });
}
