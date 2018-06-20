import React, { Component } from 'react'
import DragNDropSkill from "./DragNDropSkill/index.js"
import { SkillDeletionUndoing } from "./SkillDeletionUndoing/index.js"

import "./index.css"

import { connect } from "react-redux"
import { swapSkills } from 'redux/actions/skills.js'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class _Home extends Component {
  moveSkill = (dragIndex, hoverIndex) => {
    this.props.swapSkills(dragIndex, hoverIndex, this.props.skills)
  }

  render() {
    const { skills } = this.props
    const thereAreSkills = skills.length > 0

    if(thereAreSkills) {
      return (
        <div className="content">
          {skills.map((skill, index) => {
            return (
                <DragNDropSkill
                  key={skill.name} // TODO make sure names are unique
                  skill={skill}
                  index={index}
                  moveSkill={this.moveSkill}
                />
              )
          })}
          <SkillDeletionUndoing />
        </div>
      )
    } else {
      return (
        <div className="content">
          <div className="welcomeMessage">
            <p>Welcome to Life Gamification!</p>
            <p>Add your first skill by pressing "Add Skill" in the Header</p>
          </div>
          <SkillDeletionUndoing />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { swapSkills }

export const Home = connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(_Home))
