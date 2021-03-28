import React from 'react';
import ReactDOM from 'react-dom';


const mapStyles = {
  map: {
    display: 'flex',
    position: 'absolute',
    width: '42%',
    height:'100%',
    left: '58%',
    top: '92px',
  }
};


//Current location ni component ya ku detect place msee ataingia kwa site place yuko
class CurrentLocation extends React.Component {
  
      constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;

    
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
      }
      recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation; 
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }
    
      componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
        }
        this.loadMap();
      }
      //Hii load map ni ya just icase map itaload desing gani kama user hayuko online
      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
    
          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
    
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }
      renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
    
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
      }
    
    render() {
        const style = Object.assign({}, mapStyles.map);
    
        return (
          <div>
            <div style={style} ref="map">
              Loading map...
            </div>
            {this.renderChildren()}
          </div>
        );
      }
    }
    CurrentLocation.defaultProps = {
        zoom: 14,
        initialCenter: {
          lat: -1.2884,
          lng: 36.8233
         },
        centerAroundCurrentLocation: false,
        visible: true
    };

export default CurrentLocation;
//So, hii file ni ya vitu tatu:
//zile itaload kama msee hayuko online
//na kupata current location ya msee akiingia kwa site
//alafu baadae ntaongea auto-complete search options kama mtataka