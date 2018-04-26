import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import Router from './src/Router';


export default class App extends Component {
  state={
    loggedIn:false,
    type:'Seller',
    defaultCheck:false,
    role:'client'
  }
  componentDidMount()
  {
    this.getItem().then((resp) => {
      console.log(GetJSonresp.role)
      if(!resp)
      {
          this.setState({ loggedIn:false, defaultCheck:true });
      }
      else{
    //  let GetJSonresp=JSON.parse(resp);,role:GetJSonresp.role
        
          this.setState({ loggedIn:true, defaultCheck:true });
        // console.log(resp)
          
        }
    });
  }
  async getItem(){
    return await AsyncStorage.getItem('Bizit:user');
  }
  render() {
   
    if(!this.state.defaultCheck) {
      return null;
    }
    if(this.state.loggedIn){
        let LoginValid = Router(true,this.state.role);
        return <LoginValid/>;
    } else {
        let LoginInvalid = Router(false,this.state.role);
        return <LoginInvalid/>;
    }
      
  
  }
}
