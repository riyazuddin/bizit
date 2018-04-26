import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../common/Header'

export default class Map extends Component{
  state = {
    businessID:'',
  markers: [{
    title: 'bollineni',
    coordinates: {
      latitude: 17.445366,
      longitude:  78.389501
    },
  },
  {
    title: 'mtwlabs',
    coordinates: {
      latitude: 17.448393,
      longitude: 78.391797
    }, 
  },
    {
      title: 'image',
      coordinates: {
        latitude:17.444688,
        longitude:78.386174
      }, 
    },
      {
      title: 'jubliee',
      coordinates: {
        latitude:17.432257,
        longitude: 78.407540
        }, 
      },
      {
      title: 'image',
      coordinates: {
        latitude:17.434836,
        longitude: 78.399772
        }, 
      },
      {
        title: 'image',
        coordinates: {
          latitude:17.454836,
          longitude: 78.401772
          }, 
    
  }]
}
componentDidMount()
{
  this.setState({businessID:this.props.navigation.state.params.ID},()=>{console.log(this.state.businessID)})
}
  render(){
    return(
      <View style={{flex:1}}>
      <Header navicon={require('../images/Nav-Back.png')} 
            backclick={()=>this.props.navigation.navigate('ShopDetails',{ID:this.state.businessID})}
            lmodal={false} menuClick={() => this.props.navigation.navigate('DrawerToggle')}  onclick={()=>this.props.navigation.navigate('ShopDetail')}/>

            <MapView
             style={{ flex: 1, width: "100%" }}
              initialRegion={{
              latitude: 17.445366,
              longitude:  78.389501,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            }}>
            {this.state.markers.map(marker => (
            <MapView.Marker 
              coordinate={marker.coordinates}
              title={marker.title}
            />
              ))}
         </MapView>  
       </View>
          );
        }
      } 
      
   