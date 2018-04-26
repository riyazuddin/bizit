import {AsyncStorage} from 'react-native';
import axios from 'axios';
import _ from 'underscore';

import config from '../config/Config';
var Utils = function() {};

Utils.prototype.isValidMobile = function (phoneNumber) {
    return phoneNumber && _.isNumber(phoneNumber) && (phoneNumber.toString().length === 10);
};

Utils.prototype.isValidNumber = function(value){
    return /^[0-9]*$/.test(value);
};

Utils.prototype.isValidEmail = function (email) {
    return email && /^\S+@\S+\.\S+/.test(email);
};

Utils.prototype.isValidPassword = function (pwd) {
    return _.isString(pwd) && (pwd.length >= 6);
};
// Utils.prototype.isValidPincode=function(pin){
//     console.log(pin.length)
//     console.log(pin.length === config.appUtils.pincodelenghth,'gghgu');
//     return _.isNumber(Number(pin)) &&(pin.length == config.appUtils.pincodelenghth);
// }

Utils.prototype.dbCall = function(url, method, header, data, callback){
    // console.log(url)
    let inputParams = {};
    if(method === 'GET'){
        console.log(config.routes.base + url)   
        inputParams = { url: config.routes.base + url, method: method, headers: header };
    } else {
        console.log(config.routes.base + url)   
        inputParams = { url: config.routes.base + url, method: method, headers: header, data:data };
    }
    if(method=== 'PUT')
    {
        console.log(config.routes.base+url)
        inputParams= { url: config.routes.base + url, method: method, headers: header, data:data }
    }
    if(method==='DELETE')
    {
        console.log(config.routes.base + url)        
        inputParams = { url: config.routes.base + url, method: method, headers: header };
        
    }
    axios(inputParams)
    .then((response) => {
        callback(response.data, true);
    })
    .catch((error) => {
        console.log('Error: ' + error + ' = From: ' + url);
        callback(error, false);
    });
};
Utils.prototype.getToken = function(key, callBack){
    AsyncStorage.getItem('Bizit:' + key, (err, resp) => {
        console.log(resp,'resp');
        if(err){
            callBack('Error fetching token', false);
        }else{
            if(resp == null || resp === "")
            {
                callBack('', false);
            }else{
                callBack(JSON.parse(resp), true);
            }
    }
           
    });
};
Utils.prototype.splitString = function(value, char){
    return value.split(char);
};

Utils.prototype.setToken = function(key, value, callBack){
    console.log(key,JSON.stringify(value))
    AsyncStorage.setItem('Bizit:' + key, JSON.stringify(value), (err) => {
        if(err)
            callBack('Error setting token', false);
        else
            callBack(value, true);
    });
};

export default new Utils();