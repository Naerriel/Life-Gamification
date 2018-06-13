import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import lgIcon from './assets/lg.svg';
import addSkillIcon from './assets/add-skill.svg';
import historyIcon from './assets/history.svg';
import settingsIcon from './assets/settings.svg';

class Header extends Component {
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
          <button className="header-element">
            <img class="header-icon" src={addSkillIcon} alt="" />
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
    );
  }
}

export default Header;
