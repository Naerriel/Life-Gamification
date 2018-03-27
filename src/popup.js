"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.currentView = "Home"; //Home, Edit, Import/Export, Timer

  LifeGamification.models.fillExpTable();
  LifeGamification.main.startView();
  LifeGamification.home.handleSkillButtons();
  LifeGamification.timer.handleTimerFinishButtons();
  LifeGamification.main.handleHeaderButtons();
});
