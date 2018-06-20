import { setRepoHistory, getRepoHistory } from "repository/index.js";
import { emptyHistory } from "libs/history.js";

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
        timeStarted: "2018-06-19 08:00:00",
        timeEnded: "2018-06-19 08:25:00",
        expAdded: 30,
        skillName: "Jazda na rolkach",
        stars: 4,
        taskDescription: "Jeźdźiłem na rolkach pod litewskim",
      }, {
        timeStarted: "2018-06-18 10:00:00",
        timeEnded: "2018-06-18 12:00:00",
        expAdded: 100,
        skillName: "Kopanie dziury",
        stars: 2,
        taskDescription: "Kopałem grób.",
      },{
        timeStarted: "2018-06-17 14:00:00",
        expAdded: 21,
        skillName: "Pieczenie ciastek",
        stars: -1,
        taskDescription: "Taaaaaaaakie ciacho upiekłem!"
      },{
        timeStarted: "2018-06-15 14:00:00",
        expAdded: 21,
        skillName: "Pieczenie ciastek",
        stars: -1,
        taskDescription: "Taaaaaaaakie ciacho upiekłem!"
      },{
        timeStarted: "2018-06-13 14:00:00",
        expAdded: 21,
        skillName: "Pieczenie ciastek",
        stars: -1,
        taskDescription: "Taaaaaaaakie ciacho upiekłem!"
      },{
        timeStarted: "2018-06-10 14:00:00",
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
