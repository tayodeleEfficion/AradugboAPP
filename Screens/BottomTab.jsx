import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DetailScreen from "./DetailsScreen";
import "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./Profilescreen";
import Icon from "react-native-vector-icons/Ionicons";
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#009387" },
        headerTintColor: "#fff",
      }}
    >
      <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name='ios-menu'
              size={25}
              backgroundColor='#009367'
              onPress={() => navigation.toggleDrawer()}
            ></Icon.Button>
          ),
        }}
      />
      <HomeStack.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name='ios-menu'
              size={25}
              backgroundColor='#009367'
              onPress={() => navigation.toggleDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const BottomTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#fff'
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "green",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-aperture' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#694tab",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-person' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
