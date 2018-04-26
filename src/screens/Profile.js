import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TextInput, Dimensions, Alert, TouchableOpacity, } from 'react-native';
import Utils from '../common/Utils';
import ImagePicker from 'react-native-image-picker';
import Header2 from '../common/Header2'
import config from '../config/Config';
import styles from '../common/styles';
import { CText,CInput } from '../common/index'
export default class Profile extends Component {
  state = {
    user: '',
    Password: '',
    ConfirmPass: '',
    Address: 'Plot no. 3-97, 3rd Floor, Megha Hills, Ayyappa Society, Madhapur, Hyderabad, 500081',
    City: 'Hyderabad',
    Mobile: '',
    Email: '',
    imageUploadBool: false,
    addPostImage: '',
    token: '',
    userId: '',
    oldPassword: 'dinesh8142',
    profileimg: require('../images/User-Nav-Profile-Pic.png'),
  }
  componentDidMount() {
    const self = this;

    Utils.getToken('user', function (tResp, tStat) {
      console.log(tResp, 'tResp');
      console.log(tStat, 'tStat');
      if (tResp != '') {
        console.log('token:  ' + tResp.token)
        self.setState({ token: tResp.token, user: tResp.userName, Mobile: JSON.stringify(tResp.mobile), Email: tResp.email, userId: tResp._id }, () => { console.log('token in Prrofile', self.state.token); });
        Utils.dbCall(config.routes.getProfileDetailswithImage, 'GET', { token: tResp.token }, {}, function (resp) {
          console.log(resp)
          if (resp.status) {
            let profile = { uri: 'http://192.168.1.87:4000/api/v1.0/user/profile/' + resp.data.userImage }
            self.setState({ profileimg: profile },
              () => { console.log("hhhhh", self.state.profileimg) })


            // self.setState({profileimg:'http://192.168.1.87:4000/api/v1.0/user/profile/'+resp.userImage},()=>{console.log()})
          }

        });

      }
    });
    // Utils.dbCall(config.routes.getProfileDetailswithImage, 'GET', { token: self.state.token.toString() }, {}, function (resp) {
    //   console.log(resp)
    //   if (resp.status) {
    //   }

    // });

  }
  UpdateProfile() {
    const self = this;
    // if (self.state.user === '') {
    //   Alert.alert('Please enter your User Name')

    // }
    // else if (self.state.Address === '') {
    //   Alert.alert('Please enter your Address')

    // }
    // else if (self.state.City === '') {
    //   Alert.alert('Please enter your City')

    // }
    // else if (!Utils.isValidNumber(self.state.Mobile) && !Utils.isValidMobile(Number(self.state.Mobile))) {
    //   Alert.alert('Please enter your valid mobile number')

    // }
    // else if (!Utils.isValidEmail(self.state.Email)) {
    //   Alert.alert('Please enter Valid Email')

    // }
    // else if (!Utils.isValidPassword(self.state.Password)) {
    //   Alert.alert('Please enter your Password')

    // }
    // else if (!Utils.isValidPassword(self.state.Password) && self.state.Password != self.state.ConfirmPass) {
    //   Alert.alert('Password and Confirm Password did not match');

    // }
    if (self.state.profileimg === '' && self.state.profileimg === undefined) {
      alert('please select an image')
    }
    else {
      console.log(self.state.profileimg)
      Utils.dbCall(config.routes.profileUpdate + self.state.userId, 'PUT', { token: self.state.token.toString() }, {

        // oldpassword: self.state.oldPassword,
        // password: self.state.Password,
        // cPassword: self.state.ConfirmPass
        // userName:self.state.user,
        // mobile:self.state.Mobile
        userImage: self.state.profileimg

      }, function (resp) {
        console.log(resp)
        if (resp.status) {
          alert('Your Profile was Updated Successfully')
        }

      });
    }
  }

  onPickImage() {
    const self = this;
    ImagePicker.showImagePicker(imgPickerOptions, response => {
      console.warn(response)
      if (!response.didCancel && !response.error) {
        let source = { uri: 'data:image/png;base64,' + response.data };
        self.setState({ profileimg: source })
      } else if (response.didCancel) {
        self.setState({ profileimgurl: '', profileimg: '', });
      } else {
        alert('Could not select image');
      }
    })
  }


  render() {
    return (
      <View style={[styles.bwhite,{ flex: 1 }]}>
        <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
          height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} />
        <ScrollView>
          <View style={[styles.bpink,{ height: (Dimensions.get('window').height) / 4, width: Dimensions.get('window').width, }]}>
            <TouchableOpacity>
              <Image style={[styles.m15,{ height: 15, width: 15 }]} source={require('../images/User-Nav-Back.png')} />
            </TouchableOpacity>
            <View style={[styles.jspacebn,styles.fdC]}>
              <View>

                <Image style={[styles.bRad30,styles.aslCenter,{ height: 60, width: 60, position: 'absolute', }]}
                  source={this.state.profileimg} />
                <TouchableOpacity onPress={() => this.onPickImage()} >
                  <Image style={[styles.aslCenter, styles.mL50, { height: 30, width: 30 }]} source={require('../images/cma.png')} />
                </TouchableOpacity>
              </View>
              <CText cStyle={[styles.FntS14, styles.aslCenter, styles.mT40,styles.black]}>Manoj Kumar Chenna</CText>
            </View>
          </View>

          <View>
            <CText cStyle={[styles.black,styles.mL20,styles.m5,styles.mT15]}>User Name</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='User Name'
                value={this.state.user} onChangeText={(user) => this.setState({ user })}

              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>Address</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='Address'
                value={this.state.Address} onChangeText={(Address) => this.setState({ Address })}
                multiline={true}
              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>City</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='City'
                value={this.state.City} onChangeText={(City) => this.setState({ City })}

              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>Mobile</CText>
            <View style={[styles.bWidth, styles.m15, styles.mT5,styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='Mobile'
                value={this.state.Mobile} onChangeText={(Mobile) => this.setState({ Mobile })}

              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>Email</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='E-mail'
                value={this.state.Email} onChangeText={(Email) => this.setState({ Email })}


              />
            </View>

            <CText cStyle={[styles.FntS15, styles.m5, styles.mL20,styles.red,styles.FntS15]}>Change Password</CText>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>Old Password</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='Old Password'
                value={this.state.oldPassword} onChangeText={(oldPassword) => this.setState({ oldPassword })}

              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>New Password</CText>
            <View style={[styles.bWidth, styles.m15, styles.mT5,styles.bRad20]}>
              <CInput cStyle={{ padding: 8, marginLeft: 8 }} underlineColorAndroid='transparent' placeholder='New Password'
                value={this.state.Password} onChangeText={(Password) => this.setState({ Password })}

              />
            </View>

            <CText cStyle={[styles.black,styles.mL20,styles.m5]}>Change Password</CText>
            <View style={[styles.bWidth, styles.m15,styles.mT5, styles.bRad20]}>
              <CInput cStyle={[styles.p8, styles.mL10]} underlineColorAndroid='transparent' placeholder='Confirm Password'
                value={this.state.ConfirmPass} onChangeText={(ConfirmPass) => this.setState({ ConfirmPass })}

              />
            </View>

            <TouchableOpacity onPress={() => this.UpdateProfile()}>
              <View style={[styles.bRad20, styles.m20, styles.aslCenter,styles.bred, { width: (Dimensions.get('window').width) / 3.5 }]}>
                <CText cStyle={[styles.FntS15, styles.m10, styles.aslCenter,styles.white ]}>UPDATE</CText>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

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
  noData: false
};