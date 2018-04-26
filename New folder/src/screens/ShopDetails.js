import React, {Component} from 'react';
import {Image,Button,AsyncStorage,ScrollView,Text,View,Dimensions,TouchableOpacity,FlatList,Modal,TextInput,Platform,PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoder';
export default class ShopDetails extends Component{
    state={
        Services:['HairCut & BlowDry','HairCut & BlowDry','Express Cut','Express Cut','Kids Hair cut','Kids Hair cut','Curly Cut','Curly Cut00'],
        showMe:false,
        locmodal:false,
        currloc:'',
        searchloc:'',
        streetname:''
       

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
    render()
    {
     
        return(
           
                <View style={{flex:1}}>
                {/* <View style={{ backgroundColor:'white' ,justifyContent: 'center'}}> */}
                <View style={{justifyContent:'space-between',flexDirection: 'row',margin:11}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'flex-start'}}>
                    <Image resizeMode='contain' source={require('../images/Nav-Back.png')} style={{height:17,width:11,marginTop:12,marginHorizontal:10,alignSelf:'flex-start'}} />
                    <Image resizeMode='contain' source={require('../images/Nav-Logo.png')} style={{height:30,width:40,marginLeft:10,marginTop:5}} />
                    </View>
                    <TouchableOpacity onPress={()=>this.setState({locmodal:!this.state.locmodal})}>
                    <View style={{flexDirection:'row',marginBottom:5}}>
                    <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{height:25,width:25,marginTop:8}} />
                    <Text style={{fontSize:16,fontFamily:'NeueKabel-Regular',marginTop:10}}>Madhapur,Hyd</Text>
                    
                    </View>
                    </TouchableOpacity>
                    <Modal visible={this.state.locmodal}
                      transparent={true}
                      animationType={'slide'}
                      onRequestClose={() => Console.warn("close filter")}>
                <View style={{ flex: 1, alignSelf:'center',backgroundColor:'rgba(52,52,52,0.8)',justifyContent:'flex-start',width:'100%'}}>
                    <View style={{alignSelf:'center',marginTop:30}}>
                        <TouchableOpacity onPress={()=>this.setState({locmodal:!this.state.locmodal})}>
                        <Image resizeMode='contain' source={require('../images/Close_Image.png')} style={{height:50,width:50,alignSelf:'center',marginLeft:10}} />
                        </TouchableOpacity>
                        <Text style={{fontSize:18,color:'white',marginTop:15,marginLeft:12}}>CHANGE LOCATION</Text>
                    </View>
                        <View 
                        style={{borderRadius:120,flexDirection:'row',borderWidth:0.5,borderColor:'white',marginTop:20, width:'90%',marginLeft:15,bottom:5,backgroundColor:'white',height:45}}
                        // style={{borderRadius:120,flexDirection:'row',marginLeft:10,marginRight:10,borderWidth:0.5,borderColor:'white',marginTop:20, width:380,bottom:5,backgroundColor:'white',height:45}}
                        ><TouchableOpacity onPress={()=>this.show()}>
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
                        <View style={{borderRadius:120,flexDirection:'row',borderWidth:0.5,borderColor:'white',marginTop:10, width:'90%',marginLeft:15,bottom:5,backgroundColor:'white',height:45}}>
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
                        <View style={{borderWidth:2,borderRadius:20,backgroundColor:'red',alignSelf:'center',height:40,width:100,borderColor:'red',marginTop:20}}>
                    <TouchableOpacity>
                        <Text style={{fontSize:16,margin:5,alignSelf:'center',color:'white'}}>Done</Text>
                        </TouchableOpacity>
                    </View>
                      
                </View>
                      
                      </Modal>
                    <Image resizeMode='contain' source={require('../images/Nav-Profile.png')} style={{height:28,width:28,marginTop:8,marginRight:15}} />
                    

                </View>
                {/* </View> */}
                <ScrollView scrollEnabled={true}>                                    
                <View>
                <View style={{backgroundColor:'grey', width:Dimensions.get('window').width,height:200}}>
                <Text style={{fontSize:70,fontFamily:'NeueKabel-Regular'}}>Image</Text>
                    <View style={{backgroundColor:'#00000000',borderWidth:1,width:Dimensions.get('window').width/2,alignSelf:'flex-end',padding:5}}>
                        <Text style={{fontSize:20,fontFamily:'NeueKabel-Regular'}}>Studio A Hair Salon</Text>
                        <View style={{flexDirection:'row',marginBottom:5}}>
                            <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{height:20,width:20,marginTop:8}} />
                            <Text style={{fontSize:13,fontFamily:'NeueKabel-Regular',marginTop:10}}>Madhapur,Hyd</Text>
                            
                        </View>
                    </View>
                </View>

                <View style={{position:'absolute',bottom:-15,right:0,flexDirection:'row'}}>
                    <View style={{height:50,width:50,bottom:-13,borderWidth:1,borderRadius:30,justifyContent:'center',marginRight:10,}}>
                        <TouchableOpacity onPress={()=>this.setState({showMe:!this.state.showMe})}>
                        <Image resizeMode='contain' source={require('../images/Share2.png')} style={{height:25,width:25,alignSelf:'center'}} />
                        </TouchableOpacity>
                        
              <Modal visible={this.state.showMe}
                      transparent={true}
                      animationType={'slide'}
                      onRequestClose={() => Console.warn("close filter")}>
                <View style={{ flex: 1, alignSelf:'center',backgroundColor:'rgba(52,52,52,0.8)',justifyContent:'center',width:'100%'}}>
               
                    <View style={{justifyContent:'center'}}>
                    <View style={{alignSelf:'center',marginLeft:130}}>
                        <TouchableOpacity onPress={()=>this.setState({showMe:!this.state.showMe})}>
                        <Image resizeMode='contain' source={require('../images/Close_Image.png')} style={{height:50,width:50,alignSelf:'center',marginLeft:10}} />
                        </TouchableOpacity>
                        </View>
                        <View
                  style={{borderWidth:0.5,margin:10,marginTop:15,height: 150,backgroundColor:'white', width: (Dimensions.get('window').width) / 1.8, alignSelf: 'flex-end' }}>
                        <Text style={{fontSize:20,color:'red',alignSelf:'center',marginTop:20}}>SHARE</Text>
                        
                  <View style={{ flexDirection: 'row',marginTop:10,alignItems:'center',}}>
                    
                    <View style={{borderRadius:20,borderWidth:1,marginLeft:35}}><Text style={{fontSize:10,margin:10}}>FB</Text></View>
                    <View style={{borderRadius:20,borderWidth:1,marginLeft:15}}><Text style={{fontSize:10,margin:10}}>TW</Text></View>
                    <View style={{borderRadius:20,borderWidth:1,marginLeft:15}}><Text style={{fontSize:10,margin:10}}>Gmail</Text></View>
                    
                  
                  </View>

                  
</View>
                </View>
                </View>
              </Modal>
                    
                    </View>
                    <View style={{height:50,width:50,bottom:-13,borderWidth:1,borderRadius:30,backgroundColor:'red',justifyContent:'center',borderColor:'white',marginRight:30}}>
                    <TouchableOpacity >
                    
                        <Image resizeMode='contain' source={require('../images/Wishlist1.png')} style={{height:25,width:25,alignSelf:'center',marginTop:5}} />
                        </TouchableOpacity>
                    </View>
                </View>   
             
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View >
                        <Text style={{fontSize:14,marginTop:10,margin:5}}>Studio A Hair Salon</Text>
                        <View style={{flexDirection:'row'}}>
                        <Image style={{height:10,width:10,marginLeft:5,margin:5}} source={require('../images/Company-Profile-Location2.png')}/>
                        <Text style={{fontSize:14,margin:5}}>Madhapur</Text>
                        
                        </View>
               
                <Text style={{fontSize:14,marginLeft:5}}>(Mon-Sat)9:00AM to 7:00PM</Text>
                <Text style={{fontSize:14,color:'blue',margin:5}}>www.studioa.co.in</Text>
                </View>

                    <View style={{borderWidth:2,borderRadius:20,backgroundColor:'black',alignSelf:'flex-end',marginRight:20,marginTop:40}}>
                    <TouchableOpacity>
                        <Text style={{fontSize:14,margin:5,alignSelf:'center',color:'white'}}>View on map</Text>
                        </TouchableOpacity>
                    </View>
       
                </View>
                       
                <View style={{flexDirection:'row',marginLeft:5,marginTop:10,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <View style={{borderRadius:20,borderWidth:1,margin:5}}><Text style={{fontSize:10,margin:10}}>FB</Text></View>
                    {/* <View style={{borderRadius:20,borderWidth:1}}><Text style={{fontSize:10,margin:10}}>tw</Text></View> */}
                    <View style={{borderRadius:20,borderWidth:1,margin:5}}><Text style={{fontSize:10,margin:10}}>TW</Text></View>
                    </View>
                    <View style={{marginRight:20}}>
                    <Image style={{height:30,width:30,alignSelf:'flex-end'}}source={require('../images/Call.png')}/>
                    </View>
                    </View>
                <View style={{borderWidth:0.5,backgroundColor:'red',marginTop:10}}>
                <Text style={{fontSize:14,margin:10,alignSelf:'center',color:'white'}}>SERVICES</Text>
                </View>
         
            {console.log(this.state.Services)}
            <View >
                <FlatList
                numColumns={2}
                data={this.state.Services}
                keyExtractor={(item,index) => index}  
                renderItem={({item})=>{return(
                    <View style={{width:(Dimensions.get('window').width)/2.3,borderRadius:20,borderWidth:1,margin:10}}>
                     <TouchableOpacity onPress={()=>this.props.navigation.navigate('BookingSlot')}>

                    <Text style={{fontSize:14,margin:10,alignSelf:'center'}}>{item}</Text>
                    </TouchableOpacity>
                    </View>
               )}}
                />
                </View>
                </ScrollView>                                    
                </View>

        )
    }
}