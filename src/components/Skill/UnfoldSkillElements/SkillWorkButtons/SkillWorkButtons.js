import React, { Component } from 'react'

import startTimerIcon from "./assets/start-timer.svg"
import addExpIcon from "./assets/add-exp.svg"

import { connect } from 'react-redux'
import { setAddingExp } from 'redux/actions/workComplete.js'
import { startTimer } from 'redux/actions/skills.js'

class _SkillWorkButtons extends Component {

  handleStartTimerClick = (e) => {
    e.stopPropagation()
    this.props.startTimer(this.props.skill.id, this.props.settings)
  }

  handleAddExpClick = (e) => {
    e.stopPropagation()
    const { skill, settings } = this.props
    this.props.setAddingExp(skill.id, skill.name, settings.expAtATime)
  }

  render() {
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
    )
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = { startTimer, setAddingExp }

export const SkillWorkButtons = connect(
  mapStateToProps, mapDispatchToProps)(_SkillWorkButtons)
