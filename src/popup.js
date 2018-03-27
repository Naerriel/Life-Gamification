"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.view.currentView = "Home"; //Home, Edit, Import/Export, Timer

  LifeGamification.models.fillExpTable();
  LifeGamification.view.startView();
  LifeGamification.view.handleSkillButtons();
  LifeGamification.view.timer.handleTimerFinishButtons();
  LifeGamification.view.handleHeaderButtons();
});
