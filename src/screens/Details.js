import React from "react";
import {
  ScrollView, View, StyleSheet, Dimensions, TextInput, ToastAndroid, Text,TouchableOpacity,
  Image, ImageBackground, Linking, Share, SafeAreaView
} from "react-native";
import { Card, Button, Row, Icon } from "react-native-elements";
import colors from './styles/theme';
import HTMLView from 'react-native-htmlview';
import Kapi from '../api/v1/kapi'
var striptags = require('striptags');

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#673bb8",
    alignItems: "center"
  },

});

class Details extends React.Component {
  constructor(props) {
    super(props)
    //this.props.navigation.dispatch(resetAction)
    this.state = {
      bookDetails: this.props.navigation.state.params.info,
      fa:"",
    }

  }

  retrieveISBN( ISBNstring ){
    if (ISBNstring.length < 5) return "-"; 
    let ISBNarray = ISBNstring.split(",");
    return ISBNarray.length > 1 ? ISBNarray[1]: ISBNarray[0];
  }
  shareBook(bookId) {
    Share.share({
      message: "http://toolstack.ir/#!/bookinfo/" + bookId,
      url:"http://toolstack.ir/#!/bookinfo/" + bookId,
      title: 'کتاپ، کتابخانه‌ای به وسعت یک دنیا'
    }, {
        // Android only:
        dialogTitle: 'Share ‌Book',
      });
  }

  translateToPersian(){
    let englishDesc = striptags(this.props.navigation.state.params.info.descr);
    translate(englishDesc, {to: 'fa'}).then(res => {
     this.setState({fa:res});
      //=> I speak English
      console.log(res.from.language.iso);
      //=> nl
  }).catch(err => {
      console.error(err);
  });
  }

  componentDidMount() {
  }

  render() {
    const { bookDetails } = this.state;
    return (

      <SafeAreaView style={styles.Container}>
        <ScrollView>
          <View style={{
            height: 0.8 * DeviceHeight, width: DeviceWidth,
            backgroundColor: colors.AppViolet
          }}>
            <ImageBackground resizeMode="cover" style={{
              width: DeviceWidth, height: DeviceHeight * 0.8,
              justifyContent: "flex-end"
            }}
              // source={{ uri: Kapi.base_url+bookDetails.coverurlcustom }}
              // source={{ uri: bookDetails.coverdownload }}  http://gen.lib.rus.ec/covers/
              source={{uri: bookDetails.coverdownload}}
            >
              <View style={{
                backgroundColor: "#00000099", height: DeviceHeight * 0.15,
                justifyContent: "center", alignItems: "center"
              }}>
                <Text style={{
                  flexWrap: "wrap", color: "white", padding: 5,
                  fontWeight: "900"
                }}>{bookDetails.title}</Text>
              </View>
            </ImageBackground>

          </View>

          <View style={{
            borderTopColor: "#675dff", borderTopWidth: 2, width: DeviceWidth, flexDirection: "row",
            flex: 1, alignItems: "center", justifyContent: "space-around", paddingTop: 5
          }}>
            <View><Icon underlayColor={colors.AppViolet} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} name="share" color="white" size={40} onPress={() => { this.shareBook(bookDetails.id) }} /></View>
            <View><Text style={{fontWeight:"900", color:"white",fontSize:20}}>{bookDetails.extension}</Text></View>
            <View><Text style={{fontWeight:"900", color:"white",fontSize:20}}>{(bookDetails.filesize/10e6).toFixed(2)} MB</Text></View>
            <View><Icon underlayColor={colors.AppViolet} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} name="arrow-downward" color="white" size={40} onPress={() => { Linking.openURL(Kapi.base_url + bookDetails.download) }} /></View>
          </View>
          <TouchableOpacity activeOpacity={.8}  onPress={()=>{bookDetails.identifier && Linking.openURL("https://isbnsearch.org/isbn/"+this.retrieveISBN(bookDetails.identifier))}} >
          <View style={{flexDirection:"row",justifyContent:"center"}}>
            <Text style={{fontWeight:"900", color:"white",fontSize:20,alignSelf:"center"}}>ISBN: {bookDetails.identifier !=null ? this.retrieveISBN(bookDetails.identifier):"-"}</Text>
            <Icon name="info-outline" color="white"  underlayColor={colors.AppViolet} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            containerStyle={{paddingLeft:7}}
           />
          </View>
          </TouchableOpacity>
          <Text style={{
            alignSelf: "center", fontWeight: "900", color: "white", padding: 7,
            borderWidth: 1, borderColor: "white", borderRadius: 10,marginTop:5
          }}>DESCRIPTION</Text>
          <Text style={{ color: "white", padding: 15 }}>{striptags(bookDetails.descr)}</Text>

        </ScrollView>
      </SafeAreaView>
    )


  }
}

export default Details;
