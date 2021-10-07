import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { Text, View } from "../components/Themed";
import { connect } from "../socket/events";
import { RootStackScreenProps } from "../types";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"LoginScreen">) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Root");
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <FontAwesome
        name="building"
        size={70}
        style={{ marginBottom: 50, marginTop: 100 }}
        color="#0e1796"
      />
      <Text style={styles.title}>Faça login para continuar</Text>
      <TextInput
        style={styles.input}
        label="Email"
        right={<TextInput.Icon name="account" />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
      />
      <Button
        style={styles.button}
        icon="login"
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        Entrar
      </Button>
      <Button
        style={styles.button}
        icon="account-plus"
        mode="outlined"
        disabled={loading}
      >
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    marginTop: 10,
    width: "80%",
  },
  button: {
    marginTop: 10,
    width: "80%",
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
