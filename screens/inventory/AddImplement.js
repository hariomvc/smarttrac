import React, { useState } from "react";
import {
  Text,
  Pressable,
  View,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Container from "../../components/layout/Container";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import FooterMenu from "../../components/FooterMenu";
import { AddNewImplement } from "../../api/api";

export default function AddImplement({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const handleSubmit = () => {
    setLoading(true);
    if (!code || !name || !make || !model) {
      Alert.alert("Please enter all information");
      setLoading(false);
    } else {
      AddNewImplement({
        code: code.trim(),
        name: name.trim(),
        make: make.trim(),
        model: model.trim(),
      })
        .then(async (result) => {
          if (result.status === "success") {
            setCode("");
            setName("");
            setMake("");
            setModel("");
            setLoading(false);
            Alert.alert(result.message);
            navigation.goBack();
          } else {
            Alert.alert(result.message);
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
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingBottom: 12,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        <Entypo name="tools" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          Add Implement
        </Text>
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 20,
          }}
        >
          Code:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={(newValue) => {
            setCode(newValue);
          }}
          value={code}
          placeholder="Code"
        />
        <Text
          style={{
            color: "#000",
            fontSize: 20,
          }}
        >
          Name:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={(newValue) => {
            setName(newValue);
          }}
          value={name}
          placeholder="Code"
        />
        <Text
          style={{
            color: "#000",
            fontSize: 20,
          }}
        >
          Make:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={(newValue) => {
            setMake(newValue);
          }}
          value={make}
          placeholder="Code"
        />
        <Text
          style={{
            color: "#000",
            fontSize: 20,
          }}
        >
          Model:
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            width: "100%",
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: "#fff",
          }}
          onChangeText={(newValue) => {
            setModel(newValue);
          }}
          value={model}
          placeholder="Code"
        />
        <Pressable
          onPress={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            marginVertical: 10,
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "#fff",
            width: "100%",
          }}
        >
          {loading ? (
            <Text
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Adding the Implement...
            </Text>
          ) : (
            <>
              <MaterialIcons name="add" size={24} color="black" />
              <Text
                style={{
                  textAlign: "center",
                  color: "#000",
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                Add New Implement
              </Text>
            </>
          )}
        </Pressable>
      </ScrollView>

      <FooterMenu navigation={navigation} />
    </Container>
  );
}
