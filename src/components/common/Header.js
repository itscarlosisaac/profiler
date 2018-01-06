import React, { Component } from 'react'
import Navigation from './Navigation'
import Logo from './Logo'
import JoinToptal from './JoinToptal'
import MobileHambuguer from './MobileHambuguer'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            navigationIsOpen: false
        }
    }

    handleNavigationToggle(){
        this.setState((prevState, nextState) => ({ navigationIsOpen: !prevState.navigationIsOpen }))
    }

    render () {
        return (
            <div className="app__header">
                <MobileHambuguer handleNavigationToggle={this.handleNavigationToggle.bind(this)} />
                <div className="row">
                    <div className="columns shrink">
                        <Logo />
                    </div>
                    <div className="columns">
                        <JoinToptal />
                    </div>
                </div>
                <div className="row align-justify">
                    <div className="columns">
                        <Navigation navigationIsOpen={this.state.navigationIsOpen} />
                    </div>
                    <div className="columns app__header--call">
                        <div className="text__block--15 text__right text__block--white text__block--normal">
                            <h3 className="no--margin">Call us: 888.323.4422</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header