import React, { Component } from 'react';
import './Skill.css';

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillInfo: props.skillInfo,
      progress: props.skillInfo.exp / props.skillInfo.expTillNextLevel * 100,
      addExp: 1
    };
    //Ustaw, że minimalny progress to jest jakieś 5%, żeby napis "0%" się zmieścił :P
  }

  handleExpChange = (e) => {
    this.setState({ addExp: e.target.vale });
  }

  render() {
    console.log("SkillInfo = ");
    console.log(this.state.skillInfo);
    return(
      <div className="skill">
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
            ></input>
            <button className="addBtn">+</button>
          </div>
        </div>
        <span className="experience">{this.state.skillInfo.exp}/
          {this.state.skillInfo.expTillNextLevel}</span>
      </div>
    );
  }
}

export default Skill;
