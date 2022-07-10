import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Colors } from "../constants/styles";
import IconButton from "./IconButton";

const Map = ({ currentLocation, list }) => {
  const navigation = useNavigation();

  const region = {
    latitude: currentLocation ? currentLocation.lat : 44.797109,
    longitude: currentLocation ? currentLocation.lng : 20.46908,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const showDetails = (id) => {
    navigation.navigate("VehicleDetails", {
      vehicleId: id,
    });
  };

  return (
    <MapView initialRegion={region} style={styles.map}>
      <Marker
        title="This is you"
        key="1-your-location"
        coordinate={{
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
        }}
      >
        <View>
          <Text>
            <IconButton
              icon={"man-sharp"}
              size={20}
              color={Colors.currentlocation}
            />
          </Text>
        </View>
      </Marker>
      {list.length !== 0 &&
        list.map((item) => {
          return item.isAvailable &&(
            <Marker
              title={item.model}
              key={`${item.id}-${item.type}-vehicle`}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={showDetails.bind(this, item.id)}
            >
              <View>
                <Text>
                  <IconButton
                    icon="location"
                    size={25}
                    color={
                      item.type === "bike" ? Colors.bikes : Colors.scooters
                    }
                  />
                </Text>
              </View>
            </Marker>
          );
        })}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerText: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
