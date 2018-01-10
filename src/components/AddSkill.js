import React, { Component } from 'react'
import { setTimeout } from 'timers';

class AddSkill extends Component {
    constructor(props){
        super(props)
        this.state = {
            skills:[ 
                { skill: "PHP", level: "basic"}
             ]
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const skill = this.refs.skill.value;
        const level = this.refs.option.value;
        const next = { skill, level }
        if( skill !== "" ){
            this.setState( (prevState) => {
                return {
                    skills: prevState.skills.concat(next)
                }
            })
            setTimeout( () => { this.refs.skill.value = '' }, 1)
        }
    }

    handleRemove(e){
        const toRemove = e.target.dataset.type;
        const next = this.state.skills.filter( item => item.skill != toRemove )
        this.setState( (prevState, nextState) => ({ skills: next }) )
    }

    render () {
        return (
            <div>
                <ul className="profile__info--skills">
                    {
                        this.state.skills.map( (item, index) => {
                            return <li key={index} className={item.level}>
                                        {item.skill} 
                                        <span onClick={this.handleRemove.bind(this)} data-type={item.skill} >Delete</span> 
                                    </li>
                        })
                    }
                </ul>
                <div className="add__skill__form">
                    <input ref="skill" className="add__skill__form--input" type="text" placeholder="Skill" />
                    <select ref="option" className="add__skill__form--select">
                        <option value="basic">Basic</option>
                        <option value="medium">Medium</option>
                        <option value="strong">Strong</option>
                    </select>
                    <button onClick={this.handleSubmit.bind(this)}>Add Skill</button>
                </div>
            </div>
        )
    }
}

export default AddSkill