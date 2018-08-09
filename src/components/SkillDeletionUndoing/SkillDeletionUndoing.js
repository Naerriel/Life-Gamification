import React, { Component } from 'react'

import "./_SkillDeletionUndoing.css"

import { connect } from "react-redux"
import { eraseSkillDeletionUndoing, undoSkillDeletion }
  from "redux/actions/undo.js"

class _SkillDeletionUndoing extends Component {

  componentWillReceiveProps(nextProps) {
    var timer
    clearTimeout(timer)

    timer = setTimeout(() => {
      this.props.eraseSkillDeletionUndoing()
    }, 10000)
  }

  thereIsDeletedSkill = () => {
    return "name" in this.props.skill
  }

  handleUndoClick = () => {
    this.props.undoSkillDeletion(this.props.skill)
  }

  render() {
    if(this.thereIsDeletedSkill()){
      return (
        <div className="skill-deletion-undoing">
          <div className="skill-deletion-message">
            Deleted skill:
            <span className="skill-deletion-skill-name">
              { this.props.skill.name }
            </span>
          </div>
          <button className="skill-deletion-undo-btn"
            onClick={this.handleUndoClick}>
            Undo
          </button>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    skill: state.skillDeletionUndoing
  }
}

const mapDispatchToProps = { eraseSkillDeletionUndoing, undoSkillDeletion }

export const SkillDeletionUndoing = connect(
  mapStateToProps, mapDispatchToProps)(_SkillDeletionUndoing)
