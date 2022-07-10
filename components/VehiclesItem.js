import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/styles";

const VehiclesItem = ({ id, type, model, year, code, longitude, latitude }) => {
  const navigation = useNavigation();

  const vehiclePressHandler = () => {
    navigation.navigate("VehicleDetails", {
      vehicleId: id,
    });
  };

  return (
    <Pressable
      onPress={vehiclePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {model} - {type}
          </Text>
          <Text style={styles.textBase}>year {year}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>longitude:{longitude}</Text>
          <Text style={styles.amount}>latitude:{latitude}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VehiclesItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary900,
    flexDirection: "row",
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
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});
