import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  View,
  FlatList,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import Container from "../components/layout/Container";
import LayoutRow from "../components/layout/Row";
import { Octicons } from "@expo/vector-icons";
import { GetImplementList } from "../api/other";
import FooterMenu from "../components/FooterMenu";
import { secondaryColors } from "../config/colors";
import { GetModelsList, GetPredicion } from "../api/prediction";

export default function MLPredictionScreen({ navigation }) {
  const [userInputs, setUserInputs] = useState({
    cone_index: "",
    forward_speed: "",
    tillage_depth: "",
  });
  const [loading, setLoading] = useState(false);
  const [implement, setImplement] = useState("");
  const [predictedDraft, setPredictedDraft] = useState(null);
  const [implementList, setImplementList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [model, setModel] = useState("");

  useEffect(() => {
    GetImplementList()
      .then((result) => {
        if (result.status == "success") {
          setImplementList(result.data);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
    GetModelsList()
      .then((result) => {
        if (result.length > 0) {
          setModelsList(result);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
  }, []);

  const handleSubmit = () => {
    let depth = parseFloat(userInputs.tillage_depth) || 0;
    let speed = parseFloat(userInputs.forward_speed) || 0;
    let cone_index = parseFloat(userInputs.cone_index) || 0;
    if (!(depth > 0 && depth < 30)) {
      Alert.alert("Depth must be between 0 and 30");
    } else if (!(speed > 0 && speed <= 5)) {
      Alert.alert("Speed must be between 0 and 5");
    } else if (!(cone_index > 100 && cone_index < 2000)) {
      Alert.alert("Cone Index must be between 100 and 2000");
    } else if (!model || !implement) {
      Alert.alert("Please enter all information");
    } else {
      setLoading(true);
      GetPredicion({
        implement,
        model_name: model,
        depth,
        speed,
        cone_index,
      })
        .then(async (result) => {
          if (result.draft) {
            setPredictedDraft(result.draft);
            setLoading(false);
          } else {
            Alert.alert(result.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(error.toString());
          setLoading(false);
        });
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          paddingBottom: 12,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        <Octicons name="graph" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 24,
          }}
        >
          ML-enabled Draft Prediction
        </Text>
      </View>
      <ScrollView style={{ flexGrow: 1 }}>
        <LayoutRow>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
            }}
          >
            Select Prediction Model:
          </Text>
        </LayoutRow>
        <LayoutRow>
          {modelsList.length > 0 && (
            <FlatList
              data={modelsList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    backgroundColor:
                      model === item.slug
                        ? secondaryColors.buttonBackground
                        : "#fff",
                    margin: 10,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor:
                      model === item.slug
                        ? secondaryColors.buttonBackground
                        : "#000",
                  }}
                  onPress={() => {
                    if (!loading) {
                      if (model === item.slug) {
                        setModel("");
                      } else {
                        setModel(item.slug);
                      }
                    }
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color:
                        model === item.slug
                          ? secondaryColors.buttonText
                          : "#000",
                    }}
                  >
                    {item.model_name}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.slug}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </LayoutRow>
        <LayoutRow>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
            }}
          >
            Select Implement:
          </Text>
        </LayoutRow>
        <LayoutRow>
          {implementList.length > 0 && (
            <FlatList
              data={implementList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    backgroundColor:
                      implement === item.code
                        ? secondaryColors.buttonBackground
                        : "#fff",
                    margin: 10,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor:
                      implement === item.code
                        ? secondaryColors.buttonBackground
                        : "#000",
                  }}
                  onPress={() => {
                    if (!loading) {
                      if (implement === item.code) {
                        setImplement("");
                      } else {
                        setImplement(item.code);
                      }
                    }
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color:
                        implement === item.code
                          ? secondaryColors.buttonText
                          : "#000",
                    }}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              flex: 2,
            }}
          >
            User Inputs:
          </Text>
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 1,
            }}
          >
            Cone Index (kPa):
          </Text>
          <TextInput
            style={styles.textInput}
            editable={predictedDraft === null && !loading}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, cone_index: newValue });
            }}
            value={userInputs.cone_index}
            placeholder="Cone Index in kPa"
            keyboardType="numeric"
          />
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 1,
            }}
          >
            Forward Speed (km/h):
          </Text>
          <TextInput
            style={styles.textInput}
            editable={predictedDraft === null && !loading}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, forward_speed: newValue });
            }}
            value={userInputs.forward_speed}
            placeholder="Forward speed in km/h"
            keyboardType="numeric"
          />
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 1,
            }}
          >
            Tillage Depth (cm):
          </Text>
          <TextInput
            style={styles.textInput}
            editable={predictedDraft === null && !loading}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, tillage_depth: newValue });
            }}
            value={userInputs.tillage_depth}
            placeholder="Tillage  depth in cm"
            keyboardType="numeric"
          />
        </LayoutRow>
        {predictedDraft === null && (
          <LayoutRow style={{ justifyContent: "center" }}>
            <Pressable
              onPress={handleSubmit}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 24,
                marginVertical: 10,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#000",
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {loading ? "loading..." : "Predict"}
              </Text>
            </Pressable>
          </LayoutRow>
        )}
        {predictedDraft !== null && (
          <LayoutRow style={{ justifyContent: "center" }}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 24,
                marginVertical: 10,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderColor: secondaryColors.background,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: secondaryColors.background,
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Predicted Draft: {predictedDraft.toFixed(2)} kN
              </Text>
            </View>
          </LayoutRow>
        )}
        <View
          style={{
            flexDirection: "col",
            borderRadius: 10,
            borderWidth: 2,
            margin: 10,
            backgroundColor: "#fff",
            borderColor: secondaryColors.background,
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginTop: 0,
              textAlign: "center",
              color: secondaryColors.background,
            }}
          >
            Model Info:
          </Text>
          {modelsList?.map((item, index) => (
            <>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  marginTop: 6,
                  color: secondaryColors.background,
                }}
                key={`model-info-${index}`}
              >
                {index + 1}. {item.model_name}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  paddingLeft: 20,
                  color: secondaryColors.background,
                }}
                key={`${index}-info`}
              >
                R2: {item.r2.toFixed(2)}, MSE: {item.mse.toFixed(2)}
              </Text>
            </>
          ))}
        </View>
      </ScrollView>
      <FooterMenu navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
    marginHorizontal: 3,
  },
});
