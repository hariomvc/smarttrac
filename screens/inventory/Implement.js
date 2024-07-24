import React, { useEffect, useState } from "react";
import { Text, Pressable, View, ScrollView, Alert } from "react-native";
import Container from "../../components/layout/Container";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import FooterMenu from "../../components/FooterMenu";
import { GetImplementList } from "../../api/api";

export default function ImplementInventory({ navigation }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    GetImplementList()
      .then((result) => {
        if (result.status == "success") {
          setList(result.data);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
  }, []);
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      GetImplementList()
        .then((result) => {
          if (result.status == "success") {
            setList(result.data);
          } else {
            Alert.alert("Error");
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error");
        });
    });
    return focusHandler;
  }, [navigation]);
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
          Manage Implements
        </Text>
      </View>
      <ScrollView style={{ flexGrow: 1, paddingVertical: 10 }}>
        {list &&
          list.length > 0 &&
          list.map((item, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginHorizontal: "2.5%",
                padding: 20,
                marginVertical: 10,
                borderWidth: 2,
                borderRadius: 25,
                backgroundColor: "#fff",
                width: "95%",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 20,
                }}
              >
                <Entypo name="tools" size={20} color="black" /> {item.code}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 20,
                }}
              >
                Name: {item.name}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 20,
                }}
              >
                Make: {item.make}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 20,
                }}
              >
                Model: {item.model}
              </Text>
            </View>
          ))}
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate("Inventory/Implement/Add")}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: "2.5%",
          padding: 10,
          marginVertical: 10,
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: "#fff",
          width: "95%",
        }}
      >
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
      </Pressable>
      <FooterMenu navigation={navigation} />
    </Container>
  );
}
