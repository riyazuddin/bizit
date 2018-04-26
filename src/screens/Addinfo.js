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
    StyleSheet,
    Picker, Modal,
    CheckBox,
    FlatList,
    ToastAndroid,NativeModules
} from 'react-native';
import axios from 'axios'
import Utils from '../common/Utils';
import config from '../config/Config';
import ImagePicker from 'react-native-image-picker';
import styles from '../common/styles'
import { CText, CButton } from '../common/index'

export default class Addinfo extends Component {
    // componentDidMount(){
    //     let self=this;
    //     if(self.props.navigation.state.params.data!==self.props.navigation.state.params.dat){
    //         this.setState({
    //             bddisplay:'none',
    //             bdtext:'+',
    //             smldisplay:'none',
    //             smltext:'+',
    //         });
    //     }
    // }
    state = {
        imageUploadBool: false,
        addImage: '',
        name: '',
        address: '',
        city: '',
        website: '',
        paypal_mail: '',
        mobile: null,
        mail: '',
        fblink: '',
        tweetlink: '',
        inlink: '',
        instalink: '',
        services: '',
        bddisplay: 'flex',
        bdtext: '-',
        smldisplay: 'flex',
        smltext: '-',
        sddisplay: 'flex',
        sdtext: '-',
        lowprice: null,
        highprice: null,
        info: '',
        lmidday: 'AM',
        hmidday: 'AM',
        durationpicker: ['10', '20', '30', '40', '50'],
        dayspicker: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dur: '',
        token: '',
        daypick: '',
        Shour: '',
        Smin: '',
        Ehour: '',
        Emin: '',
        timings: [],
        Bdays: false,
        data: [{ value: 'monday', check: false, id: 'mon' }, { value: 'tuesday', check: false, id: 'tue' }, { value: 'wednesday', check: false, id: 'wed' }, { value: 'thursday', check: false, id: 'thu' }, { value: 'friday', check: false, id: 'fri' }, { value: 'saturday', check: false, id: 'sat' }, { value: 'sunday', check: false, id: 'sun' }],
        BusinessModal: false,
        Businesstypes: [],
        selectedbusinesstypes: [],
        selectedDays: [],
        imagespath: '',
        shopImages: [],
        addServicearr: [],
        getservicesarr: [],
        selectedDuration: 0,
        addPostImgUrl: '', addPostImage: ''
    }
    componentDidMount() {
        const self = this;
        this.onPickImage = this.onPickImage.bind(this);
        this.onReset = this.onReset.bind(this);
        var test = []
        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token, userid: tResp._id }, () => { console.log('token in Addinfo', self.state.token); });

            }
        });
        Utils.dbCall(config.routes.businesstypes, 'GET', null, {}, function (resp) {
            if (resp.status) {
                console.log(resp.data);
                for (let i = 0; i < resp.data.length; i++) {
                    const element = resp.data[i];
                    element.check = false
                    element.businessTypeName = element.businessType
                    test.push(element)
                }
                self.setState({ Businesstypes: test }, () => { console.log(self.state.Businesstypes + 'Businesstypes') });

            }
        });
    }
    onReset() {
        this.setState({ addPostImgUrl: '', addPostImage: '' });
      }
    onPickImage() {
        const self = this;
        var test = []
        ImagePicker.showImagePicker(imgPickerOptions, response => {
            console.log(response.uri);
            if (!response.didCancel && !response.error) {
                self.state.shopImages.push(response)
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                self.setState({addImage:source})
               
                self.renderAddImage();
                console.log(self.state.shopImages)
            } else if (response.didCancel) {
                self.setState({ addImgUrl: '', addImage: '', imageUploadBool: false });
            } else {
                alert('Could not select image');
            }
        })
    }
    renderAddImage() {
        if (this.state.addImage) {
            return (<View>
                <Image source={this.state.addImage} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                <TouchableOpacity onPress={this.onReset}>
                    <Text style={{ color: '#FFF', padding: 5 }}>X</Text>
                </TouchableOpacity>
            </View>);
        } else {
            return;
        }
    }
    
    onReset() {
        this.setState({ addImgUrl: '', addImage: '' });
    }
    Pickerdata(data) {
        let arr = [];
        for (i = 0; i < data.length; i++) {
            arr.push(
                <Picker.Item label={data[i]} value='' />
            );
        }
        return (arr);
    }

    checkBoxTest(Data) {
        var temparr = []
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index];
            if (element.value === Data.value && element.id === Data.id) {
                if (element.check === true) {
                    element.check = false
                }
                else {
                    element.check = true
                }
            }
            temparr.push(element)
            this.setState({ data: temparr })
        }
    }

    CheckBox(item) {
        return (
            <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between' }}>
                <Text style={{ margin: 20, color: 'black' }}>{item.value}</Text>
                <CheckBox style={{ alignSelf: 'center' }} value={item.check} onChange={() => this.checkBoxTest(item)} />

            </View>
        )
    }
    renderdays() {
        const self = this;
        var days = []
        for (let i = 0; i < self.state.data.length; i++) {
            const element = self.state.data[i];
            if (element.check === true) {
                days.push(element.value)

            }

        }
        self.setState({ selectedDays: days }, () => { console.log(self.state.selectedDays) })
    }

    selectBusiness(item) {
        return (
            <View style={[styles.fdR, styles.bBWidth1, styles.jspacebn]}>
                <Text style={[styles.m20, styles.black]}>{item.businessType}</Text>
                <CheckBox style={[styles.aslCenter]} value={item.check} onChange={() => this.TypecheckBoxTest(item)} />

            </View>
        )
    }
    TypecheckBoxTest(Data) {
        var temparr = []
        for (let index = 0; index < this.state.Businesstypes.length; index++) {
            const element = this.state.Businesstypes[index];
            if (element._id === Data._id && element.check === true) {
                element.check = false
            }
            else if (element._id === Data._id && element.check === false) {
                element.check = true

            }
            temparr.push(element)
            this.setState({ Businesstypes: temparr })
        }
    }
    renderBusinessTypes() {
        const self = this;
        var businesstypes = []
        for (let i = 0; i < self.state.Businesstypes.length; i++) {
            const element = self.state.Businesstypes[i];
            if (element.check === true) {
                businesstypes.push(self.getformatbusinessarray(element.businessType, element._id))

            }

        }

        self.setState({ selectedbusinesstypes: businesstypes }, () => { console.log(self.state.selectedbusinesstypes) })
    }
    getformatbusinessarray(typename, id) {
        return { _id: id }
    }
    saveServices() {
        const self = this;
        var test = []
        if (self.state.addServicearr.length === 0) {
            test = []
        }
        else {
            for (let i = 0; i < self.state.addServicearr.length; i++) {
                const element = self.state.addServicearr[i];
                test.push(element)

            }
        }
        var dur = ((self.state.dur) * 60) * 1000
        test.push(self.getformatServicesarray(self.state.services, self.state.lowprice, self.state.highprice, dur));
        self.setState({addServicearr:test},()=>{console.log('addServicearr'+test)})
        
    }
    getformatServicesarray(name, lprice, hprice, duration) {
        return { serviceName: name, slotDuration: duration, minPrice: Number(lprice), maxPrice: Number(hprice )}
    }
    covertTimetomilliseconds() {
        const self = this;
        console.log(((self.state.dur) * 60) * 1000)
        self.setState({ selectedDuration: (Number((self.state.dur)) * 60) * 1000 }, () => { console.log('selectedDuration: ' + self.state.selectedDuration) })

        if (self.state.lmidday === 'PM') {
            self.state.Shour = Number(self.state.Shour) + 12
        }
        if (self.state.hmidday === 'PM') {
            self.state.Ehour = Number(self.state.Ehour) + 12
        }
        var start = self.miliseconds(Number(self.state.Shour), Number(self.state.Smin), 0)
        var end = self.miliseconds(Number(self.state.Ehour), Number(self.state.Emin), 0)
        console.log('startTime:' + start + 'endTime ' + end)
        var testing = [];
        if (self.state.timings.length === 0) {
            testing = []
        }
        else if (self.state.timings.length != 0) {
            for (let i = 0; i < self.state.timings.length; i++) {
                const element = self.state.timings[i];
                testing.push(element);

            }
            console.log(testing)
        }
        testing.push(self.getformatTime(start, end))
        self.setState({ timings: testing }, () => {
            console.log(self.state.timings)
            console.log('selectedDuration: ' + self.state.selectedDuration)
        })

    }
    getformatTime(starttime, endtime) {
        return { endTime: endtime, startTime: starttime };

    }


    miliseconds(hrs, min, sec) {
        return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
    }
    saveBusinessDetails() {
        const self = this;
        console.log(self.state.shopImages)
        // console.log(self.state.selectedDuration)
        // const photos = self.state.shopImages;
        // const data = new FormData();
        // data.append('businessName', 'Rockers'
        //     // self.state.name
        // );
        // data.append('website', '123.com'
        //     // self.state.website
        // );
        // data.append('address', 'Madhapur'
        //     // self.state.address
        // );
        // data.append('city', 'Hyd'
        //     // self.state.city
        // );
        // data.append('info', 'information'
        //     // self.state.info
        // );
        // data.append('mobile', 1234567890
        //     //  self.state.mobile
        // );
        // data.append('bemail', 'test@gmail.com'
        //     // self.state.mail
        // );
        // data.append('facebook', 'FB'
        //     // self.state.fblink
        // );
        // data.append('twitter', 'TW'
        //     // self.state.tweetlink
        // );
        // data.append('linkedIn', 'Linkedin'
        //     // self.state.inlink
        // );
        // data.append('instagram', 'instagram'
        //     // self.state.instalink
        // );
        // data.append('paypal', 'paypal'
        //     // self.state.paypal_mail
        // );
        // data.append('days[]', self.state.selectedDays);
        // data.append('timings', JSON.stringify(self.state.timings));
        // data.append('user', self.state.userid);
        // data.append('businessTypeId[]', self.state.selectedbusinesstypes);


        // photos.forEach((photo, index) => {
        //     console.log('==> PHOTO ', photos);
        //     data.append('files', {
        //         uri: photo.uri,
        //         type: photo.type,
        //         name: 'image' + index
        //     });
        // });
        // console.log(data)
        // axios({
        //     method: 'post',
        //     url: config.routes.base + config.routes.AddBusiness,
        //     headers: { token: self.state.token },
        //     data: data
        // }).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error)
        //     ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        // });
        Utils.dbCall(config.routes.AddBusiness, 'POST', { token: self.state.token },{businessName:self.state.name,
            website:self.state.website,
            address:self.state.address,
            city:self.state.city,
            info:self.state.info,
            mobile:self.state.mobile,
            bemail:self.state.mail,
            facebook:self.state.fblink,
            twitter:self.state.tweetlink,
            linkedIn:self.state.inlink,
            instagram:self.state.instalink,
            paypal:self.state.paypal_mail,
            images:[],
            days:self.state.selectedDays,
            timings:self.state.timings,
            user:self.state.userid,
            businessTypeId:self.state.selectedbusinesstypes,

        }, function (resp) {
            console.log(resp)
            if (resp.status) {
                
                Utils.dbCall(config.routes.addService, 'POST', { token: self.state.token }, {
                    businessId: resp.data._id,
                    services:self.state.addServicearr
                }, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ getservicesarr: resp.data }, () => { console.log(self.state.getservicesarr) })

                    }

                });

            }
            else {
                alert(resp);
            }
        });
    }
    render() {
        return (
            <View style={[styles.bwhite, { flex: 1 }]}>
                <ScrollView>
                    <View style={[styles.bblue, { height: 80, width: Dimensions.get('window').width }]} >
                    </View>
                    <View style={[styles.bwhite, styles.mB10]} >
                        <View style={[styles.bred, styles.fdR, styles.aitCenter, styles.jspacebn, { height: 35, flex: 1 }]} >
                            <Text style={[styles.white, styles.pL20, styles.FntS17]} >BUSINESS DETAILS</Text>
                            <TouchableOpacity style={[styles.m10, styles.aitCenter, styles.jCenter]} onPress={() => this.setState({
                                bddisplay: this.state.bddisplay === 'flex' ? 'none' : 'flex',
                                bdtext: this.state.bdtext === '-' ? '+' : '-',
                            })} >
                                <Text style={[styles.white, styles.aslCenter, styles.FntS30]}>{this.state.bdtext}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: this.state.bddisplay }} >
                            <View style={[styles.jCenter, styles.m15]} >
                                {this.renderAddImage()}
                                <TouchableOpacity onPress={() => this.onPickImage()} style={[styles.aitCenter, styles.jCenter, styles.bWidth3, styles.bRad25, styles.bblack, { width: 80, height: 25 }]} >
                                    <Text style={[styles.white]} >UPLOAD</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.p10]}>
                                <TextInput placeholder='Business Name' onChangeText={(value) => this.setState({ name: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                            </View><View style={[styles.p10]} >
                                <TextInput placeholder='Address' onChangeText={(value) => this.setState({ address: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.p10]} >
                                <TextInput placeholder='city' onChangeText={(value) => this.setState({ city: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.fdR, styles.jaround]} >
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='Mobile' onChangeText={(value) => this.setState({ mobile: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) / 2.2, height: 40, }]} underlineColorAndroid='transparent' />
                                </View>
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='E-mail' onChangeText={(value) => this.setState({ mail: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) / 2.2, height: 40, }]} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                            <View style={[styles.p10]} >
                                <TextInput placeholder='Website' onChangeText={(value) => this.setState({ website: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                            <View style={[styles.p10]} >
                                <TextInput placeholder='Paypal E-mail' onChangeText={(value) => this.setState({ paypal_mail: value })} style={[styles.pL10, styles.pR10, styles.bRad25, styles.bWidth, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.bwhite, styles.mB10]} >
                        <View style={[styles.fdR, styles.aitCenter, styles.jspacebn, styles.bred, { height: 35, flex: 1 }]} >
                            <Text style={[styles.white, styles.pL20, styles.FntS17]} >SOCIAL MEDIA LINKS</Text>
                            <TouchableOpacity style={[styles.m10, styles.jCenter, styles.aitCenter]} onPress={() => this.setState({
                                smldisplay: this.state.smldisplay === 'flex' ? 'none' : 'flex',
                                smltext: this.state.smltext === '-' ? '+' : '-',
                            })} >
                                <Text style={[styles.white, styles.aslCenter, styles.FntS30]}>{this.state.smltext}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: this.state.smldisplay }} >
                            <View style={[styles.fdR]} >
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='Facebook Link' onChangeText={(value) => this.setState({ fblink: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: ((Dimensions.get('window').width) / 2) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                                </View>
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='Twitter Link' onChangeText={(value) => this.setState({ tweetlink: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: ((Dimensions.get('window').width) / 2) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='Linkedin Link' onChangeText={(value) => this.setState({ inlink: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: ((Dimensions.get('window').width) / 2) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                                </View>
                                <View style={[styles.p10]} >
                                    <TextInput placeholder='Instagram Link' onChangeText={(value) => this.setState({ instalink: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: ((Dimensions.get('window').width) / 2) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.bwhite, styles.mB10]} >
                        {/* <View style={[styles.bred, styles.aitCenter, styles.jspacebn, styles.fdR, { height: 35, flex: 1 }]} >
                            <Text style={[styles.white, styles.pL20, styles.FntS17]} >SERVICE DETAILS</Text>
                            <TouchableOpacity style={[styles.m10, styles.jCenter, styles.aitCenter]} onPress={() =>
                                this.setState({
                                    sddisplay: this.state.sddisplay === 'flex' ? 'none' : 'flex',
                                    sdtext: this.state.sdtext === '+' ? '-' : '+',
                                })} >
                                <Text style={[styles.white, styles.aslCenter, styles.FntS30]}>{this.state.sdtext}</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View>
                            <View style={{ display: this.state.sddisplay }} >
                                {/* <View style={[styles.m10, styles.mT20, styles.bWidth, styles.bRad25, styles.pL10, styles.pR10, { display: this.state.bool, width: (Dimensions.get('window').width) - 20, height: 40, }]} >
                                    <CButton onPress={() => this.setState({ BusinessModal: !this.state.BusinessModal })}>
                                        <CText cStyle={[styles.FntS14, styles.m10, styles.black]} >Select Business Types</CText>
                                    </CButton>
                                </View> */}



                                {/* <Modal visible={this.state.BusinessModal}
                                    transparent={true}
                                    animationType={'slide'}
                                    onRequestClose={() => Console.warn("close filter")}>
                                    <View style={[styles.aslCenter, styles.jCenter, { backgroundColor: 'rgba(52,52,52,0.8)', width: '100%', flex: 1, }]}>

                                        <View style={[styles.jCenter, styles.aslCenter, styles.mT20]}>

                                            <View
                                                style={[styles.bWidth, styles.m10, styles.mT15, styles.bwhite, { height: 450, width: (Dimensions.get('window').width) - 10, top: 30 }]}>

                                                <View style={[styles.jCenter, styles.aslCenter, { flex: 1, width: '100%', }]} >
                                                    <FlatList
                                                        data={this.state.Businesstypes}
                                                        keyExtractor={(item, index) => console.warn(index)}
                                                        renderItem={({ item }) => this.selectBusiness(item)}
                                                        extraData={this.state.Businesstypes}
                                                    />
                                                    <CButton onPress={() => this.setState({ BusinessModal: !this.state.BusinessModal }, () => { this.renderBusinessTypes() })}>
                                                        <CText
                                                            cStyle={[styles.aslCenter, styles.FntS18, styles.black]}>Ok</CText>
                                                    </CButton>


                                                </View>


                                            </View>
                                        </View>
                                    </View>
                                </Modal> */}
                                {/* <View style={[styles.p10]} >
                                    <TextInput placeholder='Services' onChangeText={(value) => this.setState({ services: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
                                </View> */}

                                {/* <View style={[styles.p10]} >
                                    <Text style={[styles.black, styles.mL10]} >Set Price Range</Text>

                                    <View style={[styles.fdR, styles.aitCenter, styles.jaround]} >
                                        <View style={[styles.p10]} >
                                            <TextInput placeholder='₹ 100' onChangeText={(value) => this.setState({ lowprice: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) / 2.3, height: 40 }]} underlineColorAndroid='transparent' />
                                        </View>
                                        <Text style={[styles.black, styles.m5]} >TO</Text>
                                        <View style={[styles.p10]} >
                                            <TextInput placeholder='₹ 10000' onChangeText={(value) => this.setState({ highprice: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) / 2.3, height: 40 }]} underlineColorAndroid='transparent' />
                                        </View>
                                    </View>
                                </View> */}
                                {/* <View style={[styles.m10, styles.bWidth, styles.bRad25]} >
                                   
                                    <Picker style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) - 20, height: 40 }]}
                                        selectedValue={this.state.dur} onValueChange={(selectedValue) => {
                                            this.setState({ dur: selectedValue }, () => {
                                            })
                                        }}>
                                        <Picker.Item label='Select Duration' value='' />
                                        {
                                            this.state.durationpicker.map((data, i) => {
                                                return (
                                                    <Picker.Item key={i} label={data + ' Min'} value={data} />
                                                );
                                            })
                                        }
                                    </Picker>
                                </View> */}
                                
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Sellerservices')}>
                                    <View style={[styles.bWidth, styles.bred, styles.mT15, styles.mB10]}>
                                        <CText cStyle={[styles.FntS14, styles.m10, styles.aslCenter, styles.white]}>ADD MORE SERVICES</CText>
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.p10]} >
                                    <Text style={[styles.black, styles.mB10, styles.mL10]} >Business Hours {"&"} Days</Text>
                                    <View style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) - 40, height: 40 }]} >
                                        <View >
                                            <TouchableOpacity onPress={() => this.setState({ Bdays: !this.state.Bdays })}>
                                                <Text style={[styles.FntS14, styles.black, styles.m8]} >Select Business Days</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                                <Modal visible={this.state.Bdays}
                                    transparent={true}
                                    animationType={'slide'}
                                    onRequestClose={() => Console.warn("close filter")}>
                                    <View style={[styles.jCenter, styles.aslCenter, { flex: 1, backgroundColor: 'rgba(52,52,52,0.8)', width: '100%' }]}>

                                        <View style={[styles.jCenter, styles.aslCenter, styles.mT20]}>

                                            <View
                                                style={[styles.bWidth, styles.m10, styles.mT15, styles.bwhite, { height: 450, width: (Dimensions.get('window').width), top: 30 }]}>

                                                <View style={[styles.aslCenter, styles.jspacebn, { flex: 1, width: '100%' }]} >
                                                    <FlatList
                                                        data={this.state.data}
                                                        keyExtractor={(item, index) => console.warn(index)}
                                                        renderItem={({ item }) => this.CheckBox(item)}
                                                        extraData={this.state.data}
                                                    />
                                                    <Text
                                                        style={[styles.aslCenter, styles.FntS18, styles.black]}
                                                        onPress={() => this.setState({ Bdays: !this.state.Bdays }, () => { this.renderdays() })}>Ok</Text>


                                                </View>


                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <View style={[styles.aitCenter, styles.jspacebn, styles.fdR, styles.p15]} >
                                    <TextInput placeholder='Hr' style={[styles.brad5, styles.bWidth, styles.pL10, styles.pR10, { width: 40, height: 40 }]} underlineColorAndroid='transparent'
                                        value={this.state.Shour} onChangeText={(Shour) => this.setState({ Shour })}
                                        maxLength={2}
                                        keyboardType='numeric'

                                    />
                                    <TextInput placeholder='Min' style={[styles.brad5, styles.bWidth, styles.pL10, styles.pR10, { width: 40, height: 40 }]} underlineColorAndroid='transparent'
                                        value={this.state.Smin} onChangeText={(Smin) => this.setState({ Smin })}
                                        keyboardType='numeric'
                                        maxLength={2}
                                    />
                                    <View style={[styles.jCenter]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            lmidday: this.state.lmidday === 'AM' ? 'PM' : 'AM'
                                        })} >
                                            <View style={[styles.jCenter, styles.brad5, styles.bWidth, { width: 40, height: 40 }]}>
                                                <Text style={[styles.jCenter, styles.aslCenter]}>{this.state.lmidday}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.Fweight, styles.pL10, styles.pR10]} >-</Text>
                                    <TextInput placeholder='Hr' style={[styles.brad5, styles.bWidth, styles.pL10, styles.pR10, { width: 40, height: 40 }]} underlineColorAndroid='transparent'
                                        keyboardType='numeric'
                                        maxLength={2}
                                        value={this.state.Ehour} onChangeText={(Ehour) => this.setState({ Ehour })}

                                    />
                                    <TextInput placeholder='Min' style={[styles.brad5, styles.bWidth, styles.pL10, styles.pR10, { width: 40, height: 40 }]} underlineColorAndroid='transparent'
                                        keyboardType='numeric'
                                        maxLength={2}
                                        value={this.state.Emin} onChangeText={(Emin) => this.setState({ Emin })}

                                    />
                                    <View style={[styles.jcenter]}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            hmidday: this.state.hmidday === 'AM' ? 'PM' : 'AM'
                                        })} >
                                            <View style={[styles.bWidth, styles.brad5, styles.jcenter, { width: 40, height: 40 }]}>
                                                <Text style={[styles.jcenter, styles.aslCenter]}>{this.state.hmidday}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => this.covertTimetomilliseconds()} >
                                        <Image style={[styles.pL10, styles.pR10, { width: 25, height: 25 }]} source={require('../images/Add-Service.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.bWidth1, styles.bRad5, styles.m15, styles.mB20]} >
                                    <TextInput style={[styles.mB50]} multiline={true} placeholder='Company Information' onChangeText={(value) => this.setState({ info: value })} underlineColorAndroid='transparent' />
                                </View>
                                <View style={[styles.fdR, { height: 40 }]} >
                                    <TouchableOpacity style={[styles.jcenter, styles.bblack, styles.aitCenter, { flex: 1 }]} >
                                        <Text style={[styles.white, styles.m10]} >CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.saveBusinessDetails()}
                                        style={[styles.jcenter, styles.bred, styles.aitCenter, { flex: 1 }]}
                                    >
                                        <Text style={[styles.white, styles.m10]} >SAVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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

