import React, { Component } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, FlatList, Image, Dimensions, Modal, DatePickerAndroid, Platform, } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import styles from '../common/styles'
import Header from '../common/Header'
import Utils from '../common/Utils'
import config from '../config/Config'

export default class BookinSlot extends Component {
	state = {
		showMe: false,
		Day: [],
		DArr: [],
		TimeArr: [],
		showMe: false,
		showMe2: false, value: '', latitude: '', longitude: '', token: '',servicename:'',
		selectedDate: '', modalDate: '', modalselectDate: '', htcolor: 'grey', selectedstatus: '',shopName:'',shopaddress:'',shopWebsite:'',shopuserID:'',shopbusinessID:''
	}

	componentDidMount() {
		const self = this;
		self.getAdate();
		self.setState({ serviceid: self.props.navigation.state.params.serviceID,servicename:self.props.navigation.state.params.servicename, BID: self.props.navigation.state.params.Bid }, () => { console.log('serviceid: ' + self.state.BID) })
		Utils.getToken('user', function (tResp, tStat) {
			console.log(tResp, 'tResp');
			console.log(tStat, 'tStat');
			if (tResp != '') {
				self.setState({ token: tResp.token }, () => { console.log('token in Booking Slot', self.state.token); });
				self.fetchShopdetails(tResp.token,self.props.navigation.state.params.Bid)

			}
		});

	}

	getAdate() {
		const self = this;
		var day = new Date();
		var nextDay = new Date();
		var dateArr = [];
		console.log('colls', dateArr);
		for (let index = 0; index < 7; index++) {
			if (index != 0) {
				nextDay.setDate(day.getDate() + 1);
			}
			day = nextDay;
			dateArr.push(self.getformatDate(nextDay));

		}
		self.setState({ DArr: dateArr }, () => { console.log('upddtt', self.state.DArr) })
		console.log('coll', dateArr);
		console.log(self.state.DArr)
	}
	miliseconds(hrs, min, sec) {
		return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
	}
	confirmBooking(ID, date, status) {
		const self = this;
		if (status === 'available') {
			var res = 0
			console.log(self.state.value, ID, date)

			var test = Utils.splitString(self.state.value, ':')
			console.log(test)
			var test1 = Utils.splitString(test[1], ' ')
			console.log(test1)
			var min = Number(test1[0])
			if (test1[1] === 'PM') {
				res = Number(test[0]) + 12
			}
			else {
				res = Number(test[0])
			}
			console.log(res)
			var ms = self.miliseconds(res, min, 0)
			console.log(ms)

			self.setState({ showMe2: false })
			Utils.dbCall(config.routes.bookSlot, 'POST', { token: self.state.token }, { businessId: self.state.BID, serviceId: ID, slotDate: date, slot: ms }, function (resp) {
				console.log(resp)
				if (resp.status) {
					self.props.navigation.navigate('PaymentMode', { 'selectedtime': self.state.value })

				}
				else {
					alert(resp.message);
				}
			});
		}
		else {
			alert('this slot was not available for booking')
		}
	}
	addtoWishlistDbcall() {
		const self = this;
		Utils.dbCall(config.routes.addtowishlist, 'POST', { token: self.state.token }, { userId: self.state.shopuserID, businessId: self.state.shopbusinessID }, function (resp) {
			console.log(resp)
			if (resp.status) {
				if (resp.message === 'Business added to favourites') {
					self.setState({ htcolor: 'red' })
				}
				else if (resp.message === 'removed from favourites') {
					self.setState({ htcolor: 'grey' })
				}
				alert(resp.message)
			}
		})
	}

	getformatDate(formdate) {
		var dayarr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
		console.log('formdate', formdate);
		let test = Utils.splitString(formdate.toJSON(), 'T')
		console.log(test);

		return { day: dayarr[formdate.getDay()], date: "" + formdate.getDate(), reqdate: test[0], txtcolor: 'black', vColor: 'white' };
	}
	fetchShopdetails(tokenvalue, ID) {
        const self = this;
        self.setState({ spinnerBool: true })
        console.log(tokenvalue + '\n' + ID);
        Utils.dbCall(config.routes.fetchShopDetails + ID, 'GET', { token: tokenvalue.toString() }, {}, function (resp) {
            console.log(resp)
            if (resp.status) {
                self.setState({ shopName: resp.data.businessName, shopaddress: resp.data.address, shopWebsite: resp.data.website, shopuserID: resp.data.user, shopbusinessID: resp.data._id, spinnerBool: false })

            }

        });
    }

	getSlotDBCall(ID, date, data) {
		const self = this;
		console.log(self.state.modalDate)
		if (data != 'test') {
			var test = []
			for (let i = 0; i < self.state.DArr.length; i++) {
				const element = self.state.DArr[i];
				if (data === element.date) {
					element.vColor = 'black'
					element.txtcolor = 'white'
				}
				else {
					element.vColor = 'white'
					element.txtcolor = 'black'

				}
				test.push(element)



			}
			self.setState({ DArr: test }, () => { console.log(self.state.DArr) })
		}
		var reqtimearr = []
		console.log('token: ' + self.state.token + '\n' + 'serviceId: ' + ID + '\n' + 'date:' + date)
		Utils.dbCall(config.routes.getServiceSlots, 'POST', { token: self.state.token }, { serviceId: ID, date: date, }, function (resp) {
			console.log(resp)
			if (resp.status) {

				for (let i = 0; i < resp.data.length; i++) {
					const element = resp.data[i];
					if (element.status === 'offline') {
						element.bgcolor = 'grey'
						element.txtcolor = 'white'
					}
					else if (element.status === 'available') {
						element.bgcolor = 'white'
						element.txtcolor = 'black'
					}
					var startHour = new Date(element.startTime).getUTCHours()
					var startMinutes = new Date(element.startTime).getUTCMinutes()
					var endHour = new Date(element.endTime).getUTCHours()
					var endMinutes = new Date(element.endTime).getUTCMinutes()
					if (startHour < 12) {
						if (startMinutes === 0) {
							element.reqstarttime = startHour + ':' + startMinutes + '0' + ' ' + 'AM'
						}
						else {
							element.reqstarttime = startHour + ':' + startMinutes + ' ' + 'AM'

						}
					}
					if (startHour === 12) {
						if (startMinutes === 0) {
							element.reqstarttime = startHour + ':' + startMinutes + '0' + ' ' + 'PM'

						}
						else {
							element.reqstarttime = startHour + ':' + startMinutes + ' ' + 'PM'
						}
					}
					if (startHour > 12) {
						element.reqstarttime = (startHour - 12) + ':' + startMinutes + ' ' + 'PM'
					}
					if (endHour < 12) {
						if (endMinutes === 0) {
							element.reqendtime = endHour + ':' + endMinutes + '0' + ' ' + 'AM'

						}
						else {
							element.reqendtime = endHour + ':' + endMinutes + ' ' + 'AM'
						}
					}
					if (endHour === 12) {
						if (endMinutes === 0) {
							element.reqendtime = endHour + ':' + endMinutes + '0' + ' ' + 'AM'

						}
						else {
							element.reqendtime = endHour + ':' + endMinutes + ' ' + 'PM'
						}
					}
					if (endHour > 12) {
						if (endMinutes === 0) {
							element.reqendtime = (endHour - 12) + ':' + endMinutes + '0' + ' ' + 'PM'

						}
						else {
							element.reqendtime = (endHour - 12) + ':' + endMinutes + ' ' + 'PM'
						}


					}
					reqtimearr.push(element)
				}
				console.log('dbtimearr====', reqtimearr)
				self.setState({ TimeArr: reqtimearr }, () => { console.log('Timearr', self.state.TimeArr) })

			}
			else {
				alert(resp.message);
			}
		});


	}
	
	onPickdate() {
		const self = this;
		if (Platform.OS === 'ios') {
			self.setState({ showModal: !self.state.showModal })
		} else {
			try {
				let currDate = new Date();

				const { action, year, month, day } = DatePickerAndroid.open({
					date: new Date(),
				}).then((response) => {
					if (response.action === "dateSetAction") {
						var month = response.month + 1
						if (month < 10) {
							var Sdate = response.year + "-" + "0" + month + "-" + response.day
							self.setState({ selectedDate: Sdate }, () => { self.getSlotDBCall(self.state.serviceid, self.state.selectedDate, 'test') });
							console.log(self.state.serviceid, self.state.selectedDate)
						}
						else {
							var Sdate = response.year + "-" + month + "-" + response.day
							self.setState({ selectedDate: Sdate }, () => { self.getSlotDBCall(self.state.serviceid, self.state.selectedDate, 'test') });


						}
						var Sdate = response.year + "-"
						let date = response.day + "/" + month + "/" + response.year;
						var pdate = new Date(month + "/" + response.day + "/" + response.year);
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
		const { goBack } = this.props.navigation;

		return (
			<View style={{ flex: 1 }}>
				<Header backclick={() => this.props.navigation.navigate('ShopDetails')}
					lmodal={false} menuClick={() => this.props.navigation.navigate('DrawerToggle')} onclick={() => this.props.navigation.navigate('Profile')} />

				<ScrollView scrollEnabled={true}>
					<View>
						<View style={[styles.bgrey,{ width: Dimensions.get('window').width, height: 200 }]}>
							<Text style={[styles.FntS70,styles.FntFaNR]}>Image</Text>
							<View style={[styles.bgrey,styles.bWidth1,styles.p5,styles.aslEnd,{ width: Dimensions.get('window').width / 2}]}>
								<Text style={[styles.FntS20,styles.FntFaNR]}>{this.state.shopName}</Text>
								<View style={[styles.fdR,styles.mB5]}>
									<Image resizeMode='contain' source={require('../images/Nav-Location.png')} style={[styles.mT8,{ height: 20, width: 20}]} />
									<Text style={[styles.FntS13,styles.FntFaNR,styles.mT10]}>{this.state.shopaddress}</Text>

								</View>
							</View>
						</View>



						<View style={[styles.fdR,styles.jspacebn,styles.bpink]}>
							<View >
								<Text style={[styles.FntS20,styles.mT10,styles.black,styles.mL15]}>{this.state.shopName}</Text>
								<View style={[styles.fdR]}>
									<View style={[styles.fdR,styles.mT5,styles.mL15,]}>
										<Image style={[styles.mT5,styles.mR5,{ height: 20, width: 15 }]} source={require('../images/Company-Profile-Location2.png')} />
										<Text style={[styles.FntS20,styles.black]}>{this.state.shopaddress}</Text>

									</View>
									<View style={[styles.aslEnd,styles.bblack,styles.bRad20,styles.bWidth1,styles.mT15,{left: 140 }]}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('Map', { ID: this.state.businessID })}>
											<Text style={[styles.white,styles.aslCenter,styles.mT5,styles.mB10,styles.FntS16,styles.mH15]}>View on map</Text>
										</TouchableOpacity>
									</View>
								</View>

								<Text style={[styles.FntS16,styles.mL5,styles.black]}>  (Mon-Sat)9:00AM to 7:00PM</Text>

								<Text style={[styles.mL15,styles.blue,styles.FntS15,styles.m5]}>{this.state.shopWebsite}</Text>
							</View>



						</View>
						<View style={[styles.fdR,{ position: 'absolute', top: 160, right: 0 }]}>
							<View style={[styles.mR10,styles.jCenter,styles.bRad30,styles.bWidth1,styles.bottom13,styles.bwhite,{ height: 50, width: 50 }]}>
								<TouchableOpacity onPress={() => this.setState({ showMe: !this.state.showMe })}>
									<Image resizeMode='contain' source={require('../images/Share2.png')}
										style={[styles.aslCenter,{ height: 25, width: 25 }]} />
								</TouchableOpacity>

								<Modal visible={this.state.showMe}
									transparent={true}
									animationType={'slide'}
									onRequestClose={() => Console.warn("close filter")}>
									<View style={[styles.jStart,styles.aslStart,styles.bgrey,{ flex: 1,  width: '100%' }]}>

										<View style={[styles.jCenter,styles.aslCenter,styles.mT20]}>
											<View style={[styles.aslCenter]}>
												<TouchableOpacity onPress={() => this.setState({ showMe: !this.state.showMe })}>
													<Image resizeMode='contain' source={require('../images/Close_Image.png')} style={[styles.mL10,styles.aslCenter,{ height: 50, width: 50}]} />
												</TouchableOpacity>
											</View>
											<View
												style={[styles.bWidth,styles.m10,styles.mT15,styles.bwhite,styles.aslEnd,{ height: 150,width: (Dimensions.get('window').width) / 1.8 }]}>
												<Text style={[styles.FntS20,styles.red,styles.aslCenter,styles.m20]}>SHARE</Text>

												<View style={[styles.jaround,styles.aitCenter,styles.mT10,styles.fdR]}>



													<Image resizeMode='contain' source={require('../images/fbb.png')} style={{ height: 40, width: 40 }} />
													<Image resizeMode='contain' source={require('../images/twitterr.png')} style={{ height: 40, width: 40 }} />
													<Image resizeMode='contain' source={require('../images/mail.png')} style={{ height: 40, width: 40 }} />

												</View>


											</View>
										</View>
									</View>
								</Modal>

							</View>
							<View style={[styles.bWidth1,styles.bRad30,styles.bottom13,styles.jCenter,styles.borderWhite,styles.mR20,{ height: 50, width: 50,backgroundColor: this.state.htcolor}]}>
								<TouchableOpacity onPress={() => this.addtoWishlistDbcall()} >

									<Image resizeMode='contain' source={require('../images/Wishlist1.png')} style={[styles.mT5,styles.aslCenter,{ height: 25, width: 25 }]} />
								</TouchableOpacity>
							</View>
						</View>

					</View>



					<View style={[styles.fdR,styles.jspacebn,styles.bpink]}>
						<View style={[styles.fdR,styles.mL15,styles.m5]}>
							<Image resizeMode='contain' source={require('../images/fb.png')} style={[styles.mR10,{ height: 40, width: 40}]} />
							<Image resizeMode='contain' source={require('../images/twitter.png')} style={{ height: 40, width: 40 }} />

						</View>
					</View>
					<View style={[styles.fdR,styles.jspacebn,styles.bpink]}>
						<View style={[styles.fdR,styles.mT15,styles.mL15]}>
							<Text style={[styles.FntS18,styles.black]}>{this.state.servicename} Price:</Text>
							<Text style={[styles.FntS18,styles.red]}>$ 500 to $ 2500</Text>
						</View>
						<Image style={[styles.mB15,styles.mT5,styles.mR30,{ height: 40, width: 40 }]} source={require('../images/Call.png')} />

					</View>
					<View style={[styles.bWidth,styles.bred]}>
						<Text style={[styles.FntS14,styles.white,styles.aslCenter,styles.m10]}>BOOK SLOT</Text>
					</View>
					<ScrollView horizontal={true}>
						<View style={[styles.frow]}>
							{
								console.log(this.state.DArr)
							}
							<FlatList
								data={this.state.DArr}

								horizontal={true}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity onPress={() => { this.setState({ modalDate: item.day + '  ' + item.date + '/' + (new Date().getMonth() + 1), modalselectDate: item.reqdate }, () => { this.getSlotDBCall(this.state.serviceid, item.reqdate, item.date) }) }}>
											<View style={[styles.m10,styles.bWidth,{ width: 80, height: 60, backgroundColor: item.vColor }]}>


												<Text style={[styles.aslCenter,styles.FntS20,{color: item.txtcolor }]}>{item.date}</Text>
												<Text style={[styles.aslCenter,styles.FntS20,{color: item.txtcolor }]}>{item.day}</Text>
											</View>
										</TouchableOpacity>
									)
								}}
								keyExtractor={(item, index) => index}
								extraData={this.state.DArr}
							/>
							<TouchableOpacity onPress={() => this.onPickdate()} >
								<Image source={require('../images/User-Nav-Booked-Slots.png')} style={[styles.mL10, { height: 50, width: 50, top: 5 }]} />
							</TouchableOpacity>

						</View>
					</ScrollView>
					<View style={[styles.fdR,styles.jspacebn,styles.m15]}>
						<View style={[styles.bWidth,styles.m10,{ width: 30, height: 30 }]}>

						</View>
						<View style={[styles.m8]}>
							<Text style={[styles.FntS17,styles.mT3]}>Available</Text>
						</View>
						<View style={[styles.bWidth,styles.m10,styles.bgrey,{ width: 30, height: 30}]}>

						</View>
						<View style={[styles.m8]}>
							<Text style={[styles.FntS17,styles.mT3]}>Pending</Text>
						</View>
						<View style={[styles.bWidth,styles.bgreen,styles.m10,{ width: 30, height: 30}]}>

						</View>
						<View style={[styles.m8]}>
							<Text style={[styles.mT3,styles.FntS17]}>Booked</Text>
						</View>
					</View>
					<View >
						<FlatList
							numColumns={4}
							// horizontal={true}

							data={this.state.TimeArr}
							keyExtractor={(item, index) => index}
							renderItem={({ item }) => {
								return (
									<View style={[styles.m5,styles.bWidth,{ width: 90, backgroundColor: item.bgcolor }]}>
										<TouchableOpacity onPress={() => item.status = 'available' ? this.setState({ showMe2: !this.state.showMe2, value: item.reqstarttime, selectedstatus: item.status }) : alert('not available')}>

											<Text style={[styles.aslCenter,styles.m10,styles.FntS14,{ color: item.txtcolor }]}>{item.reqstarttime}</Text>
										</TouchableOpacity>


									</View>
								)
							}}
						/>
						<Modal visible={this.state.showMe2}
							transparent={true}
							animationType={'slide'}
							onRequestClose={() => Console.warn("close filter")}>
							<View style={[styles.jCenter,{ flex: 1, backgroundColor: 'rgba(20,20,20,0.5)' }]}>
								<View
									style={[styles.bWidth,styles.bwhite,styles.m10,styles.aslCenter,{height: 250, width: (Dimensions.get('window').width) - 20}]}>

									<View style={[styles.jspacebn,styles.fdR,styles.bBWidth]}>
										<Text style={[styles.FntS30,styles.m10,styles.red]}>CONFIRM BLOCKINSLOT</Text>

									</View>
									<View style={[styles.fdC,styles.m20]}>

										<Text style={[styles.mV10]}>{this.state.modalDate}</Text>
										<Text>{this.state.value}</Text>

									</View>

									<View style={[styles.fdR]}>
										<View style={[styles.brad30,styles.bWidth,styles.mL20]}>

											<TouchableOpacity onPress={() => this.setState({ showMe2: false })}>

												<Text style={[styles.m10,styles.aslCenter,styles.FntS20]}>Cancel</Text>
											</TouchableOpacity>
										</View>
										<View style={[styles.mH30,styles.bblack,styles.bWidth1,styles.bRad10]}>

											<TouchableOpacity onPress={() => this.confirmBooking(this.state.serviceid, this.state.modalselectDate, this.state.selectedstatus)} >

												<Text style={[styles.m10,styles.white,styles.aslCenter,styles.FntS20]}>Book Now</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>

							</View>
						</Modal>
					</View>
				</ScrollView>
			</View>
		)
	}
}