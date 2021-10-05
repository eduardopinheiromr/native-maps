import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";

export default function MyVisitsScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
