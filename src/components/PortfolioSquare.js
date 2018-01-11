import React, { Component } from 'react'
import EventEmitter from 'events';
const emitter = new EventEmitter();

console.log(emitter);

class PortfolioSquare extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEditing: this.props.editing,
            isDirty: false,
            portfolio: this.props.data
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.handleProjects(this.state.portfolio)
    }

    handleChange(e){
        e.target.value != "" ?
            this.setState( ( ) => ({ isDirty: true }) ) :
            this.setState( ( ) => ({ isDirty: false }) )
    }

    handleSavePortfolio(){
        this.props.handleSavePortfolio(this.state.portfolio);
    }

    componentWillReceiveProps(nextProps){
        if( this.setState.isEditing !== nextProps.editing ){
            const elements = document.querySelectorAll('.portfolio__square .form__row');
            const nextState = [];
            elements.forEach( (row) => {
                const project = row.children[0].value;
                const techs = row.children[1].value;
                if( project !== "" && techs !== "" )
                    nextState.push({ title: project, skills: techs });
            } )
            new Promise( (resolve, reject) => {
                this.setState( ( ) => ({ portfolio: nextState }) )
                resolve();
            })
        }
    }

    renderFormRow(){
        const content = []
        for( let i = 0; i < 7; i++ ){
            content.push( 
                <div key={i} className="form__row">
                    <input type="text" placeholder="Project name" defaultValue={this.props.data[i] ? this.props.data[i].title : '' } />
                    <input type="text" placeholder="Skills used" defaultValue={this.props.data[i] ? this.props.data[i].skills : '' } />
                </div>
            )
        }
        return content;
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square profile__square--black portfolio__square">
                    <h3 className="profile__square--title profile__square--title--white">{this.props.title}</h3>
                    <form 
                        onInput={this.handleSavePortfolio.bind(this)}
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
                <div className="profile__square">
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <span className="portfolio__subtitle">
                        { this.props.subtitle }
                    </span>
                    <ul>
                        {
                            this.props.data.map( (project, index) => {
                                return <li key={index}><b>{project.title}</b>, {project.skills}</li>
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

export default PortfolioSquare