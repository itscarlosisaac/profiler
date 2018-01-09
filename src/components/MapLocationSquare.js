import React, { Component } from 'react'
import googleMapClient from '@google/maps'
import GoogleMapsLoader from 'google-maps'

class MapLocationSquare extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: this.props.address,
            geolocation: {}
        }
    }

    getLocation(){
        const Client = googleMapClient.createClient({
            key: 'AIzaSyCiljKtouaMaT1cr5cX3I9D1DzsbHC3iBc',
            Promise: Promise 
        });

        // this.setState({ address:this.props.address });

        Client.geocode({ address: this.state.address }).asPromise()
            .then((response) => {
                this.setState((prevState, nextState ) => ({
                    geolocation: response.json.results[0].geometry.location 
                }))
            })
            .then(() => {
                this.createMap();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    createMap(){
        GoogleMapsLoader.KEY = 'AIzaSyCiljKtouaMaT1cr5cX3I9D1DzsbHC3iBc';
        const el = document.getElementById('map');
        
        const options = {
            center: this.state.geolocation,
            zoom: 12
        }

        GoogleMapsLoader.load( function(google) {
            const map =  new google.maps.Map(el, options);
            const marker = new google.maps.Marker({
                position: options.center,
                map: map
            })
        });
    }

    componentWillReceiveProps(nextProps){
        if( nextProps.address !== this.props.address ){
            new Promise( ( resolve, reject ) => {
                this.setState({ address:nextProps.address })
                resolve();
            })
            .then( () => {
                this.getLocation()
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }

    componentDidMount(){
        this.getLocation();
    }

    render () {
        return (
            <div>
                <div id="map"> </div>
            </div>
        )
    }
}

export default MapLocationSquare