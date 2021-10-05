import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import HouseCard from "../components/HouseCard";

import { View } from "../components/Themed";
import { placesMock } from "../mocks/places";
import { HouseData } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleChoosePlace = (place: HouseData) => {
    navigation.navigate("SingleRealEstateScreen", place);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        label="Busque aqui por imóveis"
        right={<TextInput.Icon name="magnify" />}
      />
      <ScrollView style={styles.scrollview}>
        {placesMock.map((place) => (
          <TouchableHighlight
            onPress={() => handleChoosePlace(place)}
            key={place.id}
          >
            <HouseCard houseData={place} />
          </TouchableHighlight>
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
  scrollview: {
    width: "100%",
  },
});
