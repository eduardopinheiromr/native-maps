import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import HouseCard from "../components/HouseCard";

import { View } from "../components/Themed";
import { placesMock } from "../mocks/places";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        label="Busque aqui por imóveis"
        right={<TextInput.Icon name="magnify" />}
      />
      <ScrollView style={styles.places}>
        {placesMock.map((place) => (
          <HouseCard key={place.id} houseData={place} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  search: {
    width: "80%",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  places: {
    // display: "flex",
  },
});
