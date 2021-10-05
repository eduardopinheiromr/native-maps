import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Title } from "react-native-paper";

import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function SingleRealEstateScreen({
  route,
  navigation,
}: RootStackScreenProps<"SingleRealEstateScreen">) {
  const { title, image, bathrooms, bedrooms } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title>{title}</Title>
        <Image source={{ uri: image }} style={styles.image} />
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
    height: Dimensions.get("window").height - 100,
    padding: 40,
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: "cover",
  },
});
