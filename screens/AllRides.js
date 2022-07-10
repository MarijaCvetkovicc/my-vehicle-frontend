import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import List from "../components/List";
import LoadingOverlay from "../components/LoadingOverlay";
import { getAllRides } from "../service/vehicle";
import { AuthContext } from "../store/auth-context";
import { VehicleContext } from "../store/vehicle-context";

const AllRides = () => {
  const [isLoading, setIsLoading] = useState(true);
  const vehicleCtx = useContext(VehicleContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchRides() {
      let listOfRides = await getAllRides(authCtx.user.id);

      if (listOfRides) {
        vehicleCtx.setRides(listOfRides);
      }

      setIsLoading(false);
    }

    fetchRides();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Finding your previous rides..." />;
  }

  return (
    <View style={styles.container}>
      {vehicleCtx.rides.length === 0 && (
        <Text style={styles.infoText}>You haven't start any ride yet</Text>
      )}

      {vehicleCtx.rides && vehicleCtx.rides.length !== 0 && (
        <List list={vehicleCtx.rides} rides={true} />
      )}
    </View>
  );
};

export default AllRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
