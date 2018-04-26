import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Picker,
    ScrollView,Alert
} from 'react-native';
import Utils from '../common/Utils';
import config from '../config/Config';
import Header2 from '../common/Header2'
export default class Wishlist extends Component {
    state = {
        data: [{
            Image: '', Name: 'Ayyam coffee shop', location: 'Madhapur,Hyderabad', duration: '9:30am to 10:30pm', Image: ''
        },
        { Image: '', Name: 'Modern Hair Salon', location: 'Madhapur,Hyderabad', duration: '9:30am to 10:30pm', Image: '' },
        { Image: '', Name: 'Shine Car Wash', location: 'Madhapur,Hyderabad', duration: '9:30am to 10:30pm', Image: '' },
        { Image: '', Name: 'Call Laundry', location: 'Madhapur,Hyderabad', duration: '9:30am to 10:30pm', Image: '' },
        { Image: '', Name: 'Sweets Cake Decoration', location: 'Madhapur,Hyderabad', duration: '9:30am to 10:30pm', Image: '' },],
        userid: '', token: '', wishlistData: []
    }
    componentDidMount() {
        const self = this;
        Utils.getToken('user', function (tResp, tStat) {
            console.log(tResp, 'tResp');
            console.log(tStat, 'tStat');
            if (tResp != '') {
                self.setState({ token: tResp.token, userid: tResp._id }, () => { console.log('token in Wishlist', self.state.token); });
                Utils.dbCall(config.routes.getWishlistData, 'GET', { token: self.state.token }, {}, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ wishlistData: resp.data })

                    }
                    else {
                        alert(resp.message);
                    }
                });

            }
        });
    }

    deletefromWishList(ID)
    {
        const self=this;
        Utils.dbCall(config.routes.removefromWishlist+ID, 'DELETE', { token: self.state.token }, {}, function (resp) {
            console.log(resp)
            if (resp.status) {
                Utils.dbCall(config.routes.getWishlistData, 'GET', { token: self.state.token }, {}, function (resp) {
                    console.log(resp)
                    if (resp.status) {
                        self.setState({ wishlistData: resp.data })

                    }
                    else {
                        alert(resp.message);
                    }
                });

            }
            else {
                alert(resp.message);
            }
        });

    }

    booking(item) {
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
        return (
            <ScrollView style={{ borderBottomWidth: 0.5 }}>
                <View style={{ flexDirection: 'column', margin: 15, padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderRadius: 5, borderWidth: 1, backgroundColor: '#eeeeee', marginRight: 10 }}>
                            <Image style={{ height: 50, width: 50, margin: 10 }} source={require('../images/User-Nav-Profile-Pic.png')} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'black' }}>{item.businessId.businessName}</Text>
                            <Text style={{ color: 'black' }}>{item.businessId.address},{item.businessId.city}</Text>
                            {
                                testingtime.map(function (data, index) {
                                    return (
                                        <Text style={{ color: 'black' }}>{data.fullTime} </Text>
                                    )
                                })
                            }
                            {/* <Text style={{color:'black'}}>{item.duration}</Text> */}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity 
                        // onPress={()=>self.deletefromWishList(item._id)}
                        onPress={() => {Alert.alert('Delete Shop','Are you sure u want to delete the shop.',
                 [{text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                 {text: 'YES', onPress: () => {self.deletefromWishList(item._id)}}]
               )} }
                        >
                            <Image style={{ height: 40, width: 40, margin: 20, }} source={require('../images/Delete.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
    getfulltime(data) {
        return { fullTime: data };

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
                    height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} />
                <View style={{ height: (Dimensions.get('window').height) / 13, width: Dimensions.get('window').width, backgroundColor: 'black', flexDirection: 'row' }}>

                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 15, margin: 15 }} source={require('../images/Back-White.png')} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>FAVOURITES</Text>

                </View>

                <FlatList
                    vertical={true}
                    data={this.state.wishlistData}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => this.booking(item)}
                    extraData={this.state.wishlistData}
                />

            </View>
        );
    }
}