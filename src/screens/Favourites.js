import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Header from '../common/Header';


export default class Favourites extends Component {
  state = {
    data: [{ name: 'Ayyam Coffee Shop', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'ModernHair Saloon', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Shine Car Wash', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Call  Laundry', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Ayyam Coffee Shop', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Ayyam Coffee Shop', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'ModernHair Saloon', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Shine Car Wash', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Call  Laundry', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }, { name: 'Ayyam Coffee Shop', location: 'Madhapur,Hyderabad', timing: '9.30am-10.30pm', display: 'flex' }]
  }
  renderdata(data) {
    let item = data;
    return (
      <View style={{ height: 100, flexDirection: 'row', display: item.display }} >
        <View style={{ backgroundColor: 'pink', flex: 1 }} >
          <Text>Image</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', paddingLeft: 5 }}>
          <Text style={{ color: 'red', paddingBottom: 5 }} >{item.name}</Text>
          <Text style={{ color: 'black' }} >{item.location}</Text>
          <Text style={{ color: 'black' }} >{item.timing}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => item.display = 'none'}>
            <Image style={{ width: 40, height: 40 }} source={require('../images/Delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
    data = item;
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navicon={require('../images/Nav.png')} height={20} width={20} onclick={this.props.navigation.navigate('Profile')} />
        <View style={{ height: 50, backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', padding: 5, paddingLeft: 20 }} >
          <Image style={{ width: 25, height: 20 }} source={require('../images/Back-White.png')} />
          <Text style={{ color: 'white', fontSize: 20, paddingLeft: 5 }} >FAVOURITES</Text>
        </View>
        <FlatList
          // vertical={true}
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderdata(item)}
        />
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
