import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `https://my-vehicle-main.herokuapp.com/auth/${mode}`;

  const response = await axios
    .post(url, {
      email: email,
      password: password,
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      throw new Error("Something went wrong");
    });

  return response;
}

export function createUser(email, password) {
  return authenticate("signup", email, password);
}

export function login(email, password) {
  return authenticate("signin", email, password);
}

export async function logout() {
  const url = `https://my-vehicle-main.herokuapp.com/auth/signout`;
  await axios.post(url);
}

export async function getLogedUser() {
  const url = `https://my-vehicle-main.herokuapp.com/auth/whoami`;

  const response = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });

  return response;
}
