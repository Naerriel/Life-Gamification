export const settings = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return action.settings
    default:
      return state
  }
}
