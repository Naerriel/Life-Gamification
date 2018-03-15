(function(){
  LifeGamification.repository = {};
  const skillsCollectionId = "skillsCollectionId";
  const workId = "workId";

  LifeGamification.repository.getSkills = function () {
    return new Promise((resolve, reject) => {
      let setSkills = function (result) {
        if(skillsCollectionId in result) {
          resolve(result[skillsCollectionId]);
        }
        else{
          console.log("There isn't any array of skills names.");
          resolve({});
        }
      };
      chrome.storage.sync.get([skillsCollectionId], setSkills);
    });
  }

  LifeGamification.repository.updateSkills = function (skills) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({skillsCollectionId: skills}, function() {
        resolve(skills);
      });
    });
  }
})();
