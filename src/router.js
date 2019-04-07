import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator, createTabNavigator,createDrawerNavigator} from "react-navigation";
//import { FontAwesome } from "react-native-vector-icons";

//import SignUp from "./screens/SignUp";
//import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Details from "./screens/Details";
import SideMenu from "./components/SideMenu";

const headerStyle = {
  //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

// export const SignedOut = createStackNavigator({
//   SignUp: {
//     screen: SignUp,
//     navigationOptions: {
//       title: "Sign Up",
//       headerStyle
//     }
//   },
//   SignIn: {
//     screen: SignIn,
//     navigationOptions: {
//       title: "Sign In",
//       headerStyle
//     }
//   },
// },{
//   headerMode: "none",
//   mode: "modal",

// }

// );

export const SignedIn = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home",
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        title: "Details",
      }
    },
  },{
  headerMode: "none",
  mode: "modal",

}
);

export const RootNavigator = (signedIn = true) => {
  return createDrawerNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen:SignedIn, //SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      drawerWidth: 300,
      initialRouteName: "Home",
      contentComponent: SideMenu,  
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};