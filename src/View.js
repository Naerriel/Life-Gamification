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
      ${skill.expInThisLevel}/${skill.expTillNextLevel}`);

    let percent = Math.floor(
      100 * skill.expInThisLevel / skill.expTillNextLevel);
    $(`.fill${number}`).html(`${percent}%`);
    $(`.fill${number}`).css('width', `${percent}%`);
  }

  const skillHTML = function (number) {
    return (`
      <a class="skill__level-number level${number}">-1</a>
      <a class="skill__level-text">lvl</a>
      <a class="skill__name name${number}">Skillname</a>
      <div class="progress-bar__wrapper">
          <span class="progress-bar__container">
              <span class="progress-bar__container-fill fill${number}">-1%</span>
          </span>
          <div class="progress-bar__buttons">
              <input class="progress-bar__add-input" id="addVal${number}" type="number" value="1">
              <span class="progress-bar__add-button" id="add${number}"> +</span>
          </div>
        </div>
        <a class="skill__experience exp${number}">-1/-1</a>
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
    let skillsEmpty = true;
    for (let name in skills) {
      skillsEmpty = false;
      appendHomeSkill(skills[name]);
    }
    if(skillsEmpty === true){
      $('.welcome-message').css("display", "block");
    }
  }

  LifeGamification.view.viewEdit = function (skills) {
    for (let name in skills) {
      appendEditSkill(skills[name]);
    }
    $('.add-skill').html(`
      <textarea class="add-skill__name" placeholder="New skill name"></textarea>
      <div class="add-skill__button">
        <span class="add-skill__button-helper"></span><img src="../assets/plus.svg" class="add-skill__button-icon">
      </div>
    `);
    LifeGamification.view.handleAddSkillButton();
  }

  LifeGamification.view.viewImportExport = function () {
	$('.import-export').html(`
    <button class="import-export__button import">Import</button>
    <button class="import-export__button export">Export</button>
    <textarea class="import-export__json" placeholder="Place JSON here"></textarea>
  `);
    LifeGamification.view.handleImportExportButtons();
  }

  LifeGamification.view.viewTimer = function (skills) {
    let code = `
      <button class="timer__button">Start</button>
      <select class="timer__select-skill">
    `;
    for (let name in skills){
      code += `<option value="${name}">${name}</option>`;
    }
    code += `</select>
      <div>
        <span class="timer__time"></span>
        <span class="timer__skill-name"></span>
      </div>
      `;
    $(".timer").html(code);
    LifeGamification.view.handleTimerButtons();
    LifeGamification.utils.handleTimer();
  }

  LifeGamification.view.setTimerTime = function (time) {
    $('.timer__time').html(time);
  }

  LifeGamification.view.startTimer = function (name) {
    $(".timer__button").html("Finish");
    $(".timer__select-skill").css("display", "none");
    $(".timer__skill-name").html(`
        Working on: ${name}
    `);
  }

  LifeGamification.view.finishTimer = function (){
    $(".timer__skill-name").html("");
    $(".timer__select-skill").css("display", "inline");
    $(".timer__time").html("");
  }

  const resetActives = function() {
    $('#Home').removeClass('active');
    $('#Edit').removeClass('active');
    $('#Import-Export').removeClass('active');
    $('#Timer').removeClass('active');
  }

  const resetView = function () {
    skillsView = [];
    resetActives();
    $(".all-skills").html("");
    $(".import-export").html("");
    $(".add-skill").html("");
    $(".timer").html("");
    $(".welcome-message").css("display", "none");
    clearInterval(LifeGamification.refreshTimer);
    LifeGamification.view.render(LifeGamification.skillsCollection);
  }

  LifeGamification.view.handleHeaderButtons = function () {
    $('.header-bar__menu-icon').click(function () {
      LifeGamification.view.currentView = "Home";
      resetView();
    });
    $('#Home').click(function () {
      LifeGamification.view.currentView = "Home";
      resetView();
    });
    $('#Edit').click(function () {
      LifeGamification.view.currentView = "Edit";
      resetView();
    });
    $('#Import-Export').click(function () {
      LifeGamification.view.currentView = "Import/Export";
      resetView();
    });
    $('#Timer').click(function () {
      LifeGamification.view.currentView = "Timer";
      resetView();
    });
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

  LifeGamification.view.handleImportExportButtons = function () {
    $('.export').click(function() {
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

  LifeGamification.view.handleTimerButtons = function () {
    $('.timer__button').click(function () {
      if($('.timer__button').text() === "Start"){
        $('.timer__button').html("Finish");
        LifeGamification.utils.startTiming();
      }
      else{
        $('.timer__button').html("Start");
        LifeGamification.utils.endTiming();
      }
    });
  }

  LifeGamification.view.render = function (skills) {
    if(LifeGamification.view.currentView === "Home"){
      LifeGamification.view.viewHome(skills);
      $('#Home').addClass('active');
    }
    if(LifeGamification.view.currentView === "Edit"){
      LifeGamification.view.viewEdit(skills);
      $('#Edit').addClass('active');
    }
    if(LifeGamification.view.currentView === "Import/Export"){
      LifeGamification.view.viewImportExport();
      $('#Import-Export').addClass('active');
    }
    if(LifeGamification.view.currentView === "Timer"){
      LifeGamification.view.viewTimer(skills);
      $('#Timer').addClass('active');
    }
  }

  LifeGamification.view.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.view.render);
  }
})();
