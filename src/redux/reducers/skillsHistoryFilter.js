export const skillsHistoryFilter = (state = "", action) => {
  switch (action.type) {
    case 'SET_SKILLS_HISTORY_FILTER':
      return action.filter;
    default:
      return state
  }
}
