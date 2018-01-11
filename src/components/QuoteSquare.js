import React, { Component } from 'react'

class QuoteSquare extends Component {
    getInitialState(){
        quote:this.props.data
    }
    
    constructor(props){
        super(props);
        this.state = {
            editing: this.props.editing,
            quote: '',
            author: this.props.name || ''
        }
    }

    handleChange(e){
        const next = e.target.value;
        this.setState( () =>( {
            quote: next
        }))
    }

    handleQuoteSave(){
        this.props.handleQuoteSave(this.state.quote);
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square profile__square--black quote__square">
                    <h3 className="profile__square--title profile__square--title--white">{this.props.title}</h3>
                    <form 
                        onInput={this.handleQuoteSave.bind(this)}
                        onChange={this.handleChange.bind(this)} >
                        <textarea defaultValue={this.props.data}></textarea>
                    </form>
                </div>
            </div>
        )
    }

    renderContent() {
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square">
                    <span className="profile__square--left--quote">&ldquo;</span>
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <blockquote className="profile__square--quote">
                        <p> <em> {this.props.data} </em> </p>
                        <span className="profile__square--quote--author"> &ndash; {this.state.author} </span>
                    </blockquote>
                    <span className="profile__square--right--quote">&rdquo;</span>
                </div>
            </div>
        )
    }

    render () {
        return this.props.editing ? this.renderForm() : this.renderContent(); 
    }
}

export default QuoteSquare