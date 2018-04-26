import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';


export default class Sellerservices extends Component {
  state={
    data:[{name:'service 1',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 2',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 3',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 4',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 5',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 6',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'},{name:'service 7',timing:'09:00 AM to 12:30 PM',Duration:'Slot Duration 30 Mins'}]
  }
  renderservices(data){
    return(
      <View style={{height:120,width:Dimensions.get('window').width,flexDirection:'row',margin:10,borderWidth:0.5}} >
      <View style={{justifyContent:'space-around',flex:2,flexDirection:'column',marginLeft:30}} >
        <Text style={{color:'#e01c1d'}} >{data.name}</Text>
        <Text style={{color:'#000'}} >{data.timing}</Text>
        <Text style={{color:'#000'}} >{data.Duration}</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}} >
<TouchableOpacity onPress={()=>this.props.navigation.navigate('Addinfo',{data:data})} style={{height:40,width:80,backgroundColor:'#000',borderRadius:20,justifyContent:'center',alignItems:'center'}} >
        <Text style={{color:'#FFF'}} >EDIT</Text>
        </TouchableOpacity>
          </View>
        </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:40,width:Dimensions.get('window').width,alignItems:'center',flexDirection:'row',marginLeft:10}} >
        <Image style={{height:15,width:15,paddingLeft:10,paddingRight:10}} source={require('../images/Back.png')} />
        <Text style={{color:'#e01c1d',paddingLeft:10}} >All Services</Text>
          </View>
          <FlatList
                    vertical={true}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>this.renderservices(item)}
                    />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
