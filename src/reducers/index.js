import { combineReducers } from "redux";
import { skills } from "./skills";
import { timers } from "./timers";
import { settings } from "./settings";
import { skillDeletionUndoing } from "./skillDeletionUndoing";
import { history } from "./history";
import { skillsHistoryFilter } from "./skillsHistoryFilter";

export default combineReducers({
  skills,
  timers,
  settings,
  skillDeletionUndoing,
  history,
  skillsHistoryFilter
});
