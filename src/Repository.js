LifeGamification.repository = {};

LifeGamification.repository.getExp = function (skillName){
  /* Gets exp of a skill from storage.
   */
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([skillName], function (result) {
      let overallExp;
      if (skillName in result) {
        overallExp = result[skillName];
      }
      else{
        overallExp = 0;
      }
      resolve(overallExp);
    });
  });
}

LifeGamification.repository.getSkills = function () {
  /*  Creates a local table by taking skills from chrome storage.
   */
  return new Promise((resolve, reject) => {
    let setSkillsArray = function (result) {
      if(skillsArrayId in result) {
        skillsNames = result[skillsArrayId];
        resolve();
      }
      else{
        console.log("There isn't any array of skills names.");
        reject();
      }
    };
    chrome.storage.sync.get([skillsArrayId], setSkillsArray);
  });
}

LifeGamification.repository.setTable = function (table) {
  /* Sets table of skills to repository.
   */
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({skillsArrayId: table}, resolve);
  });
}

LifeGamification.repository.setExp = function (skillName, exp) {
  /* Sets exp of a skill of a certain name to repository.
   */
  return new Promise((resolve, reject) => {
    let skillsDict = {};
    skillsDict[skillName] = exp;
    chrome.storage.sync.set(skillsDict, resolve);
  });
}
