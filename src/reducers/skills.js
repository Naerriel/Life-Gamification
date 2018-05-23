export const skills = (state = [], action) => {
  console.log("Hello, I have an action!");
  console.log(action);
  switch (action.type) {
    case 'SKILLS_GOT_SUCCESS':
      return [
        ...action.skills
      ]
    default:
      return state
  }
}
