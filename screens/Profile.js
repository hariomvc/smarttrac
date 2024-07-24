import React from "react";
import { Text, View, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import typographyStyles from "../styles/Typography";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AuthContext from "../context/authContext";

export default function Profile({ navigation, route }) {
  const { logOut, user } = React.useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingTop: 20,
      }}
    >
      <Text style={[typographyStyles.heading]}>User Profile</Text>
      <Text
        style={[typographyStyles.text, { textAlign: "left", width: "90%" }]}
      >
        <MaterialCommunityIcons
          name="card-account-details-outline"
          size={24}
          color="black"
        />{" "}
        {user.name}
      </Text>
      <View
        style={[
          {
            textAlign: "left",
            width: "90%",
            flexDirection: "row",
            alignContent: "center",
          },
        ]}
      >
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={[typographyStyles.text]}> {user.email}</Text>
      </View>
      <Text
        style={[typographyStyles.text, { textAlign: "left", width: "90%" }]}
      >
        <AntDesign name="bars" size={24} color="black" />{" "}
        {user.role}
      </Text>
      <Pressable
        onPress={async () => {
          navigation.goBack();
        }}
        style={{
          padding: 10,
          borderRadius: 200,
          backgroundColor: "#160660",
          minWidth: "90%",
          marginBottom: 10,
          marginTop: "auto",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: 24,
          }}
        >
          Go Back
        </Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          try {
            await SecureStore.deleteItemAsync("token");
            logOut();
          } catch (error) {
            console.log(error);
          }
        }}
        style={{
          padding: 10,
          borderRadius: 200,
          backgroundColor: "#FF0000",
          minWidth: "90%",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: 24,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
