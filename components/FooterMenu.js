import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, View, StyleSheet, Pressable } from "react-native";

function FooterMenu({ navigation }) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderTopWidth: 2,
          paddingTop: 10,
          marginHorizontal: 10,
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            flexGrow: 1,
          }}
        >
          <FontAwesome name="home" size={24} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 14,
            }}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Inventory")}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            flexGrow: 1,
          }}
        >
          <MaterialIcons name="inventory" size={24} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 14,
            }}
          >
            Inventory
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            flexGrow: 1,
          }}
        >
          <FontAwesome5 name="user-circle" size={24} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 14,
            }}
          >
            Profile
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate("")}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            flexGrow: 1,
          }}
        >
          <Feather name="settings" size={24} color="black" />
          <Text
            style={{
              textAlign: "center",
              color: "#000",
              fontSize: 14,
            }}
          >
            Settings
          </Text>
        </Pressable> */}
      </View>
    </>
  );
}

export default FooterMenu;
