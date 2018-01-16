import React, { Component } from 'react'
import API from '../utils/api'

class ToHire extends Component {
    constructor(props){
        super(props)
        this.state = { 
            name: ''
        }
    }

    componentWillMount(){
        API.EEmiter.addListener( 'get-name', (name) => {
            console.log(name)
            this.setState( () => ({ name: name }))
        });
    }

    render () {
        return (
          <div className="row align-justify align-center to__hire">
                <div className="columns">
                    <div className="">
                        <h1>To hire {this.state.name} join us as a</h1>
                        <button>Client</button>
                        <p className="as__dev">or as a developer <img src="assets/images/arrow-right-circle.png" /></p>
                    </div>
                </div>
          </div>
        )
    }
}

export default ToHire