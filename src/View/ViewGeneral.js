(function(){
  LifeGamification.view = {};
  LifeGamification.skillsView = [];

  const resetActives = function() {
    $('#Home').removeClass('active');
    $('#Edit').removeClass('active');
    $('#Import-Export').removeClass('active');
    $('#Timer').removeClass('active');
  }

  LifeGamification.view.resetView = function () {
    LifeGamification.skillsView = [];
    resetActives();
    $(".all-skills").html("");
    $(".import-export").html("");
    $(".add-skill").html("");
    $(".timer").html("");
    $(".welcome-message").css("display", "none");
    clearInterval(LifeGamification.view.timer.refreshTimer);
    LifeGamification.view.render(LifeGamification.skillsCollection);
  }

  LifeGamification.view.handleHeaderButtons = function () {
    $('.header-bar__menu-icon').click(function () {
      LifeGamification.view.currentView = "Home";
      LifeGamification.view.resetView();
    });
    $('#Home').click(function () {
      LifeGamification.view.currentView = "Home";
      LifeGamification.view.resetView();
    });
    $('#Edit').click(function () {
      LifeGamification.view.currentView = "Edit";
      LifeGamification.view.resetView();
    });
    $('#Import-Export').click(function () {
      LifeGamification.view.currentView = "Import/Export";
      LifeGamification.view.resetView();
    });
    $('#Timer').click(function () {
      LifeGamification.view.currentView = "Timer";
      LifeGamification.view.resetView();
    });
  }

  LifeGamification.view.render = function (skills) {
    if(LifeGamification.view.currentView === "Home"){
      LifeGamification.view.home.render(skills);
      $('#Home').addClass('active');
    }
    if(LifeGamification.view.currentView === "Edit"){
      LifeGamification.view.edit.render(skills);
      $('#Edit').addClass('active');
    }
    if(LifeGamification.view.currentView === "Import/Export"){
      LifeGamification.view.importExport.render();
      $('#Import-Export').addClass('active');
    }
    if(LifeGamification.view.currentView === "Timer"){
      LifeGamification.view.timer.render(skills);
      $('#Timer').addClass('active');
    }
  }

  LifeGamification.view.startView = function () {
    LifeGamification.repository.getSkills()
      .then(LifeGamification.models.createSkillsCollection)
      .then(LifeGamification.view.render);
  }
})();
