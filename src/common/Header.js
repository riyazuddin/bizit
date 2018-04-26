import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,Modal,TextInput,AsyncStorage,PermissionsAndroid
} from 'react-native';
import Geocoder from 'react-native-geocoder'
import styles from '../common/styles'

export default class Header extends Component {
    state={
        locmodal:false,
        currloc:'',
        searchloc:'',
        streetname:''
    }
    componentDidMount()
    {
        this.setState({locmodal:this.props.lmodal})
    }
    async show()
    {
      
        const self=this;
      console.log('hi');
      let hasPermission =true;
       
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
         
          if(hasPermission)
       {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // let tes = Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude});
                Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(res => {self.setState({streetname:res[0].streetName},()=>{console.log('position'+self.state.streetname)})}).catch(err => {
                    console.warn(err);
                    alert('Please switch on the location to detect');
                });
                // console.log(tes,'gopiss')
                // console.log(position)
                self.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                
                error: null,
              },()=>{console.log('latitude: '+self.state.latitude+'\n'+'longitude'+self.state.longitude)});
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
          );
     
         
       }
       
          if (!hasPermission) {
            const status = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              
            );
           hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
          }
    
          
      
    }
    
       
       
      }
    render() {
        return (

            <View style={[styles.MainHeaderStyle]}>
            <View style={[styles.LBstyle]}>
                <TouchableOpacity onPress={this.props.backclick} >
                <Image resizeMode='contain' source={require('../images/Nav-Back.png')} style={{height:17,width:11,marginTop:19,marginHorizontal:10,alignSelf:'flex-start'}} />
                </TouchableOpacity>
                <Image resizeMode='contain' source={require('../images/Nav-Logo.png')} style={{height:40,marginVertical:10,width:50,marginLeft:10,marginTop:5}} />
            </View>
            <TouchableOpacity onPress={()=>this.setState({locmodal:!this.state.locmodal})}>
                <View style={[styles.frow,styles.mB5,{marginVertical:8}]}>
                    <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{height:25,width:25,marginTop:8}} />
                    <Text style={[styles.FntS16,styles.FntFaNR,styles.mT10]}>Madhapur,Hyd</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={this.state.locmodal}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => Console.warn("close filter")}>
                <View style={[styles.LocModalMView]}>
                    <View style={[styles.aslCenter,styles.mT30]}>
                        <TouchableOpacity onPress={()=>this.setState({locmodal:!this.state.locmodal})}>
                        <Image resizeMode='contain' source={require('../images/Close_Image.png')} style={{height:50,width:50,alignSelf:'center',marginLeft:10}} />
                        </TouchableOpacity>
                        <Text style={[styles.FntS18,styles.mT15,styles.mL12,{color:'white'}]}>CHANGE LOCATION</Text>
                    </View>
                        <View style={[styles.LocTipView]}>
                            <TouchableOpacity onPress={()=>this.show()}>
                                <Image resizeMode='contain' source={require('../images/Location-Change.png')} style={{height:30,width:30,alignSelf:'flex-start',marginRight:10,marginTop:5,marginLeft:8}} />
                            </TouchableOpacity>

                            <TextInput
                            placeholder='Use my Current Location'
                            placeholderTextColor='black'
                            multiline={true}
                            underlineColorAndroid='transparent'
                            style={{width:250,fontSize:16,color:'black'}}
                            value={this.state.streetname!='' && this.state.streetname!=undefined?this.state.streetname:this.state.currloc} onChangeText={(currloc) => this.setState({currloc})}
                        
                            />
                            
                        </View>
                        <Text style={{fontSize:16,color:'white',alignSelf:'center',marginTop:10}}>OR</Text>
                        <View style={[styles.LocTipView,styles.mT10]}>
                            <Image resizeMode='contain' source={require('../images/Location-Search.png')} style={{height:30,width:30,alignSelf:'flex-start',marginRight:10,marginTop:5,marginLeft:8}} />
                            <TextInput
                            placeholder='Search by location'
                            placeholderTextColor='black'
                            multiline={true}
                            underlineColorAndroid='transparent'
                            style={{width:250,fontSize:16,color:'black'}}
                            value={this.state.searchloc} onChangeText={(searchloc) => this.setState({searchloc})}
                            />
                    
                            
                        </View>
                        <View style={[styles.DBstyle]}>
                            <TouchableOpacity>
                                <Text style={{fontSize:16,margin:5,alignSelf:'center',color:'white'}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            
            </Modal>
            <TouchableOpacity onPress={this.props.onclick}>
            <Image resizeMode='contain' source={require('../images/Nav-Profile.png')} style={{height:28,width:28,marginTop:14,marginRight:15}} />
            </TouchableOpacity>

        </View>
        );
    }
}
