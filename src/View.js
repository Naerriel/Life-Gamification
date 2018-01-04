function levelAndExpHTML(skillNr) {
  /* Sets display of a skill with a certain level
   * and number of experience points needed to level up.
   */
  getExp(allSkills[skillNr])
  .then(getLevelAndLevelUpExp)
  .then(function (toFillValues){
    let HTMLCode = (`Level ${toFillValues[0]}: ${toFillValues[1]} more.`);
    $(`.exp${skillNr}`).html(HTMLCode);
  });
}

function rowTableHTML(skill) {
  /* Receiving parameters of a skill, creates HTML of a table row.
   */
  let HTMLCode = (`
    <h4 class="skill_name">${skill.skillName}: </h4>
    <a class="exp` + skill.skillNr + `">${skill.expValue}</a>
    <div>
      <input id="add_value_num${skill.skillNr}" class="add_value_nums" type="number" name="addValue" value="">
      <button id="add_value_button${skill.skillNr}" class="add_value_buttons" type="button">Add</button>
      <button id="remove_skill_button${skill.skillNr}" class="remove_skill_buttons" type="button">Remove</button>
    </div>
  `);
  return HTMLCode;
}

function skillToTable (skillNr) {
  /* Adds a skill of a certain number to the HTML table.
   */
  let skill = {
    skillName: allSkills[skillNr],
    expValue: -1,
    // This value will be updated in the levelAndExpHTML function.
    skillNr: skillNr,
  };
  $('#skills').append(rowTableHTML(skill));
  levelAndExpHTML(skillNr);
}

function displayTable () {
  for(let i = 0; i < allSkills.length; i++){
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

function handleSkillButtons () {
  /* Manages event listeners corresponding to skills.
   */
  $("#skills").on("click", ".add_value_buttons", function () {
    let skillNr = this.id.replace('add_value_button', '');
    updateSkill(skillNr)
    .then(levelAndExpHTML);
  });
  $("#skills").on("click", ".remove_skill_buttons", function () {
    removeSkill(this.id.replace('remove_skill_button', ''))
    .then(resetHTMLTable());
  });
  $("#skills").on("keyup", ".add_value_nums", function (event) {
    if (event.keyCode === 13) {
      let skillNr = this.id.replace('add_value_num', '');
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
  $('#add_skill').click(function(){
    addSkill()
    .then(skillToTable(allSkills.length - 1));
  });
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      addSkill()
      .then(skillToTable(allSkills.length - 1));
    }
  });
}

