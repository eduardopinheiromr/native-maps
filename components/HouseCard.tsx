import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import WebView from "react-native-webview";
import { HouseData } from "../types";
import { hasMoreThanOne } from "../utils/hasMoreThanOne";
import { ImageWebView } from "./ImageWebView";

type Props = {
  houseData: HouseData;
};

// export default function HouseCard({ houseData }: Props) {
//   const { title, image, bedrooms, bathrooms } = houseData;

//   return (
//     <View style={styles.container}>
//       <View style={styles.layout}>
//         <Image source={{ uri: image }} style={styles.image} />
//         <Title style={styles.title}>
//           {title}, {bedrooms} quarto{hasMoreThanOne(bedrooms)} e {bathrooms}{" "}
//           banheiro{hasMoreThanOne(bathrooms)}
//         </Title>
//       </View>
//     </View>
//   );
// }

export default function HouseCard({ houseData }: Props) {
  const { title, image, bedrooms, bathrooms } = houseData;

  return (
    <View style={styles.card}>
      <Card.Title
        title={title}
        subtitle={`${bedrooms} quarto${hasMoreThanOne(
          bedrooms
        )} e ${bathrooms} banheiro${hasMoreThanOne(bathrooms)}`}
      />
      <WebView
        style={{ height: 200, width: 300 }}
        source={{
          html: ImageWebView(image),
        }}
      />
      <View
        style={{
          backgroundColor: "#061170",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: "90%",
        }}
      >
        <Paragraph style={{ textAlign: "center", color: "#fff" }}>
          Ver imóvel
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    backgroundColor: "#fff",
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
