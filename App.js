import { useContext, useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "./constants/styles";
import AllRides from "./screens/AllRides";
import AllVehicles from "./screens/AllVehicles";
import Login from "./screens/Login";
import Register from "./screens/Register";
import VehicleDetails from "./screens/VehicleDetails";
import RideInProgress from "./screens/RideInProgress";
import ThankYouPage from "./screens/ThankYouPage";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import VehicleContextProvider from "./store/vehicle-context";
import { getLogedUser } from "./service/auth";
import LoadingOverlay from "./components/LoadingOverlay";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const VehicleOverview = () => {
  const authCtx = useContext(AuthContext);

  const handlelogout = async () => {
    authCtx.logout();
  };

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.primary800 },
        tabBarActiveTintColor: Colors.primary100,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={handlelogout}
          />
        ),
      }}
    >
      <BottomTabs.Screen
        name="AllVehicles"
        component={AllVehicles}
        options={{
          title: "All Vehicles",
          tabBarLabel: "Find Vehicles",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bicycle" size={size} color={color} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="AllRides"
        component={AllRides}
        options={{
          title: "All Rides",
          tabBarLabel: "Previous Rides",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const storedUser = await getLogedUser();
      if (storedUser) {
        authCtx.authenticate(storedUser);
      }

      setIsTryingLogin(false);
    }

    fetchUser();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="" />;
  }

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <VehicleContextProvider>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </VehicleContextProvider>
    </>
  );
}

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleOverview"
        component={VehicleOverview}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{
          title: "Vehicle Details",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RideInProgress"
        component={RideInProgress}
        options={{
          title: "Ride In Progress ",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ThankYouPage"
        component={ThankYouPage}
        options={({ navigation }) => ({
          title: "Ride is finished",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate("AllVehicles")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: "white",
        contentStyle: { alignItems: "center" },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Register} />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};
