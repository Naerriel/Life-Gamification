import React, { Component } from 'react'
import { UnfoldSkillElements } from "./UnfoldSkillElements/index.js"
import EditSkillIcons from "./EditSkillIcons"

import "./index.css"

import { connect } from "react-redux"
import { renameSkill, deleteSkill } from "redux/actions/skills.js"

class _Skill extends Component {
  constructor(props) {
    super(props)

    this.state = {
      temporaryName: props.skill.name,
      progress: this.calcProgress(this.props.skill),
      unfold: false,
      editSkillName: false
    }
  }

  calcProgress = (skill) => {
    return Math.min(99, Math.floor(skill.exp / skill.expTillNextLevel * 100))
  }

  componentWillMount = () => {
    if(this.props.skill.name === ""){
      this.setState({ editSkillName: true });
    }
  }

  componentDidMount = () => {
    this.tryGivingFocusToSkillName()
  }

  componentDidUpdate = () => {
    this.tryGivingFocusToSkillName()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      temporaryName: nextProps.skill.name,
      progress: this.calcProgress(nextProps.skill),
      unfold: false
    })
  }

  tryGivingFocusToSkillName = () => {
    if(this.state.editSkillName){
      this.nameInput.focus()
    }
  }

  deleteSkill = () => {
    this.props.deleteSkill(this.props.skill)
  }

  startEditingSkillName = () => {
    this.setState({ editSkillName: true })
  }

  foldAndUnfoldSkill = () => {
    this.setState({ unfold: !this.state.unfold })
  }

  saveNewName = () => {
    this.setState({ editSkillName: false })
    this.props.renameSkill(this.state.temporaryName, this.props.skill.id)
  }

  handleNameChange = (e) => {
    this.setState({ temporaryName: e.target.value })
  }

  handleKeyDownOnName = (e) => {
    if(e.keyCode === 13){
      this.saveNewName()
    }
  }

  renderSkillName = () => {
    if(!this.state.editSkillName){
      return `${this.props.skill.name}`
    } else {
      return (
          <input type="text"
            className="skill-name skill-name-input"
            ref={(input) => { this.nameInput = input }}
            onChange={this.handleNameChange}
            onClick={(e) => { e.stopPropagation() }}
            value={this.state.temporaryName}
            onBlur={this.saveNewName}
            onKeyDown={this.handleKeyDownOnName}
          />
      )
    }
  }

  render() {
    let skillHeight
    if(this.state.unfold){
      skillHeight = "160px"
    } else {
      skillHeight = "80px"
    }
    const { skill } = this.props

    return(
      <div
        className="skill"
        style={{ height: {skillHeight}}}
        onClick={this.foldAndUnfoldSkill}
      >
        <EditSkillIcons
          shouldRender={this.state.unfold}
          startEditingSkillName={this.startEditingSkillName}
          deleteSkill={this.deleteSkill}
        />
        <div className="skill-level-info">
          <span className="skill-level">
            {skill.level}
          </span>
          <span className="skill-level-label">
            Lvl
          </span>
        </div>
        <span className="skill-name">
          {this.renderSkillName()}
        </span>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{width: `${this.state.progress}%`}}>
          </div>
        </div>

        {this.state.unfold ? (
          <span className="experience">
            {skill.exp} / {skill.expTillNextLevel}
          </span>
        ) : null}

        <UnfoldSkillElements
          shouldRender={this.state.unfold}
          skill={skill}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = { renameSkill, deleteSkill }

export const Skill = connect(mapStateToProps, mapDispatchToProps)(_Skill)
