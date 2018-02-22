"use strict"
let skillsArrayId = "skillsArrayId";
let skillsFullInfo = [];
let skillsNames = [];
let expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  fillExpTable();
  getSkills()
  .then(fillSkillsFullInfo)
  .then(function() {
    displayTable();
    console.log(JSON.stringify(skillsFullInfo));
  });
  handleSkillButtons();
  handleImportExportButtons();
  handleAddSkillButton();
});
