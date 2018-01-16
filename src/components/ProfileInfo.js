import React, { Component } from 'react'
import AddSkill from './AddSkill'
import API from './utils/api'
import { setTimeout } from 'timers';

class ProfileInfo extends Component {
    
    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-profile-info') || API.profileModel;

        this.setState( () => {
            return {
                name: store.name || 'Add name',
                location: store.location || 'Add Location',
                languages: store.languages || 'Add Languages',
                address: store.address || 'Add Location',
                imageURL: store.imageURL || '',
                resumeURL: store.resumeURL || '',
                skills: store.skills || [],
            }
        })
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
        
        setTimeout( () => {
            API.EEmiter.emit('map', this.state.address, this.state.name );
            API.EEmiter.emit('get-name', this.state.name );
        }, 1000 )

        if( e.target.type == 'file' && e.target.name === 'profilePic' ){
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
        API.EEmiter.emit('save-portfolio')
        API.EEmiter.emit('save-experience')
        API.EEmiter.emit('save-sample')
        API.EEmiter.emit('save-enviroment')
        API.EEmiter.emit('save-quotes')
        API.EEmiter.emit('save-projects')
        API.saveDataToLocalStore('toptal-profile-info', this.state )
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
                        <button className="profile__info--publish" onClick={this.props.handleEditMode}> Publish Profile </button>
                        <button className="profile__info--save" onClick={this.saveData.bind(this)}>SAVE DATA</button>
                        <form className="profile__info--form" 
                            onSubmit={this.handleSubmit.bind(this)} 
                            onChange={this.handleChange.bind(this)}>

                            <h1 className="profile__info--title">
                                <input ref="name"  type="text" defaultValue={ name } />
                            </h1>
                            <address className="profile__info--address"><input ref="address" type="text" defaultValue={ address } /></address>
                            <p className="profile__info--languages"><input ref="languages" type="text" defaultValue={ languages } /></p>
                            <AddSkill deleteFromStore={this.handleRemove.bind(this)} skills={skills} sendSkills={this.getSkills.bind(this)} />
                        </form>
                        
                        <div className="profile__info--resume--group">
                            <label> <img src="../assets/images/arrow-top.png" /> Upload Resume</label>
                            <input className="profile__info--resume--form" onChange={this.handleChange.bind(this)} type="file" ref="resumeURL" name="resume" placeholder="Upload Resume" />
                        </div>
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
                    { imageURL == "" ? <p className="profile__info--image--message">Add profile image</p> : false}
                </div>
                <div className="columns medium-8 large-9 small-12">
                    <header className="profile__info--header">
                    <button className="profile__info--publish" onClick={this.props.handleEditMode}> Edit Profile </button>
                        <h1 className="profile__info--title"> { name } </h1>
                        <address className="profile__info--address"> { address } </address>
                        <p className="profile__info--languages"> { languages }</p>
                        {this.state.skills.length == 0 ? <p className="profile__info--languages">Add Skills</p> : false } 
                        <ul className="profile__info--skills"> 
                            { 
                                this.state.skills.map( (item, index) => { 
                                    return <li key={index} className={item.level}> {item.skill} </li> 
                                }) 
                            } 
                        </ul> 
                        <a className="profile__info--download--resume" target="_blank" href={resumeURL}><img src="../assets/images/arrow-down.png" /> Download Resume</a>
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