import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Picker
} from 'react-native';
export default class BookingHistory extends Component{
   
  
   
    constructor(){
        super();
        this.state={
          category:'Slots',
          data:[{
            Image:'',Name:'Manoj Kumar Chenna',mobile:'0123456789',service:'Express cut',time:'10:30 AM', Image:''},
            {Image:'',Name:'Manoj Kumar Chenna',mobile:'0123456789',service:'Express cut',time:'10:30 AM', Image:''},
            {Image:'',Name:'Manoj Kumar Chenna',mobile:'0123456789',service:'Express cut',time:'10:30 AM', Image:''},
            {Image:'',Name:'Manoj Kumar Chenna',mobile:'0123456789',service:'Express cut',time:'10:30 AM', Image:''},
         ]
        }
      }
      booking(item){
        return(
            <View style={{borderWidth:1,borderRadius:10,flexDirection:'column',backgroundColor:'white',margin:15,padding:5,flexDirection:'row',justifyContent:'space-between'}}>
            <View>           
                <Image style={{height:50,width:50,margin:20}} source={require('../images/UserProfile.png')}/>             
            </View>
            <View style={{justifyContent:'center'}}>
            <Text>{item.Name}</Text>
            <Text>{item.mobile}</Text>
            <Text>{item.service}</Text>
            <Text>{item.time}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Image style={{height:40,width:40,margin:20,}}source={require('../images/Call.png')}/>
              </TouchableOpacity>
            </View>
            </View>
        )
    }
       onValueChange(key,value){
         console.log(key+':'+value);
         this.setState({category:value});
       }
    render(){
        return(
            <View>
              <View style={{height:(Dimensions.get('window').height)/13, width:Dimensions.get('window').width,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                    <Image style={{height:20,width:20,alignSelf:'center',marginLeft:15,margin:15}} source={require('../images/Back.png')}/>
                    </TouchableOpacity>
                    <Text style={{color:'red',fontSize:15,alignSelf:'center'}}>BookingHistory</Text>
                  </View>
                 
                <View style={{borderWidth:1,borderRadius:5,width:(Dimensions.get('window').width)/2.3,margin:5,marginRight:15}}>
                    <Picker selectedValue={this.state.category}
                        onValueChange={this.onValueChange.bind(this, 'category')}
                        prompt="category"
                        enabled={true}
                        mode="dropdown">
                        <item label="Canceled Slots" value="Canceled Slots"/>
                        <item label="Accepted Slots" value="Accepted Slots"/>
                       
                    </Picker>
                </View>
            </View>

            <FlatList
                    vertical={true}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>this.booking(item)}    
                    />

           </View>
        );
    }
}