import React, { Component } from 'react'
import googleMapClient from '@google/maps'
import GoogleMapsLoader from 'google-maps'
import { setTimeout } from 'timers';

class MapLocationSquare extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: 'Portland, Oregon, USA',
            geolocation: {lat: -25.363, lng: 131.044}
        }
    }
    getLocation(){
        const Client = googleMapClient.createClient({
            key: 'AIzaSyCiljKtouaMaT1cr5cX3I9D1DzsbHC3iBc',
            Promise: Promise 
        });

        Client.geocode({address: this.state.address }).asPromise()
            .then((response) => {
                console.log(response.json.results)
                this.setState((prevState, nextState ) => ({
                    geolocation: response.json.results[0].geometry.location 
                }))
            })
            .catch((err) => {
                console.log(err);
            });
    }
    createMap(){
        GoogleMapsLoader.KEY = 'AIzaSyCiljKtouaMaT1cr5cX3I9D1DzsbHC3iBc';
        const el = document.getElementById('map');
        const options = {
            center: this.state.getLocation,
            zoom: 8
        }
        GoogleMapsLoader.load( function(google) {
            const map =  new google.maps.Map(el, options);
        });
    }
    componentDidMount(){
        this.createMap();
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