import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import Map from "./Map";
import LoadingOverlay from "./LoadingOverlay";

const VehiclesMap = ({ list }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await verifyPremissions();

      if (!hasPermission) {
        return;
      }

      const location = await getCurrentPositionAsync();
      if (location) {
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }

      setIsLoading(false);
    };

    getLocation();
  }, []);

  const verifyPremissions = async () => {
    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant loaction permissions to use this app"
      );
      return false;
    }
    return true;
  };

  if (isLoading) {
    return <LoadingOverlay message="Finding vehicles for you..." />;
  }

  return (
    <View style={styles.container}>
      {list.length === 0 && (
        <Text style={styles.infoText}>There are no available vehicles </Text>
      )}
      {currentLocation && <Map currentLocation={currentLocation} list={list} />}
    </View>
  );
};

export default VehiclesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
