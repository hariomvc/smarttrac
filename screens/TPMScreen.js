import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  View,
  FlatList,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import Container from "../components/layout/Container";
import LayoutRow from "../components/layout/Row";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import socket from "../utils/socket";
import {
  GetImplementList,
  GetLastTractorData,
  GetTractorData,
  GetTractorList,
} from "../api/other";
import { LineChart } from "react-native-chart-kit";
import FooterMenu from "../components/FooterMenu";
import { Row, Table } from "react-native-table-component";
import { secondaryColors } from "../config/colors";

export default function TPMScreen({ navigation }) {
  const theads = ["#", "Depth", "Draft", "Speed", "Lat/Long"];
  const tKeys = ["#", "depth", "draft", "speed", "lat_long"];
  const [tableData, setTableData] = useState([]);
  const widthArr = [40, 80, 80, 80, 160];
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [tractor, setTractor] = useState("");
  const [implement, setImplement] = useState("");
  const [tractorList, setTractorList] = useState([]);
  const [implementList, setImplementList] = useState([]);
  const initialize = () => {
    GetTractorData({ tractor, implement })
      .then((result) => {
        if (result.status == "success") {
          setList(result.data);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
    GetLastTractorData({ tractor, implement })
      .then((result) => {
        if (result.status == "success") {
          setData(result.data[0]);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
    socket.emit("join", `${tractor}/${implement}`);
    socket.on("last_fetch", (res) => {
      setData(res);
    });
    // return () => {
    //   socket.disconnect();
    // };
  };
  useEffect(() => {
    if (data.id) {
      setList([...list, data]);
    }
  }, [data]);
  useEffect(() => {
    GetTractorList()
      .then((result) => {
        if (result.status == "success") {
          setTractorList(result.data);
        } else {
          Alert.alert("Error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error");
      });
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
  }, []);
  useEffect(() => {
    if (tractor && implement) {
      initialize();
    }
  }, [tractor, implement]);
  useEffect(() => {
    if (list.length > 0) {
      Promise.all(
        list?.slice(-10)?.map((item, index) => {
          return tKeys.map((rec, recIndex) =>
            recIndex === 0 ? index + 1 : item[rec]
          );
        })
      ).then((data) => setTableData(data));
    }
  }, [list]);
  useEffect(() => {
    // socket.on("last_fetch", (res) => {
    //   setData(res);
    // });
    // Clean up the socket connection on unmount (optional)
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Text
        style={{
          fontWeight: "800",
          fontSize: 20,
          textAlign: "center",
          paddingBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: "black",
          marginTop: 16,
        }}
      >
        Instrumented Tractor Performance Monitoring System (ITPMS)
      </Text> */}
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
        <FontAwesome5 name="tractor" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 24,
          }}
        >
          Tractor Performance Monitoring
        </Text>
      </View>
      <ScrollView style={{ flexGrow: 1 }}>
        <LayoutRow>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 24,
              marginTop: 0,
              textAlign: "center",
            }}
          >
            {!tractor && "Select"} Tractor:{" "}
            {tractor && (
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 24,
                  marginTop: 0,
                  textAlign: "center",
                }}
              >
                {tractor}
              </Text>
            )}
          </Text>
        </LayoutRow>
        <LayoutRow>
          {!tractor && tractorList.length > 0 && (
            <FlatList
              data={tractorList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    padding: 16,
                    backgroundColor: "#ffffff",
                    margin: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                  }}
                  onPress={() => setTractor(item.code)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
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
        <LayoutRow>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 24,
              marginTop: 0,
              textAlign: "center",
            }}
          >
            {!implement && "Select"} Implement:{" "}
            {implement && (
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 24,
                  marginTop: 0,
                  textAlign: "center",
                }}
              >
                {implement}
              </Text>
            )}
          </Text>
        </LayoutRow>
        <LayoutRow>
          {!implement && implementList.length > 0 && (
            <FlatList
              data={implementList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    padding: 16,
                    backgroundColor: "#ffffff",
                    margin: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                  }}
                  onPress={() => setImplement(item.code)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
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
        {tractor && implement && data.id && (
          <Container
            style={{
              borderRadius: 20,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "white",
            }}
          >
            <LayoutRow>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 24,
                  marginTop: 0,
                  textAlign: "center",
                }}
              >
                #{data?.id}:
              </Text>
            </LayoutRow>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <AntDesign name="clockcircle" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                {new Date(data.created_at).toLocaleString().toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Ionicons name="speedometer" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                Speed: {data?.speed} km/h
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <MaterialIcons name="height" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                Depth: {data?.depth} cm
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="weight" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                Draft: {data?.draft} kN
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="fuel" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                Fuel: {data?.fuel} Kg/hr
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <AntDesign name="earth" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  marginTop: 0,
                }}
              >
                Lat/Long: {data?.lat_long}
              </Text>
            </View>
          </Container>
        )}
        {list.length > 0 && (
          <>
            {/* <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
                overflow: "hidden",
                margin: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Fuel Comsumption Graph (vs Time)
              </Text>
              <LineChart
                data={{
                  labels: list
                    .slice(-10)
                    .map((item) =>
                      new Date(item.created_at).toISOString().substr(14, 5)
                    ),
                  datasets: [
                    {
                      data: list.slice(-10).map((item) => item.fuel),
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 8} // Adjust the width as needed
                height={200}
                yAxisSuffix="L/hr" // Customize the Y-axis suffix
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1, // Number of decimal places in the Y-axis values
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Line color
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                  style: {
                    //   borderRadius: 20,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#000",
                  },
                }}
                bezier
              />
            </View> */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
                overflow: "hidden",
                margin: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Speed Graph (vs Time)
              </Text>
              <LineChart
                data={{
                  labels: list
                    .slice(-10)
                    .map((item) =>
                      new Date(item.created_at).toISOString().substr(14, 5)
                    ),
                  datasets: [
                    {
                      data: list.slice(-10).map((item) => item.speed),
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 8} // Adjust the width as needed
                height={200}
                yAxisSuffix="km/h" // Customize the Y-axis suffix
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1, // Number of decimal places in the Y-axis values
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Line color
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                  style: {
                    //   borderRadius: 20,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#000",
                  },
                }}
                bezier
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
                overflow: "hidden",
                margin: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Draft Graph (vs Time)
              </Text>
              <LineChart
                data={{
                  labels: list
                    .slice(-10)
                    .map((item) =>
                      new Date(item.created_at).toISOString().substr(14, 5)
                    ),
                  datasets: [
                    {
                      data: list.slice(-10).map((item) => item.draft),
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 8} // Adjust the width as needed
                height={200}
                yAxisSuffix="kN" // Customize the Y-axis suffix
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1, // Number of decimal places in the Y-axis values
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Line color
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                  style: {
                    //   borderRadius: 20,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#000",
                  },
                }}
                bezier
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
                overflow: "hidden",
                margin: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Depth (vs Time)
              </Text>
              <LineChart
                data={{
                  labels: list
                    .slice(-10)
                    .map((item) =>
                      new Date(item.created_at).toISOString().substr(14, 5)
                    ),
                  datasets: [
                    {
                      data: list.slice(-10).map((item) => item.depth),
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 8} // Adjust the width as needed
                height={200}
                yAxisSuffix="cm" // Customize the Y-axis suffix
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1, // Number of decimal places in the Y-axis values
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Line color
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
                  style: {
                    //   borderRadius: 20,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#000",
                  },
                }}
                bezier
              />
            </View>
          </>
        )}
        {tableData.length > 0 && (
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  <Row
                    data={theads}
                    widthArr={widthArr}
                    style={styles.header}
                    textStyle={styles.headerText}
                  />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}
                  >
                    {tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={styles.row}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <FooterMenu navigation={navigation} />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: secondaryColors.background,
  },
  headerText: {
    color: secondaryColors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
    color: secondaryColors.background,
  },
  dataWrapper: { marginTop: -1 },
  row: { height: 30, backgroundColor: "#fff" },
});
