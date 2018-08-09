import React, { Component } from 'react'

import timerIcon from "./assets/timer-icon.svg"
import endIcon from "./assets/stop.svg"

import { connect } from 'react-redux'
import { pauseTimer, playTimer, eraseTimer } from 'redux/actions/skills.js'
import { timeToMilliSeconds, timeFromMilliSeconds } from 'utils/time'

const shadowColor = "#707070"
const backgroundColor = "#e4e4e4"

class _PlayInterface extends Component {
  timerIsPlaying = (props) => {
    return props.skill.timer.timeStamp !== -1
  }

  startConfigurationOfProgressBarAndCountdown = (props) => {
    this.setTimerProgressBar(props.skill.timer.timeLeft)

    if(this.timerIsPlaying(props)) {
      this.startCountdown(props)
    }
  }

  componentWillMount() {
    this.startConfigurationOfProgressBarAndCountdown(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.stopCountdown()
    this.startConfigurationOfProgressBarAndCountdown(nextProps)
  }

  componentWillUnmount() {
    this.stopCountdown()
  }

  setTimerProgressBar = (timeLeft) => {
    const { settings } = this.props.skill.timer
    const progress = this.calcProgress(timeLeft, settings.time)

    this.setState({
      localTimeLeft: timeLeft,
      progress,
      expAdded: Math.floor(settings.expPerSession * progress / 100)
    })
  }

  startCountdown = (props) => {
    let updateProgressBarAndDetectFinish = () => {
      let timeLeft = this.calcTimeLeft(props)
      if(timeLeft === "00:00") {
        const { id } = props.skill

        this.stopCountdown()
        props.eraseTimer(id)
      }
      this.setTimerProgressBar(timeLeft)
    }
    updateProgressBarAndDetectFinish()
    this.timerInterval = setInterval(updateProgressBarAndDetectFinish, 1000)
  }

  stopCountdown = () => {
    clearInterval(this.timerInterval)
  }

  calcTimeLeft = (props) => {
    const { timeStamp } = props.skill.timer
    const timeNow = new Date().valueOf()
    if(timeStamp > timeNow) {
      return timeFromMilliSeconds(timeStamp - timeNow)
    } else {
      return "00:00"
    }
  }

  handlePausingTimerClick = (e) => {
    e.stopPropagation()
    if(!this.timerIsPlaying(this.props)) {
      return
    }
    this.props.pauseTimer(this.props.skill.id, this.state.localTimeLeft)
    this.stopCountdown()
  }

  handlePlayingTimerClick = (e) => {
    e.stopPropagation()
    if(this.timerIsPlaying(this.props)) {
      return
    }
    const { id, timer } = this.props.skill
    this.props.playTimer(id, timer.timeLeft)
  }

  handleEndingTimerClick = (e) => {
    e.stopPropagation()
    this.props.eraseTimer(this.props.skill.id)
    this.stopCountdown()
  }

  calcProgress(timeLeft, timeAll) {
    return 100 - (
        timeToMilliSeconds(timeLeft) / timeToMilliSeconds(timeAll) * 100)
  }

  render() {
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
              <svg className="play-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.62 16.69"><title>pause</title><g><path d="M6.93,16a.73.73,0,0,1-.73.73H.73A.73.73,0,0,1,0,16V.73A.73.73,0,0,1,.73,0H6.27A.73.73,0,0,1,7,.73H7V16Zm9.69,0a.73.73,0,0,1-.73.73H10.35A.73.73,0,0,1,9.62,16V.73A.73.73,0,0,1,10.35,0h5.54a.73.73,0,0,1,.73.73Z"
                fill={this.timerIsPlaying(this.props) ? shadowColor : backgroundColor}
              /></g></svg>
            </button>
            <button onClick={this.handlePlayingTimerClick}>
              <svg className="play-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.25 16.81"><title>play</title><path id="Path_20" data-name="Path 20" d="M.59,16.71c-.29.22-.59.07-.59-.36V.43A.39.39,0,0,1,.33,0,.4.4,0,0,1,.59.06L15,8.1c.37.21.37.51,0,.65Z"
                fill={this.timerIsPlaying(this.props) ? backgroundColor : shadowColor}
              /></svg>
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
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { pauseTimer, playTimer, eraseTimer }

export const PlayInterface = connect(
  mapStateToProps, mapDispatchToProps)(_PlayInterface)
