import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import MapView, {
  Callout,
  MapViewProps,
  Marker,
  Polyline,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { HouseData, RootTabScreenProps } from "../types";
import { LocationObject } from "expo-location";
import { placesMock } from "../mocks/places";

import buildingMarker from "../assets/icons/building.png";
import HouseCard from "../components/HouseCard";
import { Button, Paragraph } from "react-native-paper";
import { socket, updateSocketLocation } from "../socket/events";

type UserLogged = {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function MapScreen({
  navigation,
  route,
}: RootTabScreenProps<"MapScreen">) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [userId, setUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [travelConfirmated, setTravelConfirmated] = useState(false);
  const [brokerLocation, setBrokerLocation] = useState(false);
  const [usersLoggedLocation, setUsersLoggedLocation] = useState<UserLogged[]>(
    []
  );

  const [brokerIsComming, setBrokerIsComming] = useState(false);

  useEffect(() => {
    if (location) updateSocketLocation(location);
  }, [location]);

  useEffect(() => {
    socket.on("user_logged", (id) => {
      console.log({ id });
      setUserId(id);
    });
  });

  useEffect(() => {
    socket.on("user_updated_location", (data) => {
      if (data.id !== userId) {
        console.log("Is not the current user");
        setUsersLoggedLocation([...usersLoggedLocation, data]);
      }
    });
  });

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
          timeInterval: 10000,
          distanceInterval: 1,
        },
        (loc) => setLocation(loc)
      );
    })();
  });

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
        showsUserLocation={true}
        showsMyLocationButton={true}
        camera={
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
        initialCamera={{
          center: {
            latitude: -23.6821604,
            longitude: -46.8754824,
          },
          altitude: 1,
          pitch: 1,
          heading: 1,
          zoom: 10,
        }}
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

          {usersLoggedLocation.map((user, key) => (
            <Marker
              key={key}
              pinColor="#de4141"
              title={user.id}
              coordinate={{
                latitude: user.coordinates.latitude,
                longitude: user.coordinates.longitude,
              }}
            />
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
  myLocationIcon: {
    // position: "absolute",
    // right: 0,
    // top: 50,
    height: 50,
    width: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 90,
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
