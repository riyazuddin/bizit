import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Header2 from '../common/Header2'
import Utils from '../common/Utils'
import config from '../config/Config'
import styles from '../common/styles'
import {CText} from '../common/index'
export default class Bookedslots extends Component {
    state = {

        BookedslotArr: []
    };
    componentDidMount() {
        const self = this;
        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token });
                Utils.dbCall(config.routes.bookedSlots, 'GET', { token: tResp.token }, {}, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ BookedslotArr: resp.data }, () => { console.log(self.state.BookedslotArr) })

                    }

                });

            }
        });

    }
    getfulltime(data) {
        return { fullTime: data };

    }
    renderSlot(item) {
        // var slotstartSeconds = item.serviceId.slotDuration % 3600
        // var slotMinutes = parseInt(slotstartSeconds / 60);
        const self = this;
        var testing = item.businessId.timings;
        var testingtime = []
        var fulltime = '', slotstr='',str = '', str1 = '',slottime=new Date(item.slotDate).getUTCHours(),slotmin=new Date(item.slotDate).getUTCMinutes()


        if (slottime > 12) {
            slottime = slottime - 12
            slotmin = '0' ? slotmin = '00' : slotmin = slotmin
            slotstr = slottime + ':' + '' + slotmin + 'PM'

        }
        else {
            var mmm = 'AM'
            if (slottime === 12) {
                mmm = 'PM'
            }
            slotmin = '0' ? slotmin = '00' : slotmin = slotmin
            slotstr = slottime + ':' + '' + slotmin + mmm
        }
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
        console.log(testingtime, 'fulltime')

        return (
            <View style={[styles.BookingCardStyle]}>
                <View style={[styles.BookingCardshopView]}>
                    <Image style={{ height: 20, width: 40 }} source={require('../images/Nav-Logo.png')} />
                    <Text style={{ color: 'red' }}>{item.businessId.businessName}
                    </Text>
                    <Text>{item.serviceId.serviceName}
                    </Text>

                    <Text>(Mon-Sat)
                    </Text>
                    {
                            testingtime.map(function (data, index) {
                                return (
                                    <CText cStyle={[styles.black, styles.mL5]}>{data.fullTime} </CText>
                                )
                            })
                        }
                    
                </View>
                <View style={[styles.BookingCardServiceView]}>
                    <Text style={{ color: 'red', marginLeft: 5 }}>${item.serviceId.minPrice}-${item.serviceId.maxPrice}
                    </Text>
                    <Text style={{ marginLeft: 5 }}>Booked slot details
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 18, width: 18, marginLeft: 5 }} source={require('../images/Booked-Slot-Calendar.png')} />
                        <Text style={{ marginLeft: 5 }}>{new Date(item.slotDate).getUTCDate()}/{(new Date(item.slotDate).getUTCMonth()) + 1}/{new Date(item.slotDate).getUTCFullYear()}
                        </Text>
                    </View>
                    <View style={[styles.frow]}>
                        <Image style={{ height: 15, width: 15, marginLeft: 5 }} source={require('../images/Booked-Slot-Time.png')} />
                        <Text style={{ marginLeft: 5 }}>{slotstr}
                        </Text>
                        
                    </View>
                </View>

            </View>)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
                    height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} />
                <View
                    style={{ height: (Dimensions.get('window').height) / 13, width: Dimensions.get('window').width, backgroundColor: 'black', flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 10, margin: 15 }} source={require('../images/Back-White.png')} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>Booked Slots History</Text>
                </View>


                <FlatList
                    vertical={true}
                    data={this.state.BookedslotArr}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => this.renderSlot(item)}
                    extraData={this.state.BookedslotArr}
                />


            </View>
        );
    }
}
