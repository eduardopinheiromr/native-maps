import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  Paragraph,
  Title,
} from "react-native-paper";
import SchedulleModal from "../components/SchedulleModal";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { hasMoreThanOne } from "../utils/hasMoreThanOne";

export default function SingleRealEstateScreen({
  route,
  navigation,
}: RootStackScreenProps<"SingleRealEstateScreen">) {
  const { title, image, bathrooms, bedrooms } = route.params;

  const [show, setShow] = useState(false);
  const [searchingForBrokers, setSearchingForBrokers] = useState(false);
  const [brokerComming, setBrokerComming] = useState(false);

  const toggleShow = (toggle: boolean) => setShow(toggle);

  const handleVisitNow = () => {
    setSearchingForBrokers(true);

    setTimeout(() => {
      setBrokerComming(true);
    }, 3000);
  };

  const handleCloseSearch = () => {
    setSearchingForBrokers(false);
    setBrokerComming(false);
    navigation.navigate("Root", {
      screen: "MapScreen",
      params: { brokerComming: true },
    });
  };

  return (
    <View style={styles.container}>
      {searchingForBrokers && (
        <>
          <View style={styles.offset} />
          <View style={styles.loading}>
            {brokerComming ? (
              <>
                <Paragraph style={styles.textLg}>Encontramos!</Paragraph>
                <Paragraph style={{ fontSize: 40, margin: 30, lineHeight: 70 }}>
                  🎉
                </Paragraph>
                <Paragraph style={styles.textLg}>
                  Acompanhe o corretor Fulano no mapa, em breve ele chegará ao
                  local :)
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={handleCloseSearch}
                  style={{ marginTop: 30 }}
                >
                  Ir para o mapa
                </Button>
              </>
            ) : (
              <>
                <Paragraph style={styles.textLg}>
                  Estamos procurando um corretor para ir até o local
                </Paragraph>
                <ActivityIndicator size="large" style={styles.spinner} />
                <Paragraph style={styles.textLg}>
                  Por favor, aguarde...
                </Paragraph>
              </>
            )}
          </View>
        </>
      )}
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
          <Button mode="contained" onPress={() => toggleShow(true)}>
            Agendar visita
          </Button>
        </View>

        <View style={styles.button}>
          <Button mode="contained" onPress={handleVisitNow}>
            Visitar agora
          </Button>
        </View>

        <SchedulleModal show={show} toggleShow={toggleShow} />
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
    textAlign: "center",
  },
  button: {
    padding: 20,
  },
  offset: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    opacity: 0.5,
    backgroundColor: "#000",
    zIndex: 1,
  },
  loading: {
    height: 300,
    width: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    left: 50,
    top: "30%",
    borderRadius: 8,
    zIndex: 20,
    padding: 10,
  },
  spinner: {
    marginTop: 40,
    marginBottom: 40,
  },
});
