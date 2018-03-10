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
              <input class="progress-bar__add-input" id="addVal${number}" type="number" value="1">
              <span class="progress-bar__add-button" id="add${number}"> +</span>
            </span>
        </div>
        <a class="skill__experience exp${number}">1024/1858</a>
    </div>
    `);
  }

  const skillHomeHTML = function (number) {
    return (`<div class="skill">`) + skillHTML(number);
  }

  const skillEditHTML = function (number) {
    return (`
    	<div class="skill">
				<a class="skill__remove"><img src="../assets/x.svg"class="skill__remove" id="remove${number}"></a>
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
    LifeGamification.view.handleImportExportButtons();
  }

  LifeGamification.view.viewEdit = function (skills) {
    for (let name in skills) {
      appendEditSkill(skills[name]);
    }
	$('.add-skill').html(`
     	<textarea class="add-skill__name">New skill name</textarea>
	    <div class="add-skill__button"><img src="../assets/plus.svg" class="add-skill__button-icon"></div>
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
      const addedExp = parseInt($("#addVal" + skillNr).val());
      $("#addVal" + skillNr).val('1');
      const skill = skillsView[skillNr];
      LifeGamification.models.updateExp(skill, addedExp)
        .then(viewLevelAndExp);
    }
    $(".all-skills").on("click", ".progress-bar__add-button", function () {
      const skillNr = this.id.replace('add', '');
      update_exp(skillNr);
    });
    $(".all-skills").on("keyup", ".progress-bar__add-input", function (event) {
      if (event.keyCode === 13) {
        const skillNr = this.id.replace('addVal', '');
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
    console.log("ImportExport");
    $('.export').click(function() {
      console.log("whyyy");
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
