import React from "react";
import { Image, View, Text, AsyncStorage, TextInput,ActivityIndicator,
  ToastAndroid, ImageBackground } from "react-native";
import { NavigationActions } from 'react-navigation';
import { Button, Icon } from "react-native-elements";
import kapi from "../api/v1/kapi";
import store from 'react-native-simple-store';
import gstyles from './styles/generalstyles';
import ProgressSpinner from '../components/ProgressSpinner'
import colors from './styles/theme';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      infoloaded: true,
      spinnerVisible:false,
    }
  }
  _resetPass() {
    kapi.resetpassword().then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson);
        if (responseJson.status == 1) {
          //alert("پسورد با موفقیت عوض شد پسورد جدید برای شما ارسال می‌شود.");
          ToastAndroid.show("پسورد با موفقیت عوض شد پسورد جدید برای شما ارسال می‌شود.",ToastAndroid.SHORT);

        } else {
          alert(responseJson.data.msg);
          ToastAndroid.show(responseJson.data.msg,ToastAndroid.SHORT);

        }
      })
      .catch((error) => {
        //alert("Server connection error");
        ToastAndroid.show("مشکل ارتباط با سرور",ToastAndroid.SHORT);
      });
  };

  _login() {
    
    this.setState({spinnerVisible:true });
    kapi.login(this.state.username, this.state.password).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          store.save("AuthInfo", {
            token: responseJson.data.token,
            //accountid: responseJson.data.accountID,
          }).then(
            () => {
              global.token = responseJson.data.token;
              //global.accountid = responseJson.data.accountID;
              global.justSignedIn = true;
              this.setState({spinnerVisible:false });
              this.props.navigation.navigate("SignedIn");
            }
            )
        } else if (responseJson.status == 3) {
          this.setState({spinnerVisible:false });
          this.props.navigation.navigate("Confirm", { confirmCode: "", personID: global.accountid });
        } else if (responseJson.status == 2) {
          this.setState({spinnerVisible:false });
          //alert("اکانت شما غیر فعال است");
          ToastAndroid.show("اکانت شما غیر فعال است",ToastAndroid.SHORT);


        } else {
          this.setState({spinnerVisible:false });
          ToastAndroid.show(responseJson.data.msg,ToastAndroid.SHORT);

        }
      })
      .catch((error) => {
        this.setState({ infoloaded: true });
        //alert("Server connection error");
        ToastAndroid.show("خطا در ارتباط با سرور",ToastAndroid.SHORT);
      });
  };

  render() {

    if (!this.state.infoloaded) {
      return (<View style={[gstyles.container, gstyles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>);
    } else {
      return (<View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>

        {/* <Header outerContainerStyles={{ height: 50, top: 0, backgroundColor: colors.statusBarColor,borderBottomColor:colors.darkGreen}}
          centerComponent={<Text style={gstyles.headerText}>ورود به حساب کاربری</Text>}
        /> */}

        {this.state.spinnerVisible && <ProgressSpinner />}
        <ImageBackground source={require('../resources/images/bluredtheme.jpg')} style={{flex:1}}>
        <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.60)",justifyContent: "center"}}>
        <View style={{ alignItems: "center"}}>

        <Icon name="terrain" type="entype" color="white" size={40}  />
        <Text style={{color:"white",fontSize:30,marginBottom:20}}>K E T A B S H O W</Text>
        <View style={{flexDirection:"row-reverse"}}>
        {/* <Icon name="terrain" type="entype" color="white" size={20} /> */}
          <TextInput
           placeholderTextColor="white"
            onChangeText={(text) => this.setState({ username: text })}
            style={[gstyles.textbox]}
            underlineColorAndroid='transparent'
            placeholder="نام کاربری" />
        </View>
          <TextInput
             placeholderTextColor="white"
            onChangeText={(text) => this.setState({ password: text })}
            style={gstyles.textbox}
            underlineColorAndroid='transparent'
            secureTextEntry placeholder="رمز عبور" />

          <Button
            buttonStyle={gstyles.bigbutton}
            backgroundColor={colors.mediumGreen}
            centerComponent={<Text>ورود به حساب کاربری</Text>}
            title="ورود به حساب کاربری"
            onPress={() => {
              //onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
              this._login();

            }}
          />
        </View>
        <View style={{ paddingBottom: 20 }}>
          <Text onPress={() => { this.props.navigation.navigate("ForgetPass", { confirmCode: "" }) }} style={{ textAlign: "center", paddingTop: 10, fontSize: 15, color: "white" }}>فراموشی رمز عبور</Text>
          {/* <Text onPress={()=>{ global.accountid =="" ? this.props.navigation.navigate("Register"):this.props.navigation.navigate("Confirm",{confirmCode:"",personID:global.accountid})}} style={{textAlign:"center",paddingTop:10,fontSize:15,color:"#909CAB"}}> ثبت نام</Text>   */}
          <Text onPress={() => { this.props.navigation.navigate("Register") }} style={{ textAlign: "center", paddingTop: 10, fontSize: 15, color: "white" }}> ثبت نام</Text>
          {/* <Text onPress={() => { this.props.navigation.navigate("Confirm",{"confirmCode":""}) }} style={{ textAlign: "center", paddingTop: 10, fontSize: 15, color: "white" }}> ورود کد فعالسازی</Text> */}

        </View>
        </View>
            </ImageBackground>
      </View>
      );
    }
  }
}

export default Login;
