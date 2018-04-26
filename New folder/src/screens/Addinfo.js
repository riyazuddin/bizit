import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Picker
} from 'react-native';
import Utils from '../common/Utils';
import ImagePicker from 'react-native-image-picker';

export default class Addinfo extends Component {
    // componentDidMount(){
    //     let self=this;
    //     if(self.props.navigation.state.params.data!==self.props.navigation.state.params.dat){
    //         this.setState({
    //             bddisplay:'none',
    //             bdtext:'+',
    //             smldisplay:'none',
    //             smltext:'+',
    //         });
    //     }
    // }
    state = {
        imageUploadBool: false,
        addImage: '',
        name: '',
        address: '',
        city: '',
        website: '',
        paypal_mail: '',
        mobile: null,
        mail: '',
        fblink: '',
        tweetlink: '',
        inlink: '',
        instalink: '',
        services: '',
        bddisplay: 'flex',
        bdtext: '-',
        smldisplay: 'flex',
        smltext: '-',
        sddisplay: 'flex',
        sdtext: '-',
        lowprice: null,
        highprice: null,
        info: '',
        lmidday: 'AM',
        hmidday: 'AM',
        durationpicker: ['10Min', '20Min', '30Min', '40Min', '50Min'],
        dayspicker: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
    onPickImage() {
        const self = this;
        ImagePicker.showImagePicker(imgPickerOptions, response => {
            console.warn(response);
            if (!response.didCancel && !response.error) {
                self.setState({ imageUploadBool: true, addImage: response.uri }), (console.warn(self.state.addImage));
                self.renderAddImage();
            } else if (response.didCancel) {
                self.setState({ addImgUrl: '', addImage: '', imageUploadBool: false });
            } else {
                alert('Could not select image');
            }
        })
    }
    renderAddImage() {
        if (this.state.addImage) {
            return (<View>
                <Image source={this.state.addImage} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                <TouchableOpacity onPress={this.onReset}>
                    <Text style={{ color: '#FFF', padding: 5 }}>X</Text>
                </TouchableOpacity>
            </View>);
        } else {
            return;
        }
    }
    onReset() {
        this.setState({ addImgUrl: '', addImage: '' });
    }
    Pickerdata(data) {
        let arr = [];
        for (i = 0; i < data.length; i++) {
            arr.push(
                <Picker.Item label={data[i]} value='' />
            );
        }
        return (arr);
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ height: 80, width: Dimensions.get('window').width, backgroundColor: 'blue' }} >
                    </View>
                    <View style={{ backgroundColor: '#FFF', marginBottom: 10 }} >
                        <View style={{ backgroundColor: '#e01c1d', height: 35, flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ color: 'white', paddingLeft: 20, fontSize: 17 }} >BUSINESS DETAILS</Text>
                            <TouchableOpacity style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({
                                bddisplay: this.state.bddisplay === 'flex' ? 'none' : 'flex',
                                bdtext: this.state.bdtext === '-' ? '+' : '-',
                            })} >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>{this.state.bdtext}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: this.state.bddisplay }} >
                            <View style={{ justifyContent: 'center', margin: 15 }} >
                                {this.renderAddImage()}
                                <TouchableOpacity onPress={() => this.onPickImage()} style={{ backgroundColor: '#000', width: 80, height: 25, borderRadius: 25, borderWidth: 3, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: '#FFF' }} >UPLOAD</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 10 }} >
                                <TextInput placeholder='Name' onChangeText={(value) => this.setState({ name: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View><View style={{ padding: 10 }} >
                                <TextInput placeholder='Address' onChangeText={(value) => this.setState({ address: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ padding: 10 }} >
                                <TextInput placeholder='city' onChangeText={(value) => this.setState({ city: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Mobile' onChangeText={(value) => this.setState({ mobile: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='E-mail' onChangeText={(value) => this.setState({ mail: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                            <View style={{ padding: 10 }} >
                                <TextInput placeholder='Website' onChangeText={(value) => this.setState({ website: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                            <View style={{ padding: 10 }} >
                                <TextInput placeholder='Paypal E-mail' onChangeText={(value) => this.setState({ paypal_mail: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#FFF', marginBottom: 10 }} >
                        <View style={{ backgroundColor: '#e01c1d', height: 35, flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ color: 'white', paddingLeft: 20, fontSize: 17 }} >SOCIAL MEDIA LINKS</Text>
                            <TouchableOpacity style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({
                                smldisplay: this.state.smldisplay === 'flex' ? 'none' : 'flex',
                                smltext: this.state.smltext === '-' ? '+' : '-',
                            })} >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>{this.state.smltext}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: this.state.smldisplay }} >
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Facebook Link' onChangeText={(value) => this.setState({ fblink: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Twitter Link' onChangeText={(value) => this.setState({ tweetlink: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Linkedin Link' onChangeText={(value) => this.setState({ inlink: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Instagram Link' onChangeText={(value) => this.setState({ instalink: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#FFF', marginBottom: 10 }} >
                        <View style={{ backgroundColor: '#e01c1d', height: 35, flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ color: 'white', paddingLeft: 20, fontSize: 17 }} >SERVICE DETAILS</Text>
                            <TouchableOpacity style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                                this.setState({
                                    sddisplay: this.state.sddisplay === 'flex' ? 'none' : 'flex',
                                    sdtext: this.state.sdtext === '+' ? '-' : '+',
                                })} >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>{this.state.sdtext}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{ display: this.state.sddisplay }} >
                                <View style={{ padding: 10 }} >
                                    <TextInput placeholder='Services' onChangeText={(value) => this.setState({ services: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                </View>
                                <TouchableOpacity style={{ position: 'absolute', right: 20, top: 16 }} >
                                    <Image style={{ width: 25, height: 25 }} source={require('../images/Add-Service.png')} />
                                </TouchableOpacity>
                                <View style={{ padding: 10 }} >
                                    <Text style={{ color: '#000' }} >Set Price Range</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                                    <View style={{ padding: 10 }} >
                                        <TextInput placeholder='₹ 100' onChangeText={(value) => this.setState({ lowprice: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 30, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                    </View>
                                    <Text style={{ color: '#000', paddingRight: 5, paddingLeft: 5 }} >TO</Text>
                                    <View style={{ padding: 10 }} >
                                        <TextInput placeholder='₹ 10000' onChangeText={(value) => this.setState({ highprice: value })} style={{ paddingLeft: 10, paddingRight: 10, width: ((Dimensions.get('window').width) / 2) - 30, height: 40, borderWidth: 0.5, borderRadius: 25 }} underlineColorAndroid='transparent' />
                                    </View>
                                </View>
                                <View style={{ margin: 10, borderWidth: 0.5, borderRadius: 25 }} >
                                    <Picker style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width)-20, height: 40, borderWidth: 0.5, borderRadius: 25 }} >
                                        {this.Pickerdata(this.state.durationpicker)}
                                    </Picker>
                                </View>
                                <View style={{ padding: 10 }} >
                                    <Text style={{ color: '#000' }} >Business Hours {"&"} Days</Text>
                                    <View style={{ margin: 10, borderWidth: 0.5, borderRadius: 25 }} >
                                        <Picker style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width)-40, height: 40, borderWidth: 0.5, borderRadius: 25 }} >
                                            {this.Pickerdata(this.state.dayspicker)}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                    <TextInput placeholder='Hr' style={{ paddingLeft: 10, paddingRight: 10, width: 40, height: 40, borderWidth: 0.5, borderRadius: 5 }} underlineColorAndroid='transparent' />
                                    <TextInput placeholder='Min' style={{ paddingLeft: 10, paddingRight: 10, width: 40, height: 40, borderWidth: 0.5, borderRadius: 5 }} underlineColorAndroid='transparent' />
                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            lmidday: this.state.lmidday === 'AM' ? 'PM' : 'AM'
                                        })} >
                                            <View style={{ width: 40, height: 40, borderWidth: 0.5, borderRadius: 5, justifyContent: 'center' }}>
                                                <Text style={{ justifyContent: 'center', alignself: 'center' }} style={{ alignSelf: 'center' }}>{this.state.lmidday}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', paddingLeft: 10, paddingRight: 10 }} >-</Text>
                                    <TextInput placeholder='Hr' style={{ paddingLeft: 10, paddingRight: 10, width: 40, height: 40, borderWidth: 0.5, borderRadius: 5 }} underlineColorAndroid='transparent' />
                                    <TextInput placeholder='Min' style={{ paddingLeft: 10, paddingRight: 10, width: 40, height: 40, borderWidth: 0.5, borderRadius: 5 }} underlineColorAndroid='transparent' />
                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            hmidday: this.state.hmidday === 'AM' ? 'PM' : 'AM'
                                        })} >
                                            <View style={{ width: 40, height: 40, borderWidth: 0.5, borderRadius: 5, justifyContent: 'center' }}>
                                                <Text style={{ justifyContent: 'center', alignself: 'center' }} style={{ alignSelf: 'center' }}>{this.state.hmidday}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity>
                                        <Image style={{ width: 25, height: 25, paddingLeft: 10, paddingRight: 10 }} source={require('../images/Add-Service.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10 }} >
                                    <TextInput multiline={true} placeholder='Company Information' onChangeText={(value) => this.setState({ info: value })} style={{ paddingLeft: 10, paddingRight: 10, width: (Dimensions.get('window').width) - 20, height: 120, borderWidth: 0.5, borderRadius: 5 }} underlineColorAndroid='transparent' />
                                </View>
                                <View style={{ height: 40, flexDirection: 'row' }} >
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }} >
                                        <Text style={{ color: '#FFF' }} >CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e01c1d' }} >
                                        <Text style={{ color: '#FFF' }} >SAVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
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

const imgPickerOptions = {
    title: 'Select image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    maxWidth: 1024,
    maxHeight: 512,
    // maxWidth: 200,
    // maxHeight: 220,
    quality: 1,
    noData: true
};

