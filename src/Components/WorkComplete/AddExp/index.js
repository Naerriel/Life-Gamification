import React, { Component } from 'react'
import './index.css'

import { connect} from 'react-redux'

class _AddExp extends Component {

  shouldRender = () => {
    return 'expToAdd' in this.props.workComplete
  }

  handleContinueBtn = () => {
    console.log("Continuing")

  }

  render() {
    const { name, expAtATime } = this.props.workComplete

    if(this.shouldRender()){
      return (
        <div className="wholePage">
          <div className="screenDim">
          </div>
          <div className="addExp">
            <div className="finishedTask-main-message">
              You add {expAtATime} exp to:
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

const mapDispatchToProps = {}

export const AddExp = connect(mapStateToProps, mapDispatchToProps)(_AddExp)
