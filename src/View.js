(function(){
  LifeGamification.view = {};

  viewLevelAndExp = function (skill) {
    $(`.exp${skill.nr}`).html(
      `Level ${skill.level}: ${skill.expTillNextLevel} more.`);
  }

  rowTableHTML = function (skill) {
    return (`
      <h4 class="skill_name">${skill.name}: </h4>
      <a class="exp` + skill.nr + `">${skill.exp}</a>
      <div>
        <input id="add_value_num${skill.nr}" class="add_value_nums" type="number" name="addValue" value="">
        <button id="add_value_button${skill.nr}" class="add_value_buttons" type="button">Add</button>
        <button id="remove_skill_button${skill.nr}" class="remove_skill_buttons" type="button">Remove</button>
      </div>
    `);
  }

  appendSkill = function (skill) {
    $('#skills').append(rowTableHTML(skill));
    viewLevelAndExp(skill);
  }

  LifeGamification.view.viewSkills = function (skills) {
    skills.forEach(appendSkill);
  }

  LifeGamification.view.resetHTMLTable = function () {
    $("#skills").remove();
    $("#skillBody").append(`
      <div id="skills">
      </div>
    `);
    LifeGamification.view.viewSkills(LifeGamification.skillsCollection);
    LifeGamification.view.handleSkillButtons();
  }

  LifeGamification.view.handleSkillButtons = function () {
    update_exp = function (skillNr) {
      let addedExp = parseInt($("#add_value_num" + skillNr).val());
      $("#add_value_num" + skillNr).val('');

      LifeGamification.models.updateExp(skillNr, addedExp)
      .then(viewLevelAndExp);
    }
    $("#skills").on("click", ".add_value_buttons", function () {
      let skillNr = this.id.replace('add_value_button', '');
      update_exp(skillNr);
    });
    $("#skills").on("keyup", ".add_value_nums", function (event) {
      if (event.keyCode === 13) {
        let skillNr = this.id.replace('add_value_num', '');
        update_exp(skillNr);
      }
    });
    $("#skills").on("click", ".remove_skill_buttons", function () {
      LifeGamification.models.
        removeSkill(this.id.replace('remove_skill_button', ''))
      .then(LifeGamification.view.resetHTMLTable());
    });
  }

  LifeGamification.view.handleImportExportButtons = function () {
    $('#export_storage_button').click(LifeGamification.utils.exportStorage);
    $('#import_storage_button').click(LifeGamification.utils.importStorage);
  }

  LifeGamification.view.handleAddSkillButton = function () {
    add_skill = function () {
      let skillName = $('#skill_name').val();
      $('#skill_name').val('');
      LifeGamification.models.addSkill(skillName)
      .then(appendSkill);
    }

    $('#add_skill').click(add_skill);
    $("#skill_name").keyup(function (event) {
      if (event.keyCode === 13) {
        add_skill();
      }
    });
  }
})();
