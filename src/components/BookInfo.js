
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

});

const BookInfo = ({ title, author, year, pages, extension, coverdownload }) => (
    <View style={{
        flexDirection: "row", width: DeviceWidth * 0.99, height: DeviceHeight * .4,
        borderColor: "white", borderWidth: 1, marginTop: 10, backgroundColor: "white"
    }}>

        <View style={{ width: DeviceWidth * 0.4, alignItems: "center" }}>
            <Image resizeMode="contain" style={{ width: DeviceWidth * 0.29, height: DeviceHeight * .45 * 0.8 }}
                source={{ uri: coverdownload }}
            />
            <View><Text>{extension}</Text></View>
        </View>

        <View style={{ width: DeviceWidth * 0.5, justifyContent: "center", marginTop: 30 }} >

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.itemText}>Title:</Text>
                <Text style={{ flexWrap: "wrap", flex: 1 }}> {title}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.itemText}>Author:</Text>
                <Text style={{ flexWrap: "wrap", flex: 1 }}> {author}</Text>
            </View>


            <View style={{ flexDirection: "row" }}>
                <Text style={styles.itemText}>Year:</Text>
                <Text> {year}</Text>
            </View>


            <View style={{ flexDirection: "row" }}>
                <Text style={styles.itemText}>Pages:</Text>
                <Text> {pages}</Text>
            </View>

        </View>

    </View>
)

export default BookInfo;