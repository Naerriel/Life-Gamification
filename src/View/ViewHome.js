(function(){
  LifeGamification.view.home = {};

//Functions to both Home and Edit views.

  LifeGamification.view.viewLevelAndExp = function (skill) {
    const number = LifeGamification.skillsView.findIndex(function (element) {
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

  LifeGamification.view.skillHTML = function (number) {
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

  LifeGamification.view.handleSkillButtons = function () {
    const update_exp = function (skillNr) {
      const addedExp = parseInt($("#addVal" + skillNr).val());
      $("#addVal" + skillNr).val('1');
      const skill = LifeGamification.skillsView[skillNr];
      LifeGamification.models.updateExp(skill, addedExp)
        .then(LifeGamification.view.viewLevelAndExp);
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
      LifeGamification.models.removeSkill(LifeGamification.skillsView[skillNr])
        .then(LifeGamification.view.resetView);
    });
  }

//End of functions to both Home and Edit views.

  const skillHomeHTML = function (number) {
    return (`<div class="skill">`) + LifeGamification.view.skillHTML(number);
  }

  const appendHomeSkill = function (skill) {
    $('.all-skills').append(skillHomeHTML(LifeGamification.skillsView.length));
    LifeGamification.skillsView.push(skill);
    LifeGamification.view.viewLevelAndExp(skill);
  }


  LifeGamification.view.home.render = function (skills) {
    let skillsEmpty = true;
    for (let name in skills) {
      skillsEmpty = false;
      appendHomeSkill(skills[name]);
    }
    if(skillsEmpty === true){
      $('.welcome-message').css("display", "block");
    }
  }

})();
