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
      temporaryName: props.skill.name,
      progress: Math.floor(props.skill.exp / props.skill.expTillNextLevel * 100),
      unfold: false,
      edit: false
    };
  }

  componentWillMount = () => {
    if(this.state.skill.name === ""){
      this.setState({ edit: true });
    }
  }

  componentDidMount = () => {
    if(this.state.edit){
      this.nameInput.focus();
    }
  }

  foldAndUnfoldSkill = () => {
    this.setState({ unfold: !this.state.unfold });
  }

  saveNewName = () => {
    this.setState({ edit: false });
    this.state.skill.name = this.state.temporaryName; //TODO change upon adding actions
  }

  handleNameChange = (e) => {
    this.setState({ temporaryName: e.target.value });
  }

  handleInputClick = (e) => {
    e.stopPropagation();
  }

  handleKeyDownOnName = (e) => {
    if(e.keyCode === 13){
      this.saveNewName();
    }
  }

  renderSkillName = () => {
    console.log(this.state.edit);
    if(!this.state.edit){
      return `${this.state.skill.name}`;
    } else {
      return (
          <input type="text"
            className="skill-name skill-name-input"
            ref={(input) => { this.nameInput = input ;}}
            onChange={this.handleNameChange}
            onClick={this.handleInputClick}
            value={this.state.temporaryName}
            onBlur={this.saveNewName}
            onKeyDown={this.handleKeyDownOnName}
            />
      );
    }
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
        onClick={this.foldAndUnfoldSkill}
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
          {this.renderSkillName()}
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
