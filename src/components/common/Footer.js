import React, { Component } from 'react'

class Footer extends Component {
    render () {
        return (
            <footer className="app__footer">
                <div className="app__footer--content row align-justify">
                    <div className="columns large-6 medium-5 small-12">
                        <h4>About toptal</h4>
                        <p>
                            TopTal connects start-ups businesses. and organizations to a growing network of the best developers in the world. Our engineers are available full- or part-time and are able to seamlessly integrate into your team.
                        </p>
                    </div>

                    <div className="columns large-3 medium-3 small-12">
                        <h4>FAQ</h4>
                        <ul className="app__footer__faq">
                            <li>How can i join toptal?</li>
                            <li>What requirements i have to meet?</li>
                            <li>How do you pay me?</li>
                            <li>Lorem ipsuum dolor it amet?</li>
                            <li>Rokok ini nulla facilis?</li>
                        </ul>
                    </div>

                    <div className="shrink columns large-1 medium-1 small-12">
                        <ul className="app__footer__reasons">
                            <li><a href="#">What</a></li>
                            <li><a href="#">Why</a></li>
                            <li><a href="#">How</a></li>
                            <li><a href="#">Clients</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Lab</a></li>
                        </ul>
                    </div>

                    <div className="columns large-2 medium-2 small-12">
                        <h4>Contact</h4>
                        <ul className="app__footer__contact__list">
                            <li><a href="#">Join us</a></li>
                            <li><a href="mailto:email@gmail.com">Send us e-mail</a></li>
                            <li><a href="#">Follow us on twitter</a></li>
                            <li><a href="#">Call 888.323.4422</a></li>
                        </ul>
                    </div>
                </div>
                <div className="app__footer--legal row align-justify">
                    <div className="columns medium-6 small-12 align-self-bottom">
                        <p className="app__footer--copyright">Copyright 2011 TopTal Development Inc.</p>
                    </div>
                    <div className="columns medium-6 small-12 align-self-bottom">
                        <ul className="app__footer--links">
                            <li><a href="#">Privacy policy</a></li>
                            <li><a href="#">Terms of use</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer