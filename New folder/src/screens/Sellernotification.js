import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
export default class Sellernotification extends Component{
    state = {
        data: [{Name:'Manoj Kumar Chenna',mobile:'0123456789',service:'Express Cut',duration:'9:00AM to 10:00Am'},
        {Name:'Naik',mobile:'0123456789',service:'Express Cut',duration:'9:00AM to 10:00Am'},
        {Name:'Janardhan V',mobile:'0123456789',service:'Express Cut',duration:'9:00AM to 10:00Am'}]
    }
    renderseller(item){
        return(
            <View style={{borderWidth:1,borderRadius:10,flexDirection:'column',margin:15,padding:10}}>
            <View style={{margin:5,marginLeft:20,justifyContent:'space-between'}}>
                <Text>{item.Name}</Text>
                <Text>{item.mobile}</Text>
                <Text>{item.service}</Text>
                <Text>{item.duration}</Text>
            </View>
                <View style={{flexDirection:'row',margin:10,marginLeft:20}}>
                <TouchableOpacity>
                    <View style={{borderWidth:1,borderRadius:20,}}>
                    <Text style={{margin:8,alignSelf:'center',}}>CANCEL </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('BookingHistory')} >
                    <View style={{borderWidth:1,borderRadius:20,backgroundColor:'black',marginLeft:10}}>
                    <Text style={{margin:8,alignSelf:'center',color:'white',}}>ACCEPT </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    render(){
        return(
            <View>
                 <View 
                 style={{height:(Dimensions.get('window').height)/13, width:Dimensions.get('window').width,backgroundColor:'white',flexDirection:'row'}}>
                    <TouchableOpacity>
                    <Image style={{height:20,width:20,alignSelf:'center',marginLeft:10,margin:15}} source={require('../images/Nav-Back.png')}/>
                    </TouchableOpacity>
                <Text style={{color:'red',fontSize:15,alignSelf:'center'}}>REQUESTED SLOTS</Text>
                </View>
               
                <FlatList
                    vertical={true}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>this.renderseller(item)}    
                    />

            </View>
        );
    }
}