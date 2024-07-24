import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from ".";

export const GetData = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
export const GetLast = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/data?fetch=last`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
