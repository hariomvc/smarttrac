import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Loading from "./screens/Loading";
import AuthContext from "./context/authContext";
import { VerifyLogin } from "./api/auth";
import Profile from "./screens/Profile";
import TPMScreen from "./screens/TPMScreen";
import CPMScreen from "./screens/CPMScreen";
import { appColors } from "./config/colors";
import MLPredictionScreen from "./screens/MLPredictionScreen";
import Inventory from "./screens/inventory/Inventory";
import TractorInventory from "./screens/inventory/Tractors";
import ImplementInventory from "./screens/inventory/Implement";
import AddTractor from "./screens/inventory/AddTractor";
import AddImplement from "./screens/inventory/AddImplement";
import AdvisoryScreen from "./screens/AdvisoryScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "REFRESH":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isSignout: false,
          };
        case "LOGIN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
          };
        case "LOGOUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
            user: null,
          };
        case "SAVE_USER":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );
  useEffect(() => {
    const checkLogin = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync("token");
        if (token) {
          VerifyLogin()
            .then((result) => {
              if (result.status === "success") {
                dispatch({ type: "REFRESH", token });
                dispatch({ type: "SAVE_USER", user: result.user });
              } else {
                dispatch({ type: "LOGOUT" });
              }
            })
            .catch((error) => {
              dispatch({ type: "LOGOUT" });
              console.log(error);
            });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (e) {
        console.log("Token Error", e);
      }
    };
    checkLogin();
  }, []);
  const authContext = React.useMemo(
    () => ({
      logIn: async ({ token }) => {
        dispatch({ type: "LOGIN", token });
        VerifyLogin()
          .then((result) => {
            if (result.status === "success") {
              dispatch({ type: "REFRESH", token });
              dispatch({ type: "SAVE_USER", user: result.user });
            } else {
              dispatch({ type: "LOGOUT" });
            }
          })
          .catch((error) => {
            dispatch({ type: "LOGOUT" });
            console.log(error);
          });
      },
      logOut: () => dispatch({ type: "LOGOUT" }),
      ...state,
    }),
    [state]
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer style={styles.container}>
        <Header />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            screenProps: {
              state,
            },
          }}
        >
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={Loading} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="LogIn"
              component={Login}
              options={{
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            <>
              <Stack.Group>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="TPM" component={TPMScreen} />
                <Stack.Screen name="CPM" component={CPMScreen} />
                <Stack.Screen
                  name="ML-Prediction"
                  component={MLPredictionScreen}
                />
                <Stack.Screen name="Advisory" component={AdvisoryScreen} />
                <Stack.Screen name="Inventory" component={Inventory} />
                <Stack.Screen
                  name="Inventory/Tractor"
                  component={TractorInventory}
                />
                <Stack.Screen
                  name="Inventory/Implement"
                  component={ImplementInventory}
                />
                <Stack.Screen
                  name="Inventory/Tractor/Add"
                  component={AddTractor}
                />
                <Stack.Screen
                  name="Inventory/Implement/Add"
                  component={AddImplement}
                />
                <Stack.Screen name="Profile" component={Profile} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
        <Footer />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: appColors.background,
    color: appColors.text,
  },
});
