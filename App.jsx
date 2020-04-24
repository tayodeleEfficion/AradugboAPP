import React, { useEffect } from "react";
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
// import * as firebase from "firebase";
import { DrawerContent } from "./Screens/DrawerContext";
import SupportScreen from "./Screens/Supportscreen";
import SettingScreen from "./Screens/SettingScreen";
import BookmarkScreen from "./Screens/Bookmarkscreen";
import RootStackscreen from "./Screens/RootStackScreen";
import { AuthContext } from "./Components/Context";
import { AsyncStorage } from "react-native";

const Drawer = createDrawerNavigator();

//firebase Api key

// const firebaseConfig = {
//   apiKey: "AIzaSyDOHkxZulH4JbgRo0ZxrU06clg9RjIPw64",
//   authDomain: "aradugboweb.firebaseapp.com",
//   databaseURL: "https://aradugboweb.firebaseio.com",
//   projectId: "aradugboweb",
//   storageBucket: "aradugboweb.appspot.com",
//   messagingSenderId: "823245947361",
//   appId: "1:823245947361:web:41017a76a4c73ea41812a0",
// };

// firebase.initializeApp(firebaseConfig);
const App = () => {
  const initialLoginState = {
    isLoading: true,
    email: "",
    userToken: "",
  };

  const LoginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
        return {};
      case "LOGIN":
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = React.useReducer(
    LoginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      SignIn: async (email, password) => {
        let userToken;
        userToken = null;

        if (email === "email" && password === "pass") {
          try {
            userToken = "olumide";
            await AsyncStorage.setItem("UserToke", userToken);
          } catch (error) {
            console.log(error);
          }
        }
        // console.log("user token :", userToken);
        dispatch({ type: "LOGIN", id: email, token: userToken });
      },
      SignOut: async () => {
        try {
          userToken = "olumide";
          await AsyncStorage.removeItem("UserToke");
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: "LOGOUT" });
      },
      SignUp: () => {
        // setUserToken("1234");
        // setIsLoading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      userToken = "";
      try {
        userToken = await AsyncStorage.getItem("UserToke");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItem: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
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
    </AuthContext.Provider>
  );
};
export default App;
