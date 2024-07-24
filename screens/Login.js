import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import AuthContext from "../context/authContext";
import { UserLogin } from "../api/auth";
import Container from "../components/layout/Container";
import { appColors, primaryColors } from "../config/colors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = React.useContext(AuthContext);

  const handleLogin = () => {
    setLoading(true);
    if (!email) {
      Alert.alert("Please enter your Email");
      setLoading(false);
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      Alert.alert("Please enter a valid Email");
      setLoading(false);
    } else if (!password) {
      Alert.alert("Please Enter Password");
      setLoading(false);
    } else {
      UserLogin({ email, password })
        .then(async (result) => {
          if (result.status === "success") {
            setEmail("");
            setPassword("");
            setLoading(false);
            await SecureStore.setItemAsync("token", result.token);
            logIn({ token: result.token });
          } else {
            Alert.alert("Unknown Error:" + result.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(error.toString());
          setLoading(false);
        });
    }
  };
  return (
    <Container style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(newemail) => {
          setEmail(newemail);
        }}
        value={email}
        placeholder="Enter email Id"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={(newText) => {
          setPassword(newText);
        }}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Logging In...." : "Login"}
        </Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: appColors.background,
  },
  button: {
    padding: 15,
    backgroundColor: primaryColors.buttonBackground,
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: primaryColors.buttonText,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
});
