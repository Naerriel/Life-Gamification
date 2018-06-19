import React, { Component } from "react";
import timerHistoryIcon from "./assets/timer-history.svg";
import addExpIcon from "./assets/add-exp-history.svg";
import "./HistoryLog.css";
import moment from 'moment';

class HistoryLog extends Component {

  getDateFormated(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today] HH:mm',
      nextDay: '[Tomorrow] HH:mm',
      nextWeek: 'dddd MMM DD HH:mm',
      lastDay: '[Yesterday] HH:mm',
      lastWeek: '[Last] dddd HH:mm',
      sameElse: 'DD-MM-YYYY HH:mm'
    });
  }

  displayTime = () => {
    if("timeEnded" in this.props.log) {
      return(`${this.getDateFormated(this.props.log.timeStarted)}
          - ${moment(this.props.log.timeEnded).format("HH:mm")}`);
    }
    else {
      return (`${this.getDateFormated(this.props.log.timeStarted)}`);
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
