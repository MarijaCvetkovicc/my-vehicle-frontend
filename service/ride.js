import axios from "axios";

export async function startRide(startPointlng, startPointlat, vehicleId) {
  const url = `https://my-vehicle-main.herokuapp.com/rides`;

  const response = await axios
    .post(url, {
      startPointlng: startPointlng,
      startPointlat: startPointlat,
      vehicleId: vehicleId,
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      throw new Error("Something went wrong");
    });

  return response;
}

export async function endRide(endPointlng, endPointlat, imageUrl, rideId) {
  const url = `https://my-vehicle-main.herokuapp.com/rides/${rideId}`;

  const response = await axios
    .patch(url, {
      endPointlng: endPointlng,
      endPointlat: endPointlat,
      imageUrl: imageUrl,
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      throw new Error("Something went wrong");
    });

  return response;
}
