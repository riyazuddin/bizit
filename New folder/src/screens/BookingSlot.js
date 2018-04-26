import React, {Component} from 'react';
import {View,Text,ScrollView,Button,TouchableOpacity,FlatList,Image,Dimensions,Modal,AsyncStorage,Platform,PermissionsAndroid} from 'react-native';
// import { StackNavigator } from 'react-navigation';

export default class BookinSlot extends Component
{
    state={
        showMe:false,
        Day:[],
        DArr:[],
        TimeArr:['10:00AM','12:00PM','02:00PM','04:00PM','11:00AM','01:00PM','03:00PM','05:00PM'],
        showMe:false,
        showMe2:false,value:'',latitude:'',longitude:''
    }
   
    componentWillMount()
    {
        const self=this;
        self.getAdate();
          
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(positon)
                self.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              },()=>{console.log('latitude: '+self.state.latitude+'\n'+'longitude'+self.state.longitude)});
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        
    }


    getAdate(){
        const self=this;
        var day =  new Date();
        var nextDay = new Date();
        var dateArr=[];
        console.log('colls',dateArr);
        for (let index = 0; index < 7; index++) {
            if(index != 0){
                nextDay.setDate(day.getDate()+1); 
            }
            day = nextDay;
            dateArr.push(self.getformatDate(nextDay));
            
        }    
         self.setState({DArr:dateArr},()=>{console.log('upddtt',self.state.DArr)})
        console.log('coll',dateArr);
        console.log(self.state.DArr)
    }
    confirmBooking()
    {
        const self=this;
        self.setState({showMe2:false},()=>{self.props.navigation.navigate('PaymentMode',{ 'selectedtime': self.state.value})})
    }

    getformatDate(formdate)
    {
        var dayarr=['SUN','MON','TUE','WED','THU','FRI','SAT']
        console.log('formdate',formdate);
        return {day:dayarr[formdate.getDay()],date:""+formdate.getDate()};
    }
    componentDidMount(){
        const self=this;
      
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(positon)
                self.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              },()=>{console.log('latitude: '+self.state.latitude+'\n'+'longitude'+self.state.longitude)});
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
    }
    render(){
        const {goBack} = this.props.navigation;

        return(
            <View style={{flex:1}}>
                 <View style={{justifyContent:'space-between',flexDirection: 'row',margin:11}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'flex-start'}}>
                    <TouchableOpacity onPress={()=>goBack()}>
                    <Image resizeMode='contain' source={require('../images/Nav-Back.png')} style={{height:17,width:11,marginTop:12,marginHorizontal:10,alignSelf:'flex-start'}} />
                    </TouchableOpacity>
                        <Image resizeMode='contain' source={require('../images/Nav-Logo.png')} style={{height:30,width:40,marginLeft:10,marginTop:5}} />
                    </View>
                    <View style={{flexDirection:'row',marginBottom:5}}>
                        <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{height:25,width:25,marginTop:8}} />
                        <Text style={{fontSize:16,fontFamily:'NeueKabel-Regular',marginTop:10}}>Madhapur,Hyd</Text>
                    
                    </View>
                    <Image resizeMode='contain' source={require('../images/Nav-Profile.png')} style={{height:28,width:28,marginTop:8,marginRight:15}} />
                    

                </View>
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
                    <TouchableOpacity>
                        <Image resizeMode='contain' source={require('../images/Wishlist1.png')} style={{height:25,width:25,alignSelf:'center',marginTop:5}} />
                    </TouchableOpacity>
                    </View>
                </View>   
             
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View>
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
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:18,color:'black'}}>Hair Dressing Price:</Text>
                    <Text style={{fontSize:18,color:'red'}}>₹ 500 to ₹ 2500</Text>
                    </View>
                    <Image style={{height:30,width:30,marginBottom:15}}source={require('../images/Call.png')}/>
                   
                    </View>
                <View style={{borderWidth:0.5,backgroundColor:'red',marginTop:10}}>
                <Text style={{fontSize:14,margin:10,alignSelf:'center',color:'white'}}>BOOK SLOT</Text>
                </View>
                    <View>
                        {
                            console.log(this.state.DArr)
                        }
                        <FlatList
                        data={this.state.DArr}
                        
                        horizontal={true}
                        renderItem={({item})=>{
                            return(
                            <View style={{width:80,height:60,borderWidth:0.5,margin:10}}>
                         
        
                            <Text style={{fontSize:20,alignSelf:'center',color:'black'}}>{item.date}</Text>
                            <Text style={{fontSize:20,alignSelf:'center',color:'black'}}>{item.day}</Text>
                            
                          
                            </View>
                       )
                    }}  
                    keyExtractor={(item,index) => index}/>
            
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',margin:15}}>
                        <View style={{width:30,height:30,borderWidth:0.5,margin:10}}>
                        
                        </View>
                        <View style={{margin:8}}>
                            <Text style={{fontSize:17,marginTop:3}}>Available</Text>
                        </View>
                        <View style={{width:30,height:30,borderWidth:0.5,margin:10,backgroundColor:'grey'}}>
                        
                        </View>
                        <View style={{margin:8}}>
                            <Text style={{fontSize:17,marginTop:3}}>Pending</Text>
                        </View>
                        <View style={{width:30,height:30,borderWidth:0.5,margin:10,backgroundColor:'green'}}>
                        
                        </View>
                        <View style={{margin:8}}>
                            <Text style={{fontSize:17,marginTop:3}}>Booked</Text>
                        </View>
                    </View>
                    <View >
                <FlatList
                numColumns={4}
                // horizontal={true}
                
                data={this.state.TimeArr}
                keyExtractor={(item,index) => index}  
                renderItem={({item})=>{return(
                    <View style={{width:90,borderWidth:1,margin:5}}>
                     <TouchableOpacity onPress={()=>this.setState({showMe2:!this.state.showMe2,value:item})}>

                    <Text style={{fontSize:14,margin:10,alignSelf:'center'}}>{item}</Text>
                    </TouchableOpacity>
                    
              
                    </View>
               )}}
                />
                <Modal visible={this.state.showMe2}
                      transparent={true}
                      animationType={'slide'}
                      onRequestClose={() => Console.warn("close filter")}>
                <View style={{ flex: 1, backgroundColor: 'rgba(20,20,20,0.5)',justifyContent:'center'}}>
                <View
                  style={{borderWidth:0.5,backgroundColor:'#fff',margin:10,height: 250, width: (Dimensions.get('window').width)-20, alignSelf: 'center'}}>

                  <View style={{ borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize:30,color:'red',margin:10}}>CONFIRM BLOCKINSLOT</Text>
                    
                  </View>
                  <View style={{ flexDirection: 'column',margin:20 }}>
                 
                  <Text style={{marginVertical:10}}>{new Date().toLocaleDateString()}</Text>
                  <Text>{this.state.value}</Text>
                    
                  </View>

                 <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:150,borderWidth:1,marginLeft:20}}>

                    <TouchableOpacity onPress={()=>this.setState({showMe2:false})}>

                    <Text style={{fontSize:20,alignSelf:'center',margin:10}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderRadius:10,borderWidth:1,backgroundColor:'black',marginHorizontal:30}}>

                    <TouchableOpacity onPress={()=>this.confirmBooking()} >

                    <Text style={{fontSize:20,alignSelf:'center',color:'white',margin:10}}>Book Now</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>

                </View>
              </Modal>
                </View>
                    </ScrollView>
            </View>
        )
    }
}