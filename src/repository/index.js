/* global chrome */
const skillsCollectionId = "skillsCollectionId";
const historyCollectionId = "historyCollectionId";
const settingsCollectionId = "settingsCollectionId";

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

export const setRepoSettings = (settings) => {
  return new Promise((resolve, reject) => {
    setElementToRepo(settingsCollectionId, settings)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
      });
  });
}

export const getRepoSettings = () => {
  return new Promise((resolve, reject) => {
    getElementFromRepo(settingsCollectionId)
      .then((settings) => {
        resolve(settings);
      })
      .catch((e) => {
        reject();
      });
  });
}

export const setRepoHistory = (history) => {
  return new Promise((resolve, reject) => {
    setElementToRepo(historyCollectionId, history)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
      });
  });
}

export const getRepoHistory = () => {
  return new Promise((resolve, reject) => {
    getElementFromRepo(historyCollectionId)
      .then((history) => {
        resolve(history);
      })
      .catch((e) => {
        reject();
      });
  });
}
