import React from "react";
import {} from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";

const SupportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>this Explore screen</Text>
      <Button
        title='Go To Support screen'
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

export default SupportScreen;
