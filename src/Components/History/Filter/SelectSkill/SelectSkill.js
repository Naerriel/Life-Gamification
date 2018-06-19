import React, { Component } from "react";
import { connect } from "react-redux";
import { filterSkills } from "../../../../selectors/filterSkills.js";
import { setSkillsHistoryFilter } from "../../../../actions/skillsHistoryFilter.js";

const maxSkillsRender = 5;

class SelectSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderSkillList: false,
      skillListFocus: 0,
    };
  }

  skillList = [];

  handleStartingOfFilteringSkills = (filter) => {
    var timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      this.props.setSkillsHistoryFilter(filter);
    }, 200);
  };

  enableRenderingSkillList = () => {
    this.setState ({ shouldRenderSkillList: true });
  }

  handleSkillListBtn = (e) => {
    this.setState({ shouldRenderSkillList: !this.state.shouldRenderSkillList });
  }

  handleNewFocusBoundaries = (newFocus) => {
    if(newFocus < 0){
      return Math.min(this.props.skills.length, maxSkillsRender);
    }
    if(newFocus > Math.min(this.props.skills.length, maxSkillsRender)){
      return 0;
    }
    return newFocus;
  }

  setFocusOnSkillList = (newFocus) => {
    this.skillList[newFocus].focus();
  }

  handleFocusChange = (newFocus) => {
    newFocus = this.handleNewFocusBoundaries(newFocus);

    this.setState({ skillListFocus: newFocus });
    this.setFocusOnSkillList(newFocus);
  }

  handleSkillListKeys = (e) => {
    if(e.keyCode === 38){ // arrow up
      e.preventDefault();
      this.handleFocusChange(this.state.skillListFocus - 1);
    }
    if(e.keyCode === 40){ // arrow down
      e.preventDefault();
      this.handleFocusChange(this.state.skillListFocus + 1);
    }
    if(e.keyCode === 13 && e.target.nodeName === "BUTTON") {
      this.setState({
        shouldRenderSkillList: false
      });
      this.props.updateFilterInput(e.target.innerHTML);
    }
  }

  tryRenderingSkillList = () => {
    if(this.state.shouldRenderSkillList){
      let buttonNum = 0;
      return (
        <ul className="filter-skill-list">
          {this.props.skills.slice(0, maxSkillsRender).map((skill) => {
            return (
              <li className="filter-skill">
                <button
                  onKeyDown={this.handleSkillListKeys}
                  ref={(button) => {this.skillList[++buttonNum] = button}}
                >
                  {skill}
                </button>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  }

  handleInputChange = (e) => {
    this.props.updateFilterInput(e.target.value);
    this.handleStartingOfFilteringSkills(e.target.value);
  }

  render() {
    return (
      <div className="select-skill">
        <label className="filter-label">
          Skill:
        </label>
        <input
          type="text"
          name="filterInput"
          className="history-skill-select"
          onFocus={this.enableRenderingSkillList}
          value={this.props.filterInput}
          onChange={this.handleInputChange}
          onKeyDown={this.handleSkillListKeys}
          ref={(input) => {this.skillList[0] = input}}
        />
        <button
          className="history-skill-select-btn"
          onClick={this.handleSkillListBtn}
          onKeyDown={this.handleSkillListKeys}
        ></button>
        {this.tryRenderingSkillList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    skills: filterSkills(state.history.skills, state.skillsHistoryFilter)
  };
}

const mapDispatchToProps = { setSkillsHistoryFilter}

export const SelectSkillContainer = connect(
  mapStateToProps, mapDispatchToProps)(SelectSkill);
