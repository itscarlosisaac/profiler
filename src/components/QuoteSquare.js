import React, { Component } from 'react'
import API from './utils/api'

class QuoteSquare extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            editing: this.props.editing,
            dirty:false,
            quote: '',
            mouseover:false
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore(`toptal-quotes-${this.props.quoteNum}`) || ''
        const name = API.getDataFromLocalStore('toptal-profile-info') != null ? API.getDataFromLocalStore('toptal-profile-info').name.split(' ')[0] || '' : ''
        this.setState( () => ({ quote:store, author: name }))
        API.EEmiter.addListener( 'save-quotes', () => {
            API.saveDataToLocalStore( (`toptal-quotes-${this.props.quoteNum}`), this.state.quote  )
        });
    }

    handleChange(e){
        const next = e.target.value;
        const isDirty = next  == "" ? false : true
        this.setState( () =>( {
            quote: next,
            dirty: isDirty
        }))
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
                    onMouseEnter={this.handleMouseIn.bind(this)}
                    onMouseLeave={this.handleMouseOut.bind(this)}
                >
                    <h3 className="profile__square--title profile__square--title--white">{this.props.title}</h3>
                    <form 
                        onChange={this.handleChange.bind(this)}  >
                        <textarea className="quote__text__field" defaultValue={this.state.quote}></textarea>
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
                        <p> <em> {this.state.quote} </em> </p>
                        {
                            this.state.quote !== '' ?
                                <span className="profile__square--quote--author"> 
                                    {this.state.author == '' ? '' : '-' } 
                                    {this.state.author} 
                                </span> : false
                        }
                    </blockquote>
                    {
                        this.state.quote == "" ? <p className="no__content">Add Content </p> : false
                    }
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