/*global chrome*/
const skillsCollectionId = "skillsCollectionId";

export const skills = (state = [], action) => {
  switch (action.type) {
    case 'SKILLS_GOT_SUCCESS':
      return [
        ...action.skills
      ]
    case 'ADD_SKILL':{
      const newSkills = [...state, action.skillName];
      chrome.storage.sync.set({skillsCollectionId: newSkills});
      //Add a temporary communication with chrome storage
      //And in next commit move it to redux-thunk
      return newSkills
    }
    default:
      return state
  }
}
