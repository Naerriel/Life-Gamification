LifeGamification.view = {};

LifeGamification.view.levelAndExpHTML = function (skillNr) {
  /* Sets display of a skill with a certain level
   * and number of experience points needed to level up.
   */
  let level = LifeGamification.skillsCollection[skillNr].level;
  let expTillNextLevel = LifeGamification.skillsCollection[skillNr].expTillNextLevel;
  let HTMLCode = (`Level ${level}: ${expTillNextLevel} more.`);
  $(`.exp${skillNr}`).html(HTMLCode);
}

LifeGamification.view.rowTableHTML = function (skill) {
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

LifeGamification.view.skillToTable = function (skillNr) {
  /* Adds a skill of a certain number to the HTML table.
   */
  $('#skills').append(LifeGamification.view.
    rowTableHTML(LifeGamification.skillsCollection[skillNr]));
  LifeGamification.view.levelAndExpHTML(skillNr);
}

LifeGamification.view.displayTable = function () {
  for(let i = 0; i < skillsNames.length; i++){
    LifeGamification.view.skillToTable(i);
  }
}

LifeGamification.view.resetHTMLTable = function () {
  $("#skills").remove();
  $("#skillBody").append(`
    <div id="skills">
    </div>
  `);
  LifeGamification.view.displayTable();
  LifeGamification.view.handleSkillButtons();
}

LifeGamification.view.handleSkillButtons = function () {
  /* Manages event listeners corresponding to skills.
   */
  $("#skills").on("click", ".add_value_buttons", function () {
    let skillNr = this.id.replace('add_value_button', '');
    LifeGamification.models.updateExp(skillNr)
    .then(LifeGamification.view.levelAndExpHTML);
  });
  $("#skills").on("click", ".remove_skill_buttons", function () {
    LifeGamification.models.
      removeSkill(this.id.replace('remove_skill_button', ''))
    .then(LifeGamification.view.resetHTMLTable());
  });
  $("#skills").on("keyup", ".add_value_nums", function (event) {
    if (event.keyCode === 13) {
      let skillNr = this.id.replace('add_value_num', '');
      LifeGamification.models.updateExp(skillNr)
      .then(LifeGamification.view.levelAndExpHTML);
    }
  });
}

LifeGamification.view.handleImportExportButtons = function () {
  /* Manages event listeners corresponding to import & export functions.
   */
  $('#export_storage_button').click(LifeGamification.utils.exportStorage);
  $('#import_storage_button').click(LifeGamification.utils.importStorage);
}

LifeGamification.view.handleAddSkillButton = function () {
  /* Manages event listeners corresponding to adding new skills.
   */
  $('#add_skill').click(function(){
    let skillName = $('#skill_name').val();
    $('#skill_name').val('');
    LifeGamification.models.addSkill(skillName)
    .then(function(){
      LifeGamification.view.skillToTable(skillsNames.length - 1)
    });
  });
  $("#skill_name").keyup(function (event) {
    if (event.keyCode === 13) {
      let skillName = $('#skill_name').val();
      $('#skill_name').val('');
      LifeGamification.models.addSkill(skillName)
      .then(function(){
        LifeGamification.view.skillToTable(skillsNames.length - 1)
      });
    }
  });
}

