export const skills = (state = [], action) => {
  switch (action.type) {
    case 'SET_SKILLS':
      return action.skills
    default:
      return state
  }
}
