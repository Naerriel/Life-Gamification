export const history = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return action.history
    default:
      return state
  }
}
