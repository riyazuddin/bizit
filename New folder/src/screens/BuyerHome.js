import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Header from '../common/Header';

export default class BuyerHome extends Component {
    state = {
        data:[],
        fooddata: [{ name: "Studio A Hair Salon", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }, { name: "Studio A Hair Salon", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }, { name: "Studio A Hair Salon", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }],
        coffeedata: [{ name: "CCD", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }, { name: "Starbucks", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }, { name: "Baristha", timing: "(Mon-Sat) 9:00 AM to 7:00 PM", location: "Madhapur" }],
        
    }
    renderdata(item) {
        return (
            <View style={{ height: 130, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'green', flex: 1 }}>
                    <Text>Image</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ justifyContent: 'space-around', margin: 5 }}>
                        <Text style={{ color: 'red', fontSize: 15 }} >{item.name}</Text>
                        <Text style={{ color: '#000', fontSize: 15 }}>{item.timing}</Text>
                        <View style={{ flexDirection: 'row', alignContent: 'center' }} >
                            <Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={{ height: 25, width: 25 }} />
                            <Text style={{ color: '#000', fontSize: 15 }}>{item.location}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('ShopDetails')} >
                        <View>
                            <Image source={require('../images/Go.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    load(data){
        this.setState({data:data})
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navicon={require('../images/Nav.png')} height={20} width={20} menuClick={() => this.props.navigation.navigate('DrawerToggle')}  onclick={()=>this.props.navigation.navigate('Profile')} />
                <View style={{ backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-around' }} >
                    <TouchableOpacity onPress={() => this.load(this.state.fooddata)}>
                        <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 40, width: 40, marginBottom: 5 }} source={require('../images/Food1.png')} />
                            <Text style={{ color: '#FFF' }} >Food</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>  this.load(this.state.coffeedata) } >
                        <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 40, width: 40, marginBottom: 5 }} source={require('../images/Coffee1.png')} />
                            <Text style={{ color: '#FFF' }} >Coffee</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 40, width: 40, marginBottom: 5 }} source={require('../images/Salon1.png')} />
                        <Text style={{ color: '#FFF' }} >Salons</Text>
                    </View>
                    <View style={{ flexDirection: 'column', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 40, width: 40, marginBottom: 5 }} source={require('../images/More1.png')} />
                        <Text style={{ color: '#FFF' }} >More</Text>
                    </View>
                </View>
                <View style={{ margin: 10 }} >
                    <TextInput placeholder='Search' style={{ paddingLeft: 15, paddingRight: 15, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                    <Image style={{ height: 30, width: 30, position: 'absolute', right: 7, top: 7 }} source={require('../images/Location-Search.png')} />
                </View>
                <View style={{ height: 130, backgroundColor: 'red' }}>
                    <Text style={{ color: '#FFF', fontSize: 50 }} >Image</Text>
                </View>
                <View style={{ display: this.state.foodbool }}>
                    <FlatList
                        vertical={true}
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => this.renderdata(item)} 
                        extradata={this.state}/>
                        </View>
                        <View style={{ display: this.state.coffeebool }}>
                   
                        </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});
