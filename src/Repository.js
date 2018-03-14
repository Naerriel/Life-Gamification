(function(){
  LifeGamification.repository = {};
  const skillsCollectionId = "skillsCollectionId";
  const startTimeId = "startTimeId";

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

  LifeGamification.repository.setTime = function (time) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({startTimeId: time}, resolve);
    });
  }

  LifeGamification.repository.getTime = function () {
    return new Promise((resolve, reject) => {
      let handleResult = function (result) {
        if(startTimeId in result){
          resolve(result[startTimeId]);
        }
        else{
          console.log("There is no stored time.");
          resolve({});
        }
      }
      chrome.storage.sync.get([startTimeId], handleResult);
    });
  }
})();
