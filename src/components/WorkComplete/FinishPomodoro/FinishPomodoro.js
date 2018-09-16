import React, { Component } from 'react'

import { connect} from 'react-redux'

class _FinishPomodoro extends Component {

  shouldRender = () => {
    if('data' in this.props) {
      return false // TODO set something sensible upon creating this Component
    }
    return false
  }

  render() {
    if(this.shouldRender()){
      return (
        <div> FinishPomodoro, yay!</div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    workComplete: state.workComplete.data
  }
}

const mapDispatchToProps = {}

export const FinishPomodoro = connect(
  mapStateToProps, mapDispatchToProps)(_FinishPomodoro)
