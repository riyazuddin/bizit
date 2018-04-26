import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Picker,
    Alert,
    TouchableOpacity,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import Header2 from '../common/Header2'
import Utils from '../common/Utils';
import config from '../config/Config'
import styles from '../common/styles'
import {CText} from '../common/index'

export default class Pendingslots extends Component {
    state = {
        pendingSlotData: []
    }
    componentDidMount() {
        const self = this;
        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token });
                Utils.dbCall(config.routes.pendingSlots, 'GET', { token: tResp.token }, {}, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ pendingSlotData: resp.data }, () => { console.log(self.state.pendingSlotData) })

                    }

                });

            }
        });

    }
    getfulltime(data) {
        return { fullTime: data };

    }
    pending(item) {
        var slotstartSeconds = item.serviceId.slotDuration % 3600
        var slotMinutes = parseInt(slotstartSeconds / 60);
        const self = this;
        var testing = item.businessId.timings;
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
                startMinutes = '0' ? startMinutes = '00' : startMinutes = startMinutes
                str = startHours + ':' + '' + startMinutes + 'PM'

            }
            else {
                var mmm = 'AM'
                if (startHours === 12) {
                    mmm = 'PM'
                }
                startMinutes = '0' ? startMinutes = '00' : startMinutes = startMinutes
                str = startHours + ':' + '' + startMinutes + mmm
            }
            var seconds = element1.endTime / 1000;
            var hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            var minutes = parseInt(seconds / 60);
            seconds = seconds % 60;
            if (hours > 12) {
                hours = hours - 12
                minutes = '0' ? minutes = '00' : minutes = minutes

                str1 = hours + ':' + '' + minutes + 'PM'
            }
            else {
                var mmm = 'AM'
                if (hours === 12) {
                    mmm = 'PM'
                }
                minutes = '0' ? minutes = '00' : minutes = minutes
                str1 = hours + ':' + '' + minutes + 'PM'
            }
            fulltime = str + ' - ' + str1
            console.log(fulltime, 'BusinessTime')
            testingtime.push(self.getfulltime(fulltime))


        }
        return (
            <View style={{ borderWidth: 0.5, borderRadius: 10, borderColor: 'black', flexDirection: 'column', backgroundColor: 'white', margin: 15, padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ color: 'red' }}>{item.businessId.businessName}</Text>
                    <Text style={{ color: 'black' }}>{item.serviceId.serviceName}</Text>
                    {/* <Text style={{ color: 'black' }}>{item.time}</Text> */}
                    {
                            testingtime.map(function (data, index) {
                                return (
                                    <CText cStyle={[styles.black, styles.mL5]}>{data.fullTime} </CText>
                                )
                            })
                        }
                    <Text style={{ color: 'black' }}>slotDuration {slotMinutes} Mins</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <TouchableOpacity
                    onPress={() => {
                        Alert.alert('Call this Number',item.businessId.mobile,
                            [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'Call', onPress: () => {RNImmediatePhoneCall.immediatePhoneCall(item.businessId.mobile);  } }]
                        )
                    }}>
                        <Image style={{ height: 40, width: 40, marginTop: 5, marginBottom: 10 }} source={require('../images/Call.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ borderWidth: 0.5, borderRadius: 20, }}>
                            <Text style={{ fontSize: 15, margin: 5, marginLeft: 10, marginRight: 10, color: 'black', alignSelf: 'center' }}>PENDING</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
                    height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} />
                <ScrollView>
                    <View style={{ height: (Dimensions.get('window').height) / 13, width: Dimensions.get('window').width, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Image style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 15, margin: 15 }} source={require('../images/Back-White.png')} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>PENDING SLOTS</Text>
                        </View>
                    </View>

                    <FlatList
                        vertical={true}
                        data={this.state.pendingSlotData}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => this.pending(item)}
                        extraData={this.state.pendingSlotData}
                    />
                </ScrollView>
            </View>
        );
    }
}