function levelAndExpHTML(skillNr) {
  /* Sets display of a skill with a certain level
   * and number of experience points needed to level up.
   */
  let level = skillsFullInfo[skillNr].level;
  let expTillNextLevel = skillsFullInfo[skillNr].expTillNextLevel;
  let HTMLCode = (`Level ${level}: ${expTillNextLevel} more.`);
  $(`.exp${skillNr}`).html(HTMLCode);
}

function rowTableHTML(skill) {
  /* Receiving parameters of a skill, creates HTML of a table row.
   */
  let HTMLCode = (`
    <h4 class="skill_name">${skill.name}: </h4>
    <a class="exp` + skill.nr + `">${skill.exp}</a>
    <div>
      <input id="add_value_num${skill.nr}" class="add_value_nums" type="number" name="addValue" value="">
      <button id="add_value_button${skill.nr}" class="add_value_buttons" type="button">Add</button>
      <button id="remove_skill_button${skill.nr}" class="remove_skill_buttons" type="button">Remove</button>
    </div>
  `);
  return HTMLCode;
}

function skillToTable (skillNr) {
  /* Adds a skill of a certain number to the HTML table.
   */
  extension_log("In skillToTable");
  $('#skills').append(rowTableHTML(skillsFullInfo[skillNr]));
  levelAndExpHTML(skillNr);
}

function displayTable () {
  for(let i = 0; i < skillsNames.length; i++){
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
    updateExp(skillNr)
    .then(levelAndExpHTML);
  });
  $("#skills").on("click", ".remove_skill_buttons", function () {
    removeSkill(this.id.replace('remove_skill_button', ''))
    .then(resetHTMLTable());
  });
  $("#skills").on("keyup", ".add_value_nums", function (event) {
    if (event.keyCode === 13) {
      let skillNr = this.id.replace('add_value_num', '');
      updateExp(skillNr)
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
    .then(function(){
      skillToTable(skillsNames.length - 1)
    });
  });
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      addSkill()
      .then(function(){
        skillToTable(skillsNames.length - 1)
      });
    }
  });
}

