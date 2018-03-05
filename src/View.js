(function(){
  LifeGamification.view = {};
  let skillsView = [];

  const viewLevelAndExp = function (skill) {
    const number = skillsView.findIndex(function (element) {
      return element === skill;
    });
    $(`.exp${number}`).html(
      `Level ${skill.level}: ${skill.expTillNextLevel} more.`);
    $(`.level${number}`).html(`${skill.level}`);
    $(`.name${number}`).html(`${skill.name}`);
    $(`.exp${number}`).html(`
      ${skill.expTillNextLevel[0]}/${skill.expTillNextLevel[1]}`);
    let percent = Math.floor(
      100 * skill.expTillNextLevel[0] / skill.expTillNextLevel[1]);
    $(`.fill${number}`).html(`${percent}%`);

    console.log(`percents are = ${percent}%`);
    $(`.fill${number}`).css('width', `${percent}%`);
    console.log(JSON.stringify(skill));
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
			<div class="skill">
				<a class="skill__level-number level${number}">73</a>
				<a class="skill__level-text">lvl</a>
				<a class="skill__name name${number}">Jeżdżenie na rowerze bez spodni</a>
				<div class="progress-bar__wrapper">
				    <span class="progress-bar__container">
						    <span class="progress-bar__container-fill fill${number}">60%</span>
						</span>
						<span class="progress-bar__buttons">
								<span class="progress-bar__add-experience"> +1 </span>
								<span class="progress-bar__arrow"> "\\/" </span>
							</span>
					</div>
					<a class="skill__experience exp${number}">1024/1858</a>
			</div>
		`);
  }

  const appendSkill = function (skill) {
    $('.all-skills').append(rowTableHTML(skill, skillsView.length));
    skillsView.push(skill);
    viewLevelAndExp(skill);
  }

  LifeGamification.view.viewSkills = function (skills) {
    for (let name in skills) {
      appendSkill(skills[name]);
    }
  }

  LifeGamification.view.viewImportExport = function() {
		$('.import-export').html(`
			<span class="import-export__button">Import</span>
			<span class="import-export__button">Export</span>
    	<textarea class="import-export__json">Place JSON here</textarea>
			`);
  }

  const resetSkills = function () {
    skillsView = [];
    $(".all-skills").html("");
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
    $(".all-skills").on("click", ".add_value_buttons", function () {
      const skillNr = this.id.replace('add_value_button', '');
      update_exp(skillNr);
    });
    $(".all-skills").on("keyup", ".add_value_nums", function (event) {
      if (event.keyCode === 13) {
        const skillNr = this.id.replace('add_value_num', '');
        console.log("I try to add exp.");
        update_exp(skillNr);
      }
    });
    $(".all-skills").on("click", ".remove_skill_buttons", function () {
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
      .then(function(skills){
        LifeGamification.view.viewSkills(skills);
				LifeGamification.view.viewImportExport();
      });
  }
})();
