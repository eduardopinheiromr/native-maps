import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { HouseData } from "../types";

type Props = {
  houseData: HouseData;
};

export default function HouseCard({ houseData }: Props) {
  const { title, image, bedrooms, bathrooms } = houseData;

  const hasMoreThanOne = (data: number) => (data > 1 || data === 0 ? "s" : "");
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Image source={{ uri: image }} style={styles.image} />
        <Title style={styles.title}>
          {title}, {bedrooms} quarto{hasMoreThanOne(bedrooms)} e {bathrooms}{" "}
          banheiro{hasMoreThanOne(bathrooms)}
        </Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  layout: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    width: "70%",
    marginLeft: 10,
  },
});
