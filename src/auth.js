//import { AUTH_INFO } from "./constants";

//import { AsyncStorage } from "react-native";
import kapi from "./api/v1/kapi";
import store from 'react-native-simple-store';


export const onSignOut = () => {
    return new Promise((resolve,reject)=>{
    kapi.logout().then((response) => response.json()).then((responseJson) => {
        if(responseJson.status == 1){
            store.delete("AuthInfo", resolve(true))
        }else{
          resolve(false);
        }
      })
      .catch((error) => {
        resolve(false);
        alert(error);
      });
    });
}


export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    store.get("AuthInfo")
      .then(res => {
        if(res && res.confirmedUser == "true")
        {
          global.confirmedUser == true;
        }
        if (res && res.token != "") {
          global.token=res.token;
          global.accountid = res.accountid;
          resolve(true);
        } else {
          if(res && res.accountid !=""){
            global.accountid = res.accountid;
          }
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
