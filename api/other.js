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
export const GetConePenetrometerList = async () => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/cone-penetrometer`, {
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
export const GetConePenetrometerData = async ({ cone_penetrometer }) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(
      `${API_BASE_URL}/cone-penetrometer-data?cone_penetrometer=${cone_penetrometer}`,
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
export const GetLastConePenetrometerData = async ({ cone_penetrometer }) => {
  const token = await SecureStore.getItemAsync("token");
  return new Promise((resolve, reject) => {
    fetch(
      `${API_BASE_URL}/cone-penetrometer-data?fetch=last&cone_penetrometer=${cone_penetrometer}`,
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