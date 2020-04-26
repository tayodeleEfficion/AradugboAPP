import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { AuthContext } from "../Components/Context";
import * as firebase from "firebase";

export function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  // const { SignOut } = React.useContext(AuthContext);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const onSignOutPressed = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "data:image/jpeg;base64,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",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Tunde ayodele</Title>
                <Caption style={styles.caption}>@OlumideEfficion</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption styles={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption styles={styles.caption}>Follower</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='home-outline' color={color} size={size} />
              )}
              label='Home'
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='account-outline' color={color} size={size} />
              )}
              label='Profile'
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='bookmark-outline' color={color} size={size} />
              )}
              label='Bookmark'
              onPress={() => {
                props.navigation.navigate("Bookmark");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='settings-outline' color={color} size={size} />
              )}
              label='Setting'
              onPress={() => {
                props.navigation.navigate("Setting");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='account-check-outline' color={color} size={size} />
              )}
              label='support'
              onPress={() => {
                props.navigation.navigate("Support");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title='preferences'>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents='none'>
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottmDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name='exit-to-app' color={color} size={size} />
          )}
          label='sign Out'
          onPress={() => onSignOutPressed()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottmDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 1,
  },
});
