"use strict"
let skillsArrayId = "skillsArrayId";
let skillsCollection = [];
let skillsNames = [];
let expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log(" ");
  console.log("Application begins.");

  fillExpTable();
  getSkills()
  .then(createSkillsCollection)
  .then(function() {
    displayTable();
    console.log(JSON.stringify(skillsCollection));
  });
  handleSkillButtons();
  handleImportExportButtons();
  handleAddSkillButton();
});
