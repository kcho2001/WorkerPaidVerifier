import logo from "./logo.svg";
import { GET_DAYS_UNPAID } from "./query";
import { useQuery } from "@apollo/client";
import { ColorRing } from "react-loader-spinner";
import * as React from "react";
import { Paid } from "./paid.js";
import { Unpaid } from "./unpaid.js";
import useWindowDimensions from "./hooks/windowDimensions";

function checkPaidStatus(workers, setMaxUnpaid) {
  const maxUnpaid = 0;
  const paidStatus = true;
  for (let worker of workers) {
    // Assuming that if a worker hasn't been paid for more than 14 days
    // The application should not return a verified paid page
    console.log(worker.id);
    if (worker.daysUnpaid >= maxUnpaid) {
      console.log("greater" + maxUnpaid);
      setMaxUnpaid(maxUnpaid);
    }
    if (worker.daysUnpaid >= 14) {
      paidStatus = false;
    }
  }
  return paidStatus;
}

function App() {
  const [paid, setPaid] = React.useState(false);
  const [maxUnpaid, setMaxUnpaid] = React.useState(0);
  const { height, width } = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_DAYS_UNPAID, {
    onCompleted: (data) => {
      // setWorkers(data.checkIns);
      setPaid(checkPaidStatus(data.workers, setMaxUnpaid));
    },
  });

  return (
    <>
      {loading && (
        <div>
          <ColorRing
            visible={true}
            height={height / 2}
            width={width}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {error && (
        <div>
          <p>Error retrieving data: {error.message}</p>
        </div>
      )}
      {!error && !loading && !paid && (
        <Unpaid maxUnpaid={maxUnpaid} workerLength={data.workers.length} />
      )}
      {!error && !loading && paid && (
        <Paid maxUnpaid={maxUnpaid} workerLength={data.workers.length} />
      )}
    </>
  );
}

export default App;
