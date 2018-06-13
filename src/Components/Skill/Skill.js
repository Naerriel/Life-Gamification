import React, { Component } from 'react';
import { connect } from "react-redux";

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <div>
        This is a skill.
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { };

export const SkillContainer = connect(mapStateToProps, mapDispatchToProps)(Skill);
