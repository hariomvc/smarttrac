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
import { MaterialIcons } from "@expo/vector-icons";
import { GetImplementList } from "../api/other";
import FooterMenu from "../components/FooterMenu";
import { secondaryColors } from "../config/colors";
import { GetModelsList, GetPredicion } from "../api/prediction";

export default function AdvisoryScreen({ navigation }) {
  const [userInputs, setUserInputs] = useState({
    power: "",
    min_cone_index: "",
    max_cone_index: "",
    min_forward_speed: "",
    max_forward_speed: "",
    min_tillage_depth: "",
    max_tillage_depth: "",
  });
  const [loading, setLoading] = useState(false);
  const [implementList, setImplementList] = useState([]);
  const [implement, setImplement] = useState("");
  const [modelsList, setModelsList] = useState([]);
  const [model, setModel] = useState("");
  const [prediction, setPrediction] = useState({
    max_draft: null,
    min_draft: null,
    display: false,
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([
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
        }),
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
        }),
    ]).then((r) => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    let tempValue = 0;
    let power = parseFloat(userInputs.power) || 0;
    let min_depth = parseFloat(userInputs.min_tillage_depth) || 0;
    let max_depth = parseFloat(userInputs.max_tillage_depth) || 0;
    let min_speed = parseFloat(userInputs.min_forward_speed) || 0;
    let max_speed = parseFloat(userInputs.max_forward_speed) || 0;
    let min_cone_index = parseFloat(userInputs.min_cone_index) || 0;
    let max_cone_index = parseFloat(userInputs.max_cone_index) || 0;
    if (
      !(min_depth > 0 && min_depth < 30) ||
      !(max_depth > 0 && max_depth < 30)
    ) {
      Alert.alert("Depth must be between 0 and 30");
    } else if (
      !(min_speed > 0 && min_speed <= 5) ||
      !(max_speed > 0 && max_speed <= 5)
    ) {
      Alert.alert("Speed must be between 0 and 5");
    } else if (
      !(min_cone_index > 100 && min_cone_index < 2000) ||
      !(max_cone_index > 100 && max_cone_index < 2000)
    ) {
      Alert.alert("Cone Index must be between 100 and 2000");
    } else if (!model || !implement) {
      Alert.alert("Please enter all information");
    } else {
      setLoading(true);
      if (min_depth > max_depth) {
        tempValue = min_depth;
        min_depth = max_depth;
        max_depth = tempValue;
        tempValue = 0;
      }
      if (min_speed > max_speed) {
        tempValue = min_speed;
        min_speed = max_speed;
        max_speed = tempValue;
        tempValue = 0;
      }
      if (min_cone_index > max_cone_index) {
        tempValue = min_cone_index;
        min_cone_index = max_cone_index;
        max_cone_index = tempValue;
        tempValue = 0;
      }
      let min_draft = await GetPredicion({
        implement,
        model_name: model,
        depth: min_depth,
        speed: min_speed,
        cone_index: min_cone_index,
      })
        .then(async (result) => {
          if (result.draft) {
            return result.draft;
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(error.toString());
        });
      let max_draft = await GetPredicion({
        implement,
        model_name: model,
        depth: max_depth,
        speed: max_speed,
        cone_index: max_cone_index,
      })
        .then(async (result) => {
          if (result.draft) {
            return result.draft;
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(error.toString());
        });
      if (min_draft !== null && max_draft !== null) {
        let min_db_power = min_draft * min_speed;
        let max_db_power = max_draft * max_speed;
        let power_kw = power * 0.746;
        let min_available_db_power = power_kw * 0.75;
        let max_available_db_power = power_kw * 0.8;
        let condition = "";
        let color = "";
        if (max_available_db_power < max_db_power) {
          condition = "Overloaded";
          color = "#ef4444";
        } else if (min_db_power < min_available_db_power) {
          condition = "Underloaded";
          color = "#3b82f6";
        } else {
          condition = "Perfect";
          color = "#22c55e";
        }
        setPrediction({
          ...prediction,
          display: true,
          max_draft,
          min_draft,
          max_db_power,
          min_db_power,
          min_available_db_power,
          max_available_db_power,
          condition: condition,
          color: color,
        });
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Error in Draft Prediction.");
      }
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
        <MaterialIcons name="analytics" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 24,
          }}
        >
          Matching Tractor Implement Selection
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
              fontSize: 18,
              flex: 3,
            }}
          >
            Available Power (hp):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, power: newValue });
            }}
            value={userInputs.power}
            keyboardType="numeric"
            editable={!loading}
          />
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
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              flex: 1,
              marginHorizontal: 1,
            }}
          >
            Min.
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              flex: 1,
            }}
          >
            Max.
          </Text>
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 2,
            }}
          >
            Cone Index (kPa):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, min_cone_index: newValue });
            }}
            value={userInputs.min_cone_index}
            keyboardType="numeric"
            editable={!loading}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, max_cone_index: newValue });
            }}
            value={userInputs.max_cone_index}
            keyboardType="numeric"
            editable={!loading}
          />
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 2,
            }}
          >
            Forward Speed (km/h):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, min_forward_speed: newValue });
            }}
            value={userInputs.min_forward_speed}
            keyboardType="numeric"
            editable={!loading}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, max_forward_speed: newValue });
            }}
            value={userInputs.max_forward_speed}
            keyboardType="numeric"
            editable={!loading}
          />
        </LayoutRow>
        <LayoutRow style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              flex: 2,
            }}
          >
            Tillage Depth (cm):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, min_tillage_depth: newValue });
            }}
            value={userInputs.min_tillage_depth}
            keyboardType="numeric"
            editable={!loading}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(newValue) => {
              setUserInputs({ ...userInputs, max_tillage_depth: newValue });
            }}
            value={userInputs.max_tillage_depth}
            keyboardType="numeric"
            editable={!loading}
          />
        </LayoutRow>
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
              {loading ? "loading..." : "Advise"}
            </Text>
          </Pressable>
        </LayoutRow>
        {prediction.display && (
          <View
            style={{
              flexDirection: "col",
              borderRadius: 10,
              borderWidth: 2,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: prediction.color,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
                marginTop: 0,
                textAlign: "center",
                color: prediction.color,
              }}
            >
              Implement Matching Advisory:
            </Text>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 20,
                marginVertical: 8,
                textAlign: "center",
                color: prediction.color,
              }}
            >
              {prediction.condition} Match
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: prediction.color,
              }}
            >
              Required Power Range: {prediction.min_db_power.toFixed(2)}
              {" - "}
              {prediction.max_db_power.toFixed(2)} kW
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: prediction.color,
              }}
            >
              Available Power (Drawbar):{" "}
              {prediction.min_available_db_power.toFixed(2)}
              {" - "}
              {prediction.max_available_db_power.toFixed(2)} kW
            </Text>
            {prediction.condition === "Perfect" && (
              <>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Instruction to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    The tractor power is perfectly matched to the implement's
                    power requirement. This results in optimal performance,
                    efficiency, and fuel economy.
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Operators should maintain the current settings and operating
                    conditions to ensure the perfect match is maintained.
                  </Text>
                </View>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Suggestions to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Adjust the tractor ground speed to maintain the optimal
                    power delivery to the implement based on the soil
                    conditions.
                  </Text>
                </View>
              </>
            )}
            {prediction.condition === "Underloaded" && (
              <>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Instruction to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    The tractor has excess power compared to the implement's
                    power requirement. This can result in inefficient use of the
                    tractor's power, leading to increased fuel consumption and
                    potential for soil compaction.
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Operators should increase the working depth, working width,
                    or ground speed of the implement to better match the
                    available tractor power.
                  </Text>
                </View>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Suggestions to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Consider using a smaller tractor or a different implement
                    that better matches the available tractor power.
                  </Text>
                </View>
              </>
            )}
            {prediction.condition === "Overloaded" && (
              <>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Instruction to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    The tractor is not able to deliver the required power to the
                    implement, resulting in reduced performance and efficiency.
                    This can lead to excessive fuel consumption, increased wear
                    and tear on the tractor components, and potential damage to
                    the implement.
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Operators should reduce the working depth, working width, or
                    ground speed of the implement to match the available tractor
                    power.
                  </Text>
                </View>
                <View
                  style={{
                    color: prediction.color,
                    marginVertical: 8,
                    display: "flex",
                    flexDirection: "col",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      display: "block",
                      color: prediction.color,
                    }}
                  >
                    Suggestions to the Operator:
                  </Text>
                  <Text style={{ color: prediction.color }}>
                    Consider using a larger tractor or a different implement
                    that better matches the available tractor power.
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
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
