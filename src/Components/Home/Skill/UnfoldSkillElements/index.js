import React, { Component } from 'react'
import "./index.css"
import startTimerIcon from "./assets/start-timer.svg"
import addExpIcon from "./assets/add-exp.svg"
import timerIcon from "./assets/timer-icon.svg"
import playIcon from "./assets/play.svg"
import pauseIcon from "./assets/pause.svg"
import endIcon from "./assets/stop.svg"

import { connect } from "react-redux"

class _UnfoldSkillElements extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldRenderAddingExp: false
    }
  }

  handleStartTimerClick = (e) => {
    e.stopPropagation();

  }

  handleAddExpClick = (e) => {
    e.stopPropagation();

  }

  handlePausingTimerClick = (e) => {
    e.stopPropagation();

  }

  handlePlayingTimerClick = (e) => {
    e.stopPropagation();

  }

  handleEndingTimerClick = (e) => {
    e.stopPropagation();

  }

  renderAddingExperienceButtons = () => {
    const { time, expAtATime } = this.props.settings

    return (
      <div className="add-experience">
        <div className="add-experience-btn">
          <button onClick={this.handleStartTimerClick}>
            <img
              className="add-experience-icon"
              src={startTimerIcon}
              alt="start timer"/>
          </button>
          <span className="add-experience-info">
            {time}
          </span>
        </div>
        <div className="add-experience-btn">
          <button onClick={this.handleAddExpClick}>
            <img
              className="add-experience-icon"
              src={addExpIcon}
              alt="add experience" />
          </button>
          <span className="add-experience-info">
            {expAtATime}
          </span>
        </div>
      </div>
    );
  }

  renderPlayInterface = () => {
    return (
      <div className="add-experience">
        <div className="add-experience-btn">
          <button>
            <img className="add-experience-icon" src={timerIcon} alt="timer" />
          </button>
        </div>
        <div className="play">
          <div className="play-buttons">
            <button onClick={this.handlePausingTimerClick}>
              <img className="play-button" src={pauseIcon} alt="pause" />
            </button>
            <button onClick={this.handlePlayingTimerClick}>
              <img className="play-button" src={playIcon} alt="play" />
            </button>
            <button onClick={this.handleEndingTimerClick}>
              <img className="play-button" src={endIcon} alt="end" />
            </button>
            <span className="play-time-left">
              24:59
            </span>
            <span className="play-exp-added">
              +1 exp
            </span>
          </div>
          <div className="play-progress">
            <div className="play-progress-fill">
            </div>
          </div>
        </div>
      </div>
    );
  }

  hasTimerStartedPlaying = () => {
    return 'timeLeft' in this.props.skill.timer
  }

  render() {
    if(this.props.shouldRender){
      if(this.hasTimerStartedPlaying()){
        return this.renderPlayInterface()
      } else {
        return this.renderAddingExperienceButtons()
      }
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = {}

export const UnfoldSkillElements = connect(
  mapStateToProps, mapDispatchToProps)(_UnfoldSkillElements)
