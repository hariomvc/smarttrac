import { Text, View, StyleSheet } from "react-native";
import { primaryColors } from "../config/colors";
import { footerText } from "../config/text";

function Footer({}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{footerText}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    backgroundColor: primaryColors.background,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: { color: primaryColors.text },
});

export default Footer;
