import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Header2 from '../common/Header2'
export default class Businesshome extends Component {
  render() {
    return (
      <View style={styles.container}>
          {/* <Header2  backclick={()=>this.props.navigation.navigate('DrawerToggle')}
                height={20} width={20} lmodal={false}   onclick={()=>this.props.navigation.navigate('Profile')} /> */}
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
