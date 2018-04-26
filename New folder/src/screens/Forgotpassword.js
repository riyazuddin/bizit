import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Utils from '../common/Utils';
export default class Forgotpassword extends Component{
state={
  Email:'',
}
forgot()
{
  const self=this;
  if(!Utils.isValidEmail(self.state.Email))
  {
  Alert.alert('Please enter Valid Email')
}
}
    render(){
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View 
                   style={{height:(Dimensions.get('window').height)/7, width:Dimensions.get('window').width,borderBottomWidth:0.5,justifyContent:'center'}}>
                   <Image style={{height:45,width:90,alignSelf:'center'}} source={require('../images/Nav-Logo.png')}/>
                </View>
                <View style={{justifyContent:'center'}}>
                   <Text style={{fontSize:15,margin:20,alignSelf:'center',color:'red'}}>FORGOT PASSWORD</Text>
                   <Text style={{fontSize:15,color:'black',textAlign:'center'}}>We just need your register email address to send you password reset </Text>
                  
                   <View style={{borderWidth:0.5,borderRadius:20,marginLeft:40,marginRight:40,margin:30}}>
                        <TextInput style={{marginLeft:10}} placeholder='E-mail address' underlineColorAndroid='transparent'
                        value={this.state.Email} onChangeText={(Email) => this.setState({Email})}/>
                   </View>
    
                   <TouchableOpacity onPress={()=>this.forgot()}>
                    <View style={{borderRadius:5,marginLeft:40,marginRight:40,backgroundColor:'#e01c1d'}}>
                        <Text style={{margin:15,alignSelf:'center',color:'white'}}>RESET PASSWORD </Text>
                    </View>
                    </TouchableOpacity>
                    
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30}}>
                    <Text style={{color:'black'}}>Don't have account? 0.
                    </Text>
                    <TouchableOpacity   onPress={()=>this.props.navigation.navigate('Signup')}>
                    <Text style={{color:'red',}}>SIGNUP</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}