function levelAndExpHTML(skillNr) {
  /* Sets display of a skill with a certain level
   * and number of experience points needed to level up.
   */
  getExp(allSkills[skillNr], function (exp) {
    $(".exp" + skillNr).html(getLevel(exp));
  });
}

function rowTableHTML(skill) {
  /* Receiving parameters of a skill, creates HTML of a table row.
   */
  var HTMLCode = (`
    <h4 class="skill_name"> ` + skill.skillName + `: </h4>
    <a class="exp` + skill.skillNr + `"> ` + skill.expValue + ` </a>
    <div>
      <input id="add_value_num` + skill.skillNr + `" class="add_value_nums" type="number" name="addValue" value="">
      <button id="add_value_button` + skill.skillNr + `" class="add_value_buttons" type="button">Add</button>
      <button id="remove_skill_button` + skill.skillNr + `" class="remove_skill_buttons" type="button">Remove</button>
    </div>
  `);
  return HTMLCode;
}

function skillToTable (skillNr) {
  /* Adds a skill of a certain number to the HTML table.
   */
  var skill = {
    skillName: allSkills[skillNr],
    expValue: -1,
    // This value will be updated in the display function.
    skillNr: skillNr,
  };
  $('#skills').append(rowTableHTML(skill));
  displayLevelAndExp(skillNr);
}

function displayTable () {
  /* Creates table of skills by adding every skill row by row
   * and sets display of this skill.
   */
  for(var i = 0; i < allSkills.length; i++){
    skillToTable(i);
  }
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
