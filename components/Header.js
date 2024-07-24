import { Text, View, StyleSheet } from "react-native";
import { appTitle } from "../config/text";
import { primaryColors } from "../config/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{appTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.background,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: primaryColors.text,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
