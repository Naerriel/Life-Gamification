(function () {
  "use strict";

  createSkillView(skill) {
      const HTMLCode = (`
        
      `);
  }

  renderHome() {
    $(".all-skill").html("");
    for(let skillName in LifeGamification.skillsCollection){
      $(".all-skill").append(createSkillView(
        LifeGamification.skillsCollection[skillName]));
    }
  }
})();
