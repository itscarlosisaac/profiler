import React, { Component } from 'react'

class Logo extends Component {
    render () {
        return (
            <div className="app__logo">
                <img src="assets/images/logo.png" />
                <div className="logo__tagline">Exclusive access to top developers</div>
            </div>
        )
    }
}

export default Logo