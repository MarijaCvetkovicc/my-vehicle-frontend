import React from "react";
import { FlatList } from "react-native";
import RidesItem from "./RidesItem";
import VehiclesItem from "./VehiclesItem";

const renderVehiclesItem = (itemData) => {
  return <VehiclesItem {...itemData.item} />;
};

const renderRidesItem = (itemData) => {
  return <RidesItem {...itemData.item} />;
};

const List = ({ list, rides, vehicles }) => {
  return (
    <>
      {vehicles && (
        <FlatList
          data={list}
          renderItem={renderVehiclesItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {rides && (
        <FlatList
          data={list}
          renderItem={renderRidesItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default List;
