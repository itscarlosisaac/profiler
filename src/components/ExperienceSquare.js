import React, { Component } from 'react'

class ExperienceSquare extends Component {
    render () {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <ul>
                    <li><b>PHP</b>, 6 years</li>
                    <li><b>Ruby</b>, 7 years</li>
                    <li><b>JavaScript</b>, 4 years</li>
                    <li><b>ActionScript</b>, 3 years</li>
                </ul>
            </div>
        )
    }
}

export default ExperienceSquare