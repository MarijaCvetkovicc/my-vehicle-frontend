import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LoadingOverlay from "../components/LoadingOverlay";
import VehiclesMap from "../components/VehiclesMap";
import { getAllVehicles } from "../service/vehicle";
import { VehicleContext } from "../store/vehicle-context";

const AllVehicles = () => {
  const [isLoading, setIsLoading] = useState(true);

  const vehicleCtx = useContext(VehicleContext);

  useEffect(() => {
    async function fetchVehicles() {
      let listOfVehicles = await getAllVehicles();

      if (listOfVehicles) {
        vehicleCtx.setVehicles(listOfVehicles);
      }

      setIsLoading(false);
    }

    fetchVehicles();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Finding vehicles for you..." />;
  }
  return (
    <View style={styles.container}>
      {vehicleCtx.vehicles && vehicleCtx.vehicles.length !== 0 && (
        <VehiclesMap list={vehicleCtx.vehicles} />
      )}
      {vehicleCtx.vehicles.length === 0 && (
        <Text style={styles.infoText}>There are no available vehicles </Text>
      )}
    </View>
  );
};

export default AllVehicles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
