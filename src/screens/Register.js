import React from "react";
import { ImageBackground, View, Text, AsyncStorage, TextInput,ToastAndroid } from "react-native";
import { NavigationActions,SafeAreaView } from 'react-navigation';
import { Card, Button, FormLabel, FormInput, Header, Icon } from "react-native-elements";
import kapi from "../api/v1/kapi";
import store from 'react-native-simple-store';
import gstyles from './styles/generalstyles';
import colors from './styles/theme';
//export default ({ navigation }) => (
class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      mobile: '',
      passwordrepeat:'',
    }
  }
  _register() {

    if(this.state.password != this.state.passwordrepeat){
      ToastAndroid.show("مغایرت در رمز عبور و تکرار آن.",ToastAndroid.SHORT);
      return;
    }
    kapi.register(this.state.mobile, this.state.username, this.state.password, this.state.passwordrepeat).then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson);
        if (responseJson.status == 1) {
          // AsyncStorage.setItem(AUTH_INFO.REGISTERED, "true", () => {
          //   global.registered = "true";
          //   this.props.navigation.navigate("Confirm", { personID: responseJson.data.personID, confirmCode: responseJson.data.confirmCode });
          // })

          store.update("AuthInfo", {
              accountid : responseJson.data
            }).then(
              ()=>{ 
                global.accountid = responseJson.data;
                this.props.navigation.navigate("Confirm", { personID: responseJson.data}); 
              }
            )

        } else {
          //alert(responseJson.data.msg);
          ToastAndroid.show(responseJson.data.msg,ToastAndroid.SHORT);

        }
      })
      .catch((error) => {
        //ToastAndroid.show(error,ToastAndroid.SHORT);
        alert(error);
      });
  };


  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedServices: selectedItems });
  }

  render() {
    return (<SafeAreaView style={{ flex: 1 ,backgroundColor:"white"}}>
        <ImageBackground source={require('../resources/images/bluredtheme.jpg')} style={{flex:1}}>
        <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.60)",justifyContent: "center"}}>
        <Header outerContainerStyles={{ position:"absolute",height: 50,width:"100%", top: 0, backgroundColor: colors.transparentColor,borderBottomWidth:0 }}
        leftComponent={<Icon name="arrow-back" type="Ionicons" size={20}
         color="white" onPress={() => { this.props.navigation.goBack(); }} />}
        centerComponent={<Text style={{ color: "white" }}>ثبت‌نام</Text>}
      />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ mobile: text })}
          style={gstyles.textbox}
          underlineColorAndroid='transparent'
          keyboardType="phone-pad"
          placeholder="شماره همراه" />


        <TextInput
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ username: text })}
          style={gstyles.textbox}
          underlineColorAndroid='transparent'
          placeholder="نام کاربری" />

        <TextInput
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ password: text })}
          style={gstyles.textbox}
          underlineColorAndroid='transparent'
          secureTextEntry placeholder="رمز عبور" />
        
        <TextInput
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({ passwordrepeat: text })}
          style={gstyles.textbox}
          underlineColorAndroid='transparent'
          secureTextEntry placeholder="تکرار رمز عبور" />

        <Button
          buttonStyle={gstyles.bigbutton}
          backgroundColor={colors.mediumGreen}
          centerComponent={<Text>ورود به حساب کاربری</Text>}
          title="ثبت نام"
          onPress={() => {
            this._register();

          }}
        />
      </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
    );
  }
}

export default Register;
