import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Title } from "react-native-paper";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { hasMoreThanOne } from "../utils/hasMoreThanOne";

export default function SingleRealEstateScreen({
  route,
  navigation,
}: RootStackScreenProps<"SingleRealEstateScreen">) {
  const { title, image, bathrooms, bedrooms } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title style={styles.title}>{title}</Title>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.row}>
          <View style={styles.rowCenter}>
            <FontAwesome5 name="toilet" size={40} />
            <Text style={styles.textLg}>
              {bathrooms} banheiro{hasMoreThanOne(bathrooms)}
            </Text>
          </View>
          <View style={styles.rowCenter}>
            <FontAwesome name="bed" size={40} />
            <Text style={styles.textLg}>
              {bedrooms} quarto{hasMoreThanOne(bedrooms)}
            </Text>
          </View>
        </View>

        <View style={styles.button}>
          <Button mode="contained">Agendar visita</Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: "cover",
  },
  title: {
    textAlign: "center",
    padding: 20,
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
  },
  rowCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  textLg: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 20,
  },
});
