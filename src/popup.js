"use strict"
let skillsArrayId = "skillsArrayId";
let skillsFullInfo = [];
let skillsNames = [];
let expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  extension_log(" ");
  extension_log("Application begins.");

  fillExpTable();
  getSkills()
  .then(fillSkillArray)
  .then(function() {
    displayTable();
    extension_log(JSON.stringify(skillsFullInfo));
  });
  handleSkillButtons();
  handleImportExportButtons();
  handleAddSkillButton();
});
