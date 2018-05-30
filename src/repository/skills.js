/* global chrome */
const skillsCollectionId = "skillsCollectionId";

export const getRepoSkills = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([skillsCollectionId], (result) => {
      if(skillsCollectionId in result){
        resolve(result[skillsCollectionId]);
      }
      else{
        reject();
      }
    });
  });
}

export const setRepoSkills = (skills) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({skillsCollectionId: skills}, resolve);
  });
}
