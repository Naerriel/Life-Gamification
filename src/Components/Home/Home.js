import React, { Component } from 'react';
import { SkillContainer } from "./Skill/Skill.js";
import DragNDropSkill from "./Skill/DragNDropSkill.js";
import { SkillDeletionUndoingContainer } from "./SkillDeletionUndoing/index.js";

import { connect } from "react-redux"
import { swapSkills } from 'redux/actions/skills.js'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Home extends Component {
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
            <SkillDeletionUndoingContainer />
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
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { swapSkills }

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Home))
