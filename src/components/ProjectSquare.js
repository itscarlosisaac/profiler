import React, { Component } from 'react'
import API from './utils/api'

class ProjectSquare extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectURL: '',
            file: '',
            title: ''
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore(`toptal-project-${this.props.projectNum}`) || { };

        this.setState( () => ({ 
            projectURL: store.projectURL,
            title: store.title,
        })) 
    }

    handleChange(e){
        e.preventDefault();
        const projectURL = this.refs.projectURL.value;
        const title = this.refs.title.value
        const file = this.refs.projectURL.files[0];
        const reader = new FileReader();
        this.setState( () => ({ title }) );

        if( e.target.type == 'file' ){
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    projectURL: reader.result,
                    title
                });
            }
            reader.readAsDataURL(file)
        }
        setTimeout( () => {
            API.saveDataToLocalStore( (`toptal-project-${this.props.projectNum}`), this.state  )
        }, 100 )
    }

    renderEditing(){
        const { projectURL, title } = this.state;
        return(
            <div className="columns medium-3 small-12" >
                <div className="profile__square" style={{ backgroundImage:`url(${projectURL})`} }>
                    <form onChange={this.handleChange.bind(this)} >
                        <div className="">
                            <input 
                                ref="title" 
                                className="" 
                                defaultValue={title} 
                                type="text" />
                        </div>

                        <div>
                            <label htmlFor="thumb">Thumbnail</label>
                            <input 
                                className="project--input" 
                                defaultValue={projectURL} 
                                type="file" 
                                ref="projectURL" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    renderContent(){
        const { projectURL, title } = this.state ;
        return(
            <div className="columns medium-3 small-12" >
                <div className="profile__square project__square">
                    <div className="project__square--thumb" style={{ backgroundImage:`url(${projectURL})`} }>
                    </div>
                    {  title != '' ? <div className="project__square--desc"> <p> {title} </p> </div> : false }
                </div>
            </div>
        )
    }
    render () {
        return this.props.editing ? this.renderEditing() : this.renderContent(); 
    }
}

export default ProjectSquare