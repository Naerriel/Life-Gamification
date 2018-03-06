"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.currentView = "Home"; //Home, Edit, Import/Export

  LifeGamification.models.fillExpTable();
  LifeGamification.view.startView();
  LifeGamification.view.handleSkillButtons();
  LifeGamification.view.handleHeaderButtons();
});
