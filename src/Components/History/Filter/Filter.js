import React, { Component } from "react";
import "./Filter.css";
import { SelectSkillContainer } from "./SelectSkill/SelectSkill.js";
import { connect } from "react-redux";

class Filter extends Component {
  constructor() {
    super();

    let todaysDate = new Date();
    todaysDate = this.DateToYYYYMMDD(todaysDate);

    this.state = {
      filterInput: "",
      toDate: todaysDate,
      fromDate: todaysDate,
    };
  }

  DateToYYYYMMDD = (date) => {
    return date.toISOString().slice(0, 10);
  }

  handleInputChange = (e) => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
  }

  updateFilterInput = (newValue) => {
    this.setState({ filterInput: newValue });
  }

  render() {
    return (
      <div className="history-filter">
        <SelectSkillContainer
          updateFilterInput={this.updateFilterInput}
          filterInput={this.state.filterInput}
        />
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
  };
}

const mapDispatchToProps = { };

export const FilterContainer = connect(
  mapStateToProps, mapDispatchToProps)(Filter);
