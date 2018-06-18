import React, { Component } from "react";
import "./Filter.css";

class Filter extends Component {

  renderFilterSkillList = () => {
    return (
      <ul className="filter-skill-list">
      </ul>
    );

    //Code example for filter elements
    //TODO develop it further
    //<li className="filter-skill">
    //  <button>
    //    Jazda na rolkach
    //  </button>
    //</li>
    //<li className="filter-skill">
    //  <button>
    //    Picie wody
    //  </button>
    //</li>
    //<li className="filter-skill">
    //  <button>
    //    Robienie na drutach
    //  </button>
    //</li>
    //<li className="filter-skill">
    //  <button>
    //    Pisanie lewą ręką
    //  </button>
    //</li>
    //
    // Skille do filtrowania będziesz pobierał, z history.skills
    // Będziesz je trzymał w state i filtorwał je jakimiś selektorami,
    // a potem je wybierzesz.
    // Mający wybrany skill tak samo będziesz używał selectoróœ do filtrowania
    // state'u.
    //
    // Wszystko się uda.
  }

  render() {
    return (
      <div className="history-filter">
        <div className="select-skill">
          <label className="filter-label">
            Skill:
          </label>
          <input type="text" className="history-skill-select" />
          <button className="history-skill-select-btn"></button>
        </div>
        <label className="filter-label">
          From:
        </label>
        <input type="date" className="history-date-select" />
        <label className="filter-label">
          To:
        </label>
        <input type="date" className="history-date-select" value="2018-05-21" />
        <button className="filter-finish-button" id="filter-cancel"></button>
        <button className="filter-finish-button" id="filter-accept"></button> 
      </div>
    );
  }
}

export default Filter;
