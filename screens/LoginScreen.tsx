import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login para continuar</Text>
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
  },
  input: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
