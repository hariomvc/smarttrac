import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from ".";

export const VerifyLogin = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/auth/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UserLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role: "admin" }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
