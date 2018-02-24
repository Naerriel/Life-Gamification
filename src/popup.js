"use strict"
const LifeGamification = {};
let skillsArrayId = "skillsArrayId";
let skillsNames = [];
let expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  LifeGamification.skillsCollection = [];
  LifeGamification.models.fillExpTable();
  LifeGamification.repository.getSkills()
  .then(LifeGamification.models.createSkillsCollection)
  .then(function() {
    LifeGamification.view.displayTable();
  });
  LifeGamification.view.handleSkillButtons();
  LifeGamification.view.handleImportExportButtons();
  LifeGamification.view.handleAddSkillButton();
});
