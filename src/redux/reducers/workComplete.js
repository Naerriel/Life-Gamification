export const workComplete = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORK_COMPLETE':
      return action.data
    case 'CLEAR_WORK_COMPLETE':
      return {}
    default:
      return state
  }
}
