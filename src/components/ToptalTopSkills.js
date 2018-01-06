import React, { Component } from 'react'
import TopTalSkills from './utils/toptapSkills';


class ToptalTopSkills extends Component {
    render () {
        return (
            <div className="app__toptal__skills">
                <div className="row">
                    <div className="columns">
                        <h3 className="app__toptal__skills--header">Top skills on toptal</h3>
                    </div>
                </div>
                <div className="row">
                    <ul className="app__toptal__skills--list">
                        {
                            TopTalSkills.topSkills.map( (skill, i, arr) => {
                                if( arr[i-1] != undefined ){
                                    if( skill.charAt(0) != arr[i-1].charAt(0) ){
                                        return (
                                            <li key={i}>
                                                <span className="app__toptal__skills--letter">
                                                    {skill.charAt(0)}
                                                </span>
                                                <span className="app__toptal__skills--content"> {skill} </span>
                                            </li> 
                                        )
                                    }else{
                                        return <li key={i}> 
                                            <span className="app__toptal__skills--content"> 
                                                {skill} 
                                            </span>
                                        </li> 
                                    }
                                }else{
                                    return (
                                        <li key={i}>
                                            <span className="app__toptal__skills--letter">
                                                {arr[i].charAt(0)}
                                            </span>
                                            <span className="app__toptal__skills--content"> 
                                            {skill} </span>
                                        </li> 
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ToptalTopSkills