import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity,ToastAndroid
} from 'react-native';
import Utils from '../common/Utils';
import Config from '../config/Config';
import styles from '../common/styles';
import { CText, CInput,CButton,CSpinner } from '../common/index';
export default class Login extends Component {
    state = {
        //  user: '',
        //  Password: '',
        // user: 'dinesh.vignan4@gmail.com',
        // Password: '123456789',
        user: 'dinesh.dk@mtwlabs.com',
        Password: 'dinesh8142',
        type: '',
        spinnerBool:false,
    }
    spinnerLoad() {
        //console.log('spinner');
        if (this.state.spinnerBool)
          return <CSpinner />;
        return false;
      }

    submitLogin() {
        const self = this;
        if (self.state.user === '') {
            Alert.alert('Please enter your User Name')

        }
        else if (!Utils.isValidPassword(self.state.Password)) {
            Alert.alert('Please enter your Password')

        }
        else {
            self.setState({spinnerBool:true})
            console.log(self.state.user, self.state.Password)
            Utils.dbCall(Config.routes.Login, 'POST', null, { email: self.state.user, password: self.state.Password, }, function (resp) {
                console.log(resp)
                if (resp.status) {
                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
                    self.setState({spinnerBool:false})
                    Utils.setToken('user', resp.data, function(tResp,tStat){
                        if(tStat){
                          console.log('status',tStat)
                          console.log('resp',tResp)
                        
                          }
                    });
                    if (resp.data.role === 'client') {
                        self.props.navigation.navigate('BuyerHome');

                    }

                    else if (resp.data.role === 'businessOwner') {
                        self.props.navigation.navigate('Businesshome')
                        // self.props.navigation.navigate('BuyerHome');
                        

                    }
                }
                else {
                    self.setState({spinnerBool:false})
                    alert(resp.message);
                }
            });
        }
    }

    render() {
        return (
            <View style={[styles.bwhite, { flex: 1 }]}>
            {this.spinnerLoad()}
                <View
                    style={[styles.jCenter, styles.bBWidth, { height: (Dimensions.get('window').height) / 7, width: Dimensions.get('window').width, }]}>
                    <Image style={[styles.aslCenter, { height: 45, width: 90, }]} source={require('../images/Nav-Logo.png')} />
                </View>

                <View>
                    <CText cStyle={[styles.aslCenter, styles.FntS15, styles.mT10, styles.red]}>USER LOGIN</CText>


                    <View style={[styles.bRad20, styles.m20, styles.bWidth, styles.mL40, styles.mR40]}>
                        <CInput cStyle={[styles.mL10]} placeholder='User Name' underlineColorAndroid='transparent'
                            value={this.state.user} onChangeText={(user) => this.setState({ user })} />
                    </View>

                    <View style={[styles.bRad20, styles.m20, styles.bWidth, styles.mL40, styles.mR40]}>
                        <CInput cStyle={[styles.mL10]} placeholder='Password' underlineColorAndroid='transparent' secureTextEntry={true}
                            value={this.state.Password} onChangeText={(Password) => this.setState({ Password })} />
                    </View>

                    <CButton onPress={() => this.submitLogin()}>
                        <View style={[styles.bRad5, styles.m20, styles.mL40, styles.mR40, styles.bred]}>
                            <CText cStyle={[styles.m15, styles.aslCenter, styles.white]}>Login </CText>
                        </View>
                    </CButton>

                    <CButton>
                        <View style={[styles.bWidth, styles.bRad20, styles.mL40, styles.mR40, styles.m20, styles.fdR, styles.jCenter]}>
                            <Image style={[{ height: 30, width: 30 }, styles.aslCenter]} source={require('../images/Google.png')} />
                            <CText cStyle={[styles.FntS14, styles.m15, styles.aslCenter, styles.red]}> Signup with Google </CText>
                        </View>
                    </CButton>

                    <View style={[styles.fdR, styles.jCenter, styles.aslCenter, styles.mT20]}>
                        <CText style={[styles.black]}>Don't have account? </CText>
                        <CButton onPress={() => this.props.navigation.navigate('Signup')}>
                            <CText cStyle={[styles.red]}>SIGNUP</CText>
                        </CButton>
                    </View>
                </View>
            </View>
        );
    }
}