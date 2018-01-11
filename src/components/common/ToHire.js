import React, { Component } from 'react'

class ToHire extends Component {
    render () {
        return (
            <div className="row align-justify align-center to__hire">
                <div className="columns">
                    <div className="">
                        <h1>To hire {this.props.name} join us as a</h1>
                        <button>Client</button>
                        <p className="as__dev">or as a developer <img src="assets/images/arrow-right-circle.png" /> </p>
                    </div>
                </div>
          </div>
        )
    }
}

export default ToHire