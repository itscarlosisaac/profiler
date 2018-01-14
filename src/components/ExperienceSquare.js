import React, { Component } from 'react'
import API from './utils/api'

class ExperienceSquare extends Component {

    constructor(props){
        super(props)
        this.state = {
            isEditing: this.props.editing,
            isDirty: false,
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-experience-list') || API.experienceList;
        this.setState( () => ({ experienceList:store }))
        API.EEmiter.addListener( 'save-enviroment', () => {
            API.saveDataToLocalStore('toptal-experience-list', this.state.experienceList);
        });
    }

    handleChange(e){
        const elements = document.querySelectorAll('.experience__square .form__row');
        const nextState = [];

        e.target.value != "" ? this.setState( ( ) => ({ isDirty: true }) ) : this.setState( ( ) => ({ isDirty: false }) )

        elements.forEach( (row) => {
            const exp = row.children[0].value;
            const years = row.children[1].value;
            if( exp !== "" && years !== "" )
                nextState.push({ experience: exp, years: years });
        })

        this.setState( ( ) => ({ experienceList: nextState }) )
    }

    renderFormRow(){
        const content = []
        for( let i = 0; i < 7; i++ ){
            content.push( 
                <div key={i} className="form__row">
                    <input type="text" placeholder="Experience"  defaultValue={this.state.experienceList[i] ? this.state.experienceList[i].experience : '' } />
                    <input type="text" placeholder="Years" defaultValue={this.state.experienceList[i] ? this.state.experienceList[i].years : '' }  />
                </div>
            )
        }
        return content;
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square profile__square--black experience__square">
                    <h3 className="profile__square--title profile__square--title--white">{this.props.title}</h3>
                    <form 
                        onChange={this.handleChange.bind(this)} >
                        { this.renderFormRow() }
                    </form>
                </div>
            </div>
        )
    }

    renderContent(){
        return(
            <div className="columns medium-3 small-12" >
                <div className="experience__square">
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <ul className="experience__list">
                        {
                            this.state.experienceList.map( (exp, index) => {
                                return <li key={index}><b>{exp.experience}</b>, {exp.years}</li>
                            })   
                        }
                    </ul>
                </div>
            </div>
        )
    }

    render () {
        return this.props.editing ? this.renderForm() : this.renderContent(); 
    }

}

export default ExperienceSquare