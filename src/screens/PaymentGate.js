import React, {Component} from 'react';
import {View,Image,TouchableOpacity,Dimensions} from 'react-native'
export default class PaymentGate extends Component{
    render()
    {
        return(
        <View style={{backgroundColor:'white',justifyContent:'center',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('PaySuccess')}>
            <Image resizeMode='contain' source={require('../images/paypal.png')} style={{height:200,alignSelf:'center',width:200,marginTop:12,marginHorizontal:10,}} />
        </TouchableOpacity>
        </View>
        
        )
    }
}