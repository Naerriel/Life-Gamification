import React, { Component } from "react"
import { SelectSkill } from "./SelectSkill/index.js"
import "./index.css";

import { connect } from "react-redux"
import { setHistoryLogFilter } from "redux/actions/historyLogFilter.js"

class _Filter extends Component {
  constructor() {
    super();

    let todaysDate = new Date();
    todaysDate = this.DateToYYYYMMDD(todaysDate);

    this.state = {
      filterInput: "",
      toDate: todaysDate,
      fromDate: todaysDate,
      shouldRenderSkillList: false
    }
  }

  DateToYYYYMMDD = (date) => {
    return date.toISOString().slice(0, 10)
  }

  handleInputChange = (e) => {
    const target = e.target
    this.setState({ [target.name]: target.value })
  }

  updateFilterInput = (newValue) => {
    this.setState({ filterInput: newValue })
  }

  xorShouldRenderSkillList = () => {
    this.setState({ shouldRenderSkillList: !this.state.shouldRenderSkillList })
  }

  setShouldRenderSkillList = (value) => {
    this.setState({ shouldRenderSkillList: value })
  }

  handleStartFilteringBtn = () => {
    this.setState({ shouldRenderSkillList: false })
    this.props.setHistoryLogFilter(this.state.filterInput,
        this.state.fromDate, this.state.toDate)
  }

  handleCancelFilteringBtn = () => {
    this.setState({ shouldRenderSkillList: false })
    this.props.setHistoryLogFilter("all", "all", "all")
  }

  render() {
    return (
      <div className="history-filter">
        <SelectSkill
          updateFilterInput={this.updateFilterInput}
          filterInput={this.state.filterInput}
          shouldRenderSkillList={this.state.shouldRenderSkillList}
          xorShouldRenderSkillList={this.xorShouldRenderSkillList}
          setShouldRenderSkillList={this.setShouldRenderSkillList}
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
        <button
          className="filter-finish-button"
          id="filter-cancel"
          onClick={this.handleCancelFilteringBtn}>
        </button>
        <button
          className="filter-finish-button"
          id="filter-accept"
          onClick={this.handleStartFilteringBtn}>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = { setHistoryLogFilter }

export const Filter = connect(
  mapStateToProps, mapDispatchToProps)(_Filter)
