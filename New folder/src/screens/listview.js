import React, { Component } from 'react';

import {Dimensions,TouchableOpacity,Image,FlatList,Text,View,StyleSheet,Platform} from 'react-native';

export default class listview extends Component {

    constructor(props)
    {
      super(props);
    
      this.state = { GridViewItems: [
        {key: 'One'},
        {key: 'Two'},
        {key: 'Three'},
        {key: 'Four'},
        {key: 'Five'},
        {key: 'Six'},
        {key: 'Seven'},
        {key: 'Eight'},
        {key: 'Nine'},
        {key: 'Ten'},
        {key: 'Eleven'},
        {key: 'Twelve'},
        {key: 'Thirteen'},
        {key: 'Fourteen'},
        {key: 'Fifteen'},
        {key: 'Sixteen'},
        {key: 'Seventeen'},
        {key: 'Eighteen'},
        {key: 'Nineteen'},
        {key: 'Twenty'}
      ]}
    }
    
    GetGridViewItem (item) {
     
alert(item);
    
    }
    
    

render() {
  return (
<View>
        <View style={{height:(Dimensions.get('window').height)/13, width:Dimensions.get('window').width,backgroundColor:'black',flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity>
                <Image style={{height:20,width:20,alignSelf:'center',marginLeft:15,margin:15}} source={require('../images/Back-White.png')}/>
                </TouchableOpacity>
                <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>Sales History</Text>
            </View>
        </View>
        
        <View style={{marginBottom:20}}>
            <Text style={{color:'black',fontSize:14,margin:20}}>Select Date</Text>
            <View style={{flexDirection:'row'}}>
                <View style={{borderWidth:1,borderRadius:20,flexDirection:'row',marginLeft:20}}>
                    <Text style={{margin:10}}>From Date</Text>
                    <TouchableOpacity>
                    <Image style={{height:20,width:20,margin:10}} source={require('../images/Booked-Slot-Calendar.png')}/>
                    </TouchableOpacity>
                </View>
               <View style={{borderWidth:1,borderRadius:20,flexDirection:'row',marginLeft:20}}>
                    <Text style={{margin:10}}>To Date</Text>
                    <TouchableOpacity>
                    <Image style={{height:20,width:20,margin:10}} source={require('../images/Booked-Slot-Calendar.png')}/>
                    </TouchableOpacity>
               </View>
            <TouchableOpacity>
            <View style={{borderRadius:20,backgroundColor:'black',marginLeft:20}}>
               <Text style={{color:'white',margin:10,alignSelf:'center'}}>GO</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
      

       
 
      <FlatList margin={15}
      
         data={ this.state.GridViewItems }
 
         renderItem={({item}) =><View style={styles.GridViewBlockStyle}>
 
            <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
            
            </View>}
 
         numColumns={5}
 
        />
   
   
</View>
     
  );
}
}
const styles = StyleSheet.create({
    
  
   GridViewBlockStyle: {
    
     justifyContent: 'center',
     flex:1,
     alignItems: 'center',
     height: 50,
     borderWidth:1,
    
   }
   ,
    
   GridViewInsideTextItemStyle: {
    
      color: 'black',
      padding: 15,
      fontSize: 14,
      justifyContent: 'center',
      
    },
    
   });
