import * as SecureStore from "expo-secure-store";
import { ML_BASE_URL } from ".";

export const GetModelsList = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${ML_BASE_URL}/models`, {
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

export const GetPredicion = async (body) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${ML_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
