import React, { Component } from 'react'

class AvailabilitySquare extends Component {
    render () {
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square availability__square">
                    <h3 className="profile__square--title">{this.props.title}</h3>
                    <h2 className="availability__square--bigTitle">Full-Time</h2>
                    <hr className="section__divider"/>
                    <h3 className="profile__square--title profile__square--title--smallMar">Preferred enviroment</h3>
                    <p className="availability__square--enviroments">
                        Git, Github, vim, emacs, Jenkins, MacOSX
                    </p>
                </div>
            </div>
        )
    }
}

export default AvailabilitySquare