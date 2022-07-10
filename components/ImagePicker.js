import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/styles";
import Button from "./Button";

const ImagePicker = ({ endRide, hideButton }) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (
      cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      cameraPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [12, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    endRide(image.uri);
  };

  let imagePreview = <Text></Text>;

  if (pickedImage) {
    imagePreview = (
      <View style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: pickedImage }} />
      </View>
    );
  }
  return (
    <View>
      {imagePreview}
      {!hideButton && (
        <Button onPress={takeImageHandler}>CLICK TO END RIDE</Button>
      )}
    </View>
  );
};

export default ImagePicker;
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 300,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary700,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
