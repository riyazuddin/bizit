import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
export default class Bookedslots extends Component{
    state = {
        data: [{Image:'',title:'Studio Hair salon',service:'Hair Dressing',day:'Mon-sat',duration:'9:00AM to 7:00PM',price:'5000',
            slotdetails:'Booked slot details',date:'10/1/2018',time:'10:30 AM'},
            {Image:'',title:'Studio Hair salon1',service:'Hair shower',day:'Mon-sat',duration:'3:00AM to 4:30PM',price:'5000',
            slotdetails:'Booked slot details',date:'2/1/2018',time:'11:00 AM'},
            {Image:'',title:'Studio Hair salon2',service:'Hair Cutting',day:'Mon-sat',duration:'5:00 AM to 7:20PM',price:'5000',
            slotdetails:'Booked slot details',date:'12/1/2018',time:'12:30 AM'},
            {Image:'',title:'Studio Hair salon3',service:'face facisal',day:'Mon-sat',duration:'8:00AM to 9:00PM',price:'5000',
            slotdetails:'Booked slot details',date:'22/1/2018',time:'11:25 AM'}
        ]
      };
      renderSlot(item){
         
        return(
            <View style={{backgroundColor:'#ffffff',justifyContent:'space-between',flexDirection:'row',margin:10,borderWidth:0.5,borderRadius:5,
            
            shadowOffset: { width: 5, height: 5 },  
            shadowColor: '#e1e1e1',  
            shadowOpacity: 1,  
            elevation: 3}}>
             <View style={{flex:1,backgroundColor:'#ffffff',justifyContent:'space-between',flexDirection:'column',marginLeft:20,padding:5}}>
                    <Image style={{height:20,width:40}}source={require('../images/Nav-Logo.png')} />
                    <Text style={{color:'red'}}>{item.title}
                    </Text>
                    <Text>{item.service}
                    </Text>
                    <Text>{item.day}
                    </Text>
                    <Text>{item.duration}
                    </Text> 
                </View>
                <View style={{alignItems:'flex-start',height:130,flex:1,backgroundColor:'pink',justifyContent:'space-around',flexDirection:'column',padding:5}}>
                    <Text style={{color:'red',marginLeft:5}}>{item.price}
                    </Text>
                    <Text style={{marginLeft:5}}>{item.slotdetails}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Image style={{height:15,width:15,marginLeft:5}}source={require('../images/Booked-Slot-Calendar.png')}/>
                    <Text style={{marginLeft:5}}>{item.date}
                    </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Image style={{height:15,width:15,marginLeft:5}}source={require('../images/Booked-Slot-Time.png')}/>
                    <Text style={{marginLeft:5}}>{item.time}
                    </Text>
                    </View>
                </View>
                
            </View>)
      }
    render(){
        return(
            <View>
                <View 
                 style={{height:(Dimensions.get('window').height)/13, width:Dimensions.get('window').width,backgroundColor:'black',flexDirection:'row'}}>
                    <TouchableOpacity>
                    <Image style={{height:20,width:20,alignSelf:'center',marginLeft:10,margin:15}} source={require('../images/Back-White.png')}/>
                    </TouchableOpacity>
                <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Booked Slots History</Text>
                </View>
               
              
                <FlatList
                    vertical={true}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>this.renderSlot(item)}    
                    />
       
              
            </View>
        );
    }
}
