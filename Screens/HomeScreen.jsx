import React from "react";
import { useTheme } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <Text style={{ color: colors.text }}>Home screen</Text>
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

export default HomeScreen;
