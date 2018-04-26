import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,Modal,TextInput,AsyncStorage,PermissionsAndroid,BackHandler
} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geocoder from 'react-native-geocoder'
import styles from '../common/styles'

export default class Header2 extends Component {
    state={
        locmodal:false,
        currloc:'',
        searchloc:'',
        streetname:''
    }
    componentDidMount()
    {
        this.setState({locmodal:this.props.lmodal});
        this.show()

    }
    // async show()
    // {
      
    //     const self=this;
    //   console.log('hi');
    //   let hasPermission =true;
       
    //     if (Platform.OS === 'android' && Platform.Version >= 23) {
    //       hasPermission = await PermissionsAndroid.check(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //       );
         
    //       if(hasPermission)
    //    {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             // let tes = Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude});
    //             Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(res => {self.setState({streetname:res[0].streetName},()=>{console.log('position'+self.state.streetname)})}).catch(err => {
    //                 console.warn(err);
    //                 alert('Please switch on the location to detect');
    //             });
    //             // console.log(tes,'gopiss')
    //             // console.log(position)
    //             self.setState({
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
                
    //             error: null,
    //           },()=>{console.log('latitude: '+self.state.latitude+'\n'+'longitude'+self.state.longitude)});
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    //       );
     
         
    //    }
       
    //       if (!hasPermission) {
    //         const status = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              
    //         );
    //        hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
    //       }
    
          
      
    // }
    
       
       
    //   }
    async show()
{
    const self=this;
  console.log('hi');
  let hasPermission =false;
//   let FPermission=true;
   
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(hasPermission)
    //   FPermission = await PermissionsAndroid.check(
    //     (PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE && PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    //   );
    if(hasPermission)
    {
    //  navigator.geolocation.getCurrentPosition(
    //      (position) => {
    //          // let tes = Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude});
    //          Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(res => {self.setState({streetname:res[0].streetName},()=>{console.log('position'+self.state.streetname)})}).catch(err => {
    //              console.warn(err);
    //              alert('Please switch on the location to detect');
    //          });
    //          // console.log(tes,'gopiss')
    //          // console.log(position)
    //          self.setState({
    //          latitude: position.coords.latitude,
    //          longitude: position.coords.longitude,
             
    //          error: null,
    //        },()=>{console.log('latitude: '+self.state.latitude+'\n'+'longitude'+self.state.longitude)});
    //      },
    //      (error) => this.setState({ error: error.message }),
    //      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    //    );
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false //true => To prevent the location services popup from closing when it is clicked back button
    }).then(function(success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
navigator.geolocation.getCurrentPosition(
         (position) => {
             // let tes = Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude});
             Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(res => {self.setState({streetname:res[0].streetName},()=>{console.log('position'+self.state.streetname,res)})}).catch(err => {
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
         { enableHighAccuracy: true, timeout: 100, maximumAge: 1000 },
       );
        }.bind(this)
    ).catch((error) => {
        console.log(error.message);
    });
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
        LocationServicesDialogBox.forceCloseDialog();
 });
    
   
  
      
    }
   
      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          
        );
       hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
      }
    
      
  
}
else if(Platform.OS==='android' && Platform.Version<23)
{
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false //true => To prevent the location services popup from closing when it is clicked back button
    }).then(function(success) {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
navigator.geolocation.getCurrentPosition(
         (position) => {
             // let tes = Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude});
             Geocoder.geocodePosition({lat:position.coords.latitude,lng:position.coords.longitude}).then(res => {self.setState({streetname:res[0].streetName},()=>{alert(res)})}).catch(err => {
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
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
       );
        }.bind(this)
    ).catch((error) => {
        console.log(error.message);
    });
    BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
        LocationServicesDialogBox.forceCloseDialog();
 });

}

   
   
  }
    render() {
        return (

            <View style={[styles.MainHeaderStyle]}>
            <View style={[styles.LBstyle]}>
                <TouchableOpacity onPress={this.props.backclick} >
                <Image resizeMode='contain' source={require('../images/Nav.png')} style={{height:20,width:20,marginTop:19,marginHorizontal:10,alignSelf:'flex-start'}} />
                </TouchableOpacity>
                <Image resizeMode='contain' source={require('../images/Nav-Logo.png')} style={{height:50,width:50,marginLeft:10}} />
            </View>
            <TouchableOpacity onPress={()=>this.setState({locmodal:!this.state.locmodal})}>
                <View style={[styles.frow,styles.mB5,{marginTop:13}]}>
                    <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{height:25,width:25}} />
                    <Text style={[styles.FntS16,styles.FntFaNR,styles.mT10,{color:'black',marginTop:2}]}>{this.state.streetname}</Text>
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
                            <TouchableOpacity onPress={()=>this.setState({locmodal:false})} >
                                <Text style={{fontSize:16,margin:5,alignSelf:'center',color:'white'}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            
            </Modal>
            <TouchableOpacity onPress={this.props.onclick}>
            <Image resizeMode='contain' source={require('../images/Nav-Profile.png')} style={{height:28,width:28,marginTop:10,marginRight:15}} />
            </TouchableOpacity>

        </View>
        );
    }
}
