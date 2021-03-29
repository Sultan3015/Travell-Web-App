import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, showingInfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

const mapStyles = {
position: 'fixed'
};



export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

   MapContainer  ;_Component;get Component() {
    return this._Component;
  }
    
set Component(value) {
  this._Component = value;
}

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
      <Marker
        onClick={this.onMarkerClick}
        name={'Lake Nakuru National Park'}
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
      </CurrentLocation>
    );
  }
}






export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);
