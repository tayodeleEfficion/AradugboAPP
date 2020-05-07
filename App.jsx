import React, { useEffect, useState, useMemo } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
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
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationReady, setIsAuthenticationReady] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  };

  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;

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
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {isAuthenticated ? (
          <Drawer.Navigator
            drawerContent={(props) => (
              <DrawerContent {...props} toggleTheme={toggleTheme} />
            )}
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
    </PaperProvider>
  );
};
export default App;
