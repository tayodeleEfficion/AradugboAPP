import React, { useContext } from "react";
import {} from "@react-navigation/stack";
import { withFormik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { FACEBOOKCREDENTIAL } from "../Contanst/FBcredentials";
import { ANDROIDcLIENTID, IOSCLIENTID } from "../Contanst/GoogleCredetials";
import {
  View,
  Text,
  Alert,
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
import { useTheme } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const { colors } = useTheme();

  const [name, setName] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: ANDROIDcLIENTID,
        iosClientId: IOSCLIENTID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginWithFacebook = async () => {
    await Facebook.initializeAsync(FACEBOOKCREDENTIAL);
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync(FACEBOOKCREDENTIAL, {
      permissions: ["public_profile"],
    });

    if (type === "success") {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase
        .auth()
        .signInWithCredential(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const onLoginPress = () => {
    const { email, password } = data;
    try {
      if (email === null || password.length < 8) {
        alert(
          "Email field cannot be empty and Password must be atleast 8 characters"
        );
        return;
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user);
          });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1f65ff' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>Aradugbo</Text>
        <Text style={styles.text_header}>Community App</Text>
      </View>
      <Animatable.View
        animation='fadeInUpBig'
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name='user-o' color={colors.text} size={20} />
          <TextInput
            placeholder='Your Email'
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize='none'
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation='bounceIn'>
              <Feather name='check-circle' color='green' size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMessage}>
              Email must be greater than 4 characters
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name='lock' color={colors.text} size={20} />
          <TextInput
            placeholder='Your Password'
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, { color: colors.text }]}
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
        {data.isValidPassword ? null : (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMessage}>
              password must be greater than 8 characters
            </Text>
          </Animatable.View>
        )}

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
              onPress={() => onLoginPress()}
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
            style={[
              {
                marginTop: 15,
              },
            ]}
          >
            <Icon.Button
              name='facebook'
              backgroundColor='#3b5998'
              onPress={() => {
                loginWithFacebook();
              }}
            >
              Login with Facebook
            </Icon.Button>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                marginTop: 15,
              },
            ]}
          >
            <Icon.Button
              name='google'
              backgroundColor='#FF3E30'
              onPress={() => signInWithGoogleAsync()}
            >
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
