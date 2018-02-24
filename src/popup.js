"use strict"
const LifeGamification = {};
let skillsNames = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.skillsCollection = [];
  LifeGamification.models.fillExpTable();
  LifeGamification.repository.getSkills()
  .then(LifeGamification.models.createSkillsCollection)
  .then(function() {
    LifeGamification.view.viewSkills(LifeGamification.skillsCollection);
  });
  LifeGamification.view.handleSkillButtons();
  LifeGamification.view.handleImportExportButtons();
  LifeGamification.view.handleAddSkillButton();
});
