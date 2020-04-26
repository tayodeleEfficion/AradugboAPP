import React from "react";
import {} from "@react-navigation/stack";
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
import * as firebase from "firebase";

const PasswordForgetSreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    Confirm_Password: "",
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    check_textIputChange: false,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textIputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textIputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      Confirm_Password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const onPressReset = () => {
    const { email, password } = data;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("password reset email has been sent");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#003f5c' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>Aradugbo</Text>
        <Text style={styles.text_header}>Community App</Text>
      </View>
      <Animatable.View style={styles.footer} animation='fadeInUpBig'>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome size={20} color='#05375a' name='user-o' />
          <TextInput
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textIputChange ? (
            <Feather name='check-circle' color='green' size={20} />
          ) : null}
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#003f5c",
                borderWidth: 1,
                marginTop: 10,
              },
            ]}
            onPress={() => onPressReset()}
          >
            <View>
              <Text style={{ color: "#003f5c" }}>Password Reset</Text>
            </View>
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
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
    fontWeight: "bold",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 3,
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
    textAlign: "center",
  },
});
export default PasswordForgetSreen;
