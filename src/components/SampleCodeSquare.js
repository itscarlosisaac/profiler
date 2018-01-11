import React, { Component } from 'react'

class SampleCodeSquare extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageURL: this.props.data || '',
            file: ''
        }
    }

    handleChange(e){
        e.preventDefault();
        const imageURL = this.refs.imageURL.value;
        const file = this.refs.imageURL.files[0];
        const reader = new FileReader();

        if( e.target.type == 'file' ){
            reader.onloadend = () => {
                this.setState({
                  file: file,
                  imageURL: reader.result
                });
              }
            reader.readAsDataURL(file)
            setTimeout( () => {
                this.props.handleSampleCode(this.state.imageURL);
            }, 1 )
        }
    }

    renderEditing(){
        const { imageURL } = this.state;
        return (
            <div className="profile__square columns medium-3 small-12" >
                <div className="sample__code--image--form" style={{ backgroundImage:`url(${imageURL})`} }>
                    <input className="sample__code--input" onChange={this.handleChange.bind(this)} type="file" ref="imageURL" />
                </div>
            </div>
        )
    }

    renderContent() {
        const { imageURL } = this.state;
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square sample__code">
                    <h3 className="profile__square--title">Sample code <br/> and algorithms</h3>
                    <div className="sample__code--image" style={{ backgroundImage:`url(${imageURL})`} }>
                    </div>
                </div>
            </div>
        )
    }

    render () {
        return this.props.editing ? this.renderEditing() : this.renderContent(); 
    }
}

export default SampleCodeSquare