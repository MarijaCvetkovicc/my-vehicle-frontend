import axios from "axios";

export async function getAllVehicles() {
  const url = "https://my-vehicle-main.herokuapp.com/vehicles";

  const response = await axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => null);

  return response;
}

export async function getVehicleDetails(id) {
  const url = `https://my-vehicle-main.herokuapp.com/vehicles/${id}`;
  const response = await axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => null);

  return response;
}

export async function getAllRides(userId) {
  const url = `https://my-vehicle-main.herokuapp.com/rides`;
  const response = await axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => null);

  if (response === null) {
    return response;
  }

  const usersList = response.filter((ride) => ride.userId === userId);

  return usersList;
}
