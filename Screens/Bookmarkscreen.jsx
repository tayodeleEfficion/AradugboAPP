import React from "react";
import {} from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";

const BookmarkScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>this bookmark screen</Text>
      <Button title='Go To Home' onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookmarkScreen;
