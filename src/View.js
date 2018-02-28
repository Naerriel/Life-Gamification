(function(){
  LifeGamification.view = {};
  let skillsView = [];

  const viewLevelAndExp = function (skill) {
    const number = skillsView.findIndex(function (element) {
      return element === skill;
    });
    $(`.exp${number}`).html(
      `Level ${skill.level}: ${skill.expTillNextLevel} more.`);
  }

  const rowTableHTML = function (skill, number) {
    return (`
      <h4 class="skill_name">${skill.name}: </h4>
      <a class="exp${number}"></a>
      <div>
        <input id="add_value_num${number}" class="add_value_nums" type="number" name="addValue" value="">
        <button id="add_value_button${number}" class="add_value_buttons" type="button">Add</button>
        <button id="remove_skill_button${number}" class="remove_skill_buttons" type="button">Remove</button>
      </div>
    `);
  }

  const appendSkill = function (skill) {
    $('#skills').append(rowTableHTML(skill, skillsView.length));
    skillsView.push(skill);
    viewLevelAndExp(skill);
  }

  LifeGamification.view.viewSkills = function (skills) {
    for (let name in skills) {
      appendSkill(skills[name]);
    }
  }

  const resetSkills = function () {
    skillsView = [];
    $("#skills").remove();
    $("#skillBody").append(`
      <div id="skills">
      </div>
    `);
    LifeGamification.view.viewSkills(LifeGamification.skillsCollection);
    LifeGamification.view.handleSkillButtons();
  }

  LifeGamification.view.handleSkillButtons = function () {
    const update_exp = function (skillNr) {
      const addedExp = parseInt($("#add_value_num" + skillNr).val());
      $("#add_value_num" + skillNr).val('');
      const skill = skillsView[skillNr];

      LifeGamification.models.updateExp(skill, addedExp)
        .then(viewLevelAndExp);
    }
    $("#skills").on("click", ".add_value_buttons", function () {
      const skillNr = this.id.replace('add_value_button', '');
      update_exp(skillNr);
    });
    $("#skills").on("keyup", ".add_value_nums", function (event) {
      if (event.keyCode === 13) {
        const skillNr = this.id.replace('add_value_num', '');
        update_exp(skillNr);
      }
    });
    $("#skills").on("click", ".remove_skill_buttons", function () {
      const skillNr = this.id.replace('remove_skill_button', '');
      LifeGamification.models.removeSkill(skillsView[skillNr])
        .then(resetSkills);
    });
  }

  LifeGamification.view.handleImportExportButtons = function () {
    $('#export_storage_button').click(function() {
      LifeGamification.repository.getSkills()
        .then(function(skills){
          $('#storage_stringified').html(JSON.stringify(skills));
        })
    });
    $('#import_storage_button').click(function() {
      const storage = $("#storage_stringified").val();
      if (storage === "") {
        return;
      }
      const skills = JSON.parse(storage);

      LifeGamification.models.clearCollection();
      LifeGamification.repository.updateSkills(skills)
        .then(function () {
          LifeGamification.models.createSkillsCollection(skills);
          resetSkills();
        });
    });
  }

  LifeGamification.view.handleAddSkillButton = function () {
    const add_skill = function () {
      const skillName = $('#skill_name').val();
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

  LifeGamification.view.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.view.viewSkills);
  }
})();
