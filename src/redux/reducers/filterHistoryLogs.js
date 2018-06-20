export const filterHistoryLogs = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HISTORY_LOG_FILTER':
      return {
        skill: action.skill,
        begin: action.begin,
        end: action.end
      }
    default:
      return state
  }
}
