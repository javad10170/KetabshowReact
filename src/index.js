import React from "react";
import { RootNavigator } from "./router";
import {Dimensions} from "react-native";
import {isSignedIn} from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };

    this.props.style={backgroundColor:'white'}
  }


  componentWillMount() {
    global.token="";

    global.mobileWidth = Dimensions.get('window').width;
    global.mobileHeight = Dimensions.get('window').height;

  isSignedIn()
    .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
    .catch(err => alert("An error occurred"));

}

  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn)  {
      return null;
    }
    //const {signedIn} = this.state;
    const Layout = RootNavigator(signedIn);
    return <Layout style={{flex:1}} />;
  }
}
