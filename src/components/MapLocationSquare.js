import React, { Component } from 'react'
import googleMapClient from '@google/maps'
import GoogleMapsLoader from 'google-maps'
import API from './utils/api'
import { setTimeout } from 'timers';

class MapLocationSquare extends Component {
    constructor(props){
        super(props);
        this.state = {
            geolocation: {},
            noMap: true,
            name: ''
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-profile-info') || API.profileModel;
        this.setState( () => ({ address: store.address, name: store.name }))
    }

    componentDidMount () {
        setTimeout( () => {
            this.state.address !== "Add Location" ? this.getLocation() : false;
            API.EEmiter.addListener( 'map', (address, name ) => {
                this.setState( () => ({ address: address, name: name }));
                this.getLocation();
            })
        }, 500 )
    }
    
    getLocation(){
        const Client = googleMapClient.createClient({
            key: 'AIzaSyCiljKtouaMaT1cr5cX3I9D1DzsbHC3iBc',
            Promise: Promise 
        });

        Client.geocode({ address: this.state.address }).asPromise()
            .then((response) => {
                this.setState((prevState, nextState ) => ({
                    geolocation: response.json.results[0].geometry.location,
                    noMap: false
                }))
            })
            .then(() => {
                this.createMap();
            })
            .catch((err) => {
                console.log(err);
                this.setState((prevState, nextState ) => ({
                    noMap: true
                }))
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

    render () {
        return (
            <div className={`columns medium-3 small-12 map__square ${this.state.noMap ? 'no-map' : false }`}>
            { this.state.noMap  ? <p className="no__content">Add Content </p> : false }
                <div id="map"> </div>
                {
                    this.state.name !== undefined ?
                        <div className="map__address">
                            { this.state.name.split(' ')[0] } lives in {this.state.address} (see map)
                            <div className="plus--container">
                                <span className="plus--icon">+</span>
                            </div>
                        </div> : ''
                }
               
            </div>
        )
    }
}

export default MapLocationSquare