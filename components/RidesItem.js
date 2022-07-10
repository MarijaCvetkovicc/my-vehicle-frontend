import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/styles";
import { getVehicleDetails } from "../service/vehicle";
import { getMapPreviewWithTwoLocations } from "../utils/location";
import LoadingOverlay from "./LoadingOverlay";

const RidesItem = ({
  id,
  startTime,
  endTime,
  price,
  vehicleId,
  startPointlat,
  startPointlng,
  endPointlat,
  endPointlng,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchRide() {
      let getVehicle = await getVehicleDetails(vehicleId);

      if (getVehicle) {
        setData(getVehicle);
      }

      setIsLoading(false);
    }

    fetchRide();
  }, []);
  if (isLoading) {
    return <LoadingOverlay message="" />;
  }

  return (
    <View style={styles.item}>
      <View>
        <Text style={[styles.textBase, styles.description]}>
          {data.type.toUpperCase()} : {data.model}
        </Text>
        <View style={styles.mapPreview}>
          <Image
            style={styles.image}
            source={{
              uri: getMapPreviewWithTwoLocations(
                startPointlat,
                startPointlng,
                endPointlat,
                endPointlng
              ),
            }}
          />
        </View>
        <Text style={styles.textBase}>Price: {price} din</Text>
      </View>
      <View style={styles.dateContainer}>
      <Text style={styles.date}>
            Date: { new Date(startTime).toDateString()} 
          </Text>
        {startTime && (
          <Text style={styles.date}>
            Start Time: { new Date(startTime).toLocaleTimeString()} 
          </Text>
        )}
       {endTime && <Text style={styles.date}>End Time: { new Date(endTime).toLocaleTimeString()}</Text>}
      </View>
    </View>
  );
};

export default RidesItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary900,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary700,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary800,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  dateContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  date: {
    color: Colors.primary500,
    fontWeight: "bold",
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
