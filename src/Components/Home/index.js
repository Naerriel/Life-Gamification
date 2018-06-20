import React, { Component } from 'react'
import { Skill } from "./Skill/index.js"
import DragNDropSkill from "./DragNDropSkill/index.js"
import { SkillDeletionUndoing } from "./SkillDeletionUndoing/index.js"

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

    return(
      <div>
        { thereAreSkills ? (
          <div className="content">
            {
              skills.map((skill, index) => {
                return (
                    <DragNDropSkill
                      key={skill.name} // TODO make sure names are unique
                      skill={skill}
                      index={index}
                      moveSkill={this.moveSkill}
                    />
                  )
              })
            }
            <SkillDeletionUndoing />
          </div>
        ) : (
          <div className="welcomeMessage">
            <p>
              <div>
                Welcome to Life Gamification!
              </div>
              <div>
                To add your first skill go to Edit skills.
              </div>
            </p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { swapSkills }

export const Home = connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(_Home))
