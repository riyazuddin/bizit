import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, DatePickerAndroid, Platform } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class ExampleOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Date: '',
            tableHead: ['Date', 'Customer Name', 'Service', 'Location', 'Amount'],
            tableData: [
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],
                ['12/01/18', 'Manoj Kumar', 'Full Hair Cut', 'Madhapur,Hyd', '500'],

            ]
        }
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
                        this.setState({ Date: date });
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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
                    <Image style={{ height: 20, width: 20, margin: 15 }} source={require('./images/Back-White.png')} />
                    <Text style={{ color: 'white', fontSize: 14, margin: 15 }}>Sales History</Text>
                </View>
                <View>
                    <Text style={{ marginLeft: 20,margin:10, color: 'black' }}>Select Date</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderRadius: 25, borderWidth: 1, flexDirection: 'row', margin: 10 }}>
                            <TextInput style={{ width: 80, marginLeft: 15 }} value={this.state.Date} underlineColorAndroid='transparent' placeholder='From Date' />
                            <TouchableOpacity onPress={() => this.onPickdate()}>
                                <Image style={{ height: 20, width: 20, margin: 15, alignSelf: 'center' }} source={require('./images/Sent-Request-Calendar.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ borderRadius: 25, borderWidth: 1, flexDirection: 'row', margin: 10 }}>
                            <TextInput style={{ width: 80, marginLeft: 15 }} underlineColorAndroid='transparent' placeholder='To Date' />
                            <TouchableOpacity>
                                <Image style={{ height: 20, width: 20, margin: 15, alignSelf: 'center' }} source={require('./images/Sent-Request-Calendar.png')} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <View style={{ borderRadius: 30, backgroundColor: 'black', margin: 10 }}>
                                <Text style={{ color: 'white', margin: 15 }}>Go</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* table layout */}
                <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'white', borderBottomWidth: 0.5 }}>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={state.tableHead} style={height = 40} textStyle={{ margin: 5, color: "red", alignSelf: 'center' }} />
                    </Table>
                    <ScrollView>
                        <Table>
                            <Rows data={state.tableData} textStyle={{ margin: 6, alignSelf: 'center', color: 'black' }} />
                        </Table>
                    </ScrollView>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20, borderBottomWidth: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Text style={{ color: 'red', marginRight: 20, fontSize: 15 }}>Total:</Text>
                    <Text style={{ color: 'red', marginLeft: 20, marginRight: 30, fontSize: 15 }}>500</Text>
                </View>
            </View>
        )
    }
}

