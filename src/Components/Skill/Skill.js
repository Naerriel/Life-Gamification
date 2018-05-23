import React, { Component } from 'react';

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = { skillInfo: props.skillInfo };
  }
  render() {
    return(
      <p>{this.state.skillInfo}</p>
    );
  }
}

export default Skill;
