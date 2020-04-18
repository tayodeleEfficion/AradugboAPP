import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailScreen = ({ navigation }) => {
  return (
    <View>
      <Text>this detail screen</Text>
      <Button title='Home screen' onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailScreen;
