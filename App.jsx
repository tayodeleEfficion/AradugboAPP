import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, Button, View, StyleSheet } from "react-native";
import BottonTab from "./Screens/BottomTab";
import * as firebase from "firebase";
import { DrawerContent } from "./Screens/DrawerContext";
import SupportScreen from "./Screens/Supportscreen";
import SettingScreen from "./Screens/SettingScreen";
import BookmarkScreen from "./Screens/Bookmarkscreen";
import RootStackscreen from "./Screens/RootStackScreen";

const Drawer = createDrawerNavigator();

//firebase Api key

const firebaseConfig = {
  apiKey: "AIzaSyDOHkxZulH4JbgRo0ZxrU06clg9RjIPw64",
  authDomain: "aradugboweb.firebaseapp.com",
  databaseURL: "https://aradugboweb.firebaseio.com",
  projectId: "aradugboweb",
  storageBucket: "aradugboweb.appspot.com",
  messagingSenderId: "823245947361",
  appId: "1:823245947361:web:41017a76a4c73ea41812a0",
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
