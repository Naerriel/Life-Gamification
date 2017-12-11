"use strict"
var skillsArrayId = "skillsArrayId";
var allSkills = [];
var expTable = [];
const maxLevel = 210;

document.addEventListener('DOMContentLoaded', function () {
  console.log("dupa");
  extension_log("Application begins.");
  fillExpTable();
  handleUniqueButtons();
  getSkillsFromStorage(displayTable);
});
