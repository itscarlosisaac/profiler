import React, { Component } from 'react'

class MobileHambuguer extends Component {
    render () {
        return (
            <div>
                <div 
                    onClick={this.props.handleNavigationToggle} 
                    className="app__hambuguer" 
                    style={{'color':'white'}}
                >
                    <img src="./assets/images/expand.png" />
                </div>
            </div>
        )
    }
}

export default MobileHambuguer