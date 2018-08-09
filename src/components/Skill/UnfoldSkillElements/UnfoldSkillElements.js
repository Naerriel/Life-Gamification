import React, { Component } from 'react'
import { SkillWorkButtons } from './SkillWorkButtons/SkillWorkButtons.js'
import { PlayInterface } from './PlayInterface/PlayInterface.js'

import "./_UnfoldSkillElements.css"

class UnfoldSkillElements extends Component {

  isTimerCreated = () => {
    return 'timeLeft' in this.props.skill.timer
  }

  render() {
    const { skill } = this.props

    if(this.props.shouldRender){
      if(this.isTimerCreated()){
        return <PlayInterface skill={skill} />
      } else {
        return <SkillWorkButtons skill={skill} />
      }
    } else {
      return null
    }
  }
}

export default UnfoldSkillElements
