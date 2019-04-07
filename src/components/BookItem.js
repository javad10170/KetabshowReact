
import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    itemText: {
        color: "black",
        fontSize: 15,
        fontWeight: "900",
    },

    itemConatiner:{
        width:DeviceWidth* 0.45,
        height:DeviceHeight*0.6,
        borderColor:"#d2d2d2",
        borderRadius:5,
        borderWidth:1,
    }

});

const BookItem = ({info}) => (
    <View style={styles.itemConatiner}>
                <Image resizeMode="contain" style={{ width:DeviceWidth* 0.44, height:DeviceHeight* 0.4 }}
                //source={{ uri: info.coverdownload }}
                source={{ uri:info.coverdownload }} //"http://gen.lib.rus.ec/covers/"+ info.coverurl
                />
                 
            <Text style={{padding:5,fontWeight:"500"}}>{info.title.substring(0, Math.min(info.title.length,60))}</Text>
            <Text style={{padding:5,fontWeight:"300"}}>{info.author.substring(0, Math.min(info.author.length,30))}</Text>
            <View style={{ flexDirection: "row" }}>
                <Text> {info.pages}</Text>
                <Text> pages</Text>
            </View>



    </View>
)

export default BookItem;