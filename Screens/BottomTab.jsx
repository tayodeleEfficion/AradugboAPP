import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DetailScreen from "./DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./Profilescreen";
import PostScreen from "./Postscreen";
import PhotoScreen from "./PhotoScreen"
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "blue" },
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
              backgroundColor='blue'
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
              backgroundColor='blue'
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
    <Tab.Navigator activeColor='#fff'>
      <Tab.Screen
        name='Home'
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Aradugbo",
          tabBarColor: "#009387",
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
          tabBarColor: "#009387",
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
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-person' color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name='Post'
        component={PostScreen}
        options={{
          tabBarLabel: "Post",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-add-circle' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Photo'
        component={PhotoScreen}
        options={{
          tabBarLabel: "Photo",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name='ios-add-circle' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
