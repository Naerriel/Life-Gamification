import { combineReducers } from "redux";
import { skills } from "./skills";
import { timers } from "./timers";
import { pomodoroOptions } from "./pomodoroOptions";

export default combineReducers({
  skills,
  timers,
  pomodoroOptions
});
