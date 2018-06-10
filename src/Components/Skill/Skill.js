import React, { Component } from 'react';
import './Skill.css';
import { addExp, removeSkill } from "../../actions";
import { connect } from "react-redux";

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillInfo: props.skillInfo,
      edit: props.edit,
      progress: Math.floor(props.skillInfo.exp / props.skillInfo.expTillNextLevel * 100),
      addExp: 1
    };
    //Ustaw, że minimalny progress to jest jakieś 5%, żeby napis "0%" się zmieścił :P
  }

  handleExpChange = (e) => {
    this.setState({ addExp: e.target.value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.addExp();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      skillInfo: nextProps.skillInfo,
      edit: nextProps.edit,
      progress: Math.floor(nextProps.skillInfo.exp / nextProps.skillInfo.expTillNextLevel * 100)
    });
  }

  addExp = () => {
    this.props.addExp(this.state.addExp, this.state.skillInfo.name);
  }

  startRemovingSkill = () => {
    this.props.removeSkill(this.state.skillInfo.name);
  }

  editElements = () => {
    if(this.state.edit) {
      return <button className="removeSkillBtn" onClick={this.startRemovingSkill}></button>
    }
  }

  render() {
    return(
      <div className="skill">
        {this.editElements()}
        <span className="level">{this.state.skillInfo.level}</span>
        <span className="levelLabel">lvl</span>
        <span className="skillName">{this.state.skillInfo.name}</span>
        <div className="progressBarWrapper">
          <span className="progressBarContainer">
            <span className="progressBarFill">{this.state.progress}%</span>
          </span>
          <div className="progressBarBtns">
            <input
              className="addExpInput"
              type="number"
              value={this.state.addExp}
              onChange={this.handleExpChange}
              onKeyPress={this.handleKeyPress}
            ></input>
            <button className="addBtn" onClick={this.addExp}>+</button>
          </div>
        </div>
        <span className="experience">{this.state.skillInfo.exp}/
          {this.state.skillInfo.expTillNextLevel}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { addExp, removeSkill };

export const SkillContainer = connect(mapStateToProps, mapDispatchToProps)(Skill);
