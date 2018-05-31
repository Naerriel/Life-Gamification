import React, { Component } from 'react';
import './Skill.css';
import { addExp } from "../../actions";

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
    this.setState({ addExp: e.target.value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.addExp();
    }
  }

  addExp = () => {
    console.log("Elo, dodaje expa: " + this.state.addExp);
    this.props.addExp(this.state.addExp, this.state.skillInfo.name);
  }

  render() {
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

const mapDispatchToProps = { addExp };



//POLACZ TO KONEKTEM
//SKMIN SKAD BRAC SKILLE, czy z tamtego artykulu na stack overflow, ktory mowil,
//w jaki sposob dobierac sie do store'a, czy moze przekazujac wszystkie skille do pojedynczego skilla
export default Skill;
