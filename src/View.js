(function(){
  LifeGamification.view = {};
  let skillsView = [];

  const viewLevelAndExp = function (skill) {
    const number = skillsView.findIndex(function (element) {
      return element === skill;
    });
		$(`.level${number}`).html(`${skill.level}`);
    $(`.name${number}`).html(`${skill.name}`);
    $(`.exp${number}`).html(`
      ${skill.expTillNextLevel[0]}/${skill.expTillNextLevel[1]}`);

		let percent = Math.floor(
      100 * skill.expTillNextLevel[0] / skill.expTillNextLevel[1]);
    $(`.fill${number}`).html(`${percent}%`);
    $(`.fill${number}`).css('width', `${percent}%`);
  }

  const skillHTML = function (number) {
    return (`
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

  const skillHomeHTML = function (number) {
    return (`
      <a class="exp${number}"></a>
      <div>
        <input id="add_value_num${number}" class="add_value_nums" type="number" name="addValue" value="">
        <button id="add_value_button${number}" class="add_value_buttons" type="button">Add</button>
        <button id="remove_skill_button${number}" class="remove_skill_buttons" type="button">Remove</button>
      </div>
			<div class="skill">
		`) + skillHTML(number);
  }

  const skillEditHTML = function (number) {
    return (`
    	<div class="skill">
				<a class="skill__remove"><img src="../assets/removeSkill.png"class="skill__remove" id="remove${number}"></a>
      `) + skillHTML(number);
  }

  const appendHomeSkill = function (skill) {
    $('.all-skills').append(skillHomeHTML(skillsView.length));
    skillsView.push(skill);
    viewLevelAndExp(skill);
  }

  const appendEditSkill = function (skill) {
    $('.all-skills').append(skillEditHTML(skillsView.length));
    skillsView.push(skill);
    viewLevelAndExp(skill);
  }

  LifeGamification.view.viewHome = function (skills) {
    for (let name in skills) {
      appendHomeSkill(skills[name]);
    }
  }

  LifeGamification.view.viewImportExport = function () {
		$('.import-export').html(`
			<button class="import-export__button import">Import</button>
			<button class="import-export__button export">Export</button>
    	<textarea class="import-export__json">Place JSON here</textarea>
    `);
  }

  LifeGamification.view.viewEdit = function (skills) {
    for (let name in skills) {
      appendEditSkill(skills[name]);
    }
		$('.add-skill').html(`
     	<textarea class="add-skill__name">New skill name</textarea>
	    <div class="add-skill__button"><img src="../assets/plus.png" class="add-skill__button-icon"></div>
      `);
    LifeGamification.view.handleAddSkillButton();
  }

  const resetView = function () {
    skillsView = [];
    $(".all-skills").html("");
    $(".import-export").html("");
    $(".add-skill").html("");
    LifeGamification.view.render(LifeGamification.skillsCollection);
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
    $(".all-skills").on("click", ".skill__remove", function () {
      const skillNr = this.id.replace('remove', '');
      LifeGamification.models.removeSkill(skillsView[skillNr])
        .then(resetView);
    });
  }

  LifeGamification.view.handleHeaderButtons = function () {
    $('#Home').click(function () {
      LifeGamification.currentView = "Home";
      resetView();
    });
    $('#Edit').click(function () {
      LifeGamification.currentView = "Edit";
      resetView();
    });
    $('#Import-Export').click(function () {
      LifeGamification.currentView = "Import/Export";
      resetView();
    });
  }

  LifeGamification.view.handleImportExportButtons = function () {
    $('.export').click(function() {
      console.log("click on export");
      LifeGamification.repository.getSkills()
        .then(function(skills){
          $('.import-export__json').html(JSON.stringify(skills));
        })
    });
    $('.import').click(function() {
      const storage = $(".import-export__json").val();
      if (storage === "") {
        return;
      }
      const skills = JSON.parse(storage);

      LifeGamification.models.clearCollection();
      LifeGamification.repository.updateSkills(skills)
        .then(function () {
          LifeGamification.models.createSkillsCollection(skills);
          resetView();
        });
    });
  }

  LifeGamification.view.handleAddSkillButton = function () {
    const add_skill = function () {
      console.log("I add a skill.");
      const skillName = $('.add-skill__name').val();
      $('.add-skill__name').val('');
      LifeGamification.models.addSkill(skillName)
        .then(appendEditSkill);
    }

    $('.add-skill__button-icon').click(add_skill);
    $('.add-skill__name').keyup(function (event) {
      if (event.keyCode === 13) {
        add_skill();
      }
    });
  }

  LifeGamification.view.render = function (skills) {
    if(LifeGamification.currentView === "Home"){
      LifeGamification.view.viewHome(skills);
    }
    if(LifeGamification.currentView === "Edit"){
      LifeGamification.view.viewEdit(skills);
    }
    if(LifeGamification.currentView === "Import/Export"){
      LifeGamification.view.viewImportExport();
    }
  }

  LifeGamification.view.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.view.render);
  }
})();
