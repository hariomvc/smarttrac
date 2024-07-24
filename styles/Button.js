import { StyleSheet } from "react-native";
import { colors } from "./config";

const buttonStyles = StyleSheet.create({
  buttonPrimary: {
    padding: 16,
    backgroundColor: colors.primaryBackground,
    margin: 10,
  },
  buttonTextPrimary: {
    textAlign: "center",
    color: colors.primaryButtonText,
    fontSize: 18,
  },
});

export default buttonStyles;
