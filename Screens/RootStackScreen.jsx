import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import PasswordForgetScreen from "./PasswordForgetScreen";

const RootStack = createStackNavigator();

const RootstackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name='Splash' component={SplashScreen} />
      <RootStack.Screen name='Signin' component={SigninScreen} />
      <RootStack.Screen name='Signup' component={SignupScreen} />
      <RootStack.Screen name='password' component={PasswordForgetScreen} />
    </RootStack.Navigator>
  );
};
export default RootstackScreen;
