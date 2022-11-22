import logo from "./logo.svg";
import { GET_DAYS_UNPAID, GET_PAYMENTS } from "./query";
import { useQuery } from "@apollo/client";
import { ColorRing } from "react-loader-spinner";
import * as React from "react";
import { Paid } from "./paid.js";
import { Unpaid } from "./unpaid.js";
import useWindowDimensions from "./hooks/windowDimensions";

function checkPaidStatus(workers, setMaxUnpaid) {
  let _maxUnpaid = 0;
  let paidStatus = true;
  for (let worker of workers) {
    // Assuming that if a worker hasn't been paid for more than 14 days
    // The application should not return a verified paid page
    if (worker.daysUnpaid > _maxUnpaid) {
      _maxUnpaid = worker.daysUnpaid;
      console.log("greater " + _maxUnpaid);
    }
    if (worker.daysUnpaid >= 14) {
      paidStatus = false;
    }
  }
  setMaxUnpaid(_maxUnpaid);
  return paidStatus;
}

function getLongestUnpaid(dates) {
  let mostRecentDate = 0;
  for (let date of dates) {
    let currDate = date.year;
    if (date.month < 10) {
      currDate += "0";
    }
    currDate += date.month.toString();
    if (date.day < 10) {
      currDate += "0";
    }
    currDate += date.day.toString();
    console.log("currdate is: " + currDate);
    if (parseInt(currDate) > mostRecentDate) {
      mostRecentDate = parseInt(currDate);
    }
  }
  let _year = mostRecentDate.toString().slice(0, 4);
  let _month = mostRecentDate.toString().slice(4, 6);
  let _day = mostRecentDate.toString().slice(6);
  return { year: _year, month: _month, day: _day };
}

function App() {
  const [paid, setPaid] = React.useState(false);
  const [maxUnpaid, setMaxUnpaid] = React.useState(0);
  const [recentPayment, setRecentPayment] = React.useState({});
  const { height, width } = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_DAYS_UNPAID, {
    onCompleted: (data) => {
      // setWorkers(data.checkIns);
      setPaid(checkPaidStatus(data.workers, setMaxUnpaid));
    },
  });

  const { loading2, error2, data2 } = useQuery(GET_PAYMENTS, {
    onCompleted: (data) => {
      // setWorkers(data.checkIns);
      setRecentPayment(getLongestUnpaid(data.payments));
    },
  });

  return (
    <>
      {(loading || loading2) && (
        <div>
          <ColorRing
            visible={true}
            height={height / 2}
            width={width / 2}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {(error || error2) && (
        <div>
          <p>Error retrieving data: {error.message}</p>
        </div>
      )}
      {!error && !loading && !loading2 && !error2 && !paid && (
        <Unpaid maxUnpaid={maxUnpaid} workerLength={data.workers.length} recentPayment={recentPayment} />
      )}
      {!error && !loading && !loading2 && !error2 && paid && (
        <Paid maxUnpaid={maxUnpaid} workerLength={data.workers.length} recentPayment={recentPayment} />
      )}
    </>
  );
}

export default App;
