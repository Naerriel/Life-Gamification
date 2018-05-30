import React, { Component } from 'react';
import Skill from "../Skill/Skill.js";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { skills: props.skills };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ skills: nextProps.skills });
  }

  render() {
    let skills = [];
    for (let i in this.state.skills) {
      skills.push(<Skill skillInfo={this.state.skills[i]} />);
    }
    return(
      <div>
        {skills}
      </div>
    );
  }
}

export default Home;
