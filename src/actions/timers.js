import { getRepoTimers } from "../repository/timers.js";
import { setRepoTimers } from "../repository/timers.js";
import { getRepoPomodoroOptions } from "../repository/timers.js";
import { setRepoPomodoroOptions } from "../repository/timers.js";
import { defaultPomodoroOptions } from "../selectors/other.js";

export const setTimers = (timers) => ({
  type: 'SET_TIMERS',
  timers
});

export const getTimers = () => (dispatch) => {
  getRepoTimers()
    .then((timers) => {
      dispatch(setTimers(timers));
    })
    .catch((e) => {
      dispatch(setTimers([]));
    });
}

export const addTimer = () => (dispatch, getState) => {
  setRepoTimers(["timerNumeroUno!"]);
  console.log("Current timers are: ");
  console.log(getState().timers);
}

export const setPomodoroOptions = (pomodoroOptions) => ({
  type: 'SET_POMODORO_OPTIONS',
  pomodoroOptions
});

export const savePomodoroOptions = (pomodoroOptions) => (dispatch) => {
  setRepoPomodoroOptions(pomodoroOptions);
  dispatch(setPomodoroOptions(pomodoroOptions));
}

export const getPomodoroOptions = () => (dispatch) => {
  getRepoPomodoroOptions()
    .then((pomodoroOptions) => {
      dispatch(setPomodoroOptions(pomodoroOptions));
    })
    .catch((e) => {
      dispatch(setPomodoroOptions(defaultPomodoroOptions));
    });
}
