import React, { Component } from 'react'

import { connect} from 'react-redux'

class _AddExp extends Component {

  shouldRender = () => {
    return 'expToAdd' in this.props.workComplete
  }

  render() {
    if(this.shouldRender()){
      return (
        <div> AddExp, yay!</div>
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
