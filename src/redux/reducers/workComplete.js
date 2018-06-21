export const workComplete = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADDING_EXP':
      return action.data
    case 'CLEAR_WORK_COMPLETE':
      return {}
    default:
      return state
  }
}
