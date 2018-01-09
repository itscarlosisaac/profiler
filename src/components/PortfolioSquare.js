import React, { Component } from 'react'

class PortfolioSquare extends Component {
    render () {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <span className="portfolio__subtitle">
                    {this.props.subtitle}
                </span>
                <ul>
                    <li><b>NavalPlan</b>, PHP, Ruby</li>
                    <li><b>MyTime</b>, JavaScript</li>
                    <li><b>Formidable</b>, PHP, Ruby</li>
                    <li><b>SparkleShare</b>, JavaScript</li>
                    <li><b>Monoon</b>, ActionScript</li>
                </ul>
            </div>
        )
    }
}

export default PortfolioSquare