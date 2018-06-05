import React, { Component } from 'react';
import { SkillContainer } from "../Skill/Skill.js";
import { AddNewSkillContainer } from "./AddNewSkill.js";

class Edit extends Component {
  constructor(props){
    super(props);

    this.state = { skills: props.skills };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ skills: nextProps.skills });
  }

  render() {
    return (
      <div>
        {
          this.state.skills.map((skill) => {
            return <SkillContainer skillInfo={skill} />
          })
        }
        <AddNewSkillContainer />
      </div>
    );
  }
}

export default Edit;
