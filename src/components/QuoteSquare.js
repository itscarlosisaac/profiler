import React, { Component } from 'react'
import API from './utils/api'

class QuoteSquare extends Component {
    getInitialState(){
        quote:this.props.data
    }
    
    constructor(props){
        super(props);
        this.state = {
            editing: this.props.editing,
            quote: '',
            mouseover:false
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore(`toptal-quotes-${this.props.quoteNum}`) || ''
        const name = API.getDataFromLocalStore('toptal-profile-info').name.split(' ')[0] || ''
        this.setState( () => ({ quote:store, author: name }))
    }

    handleChange(e){
        const next = e.target.value;
        this.setState( () =>( {
            quote: next
        }))
    }

    handleQuoteSave(){
        API.saveDataToLocalStore( (`toptal-quotes-${this.props.quoteNum}`), this.state.quote  )
    }

    handleMouseIn(){
        this.setState( () =>( {
            mouseover: true
        }))
    }

    handleMouseOut(){
        this.setState( () =>( {
            mouseover: false
        }))
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div 
                    className="profile__square profile__square--black quote__square" 
                    // onMouseEnter={this.handleMouseIn.bind(this)}
                    // onMouseLeave={this.handleMouseOut.bind(this)}
                >
                    <h3 className="profile__square--title profile__square--title--white">{this.props.title}</h3>

                    <form 
                        onInput={this.handleQuoteSave.bind(this)}
                        onChange={this.handleChange.bind(this)}  >
                        <textarea className="quote__text__field" defaultValue={this.state.quote}></textarea>
                    </form>
                </div>
                { 
                    // this.state.mouseover ? "" : 'Add content'
                }
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
                        <p> <em> {this.state.quote} </em> </p>
                        <span className="profile__square--quote--author"> 
                            {this.state.author == '' ? '' : '-' } 
                            {this.state.author} 
                        </span>
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