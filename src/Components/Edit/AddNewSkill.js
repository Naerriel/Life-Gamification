import React, { Component } from 'react';
import './AddNewSkill.css';
import { connect } from "react-redux";
import { addSkill } from "../../actions";

class AddNewSkill extends Component {
  constructor(){
    super();

    this.state = { skillName: ""}
  }

  handleTextChange = (e) => {
    this.setState({ skillName: e.target.value });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.addSkill();
    }
  }

  addSkill = () => {
    this.props.addSkill(this.state.skillName);
  }

  render() {
    return (
      <div className="addSkill">
        <input
            className="addSkillInput"
            type="text"
            placeholder="Your skill name"
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
        />
        <button className="addSkillBtn" onClick={this.addSkill}></button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addSkill: state.addSkill
  };
};

const mapDispatchToProps = { addSkill };

export const AddNewSkillContainer = connect(
  mapStateToProps, mapDispatchToProps)(AddNewSkill);
