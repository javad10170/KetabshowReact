
import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import RadioForm from 'react-native-simple-radio-button';

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemConatiner: {
        width: DeviceWidth * 0.45,
        height: DeviceHeight * 0.6,
        borderColor: "#d2d2d2",
        borderRadius: 5,
        borderWidth: 1,
    }

});


var radio_props = [
    { label: 'Title', value: 0 },
    { label: 'ISBN', value: 1 }
];


const SearchCategoryBar = ({ cat }) => (
    <View >
        <RadioForm
            radio_props = {radio_props}
            initial={0}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => { cat = value }}
        />
    </View>
)

export default SearchCategoryBar;