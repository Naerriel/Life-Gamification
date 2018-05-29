/* global chrome */
const skillsCollectionId = "skillsCollectionId";

export const succesfullyGotSkills = (skills) => ({
  type: 'SKILLS_GOT_SUCCESS',
  skills
});

export const addSkill = (skillName) => ({
  type: 'ADD_SKILL',
  skillName
});

export const getSkills = () => (dispatch) => {
  chrome.storage.sync.get([skillsCollectionId], (result) => {
    if(skillsCollectionId in result){
      dispatch(succesfullyGotSkills(result[skillsCollectionId]));
    }
  });
}
