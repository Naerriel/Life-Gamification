/* global chrome */
const skillsCollectionId = "skillsCollectionId";
const historyCollectionId = "historyCollectionId";

const setElementToRepo = (key, element) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({[key]: element}, resolve);
  });
}

const getElementFromRepo = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if(key in result){
        resolve(result[key]);
      } else {
        reject();
      }
    });
  });
}

export const setRepoSkills = (skills) => {
  console.log(skills);
  return new Promise((resolve, reject) => {
    setElementToRepo(skillsCollectionId, skills)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
      });
  });
}

export const getRepoSkills = () => {
  return new Promise((resolve, reject) => {
    getElementFromRepo(skillsCollectionId)
      .then((skills) => {
        resolve(skills);
      })
      .catch((e) => {
        reject();
      });
  });
}
