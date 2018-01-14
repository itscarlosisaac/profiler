import React, { Component } from 'react'
import API from './utils/api'



class AvailabilitySquare extends Component {

    constructor(props){
        super(props);
        this.state = {
            editing: this.props.editing,
            enviroment: ''
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-enviroment') || API.enviroment;
        this.setState( () => ({ enviroment:store }))

        API.EEmiter.addListener( 'save-enviroment', () => {
            API.saveDataToLocalStore('toptal-enviroment', this.state.enviroment);
        })
    }

    handleChange(e){
        const val = e.target.value;
        console.log(e.target.value)
        this.setState( () => ({
            enviroment: val
        }))
    }

    renderForm(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square availability__square">
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <h2 className="availability__square--bigTitle">Full-Time</h2>
                    <hr className="section__divider"/>
                    <h3 className="profile__square--title profile__square--title--smallMar">Preferred enviroment</h3>
                    <p className="availability__square--enviroments">
                        <textarea 
                            onInput={this.handleChange.bind(this)} 
                            className="availability__text__field" 
                            defaultValue={this.state.enviroment}
                            type="text" 
                            placeholder="Preferred environment">
                        </textarea>
                    </p>
                </div>
            </div>
        )
    }

    renderContent(){
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square availability__square">
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <h2 className="availability__square--bigTitle">Full-Time</h2>
                    <hr className="section__divider"/>
                    <h3 className="profile__square--title profile__square--title--smallMar">Preferred enviroment</h3>
                    <p className="availability__square--enviroments">
                        {this.state.enviroment}
                    </p>
                </div>
            </div>
        )
    }

    render () {
        
        return this.props.editing ? this.renderForm() : this.renderContent(); 
    }
}

export default AvailabilitySquare