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
import Utils from '../common/Utils'
export default class Login extends Component{
state={
    user:'rugfudsvcsv',
    Password:'ccugsdiucgs',
    }

login()
{
const self=this;
if(self.state.user==='')
{
    Alert.alert('Please enter your User Name')

}
else if(!Utils.isValidPassword(self.state.Password))
{
  Alert.alert('Please enter your Password')
  
}
else{
    if(self.props.navigation.state.params.status === 'USER'){
        self.props.navigation.navigate('BuyerHome');
    }else{
        self.props.navigation.navigate('Businesshome');
    }
}
}
    render(){
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <View 
                style={{height:(Dimensions.get('window').height)/7, width:Dimensions.get('window').width,borderBottomWidth:0.5,justifyContent:'center'}}>
                   <Image style={{height:45,width:90,alignSelf:'center'}} source={require('../images/Nav-Logo.png')}/>
                </View>

               <View>
                    <Text style={{fontSize:15,color:'red',alignSelf:'center',marginTop:20}}>{this.props.navigation.state.params.status} LOGIN</Text>
                    

                    <View style={{borderWidth:0.5,borderRadius:20,marginLeft:40,marginRight:40,margin:20}}>
                        <TextInput style={{marginLeft:10}} placeholder='User Name' underlineColorAndroid='transparent'
                         value={this.state.user} onChangeText={(user) => this.setState({user})}/>
                    </View>

                    <View style={{borderWidth:0.5,borderRadius:20,marginLeft:40,marginRight:40,margin:20}}>
                        <TextInput style={{marginLeft:10}} placeholder='Password' underlineColorAndroid='transparent' secureTextEntry={true}
                         value={this.state.Password} onChangeText={(Password) => this.setState({Password})}/>
                    </View>

                    <TouchableOpacity onPress={()=>this.login()}>
                    <View style={{borderRadius:5,marginLeft:40,marginRight:40,margin:20,backgroundColor:'red'}}>
                        <Text style={{margin:15,alignSelf:'center',color:'white'}}>Login </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                    <View style={{borderWidth:0.5,borderRadius:20,marginLeft:40,marginRight:40,margin:20,flexDirection:'row',justifyContent:'center'}}>
                        <Image style={{height:30,width:30,alignSelf:'center'}}source={require('../images/Google.png')}/>
                        <Text style={{fontSize:14,margin:15,alignSelf:'center',color:'red',alignSelf:'center'}}>Signup with Google</Text>
                    </View>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <Text style={{color:'black'}}>Don't have account? </Text>
                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Signup')}>
                    <Text style={{color:'red',}}>SIGNUP</Text>
                    </TouchableOpacity>
                    </View>
               </View>
            </View>
        );
    }
}