import React from "react";
import {} from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";

const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>this Explore screen</Text>
      <Button
        title='Go To Detail screen'
        onPress={() => navigation.navigate("Detail")}
      />
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

export default ExploreScreen;
