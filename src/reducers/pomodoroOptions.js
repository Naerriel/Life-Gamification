export const pomodoroOptions = (state = {}, action) => {
  switch (action.type) {
    case 'SET_POMODORO_OPTIONS':
      return action.pomodoroOptions;
    default:
      return state
  }
}
