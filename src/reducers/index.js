import { combineReducers } from "redux";
import { skills } from "./skills";
import { timers } from "./timers";
import { settings } from "./settings";
import { skillDeletionUndoing } from "./skillDeletionUndoing";

export default combineReducers({
  skills,
  timers,
  settings,
  skillDeletionUndoing
});
