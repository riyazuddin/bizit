import React, { Component } from 'react';
import { Image, Button, AsyncStorage, Alert, ScrollView, Text, View, Dimensions, TouchableOpacity, FlatList, Modal, TextInput, Platform, PermissionsAndroid } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Geocoder from 'react-native-geocoder';
import styles from '../common/styles'
import Header from '../common/Header'
import Utils from '../common/Utils';
import config from '../config/Config';
import { CButton, CText, CSpinner } from '../common/index'
export default class ShopDetails extends Component {
    state = {
        Services: [], showMe: false, locmodal: false, currloc: '', searchloc: '', streetname: '', businessID: '', token: '', shopMobile: '',
        shopData: [], shopaddress: '', spinnerBool: false, shopCity: '', shopName: '', shopWebsite: '', shopuserID: '', shopbusinessID: '', htcolor: 'grey'
    }
    componentDidMount() {
        const self = this;
        self.setState({ businessID: self.props.navigation.state.params.ID }, () => console.log(self.state.businessID + '\n' + self.state.token))

        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token }, () => { console.log('token in shopdetails', self.state.token) });
                self.fetchShopdetails(tResp.token, self.props.navigation.state.params.ID)
                Utils.dbCall(config.routes.getServicesList + self.props.navigation.state.params.ID, 'GET', { token: tResp.token }, {}, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ Services: resp.data }, () => { console.log(self.state.Services) })

                    }

                });

            }

        });



    }
    spinnerLoad() {
        //console.log('spinner');
        if (this.state.spinnerBool)
            return <CSpinner />;
        return false;
    }
    fetchShopdetails(tokenvalue, ID) {
        const self = this;
        self.setState({ spinnerBool: true })
        console.log(tokenvalue + '\n' + ID);
        Utils.dbCall(config.routes.fetchShopDetails + ID, 'GET', { token: tokenvalue.toString() }, {}, function (resp) {
            console.log(resp)
            if (resp.status) {
                self.setState({ shopName: resp.data.businessName, shopMobile: resp.data.mobile, shopaddress: resp.data.address, shopWebsite: resp.data.website, shopuserID: resp.data.user, shopbusinessID: resp.data._id, spinnerBool: false })

            }

        });
    }

    addtoWishlistDbcall() {
        const self = this;
        self.setState({ spinnerBool: true })
        Utils.dbCall(config.routes.addtowishlist, 'POST', { token: self.state.token }, { userId: self.state.shopuserID, businessId: self.state.shopbusinessID }, function (resp) {
            console.log(resp)
            if (resp.status) {
                if (resp.message === 'Business added to favourites') {
                    self.setState({ htcolor: 'red', spinnerBool: false })
                }
                else if (resp.message === 'removed from favourites') {
                    self.setState({ htcolor: 'grey', spinnerBool: false })
                }
            }
            else {
                alert(resp)
                self.setState({ spinnerBool: false })
            }
        })
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header navicon={require('../images/Nav-Back.png')}
                    backclick={() => this.props.navigation.navigate('BuyerHome')}
                    lmodal={false} menuClick={() => this.props.navigation.navigate('DrawerToggle')} onclick={() => this.props.navigation.navigate('Profile')} />

                <ScrollView scrollEnabled={true}>
                    <View>
                        <View style={[styles.MainImageStyle]}>
                            <Text style={[styles.FntFaNR, styles.FntS70]}>Image</Text>
                            <View style={[styles.bgrey, styles.p5, styles.mR5, styles.aslEnd, styles.bWidth1, { width: Dimensions.get('window').width / 2 }]}>
                                <CText cStyle={[styles.FntFaNR, styles.FntS20]}>{this.state.shopName}</CText>
                                <View style={[styles.mB5, styles.fdR]}>
                                    <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={[styles.mT8, { height: 20, width: 20 }]} />
                                    <CText cStyle={[styles.FntS13, styles.FntFaNR, styles.mT10]}>{this.state.shopaddress}</CText>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.frow, styles.jspacebn, styles.bpink]}>
                            <View >
                                <CText cStyle={[styles.black, styles.mT10, styles.mL15, styles.FntS20]}>{this.state.shopName}</CText>
                                <View style={[styles.frow, , styles.mL15,]}>
                                    <View style={[styles.frow, styles.mT5]}>
                                        <Image style={[styles.mT8, styles.mR5, { height: 20, width: 15 }]} source={require('../images/Company-Profile-Location2.png')} />
                                        <CText cStyle={[styles.mL5, styles.black, styles.FntS20]}>{this.state.shopaddress}</CText>
                                    </View>
                                    <View style={[styles.mapButtonstyle]}>
                                        <CButton onPress={() => this.props.navigation.navigate('Map', { ID: this.state.businessID })}>
                                            <Text style={[styles.mapTextStyle]}>View on map</Text>
                                        </CButton>
                                    </View>
                                </View>

                                <CText style={[styles.FntS16, styles.mL15, styles.black]}>    (Mon-Sat)9:00AM to 7:00PM</CText>

                                <CText cStyle={[styles.FntS15, styles.mL15, styles.m5, styles.blue]}>{this.state.shopWebsite}</CText>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.SLImagesView]}>
                        <View style={[styles.shareImage, styles.bwhite]}>
                            <CButton onPress={() => this.setState({ showMe: !this.state.showMe })}>
                                <Image resizeMode='contain' source={require('../images/Share2.png')}
                                    style={[styles.aslCenter, { height: 25, width: 25 }]} />
                            </CButton>

                            <Modal visible={this.state.showMe}
                                transparent={true}
                                animationType={'slide'}
                                onRequestClose={() => Console.warn("close filter")}>
                                <View style={[styles.LocModalMView, styles.aslStart]}>

                                    <View style={[styles.jCenter, styles.aslCenter, styles.mT20]}>
                                        <View style={[styles.aslCenter]}>
                                            <CButton onPress={() => this.setState({ showMe: !this.state.showMe })}>
                                                <Image resizeMode='contain' source={require('../images/Close_Image.png')} style={[styles.mL10, styles.aslCenter, { height: 50, width: 50 }]} />
                                            </CButton>
                                        </View>
                                        <View
                                            style={[styles.shareSubModalView]}>
                                            <CText cStyle={[styles.red, styles.aslCenter, styles.m20, styles.FntS20]}>SHARE</CText>

                                            <View style={[styles.shMImg]}>

                                                <Image resizeMode='contain' source={require('../images/fbb.png')} style={[styles.sharemodalImage]} />
                                                <Image resizeMode='contain' source={require('../images/twitterr.png')} style={[styles.sharemodalImage]} />
                                                <Image resizeMode='contain' source={require('../images/mail.png')} style={[styles.sharemodalImage]} />

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                        <View style={[styles.shareImage, styles.mR15, styles.bwhite, { backgroundColor: this.state.htcolor }]}>
                            <CButton onPress={() => this.addtoWishlistDbcall()} >
                                <Image resizeMode='contain' source={require('../images/Wishlist1.png')} style={[styles.aslCenter, styles.mT5, { height: 25, width: 25 }]} />
                            </CButton>
                        </View>
                    </View>


                    <View style={[styles.frow, styles.jspacebn, styles.bpink]}>
                        <View style={[styles.frow, styles.mB20, styles.mL15]}>
                            <Image resizeMode='contain' source={require('../images/fb.png')} style={[styles.ftimage, styles.mR10]} />
                            <Image resizeMode='contain' source={require('../images/twitter.png')} style={[styles.ftimage]} />

                        </View>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('Call this Number',this.state.shopMobile,
                                [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'Call', onPress: () => {RNImmediatePhoneCall.immediatePhoneCall(this.state.shopMobile);  } }]
                            )
                        }}>
                            <View style={[styles.mR20]}>
                                <Image style={[styles.ftimage]} source={require('../images/Call.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.bWidth, styles.bred]}>
                        <CText cStyle={[styles.FntS14, styles.m10, styles.aslCenter, styles.white]}>SERVICES</CText>
                    </View>

                    <View >
                        <FlatList
                            numColumns={2}
                            data={this.state.Services}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => {
                                return (
                                    <View style={[styles.m10, styles.bWidth1, styles.bRad20, { width: (Dimensions.get('window').width) / 2.3 }]}>
                                        <CButton onPress={() => this.props.navigation.navigate('BookingSlot', { serviceID: item._id, servicename: item.serviceName, Bid: this.state.businessID })}>

                                            <CText cStyle={[styles.black, styles.aslCenter, styles.m10, styles.FntS14]}>{item.serviceName}</CText>
                                        </CButton>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
            </View>

        )
    }
}