import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, Button, View, StyleSheet } from "react-native";
import BottonTab from "./Screens/BottomTab";
import * as firebase from "firebase";
//import * as Facebook from 'expo-facebook'; 
//import * as GoogleSignIn from 'expo-google-sign-in'
//import {firebaseConfig} from "./config";
import { DrawerContent } from "./Screens/DrawerContext";
import SupportScreen from "./Screens/Supportscreen";
import SettingScreen from "./Screens/SettingScreen";
import BookmarkScreen from "./Screens/Bookmarkscreen";
import RootStackscreen from "./Screens/RootStackScreen";
import LoadingScreen from "./Screens/LoadingScreen";

const Drawer = createDrawerNavigator();


//firebase Api key

const firebaseConfig = {
  apiKey: "AIzaSyDn5qPXRRHD_p9rJQztP6Fp7Ud2ehbqxpg",
  authDomain: "aradugbo-d80b4.firebaseapp.com",
  databaseURL: "https://aradugbo-d80b4.firebaseio.com",
  projectId: "aradugbo-d80b4",
  storageBucket: "aradugbo-d80b4.appspot.com",
  messagingSenderId: "230930529555",
  appId: "1:230930529555:web:a67f8f54ecf758cd2d2ee6",
};

firebase.initializeApp(firebaseConfig);


const App = () => {
  return (
    <NavigationContainer>
      <RootStackscreen />
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}

      {/* <Drawer.Screen name='bottom' component={BottonTab} />
        <Drawer.Screen name='Support' component={SupportScreen} />
        <Drawer.Screen name='Setting' component={SettingScreen} />
        <Drawer.Screen name='Bookmark' component={BookmarkScreen} /> */}
      {/* </Drawer.Navigator> */}
    </NavigationContainer>
  );
};
export default App;
