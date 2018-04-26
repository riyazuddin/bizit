import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,TextInput,
  FlatList, Picker, Modal,
} from 'react-native';
import styles from '../common/styles'


export default class Sellerservices extends Component {
  state = {
    durationpicker: ['10', '20', '30', '40', '50'],
    sddisplay: 'none', sdtext: '+', services: '', dur: '', lowprice: '', highprice: '',
    data: [{ name: 'service 1', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 2', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 3', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 4', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 5', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 6', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }, { name: 'service 7', timing: '09:00 AM to 12:30 PM', Duration: 'Slot Duration 30 Mins' }]
  }
  renderservices(data) {
    return (
      <View style={{ height: 120, width: Dimensions.get('window').width, flexDirection: 'row', margin: 10, borderWidth: 0.5 }} >
        <View style={{ justifyContent: 'space-around', flex: 2, flexDirection: 'column', marginLeft: 30 }} >
          <Text style={{ color: '#e01c1d' }} >{data.name}</Text>
          <Text style={{ color: '#000' }} >{data.timing}</Text>
          <Text style={{ color: '#000' }} >{data.Duration}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Addinfo', { data: data })} style={{ height: 40, width: 80, backgroundColor: '#000', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: '#FFF' }} >EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  ServiceDBCaall() {
    const self = this;
    console.log(((self.state.dur) * 60) * 1000)
    console.log('Services: ' + self.state.services + '\n' + 'prices  ' + self.state.lowprice + ' ' + self.state.highprice)
  }
  render() {
    return (
      <View style={{flex: 1,
        backgroundColor: '#F5FCFF',}}>
        <View style={[styles.bred, styles.aitCenter, styles.jspacebn, styles.fdR, ]} >
          <Text style={[styles.white, styles.pL20, styles.FntS17]} >ADD SERVICE</Text>
          <TouchableOpacity style={[styles.m10, styles.jCenter, styles.aitCenter]} onPress={() =>
            this.setState({
              sddisplay: this.state.sddisplay === 'none' ? 'flex' : 'none',
              sdtext: this.state.sdtext === '-' ? '+' : '-',
            })} >
            <Text style={[styles.white, styles.aslCenter, styles.FntS30]}>{this.state.sdtext}</Text>
          </TouchableOpacity>
        </View>


        <View style={{ display: this.state.sddisplay }} >

          <View style={[styles.p10]} >
            <TextInput placeholder='Services' onChangeText={(value) => this.setState({ services: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) - 20, height: 40 }]} underlineColorAndroid='transparent' />
          </View>

          <View style={[styles.p10]} >
            <Text style={[styles.black, styles.mL10]} >Set Price Range</Text>

            <View style={[styles.fdR, styles.aitCenter, styles.jaround]} >
              <View style={[styles.p10]} >
                <TextInput placeholder='₹ 100' onChangeText={(value) => this.setState({ lowprice: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) / 2.3, height: 40 }]} underlineColorAndroid='transparent' />
              </View>
              <Text style={[styles.black, styles.m5]} >TO</Text>
              <View style={[styles.p10]} >
                <TextInput placeholder='₹ 10000' onChangeText={(value) => this.setState({ highprice: value })} style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) / 2.3, height: 40 }]} underlineColorAndroid='transparent' />
              </View>
            </View>
          </View>
          <View style={[styles.m10, styles.bWidth, styles.bRad25]} >

            <Picker style={[styles.bRad25, styles.bWidth, styles.pL10, styles.pR10, { width: (Dimensions.get('window').width) - 20, height: 40 }]}
              selectedValue={this.state.dur} onValueChange={(selectedValue) => {
                this.setState({ dur: selectedValue }, () => {
                })
              }}>
              <Picker.Item label='Select Duration' value='' />
              {
                this.state.durationpicker.map((data, i) => {
                  return (
                    <Picker.Item key={i} label={data + ' Min'} value={data} />
                  );
                })
              }
            </Picker>
          </View>
          <View style={[styles.fdR, { height: 40 }]} >
            <TouchableOpacity style={[styles.jcenter, styles.bblack, styles.aitCenter, { flex: 1 }]} >
              <Text style={[styles.white, styles.m10]} >CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.ServiceDBCaall()}
              style={[styles.jcenter, styles.bred, styles.aitCenter, { flex: 1 }]}
            >
              <Text style={[styles.white, styles.m10]} >SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40, width: Dimensions.get('window').width, alignItems: 'center', flexDirection: 'row', marginLeft: 10 }} >
          <Image style={{ height: 15, width: 15, paddingLeft: 10, paddingRight: 10 }} source={require('../images/Back.png')} />
          <Text style={{ color: '#e01c1d', paddingLeft: 10 }} >All Services</Text>
        </View>
        <FlatList
          vertical={true}
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderservices(item)}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
// });
