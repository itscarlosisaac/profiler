import React, { Component } from 'react'

class JoinToptal extends Component {
    render () {
        return (
            <div className="app__header--join">
                <div className="row align-right">
                        <p  className="columns shrink">Join toptal as </p>
                        <button className="columns shrink app__btn app__btn--square app__btn--join--header">Developer</button>
                        <button className="columns shrink app__btn app__btn--square app__btn--join--header">Company</button>
                        <button className="columns shrink app__btn app__btn--square app__btn--join--header app__btn--login">Login</button>
                </div>
            </div>
        )
    }
}

export default JoinToptal