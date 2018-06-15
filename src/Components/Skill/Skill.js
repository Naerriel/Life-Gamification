import React, { Component } from 'react';
import "./Skill.css"
import UnfoldSkillElements from "./UnfoldSkillElements";
import EditSkillIcons from "./EditSkillIcons";
import { connect } from "react-redux";
import { deleteSkill } from "../../actions/skills.js";

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skill: props.skill,
      temporaryName: props.skill.name,
      progress: Math.floor(props.skill.exp / props.skill.expTillNextLevel * 100),
      unfold: false,
      editSkillName: false
    };
  }

  componentWillMount = () => {
    if(this.state.skill.name === ""){
      this.setState({ editSkillName: true });
    }
  }

  componentDidMount = () => {
    this.tryGivingFocusToSkillName();
  }

  componentDidUpdate = () => {
    this.tryGivingFocusToSkillName();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      skill: nextProps.skill,
      temporaryName: nextProps.skill.name,
      progress: Math.floor(nextProps.skill.exp / nextProps.skill.expTillNextLevel * 100),
      unfold: false
    });
  }

  tryGivingFocusToSkillName = () => {
    if(this.state.editSkillName){
      this.nameInput.focus();
    }
  }

  deleteSkill = () => {
    this.props.deleteSkill(this.state.skill);
  }

  startEditingSkillName = () => {
    this.setState({ editSkillName: true });
  }

  foldAndUnfoldSkill = () => {
    this.setState({ unfold: !this.state.unfold });
  }

  saveNewName = () => {
    this.setState({ editSkillName: false });
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
    if(!this.state.editSkillName){
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
          startEditingSkillName={this.startEditingSkillName}
          deleteSkill={this.deleteSkill}
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

const mapDispatchToProps = { deleteSkill};

export const SkillContainer = connect(mapStateToProps, mapDispatchToProps)(Skill);
