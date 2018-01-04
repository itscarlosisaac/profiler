import React, { Component } from 'react'
import Navigation from './Navigation'
import Logo from './Logo'
import JoinToptal from './JoinToptal'

class Header extends Component {
    render () {
        return (
            <div>
                <Logo />
                <JoinToptal />
                <Navigation />
                <div>
                    <span>Call us: 888.323.4422</span>
                </div>
            </div>
        )
    }
}

export default Header