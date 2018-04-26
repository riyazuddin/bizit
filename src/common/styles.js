import { Platform, Dimensions } from 'react-native';

const { winW, winH } = Dimensions.get('window');

const Androidstyles = {
  // Login, Signup, Forgotpwd
  screenHeader: { fontSize: 20, fontWeight: 'bold' },

  TDlineth: { textDecorationLine: 'line-through' },

  // Common usage classes
  jStart: { justifyContent: 'flex-start' },
  jCenter: { justifyContent: 'center' },
  jEnd: { justifyContent: 'flex-end' },
  jspacebn: { justifyContent: 'space-between' },
  jaround: { justifyContent: 'space-around' },
  aslStretch: { alignSelf: 'stretch' },
  aslStart: { alignSelf: 'flex-start' },
  aslEnd: { alignSelf: 'flex-end' },
  aslCenter: { alignSelf: 'center' },
  aitStart: { alignItems: 'flex-start' },
  aitCenter: { alignItems: 'center' },
  aitEnd: { alignItems: 'flex-end' },
  acCenter: { alignContent: 'center' },
  tAlign: { textAlign: 'center' },
  row: { flexDirection: 'column' },

  //backgroundcolor
  bgefefef: { backgroundColor: '#efefef' },
  bgfff: { backgroundColor: '#fff' },
  bfc01530: { backgroundcolor: '#c01530' },
  // Margins

  mR5: { marginRight: 5 },
  mR10: { marginRight: 10 },
  mR15: { marginRight: 15 },
  mR20: { marginRight: 20 },
  mR30: { marginRight: 30 },
  mR40: { marginRight: 40 },
  mR90: { marginRight: 90 },




  mL5: { marginLeft: 5 },
  mL8: { marginLeft: 8 },
  mL10: { marginLeft: 10 },
  mL12: { marginLeft: 12 },
  mL15: { marginLeft: 15 },
  mL20: { marginLeft: 20 },
  mL25: { marginLeft: 25 },
  mL40: { marginLeft: 40 },
  mL50: { marginLeft: 50 },




  mT12: { marginTop: 12 },
  mT3: { marginTop: 3 },
  mT5: { marginTop: 5 },
  mT8: { marginTop: 8 },
  mT10: { marginTop: 10 },
  mT15: { marginTop: 15 },
  mT20: { marginTop: 20 },
  mT30: { marginTop: 30 },
  mT40: { marginTop: 40 },
  mT50: { marginTop: 50 },
  mT60: { marginTop: 60 },


  mB5: { marginBottom: 5 },
  mB10: { marginBottom: 10 },
  mB15: { marginBottom: 15 },
  mB20: { marginBottom: 20 },
  mB30: { marginBottom: 30 },
  mB50: { marginBottom: 50 },




  m20: { margin: 20 },
  m13: { margin: 13 },
  m10: { margin: 10 },
  m15: { margin: 15 },
  m8: { margin: 8 },
  m5: { margin: 5 },
  m4: { margin: 4 },
  m3: { margin: 3 },

  mH10: { marginHorizontal: 10 },
  mH15: { marginHorizontal: 15 },
  mH75: { marginHorizontal: 55 },
  mH20: { marginHorizontal: 20 },
  mH25: { marginHorizontal: 25 },


  mV10: { marginVertical: 10 },
  mV30: { marginVertical: 30 },


  //bottom
  bottom5: { bottom: 5 },
  bottom10: { bottom: 10 },
  bottom13: { bottom: -13 },

  // Text colors used
  red: { color: '#ed0707' },
  black: { color: '#000000' },
  white: { color: '#fff' },
  yellow: { color: '#dd9608' },
  green: { color: '#04d155' },
  grey: { color: '#e0e0e0' },
  pink: { color: '#ffd1f8' },
  blue: { color: '#008cff' },


  //backgroundColors
  bred: { backgroundColor: '#ed0707' },
  bblack: { backgroundColor: '#000000' },
  bwhite: { backgroundColor: '#fff' },
  bLWhite: { backgroundColor: '#fafafa' },
  byellow: { backgroundColor: '#dd9608' },
  bgrey: { backgroundColor: '#e0e0e0' },
  bgreen: { backgroundColor: '#04d155' },
  bpink: { backgroundColor: '#ffe8ef' },
  bblue: { backgroundColor: '#008cff' },

  // Border radius
  bNone: { borderWidth: 0 },
  bTNone: { borderTopWidth: 0 },
  bRad5: { borderRadius: 5 },
  bRad10: { borderRadius: 10 },
  bRad20: { borderRadius: 20 },
  bRad25: { borderRadius: 25 },
  bRad30: { borderRadius: 30 },
  bBLRad5: { borderBottomLeftRadius: 5 },
  bBRRad5: { borderBottomRightRadius: 5 },
  bTLRad5: { borderTopLeftRadius: 5 },
  bTRRad5: { borderTopRightRadius: 5 },

  //borderWidth
  bBWidth: { borderBottomWidth: 0.5 },
  bBWidth1: { borderBottomWidth: 1 },
  bBWidth3: { borderBottomWidth: 3 },
  bRWidth1: { borderRightWidth: 1 },
  bWidth: { borderWidth: 0.5 },
  bWidth1: { borderWidth: 1 },
  bWidth3: { borderWidth: 3 },



  //bordercolors
  borderWhite: { borderColor: 'white' },
  borderblack: { borderColor: 'black' },
  borderLC: { borderLeftColor: 'black' },


  //FontSizes
  FntFaNL: { fontFamily: 'NeueKabel-Light' },
  FntFaNR: { fontFamily: 'NeueKabel-Regular' },
  Fweight: { fontWeight: 'bold' },

  FntS13: { fontSize: 13 },
  FntS10: { fontSize: 10 },
  FntS8: { fontSize: 8 },
  FntS16: { fontSize: 16 },
  FntS17: { fontSize: 17 },
  FntS14: { fontSize: 14 },
  FntS15: { fontSize: 15 },
  FntS18: { fontSize: 18 },
  FntS20: { fontSize: 20 },
  FntS30: { fontSize: 30 },
  FntS50: { fontSize: 50 },
  FntS70: { fontSize: 70 },



  // flexDirection
  fdR: { flexDirection: 'row' },
  fdC: { flexDirection: 'column' },

  //  padding{
  p5: { padding: 5 },
  p8: { padding: 8 },
  p10: { padding: 10 },
  p15: { padding: 15 },
  p20: { padding: 20 },

  //padding left
  pL5: { paddingLeft: 5 },
  pL10: { paddingLeft: 10 },
  pL15: { paddingLeft: 15 },
  pL20: { paddingLeft: 20 },

  //padding right
  pR5: { paddingRight: 5 },
  pR10: { paddingRight: 10 },
  pR15: { paddingRight: 15 },
  pR20: { paddingRight: 20 },

  //padding top
  pT5: { paddingTop: 5 },
  pT10: { paddingTop: 10 },
  pT15: { paddingTop: 15 },
  pT20: { paddingTop: 20 },

  //padding bottom
  pB5: { paddingBottom: 5 },
  pB10: { paddingBottom: 10 },
  pB15: { paddingBottom: 15 },
  pB20: { paddingBottom: 20 },

  pH5: { paddingHorizontal: 5 },



  //header style
  MainHeaderStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',

    // margin:11
  },
  MainImageStyle: {
    backgroundColor: 'grey',
    width: Dimensions.get('window').width,
    height: 200
  },
  //Logo and backimage view 
  LBstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start'
  },
  pickerWrapStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginVertical: 5
  },
  pickerStyle: {
    height: 40
  },
  frow: {
    flexDirection: 'row'
  },
  LocModalMView: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(52,52,52,0.8)',
    justifyContent: 'flex-start',
    width: '100%'

  },
  shareSubModalView: {
    borderWidth: 0.5,
    margin: 10,
    marginTop: 15,
    height: 150,
    backgroundColor: 'white',
    width: (Dimensions.get('window').width) / 1.8,
    alignSelf: 'flex-end'
  },
  shMImg: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  LocTipView: {
    borderRadius: 120,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'white',
    marginTop: 20,
    width: '90%',
    marginLeft: 15,
    bottom: 5,
    backgroundColor: 'white',
    height: 45
  },
  DBstyle: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'red',
    alignSelf: 'center',
    height: 40,
    width: 100,
    borderColor: 'red',
    marginTop: 20
  },
  mapButtonstyle: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'black',
    left: 135
  },
  mapTextStyle: {
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    color: 'white'
  },
  //share and like main view
  SLImagesView: {
    position: 'absolute', top: 160, right: 0, flexDirection: 'row'
  },
  ftimage: {
    height: 40, width: 40, marginTop: 5
  },
  //BookingCard Style
  BookingCardStyle: {
    backgroundColor: '#ffffff', justifyContent: 'space-between', flexDirection: 'row', margin: 10, borderWidth: 0.5, borderRadius: 5,

    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#e1e1e1',
    shadowOpacity: 1,
    elevation: 3
  },
  BookingCardshopView:{flex: 1, backgroundColor: '#ffffff', justifyContent: 'space-between', flexDirection: 'column', marginLeft: 20, padding: 5 },
  BookingCardServiceView:{ alignItems: 'flex-start', height: 130, flex: 1, backgroundColor: 'pink', justifyContent: 'space-around', flexDirection: 'column', padding: 5 },
  shareImage: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    bottom: -13,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'red', borderColor: 'white', marginRight: 30
  }


};
const Iosstyles = {
  mainLayout: {
    flex: 1,
    backgroundColor: '#FFF'
  }
};
const style = Platform.OS === 'ios' ? Iosstyles : Androidstyles;

export default style;