import React from 'react';
import {Text} from 'react-native';
//import styles from './Styles';

const CText = ({children, cStyle,num}) => {
    return (
        <Text numberOfLines={num} style={[cStyle]}>{children}</Text>
    );
};

export {CText};