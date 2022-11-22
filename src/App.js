import logo from "./logo.svg";
import { GET_DAYS_UNPAID, GET_PAYMENTS } from "./query";
import { useQuery } from "@apollo/client";
import { ColorRing } from "react-loader-spinner";
import * as React from "react";
import { Paid } from "./paid.js";
import { Unpaid } from "./unpaid.js";
import useWindowDimensions from "./hooks/windowDimensions";

/** 
 * @param workers The array of workers that was queried from theGraph
 * @param setMaxUnpaid Set state hook that allows the function to set the longest a worker hasn't been paid in days
 * @returns true if all workers have less than 14 daysUnpaid: daysUnpaid = days worked, but not paid for
*/
function checkPaidStatus(workers, setMaxUnpaid) {
  let _maxUnpaid = 0;
  let paidStatus = true;
  for (let worker of workers) {
    // Assuming that if a worker hasn't been paid for more than 14 days
    // The application should not return a verified paid page
    if (worker.daysUnpaid > _maxUnpaid) {
      _maxUnpaid = worker.daysUnpaid;
      // console.log("greater " + _maxUnpaid);
    }
    if (worker.daysUnpaid >= 14) {
      paidStatus = false;
    }
  }
  setMaxUnpaid(_maxUnpaid);
  return paidStatus;
}

/**
 * @param dates The list of dates of payments that was queried from theGraph
 * @returns Object with year, month, and day keys that hold the values of the most recent payment
 */
function getLongestUnpaid(dates) {
  // TODO: Add check to see if most recent payment was within a certain time period
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

  // Query of all workers and their id + daysUnpaid
  const { loading, error, data } = useQuery(GET_DAYS_UNPAID, {
    onCompleted: (data) => {
      setPaid(checkPaidStatus(data.workers, setMaxUnpaid));
    },
  });

  // Query for all payments
  const { loading2, error2, } = useQuery(GET_PAYMENTS, {
    onCompleted: (data) => {
      setRecentPayment(getLongestUnpaid(data.payments));
    },
  });

  return (
    <>
      {/* If the queries are not finished yet, return a spinning animation where verification dashboard is */}
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
      {/* If an error occurred during any of the queries... */}
      {(error || error2) && (
        <div>
          <p>Error retrieving data: {error.message}</p>
        </div>
      )}
      {/* When finished loading, and no errors exist, but the workers have not been paid, display Unpaid screen */}
      {!error && !loading && !loading2 && !error2 && !paid && (
        <Unpaid maxUnpaid={maxUnpaid} workerLength={data.workers.length} recentPayment={recentPayment} />
      )}
      {/* When finished loading, and no errors exist, and the workers have been paid, display Paid screen */}
      {!error && !loading && !loading2 && !error2 && paid && (
        <Paid maxUnpaid={maxUnpaid} workerLength={data.workers.length} recentPayment={recentPayment} />
      )}
    </>
  );
}

export default App;
