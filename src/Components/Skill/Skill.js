import React, { Component } from 'react';
import "./Skill.css"
import UnfoldSkillElements from "./UnfoldSkillElements";
import EditSkillIcons from "./EditSkillIcons";
import { connect } from "react-redux";

class Skill extends Component {
  constructor(props) {
    super(props);

    console.log(props); // Delete after succesfuly implementing skill
    this.state = {
      skill: props.skill,
      progress: Math.floor(props.skill.exp / props.skill.expTillNextLevel * 100),
      unfold: false,
      edit: false
    };
  }

  collapseSkill = () => {
    this.setState({ unfold: !this.state.unfold });
  }

  render() {
    let skillHeight;
    if(this.state.unfold){
      skillHeight = "160px";
    } else {
      skillHeight = "80px";
    }
    return(
      <div
        className="skill"
        style={{ height: `${skillHeight}`}}
        onClick={this.collapseSkill}
      >
        <EditSkillIcons
          shouldRender={this.state.unfold}
        />
        <div className="skill-level-info">
          <span className="skill-level">
            {this.state.skill.level}
          </span>
          <span className="skill-level-label">
            Lvl
          </span>
        </div>
        <span className="skill-name">
          {this.state.skill.name}
        </span>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{width: `${this.state.progress}%`}}>
          </div>
        </div>

        {this.state.unfold ? (
          <span className="experience">
            {this.state.skill.exp} / {this.state.skill.expTillNextLevel}
          </span>
        ) : (null)}

        <UnfoldSkillElements
          shouldRender={this.state.unfold}
          exp={this.state.skill.exp}
          expTillNextLevel={this.state.skill.expTillNextLevel}
          timer={this.state.skill.timer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { };

export const SkillContainer = connect(mapStateToProps, mapDispatchToProps)(Skill);
