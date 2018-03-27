(function(){
  LifeGamification.main = {};
  LifeGamification.skillsView = [];

  const resetActives = function() {
    $('#Home').removeClass('active');
    $('#Edit').removeClass('active');
    $('#Import-Export').removeClass('active');
    $('#Timer').removeClass('active');
  }

  LifeGamification.main.resetView = function () {
    LifeGamification.skillsView = [];
    resetActives();
    $(".all-skills").html("");
    $(".import-export").html("");
    $(".add-skill").html("");
    $(".timer").html("");
    $(".welcome-message").css("display", "none");
    clearInterval(LifeGamification.timer.refreshTimer);
    LifeGamification.main.render(LifeGamification.skillsCollection);
  }

  LifeGamification.main.handleHeaderButtons = function () {
    $('.header-bar__menu-icon').click(function () {
      LifeGamification.currentView = "Home";
      LifeGamification.main.resetView();
    });
    $('#Home').click(function () {
      LifeGamification.currentView = "Home";
      LifeGamification.main.resetView();
    });
    $('#Edit').click(function () {
      LifeGamification.currentView = "Edit";
      LifeGamification.main.resetView();
    });
    $('#Import-Export').click(function () {
      LifeGamification.currentView = "Import/Export";
      LifeGamification.main.resetView();
    });
    $('#Timer').click(function () {
      LifeGamification.currentView = "Timer";
      LifeGamification.main.resetView();
    });
  }

  LifeGamification.main.render = function (skills) {
    if(LifeGamification.currentView === "Home"){
      LifeGamification.home.render(skills);
      $('#Home').addClass('active');
    }
    if(LifeGamification.currentView === "Edit"){
      LifeGamification.edit.render(skills);
      $('#Edit').addClass('active');
    }
    if(LifeGamification.currentView === "Import/Export"){
      LifeGamification.importExport.render();
      $('#Import-Export').addClass('active');
    }
    if(LifeGamification.currentView === "Timer"){
      LifeGamification.timer.render(skills);
      $('#Timer').addClass('active');
    }
  }

  LifeGamification.main.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.main.render);
  }
})();
