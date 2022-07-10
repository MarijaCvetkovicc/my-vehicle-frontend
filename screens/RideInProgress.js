import { useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import ImagePicker from "../components/ImagePicker";
import LoadingOverlay from "../components/LoadingOverlay";
import { endRide } from "../service/ride";

const RideInProgress = ({ route }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const rideId = route.params?.rideId;
  const navigation = useNavigation();

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

  const takePhotoOfParkedVehicle = (imageUri) => {
    setCurrentPhoto(imageUri);
  };

  const finishRide = async () => {
    const ride = await endRide(
      currentLocation.lng,
      currentLocation.lat,
      currentPhoto,
      rideId
    );

    if (!ride) {
      Alert.alert("Something went wrong.", " Please check your entered code.");
      return;
    } else {
      navigation.navigate("ThankYouPage");
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

  if (isLoadingLocation) {
    return <LoadingOverlay message="Finding your location..." />;
  }

  return (
    <View style={styles.container}>
      <LoadingOverlay message="Your ride has started. Please drive carefully!" />
      <ImagePicker
        endRide={takePhotoOfParkedVehicle}
        hideButton={currentPhoto}
      />

      <View style={styles.buttons}>
        {currentPhoto && (
          <Button onPress={finishRide}> CLICK TO COMPLETE</Button>
        )}
      </View>
    </View>
  );
};

export default RideInProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flex: 2,
    alignItems: "center",
    marginTop: 12,
  },
});
