import React,{Component} from 'react';
import { StackNavigator } from 'react-navigation';
import ShopDetails from './ShopDetails'
import BookingSlot from './BookingSlot'
import PaymentMode from './PaymentMode';
import PaymentGate from './PaymentGate';
import PaySuccess from './PaySuccess';

const Router=StackNavigator({
    ShopDetails: { screen: ShopDetails, navigationOptions: { header: null }},
    BookingSlot: { screen: BookingSlot, navigationOptions: { header: null }},
    PaymentGate: { screen: PaymentGate, navigationOptions: { header: null }},
    PaySuccess: { screen: PaySuccess, navigationOptions: { header: null }},
    PaymentMode: { screen: PaymentMode, navigationOptions: { header: null }},
    
    
    
 
},{
    initialRouteName:'ShopDetails'
}
)
export default Router;


