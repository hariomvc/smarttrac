import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from ".";

export const GetTractorList = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/tractor`, {
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
export const GetImplementList = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/implement`, {
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
export const GetTractorData = async ({ tractor, implement }) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(
      `${API_BASE_URL}/tractor-data?tractor=${tractor}&implement=${implement}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const GetLastTractorData = async ({ tractor, implement }) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(
      `${API_BASE_URL}/tractor-data?fetch=last&tractor=${tractor}&implement=${implement}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const AddNewTractor = async (body) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/tractor`, {
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
export const AddNewImplement = async (body) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/implement`, {
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
