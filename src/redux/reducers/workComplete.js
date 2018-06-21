export const workComplete = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADDING_EXP':
      return action.data
    default:
      return state
  }
}
