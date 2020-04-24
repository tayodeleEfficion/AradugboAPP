import React from "react";
import {} from "@react-navigation/stack";
import { withFormik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
// import * as firebase from "firebase";
import {
  View,
  Text,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../Components/Context";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  //firebase email and password signin
  // const SignInWithEmail = () => {
  //   const { email, password } = data;
  //   try {
  //     if (email === null || password.length < 8) {
  //       alert(
  //         "Email field cannot be empty and Password must be atleast 8 characters"
  //       );
  //       return;
  //     } else {
  //       firebase
  //         .auth()
  //         .signInWithEmailAndPassword(email, password)
  //         .then((user) => {
  //           console.log(user);
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const { SignIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleLogin = (email, password) => {
    SignIn(email, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1f65ff' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>Aradugbo</Text>
        <Text style={styles.text_header}>Community App</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name='user-o' color='#05375a' size={20} />
          <TextInput
            placeholder='Your Email'
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation='bounceIn'>
              <Feather name='check-circle' color='green' size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name='lock' color='#05375a' size={20} />
          <TextInput
            placeholder='Your Password'
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name='eye-off' color='grey' size={20} />
            ) : (
              <Feather name='eye' color='grey' size={20} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("password")}>
          <Text style={{ color: "#003f5c", marginTop: 15 }}>
            Forgot password? Reset
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <LinearGradient colors={["#003f5c", "#003f5c"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
              onPress={() => {
                handleLogin(data.email, data.password);
              }}
            >
              Sign In
            </Text>
          </LinearGradient>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={{ flexDirection: "row" }}>
              <Text>Don't Have An Account ? </Text>
              <Text style={{ color: "#003f5c" }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              {
                marginTop: 15,
              },
            ]}
          >
            <Icon.Button name='facebook' backgroundColor='#3b5998'>
              Login with Facebook
            </Icon.Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[
              {
                marginTop: 15,
              },
            ]}
          >
            <Icon.Button name='google' backgroundColor='#FF3E30'>
              Login with Google
            </Icon.Button>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default LoginScreen;
