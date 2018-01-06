import React, { Component } from 'react'

class Navigation extends Component {

    render () {
        return (
            <div>
                <nav className={`app__navigation 
                    ${this.props.navigationIsOpen ? 'app__navigation--open' : 'app__navigation--close'}`
                }>
                    <ul>
                        <li><a href="#">what</a></li>
                        <li><a href="#">why</a></li>
                        <li><a href="#">how</a></li>
                        <li><a href="#">clients</a></li>
                        <li><a href="#">team</a></li>
                        <li><a href="#">labs</a></li>
                        <li><a href="#">faq</a></li>
                        <li><a href="#">contact</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation