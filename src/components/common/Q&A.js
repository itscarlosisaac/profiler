import React, { Component } from 'react'

class QandAForm extends Component {
    render () {
        return (
            <div className="row align-justify align-center qa__form">
                <div className="columns">
                    <div className="">
                        <h1>Important! Please also fill out the Q&amp;A form</h1>
                        <button>Q&amp;AForm</button>
                        <p className="as__dev">5 of 25 questions answered.</p>
                    </div>
                </div>
          </div>
        )
    }
}

export default QandAForm