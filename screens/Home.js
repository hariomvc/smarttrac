import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import AuthContext from "../context/authContext";
import Container from "../components/layout/Container";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import FooterMenu from "../components/FooterMenu";
import { appColors, primaryColors, secondaryColors } from "../config/colors";

function Home({ navigation }) {
  const { user } = React.useContext(AuthContext);
  return (
    <Container style={styles.container}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 20,
          textAlign: "center",
          paddingBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginTop: 16,
        }}
      >
        SmartTrac: Tractor-Implement Monitoring, Draft Prediction & Advisory
      </Text>
      <Text
        style={{
          marginTop: 6,
          fontWeight: "400",
          fontSize: 24,
          textAlign: "center",
        }}
      >
        Welcome, {"\n"}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {user?.name}
        </Text>
        ! {"\n"}
        What you want to do now?
      </Text>
      <View style={{ flexDirection: "column", margin: 10, gap: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable
            onPress={() => navigation.navigate("CPM")}
            style={styles.button}
          >
            <AntDesign
              name="dashboard"
              size={48}
              color={secondaryColors.buttonText}
            />
            {/* <Text style={styles.buttonText}>Cone Pentrometer Monitoring</Text> */}
            <Text style={styles.buttonText}>Cone Pentrometer</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("TPM")}
            style={styles.button}
          >
            <FontAwesome5
              name="tractor"
              size={48}
              color={secondaryColors.buttonText}
            />
            {/* <Text style={styles.buttonText}>
              Tractor Performance Monitoring
            </Text> */}
            <Text style={styles.buttonText}>Instrumented Tractor</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable
            onPress={() => navigation.navigate("ML-Prediction")}
            style={styles.button}
          >
            <Octicons
              name="graph"
              size={48}
              color={secondaryColors.buttonText}
            />
            <Text style={styles.buttonText}>ML Model Prediction</Text>
            {/* <Text style={styles.buttonText}>ML-enabled Draft Prediction</Text> */}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Advisory")}
            style={styles.button}
          >
            <MaterialIcons
              name="analytics"
              size={48}
              color={secondaryColors.buttonText}
            />
            <Text style={styles.buttonText}>Advisory System</Text>
            {/* <Text style={styles.buttonText}>
              Matching tractor- implement selection
            </Text> */}
          </Pressable>
        </View>
      </View>
      <FooterMenu navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.background,
    color: appColors.text,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginTop: 16,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: secondaryColors.buttonBorder,
    backgroundColor: secondaryColors.buttonBackground,
    width: "45%",
  },
  buttonText: {
    textAlign: "center",
    color: secondaryColors.buttonText,
    fontSize: 18,
  },
});

export default Home;
