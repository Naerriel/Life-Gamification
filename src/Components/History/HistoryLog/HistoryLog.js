import React, { Component } from "react";
import timerHistoryIcon from "./assets/timer-history.svg";
import addExpIcon from "./assets/add-exp-history.svg";
import "./HistoryLog.css";

class HistoryLog extends Component {

  displayTime = () => {
    //TODO use moment.js or something like that to make beautiful displays

    if("timeEnded" in this.props.log) {
      return (`${this.props.log.timeStarted} - ${this.props.log.timeEnded}`);
    }
    else {
      return (`${this.props.log.timeStarted}`);
    }
  }

  renderStarsIfPresent = () => {
    if(this.props.log.stars !== -1) {
      return (
        <span className="history-stars">
          {this.props.log.stars}
          <i className="fa fa-star"></i>
        </span>
      );
    } else {
      return null;
    }
  }

  renderIcon = () => {
    if(this.props.log.stars !== -1){
      return <img className="history-icon" src={timerHistoryIcon} alt="timer" />
    } else {
      return <img className="history-icon" src={addExpIcon} alt="adding exp" />
    }
  }

  render() {
    return (
      <div className="history">
        <div className="history-specific-info">
          <span className="history-date">
            {this.displayTime()}
          </span>
          <span className="history-exp">
            +{this.props.log.expAdded} exp
          </span>
          {this.renderStarsIfPresent()}
        </div>
        <div className="history-main-information">
          <span className="history-skill-name">
            {this.props.log.skillName}
          </span>
          <span className="history-task-description">
            {this.props.log.taskDescription}
          </span>
          {this.renderIcon()}
        </div>
      </div>
    );
  }
}

export default HistoryLog;
