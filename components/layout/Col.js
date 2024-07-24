import React from "react";
import { View, StyleSheet } from "react-native";

const Col = ({ size, children }) => {
  const colStyles = [styles.col, { flex: size }];

  return <View style={colStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  col: {
    padding: 10,
  },
});

export default Col;
