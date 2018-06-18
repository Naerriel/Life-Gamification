import React, { Component } from "react";
import "./Filter.css";
import { connect } from "react-redux";
import { filterSkills } from "../../../selectors/filterSkills.js";
import { setSkillsHistoryFilter } from "../../../actions/skillsHistoryFilter.js";

const maxSkillsRender = 5;

class Filter extends Component {
  constructor() {
    super();

    let todaysDate = new Date();
    todaysDate = this.DateToYYYYMMDD(todaysDate);

    this.state = {
      filterInput: "",
      toDate: todaysDate,
      fromDate: todaysDate,
      skills: [],
      shouldRenderSkillList: false,
      skillListFocus: 0,
    };
  }

  skillList = [];

  DateToYYYYMMDD = (date) => {
    return date.toISOString().slice(0, 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ skills: nextProps.skills });
  }

  tryRenderingSkillList = () => {
    if(this.state.shouldRenderSkillList){
      let buttonNum = 0;
      return (
        <ul className="filter-skill-list">
          {this.state.skills.slice(0, maxSkillsRender).map((skill) => {
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

  handleStartingOfFilteringSkills = (filter) => {
    var timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      this.props.setSkillsHistoryFilter(filter);
    }, 200);
  };

  handleInputChange = (e) => {
    const target = e.target;
    this.setState({ [target.name]: target.value });

    if(target.name === "filterInput") {
      this.handleStartingOfFilteringSkills(target.value);
    }
  }

  enableRenderingSkillList = () => {
    this.setState ({ shouldRenderSkillList: true });
  }

  handleSkillListBtn = (e) => {
    this.setState({ shouldRenderSkillList: !this.state.shouldRenderSkillList });
  }

  handleNewFocusBoundaries = (newFocus) => {
    if(newFocus < 0){
      return Math.min(this.state.skills.length, maxSkillsRender);
    }
    if(newFocus > Math.min(this.state.skills.length, maxSkillsRender)){
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
        filterInput: e.target.innerHTML,
        shouldRenderSkillList: false
      });
    }
  }

  render() {
    return (
      <div className="history-filter">
        <div className="select-skill">
          <label className="filter-label">
            Skill:
          </label>
          <input
            type="text"
            name="filterInput"
            className="history-skill-select"
            onFocus={this.enableRenderingSkillList}
            value={this.state.filterInput}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSkillListKeys}
            ref={(input) => {this.skillList[0] = input}}
          />
          <button
            className="history-skill-select-btn"
            onClick={this.handleSkillListBtn}
          ></button>
          {this.tryRenderingSkillList()}
        </div>
        <label className="filter-label">
          From:
        </label>
        <input
          type="date"
          name="fromDate"
          className="history-date-select"
          value={this.state.fromDate}
          onChange={this.handleInputChange}
        />
        <label className="filter-label">
          To:
        </label>
        <input
          type="date"
          name="toDate"
          className="history-date-select"
          value={this.state.toDate}
          onChange={this.handleInputChange}
        />
        <button className="filter-finish-button" id="filter-cancel"></button>
        <button className="filter-finish-button" id="filter-accept"></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    skills: filterSkills(state.history.skills, state.skillsHistoryFilter)
  };
}

const mapDispatchToProps = { setSkillsHistoryFilter };

export const FilterContainer = connect(
  mapStateToProps, mapDispatchToProps)(Filter);
