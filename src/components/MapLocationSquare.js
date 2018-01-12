import React, { Component } from 'react'
import googleMapClient from '@google/maps'
import GoogleMapsLoader from 'google-maps'
import API from './utils/api'

class MapLocationSquare extends Component {
    constructor(props){
        super(props);
        this.state = {
            geolocation: {},
            noMap: true
        }
    }

    componentWillMount(){
        const store = API.getDataFromLocalStore('toptal-profile-info') || API.profileModel;
        this.setState( () => ({ address: store.address }))
    }

    componentDidMount () {
        this.getLocation();
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

    // componentWillReceiveProps(nextProps){
    //     if( nextProps.address !== this.props.address ){
    //         new Promise( ( resolve, reject ) => {
    //             this.setState({ address:nextProps.address })
    //             resolve();
    //         })
    //         .then( () => {
    //             this.getLocation()
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         })
    //     }
    // }

    render () {
        return (
            <div className={`columns medium-3 small-12 map__square ${this.state.noMap ? 'no-map' : false }`}>
                <div id="map"> </div>
                {
                    this.props.name !== undefined ?
                        <div className="map__address">
                            { this.props.name.split(' ')[0] } lives in {this.state.address} (see map)
                        </div> : ''
                }
               
            </div>
        )
    }
}

export default MapLocationSquare