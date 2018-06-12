/* global chrome */
const timersCollectionId = "timersCollectionId";
const pomodoroOptionsId = "pomodoroOptionsId";

export const getRepoTimers = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([timersCollectionId], (result) => {
      if(timersCollectionId in result){
        resolve(result[timersCollectionId]);
      } else {
        reject();
      }
    });
  });
}

export const setRepoTimers = (timers) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({timersCollectionId: timers}, resolve);
  });
}

export const getRepoPomodoroOptions = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([pomodoroOptionsId], (result) => {
      if(pomodoroOptionsId in result){
        resolve(result[pomodoroOptionsId]);
      } else {
        reject();
      }
    });
  });
}

export const setRepoPomodoroOptions = (pomodoroOptions) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({pomodoroOptionsId: pomodoroOptions}, resolve);
  });
}
