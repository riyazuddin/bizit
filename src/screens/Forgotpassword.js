import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TextInput, Dimensions, Alert, TouchableOpacity, } from 'react-native';
import Utils from '../common/Utils';
import config from '../config/Config'
import styles from '../common/styles';

export default class Forgotpassword extends Component {
    state = {
        Email: 'dinesh.vignan4@gmail.com',
    }
    forgot() {
        const self = this;
        if (!Utils.isValidEmail(self.state.Email)) {
            Alert.alert('Please enter Valid Email')
        }
        else {
            Utils.dbCall(config.routes.ForgotPassword, 'POST', null, {
                email: self.state.Email,
            }, function (resp) {
                console.log(resp)
                if (resp.status) {
                    alert("Please Check your email for the mail to ressett the password");




                }
                else {
                    alert(resp.message);

                }
            });
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View
                    style={[styles.jCenter, styles.bBWidth, { height: (Dimensions.get('window').height) / 7, width: Dimensions.get('window').width, }]}>
                    <Image style={[styles.aslCenter, { height: 45, width: 90, }]} source={require('../images/Nav-Logo.png')} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.aslCenter, styles.FntS15, styles.m10, { color: 'red' }]}>FORGOT PASSWORD</Text>
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>We just need your register email address to send you password reset </Text>

                    <View style={[styles.bRad20, styles.bWidth, styles.m20, styles.mL40, styles.mR40]}>
                        <TextInput style={{ marginLeft: 10 }} placeholder='E-mail address' underlineColorAndroid='transparent'
                            value={this.state.Email} onChangeText={(Email) => this.setState({ Email })}
                        />
                    </View>

                    <TouchableOpacity onPress={() => this.forgot()}>
                        <View style={[styles.bRad5, styles.m15, styles.mL40, styles.mR40, { backgroundColor: 'red' }]}>
                            <Text style={[styles.m15, styles.aslCenter, { color: 'white' }]}>RESET PASSWORD </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.fdR, styles.jCenter, styles.aslCenter, styles.mT20]}>
                        <Text style={{ color: 'black' }}>Don't have account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={{ color: 'red', }}>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}