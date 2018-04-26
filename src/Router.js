import React from 'react';
import { Image, View, Text, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import BuyerHome from './screens/BuyerHome';

import Bookedslots from './screens/Bookedslots';
import Changepassword from './screens/Changepassword';
import Favourites from './screens/Favourites';
import Pendingslots from './screens/Pendingslots';
import Policy from './screens/Policy';
import Share2fnds from './screens/Share2fnds';
import Terms from './screens/Terms';
import Signup from './screens/Signup';
import Addinfo from './screens/Addinfo';
import Businesshome from './screens/Businesshome';
import Calendar from './screens/Calendar';
import Sellerservices from './screens/Sellerservices';
import Wishlist from './screens/Wishlist';
import Map from './screens/Map'



import Profile from './screens/Profile';
import ShopDetails from './screens/ShopDetails';
import Login from './screens/Login';
import Forgotpassword from './screens/Forgotpassword';
import Sellernotification from './screens/Sellernotification';
import BookingSlot from './screens/BookingSlot'
import PaymentMode from './screens/PaymentMode';
import PaymentGate from './screens/PaymentGate';
import PaySuccess from './screens/PaySuccess';
import BookingHistory from './screens/BookingHistory';
// import Header from './common/Header'
export default Router =(loginstatus,role)=>{
   return StackNavigator({
        BuyerHome: { screen: BuyerHome },
        Calendar:{screen:Calendar},
        BuyerHome: {
            screen:role='client'?BuyerDraw:BusinessDraw,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
            
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        // Calendar: {
        //     screen: Calendar,
        //     navigationOptions: ({ navigation }) => ({
        //         header: null
        //     })
        // },

        Map: {
            screen: Map,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        //   Header: {
        //     screen: Header,
        //     navigationOptions: ({ navigation }) => ({
        //         header: null
        //     })
        // },
        ShopDetails: {
            screen: ShopDetails,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        
        Signup: {
            screen: Signup,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Forgotpassword: {
            screen: Forgotpassword,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Sellernotification: {
            screen: Sellernotification,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Favourites: {
            screen: Favourites,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Addinfo: {
            screen: Addinfo,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        
        BookingSlot: { screen: BookingSlot, navigationOptions: { header: null } },
        PaymentGate: { screen: PaymentGate, navigationOptions: { header: null } },
        PaySuccess: { screen: PaySuccess, navigationOptions: { header: null } },
        PaymentMode: { screen: PaymentMode, navigationOptions: { header: null } },
        BookingHistory:{screen:BookingHistory,navigationOptions:{header:null}},
        Businesshome: {
            screen: TabNavigator({
                Calendar: {
                    screen: Calendar,
                    navigationOptions: {
                        tabBarLabel: ({ tintColor }) => (<Text style={[styles.tabLabel, { color: tintColor }]}>Calendar</Text>),
                        tabBarIcon: ({ focused, tintColor }) => (<Image style={[styles.tabImg, { tintColor: tintColor }]} source={require('./images/Business-Calendar1.png')} />),
                        header: null
                    },
                },
                Sellernotification: {
                    screen: Sellernotification,
                    navigationOptions: {
                        tabBarLabel: ({ tintColor }) => (<Text style={[styles.tabLabel, { color: tintColor }]}>Notifications</Text>),
                        tabBarIcon: ({ focused, tintColor }) => (<Image style={[styles.tabImg, { tintColor: tintColor }]} source={require('./images/Business-Notifications1.png')} />),
                        header: null
                    },
                },
                Addinfo: {
                    screen: Addinfo,
                    navigationOptions: {
                        tabBarLabel: ({ tintColor }) => (<Text style={[styles.tabLabel, { color: tintColor }]}>Add Info</Text>),
                        tabBarIcon: ({ focused, tintColor }) => (<Image style={[styles.tabImg, { tintColor: tintColor }]} source={require('./images/Add-Info1.png')} />),
                        header: null
                    },
                },
                Sellerservices: {
                    screen: Sellerservices,
                    navigationOptions: {
                        tabBarLabel: ({ tintColor }) => (<Text style={[styles.tabLabel, { color: tintColor }]}>Services</Text>),
                        tabBarIcon: ({ focused, tintColor }) => (<Image style={[styles.tabImg, { tintColor: tintColor }]} source={require('./images/Business-Services1.png')} />),
                        header: null
                    },
                },
            }, {
                lazy: true,
                    tabBarPosition: 'top',
                    tabBarOptions: {
                        activeTintColor: '#e01c1d',
                        inactiveTintColor: 'white',
                        activeBackgroundColor: '#FFF',
                        showIcon: true,
                        //showLabel:false,
                        style: {
                            backgroundColor: '#000',
                            borderTopWidth: 1, borderTopColor: '#EEE',
                            elevation: 2
                        },
                        indicatorStyle: { display: 'none' },
                        allowFontScaling: true
                    },
                })
        }
    }, { 
        // initialRouteName:'Login' 
        initialRouteName: loginstatus ? 'BuyerHome' : 'Login'

})
};
const BusinessDraw=DrawerNavigator({
    BuyerHome: {
        screen: BuyerHome, navigationOptions: ({ navigation }) =>
            ({ drawerLabel: getDrawableText('BuyerHome', navigation, '', '') })
    },
    Calendar:{
        screen: Calendar, navigationOptions: ({ navigation }) =>
            ({ drawerLabel: getDrawableText('Business Home', navigation, 'Calendar', '') })

    },
    Changepassword: {
        screen: Changepassword, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('ChangePassword', navigation, 'Changepassword', require('./images/User-Nav-Change-Password.png'))
            })
    },
    // Share2fnds: {
    //     screen: Share2fnds, navigationOptions: ({ navigation }) =>
    //         ({
    //             drawerLabel: getDrawableText('Share to Friend', navigation, 'Share2fnds', require('./images/User-Nav-Share.png'))
    //         })
    // },
    Pendingslots: {
        screen: Pendingslots, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Pending Slots', navigation, 'Pendingslots', require('./images/User-Nav-Pending-Slots.png'))
            })
    },
    Bookedslots: {
        screen: Bookedslots, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Booked Slots', navigation, 'Bookedslots', require('./images/User-Nav-Booked-Slots.png'))
            })
    },
    // Wishlist: {
    //     screen: Wishlist, navigationOptions: ({ navigation }) =>
    //         ({
    //             drawerLabel: getDrawableText('Favourites', navigation, 'Wishlist', require('./images/User-Nav-Wishlist.png'))
    //         })
    // },
    Terms: {
        screen: Terms, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Terms Of Use', navigation, 'Terms', require('./images/User-Nav-Terms.png'))
            })
    },
    Policy: {
        screen: Policy, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Privacy Policy', navigation, 'Policy', require('./images/User-Nav-Privacy.png'))
            })
    },
    Profile:{
        screen:Profile,navigationOptions:({ navigation })=>({
            drawerLabel:getDrawableText('',navigation,'Profile','')
        })

    },
    Login: {
        screen: Login, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Log out', navigation, 'Login', require('./images/Nav-Profile.png'))
            })
    },
   
}, {
        drawerBackgroundColor: '#FFF',
    }
)
const BuyerDraw=DrawerNavigator({
    BuyerHome: {
        screen: BuyerHome, navigationOptions: ({ navigation }) =>
            ({ drawerLabel: getDrawableText('BuyerHome', navigation, '', '') })
    },
    Calendar:{
        screen: Calendar, navigationOptions: ({ navigation }) =>
            ({ drawerLabel: getDrawableText('Business Home', navigation, 'Calendar', '') })

    },
    Changepassword: {
        screen: Changepassword, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('ChangePassword', navigation, 'Changepassword', require('./images/User-Nav-Change-Password.png'))
            })
    },
    Share2fnds: {
        screen: Share2fnds, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Share to Friend', navigation, 'Share2fnds', require('./images/User-Nav-Share.png'))
            })
    },
    Pendingslots: {
        screen: Pendingslots, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Pending Slots', navigation, 'Pendingslots', require('./images/User-Nav-Pending-Slots.png'))
            })
    },
    Bookedslots: {
        screen: Bookedslots, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Booked Slots', navigation, 'Bookedslots', require('./images/User-Nav-Booked-Slots.png'))
            })
    },
    Wishlist: {
        screen: Wishlist, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Favourites', navigation, 'Wishlist', require('./images/User-Nav-Wishlist.png'))
            })
    },
    Terms: {
        screen: Terms, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Terms Of Use', navigation, 'Terms', require('./images/User-Nav-Terms.png'))
            })
    },
    Policy: {
        screen: Policy, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Privacy Policy', navigation, 'Policy', require('./images/User-Nav-Privacy.png'))
            })
    },
    Profile:{
        screen:Profile,navigationOptions:({ navigation })=>({
            drawerLabel:getDrawableText('',navigation,'Profile','')
        })

    },
    Login: {
        screen: Login, navigationOptions: ({ navigation }) =>
            ({
                drawerLabel: getDrawableText('Log out', navigation, 'Login', require('./images/Nav-Profile.png'))
            })
    },
   
}, {
        drawerBackgroundColor: '#FFF',
    }
)

function getDrawableText(text, navigation, screenName, imageName) {
    if (text === 'BuyerHome') {
        return (<View></View>);
    }if(text=== 'Log out')
    {
        return(<TouchableOpacity onPress={() => {
            if(text === 'Logout'){
                Alert.alert('Logout','Are you sure you want to logout',
                    [{text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'YES', onPress: () => {AsyncStorage.clear(); navigation.navigate(screenName);}}]
                  )
            } else {
                navigation.navigate(screenName);
            }
        }} style={{ flex:1, flexDirection:'row', paddingHorizontal:20, paddingVertical:15, borderBottomWidth:1, borderBottomColor:'#76B8F7'}}>
        <Image style={[styles.tabImg, {marginRight:10}]} source={imageName}/>
        <Text style={{color:'#FFF'}}>{text}</Text>
    </TouchableOpacity>);
    }
   
   
    if (text === 'ChangePassword') {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View Style={{ flex: 4, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 15, width: 15, margin: 10 }} source={require('./images/User-Nav-Back.png')} />
                    <Image style={{ height: 60, width: 60, alignSelf: 'center' }} source={require('./images/UserProfile.png')} />
                    <Text style={{ alignSelf: 'center' }}>Manoj Kumar Chenna</Text>
                </View>
                <View Style={{ backgroundColor: '#FFF', paddingTop: 10 }}>
                    <TouchableOpacity style={{ paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate(screenName)} >
                        <Image style={{ width: 20, height: 20 }} source={imageName} />
                        <Text style={{ margin: 5, paddingLeft: 5, color: '#000' }}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View Style={{ backgroundColor: '#FFF' }}>
                <TouchableOpacity style={{ paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate(screenName)}>
                    <Image style={{ width: 20, height: 20 }} source={imageName} />
                    <Text style={{ margin: 5, color: '#000', paddingLeft: 5 }}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    tabImg: { width: 20, height: 20 },
    tabLabel: { fontSize: 12 }
};

