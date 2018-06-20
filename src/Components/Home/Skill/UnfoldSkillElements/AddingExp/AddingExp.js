import React, { Component } from 'react'
import './AddingExp.css'
import { connect } from 'react-redux'

class AddingExp extends Component {

  handleContinueBtn = () => {

  }

  render() {
    const { skillName, expPerSession } = this.props
    return (
      <div className="addExp">
        <div className="finishedTask-main-message">
          You add {expPerSession} exp to:
          <div className="skill-name">
            {skillName}
          </div>
        </div>
        <div className="finishedTask-secondary-message">
          Write what have you been working on:
        </div>
        <input
          type="text"
          className="finishedTask-log"
          placeholder="E.g. Finished 3rd chapter">
        <button
          className="finishedTask-btn"
          onClick={this.handleContinueBtn}
        >
          Continue
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {}

export const AddingExpContainer = connect(
    mapStateToProps, mapDispatchToProps)(AddingExp)
