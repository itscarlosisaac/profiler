import React, { Component } from 'react'

class ProfileInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageURL: this.props.data.imageURL || '',
            file: '',
            name: this.props.data.name || 'Add name',
            address: this.props.data.address ||'Add location',
            languages: this.props.data.languages ||'Add languages'
        }
    }

    handleChange(e){
        e.preventDefault();
        const addressValue = this.refs.address.value;
        const nameValue = this.refs.name.value;
        const languagesValue = this.refs.languages.value;
        const imageURLValue = this.refs.imageURL.value;
        const file = this.refs.imageURL.files[0];
        const reader = new FileReader();

        this.setState( () => ({ 
            name: nameValue,
            address: addressValue,
            languages: languagesValue
        }) );

        if( e.target.type == 'file' ){
            reader.onloadend = () => {
                this.setState({
                  file: file,
                  imageURL: reader.result
                });
              }
            reader.readAsDataURL(file)
        }
    }

    saveData(){
        this.props.saveData(this.state);
    }

    renderEditing(){
        const { name, address, languages, imageURL } = this.state;
        return(
            <div className="row profile__info">
                <div className="profile__info--image">
                    <img src={imageURL} width="230" height="230" />
                    <input onChange={this.handleChange.bind(this)} type="file" ref="imageURL" />
                </div>
                <div>
                    <header>
                        <form onChange={this.handleChange.bind(this)}>
                            <input ref="name"  type="text" defaultValue={ name } />
                            <input ref="address" type="text" defaultValue={ address } />
                            <input ref="languages" type="text" defaultValue={ languages } />
                        </form>
                        <button onClick={this.saveData.bind(this)}>
                            Publish Profile
                        </button>
                    </header>
                </div>
            </div>
        )
    }

    renderProfile(){
        const { name, address, languages, imageURL } = this.state;
        return(
            <div className="row profile__info">
                <div className="profile__info--image">
                    <img src={imageURL} width="280" height="280" />
                </div>
                <div className="columns ">
                    <header className="profile__info--header">
                        <h1 className="profile__info--title"> { name } </h1>
                        <address className="profile__info--address"> { address } </address>
                        <p className="profile__info--languages"> { languages }</p>
                        <ul className="profile__info--skills">
                            <li>PHP</li>
                            <li>Ruby</li>
                            <li>JavaScript</li>
                            <li>ActionScript</li>
                        </ul>
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