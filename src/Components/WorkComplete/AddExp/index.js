import React, { Component } from 'react'
import './index.css'

import { connect} from 'react-redux'
import { clearWorkComplete } from 'redux/actions/workComplete.js'
import { addExp } from 'redux/actions/skills.js'
import { addLog } from 'redux/actions/history.js'

const maxLogLength = 60

class _AddExp extends Component {
  constructor(props) {
    super()

    this.state = ({ input: '' })
  }

  componentWillReceiveProps() {
    this.setState({ input: '' })
  }

  shouldRender = () => {
    return 'expToAdd' in this.props.workComplete
  }

  handleInputChange = (e) => {
    if(e.target.value.length <= maxLogLength) {
      this.setState({ input: e.target.value })
    }
  }

  handleContinueBtn = () => {
    const { id, name, expToAdd } = this.props.workComplete
    const logMessage = this.state.input
    const timeStarted = new Date().valueOf()

    this.props.addLog({
      skillName: name,
      expAdded: expToAdd,
      taskDescription: logMessage,
      stars: -1,
      timeStarted })
    this.props.addExp(id, expToAdd)
    this.props.clearWorkComplete()
  }

  handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.handleContinueBtn()
    }
  }

  render() {
    const { name, expToAdd } = this.props.workComplete

    if(this.shouldRender()){
      return (
        <div className="wholePage">
          <div className="screenDim">
          </div>
          <div className="addExp">
            <div className="finishedTask-main-message">
              You add {expToAdd} exp to:
              <div className="skill-name">
                {name}
              </div>
            </div>
            <div className="finishedTask-secondary-message">
              Write what have you been working on:
            </div>
            <input
              type="text"
              className="finishedTask-log"
              placeholder="E.g. Finished 3rd chapter"
              value={this.state.input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
            />
            <button
              className="finishedTask-btn"
              onClick={this.handleContinueBtn}
            >
              Continue
            </button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    workComplete: state.workComplete
  }
}

const mapDispatchToProps = { clearWorkComplete, addExp, addLog }

export const AddExp = connect(mapStateToProps, mapDispatchToProps)(_AddExp)
