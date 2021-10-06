import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Paragraph } from "react-native-paper";

import { View } from "../components/Themed";

export default function MyVisitsScreen() {
  const visits = [{ date: "05/10/2021" }];

  return (
    <View style={styles.container}>
      <ScrollView>
        {visits.map((visit, key) => (
          <View key={key}>
            <Paragraph>Visita agendada em {visit.date}</Paragraph>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
