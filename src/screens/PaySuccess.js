import React, {Component} from 'react';
import {View,Image,TouchableOpacity,Dimensions,Text} from 'react-native'
export default class PaySuccess extends Component{
    render()
    {
        return(
        <View style={{backgroundColor:'white',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ShopDetails')}>
                <Image resizeMode='contain' source={require('../images/Close_Pop.png')} style={{height:20,alignSelf:'flex-end',marginTop:10,width:20,marginRight:10}} />
            </TouchableOpacity>  
            <View style={{justifyContent:'center',marginTop:80}}>
                <Image resizeMode='contain' source={require('../images/Payment-Succes.png')} style={{height:100,alignSelf:'center',width:100,marginTop:12,marginHorizontal:10,}} />
                <Text style={{fontSize:30,alignSelf:'center',marginHorizontal:10,color:'green',marginTop:5,marginBottom:20}}>PAYMENT SUCCESS</Text>
                <Text style={{fontSize:25,alignSelf:'center',marginHorizontal:10,color:'black'}}>Your Transaction  is Proceessed</Text>
                <Text style={{fontSize:25,alignSelf:'center',marginHorizontal:18,color:'black'}}>Successfully</Text>
            </View>
        </View>
        )
    }
}