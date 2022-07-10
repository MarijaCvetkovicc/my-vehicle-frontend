import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/styles";
import { getMapPreview } from "../utils/location";

const VehicleInfo = ({ vehicle }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Vehicle Info Details - {vehicle.type.toUpperCase()}
      </Text>
      <View style={styles.row}>
        <Text>Model:</Text>
        <Text>{vehicle.model}</Text>
      </View>
      <View style={styles.row}>
        <Text>Year of manufecuring:</Text>
        <Text>{vehicle.year}</Text>
      </View>
      <View style={styles.mapPreview}>
        <Image
          style={styles.image}
          source={{
            uri: getMapPreview(
              vehicle.latitude,
              vehicle.longitude,
              vehicle.type
            ),
          }}
        />
      </View>
    </View>
  );
};

export default VehicleInfo;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: Colors.primary500,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
});
