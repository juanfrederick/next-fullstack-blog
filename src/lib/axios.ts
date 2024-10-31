import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const auth = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  } else {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export async function test2() {
  const header = auth();
  return api
    .get("/api/test", header)
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function userLogin(email: string, password: string) {
  return api
    .post("/api/user/login", { email, password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function userRegister(
  email: string,
  username: string,
  password: string
) {
  return api
    .post("/api/user/register", { email, username, password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
