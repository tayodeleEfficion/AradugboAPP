import React from "react";
import {} from "@react-navigation/stack";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation='bounceIn'
          duraton='1500'
          source={require("../assets/logo.jpeg")}
          style={styles.logo}
          resizeMode='stretch'
        />
      </View>
      <Animatable.View style={styles.footer} animation='fadeInUpBig'>
        <Text style={styles.title}>Aradugbo</Text>
        <Text style={styles.title}>Community App !!</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <LinearGradient
              colors={["#003f5c", "#003f5c"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name='navigate-next' color='#fff' size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#003f5c",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "#003f5c",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SplashScreen;
