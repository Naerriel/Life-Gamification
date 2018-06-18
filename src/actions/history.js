import { setRepoHistory, getRepoHistory } from "../repository/index.js";
import { emptyHistory } from "../libs/history.js";

const setHistory = history => ({
  type: 'SET_HISTORY',
  history
});

export const saveHistory = (history) => (dispatch) => {
  setRepoHistory(history);
  dispatch(setHistory(history));
}

export const getHistory = () => (dispatch) => {
  // TODO delete this in production version
  dispatch(saveHistory({
    skills: ["Myślenie", "Jedzenie", "Granie",
    "Planowanie", "Pożądanie", "Programowanie"],
    logs: [{
        timeStarted: "23:14",
        timeEnded: "27:25",
        expAdded: 30,
        skillName: "Jazda na rolkach",
        stars: 4,
        taskDescription: "Jeźdźiłem na rolkach pod litewskim",
      }, {
        timeStarted: "00:00",
        timeEnded: "01:25",
        expAdded: 100,
        skillName: "Kopanie dziury",
        stars: 2,
        taskDescription: "Kopałem grób.",
      },{
        timeStarted: "69:22",
        expAdded: 21,
        skillName: "Pieczenie ciastek",
        stars: -1,
        taskDescription: "Taaaaaaaakie ciacho upiekłem!"
      }]
  }));

  getRepoHistory()
    .then((history) => {
      dispatch(setHistory(history));
    })
    .catch(() => {
      dispatch(setHistory(emptyHistory));
    });
}

export const addLog = (log) => (dispatch, getState) => {
  // TODO Write remaining of the function.
  // Let the skill.name of the add to history's skills if there isn't this skill.
}
