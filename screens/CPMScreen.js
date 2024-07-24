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
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import socket from "../utils/socket";
import {
  GetConePenetrometerData,
  GetConePenetrometerList,
  GetLastConePenetrometerData,
} from "../api/other";
import { LineChart } from "react-native-chart-kit";
import FooterMenu from "../components/FooterMenu";
import MapView from "react-native-maps";
import { Row, Table } from "react-native-table-component";
import { secondaryColors } from "../config/colors";
// import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CPMScreen({ navigation }) {
  // {"cone_index","depth": 1207.85, "id": 546, "lat_long": "22.821526,82.386423", "status": 1}
  const theads = ["#", "Depth", "Cone Index", "Lat/Long"];
  const tKeys = ["#", "depth", "cone_index", "lat_long"];
  const [tableData, setTableData] = useState([]);
  const widthArr = [40, 80, 80, 160];
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [conePenetrometer, setConePenetrometer] = useState("");
  const [conePenetrometerList, setConePenetrometerList] = useState([]);
  const initialize = () => {
    GetConePenetrometerData({ cone_penetrometer: conePenetrometer })
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
    GetLastConePenetrometerData({ cone_penetrometer: conePenetrometer })
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
    socket.emit("join", `CPM/${conePenetrometer}`);
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
    GetConePenetrometerList()
      .then((result) => {
        if (result.status == "success") {
          setConePenetrometerList(result.data);
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
    if (conePenetrometer) {
      initialize();
    }
  }, [conePenetrometer]);
  useEffect(() => {
    if (list.length > 0) {
      Promise.all(
        list?.slice(-25)?.map((item, index) => {
          return tKeys.map((rec, recIndex) =>
            recIndex === 0 ? index + 1 : item[rec]
          );
        })
      ).then((data) => setTableData(data));
    }
  }, [list]);
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
        <AntDesign name="dashboard" size={48} color="black" />
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            fontWeight: "600",
            fontSize: 24,
          }}
        >
          Cone Pentrometer Monitoring
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
            {!conePenetrometer && "Select"} Cone Penetrometer:{" "}
            {conePenetrometer && (
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 24,
                  marginTop: 0,
                  textAlign: "center",
                }}
              >
                {conePenetrometer}
              </Text>
            )}
          </Text>
        </LayoutRow>
        <LayoutRow>
          {!conePenetrometer && conePenetrometerList.length > 0 && (
            <FlatList
              data={conePenetrometerList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    padding: 16,
                    backgroundColor: "#ffffff",
                    margin: 10,
                    borderRadius: 20,
                    borderWidth: 1,
                  }}
                  onPress={() => setConePenetrometer(item.code)}
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
        {conePenetrometer && data.id && (
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
                Cone Index: {data?.cone_index} kPa
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
        <View
          style={{
            flex: 1,
            width: "100",
            height: "100",
            backgroundColor: "red",
          }}
        >
          {/* <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
        </View>
        {list.length > 0 && (
          <>
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
                Cone Index (vs Depth)
              </Text>
              <LineChart
                data={{
                  labels: list.slice(-25).map(
                    (item) =>
                      // new Date(item.created_at).toISOString().substr(14, 5)
                      item.depth
                    // -1 * item.cone_index
                  ),
                  datasets: [
                    {
                      data: list.slice(-25).map((item) => item.cone_index),
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
                    r: "3",
                    strokeWidth: "1",
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
