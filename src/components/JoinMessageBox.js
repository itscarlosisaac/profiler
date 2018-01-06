import React, { Component } from 'react'

class JoinMessageBox extends Component {
    render () {
        return (
            <div className="app__join__message__box">
                <div className="row">
                    <div className="columns  align-self-middle large-12">
                        <p className="text__block">
                            Join the toptal community. 
                            <span className="text__block--white"> Apply to work with us as a </span> 
                            <button className="app__btn app__btn--join--message--box">Developer</button>
                            <span className="text__block--italic">  or </span>
                            <button className="app__btn app__btn--join--message--box">Client</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default JoinMessageBox