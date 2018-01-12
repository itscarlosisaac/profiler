import React, { Component } from 'react'
import API from './utils/api'

class PortfolioSquare extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEditing: this.props.editing,
            isDirty: false
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptap-portfolio-list') || API.portfolioList;
        this.setState( () => ({ portfolioList:store }))
    }

    handleSubmit(e){
        e.preventDefault();
    }

    handleChange(e){
        const elements = document.querySelectorAll('.portfolio__square .form__row');
        const nextState = [];

        e.target.value != "" ? this.setState( ( ) => ({ isDirty: true }) ) : this.setState( ( ) => ({ isDirty: false }) )
            
        elements.forEach( (row) => {
            const project = row.children[0].value;
            const techs = row.children[1].value;
            if( project !== "" && techs !== "" )
                nextState.push({ title: project, skills: techs });
        } )
        this.setState( ( ) => ({ portfolioList: nextState }) )
    }

    handleSavePortfolio(){
        API.saveDataToLocalStore('toptap-portfolio-list', this.state.portfolioList);
    }

    renderFormRow(){
        const content = []
        for( let i = 0; i < 7; i++ ){
            content.push( 
                <div key={i} className="form__row">
                    <input type="text" placeholder="Project name" defaultValue={this.state.portfolioList[i] ? this.state.portfolioList[i].title : '' }  />
                    <input type="text" placeholder="Skills used" defaultValue={this.state.portfolioList[i] ? this.state.portfolioList[i].skills : '' } />
                </div>
            )
        }
        return content;
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square profile__square--black portfolio__square">
                    <h3 className="profile__square--title profile__square--title--white" onClick={this.handleSavePortfolio.bind(this)}>{this.props.title}</h3>
                    <form 
                        onInput={this.handleChange.bind(this)}
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
                <div className="portfolio__square">
                    <h3 className="profile__square--title profile__square--title--hasSub">{this.props.title}</h3>
                    <span className="portfolio__subtitle">
                        { this.props.subtitle }
                    </span>
                    <ul className="portfolio__list">
                        {
                            this.state.portfolioList.map( (project, index) => {
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