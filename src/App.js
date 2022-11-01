import logo from "./logo.svg";
import { GET_DAYS_UNPAID } from "./query";
import { Text, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { ColorRing } from "react-loader-spinner";
import * as React from "react";
import { Paid } from "./paid.js";
import { Unpaid } from "./unpaid.js";
import useWindowDimensions from "./hooks/windowDimensions";
// import { styles } from "./styles.js";

function checkPaidStatus(workers) {
  for (let worker of workers) {
    // Assuming that if a worker hasn't been paid for more than 14 days
    // The application should not return a verified paid page
    if (worker.daysUnpaid >= 14) {
      return false;
    }
  }
  return true;
}

function App() {
  const [paid, setPaid] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_DAYS_UNPAID, {
    onCompleted: (data) => {
      // setWorkers(data.checkIns);
      setPaid(checkPaidStatus(data.workers));
    },
  });

  return (
    <>
      {loading && (
        <View styles={{ justifyContent: "center", alignItems: "center" }}>
          <ColorRing
            visible={true}
            height={height / 2}
            width={width}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </View>
      )}
      {error && (
        <View>
          <Text>Error retrieving data: {error.message}</Text>
        </View>
      )}
      {!error && !loading && !paid && <Unpaid />}
      {!error && !loading && paid && <Paid />}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screen: {
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1,
  },
  mainText: {
    fontSize: 20,
    color: "black",
    paddingBottom: 5,
    paddingTop: 0,
    marginTop: 0,
  },
  content: {
    padding: 30,
  },
  list: {
    marginTop: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
