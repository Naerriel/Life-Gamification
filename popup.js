"use strict"
var skillsArrayId = "skillsArrayId";
var allSkills = [];
var expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  extension_log(" ");
  extension_log("Application begins.");

  fillExpTable();
  getSkills()
  .then(displayTable);
  handleSkillButtons();
  handleUniqueButtons();
});
