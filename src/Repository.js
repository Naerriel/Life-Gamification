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

  LifeGamification.repository.setWork = function (work) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({workId: work}, resolve);
    });
  }

  LifeGamification.repository.getWork = function () {
    return new Promise((resolve, reject) => {
      let handleResult = function (result) {
        if(workId in result){
          resolve(result[workId]);
        }
        else{
          console.log("There is no stored work.");
          resolve({});
        }
      }
      chrome.storage.sync.get([workId], handleResult);
    });
  }
})();
