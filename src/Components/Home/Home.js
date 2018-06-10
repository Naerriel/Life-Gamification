import React, { Component } from 'react';
import { SkillContainer } from "../Skill/Skill.js";

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { skills: props.skills };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ skills: nextProps.skills });
  }

  render() {
    return(
      <div className="skillsContainer">
        {
          this.state.skills.map((skill) => {
            return <SkillContainer skillInfo={skill} />
          })
        }
      </div>
    );
  }
}

export default Home;
