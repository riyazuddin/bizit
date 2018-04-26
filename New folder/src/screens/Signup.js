import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Switch,
    Dimensions,
    Picker
} from 'react-native';
import Utils from '../common/Utils';

export default class Signup extends Component {
    state={
        bool:'none',
        svalue:false,
        picker:['Business Type 1','Business Type 2','Business Type 3','Business Type 4','Business Type 5'],
        Username:'',
        phno:null,
        mail:'',
    }
    display(value){
           if(value){
               this.setState({
                   bool:'flex',
                   svalue:true
               });
           }else{
            this.setState({
                bool:'none',
                svalue:false
            });
           } 
    }
    Pickerdata(){
        let arr=[];
        for(i=0;i<this.state.picker.length;i++){
            arr.push(
                <Picker.Item label={this.state.picker[i]} value='' />
            );
        }
        return(arr);
    }
    validate(){
        const self=this;
        if(self.state.Username==''){
            alert("Please enter a username");
        }else if(!Utils.isValidMobile(self.state.phno)&& !Utils.isValidMobile(Number(self.state.phno))){
            alert("Please enter a valid mobile number");
        }else if(!Utils.isValidEmail(self.state.mail)){
  alert('Please enter Valid Email');
        }
        else{
            this.props.navigation.navigate('Login',{status:this.state.svalue===false?'USER':'OWNER'})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, width: Dimensions.get("window").width, borderBottomWidth: 3, borderBottomColor: '#efefef' }}>
                    <Image style={{ height: 40, width: 80 }} source={require('../images/Nav-Logo.png')} />
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: '#e01c1d', fontSize: 17, marginBottom: 10, marginTop: 15 }} >{this.state.svalue===false?'USER':'OWNER'} SIGNUP</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10 }} >
                            <Text style={{ color: "#000", fontSize: 19 }} >CLIENTS</Text>
                            <Switch style={{ marginLeft: 10, marginRight: 10 }} onTintColor="#000" tintColor="#000" thumbTintColor="#e01c1d" onValueChange={(value) => this.display(value)}
                                value={this.state.svalue}/>
                            <Text style={{ color: "#000", fontSize: 19 }}>BUSINESS OWNERS</Text>
                        </View>
                        <View>
                            <View style={{ margin: 10 }} >
                                <TextInput placeholder='User Name' onChangeText={(value)=>this.setState({Username:value})} style={{ paddingLeft: 10, paddingRight: 10, width: 300, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ margin: 10 }} >
                                <TextInput placeholder='Mobile Number' onChangeText={(value)=>this.setState({phno:value})} style={{ paddingLeft: 10, paddingRight: 10, width: 300, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ margin: 10 }} >
                                <TextInput placeholder='Email Id' onChangeText={(value)=>this.setState({mail:value})} style={{ paddingLeft: 10, paddingRight: 10, width: 300, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ display:this.state.bool, margin: 10,borderWidth: 0.5,borderRadius: 25 }} >
                                <Picker style={{paddingLeft: 10, paddingRight: 10, width: 300, height: 40, borderWidth: 0.5, borderRadius: 25 }} >
                                {this.Pickerdata()}
                                </Picker>
                            </View>
                            <TouchableOpacity onPress={()=>this.validate()} >
                                <View style={{ borderRadius: 10, marginLeft: 15, marginRight: 15, margin: 20, backgroundColor: '#e01c1d' }}>
                                    <Text style={{ margin: 15, fontSize: 17, alignSelf: 'center', color: 'white' }}>SIGNUP </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ padding: 5, paddingLeft: 20, paddingRight: 20 }} >
                                <Text style={{ fontSize: 17, color: '#000' }} >Accept Terms</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ padding: 5, paddingLeft: 20, paddingLeft: 20 }}  onPress={()=>this.props.navigation.navigate('Forgotpassword')}>
                                <Text style={{ fontSize: 17, color: '#000' }}>Forget Password</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <View style={{ borderWidth: 0.5, borderRadius: 20, marginLeft: 40, marginRight: 40, margin: 20, flexDirection: 'row', justifyContent: 'center' }}>
                                <Image style={{marginLeft:10, height: 30, width: 30, alignSelf: 'center' }} source={require('../images/Google.png')} />
                                <Text style={{ fontSize: 17, margin: 15, alignSelf: 'center', color: 'red', alignSelf: 'center' }}>Signup with Google</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <Text style={{ color: 'black' }}>I have an account. </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login',{status:this.state.svalue===false?'USER':'OWNER'})}>
                                <Text style={{ color: 'red', }}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

