import React, { Component } from 'react'

class Logo extends Component {
    render () {
        return (
            <div>
                <img src="http://www.placehold.it/120x50" />
                <div className="logo__tagline">Exclusive access to top developers</div>
            </div>
        )
    }
}

export default Logo