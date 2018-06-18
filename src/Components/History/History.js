import React, { Component } from 'react';
import Filter from "./Filter/Filter.js";
import HistoryLog from "./HistoryLog/HistoryLog.js";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = { history: {
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
        }]
      }
    }
    // This was code to test rendering of History Log. It is to erase upon
    // adding working history in repository, actions in reducers
  }

  render() {
    return (
      <div className="content">
        <Filter />
        {
          this.state.history.logs.map((log) => {
            return <HistoryLog log={log} />
          })
        }
      </div>
    );
  }
}

export default History;
