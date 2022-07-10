import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";
import VehicleInfo from "../components/VehicleInfo";
import { Colors } from "../constants/styles";
import { startRide } from "../service/ride";
import { getVehicleDetails } from "../service/vehicle";
import { VehicleContext } from "../store/vehicle-context";

const VehicleDetails = ({ route, navigation }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const vehicleid = route.params?.vehicleId;
  const vehicleCtx = useContext(VehicleContext);

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

      setIsLoadingLocation(false);
    };

    getLocation();
  }, []);

  useEffect(() => {
    async function fetchVehicle() {
      let getVehicle = await getVehicleDetails(vehicleid);

      if (getVehicle) {
        vehicleCtx.setCurrentVehicle(getVehicle);
      }

      setIsLoadingDetails(false);
    }

    fetchVehicle();
  }, []);

  const [vehicleCode, setVehicleCode] = useState("");

  const updateInputValueHandler = (enteredValue) => {
    setVehicleCode(enteredValue);
  };

  const submitHandler = async () => {
    if (vehicleCode.trim() !== vehicleCtx.currentVehicle.code) {
      Alert.alert("Invalid input", "Please check your entered code.");
      return;
    }

    const ride = await startRide(
      currentLocation.lng,
      currentLocation.lat,
      vehicleid
    );

    if (!ride) {
      Alert.alert(
        "Invalid input",
        "Something went wrong. Please check your entered code."
      );
      return;
    } else {
      navigation.navigate("RideInProgress", {
        rideId: ride.id,
      });
    }
  };

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

  if (isLoadingDetails || isLoadingLocation) {
    return <LoadingOverlay message="Finding vehicle details..." />;
  }

  return (
    <View>
      <VehicleInfo vehicle={vehicleCtx.currentVehicle} />
      <View style={styles.form}>
        <Input
          label="Enter vehicle code to start a ride (Vehicle code should be visible on your choosen vehicle): "
          onUpdateValue={updateInputValueHandler.bind(this)}
          value={vehicleCode}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Start ride</Button>
        </View>
      </View>
    </View>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  form: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.primary900,
    alignSelf: "center",
  },
  buttons: {
    marginTop: 12,
  },
});
