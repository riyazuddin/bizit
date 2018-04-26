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
import ImagePicker from 'react-native-image-picker';

export default class Profile extends Component{
  state={
    user:'',
    Password:'',
    ConfirmPass:'',
    Address:'',
    City:'',
    Mobile:'',
    Email:'',
    imageUploadBool:false,
    addPostImage:'',
  }
  UpdateProfile()
  {
    const self=this;
    if(self.state.user==='')
    {
      Alert.alert('Please enter your User Name')

    }
    else if(self.state.Address==='')

    {
      Alert.alert('Please enter your Address')
      
    }
    else if(self.state.City==='')
    {
      Alert.alert('Please enter your City')
      
    }
    else if(self.state.Mobile==='' || !Utils.isValidMobile(self.state.Mobile))
    {
      Alert.alert('Please enter your valid mobile number')
      
    }
    else if(!Utils.isValidEmail(self.state.Email))
    {
      Alert.alert('Please enter Valid Email')
      
    }
    else if(!Utils.isValidPassword(self.state.Password))
    {
      Alert.alert('Please enter your Password')
      
    }
    else if(!Utils.isValidPassword(self.state.Password) && self.state.Password!=self.state.ConfirmPass)
    {
      Alert.alert('Password and Confirm Password did not match');
      
    }


  }
  onPickImage() {
    const self=this;
    ImagePicker.showImagePicker(imgPickerOptions, response => {
      //console.warn(response)
      if (!response.didCancel && !response.error) {
        self.setState({ imageUploadBool: true });
      } else if (response.didCancel) {
        self.setState({ addPostImgUrl: '', addPostImage: '', imageUploadBool: false });
      } else {
        alert('Could not select image');
      }
    })
  } 
    render(){
        return(
          <ScrollView>
                <View style={{backgroundColor:'#fdeded',height:(Dimensions.get('window').height)/4, width:Dimensions.get('window').width,}}>
                <TouchableOpacity>
                  <Image style={{height:15,width:15,margin:15}}source={require('../images/User-Nav-Back.png')}/>
                </TouchableOpacity>
                  <View style={{justifyContent:'center',flexDirection:'column'}}>
                  <TouchableOpacity onPress={()=>this.onPickImage()} >
                    <Text style={{fontSize:15,alignSelf:'center',marginLeft:20,backgroundColor:'red'}}>Cam</Text>
                  </TouchableOpacity>
                    <Image style={{height:60,width:60,alignSelf:'center'}} source={require('../images/UserProfile.png')}/>
                    <Text style={{color:'black',fontSize:14,alignSelf:'center',marginTop:10}}>Manoj Kumar Chenna</Text>
                  </View>
                </View>
                   
                <View>
                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='User Name'
                     value={this.state.user} onChangeText={(user) => this.setState({user})}
                                   
                     />
                  </View>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='Address'
                     value={this.state.Address} onChangeText={(Address) => this.setState({Address})}
                     
                     />
                  </View>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='City'
                     value={this.state.City} onChangeText={(City) => this.setState({City})}
                     
                     />
                  </View>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='Mobile'
                     value={this.state.Mobile} onChangeText={(Mobile) => this.setState({Mobile})}cd 
                     
                     />
                  </View>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='E-mail'
                     value={this.state.Email} onChangeText={(Email) => this.setState({Email})}
                     
                     />
                  </View>

                     <Text style={{fontSize:15,color:'black',margin:5,marginLeft:20,}}>Change Password</Text>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='New Password'
                     value={this.state.Password} onChangeText={(Password) => this.setState({Password})}
                     
                     />
                  </View>

                  <View style={{borderWidth:0.5,margin:12,borderRadius:20}}>
                     <TextInput style={{padding:8,marginLeft:8}} underlineColorAndroid='transparent' placeholder='Confirm Password'
                     value={this.state.ConfirmPass} onChangeText={(ConfirmPass) => this.setState({ConfirmPass})}
                     
                     />
                  </View>

                <TouchableOpacity onPress={()=>this.UpdateProfile()}>
                  <View style={{width:(Dimensions.get('window').width)/3.5,borderRadius:20,backgroundColor:'#e01c1d',margin:20,alignSelf:'center'}}>
                  <Text style={{fontSize:15,margin:10,color:'white',alignSelf:'center'}}>UPDATE</Text>
                  </View>
                  </TouchableOpacity>
          </View>
        </ScrollView>

        );
    }
}
const imgPickerOptions = {
  title: 'Select image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  maxWidth: 1024,  
  maxHeight: 512,
  // maxWidth: 200,
  // maxHeight: 220,
  quality: 1,
  noData: true
 };