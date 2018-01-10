import React, { Component } from 'react'

class AddSkill extends Component {
    render () {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Skill" />
                    <select>
                        <option value="basic">Basic</option>
                        <option value="medium">Medium</option>
                        <option value="strong">Strong</option>
                    </select>
                </form>
            </div>
        )
    }
}

export default AddSkill