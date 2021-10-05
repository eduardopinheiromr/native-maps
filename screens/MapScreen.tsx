import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { RootTabScreenProps } from "../types";
import { LocationObject } from "expo-location";

export default function MapScreen({
  navigation,
}: RootTabScreenProps<"MapScreen">) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [travelConfirmated, setTravelConfirmated] = useState(false);
  const [brokerLocation, setBrokerLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
        </>
      </MapView>
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
});
