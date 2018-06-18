import React, { Component } from 'react';
import { SkillContainer } from "./Skill/Skill.js";
import { SkillDeletionUndoingContainer } from "./SkillDeletionUndoing/index.js";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { skills: props.skills };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ skills: nextProps.skills });
  }

  render() {
    const thereAreSkills = this.state.skills.length > 0;
    return(
      <div>
        { thereAreSkills ? (
          <div className="content">
            {
              this.state.skills.map((skill) => {
                return <SkillContainer skill={skill} />
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

export default Home;
