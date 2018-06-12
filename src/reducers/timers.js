export const timers = (state = [], action) => {
  switch (action.type) {
    case 'SET_TIMERS':
      return action.timers;
    default:
      return state
  }
}
