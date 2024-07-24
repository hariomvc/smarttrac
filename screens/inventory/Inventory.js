import React from "react";
import { Text, Pressable, View, ScrollView } from "react-native";
import Container from "../../components/layout/Container";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import FooterMenu from "../../components/FooterMenu";

export default function Inventory({ navigation }) {
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
        <MaterialIcons name="inventory" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          Manage Inventory
        </Text>
      </View>
      <ScrollView style={{ flexGrow: 1, paddingVertical: 10 }}>
        <Pressable
          onPress={() => navigation.navigate("Inventory/Tractor")}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginHorizontal: "2.5%",
            padding: 20,
            marginVertical: 10,
            borderWidth: 2,
            borderRadius: 25,
            backgroundColor: "#fff",
            width: "95%",
          }}
        >
          <FontAwesome5 name="tractor" size={48} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Manage Tractors
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Inventory/Implement")}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginHorizontal: "2.5%",
            padding: 20,
            marginVertical: 10,
            borderWidth: 2,
            borderRadius: 25,
            backgroundColor: "#fff",
            width: "95%",
          }}
        >
          <Entypo name="tools" size={48} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Manage Implements
          </Text>
        </Pressable>
      </ScrollView>
      <FooterMenu navigation={navigation} />
    </Container>
  );
}
