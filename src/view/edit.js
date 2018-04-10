(function(){
  LifeGamification.edit = {};

  const skillEditHTML = function (number) {
    return (`
    	<div class="skill">
        <img src="../../assets/x.svg"class="skill__remove" id="remove${number}">
      `) + LifeGamification.home.skillHTML(number);
  }

  const appendEditSkill = function (skill) {
    $('.all-skills').append(skillEditHTML(LifeGamification.skillsView.length));
    LifeGamification.skillsView.push(skill);
    LifeGamification.home.viewLevelAndExp(skill);
  }

  LifeGamification.edit.render = function (skills) {
    for (let name in skills) {
      appendEditSkill(skills[name]);
    }
    $('.add-skill').html(`
      <textarea class="add-skill__name" placeholder="New skill name"></textarea>
      <div class="add-skill__button">
        <span class="add-skill__button-helper"></span><img src="../../assets/plus.svg" class="add-skill__button-icon">
      </div>
    `);
    handleAddSkillButton();
  }

  const handleAddSkillButton = function () {
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
})();
