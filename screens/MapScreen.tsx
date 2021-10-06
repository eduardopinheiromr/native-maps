import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { HouseData, RootTabScreenProps } from "../types";
import { LocationObject } from "expo-location";
import { placesMock } from "../mocks/places";

import buildingMarker from "../assets/icons/building.png";
import { hasMoreThanOne } from "../utils/hasMoreThanOne";
import HouseCard from "../components/HouseCard";
import { Button, Paragraph } from "react-native-paper";

export default function MapScreen({
  navigation,
  route,
}: RootTabScreenProps<"MapScreen">) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [travelConfirmated, setTravelConfirmated] = useState(false);
  const [brokerLocation, setBrokerLocation] = useState(false);

  const [brokerIsComming, setBrokerIsComming] = useState(false);

  useEffect(() => {
    setBrokerIsComming(route.params.brokerComming);
  }, [route.params.brokerComming, setBrokerIsComming]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        (loc) => setLocation(loc)
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleSelectPlace = (place: HouseData) => {
    navigation.navigate("SingleRealEstateScreen", place);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialCamera={
          location
            ? {
                center: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                altitude: 1,
                pitch: 1,
                heading: 1,
                zoom: 17,
              }
            : undefined
        }
      >
        <>
          {travelConfirmated && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{ latitude: 37.8025259, longitude: -122.4351431 }}
              destination={{ latitude: 37.7948605, longitude: -122.4596065 }}
              apikey={process.env.GOOGLE_API_KEY as string}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}
          {location && (
            <Marker
              pinColor="#da41de"
              title="Sua localização"
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          )}
          {brokerLocation && location && (
            <Marker
              pinColor="#4c41de"
              title="Corretor de imóvel"
              coordinate={{
                latitude: location.coords.latitude + 0.015,
                longitude: location.coords.longitude - 0.005,
              }}
            />
          )}

          {placesMock.map((place) => (
            <Marker
              image={buildingMarker}
              key={place.id}
              pinColor="#4c41de"
              coordinate={place.coordinates}
            >
              <Callout tooltip onPress={() => handleSelectPlace(place)}>
                <View style={{ width: 320, padding: 10, borderRadius: 10 }}>
                  <HouseCard houseData={place} />
                </View>
              </Callout>
            </Marker>
          ))}
        </>
      </MapView>
      {brokerIsComming && (
        <View style={styles.brokerComing}>
          <Paragraph>O corretor está a caminho</Paragraph>
          <View style={styles.brokerProfile}>
            <Image
              style={styles.brokerAvatar}
              source={{ uri: "https://picsum.photos/id/8/300/300" }}
            />
            <View style={styles.brokerInfo}>
              <Paragraph style={{ fontSize: 20, fontWeight: "bold" }}>
                Fulano da Silva
              </Paragraph>
              <Paragraph
                style={{ fontSize: 16, fontWeight: "bold", color: "darkgray" }}
              >
                Corretora: Correria
              </Paragraph>
            </View>
          </View>
          <View style={styles.userActions}>
            <Button icon="message" mode="contained">
              Enviar mensagem
            </Button>
            <Button icon="phone" mode="contained">
              Ligar
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  brokerComing: {
    position: "absolute",
    width: Dimensions.get("window").width - 30,
    height: 200,
    backgroundColor: "#fff",
    bottom: 15,
    padding: 20,
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
  },
  userActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brokerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  brokerInfo: {
    marginLeft: 20,
    height: "100%",
  },
  brokerAvatar: {
    height: 75,
    width: 75,
    borderRadius: 100,
  },
});
