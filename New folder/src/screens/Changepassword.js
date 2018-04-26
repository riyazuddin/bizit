import React, { Component } from 'react';
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



export default class Changepassword extends Component {
  state = {
    user: '',
    Password: '',
    ConfirmPassword: '',
  }
  login() {
    const self = this;
    if (self.state.user === '') {
      Alert.alert('Please enter your old password')

    }
    else if (!Utils.isValidPassword(self.state.Password)) {
      Alert.alert('Please enter your Password')

    }
    else if (!Utils.isValidPassword(self.state.ConfirmPassword)) {
      Alert.alert('Confirm your Password')

    }
  }
  render() {
    return (
      <View>
        <View
          style={{ height: (Dimensions.get('window').height) / 7, width: Dimensions.get('window').width, borderBottomWidth: 0.5, justifyContent: 'center' }}>
          <Image style={{ height: 45, width: 90, alignSelf: 'center' }} source={require('../images/Nav-Logo.png')} />
        </View>

        <View>
          <Text style={{ fontSize: 15, color: 'red', alignSelf: 'center', marginTop: 20 }}>CHANGE YOUR PASSWORD</Text>

          <View style={{ borderWidth: 0.5, borderRadius: 20, marginLeft: 40, marginRight: 40, margin: 20 }}>
            <TextInput style={{ marginLeft: 10 }} placeholder='Old Password' underlineColorAndroid='transparent'
              value={this.state.user} onChangeText={(user) => this.setState({ user })} />
          </View>

          <View style={{ borderWidth: 0.5, borderRadius: 20, marginLeft: 40, marginRight: 40, margin: 20 }}>
            <TextInput style={{ marginLeft: 10 }} placeholder='New Password' underlineColorAndroid='transparent'
              value={this.state.Password} onChangeText={(Password) => this.setState({ Password })} />
          </View>

          <View style={{ borderWidth: 0.5, borderRadius: 20, marginLeft: 40, marginRight: 40, margin: 20 }}>
            <TextInput style={{ marginLeft: 10 }} placeholder='Confirm Password' underlineColorAndroid='transparent'
              value={this.state.ConfirmPassword} onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })} />
          </View>

          <TouchableOpacity onPress={() => this.login()}>
            <View style={{ borderRadius: 5, marginLeft: 40, marginRight: 40, margin: 20, backgroundColor: 'red' }}>
              <Text style={{ margin: 15, alignSelf: 'center', color: 'white' }}>SAVE CHANGES </Text>
            </View>
          </TouchableOpacity>


        </View>
      </View>
    );
  }
}
