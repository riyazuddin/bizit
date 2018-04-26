import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableOpacity, FlatList, Modal, } from 'react-native';
import Utils from '../common/Utils'
import config from '../config/Config'
import Header2 from '../common/Header2';
import styles from '../common/styles';
import { CText, CInput, CButton, CSpinner } from '../common/index'

export default class BuyerHome extends Component {
    state = {
        data: [],
        catmodal: false,
        BusinessTypes: [],
        LimitedBusinessTypes: [],
        token: '',
        search: '',
        spinnerBool: false


    }
    componentDidMount() {
        const self = this;
        self.setState({ spinnerBool: true })
        var test = []
        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token }, () => { console.log('token in Buyerhome', self.state.token); });

            }
        });
        Utils.dbCall(config.routes.businesstypes, 'GET', null, {}, function (resp) {
            if (resp.status) {
                console.log(resp.data);
                self.setState({ BusinessTypes: resp.data, spinnerBool: false }, () => { console.log(self.state.BusinessTypes + 'Businesstypes') });
                if (resp.data.length >= 3) {
                    for (let i = 0; i < 3; i++) {
                        const element = self.state.BusinessTypes[i];
                        test.push(element)
                    }
                    self.setState({ LimitedBusinessTypes: test })
                }
                else if (resp.data.length < 3 && resp.data.length != 0) {
                    for (let i = 0; i < resp.data.length; i++) {
                        const element = self.state.BusinessTypes[i];
                        test.push(element)
                    }
                    self.setState({ LimitedBusinessTypes: test })
                }
                else {
                    self.setState({ spinnerBool: false })
                    alert('Noo data found')
                }

            }
        });
        // self.load(self.state.fooddata)




    }
    categories(item) {
        const self = this;
        return (
            <TouchableOpacity onPress={() => self.setState({ catmodal: !self.state.catmodal }, () => { self.FetchDBcall(item._id) })}>
                <View style={[styles.mB10, styles.mR20, styles.mL20, styles.bRad20, styles.borderWhite, styles.bWidth1, { width: 150 }]}>
                    <CText cStyle={[styles.aslCenter, styles.white, styles.m10]}>{item.businessTypeName}</CText>
                </View>
            </TouchableOpacity>

        )
    }
    renderdata(item) {
        const self = this;

        var testing = item.timings;
        var testingtime = []
        var fulltime = '', str = '', str1 = ''
        for (let j = 0; j < testing.length; j++) {
            const element1 = testing[j];
            var startSeconds = element1.startTime / 1000
            var startHours = parseInt(startSeconds / 3600)
            startSeconds = startSeconds % 3600
            var startMinutes = parseInt(startSeconds / 60);
            startSeconds = startSeconds % 60
            if (startHours > 12) {
                startHours = startHours - 12
                // console.log(startHours + " hours and " + startMinutes + " minutes and " + startSeconds + " seconds!" + " PM");
                startMinutes = '0' ? startMinutes = '00' : startMinutes = startMinutes
                str = startHours + ':' + '' + startMinutes + 'PM'
                // console.log(str,'starttime')

            }
            else {
                var mmm = 'AM'
                if (startHours === 12) {
                    mmm = 'PM'
                }
                // console.log(startHours + " hours and " + startMinutes + " minutes and " + startSeconds + " seconds!" + mmm);
                startMinutes = '0' ? startMinutes = '00' : startMinutes = startMinutes
                str = startHours + ':' + '' + startMinutes + mmm
                // console.log(str,'starttime')
            }
            var seconds = element1.endTime / 1000;
            var hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            var minutes = parseInt(seconds / 60);
            seconds = seconds % 60;
            if (hours > 12) {
                hours = hours - 12
                // console.log(hours + " hours and " + minutes + " minutes and " + seconds + " seconds!" + " PM");
                minutes = '0' ? minutes = '00' : minutes = minutes

                str1 = hours + ':' + '' + minutes + 'PM'
                // console.log(str1,'endtime')
            }
            else {
                var mmm = 'AM'
                if (hours === 12) {
                    mmm = 'PM'
                }
                // console.log(hours + " hours and " + minutes + " minutes and " + seconds + " seconds!" + mmm);
                minutes = '0' ? minutes = '00' : minutes = minutes
                str1 = hours + ':' + '' + minutes + 'PM'
                // console.log(str1,'endtime')
            }
            fulltime = str + ' - ' + str1
            console.log(fulltime, 'BusinessTime')
            testingtime.push(self.getfulltime(fulltime))


        }
        console.log(testingtime, 'fulltime')



        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopDetails', { ID: item._id })}>
                <View style={[styles.fdR, { height: 130 }]}>
                    <View style={[styles.bgreen, { flex: 1 }]}>
                        <CText>Image</CText>
                    </View>
                    <View style={[styles.pH5, styles.jspacebn, styles.fdR, { flex: 2 }]}>
                        <View style={[styles.jaround, styles.m5]}>
                            <CText style={[styles.red, styles.FntS15]} >{item.businessName}</CText>
                            <View style={[styles.jspacebn]}>
                                <View style={[styles.fdR, styles.jspacebn]}>
                                    <CText>(</CText>
                                    {
                                        item.days.map(function (data, index) {
                                            return (

                                                <CText cStyle={[styles.black]}>{data},</CText>
                                            )
                                        })
                                    }
                                    <CText>)</CText>
                                </View>
                                {
                                    testingtime.map(function (data, index) {
                                        return (
                                            <CText cStyle={[styles.black]}>{data.fullTime} </CText>
                                        )
                                    })
                                }
                            </View>

                            <View style={[styles.fdR, styles.acCenter]} >
                                <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{ height: 25, width: 25 }} />
                                <CText cStyle={[styles.black, styles.FntS15]}>{item.address}</CText>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.jCenter]}  >
                            <View>
                                <Image source={require('../images/Go.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getfulltime(data) {
        return { fullTime: data };

    }
    spinnerLoad() {
        //console.log('spinner');
        if (this.state.spinnerBool)
            return <CSpinner />;
        return false;
    }
    assignshopData(shopData) {
        for (let i = 0; i < shopData.length; i++) {
            const element = shopData[i];
            for (let j = 0; j < shopData[i].timings.length; j++) {
                const element1 = shopData[i].timings[j];
                var seconds = element1.endTime / 1000;
                var hours = parseInt(seconds / 3600);
                seconds = seconds % 3600;
                var minutes = parseInt(seconds / 60);
                seconds = seconds % 60;
                if (hours > 12) {
                    hours = hours - 12
                    console.log(hours + " hours and " + minutes + " minutes and " + seconds + " seconds!" + " PM");

                }
                else {
                    var mmm = 'AM'
                    if (hours === 12) {
                        mmm = 'PM'
                    }
                    console.log(hours + " hours and " + minutes + " minutes and " + seconds + " seconds!" + mmm);

                }

            }

        }
    }

    FetchDBcall(ID) {
        const self = this;
        self.setState({ spinnerBool: true })
        console.log(ID);
        Utils.dbCall(config.routes.Fetchall, 'POST', { token: self.state.token }, {
            businessTypeId: ID,
        }, function (resp) {
            console.log(resp)
            if (resp.status) {

                self.setState({ data: resp.data, spinnerBool: false }, () => { self.assignshopData(self.state.data) })

            }
            else {
                alert(resp.message);
                self.setState({ spinnerBool: false })

            }
        });

    }
    renderSearch() {
        const self = this;
        if ((self.state.search === '')) {
            alert('Please enter search value')
        }
        else {
            console.log(self.state.search)
            Utils.dbCall(config.routes.searchFetch, 'POST', { token: self.state.token }, {
                search: self.state.search,
            }, function (resp) {
                console.log(resp)
                if (resp.status) {
                    self.setState({ data: resp.data }, () => { self.assignshopData(self.state.data) })
                }
                else {
                    alert(resp.message);

                }
            });
        }
    }
    renderCatData() {
        const self = this;
        if (self.state.LimitedBusinessTypes.length != 0) {
            return (
                <View >
                    <View>
                        <Image style={{ height: '100%', width: '100%', position: 'absolute' }} source={require('../images/buyer_categ.jpg')} />

                        <View style={[styles.fdR, styles.jaround]} >
                            {
                                self.state.LimitedBusinessTypes.map(function (data, index) {
                                    return (
                                        <TouchableOpacity onPress={() => self.FetchDBcall(data._id)}>
                                            <View style={[styles.aitCenter, styles.jCenter, styles.m10, styles.fdC]}>
                                                <Image style={[styles.mB5, { height: 40, width: 40 }]} source={require('../images/Food1.png')} />
                                                <CText cStyle={[styles.white]} >{data.businessTypeName}</CText>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                            }

                            <TouchableOpacity onPress={() => self.setState({ catmodal: !self.state.catmodal })}>
                                <View style={[styles.aitCenter, styles.jCenter, styles.m10, styles.fdC]}>
                                    <Image style={[styles.mB5, { height: 40, width: 40 }]} source={require('../images/More1.png')} />
                                    <CText cStyle={[styles.white]} >More</CText>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={self.state.catmodal}
                                transparent={true}
                                animationType={'slide'}
                                onRequestClose={() => Console.warn("close filter")}>
                                <ScrollView style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                                    <View style={[styles.m20, styles.aitCenter, styles.jCenter]}>
                                        <TouchableOpacity onPress={() => self.setState({ catmodal: !self.state.catmodal })}>
                                            <Image style={[styles.m10, { height: 30, width: 30 }]} source={require('../images/Close_Image.png')} />
                                        </TouchableOpacity>
                                        <CText cStyle={[styles.white, styles.fnts18, styles.m15]}>ALL CATEGORIES</CText>
                                    </View>
                                    <View style={[styles.m15, styles.jspacebn]}>
                                        <FlatList
                                            data={self.state.BusinessTypes}
                                            keyExtractor={(item, index) => index}
                                            numColumns={2}
                                            renderItem={({ item }) => self.categories(item)}
                                        />
                                    </View>

                                </ScrollView>
                            </Modal>
                        </View>
                    </View>
                    <View style={[styles.m10]} >
                        <CInput placeholder='Search' cStyle={[styles.bRad25, styles.bWidth, styles.pL15, styles.pR15]} underlineColorAndroid='transparent'
                            value={this.state.search} onChangeText={(search) => this.setState({ search }, () => this.renderSearch())}

                        />
                        <TouchableOpacity style={{ position: 'absolute', right: 7, top: 7 }} onPress={() => self.renderSearch()}>
                            <Image style={{ height: 30, width: 30 }} source={require('../images/Location-Search.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 130 }}>
                        <Image style={{ height: '95%', width: '100%' }} source={require('../images/buyer_home2.jpg')} />
                    </View>
                    <ScrollView>
                        <FlatList
                            vertical={true}
                            data={self.state.data}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => self.renderdata(item)}
                            extradata={self.state} />
                    </ScrollView>

                </View>
            )
        }
    }
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={[styles.bwhite, { flex: 1 }]}>
                {this.spinnerLoad()}
                <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
                    height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} />
                {this.renderCatData()}
            </View>
        );
    }
}


