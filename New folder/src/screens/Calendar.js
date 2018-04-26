import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView
} from 'react-native';


export default class Calendar extends Component {
  state = {
    showdata: [],
    data: [{ time: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] }],
    data1: [{ data: ['Fri 12/01', 'booked', 'empty', 'empty', 'booked', 'empty', 'empty', 'booked', 'empty'] }, { data: ['Sat 13/01', 'booked', 'empty', 'booked', 'empty', 'booked', 'empty', 'empty', 'booked'] }, { data: ['Sun 14/01', 'booked', 'booked', 'empty', 'empty', 'empty', 'booked', 'empty', 'empty'] }, { data: ['Mon 15/01', 'booked', 'booked', 'empty', 'booked', 'empty', 'empty', 'empty', 'booked'] }, { data: ['Tue 16/01', 'booked', 'empty', 'booked', 'empty', 'empty', 'booked', 'empty', 'empty'] }, { data: ['Wed 17/01', 'booked', 'booked', 'empty', 'empty', 'booked', 'empty', 'booked', 'empty'] }, { data: ['Thu 18/01', 'empty', 'empty', 'booked', 'empty', 'booked', 'empty', 'booked', 'empty'] }],
  }
  renderdata() {
    let a = [];
    let data = this.state.data[0].time;
    if (this.state.data[0].time) {
      for (let i = 0; i < data.length; i++) {
        console.warn(data.length);
        if (i === 0) {
          a.push(
            <View style={{ flexDirection: 'row' }} >
              <View style={{ margin: 10, height: 40, width: 80, justifyContent: 'center', alignItems: 'center' }} >
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[0].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[2].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[3].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[4].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[5].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[6].data[i]}</Text>
              </View>
              {/* <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[7].data[i]}</Text>
              </View><View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[8].data[i]}</Text>
              </View> */}
            </View>
                    )
        } else if(i!==0) {
          a.push(
            <View style={{ flexDirection: 'row' }}>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', margin:5,height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data[0].time[i - 1]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[0].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[1].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[2].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[3].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[4].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[5].data[i]}</Text>
              </View>
              <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[6].data[i]}</Text>
              </View>
              {/* <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[7].data[i]}</Text>
              </View><View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ color: '#FFF', height: 40, width: 80, backgroundColor: '#000', borderRadius: 25, borderColor: '#FFF', borderWidth: 0.5 }} >{this.state.data1[8].data[i]}</Text>
              </View> */}
            </View>
          )
        }
      }
      return a;
    } else {
      return;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          {this.renderdata()}
        </ScrollView>
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
