import React, { Component } from 'react';
import { Platform, Text, View, Image, TextInput, ScrollView, Switch, Dimensions, Picker, Modal, FlatList, CheckBox } from 'react-native';
import Utils from '../common/Utils';
import config from '../config/Config'
import styles from '../common/styles';
import { CText, CButton,CInput } from '../common/index';
export default class Signup extends Component {
    state = {
        bool: 'none',
        svalue: false,
        Username: '',
        phno: '',
        mail: '',
        role: 'client',
        password: '',
        Businesstypes: [],
        Bdays:false,
        selectedbusinesstypes:[]
    }
    componentDidMount() {
        const self = this;
        var test = []
        Utils.dbCall(config.routes.businesstypes, 'GET', null, {}, function (resp) {
            if (resp.status) {
                console.log(resp.data);
                for (let i = 0; i < resp.data.length; i++) {
                    const element = resp.data[i];
                    element.check = false
                    element.businessType=element.businessTypeName
                    test.push(element)
                }
                self.setState({ Businesstypes: test }, () => { console.log(self.state.Businesstypes + 'Businesstypes') });

            }
        });
    }
    businessTypedisplay(value) {
        if (value) {
            this.setState({
                bool: 'flex',
                svalue: true,role:'businessOwner'
            });
        } else {
            this.setState({
                bool: 'none',
                svalue: false,
                role:'client'
            });
        }
    }
    checkBoxTest(Data) {
        var temparr = []
        for (let index = 0; index < this.state.Businesstypes.length; index++) {
            const element = this.state.Businesstypes[index];
            if (element._id === Data._id && element.check === true) {
                    element.check = false
            }
            else if(element._id === Data._id && element.check === false) {
                element.check = true
                
            }
            temparr.push(element)
            this.setState({ Businesstypes: temparr })
        }
    }
   
    submitSignup() {
        const self = this;
        console.log(self.state.role)
        if (self.state.role === 'businessOwner') {
            if (self.state.Username == '') {
                alert("Please enter a username");
            } else if (!Utils.isValidMobile(self.state.phno) && !Utils.isValidMobile(Number(self.state.phno))) {
                alert("Please enter a valid mobile number");
            } else if (!Utils.isValidEmail(self.state.mail)) {
                alert('Please enter Valid Email');
            }
            else if (!Utils.isValidPassword(self.state.password)) {
                alert('Please enter your Password or select your password length was min chars')
    
            }
            else if(self.state.selectedbusinesstypes.length===0)
            {
                alert('please select business type')
            }
            else {
                console.log(self.state.role)
                self.submitSignupDBCall({email: self.state.mail,userName: self.state.Username,mobile: Number(self.state.phno),password: self.state.password.toString(),businessTypeId: self.state.selectedbusinesstypes,role: self.state.role,})
            }
        }
        else if (self.state.role === 'client') {
            if (self.state.Username == '') {
                alert("Please enter a username");
            } else if (!Utils.isValidMobile(self.state.phno) && !Utils.isValidMobile(Number(self.state.phno))) {
                alert("Please enter a valid mobile number");
            } else if (!Utils.isValidEmail(self.state.mail)) {
                alert('Please enter Valid Email');
            }
            else if (!Utils.isValidPassword(self.state.password)) {
                alert('Please enter your Password or select your password length was min chars')
    
            }           
            else {
                console.log(self.state.role)
                self.submitSignupDBCall({email: self.state.mail,userName: self.state.Username,mobile: Number(self.state.phno),password: self.state.password.toString(),role: self.state.role,})
                
            }
        }
    }
    submitSignupDBCall(params)
    {
        const self=this;
        console.log(params)
        Utils.dbCall(config.routes.UserSignup, 'POST', null, params, function (resp) {
            if (resp.status) {

                alert("Your registration process successfully completed");
                self.props.navigation.navigate('Login', { status: self.state.svalue === false ? 'USER' : 'OWNER' })

            }
            else {
                alert(resp.message);

            }
        });
    }
    
    renderBusinessTypes() {
        const self = this;
        var businesstypes = []
        for (let i = 0; i < self.state.Businesstypes.length; i++) {
            const element = self.state.Businesstypes[i];
            if (element.check === true) {
                businesstypes.push(self.getformatbusinessarray(element.businessType,element._id))

            }

        }
        
        self.setState({selectedbusinesstypes:businesstypes},()=>{console.log(self.state.selectedbusinesstypes)})
    }
    getformatbusinessarray(typename,id)
    {
        return {businessTypeName:typename,_id:id}
    }
    selectBusiness(item) {
        return (
            <View style={[styles.fdR,styles.bBWidth1,styles.jspacebn]}>
                <Text style={[styles.m20,styles.black]}>{item.businessType}</Text>
                <CheckBox style={[styles.aslCenter]} value={item.check} onChange={() => this.checkBoxTest(item)} />

            </View>
        )
    }
    render() {
        return (
            <View style={[styles.bwhite,{flex:1}]}>
                <View style={[styles.aitCenter, styles.jCenter, styles.p20,styles.bBWidth3, { width: Dimensions.get("window").width, borderBottomColor: '#efefef' }]}>
                    <Image style={{ height: 40, width: 80 }} source={require('../images/Nav-Logo.png')} />
                </View>
                <ScrollView>
                    <View style={[styles.aitCenter]} >
                        <CText cStyle={[styles.FntS17, styles.mB10, styles.mT15,styles.red]} >{this.state.svalue === false ? 'USER' : 'OWNER'} SIGNUP</CText>
                        <View style={[styles.fdR, styles.mB15, styles, styles.mT10]} >
                            <CText cStyle={[styles.black,styles.FntS18]} >CLIENTS</CText>
                            <Switch style={[styles.mL10,styles.mR10]} onTintColor="#000" tintColor="#000" thumbTintColor="#e01c1d" onValueChange={(value) => this.businessTypedisplay(value)}
                                value={this.state.svalue} />
                            <CText cStyle={[styles.black,styles.FntS18]}>BUSINESS OWNERS</CText>
                        </View>


                        <View style={[styles.aslCenter]}>
                            <View style={[styles.m10]} >
                                <CInput placeholder='User Name'
                                    value={this.state.Username} onChangeText={(Username) => this.setState({ Username },()=>{console.log(this.state.Username)})}
                                    cStyle={[styles.pL10, styles.pR10, styles.bWidth, styles.bRad25, { width: 300, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.m10]} >
                                <CInput placeholder='Mobile Number'
                                    value={this.state.phno} onChangeText={(phno) => this.setState({ phno })}
                                    cStyle={[styles.pL10, styles.pR10, styles.bWidth, styles.bRad25, { width: 300, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.m10]} >
                                <CInput placeholder='Email Id'
                                    value={this.state.mail} onChangeText={(mail) => this.setState({ mail })}
                                    cStyle={[styles.pL10, styles.pR10, styles.bWidth, styles.bRad25, { width: 300, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.m10]} >
                                <CInput placeholder='Password'
                                    secureTextEntry={true}
                                    value={this.state.password} onChangeText={(password) => this.setState({ password })}
                                    cStyle={[styles.pL10, styles.pR10, styles.bWidth, styles.bRad25, { width: 300, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.m10, styles.bWidth, styles.bRad25, { display: this.state.bool, width: (Dimensions.get('window').width) / 1.38 }]} >
                                <CButton onPress={() => this.setState({ Bdays: !this.state.Bdays })}>
                                    <CText cStyle={[styles.FntS14, styles.m10,styles.black]} >Select Business Type</CText>
                                </CButton>
                            </View>



                            <Modal visible={this.state.Bdays}
                                transparent={true}
                                animationType={'slide'}
                                onRequestClose={() => Console.warn("close filter")}>
                                <View style={[styles.aslCenter, styles.jCenter, { backgroundColor: 'rgba(52,52,52,0.8)', width: '100%', flex: 1, }]}>

                                    <View style={[styles.jCenter, styles.aslCenter, styles.mT20]}>

                                        <View
                                            style={[styles.bWidth, styles.m10, styles.mT15, { height: 450, backgroundColor: 'white', width: (Dimensions.get('window').width), top: 30 }]}>

                                            <View style={[styles.jCenter, styles.aslCenter, { flex: 1, width: '100%', }]} >
                                                <FlatList
                                                    data={this.state.Businesstypes}
                                                    keyExtractor={(item, index) => console.warn(index)}
                                                    renderItem={({ item }) => this.selectBusiness(item)}
                                                    extraData={this.state.Businesstypes}
                                                />
                                                <CButton onPress={() => this.setState({ Bdays: !this.state.Bdays }, () => { this.renderBusinessTypes() })}>
                                                    <CText
                                                        cStyle={[styles.aslCenter,styles.FntS18,styles.black]}>Ok</CText>
                                                </CButton>


                                            </View>


                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <CButton onPress={() => this.submitSignup()} >
                                <View style={[styles.bWidth, styles.bRad5, styles.m10,styles.bred, { width: (Dimensions.get('window').width) / 1.4}]}>
                                    <CText cStyle={[styles.aslCenter, styles.m15, styles.white]}>SIGNUP</CText>
                                </View>
                            </CButton>
                        </View>
                        <View style={[styles.fdR]}>
                            <CButton style={[styles.p5, styles.pL20, styles.pR20]} >
                                <CText cStyle={[styles.FntS17,styles.black]} >Accept Terms</CText>
                            </CButton>
                            <CButton style={[styles.p5, styles.pL20, styles.pR20]} onPress={() => this.props.navigation.navigate('Forgotpassword')}>
                                <CText cStyle={[styles.FntS17,styles.black]}>Forget Password</CText>
                            </CButton>
                        </View>
                        <CButton>
                            <View style={[styles.bWidth, styles.bRad25, styles.fdR, styles.jCenter, styles.aitCenter, styles.m20, { width: (Dimensions.get('window').width) / 1.4 }]}>
                                <Image style={[styles.m15,styles.mR5,{ height: 20, width: 20}]} source={require('../images/Google.png')} />
                                <CText cStyle={[styles.red,styles.m15]}>Signup with Google</CText>
                            </View>
                        </CButton>

                        <View style={[styles.fdR, styles.jCenter, styles.aitCenter, styles.mT10, styles.mB20]}>
                            <CText cStyle={[styles.black]}>I have an account. </CText>
                            <CButton onPress={() => this.props.navigation.navigate('Login', { status: this.state.svalue === false ? 'USER' : 'OWNER' })}>
                                <CText cStyle={styles.red}>LOGIN</CText>
                            </CButton>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
