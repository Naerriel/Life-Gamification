import React, { Component } from 'react'
import "./index.css"
import startTimerIcon from "./assets/start-timer.svg"
import addExpIcon from "./assets/add-exp.svg"
import timerIcon from "./assets/timer-icon.svg"
import playIcon from "./assets/play.svg"
import pauseIcon from "./assets/pause.svg"
import endIcon from "./assets/stop.svg"

import { connect } from "react-redux"
import { setAddingExp, setFinishPomodoro } from "redux/actions/workComplete.js"
import {
  startTimer,
  pauseTimer,
  playTimer,
  eraseTimer
} from "redux/actions/skills.js"
import { timeToMilliSeconds, timeFromMilliSeconds } from "libs/time.js"

class _UnfoldSkillElements extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldRenderAddingExp: false
    }
  }

  handleStartTimerClick = (e) => {
    e.stopPropagation()
    this.props.startTimer(this.state.skill.id, this.props.settings)
  }

  handleAddExpClick = (e) => {
    e.stopPropagation()
    const { skill, settings } = this.props
    this.props.setAddingExp(skill.id, skill.name, settings.expAtATime)
  }

  handlePausingTimerClick = (e) => {
    e.stopPropagation()
    this.props.pauseTimer(this.props.skill.id, this.state.localTimeLeft)
  }

  handlePlayingTimerClick = (e) => {
    e.stopPropagation()
    const { id, timer } = this.props.skill
    this.props.playTimer(id, timer.timeLeft)
  }

  handleEndingTimerClick = (e) => {
    e.stopPropagation()
    this.props.eraseTimer(this.props.skill.id)
    this.stopCountdown()
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

  calcProgress(timeLeft, timeAll) {
    return 100 - Math.floor(
        timeToMilliSeconds(timeLeft) / timeToMilliSeconds(timeAll) * 100)
  }

  timerIsPlaying = () => {
    return this.props.skill.timer.timeStamp !== -1
  }

  calcTimeLeft = () => {
    const { timeStamp } = this.props.skill.timer
    const timeNow = new Date().valueOf()
    if(timeStamp > timeNow) {
      return timeFromMilliSeconds(timeStamp - timeNow)
    } else {
      return "00:00"
    }
  }

  startCountdown = () => {
    this.timerInterval = setInterval(() => {

      let timeLeft = this.calcTimeLeft()
      if(timeLeft === "00:00") {
        const { id, timer } = this.props.skill

        this.props.setFinishPomodoro(id, timer)
      }
      this.setTimerProgressBar(timeLeft)
    }, 1000)
  }

  stopCountdown = () => {
    clearInterval(this.timerInterval)
  }

  componentWillUnmount() {
    this.stopCountdown()
  }

  setTimerProgressBar = (timeLeft) => {
    console.log("timeLeft " + timeLeft)
    const { settings } = this.props.skill.timer
    const progress = this.calcProgress(timeLeft, settings.time)

    this.setState({
      localTimeLeft: timeLeft,
      progress,
      expAdded: Math.floor(settings.expPerSession * progress / 100)
    })
  }

  componentWillMount() {
    this.props.skill.timer = {
      timeLeft: "19:23",
      timeStamp: 123512541230000,
      sessionsCompleted: 1,
      settings: {
        time: "25:00",
        expPerSession: 30,
        breakLen: "5:00",
        bigBreakLen: "30:00",
        pomodoros: 8,
        bigBreaks: 1,
      }
    } // TODO erase upon finishing component

    this.setTimerProgressBar(this.props.skill.timer.timeLeft)

    if(this.timerIsPlaying()) {
      this.startCountdown()
    }
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
              {this.state.localTimeLeft}
            </span>
            <span className="play-exp-added">
              +{this.state.expAdded} exp
            </span>
          </div>
          <div className="play-progress">
            <div
              className="play-progress-fill"
              style={{width: `${this.state.progress}%`}}
            >
            </div>
          </div>
        </div>
      </div>
    );
  }

  isTimerCreated = () => {
    return 'timeLeft' in this.props.skill.timer
  }

  render() {
    if(this.props.shouldRender){
      if(this.isTimerCreated()){
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

const mapDispatchToProps = {
  setAddingExp,
  setFinishPomodoro,
  pauseTimer,
  playTimer,
  startTimer,
  eraseTimer
}

export const UnfoldSkillElements = connect(
  mapStateToProps, mapDispatchToProps)(_UnfoldSkillElements)
