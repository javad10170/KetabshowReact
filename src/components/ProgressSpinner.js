import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import colors from '../screens/styles/theme';

//export default class ProgressSpinner extends Component {
  //  render () {
    const ProgressSpinner = ({backColor,type,color}) => (
            <View style={[styles.spinnerContainer,{backgroundColor: backColor}]}>
                <Spinner style={styles.spinner}
                        size={80} 
                        type={type}
                        color={color}/>
            </View>
        );
    
//}

ProgressSpinner.defaultProps={backColor: 'rgba(0,0,0,.80)',color:"white",type:"ThreeBounce"}

const styles = StyleSheet.create({
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',

        zIndex:100
    },
    spinner: {
        marginBottom: 50
    }
});

export default ProgressSpinner; 