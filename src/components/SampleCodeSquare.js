import React, { Component } from 'react'
import API from './utils/api'

class SampleCodeSquare extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: ''
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-sampleCodeImage') || API.portfolioList;
        this.setState( () => ({ sampleCodeImage:store }))
        API.EEmiter.addListener( 'save-sample', () => {
            API.saveDataToLocalStore('toptal-sampleCodeImage', this.state.sampleCodeImage);
        });
    }

    handleChange(e){
        e.preventDefault();
        const sampleCodeImage = this.refs.sampleCodeImage.value;
        const file = this.refs.sampleCodeImage.files[0];
        const reader = new FileReader();

        if( e.target.type == 'file' ){
            reader.onloadend = () => {
                this.setState({
                  file: file,
                  sampleCodeImage: reader.result
                });
              }
            reader.readAsDataURL(file)
        }
    }

    renderEditing(){
        const { sampleCodeImage } = this.state;
        return (
            <div className="profile__square columns medium-3 small-12" >
                <div className="sample__code--image--form" style={{ backgroundImage:`url(${sampleCodeImage})`} }>
                    <input className="sample__code--input" onChange={this.handleChange.bind(this)} type="file" ref="sampleCodeImage" />
                </div>
            </div>
        )
    }

    renderContent() {
        const { sampleCodeImage } = this.state;
        return (
            <div className="columns medium-3 small-12" >
                <div className="profile__square sample__code">
                    <h3 className="profile__square--title">Sample code <br/> and algorithms</h3>
                    <div className="sample__code--image" style={{ backgroundImage:`url(${sampleCodeImage})`} }>
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