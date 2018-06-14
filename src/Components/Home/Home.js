import React, { Component } from 'react';
import { SkillContainer } from "../Skill/Skill.js";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { skills: props.skills };
    this.state.skills = [{
      name: "Jazda na rolkach",
      level: 73,
      exp: 213,
      expTillNextLevel: 270,
      timer: {}
    }, {
      name: "Robienie na drutach",
      level: 66,
      exp: 24,
      expTillNextLevel: 10000,
      timer: {
        time: 25,
        timeLeft: 23,
        exp: 30
      }
    }] // Code for creating Skill Component
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
