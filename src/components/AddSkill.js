import React, { Component } from 'react'

class AddSkill extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFieldDirty: false,
            isAddingSkill: false,
            skills: this.props.skills
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const skill = this.refs.skill != undefined ? this.refs.skill.value : "";
        const level = this.refs.option != undefined ? this.refs.option.value : "" ;
        const next = this.refs.skill != undefined ? { skill, level } : null;
        
        if( skill !== "" ){
            new Promise( (resolve, reject) => {
                this.setState( (prevState) => ({
                    isAddingSkill: false,
                    isFieldDirty: false,
                    skills: prevState.skills.concat(next)
                }))
                resolve();
            })
            .then( () => {
                this.refs.skill != undefined ? this.refs.skill.value = '' : false;
                this.props.sendSkills(this.state.skills)
            })
        }else{
            this.setState( (prevState, nextState) => ({ isAddingSkill: true }) )
        }
    }

    handleRemove(e){
        const toRemove = e.target.dataset.type;
        this.props.deleteFromStore(toRemove);
        const next = this.state.skills.filter( item => item.skill != toRemove )
        this.setState( ( ) => ({ skills: next }) )
    }

    handleChange(e){
        const isDirty = e.target.value;
        isDirty !== '' ? 
            this.setState( (prevState) => ({ isFieldDirty: true }) ) :
            this.setState( (prevState) => ({ isFieldDirty: false }) )
    }

    handleInputRender(){
        if( this.state.isAddingSkill ){
            return (
                <div className="add__skill__form">
                    <input onChange={this.handleChange.bind(this)} ref="skill" className="add__skill__form--input" type="text" placeholder="Skill" />
                    {
                        this.state.isFieldDirty ? <span className="add__skill__form--checked">&#10003;</span> : null
                    }
                    <select ref="option" className="add__skill__form--select">
                        <option value="basic">Basic</option>
                        <option value="medium">Medium</option>
                        <option value="strong">Strong</option>
                    </select>
                    <button className="add__skill__form--button" onClick={this.handleSubmit.bind(this)}>Add Skill <span className="add__skill__form--plus--icon">+</span> </button>
                </div> 
            )
        }else{
            return (
                <button className="add__skill__form--button" onClick={this.handleSubmit.bind(this)}>Add Skill <span className="add__skill__form--plus--icon">+</span> </button>
            )
        }
    }

    render () {
        return (
            <div>
                <ul className="profile__info--skills">
                    {
                        this.state.skills.map( (item, index) => {
                            return <li key={index} className={item.level}>
                                        {item.skill} 
                                        <span onClick={this.handleRemove.bind(this)} data-type={item.skill} className="add__skill__form--delete--icon">+</span> 
                                    </li>
                        })
                    }
                </ul>
                {this.handleInputRender() }
            </div>
        )
    }
}

export default AddSkill