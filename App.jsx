import React, { useEffect, useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Text,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BottonTab from "./Screens/BottomTab";
import * as firebase from "firebase";
import { DrawerContent } from "./Screens/DrawerContext";
import SupportScreen from "./Screens/Supportscreen";
import SettingScreen from "./Screens/SettingScreen";
import BookmarkScreen from "./Screens/Bookmarkscreen";
import RootStackscreen from "./Screens/RootStackScreen";
import { AuthContext } from "./Components/Context";
import { SIGN_IN, SIGN_OUT, SIGN_UP, REFRESH_TOKEN } from "./Components/Types";
import ApiKeys from "./Contanst/ApiKeys";

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationReady, setIsAuthenticationReady] = useState(false);

  const onAuthStateChanged = (user) => {
    setIsAuthenticationReady(true);
    setIsAuthenticated(!!user);
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name='bottom' component={BottonTab} />
          <Drawer.Screen name='Support' component={SupportScreen} />
          <Drawer.Screen name='Setting' component={SettingScreen} />
          <Drawer.Screen name='Bookmark' component={BookmarkScreen} />
        </Drawer.Navigator>
      ) : (
        <RootStackscreen />
      )}
    </NavigationContainer>
  );
};
export default App;
