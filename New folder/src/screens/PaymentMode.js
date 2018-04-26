import React, {Component} from 'react';
import {View,Text,ScrollView,Button,TouchableOpacity,FlatList,Image,Dimensions,Modal,TextInput} from 'react-native';
export default class PaymentMode extends Component{
    state={
        showMe:false,
        TIME:'',
        payvisible:'none',
        otheramount:'none',
        payamount:'',
        OAmount:''
    }
    componentWillMount()
    {
        const self=this;
        self.setState({TIME:self.props.navigation.state.params.selectedtime})

    }
    AmountValid()
    {
        const self=this;
        if(self.state.payamount!='')
        {
            self.props.navigation.navigate('PaymentGate')
            
        }
        else{
            alert('please enter payable amount')
        }
    }
render(){
    return(
        <View style={{flex:1}}>
        <View style={{justifyContent:'space-between',flexDirection: 'row',margin:11}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'flex-start'}}>
               <Image resizeMode='contain' source={require('../images/Nav-Back.png')} style={{height:17,width:11,marginTop:12,marginHorizontal:10,alignSelf:'flex-start'}} />
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
           
               <Image resizeMode='contain' source={require('../images/Wishlist1.png')} style={{height:25,width:25,alignSelf:'center',marginTop:5}} />
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
          
          
           </View>
         
           <View style={{backgroundColor:'white'}}>
               <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:18,marginTop:10,marginHorizontal:20,color:'black'}}>Studio A Hair Salon</Text>
                    <Text style={{fontSize:16,marginTop:10}}>Hair Dressing</Text>
               </View>
               <View style ={{flexDirection:'row',marginHorizontal:20,marginTop:10}} >
                    <Text style={{fontSize:16,marginRight:5}}>(Mon-Sat)</Text>
                    <Text style={{fontSize:16,marginLeft:8}}>9:00AM to 7:00PM</Text>
               </View>

               <View style={{ flex: 1, backgroundColor: 'white',justifyContent:'center',margin:10}}>
                <View
                  style={{borderWidth:1,borderColor:'black',borderLeftColor:'black',borderRadius:10,backgroundColor:'#fff',margin:10,height: this.state.payvisible==='flex'?500:250, width: (Dimensions.get('window').width)-20, alignSelf: 'center'}}>

                 
                  <View style={{ flexDirection: 'column',margin:20 }}>
                  <Text style={{fontSize:16,color:'red',marginVertical:10}}>Sent Request To Book a Slot</Text>
                  
                 <View style={{flexDirection:'row',marginVertical:10}}>
                 <Image style={{height:20,width:20,marginLeft:5,margin:5}} source={require('../images/Sent-Request-Calendar.png')}/>
                  <Text style={{margin:5,fontSize:14}}>{new Date().toLocaleDateString()}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:10}}>
                 <Image style={{height:20,width:20,marginLeft:5,margin:5}} source={require('../images/Sent-Request-Time.png')}/>
                  <Text style={{margin:5,fontSize:14}}>{this.state.TIME}</Text>
                  </View>
                    
                  </View>

                 <View style={{flexDirection:'row',}}>
                <View style={{borderRadius:150,borderWidth:1,marginLeft:20}}>

                    <TouchableOpacity>

                    <Text style={{fontSize:16,alignSelf:'center',margin:10}}>PAY AT LOCATION</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderRadius:150,borderWidth:1,backgroundColor:'black',marginLeft:20}}>

                    <TouchableOpacity onPress={()=>this.setState({payvisible:'flex'})}  >

                    <Text style={{fontSize:16,alignSelf:'center',color:'white',marginTop:10,marginHorizontal:25}}>PAY NOW</Text>
                    </TouchableOpacity>
                </View>
                
                </View>
                <View 
                display={this.state.payvisible}
                style={{ flex: 1, backgroundColor:'white',justifyContent:'center'}}>
                <View
                  style={{borderWidth:0.5,backgroundColor:'#fff',borderColor:'black',margin:10,height: 250, width: (Dimensions.get('window').width)-20, alignSelf: 'center'}}>

                  <View style={{ borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between',borderColor:'black'}}>
                    
                  </View>
                  <View style={{ flexDirection: 'column',margin:20,justifyContent:'center' }}>
                 
                  <Text style={{marginLeft:15,marginBottom:5,color:'red',fontSize:16}} >Total amount ₹5000 </Text>
                    <TextInput
                    underlineColorAndroid='transparent'
                    value={this.state.payamount} onChangeText={(payamount) => this.setState({payamount})}

                    style={{borderRadius:120,borderWidth:0.5,marginLeft:20,marginTop:3, width:250,bottom:5,backgroundColor:'white'}}></TextInput>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{marginLeft:15,marginRight:6,color:'red',fontSize:16}}>Other Amount</Text>
                        <TouchableOpacity onPress={()=>this.setState({otheramount:'flex'})}>
                        <View style={{height:30,width:30,borderWidth:1,borderRadius:30,backgroundColor:'red',justifyContent:'center',borderColor:'white',marginRight:30}}>
                            <Text style={{alignSelf:'center',fontSize:18,color:'white'}}>+</Text>
                        </View>
                        </TouchableOpacity>
                        
                    </View>
                    <View display={this.state.otheramount}>
                        <TextInput
                     underlineColorAndroid='transparent'
                    value={this.state.OAmount} onChangeText={(OAmount) => this.setState({OAmount})}
                     
                     style={{borderRadius:120,borderWidth:0.5,marginLeft:20,marginTop:3, width:250,bottom:5,backgroundColor:'white'}}></TextInput>
                        </View>
                        <View style={{borderRadius:150,borderWidth:1,backgroundColor:'black',marginLeft:25,width:150,marginTop:8}}>

                            <TouchableOpacity onPress={()=>this.AmountValid()} >

                            <Text style={{fontSize:16,color:'white',marginTop:10,alignSelf:'center',marginBottom:5}}>CLICK TO PAY</Text>
                            </TouchableOpacity>
                        </View>
                  </View>

                </View>

                </View>
                </View>

                </View>



              
           </View>
           </ScrollView>
   </View>        )
            }
        }