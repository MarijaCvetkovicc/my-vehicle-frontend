import { createContext, useState } from "react";

export const VehicleContext = createContext({
  vehicles: [],
  setVehicles: () => {},
  currentVehicle: null,
  setCurrentVehicle: () => {},
  rides: [],
  setRides: () => {},
});

function VehicleContextProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);

  const [currentVehicle, setCurrentVehicle] = useState(null);

  const [rides, setRides] = useState([]);

  const value = {
    vehicles: vehicles,
    setVehicles: setVehicles,
    currentVehicle: currentVehicle,
    setCurrentVehicle: setCurrentVehicle,
    rides: rides,
    setRides: setRides,
  };

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}

export default VehicleContextProvider;
