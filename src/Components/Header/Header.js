import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './iconwhite.svg';

class Header extends Component {

  handleClick = (e) => {
    document.querySelector(".active").classList.remove("active");
    if(e.target.alt === "Life Gamification"){
      e.target = document.querySelector("#Home");
    }
    e.target.classList.add("active");
  }

  render() {
    return (
      <header className="header">
        <Link to="/" className="header__icon" onClick={this.handleClick}>
           <img src={logo} alt="Life Gamification"/></Link>
        <Link to="/" className="active header__text" id="Home"
            onClick={this.handleClick}>Home</Link>
        <Link to="/edit/" className="header__text"
            onClick={this.handleClick}>Edit skills</Link>
        <Link to="/timer/" className="header__text"
            onClick={this.handleClick}>Timer</Link>
        <Link to="/importexport/" className="header__text"
            onClick={this.handleClick}>Import / Export</Link>
      </header>
    );
  }
}

export default Header;
