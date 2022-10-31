import logo from "./logo.svg";
import { GET_DAYS_UNPAID } from "./query";
import { Text, View } from "react-native";
import { ColorRing } from "react-loader-spinner";
import * as React from "react";
import { Paid } from "./paid.js";
import { Unpaid } from "./unpaid.js";
import "./App.css";

function checkPaidStatus(workers) {
  for (let worker of workers) {
    //Check unpaid status of each worker
  }
}

function App() {
  const [paid, setPaid] = React.useState(false);

  const { loading, error, data } = useQuery(query.GET_CHECKINS, {
    onCompleted: () => {
      // setWorkers(data.checkIns);
      //checkPaidStatus(workers);
      console.log(data);
    },
  });

  return (
    <>
      {loading && (
        <View>
          <ColorRing
            visible={true}
            height="80"
            width="80"
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
