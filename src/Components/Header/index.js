import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import lgIcon from './assets/lg.svg'
import addSkillIcon from './assets/add-skill.svg'
import historyIcon from './assets/history.svg'
import settingsIcon from './assets/settings.svg'
import { connect } from "react-redux"
import { addSkill } from "redux/actions/skills.js"

class _Header extends Component {

  handleAddSkillClick = () => {
    this.props.addSkill()
  }

  render() {
    return (
      <header className="mainHeader">
        <div className="headerContainer content">
          <Link to="/" className="header-element">
            <img className="header-icon" src={lgIcon} alt="" />
            <span className="header-description">
              Home
            </span>
          </Link>
          <button
            className="header-element"
            onClick={this.handleAddSkillClick}
          >
            <img className="header-icon" src={addSkillIcon} alt="" />
            <span className="header-description">
              Add skill
            </span>
          </button>
          <Link to="/history" className="header-element">
            <img className="header-icon" src={historyIcon} alt="" />
            <span className="header-description">
              History
            </span>
          </Link>
          <Link to="/settings" className="header-element">
            <img className="header-icon" src={settingsIcon} alt="" />
            <span className="header-description">
              Settings
            </span>
          </Link>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { addSkill }

export const Header = connect(
  mapStateToProps, mapDispatchToProps)(_Header)
