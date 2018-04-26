import React, { Component } from 'react';
import { Text, View, FlatList, Modal, Dimensions, TextInput, Image, ScrollView, TouchableOpacity, Picker, DatePickerAndroid, Platform } from 'react-native';
import styles from '../common/styles';
import Sellernotification from '../screens/Sellernotification';
import Header2 from '../common/Header2'


export default class Calendar extends Component {
  state = {
    Block: 'none', Booked: 'flex',
    showMe: false,
    ModalVisibleStatus: false,
    category: 'Business',
    Dob: '',
    servicepicker: [{ value: 'salon' }, { value: 'hotel' }, { value: 'coffee' }],
    dur: '',
    bookdata: [],


    blockdata: []
  }
  Bookedslot() {
    this.setState({
      Booked: 'flex',
      Block: 'none'
    });
  }
  Blockslot() {
    this.setState({
      Booked: 'none',
      Block: 'flex'
    });
  }
  renderbooked(item) {
    return (
      <View style={[styles.bBWidth1, styles.fdR, styles.jaround]}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sellernotification')}>
          <View style={{ borderRightWidth: 1 }}>
            <Text style={[styles.m15, styles.black]}>{item.time}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sellernotification')}>
          <View style={[styles.bRWidth1]}>
            <Text style={[styles.m15, styles.black]}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sellernotification')}>
          <View>
            <Text style={[styles.m15, styles.black]}>{item.mobile}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  renderblock(item) {
    return (
      <View style={[styles.bBWidth1, styles.fdR, styles.jaround]}>
        <View style={[styles.bRWidth1]}>
          <TouchableOpacity onPress={() => { this.setState({ showMe: true }) }}>
            <Text style={[styles.m15, styles.black]}>{item.time}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bRWidth1]}>
          <TouchableOpacity onPress={() => { this.setState({ showMe: true }) }}>
            <Text style={[styles.mR90]}>                   </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => { this.setState({ showMe: true }) }}>
            <Text style={[styles.m10, styles.black]}>{item.mobile}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  onPickdate() {
    if (Platform.OS === 'ios') {
      this.setState({ showModal: !this.state.showModal })
    } else {
      try {
        let currDate = new Date();
        const { action, year, month, day } = DatePickerAndroid.open({
          date: new Date(),
          maxDate: new Date(),
        }).then((response) => {
          if (response.action === "dateSetAction") {
            var month = response.month + 2
            let date = response.day + "/" + month + "/" + response.year;
            var pdate = new Date(month + "/" + response.day + "/" + response.year);
            this.setState({ Dob: date });
            return false;
          }
        }).catch((error) => {
          console.log(error);
        });
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    }
  }

  render() {
    const state = this.state;
    return (


      <View style={[styles.bLWhite, { flex: 1 }]}>
        {/* <Header2 backclick={() => this.props.navigation.navigate('DrawerToggle')}
          height={20} width={20} lmodal={false} onclick={() => this.props.navigation.navigate('Profile')} /> */}
        <View style={[styles.bWidth1, styles.bRad25, styles.m10, styles.mL20, styles.mR20]}>
          <Picker
            selectedValue={this.state.dur} onValueChange={(selectedValue) => {
              // let val = Utils.splitString(selectedValue, '###');
              this.setState({ dur: selectedValue }, () => {
              })
            }}>
            <Picker.Item label='Select Service' value='' />
            {
              this.state.servicepicker.map((data, i) => {
                return (
                  <Picker.Item key={i} label={data.value} value={data.value} />
                );
              })
            }
          </Picker>
        </View>
        <View style={[styles.bWidth1, styles.bRad25, styles.fdR, styles.jspacebn, styles.aitCenter, styles.m10, styles.mL20, styles.mR20]}>
          <TextInput style={[styles.mL10]} value={this.state.Dob} placeholder='Sat 12/01' underlineColorAndroid='transparent' onChangeText={(Dob) => this.setState({ Dob })} />
          <TouchableOpacity onPress={() => this.onPickdate()} >
            <Image source={require('../images/User-Nav-Booked-Slots.png')} style={[styles.mR15, { height: 20, width: 20 }]} />
          </TouchableOpacity>
        </View>

        <View style={[styles.fdR, styles.aitCenter, styles.jCenter]}>
          <TouchableOpacity onPress={() => this.Bookedslot()}>
            <View style={[styles.bblack, styles.bRad25, styles.m20]}>
              <Text style={[styles.white, styles.m10, styles.mL20, styles.mR20]}>Booked Slots</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => this.Blockslot()}>
            <View style={[styles.bgrey, styles.bRad25, styles.m20]}>
              <Text style={[styles.black, styles.m10, styles.mL20, styles.mR20]}>Block Slots</Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* table layout for booked slots*/}
        <View style={{ flex: 9 }}>
          <View style={[{ display: this.state.Booked }]} >
            <View style={[styles.bgrey, styles.bWidth, styles.fdR, styles.jaround]}>
              <Text style={[styles.red, styles.FntS15, styles.m15]}>Time</Text>
              <Text style={[styles.red, styles.FntS15, styles.m15]}>User Name</Text>
              <Text style={[styles.red, styles.FntS15, styles.m15]}>Mobile Number</Text>
            </View>

            <ScrollView>
              <FlatList
                vertical={true}
                data={this.state.bookdata}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => this.renderbooked(item)}
              />
            </ScrollView>
          </View>
        </View>

        {/* table layout for block slots */}
        <View style={[{ display: this.state.Block }]}>

          <View style={[styles.bgrey, styles.bWidth, styles.fdR, styles.jaround]}>
            <Text style={[styles.red, styles.FntS15, styles.m15]}>Time</Text>
            <Text style={[styles.red, styles.FntS15, styles.m15]}>Reason</Text>
            <Text style={[styles.red, styles.FntS15, styles.m15]}>Status</Text>
          </View>

          <ScrollView>
            <FlatList
              vertical={true}
              data={this.state.blockdata}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => this.renderblock(item)}
            />
          </ScrollView>
        </View>



        {/* Modal */}
        <Modal visible={this.state.showMe} transparent={true}
          onRequestClose={() => Console.warn("this is my humble request to close")}>
          <View style={{ backgroundColor: 'rgba(52,52,52,0.8)', height: Dimensions.get('window').height }}>
            <View style={[styles.m15,styles.mT60,{
              backgroundColor: '#ffffff', height: (Dimensions.get('window').height) / 1.8,
              shadowOffset: { width: 5, height: 5 },
              shadowColor: '#e1e1e1',
              shadowOpacity: 1,
              elevation: 10
            }]}>

              <View style={[styles.bBWidth1,styles.borderblack]}>
                <Text style={[styles.red,styles.m15,styles.FntS15]}>BLOCK SLOTS</Text>
              </View>

              <View style={[styles.fdR,styles.mT20,styles.mL20]}>
                <TouchableOpacity onPress={() => this.onPickdate()} >
                  <Image source={require('../images/User-Nav-Booked-Slots.png')} style={{ height: 30, width: 30, }} />
                </TouchableOpacity>
                <TextInput style={[styles.mL10,styles.bottom10,{ width: 80}]} value={this.state.Dob} placeholder='Sat 12/01' underlineColorAndroid='transparent' onChangeText={(Dob) => this.setState({ Dob })} />
              </View>


              {/* date and time */}
              <View style={[styles.aitCenter,styles.jspacebn,styles.fdR,styles.mR20,styles.mL20]} >
                <TextInput placeholder='Hrs' style={[styles.bRad5,styles.bWidth,styles.pL10,styles.pR10,{ width: 40, height: 40 }]} underlineColorAndroid='transparent' />
                <TextInput placeholder='Min' style={[styles.bRad5,styles.bWidth,styles.pL10,styles.pR10,{ width: 40, height: 40 }]} underlineColorAndroid='transparent' />

                <View style={[styles.jCenter]}>
                  <TouchableOpacity onPress={() => this.setState({ lmidday: this.state.lmidday === 'AM' ? 'PM' : 'AM' })} >
                    <View style={[styles.jCenter,styles.bRad5,styles.bWidth,{ width: 40, height: 40 }]}>
                      <Text style={[styles.jCenter,styles.aslCenter]}>{this.state.lmidday}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.pR10,styles.pL10,styles.Fweight]} >-</Text>
                <TextInput placeholder='Hr' style={[styles.bRad5,styles.bWidth,styles.pL10,styles.pR10,{ width: 40, height: 40 }]} underlineColorAndroid='transparent' />
                <TextInput placeholder='Min' style={[styles.bRad5,styles.bWidth,styles.pL10,styles.pR10,{ width: 40, height: 40 }]} underlineColorAndroid='transparent' />
                <View style={[styles.jCenter]}>
                  <TouchableOpacity onPress={() => this.setState({
                    hmidday: this.state.hmidday === 'AM' ? 'PM' : 'AM'
                  })} >
                    <View style={[styles.jCenter,styles.bWidth,styles.bRad5,{ width: 40, height: 40} ]}>
                      <Text style={[styles.jCenter,styles.aslCenter]}>{this.state.hmidday}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Image style={[styles.pL10,styles.pR10,{ width: 25, height: 25}]} source={require('../images/Add-Service.png')} />
                </TouchableOpacity>
              </View>
              {/* date and time */}


              <View style={[styles.bWidth1,styles.brad5,styles.m20,{height: 100 }]}>
                <TextInput underlineColorAndroid='transparent' placeholder='Reasons' multiline={true} />
              </View>

              <View style={[styles.fdR]}>
                <TouchableOpacity onPress={() => { this.setState({ showMe: false }) }}>
                  <View style={[styles.aslCenter,styles.mT5,styles.m20,styles.bRad30,styles.bWidth1]}>
                    <Text style={[styles.FntS15,styles.m10,styles.aslCenter,styles.black]}>GO BACK</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ showMe: false }) }}>
                  <View style={[styles.bRad20,styles.aslCenter,styles.mT5,styles.m20,styles.bblack]}>
                    <Text style={[styles.FntS15,styles.m10,styles.aslCenter,styles.white]}>BOOK SLOT</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }

}

