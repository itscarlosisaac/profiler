import React, { Component } from 'react'
import Header from './common/Header'
import ToptalTopSkills from './ToptalTopSkills'
import JoinMessageBox from './JoinMessageBox'
import Footer from './common/Footer'


class HomePage extends Component {
    render () {
        return (
            <div>
                <Header />
                HomePage
                <ToptalTopSkills />
                <JoinMessageBox/>
                <Footer />
            </div>
        )
    }
}

export default HomePage