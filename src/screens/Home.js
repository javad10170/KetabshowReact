import React from "react";
import {
  ScrollView, View, StyleSheet, Dimensions, TextInput, ToastAndroid, TouchableOpacity,Keyboard,SafeAreaView,StatusBar
} from "react-native";
import { Card, Button, Row, Icon } from "react-native-elements";
import FlipToggle from 'react-native-flip-toggle-button'
import kapi from "../api/v1/kapi";
import BookInfo from "../components/BookInfo";
import BookItem from "../components/BookItem";
import colors from './styles/theme';
import ProgressSpinner from "../components/ProgressSpinner";
import OneSignal from 'react-native-onesignal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { version } from '../../package.json';



// var radio_props = [
//   { label: 'Title\n     نام ', value: 0 },
//   { label: 'Author\n    نویسنده', value: 1 },
//   { label:  'ISBN \n     شابک', value: 2 },

// ];

var DeviceWidth = Dimensions.get('window').width;
var DeviceHeigth = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },

  SearchContainer: {
    height: DeviceHeigth * 0.11,
    width: DeviceWidth,
    backgroundColor: colors.SearchBar,
    alignItems: "stretch"
  },

  SearchBox: {
    borderRadius: 0,
    width: DeviceWidth * 0.7,
    backgroundColor: "white",
    height: 50,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1,
    color: "black",
    marginRight: 1
  },

  SearchButton: {
    backgroundColor: "white",
    marginTop: 10,
    width: DeviceWidth * 0.4
  }
});
//import Icon2 from 'react-native-vector-icons/FontAwesome';

//import { BackHandler } from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props)
    //this.props.navigation.dispatch(resetAction)
    this.state = {
      searchPhrase: "",
      isISBN: false,
      bookResults: [],
      spinnerVisible: false,
      loadingVisible:false,
      searchCategory: 0,
      page:1
    }

  }

  _getBooksByISBN(isbn) {
    kapi.getBooksByISBN(isbn).then((response) => response.json()).
      then((responseJson) => {
        //alert(responseJson);
        this.setState({ bookResults: responseJson.result })
      })
      .catch((error) => {
        //this.setState({spinnerVisible:false});
        ToastAndroid.show("خطا در ارتباط با سرور", ToastAndroid.LONG);
      });
  }

  _getBooksByTitle(title) {
    Keyboard.dismiss();
    this.setState({ spinnerVisible: true });
    kapi.getBooksByTitle(title,this.state.page).then((response) => response.json()).
      then((responseJson) => {
        //alert(responseJson);
        this.setState({ bookResults: responseJson.result, spinnerVisible: false })
      })
      .catch((error) => {
        //this.setState({spinnerVisible:false});
        ToastAndroid.show("خطا در ارتباط با سرور", ToastAndroid.LONG);
        this.setState({ spinnerVisible: false });
      });
  }

  _onRefresh(){
    this.setState({ loadingVisible: true });
    kapi.getBooksByTitle(this.state.searchPhrase,this.state.page+1).then((response) => response.json()).
    then((responseJson) => {
      //alert(responseJson);
      this.setState({ bookResults:this.state.bookResults.concat(responseJson.result), page:this.state.page+1, loadingVisible: false })
    })
    .catch((error) => {
      //this.setState({spinnerVisible:false});
      ToastAndroid.show("خطا در ارتباط با سرور", ToastAndroid.LONG);
      this.setState({ loadingVisible: false });
    });
  }
  
  componentWillMount() {
    OneSignal.init("297de29d-42d7-432c-8bcb-a099d409fb0a");
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  gotoDetails(inf) {
    this.props.navigation.navigate("Details", { info: inf });
  }

  componentDidMount() {
    //alert(version);
  }

  render() {

    return (
      <SafeAreaView style={styles.Container}>
        <StatusBar backgroundColor={colors.SearchBar}/>
        {this.state.spinnerVisible && <ProgressSpinner color={colors.SearchBar} />}
        {this.state.loadingVisible && <ProgressSpinner backColor='rgba(0,0,0,0)' type="Circle" color={colors.SearchBar} />}
        <View style={styles.SearchContainer}>
          {/* <Text>Ketap</Text> */}
          <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-around", flex: 1 }}>
          <Icon hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} underlayColor={colors.AppViolet}
            color="white"  type="Ionicons" name="menu" size={30} onPress={() => { this.props.navigation.openDrawer(); }} />
            <TextInput
              onChangeText={(text) => this.setState({ searchPhrase: text })}
              value={this.state.searchPhrase}
              style={styles.SearchBox}
              underlineColorAndroid='transparent'
              placeholder="Title(نام کتاب), Author(نویسنده) or ISBN(شابک)"
              onSubmitEditing = {()=>{this._getBooksByTitle(this.state.searchPhrase)}}
 
              />
            <View style={{ height: 50, width: 50, backgroundColor: "white", justifyContent: "center",borderRadius:7,marginLeft:-40 }}>

              <Icon name="search" size={25}
                onPress={() => {
                   this._getBooksByTitle(this.state.searchPhrase)
                }}
              /></View>
          </View>

        </View>
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: DeviceHeigth * 0.21 }}
          
          onScroll={(e) => {
            var windowHeight = Dimensions.get('window').height,
              height = e.nativeEvent.contentSize.height,
              offset = e.nativeEvent.contentOffset.y;
            if (windowHeight + offset >= height) {
              this._onRefresh();
            }
          }}

          >

            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                {
                  this.state.bookResults.length > 0 && this.state.bookResults.map((inf) => {
                    return (
                      <View key={inf.id} style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => { this.gotoDetails(inf) }}>
                          <BookItem info={inf} />
                        </TouchableOpacity>
                      </View>
                    )
                  })

                }
              </View>
            </View>


          </ScrollView>

        </View>
      </SafeAreaView>
    )


  }
}

export default Home;
