import React from "react";
import {} from "@react-navigation/stack";
import { withFormik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook'; 
import * as Google from 'expo-google-app-auth';
import config from '../config'
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





const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  //firebase email and password signin
  const SignInWithEmail = () => {
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
      console.log(error.message);
    }
  };

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

  //firebase google auth implementation
  


async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
        iosClientId: `230930529555-tri3091mctu3395p0ihm4f3eskermd2d.apps.googleusercontent.com`,
        androidClientId: `230930529555-jm9c9rjt2ekm3u252e25n88tv97u4djr.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        function isUserEqual(googleUser, firebaseUser) {
          if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
              if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                  providerData[i].uid === googleUser.getBasicProfile().getId()) {
                // We don't need to reauth the Firebase connection.
                return true;
              }
            }
          }
          return false;
        }
      
        function onSignIn(googleUser) {
          console.log('Google Auth Response', googleUser);
          // We need to register an Observer on Firebase Auth to make sure auth is initialized.
          var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                 googleUser.idToken,
                 googleUser.accessToken,
              );
              // Sign in with credential from the Google user.
              firebase
              .auth().signInWithCredential(credential)
              .then(function(result){
                console.log('user signed in');
                if(result.additionalUserInfo.isNewUser)
                {
      
      
              firebase
              .database
              .ref('/users'+ result.user.uid)
              .set({
                gmail: result.user.email,
                profile_result: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.given_name,
                created_at:Date.now()
              })
              .then(function(snapshot){
              })
            }else{
              firebase
                .database()
                .ref('/users'+result.user.uid).update({
                  last_logged_in:Date.now()
                })
            }
      
            
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            } else {
              console.log('User already signed-in Firebase.');
            }
          });
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  

    
    

  async function signInWithFacebookAsync() {
    try {
      await Facebook.initializeAsync('261051115297989');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this)
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
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
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password? Reset
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
              onPress={() => SignInWithEmail()}
            >
              Sign In
            </Text>
          </LinearGradient>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={{ flexDirection: "row" }}>
              <Text>Don't Have An Account ? </Text>
              <Text style={{ color: "#009387" }}>Sign Up</Text>
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
         
            <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={() =>signInWithFacebookAsync()}> 
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
           
            <Icon.Button name='google' backgroundColor='#FF3E30'onPress={() =>signInWithGoogleAsync()}>           
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
    backgroundColor: "#009387",
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
