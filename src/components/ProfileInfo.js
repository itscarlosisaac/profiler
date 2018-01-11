import React, { Component } from 'react'
import AddSkill from './AddSkill'

class ProfileInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageURL: this.props.data.imageURL || '',
            resumeURL: this.props.data.resumeURL || '',
            fileResume: '',
            file: '',
            name: this.props.data.name || 'Add name',
            address: this.props.data.address ||'Add location',
            languages: this.props.data.languages ||'Add languages',
            skills: this.props.data.skills || []
        }
    }

    handleSubmit(e){
        e.preventDefault();
    }

    handleChange(e){
        e.preventDefault();
        const addressValue = this.refs.address.value;
        const nameValue = this.refs.name.value;
        const languagesValue = this.refs.languages.value;
        const imageURLValue = this.refs.imageURL.value;
        const file = this.refs.imageURL.files[0];
        const fileResume = this.refs.resumeURL.files[0]
        const reader = new FileReader();

        this.setState( () => ({ 
            name: nameValue,
            address: addressValue,
            languages: languagesValue
        }) );

        if( e.target.type == 'file' && e.target.name === 'profilePic' ){
            console.log(e.target)
            reader.onloadend = () => {
                this.setState({
                  file: file,
                  imageURL: reader.result
                });
              }
            reader.readAsDataURL(file)
        }else if ( e.target.type == 'file' && e.target.name === 'resume' ){
            reader.onloadend = () => {
                this.setState({
                  fileResume: fileResume,
                  resumeURL: reader.result
                });
              }
            reader.readAsDataURL(fileResume)
        }
    }

    getSkills(skills){
        this.setState( () => ({ skills }))
    }

    handleRemove(toRemove){
        const next = this.state.skills.filter( item => item.skill != toRemove )
        this.setState( ( ) => ({ skills: next }) )
    }

    saveData(){
        this.props.saveData(this.state);
    }

    renderEditing(){
        const { name, address, languages, imageURL, skills } = this.state;
        return(
            <div className="row profile__info">
                <div className="columns medium-4 large-3 profile__info--image" style={{ backgroundImage:`url(${imageURL})`} }>
                    <input className="profile__info--image--form" onChange={this.handleChange.bind(this)} type="file" ref="imageURL" name="profilePic" />
                </div>
                
                <div className="columns medium-8 large-9 small-12">
                    <header className="profile__info--header">
                        <form className="profile__info--form" onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
                            <h1 className="profile__info--title">
                                <input ref="name"  type="text" defaultValue={ name } />
                            </h1>
                            <address className="profile__info--address"><input ref="address" type="text" defaultValue={ address } /></address>
                            <p className="profile__info--languages"><input ref="languages" type="text" defaultValue={ languages } /></p>
                            <AddSkill deleteFromStore={this.handleRemove.bind(this)} skills={skills} sendSkills={this.getSkills.bind(this)} />
                        </form>
                        
                        <input className="profile__info--image--form" onChange={this.handleChange.bind(this)} type="file" ref="resumeURL" name="resume" placeholder="Upload Resume" />
                              
                        <button className="profile__info--publish" onClick={this.saveData.bind(this)}>
                            Publish Profile
                        </button>
                    </header>
                </div>
            </div>
        )
    }

    renderProfile(){
        const { name, address, languages, imageURL, resumeURL } = this.state;
        return(
            <div className="row profile__info">
                <div className="columns large-3 medium-4 profile__info--image" style={{ backgroundImage:`url(${imageURL})`} }>
                    
                </div>
                <div className="columns medium-8 large-9 small-12">
                    <header className="profile__info--header">
                        <h1 className="profile__info--title"> { name } </h1>
                        <address className="profile__info--address"> { address } </address>
                        <p className="profile__info--languages"> { languages }</p>
                        {this.state.skills.length == 0 ? <p className="profile__info--languages">Add Skills</p> : false }
                        <ul className="profile__info--skills">
                            {
                                this.state.skills.map( (item, index) => {
                                    return <li key={index} className={item.level}>
                                                {item.skill} 
                                            </li>
                                })
                            }
                        </ul>
                        <a target="_blank" href={resumeURL}>Download Resume</a>
                        <button className="profile__info--publish" onClick={this.props.change}>
                            Edit Profile
                        </button>
                    </header>
                </div>
            </div>
        )
    }
    render () {
        return this.props.editMode ? this.renderEditing() : this.renderProfile(); 
    }
}

export default ProfileInfo